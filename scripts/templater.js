// build a template getter
var templates = (function () {
  // store the templates we import
  const pages = {
    // e.g.
    // pageA: {
    //     templateA: #document-fragment,
    //     ...
    // },
    // ...
  }

  // build out the pages object (seen above)
  document.querySelectorAll('link[type="text/html"][rel="import"]').forEach((file) => {
    pages[file.id] = {}

    // file.import is the #document of a file
    file.import.querySelectorAll('template').forEach((template) => {
      pages[file.id][template.id] = template.content // template.content is the document-fragment of a template
    })
  })

  let path = [] // used for building out an explicit error message

  // so... we're going to use a proxy make sure when someone does pages.page.template they don't remove it
  // basically, this object says "when you do a get, run this function instead of the default"
  const validator = {
    get(target, key) { // target is the object called upon, and key is the property
      var item = target[key] // this is the item in question

      // start building a path so the error message is explicit
      if (target === pages) path = ['pages']
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
          return document.importNode(item, true) // ... and return a copy of it if so (pages.page.template will hit this)

        // else, return another layer of (i.e. pages.page will hit this)
        return new Proxy(item, validator)
      }

      // if the thing return isn't an object, we've probably, but not necessarily, fucked up, so return the item, but warn about it
      else {
        console.warn(`WARNING: ${path.join('.')} exists but is not a template!`)
        return item
      }
    }
  }

  return (new Proxy(pages, validator))
}())

var fill = (function() {
  function fill(template, values) {
    // deal with slot elements
    template.querySelectorAll('slot').forEach(slot => {
      var vav = values[slot.name]
  
      if (Array.isArray(vav)) {
        vav.forEach(template => insertNode(slot, template))
      } else {
        insertNode(slot, vav)
      }
  
      slot.parentNode.removeChild(slot)
    })
  
    // deal with slot attributes
    template.querySelectorAll('[slot]').forEach(node => {
      var slotName = node.getAttribute("slot"),
          vav = values[slotName]
  
      if (!slotName) {
        console.error('Slot attribute missing slot name! (e.g.: slot="slotname: attribute1, attribute2")', node)
        return;
      }
      if (!vav) {
        console.error('Slot attribute missing attribute name(s)! (e.g.: slot="slotname: attribute1, attribute2")', node)
        return;
      }
  
      // have to do this after checking so we don't hit a type error
      var slotAttributes = Object.keys(vav)
  
      if (vav) {
        slotAttributes.forEach(atr => node.setAttribute(atr, values[slotName][atr]))
        node.removeAttribute('slot')
      }
      
      else {
        console.log('no vav, attr', slot, values, slotName)
      }
    })
  
    return template
  }
  
  function insertNode(slot, node) {
    var tempNode
  
    // throw some errors
    if (slot.childNodes && slot.childNodes.length > 2) {
      console.error('Slots cannot have more than two children!')
    }
  
    // insert string into slot
    else if (typeof node === 'string')
      slot.insertAdjacentText('beforeBegin', node)
  
    // insert another template into slot
    else if (node && node.nodeName === '#document-fragment')
      slot.parentNode.insertBefore(node, slot)
  
    // replace slot with it's contents
    else {
      var contents = [].slice.call(slot.childNodes)
  
      contents.forEach(newNode => {
        slot.parentNode.insertBefore(newNode, slot)
      })
    }
  }

  return fill
} ())