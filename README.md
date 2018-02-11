# Recursive Thinking: The Website


## Using Templates

### Defining a Template

#### `<template id="TEMPLATEID">`

Use a `<template>` element to define a new template.

**Details**

**`id`** *`(Attribute)`*: the id by which you will reference the template.  
**`<slot name="SLOTNAME">`** *`(Element)`*: An element that represents insertion of Text, HTML or other Templates.  
**`slot="SLOTNAME"`** *`(Attribute)`*: An attribute that represents insertion of attributes on a non-slot element.  

**Example**

Lines 7, 10 are examples of **Text, HTML Text, and HTML Element** insertion.  
Line 11 is an example of **Text, HTML Text, and HTML Element** insertion with a default value. If location is not set, Seattle, WA will be inserted.  
Line 4 is an example of **Attribute** insertion.

```html
 1    <template id="developer">
 2      <div class="cell">
 3        <article class="directory-card">
 4          <img class="devPicture" slot="picture">
 5          <div class="fc-text-group">
 6            <a href="./templates/viewProfile.html" target="_blank">
 7              <h2 class="devName colorGray42 fw500"><slot name="name" /></h2>
 8            </a>
 9            <hr>
10            <h3 class="devTitle colorGray42 fw300"><slot name="title" /></h3>
11            <h4 class="devLocation colorGray42 fw300 ttup"><slot name="location">Seattle, WA</slot></h4>
12          </div>
13        </article>
14      </div>
15    </template>
```

### Filling a Template

#### `fill ( template, fillData )`

Fills a template using the `fillData` object. If fillData is not defined, template will be inserted as-is.

**Arguments**

**`template`** *`(Template)`*: A Template element with `<slot>` elements and `slot="*"` attributes. (e.g. `templates.PAGE.TEMPLATEID`)  
**`fillData`** *`(Object)`*: Object where `keys` map to the names of slots and `values` are used to fill the slots.

**Example**

Lines 3, 5, 6, and 7 are examples of inserting into `<slot>` elements.  
Line 8-11 is an example of how to insert attributes into an element with a `slot=""` attribute.

```js
/*   1  */    setUpPage(fill(
/*   2  */      templates.recursiveDirectory.page, {
/*   3  */    
/*   4  */        // insert an array of templates into <slot name="recursiveDirectory" />
/*   5  */        recursiveDirectory: allUsers.map((user) => fill(
/*   6  */          
/*   7  */          templates.recursiveDirectory.developer, {
/*   8  */    
/*   9  */            // insert user.name into <slot name="name" />
/*  10  */            name: user.name,  
/*  11  */    
/*  12  */            // insert user.title into <slot name="title" />
/*  13  */            title: user.title,
/*  14  */    
/*  15  */            // insert user.location into <slot name="location" />
/*  16  */            location: user.location,
/*  17  */    
/*  18  */            picture: {
/*  19  */              // inserts src="./public/images/avatar2.png" into an element with slot="picture"
/*  20  */              src: `./public/images/${randomAvatar()}`,
/*  21  */    
/*  22  */              // inserts alt="Profile picture for DevName" into an element with slot="picture"
/*  23  */              alt: `Profile picture for ${user.name}`
/*  24  */            }
/*  25  */          }
/*  26  */        ));
/*  27  */      }
/*  28  */    ));
```