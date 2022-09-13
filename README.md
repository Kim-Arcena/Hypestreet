# hypestreet [![NPM version](https://badge.fury.io/js/hypestreet.svg)](https://npmjs.org/package/hypestreet) [![Build Status](https://travis-ci.org/Kim-Arcena/hypestreet.svg?branch=master)](https://travis-ci.org/Kim-Arcena/hypestreet)

> Full-stack eCommerce website with Node.js, AWS, Firebase Firestore Database, Bcrypt, and Stripe API. This website can cater to end-users(potential buyers) and a dashboard for the sellers(CRUD). This website is also responsive and can work in any platform.

## Features
* There's a review section for each product that accepts user input. In order to review something, the user should be able to be authenticated.
* Firebase Firestore Database is used as the database for making the collections for the user, products, orders and reviews, and sellers.
* AWS S3 Bucket is used in securely storing images uploaded by the seller. Each shoe product should at least have three images that would be magnified accordingly in the product section.
* Each shoe product has its own id, name, sizes available, description, short description, details, and tags which will be used for searching.  
* The search button allows the users to search their preferences. The tag inputs(in a form of an array) from the add products page of the seller would be used as keywords in searching. 
* There is a cart section that takes the products being added to the cart by the end-users. The cart page does not necessarily require the user to be logged in. However, if they opt to check out for their orders, they need to be authenticated and fill up a form for their address. 
* Stripe API(Test Mode) is used to take orders from users. 
* Any inputs from the seller and/or user are validated in both the front-end and the back-end. Warning and form errors would be shown if the inputs are invalid. User inputs are checked before sending in the server and within the server using res.json().
* Finally, this website is also responsive and can work with any platform.


## Tools Used 
[![My Skills](https://skillicons.dev/icons?i=html,css,js,nodejs,regex,firebase,aws,heroku,figma,vscode,git)](https://skillicons.dev)

## Installation

```sh
$ npm install --save hypestreet
```

## Usage

```js
var hypestreet = require('hypestreet');
hypestreet();
```

## Initial Wireframe (Designed and Prototyped using Figma)
##### Structures from the design were follow and additional features were added including major/minor design and functionality changes.


## License

ISC © [Kimberly Arcena](https://www.linkedin.com/in/kimberly-arcena/)
