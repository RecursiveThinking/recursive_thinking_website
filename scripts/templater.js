
  // build a template getter
  export const templates = (function () {
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
      const pageName = file.id || file.name || file.getAttribute('name')
      pages[pageName] = {};
  
      // file.import is the #document of a file
      file.import.querySelectorAll('template').forEach((template) => {
        var templateName = template.id || template.name || template.getAttribute('name')
        pages[file.id][templateName] = template.content // template.content is the document-fragment of a template
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
  }());
  
  export const fill = (function() {
    function fill(template, values) {
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
      template.querySelectorAll('textarea').forEach(function(textarea) {
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
            'Slot attribute must have a value. (e.g.: slot="slotname")'            
          )
  
        // would happen if you did `slotname: '' || undefined || null || 0`
        if (!slotData)
          return console.error(
            `No slot data for attribute slot ${slotName}!\n`,
            `Must be an object. (e.g. slotname: { img: "path/to/image.png" }`
          )

        // would happen if you did `slotname: 'hello' || '12' || ['word','word']
        if (typeof slotData !== 'object' || Array.isArray(slotData))
          return console.error(
            `Slot data for attribute slot ${slotName} is not an object!\n`,
            `Must be an object. (e.g. slotname: { img: "path/to/image.png" }`
          )

        Object.keys(slotData).forEach(atr => node.setAttribute(atr, values[slotName][atr]))
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
      if (typeof node !== 'object' && (node === 0 || node !== ''))
        slot.insertAdjacentHTML('beforeBegin', node) // if we're worried about js injection, we should replace this with insertAdjacentText; that will also prevent us from using the html shortcut feature
    
      // insert DOM nodes (templates, DOM elements or nodes, documents, or document fragments) into slot
      else if (node && node.nodeType)
        slot.parentNode.insertBefore(node, slot)

      // insert default if node is not defined (0 and '' will get caught by the first if)
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
  
    return fill
  } ());