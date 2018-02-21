
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
        var vav = values[slot.name]
    
        if (Array.isArray(vav)) {
          vav.forEach(template => insertNode(slot, template))
        } else {
          insertNode(slot, vav)
        }
    
        slot.parentNode.removeChild(slot)
      })

      // deal with textareas inside slots (their contents don't render as HTML elements)
      template.querySelectorAll('textarea').forEach(function(textarea) {
        var sandbox = document.createElement('div') // make sandbox
        sandbox.innerHTML = textarea.textContent // move contents to sandbox
      
        // fill sandbox slots (the same way we do for slot elements)
        sandbox.querySelectorAll('slot').forEach(slot => {
          var vav = values[slot.name]
      
          if (Array.isArray(vav)) {
            vav.forEach(sandbox => insertNode(slot, sandbox))
          } else {
            insertNode(slot, vav)
          }
      
          slot.parentNode.removeChild(slot)
        })

        // replace textarea content with sandbox content
        textarea.innerHTML = sandbox.innerHTML
      })
    
      // deal with slot attributes
      template.querySelectorAll('[slot]').forEach(node => {
        var slotName = node.getAttribute("slot"),
            vav = values[slotName]
    
        if (!slotName) {
          console.error('Slot attribute missing slot name! (e.g.: slot="slotname: attribute1, attribute2")', node)
          return;
        }
  
        if (vav) {
          Object.keys(vav).forEach(atr => node.setAttribute(atr, values[slotName][atr]))
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
      else if (typeof node !== 'object')
        slot.insertAdjacentHTML('beforeBegin', node)
    
      // insert other DOM nodes (templates, DOM elements or document fragments) into slot
      else if (node && node.nodeType)
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
  } ());