# NawDrawJS
Navigation Drawer like Drawer from Android Support Library v4 rolling hamburger.
## Demo
<img src="demo/demo.gif">

# How to use
**NavDrawJS** is a function but not an object, so you must initialize it by calling function name when document is loaded.
**NavDrawJS(args)** takes in only one object element which may include the next things:
  1. **The DOM Elements Structure**:
    * You don't need to pass the DOM Elements Structure. If You do not do this, the DOM Elements Structure will be created and stylized by NavDrawJS.
    * You can pass existing elements or You can pass id's values of elements. In case you pass elements or elements' ids, NavDrawJS won't stylize the elements, so You **need to use NavDrawCss**.
  2. **Mobility parameter**
    * Points on version of device. This feauture is used because mobile devices (particularly Smartphones with Android OS or iPhones) have another type of defining a cursor coordinates. **This parameter can have only boolean value** (**true** or **false**)
