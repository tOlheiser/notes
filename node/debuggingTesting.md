# Debugging Node

Level 1: Using console.log to log your way through fixing your app.
Level 2: Using the debugger

**How to use the debugger**
* Run your file with the inspect flag.
*node --inspect exercise/api/server.js*
* Open chrome, then type 'chrome/inspect' into the address bar.
* This gives you a target and an inspect link you can click on.

# Testing

Anatomy of Tests
* Your code to be tested
* Test Suite - helps organize your tests, provide hooks, and overall environment.
* Assertion library - does the actual comparisons in your tests. 

*Jest seems to be a good tools to use*

**Types of Tests**
* Unit - Testing individual units, functions, to expect a specific outcome.
* Integration - Seeing how things work together. Such as what you expect to receive vs what you actually receive from an api call.
* End-to-end - Client - to server behaviour.
* UI
* Snapchat - When a component changes, you take snapshots to ensure they still look alike.
* Performance.
