# TinyThings
A tiny NodeJS web application for connecting with the [RERUM API](https://store.rerum.io/v1/API.html).  This is for software developers looking to develop a client application that uses the RERUM API as the client's back end.  Feel free to fork this as a starting point for the client application.  Visit [rerum.io](https://rerum.io) for more general information about RERUM. See a working demo of this application at [tiny.rerum.io](https://tiny.rerum.io/app).

### Registration Prerequisite
What authenticates and attributes your fork of TinyThings with RERUM is the token information in a `.env` file.  The `sample.env` file included in the codebase details the required information.  You need to make your own `.env` file with the information presented in the `sample.env` file.  To get tokens you must register at [store.rerum.io](https://store.rerum.io/v1).  Once you have the tokens in a `.env` file you can install and/or deploy your fork.

### Client App
In this form, the app has a front end for user input which intiates various requests (create - update - delete - find) to interact with the RERUM API.
To set up as a client app...
- This
- That
- The Other

### Centralized Client API
In this form there is no app front end.  Instead, only the underlying hooks to interact with the RERUM API are exposed.  Other web applications can use this Client API to interact with the RERUM API without registering themselves.  However, their data will not be uniquely attributed because all the data will share the same registered agent - the agent that established the Client API.  This is useful when multiple disparate front end driven applications interact with the same data corpus for the same purpose and so do not require individualized attribution.
To set up as a Client API...
- This
- That
- The Other
  
### 🌟👍 Contributors 👍🌟
Trying to contribute to the public TinyThings?  No way, that's awesome.  Read the [Contributors Guide](CONTRIBUTING.md)!

# Who is to blame?
The developers in the Research Computing Group at Saint Louis University authored and maintain this template in connection with the RERUM API service.
Neither specific warranty nor rights are associated with RERUM; registering and contributing implies only those rights 
each object asserts about itself. We welcome sister instances, ports to other languages, package managers, builds, etc.
