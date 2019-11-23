# preventDefault() vs return false vs stopPropagation()

**At a Glance**:
event.preventDefault() - This prevents the browser's default behaviour, such as opening a link. It **does not stop the event from bubbling up the DOM**.
event.stopPropagation() - Prevents the event from bubbling up the DOM, but does not stop the browser's default behaviour. *Appears to be the reverse of preventDefault*.
return false - In vanilla JS, it doesn't have any effect on the default behaviour or event propagation of the element. *It is something you can use in jQuery however.*

## Event Propogation

Also known as event bubbling, it relates to the order in which event handlers are called when one element is nested inside a second element, and **both elements have registered a listener for the same event**. *When a child element receives an event, the event bubbles up to the parent element. *

## event.preventDefault

Using a file drag and upload code snippet as an example:
```javascript
dropzone.addEventListener('click', fileUpload);

button.addEventListener('click', (event) => { // button is an 'a' tag.
  event.preventDefault(); // prevents the default behaviour when the 'a' tag is clicked.
  fileUpload(); 
});
```
The 'a' tag's *href* attribute is set to '#', which ordinarily causes the page to jump back to the top. We use preventDefault() to prevent this from happening, but still opening the file upload dialog via fileUpload().

## event.stopPropagation

When an event is called on an element, that event bubbles up the DOM and gets called on all of the elements parents. When the fileUpload button is clicked, that click event is also alled on all of its parent elements, including the drop zone. 

Therefore, if you remove the fileUpload() call in the button event listener, the function will still be called when we click on the button. This is due to the click event bubbling up the DOM and being called on the dropzone. We can use stopPropagation to prevent the default bubbling behaviour so that the **event is only registered by the element it is called upon**.

```javascript
dropzone.addEventListener('click', fileUpload);

button.addEventListener('click', event => event.stopPropagation());
```
Over here we removed the preventDefault call and replaced it with stopPropagation. The click event no longer bubbles up the DOM, but by removing preventDefault() the 'a' tag acts as it should again, navigating to its href attribute - *in this case, the '#' which brings you to the top of the page*.

**The fix**
```javascript
dropzone.addEventListener('click', fileUpload);

button.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  fileUpload();
});
```
Use both if you need to prevent the default behavior AND you need to prevent the event from bubbling up the DOM.

[src](https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb)