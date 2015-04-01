# Redmine.JS

[![Build Status](https://img.shields.io/travis/tomzx/redmine.js.svg)](https://travis-ci.org/tomzx/redmine.js)

AngularJS based Redmine REST API client.

## Requirements

* node.js/io.js
* grunt-cli
* bower

## Getting Started

1. npm install
2. grunt

Make sure that you are serving `public/index.html` from a webserver as it will not work if you simply open `public/index.html` directly.

## Server configuration

In order to use this frontend, your redmine server must return the appropriate CORS headers.

```
Access-Control-Allow-Headers: X-Requested-With, X-Prototype-Version, Content-Type, X-Redmine-API-Key
Access-Control-Allow-Methods: OPTIONS, GET,  POST, PUT, DELETE
Access-Control-Allow-Origin: *
```

You may install the [Redmine CORS](https://github.com/mavimo/redmine_cors) plugin to do so. Make sure to patch `lib/redmine_cors/patches/application_controller.rb` if you want to be able to use the `DELETE` action.

## Source

Forked from [lightmine.js](https://github.com/dontdrinkandroot/lightmine.js).

## License

The code is licensed under the [MIT license](http://choosealicense.com/licenses/mit/). See [LICENSE](LICENSE).