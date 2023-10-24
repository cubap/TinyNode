# TinyThings
A tiny NodeJS web application for connecting with the [RERUM API](https://store.rerum.io/v1/API.html).  Feel free to fork this as a starting point for creating your own application that uses the RERUM API service.  Visit [rerum.io](http://rerum.io) for more general information about RERUM. See a working demo of this application at [tinydev.rerum.io](http://tinydev.rerum.io/app).  Want to use the RERUM API in your web application? Learn how at the [API page](https://github.com/CenterForDigitalHumanities/rerum_server/blob/master/API.md).

### Registration Prerequisite
What authenticates and attributes your fork of TinyThings with RERUM is the token information in a `tiny.properties` file.  The `tiny.sample.properties` file included in the codebase details the required information.  You need to make your own tiny.properties file with the information presented in the tiny.sample.properties file.  To get tokens you must register at [store.rerum.io](https://store.rerum.io/v1).  Once you have the tokens in a `tiny.properties` file you can install and/or deploy your fork.

### Client App
In this form, the app has a front end for user input that intiates various requests (create - update - delete - find) to interact with the RERUM API.
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
Neither specific warranty or rights are associated with RERUM; registering and contributing implies only those rights 
each object asserts about itself. We welcome sister instances, ports to other languages, package managers, builds, etc.
