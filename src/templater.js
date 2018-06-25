const templateStore = {}

// build a template getter
export const templates = (function () {
  // store the templates we import
  let path = [] // used for building out an explicit error message

  // so... we're going to use a proxy make sure when someone does templateStore.page.template they don't remove it
  // basically, this object says "when you do a get, run this function instead of the default"
  const validator = {
    get(target, key) { // target is the object called upon, and key is the property
      var item = target[key] // this is the item in question

      // start building a path so the error message is explicit
      if (target === templateStore) path = ['templateStore']
      path.push(key)

      // the template (or path to it) doesn't exist
      if (!item) {
        throw new Error(`Template ${path.join('.')} does not exist.`)
      }
      // if something does exist there AND it's an object
      // (an object either means we need to go deeper OR it's our template)
      else if (typeof (item) === 'object') {

        // check if this is our template...
        if (item.nodeName === '#document-fragment')
          return document.importNode(item, true) // ... and return a copy of it if so (templateStore.page.template will hit this)

        // else, return another layer of (i.e. templateStore.page will hit this)
        return new Proxy(item, validator)
      }

      // if the thing return isn't an object, we've probably, but not necessarily, fucked up, so return the item, but warn about it
      else {
        console.warn(`WARNING: ${path.join('.')} exists but is not a template!`)
        return item
      }
    }
  }

  return (new Proxy(templateStore, validator))
}());

export function importTemplate(pageName, htmlString) {
  if (!templateStore[pageName]) {
    templateStore[pageName] = {};

    var fragment = document.createElement('div');
    fragment.innerHTML = htmlString;

    fragment.querySelectorAll('template').forEach((template) => {
      var templateName = template.id || template.name || template.getAttribute('name')
      templateStore[pageName][templateName] = template.content // template.content is the document-fragment of a template
    })
  }
  else {
    console.warn('Template already imported!')
  }
}

export function fill(template, values) {
  // deal with slot elements
  template.querySelectorAll('slot').forEach(slot => {
    var slotData = values[slot.name]

    if (Array.isArray(slotData))
      slotData.forEach(template => insertNode(slot, template))

    else
      insertNode(slot, slotData)

    slot.parentNode.removeChild(slot)
  })

  // deal with textareas inside slots (their contents don't render as HTML elements)
  template.querySelectorAll('textarea').forEach(function (textarea) {
    var sandbox = document.createElement('div') // make sandbox
    sandbox.innerHTML = textarea.textContent // move contents to sandbox

    // fill sandbox slots (the same way we do for slot elements)
    sandbox.querySelectorAll('slot').forEach(slot => {
      var slotData = values[slot.name]

      if (Array.isArray(slotData))
        slotData.forEach(sandbox => insertNode(slot, sandbox))

      else
        insertNode(slot, slotData)

      slot.parentNode.removeChild(slot)
    })

    // replace textarea content with sandbox content
    textarea.innerHTML = sandbox.innerHTML
  })

  // deal with slot attributes
  template.querySelectorAll('[slot]').forEach(node => {
    var slotName = node.getAttribute("slot"),
      slotData = values[slotName]

    // would happen if you did `<element slot></element> or <element slot=""></slot>`
    if (!slotName)
      return console.error(
        `Slot attribute missing slot name for ${node.outerHTML}\n`,
        'Slot attribute must have a value. (e.g.: slot="slotname")',

        `node:`, node.outerHTML, '\n',
        `slotName:`, slotName
      )

    // would happen if you did `slotname: '' || undefined || null || 0`
    if (!slotData)
      return console.error(
        `No slot data for attribute slot "${slotName}". \n\n`,

        `This error usually means you either a) forgot to define a value for this slot, or b) are trying to insert this slot into the wrong template. Please check your templates fill. \n\n`,

        `node:`, node.outerHTML, '\n',
        `slotName:`, slotName, '\n',
        `slotData:`, slotData
      )

    // would happen if you did `slotname: 'hello' || '12' || ['word','word']
    if (typeof slotData !== 'object' || Array.isArray(slotData))
      return console.error(
        `Invalid slot data for attribute slot "${slotName}". \n\n`,
        `Slot data must be an object. (e.g. { img: "path/to/image.png" }). This error usually means you're attempting to pass a non-object value in the slots. Please check your templates fill. \n\n`,

        `node:`, node.outerHTML, '\n',
        `slotName:`, slotName, '\n',
        `slotData:`, slotData
      )

    Object.keys(slotData).forEach(atr => {
      var insertThis = values[slotName][atr]

      // if atr matches event pattern (i.e. on<event>), insert either a real function OR prevent insertion of text
      if (/^on[a-z]/.test(atr)) { // atr looks like an event (matches 'on' pattern - i.e. onclick/onmouseover)
        
        if (typeof insertThis === 'function') { // value passed in is a function

          if (node[atr] === null) // event hasn't been set yet (if this were undefined, it isn't a valid event)
            node[atr] = insertThis // break here so we don't also attach it as an attribute

          else if (node[atr] === undefined)
            console.warn(
              `Failed to add event "${atr}" to slot "${slotName}". ${atr} isn't a valid event.`,
            )

          else
            console.warn(
              `Failed to add event "${atr}" to slot "${slotName}". ${atr} was already set.\n\n`,

              `${atr}:`, node[atr]
            )
        }

        else 
          console.warn(
            `Failed to add event "${atr}" to slot "${slotName}". Value must be a function; got ${typeof insertThis}`
          )
      }

      // assume it's not a function call, and just insert the value
      else
        node.setAttribute(atr, insertThis)
    })

    node.removeAttribute('slot')
  })

  return template
}

function insertNode(slot, node) {
  var tempNode
  // technical note: We're actually inserting our content right before the 
  // slot starts. This is so that we can cleanly remove the slot later and 
  // not have to worry about preserving the content.

  // insert string, HTML string, number, or other non-objects into slot
  if (typeof node !== 'object' && node !== undefined)
    slot.insertAdjacentHTML('beforeBegin', node) // if we're worried about js injection, we should replace this with insertAdjacentText; that will also prevent us from using the html shortcut feature

  // insert DOM nodes (templates, DOM elements or nodes, documents, or document fragments) into slot
  else if (node && node.nodeType)
    slot.parentNode.insertBefore(node, slot)

  // insert default content if node is undefined or null (0 and '' will get caught by the first if)
  else if (!node) {
    var contents = [].slice.call(slot.childNodes)

    contents.forEach(newNode => {
      slot.parentNode.insertBefore(newNode, slot)
    })
  }

  // we've caught all the possible good cases already, shame on you
  else {
    return console.error(
      `Invalid slot data: ${JSON.stringify(node)}\n`,
      `Must be a Primative, Template, DOM Element or Node, Document, or Document Fragment`
    )
  }
}