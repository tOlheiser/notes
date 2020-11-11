# Introduction

## What is an API

A server that creates an HTTP interface for interacting with some data. The API determines how you interact with it. The format, routes, verbs, headers, params, etc. 

APIs (on the server side) are generally built around CRUD:
* Create
* Read
* Update
* Destroy

## REST

REST is the most popular API design pattern. It's an API Design that combines DB resources, route paths, and HTTP verbs to allow applications to describe what action they are trying to perform. It works with basic data models, but it is hard to scale with complex data models.

### Node.js and APIs
* Node is JS, it's async and event driven.
* It is single threaded.
* When kept async, Node can handle a high amount of concurrent requests.

### Express
Express is the standard API framework for Node.js. It handles all the tedious tasks like managing sockets, route matching, error handling, delegating to controllers, async execution and more.

### MongoDB
It is the go-to non-relational DB, works like a dream in Node.js. It's a non-relational document store that is easy to get started and scales well.