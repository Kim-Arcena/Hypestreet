# hypestreet 

![239486770_103148468765115_7979051820284055835_n](https://user-images.githubusercontent.com/70198061/190309748-185870b3-4ef5-4593-bf0a-131270f4846e.jpg)



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


## Screenshots

### Desktop

![screencapture-localhost-3000-2022-09-15-11_36_50](https://user-images.githubusercontent.com/70198061/190308475-f9a48ec3-16c9-4b95-8663-87d4791cc3af.png)

![screencapture-localhost-3000-product-list-all-2022-09-15-11_33_19](https://user-images.githubusercontent.com/70198061/190308590-50edc88f-c462-4306-9c51-eedf34c6c691.png)

![screencapture-localhost-3000-products-adidas-yeezy-boost-350-v2-earth-3405-2022-09-15-11_33_01](https://user-images.githubusercontent.com/70198061/190308618-f998d536-a355-4d33-8d8f-446ac33e6280.png)

![screencapture-localhost-3000-checkout-2022-09-15-11_42_06](https://user-images.githubusercontent.com/70198061/190308988-a7ba5d39-87b7-47c4-b850-4d5f03b461e7.png)

![screencapture-localhost-3000-checkout-2022-09-15-11_42_06](https://user-images.githubusercontent.com/70198061/190309038-43a7af42-69df-4771-acbe-277fd3f67b95.png)


![screencapture-checkout-stripe-c-pay-cs-test-b16WDIuzBPaDTcM9dX6cLF5Uq7U8eUyAPy5RSfgFGz48p3GfSDyGxnPX8W-2022-09-15-11_42_39](https://user-images.githubusercontent.com/70198061/190309012-ad9273ff-746e-40e5-83ef-227bea3e498f.png)


### Mobile

![mobile (2)](https://user-images.githubusercontent.com/70198061/190309869-892179c7-821c-4a3b-857c-0daefa119a63.gif)
![mobile (3)](https://user-images.githubusercontent.com/70198061/190309916-585b009f-b145-4d82-a015-5f6771aab0a5.png)
![mobile (2)](https://user-images.githubusercontent.com/70198061/190309931-2f2ef331-877a-408d-b01e-029ac181301b.png)


![mobile](https://user-images.githubusercontent.com/70198061/190309904-462e2fa3-95c8-4b65-959a-1d40f872f1fd.png)


## License

ISC © [Kimberly Arcena](https://www.linkedin.com/in/kimberly-arcena/)
