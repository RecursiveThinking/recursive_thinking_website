# Recursive Thinking: The Website


## Using Templates

Use the `<template>` element to create a new HTML template that can be reused at will. 

You can specify **dynamic content** (Element Slots) by using `<slot>` elements. You can set default output from a slot by defining it's inner html (e.g. `<slot name="location">Seattle, WA</slot>`).

You can specify **dynamic attributes** (Attribute Slots) on an HTML element by specifying a `slot=""` attribute. You can provide default values for attributes by defining them in the template. If the data is not overridden, the value in the template will be used. 

Once you've created it, use the `fill(<template>, <dataObject>)` javascript function to fill your template. `<template>` is the template you just made (accessible by `templates.PAGENAME.TEMPLATENAME`) and fill data is an object of key value pairs where the key corresponds to a slot in your template and the value corresponds to the data you're inserting.

Make sense? No? Great! Here's an example that'll probably help:

**Add Template To Project**
```html
<link name="recursiveDirectory" href="templates/recursiveDirectory.html" type="text/html" rel="import">
``` 

**Define your Template (in templates/recursiveDirectory.html)**
```html
<!-- Define a new template named 'developer' -->
<template name="developer">
  <div class="developer">
    <!-- slot="picture" is an example of defining an Attribute Slot -->
    <!-- you can add attributes to the <img> element via the "picture" slot -->
    <!-- 'alt' and 'class' are examples of two attributes that are being defaulted -->
    <img slot="picture" class="devPicture" alt="profile picture for this developer">
    <div class="fc-text-group">
      <!-- the two <slot> elements ("name" and "title") are examples of Element Slots -->
      <h2 class="devName colorGray42 fw500"><slot name="name" /></h2>
      <h3 class="devTitle colorGray42 fw300"><slot name="title">Developer</slot></h3>
    </div>
  </div>
</template>
```

**Fill your Template**
```js
fill(templates.recursiveDirectory.developer, {
  // name of slot : data to insert

  name: "Nathaniel" // insert `Nathaniel` into <slot name="name" /> as HTML
  // not defining title, so the default title ( "Developer" ) will be used

  // insert `src="/path/to/epic/photo.png"` and `alt="A Badass Dude"` into slot="picture" as attributes
  picture: {
    src: "/path/to/epic/photo.png",
    alt: "A Badass Dude"
    // not defining class, so it'll use the default we defined above ( "fc-text-group" )
  }
})
```

**Rendered HTML**

```html
<template name="developer">
  <div class="developer">
    <img class="devPicture" src="/path/to/epic/photo.png" alt="A Badass Dude">
    <div class="fc-text-group">
      <h2 class="devName colorGray42 fw500">Nathaniel</h2>
      <h3 class="devTitle colorGray42 fw300">Developer</h3>
    </div>
  </div>
</template>
```

### Template API

#### `<template name="TEMPLATENAME" [id="TEMPLATENAME"]>`

Use a `<template>` element to define a new template.  
Use a `<slot>` element to define dynamically inserted content.  
Use a `slot=""` attribute on an element to define dynamically inserted attributes.

**Details**

**`name`** *`(attribute)`*: the name by which you will reference the template.  
**`id`** *`(attribute)`* *`[deprecated]`*: the name by which you will reference the template (use `name` instead).  
**`<slot name="SLOTNAME">`** *`(Element Slot)`*: An element that represents insertion of Text, HTML or other Templates.  
**`slot="SLOTNAME"`** *`(Attribute Slot)`*: An attribute that represents insertion of attributes on a non-slot element.

Templates are represented as `document-fragments` in javascript.
<br>
<br>

#### `fill(template, fillData)`

Fills a template using the `fillData` object. If fillData is not defined, template will be inserted as-is.

**Arguments**

**`template`** *`(document-fragment)`*: The template object to be filled. (e.g. `templates.PAGE.TEMPLATEID`)  
**`fillData`** *`(object)`*: Data object to be used to fill template.

`keys` in the fillData object map to the names slots in the template. (e.g. { slot1: '...' })  
`values` are the value to be inserted in the slot (strings, html strings, numbers, template, and elements are all valid)

```js
fillData: {
  slot1: 'some string',
  slot2: 10,
  slot3: `<div>element with an ${insertedVariable}</div>`,
  slot4: document.createElement('div') // you'd do this earlier and attach some data here, probably
  slot5: templates.PAGE.TEMPLATEID // fill(templates.PAGE.TEMPLATEID2, {...}) is also supported
}
```

**Returns**

**`template`** *`(Template)`*: A filled template