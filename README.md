#Cats

Cats is a Javascript plugin that will replace all `<img>`s on a page with pictures of cats when a certain URL hash criteria is met.

##Usage

Include the following in the `<head>` of your document:

```html
<script src="cats.js"></script>
```

To initialize the plugin, add the following to your document:

```html
<script type="text/javascript">
	Cats.init();
</script>
```

Take care to call `Cats.init()` after the page has been fully loaded with either:

```js
window.onload = function () {
	Cats.init();
};
```

Or with jQuery:

```js
$(function () {
	Cats.init();
});
```

When the URL hash changes to `#cats`, it will trigger the plugin to replace all `<img>`s with pictures of cats.

The plugin will revert back to the original images if the hash no longer matches `#cats`.

##Configuration

There are a number of configurable aspects of this plugin.

###Hash

By default, the URL hash that the plugin is waiting for is `#cats`. This can be changed by accessing that variable directly:

```js
Cats.hash = "dogs";
```

Note: Leave the octothorpe (#) out. It will be added automatically.

###URL

While this plugin is meant to replace images with cat pictures, any other type of placeholder image library may be used, provided that it follows the same URL scheme as the default image library that is being used: [placekitten.com](http://placekitten.com/)

URLs are formatted like this, where `200` is the width and `300` is the height:

```html
http://placekiten.com/200/300
```

Here are a few other libraries that use the same URL scheme:

*	[placecorgi.com](http://placecorgi.com/) (Corgis)
*	[placedog.com](http://placedog.com/) (Dogs)
*	[placepuppy.it](http://placepuppy.it/) (Puppies)
*	[placehold.it](http://placehold.it/) (Regular)
*	[placesheen.com](http://placesheen.com/) (Charlie Sheen)
*	[placecage.com](http://placecage.com/) (Nic Cage)

Access the variable directly to change the image library:

```js
Cats.url = "placesheen.com"
```

###Cutoff

You may not want all images to be replaced. Some smaller images or icons might look distorted when replaced. You may set the minimum dimensions of images you want to be replaced. By default, any image with a width or height less than `100px` will not be replaced.

```js
Cats.cutoff = 200;
```

##Tested Environments

Tested and working on:

*	Google Chrome (Mac + PC)
*	Firefox (Mac + PC)
*	Safari (Mac + PC)
*	Opera (Mac + PC)