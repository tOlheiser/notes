import React from 'react'
import {useRef, useLayoutEffect} from 'react'

// Check if the DOM is ready, and the window contect exists
// --> We do so by checking if window is defined
const isBrowser = typeof window !== "undefined";

// Function to get the current scroll position
function getScrollPosition({ element, useWindow }) {
  // if it doesn't run inside the browser, return the default values.
  if (!isBrowser) {
    return {
      x: 0,
      y: 0
    }
  }

  // Did the user request the scroll position of the entire page or any specific element?
  /* The element is passed into the function by its reference, created with
  useRef hook, so we access it by using element.current */
  const target = element ? element.current : document.body;

  const position = target.getBoundingClientRect();

  return useWindow 
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  /* useRef() is handy for keeping any mutable value around similar to how 
  you’d use instance fields in classes. It is a stateful value that won't
  trigger re-render on each state change. 
  
  Because the hook is tightly bound to DOM, it needs to be implemented inside
  an Effect hook. By default effects run after every completed render, but
  you can choose to fire it only when certain values have changed */
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currentPosition = getScrollPosition({element, useWindow})
    effect({ previousPosition: position.current, currentPosition})
    position.current = currentPosition;
    throttleTimeout = null;
  }
 
  /* useLayoutEffect is the effect hook we need because it runs synchronously
  immediately after React has performed all DOM mutations. Works the same
  way as componentDidMount and componentDidUpdate
  
  Your code runs immediately after the DOM has been updated, but before the 
  browser has had a chance to "paint" those changes*/
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        } 
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}