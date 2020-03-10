# Authentication

You can never truly protect an API, but requesting authentication makes it safer. 

**Authentication** is controlling if an incoming request can proceed or not.

**Authorization** is controlling if an authenticated request has the correct permissions to access a resource.

**Identification** is determining who the requester is.

## JWT Authentications

Tokens passed on every request to check auth on the server. It allows the API to be stateless with user auth. It is created by a combination of secrets on the API and a payload like a user object.

