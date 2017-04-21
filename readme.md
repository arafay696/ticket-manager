# Codeigniter (3.1.3) and AngularJS Starter Application

Repo for a starter application for a Single Page Application featuring the modern Codeigniter PHP framework (3.1.3) and front-end framework AngularJS. Just download and install and you have a good foundation for building any application.

## Folder Structure

```
codeigniter/
├── angular/
│   ├── js
│   ├── partials
├── application/
├── composer.json
├── bower.json
├── gulpfile.js
├── composer.lock
├── public/
│   ├── .htaccess
│   └── index.php
└── vendor/
```

## Features!

- Composer
- Single Page Application
  - Optimized Codeigniter and AngularJS routes
    - You kind of don’t need to care about routes, they work automatically as you add new views. Still allows for flexibility if you plan any special routes.
- Gulp readily configured
  - Versioning of CSS and AngularJS files
- Comes with AngularJS configured to work together at their best
- Angular animation 
- Angular Pagination
- Angular Datepicker
- And more... have a try!

## Installation
```
git clone https://github.com/arafay696/starter-codeigniter-angularjs.git
```
```
composer update
```
```
npm install
```
```
bower install
```

## Run

To provide the JS and CSS files and to keep track of changes to these files:
```
gulp
```

Start application:
```
http://localhost/{directory-name}
```

## Requirements

- PHP 5.3.7 or later
- `composer` command (See [Composer Installation](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx))
- NPM
- Gulp
- `bower` command (See [Bower installation](https://bower.io/))

Enjoy! Any feedback is welcome.