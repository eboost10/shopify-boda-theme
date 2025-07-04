Demo: https://boda-demo.myshopify.com/

Password: 1234

# BODA SHOPIFY THEME

## STANDARD SECTIONS
+ Announcement bar
+ Quick order list
+ Collage
+ Collapsible content
+ Collection list
+ Contact Form
+ Custom Liquid
+ Email signup banner
+ Blog posts
+ Featured collection
+ Featured product
+ Icon With Text
+ Image banner
+ Image with Link
+ Image Banner Overlay
+ Image with text
+ Multicolumn
+ Multirow
+ Email signup
+ Product Tab
+ Quick order list
+ Related products
+ Rich text
+ Product list
+ Slideshow
+ Testimonial
+ Video

## USE SETTING MENU

![BODA Screenshot](docs/boda-shopify-theme-menu.jpg)


### Add color for top level

1. Go to Online Store -> Themes -> Customize button
2. Sections -> Header  Sections -> Add block -> Color Menu

![BODA Screenshot](docs/Boda-Eboost-menu04.png)

3. Select color -> Select url match url that you would like to show color

![BODA Screenshot](docs/Boda-Eboost-menu03.png)
![BODA Screenshot](docs/Boda-Eboost-menu02.png)


### Use images for level 1

1. You need add an image for collection. Go to Admin -> Products -> Collection -> select collection -> add an image

![BODA Screenshot](docs/Boda-Eboost-menu06.png)

2. Go to Online Store -> Themes -> Customize button
3. Sections -> Header  Sections -> Turn on "Show image"

![BODA Screenshot](docs/Boda-Eboost-menu05.png)

### Add icon for level 2

1. Go to Online Store -> Themes -> Customize button
2. Sections -> Header  Sections -> Add block -> Icon
3. Upload an icon 
4. Select url match url that you would like to show icon

![BODA Screenshot](docs/Boda-Eboost-menu01.png)


## USE PROGRESS SHIPPING (both cart drawer and cart page)

![BODA Screenshot](docs/Boda-cart-progress-bar-drawer.png)
![BODA Screenshot](docs/Boda-cart-progress-bar-page.png)


1. Go to Online Store -> Themes -> Customize button
2. Settings -> Progress Bar Shipping -> check Enable Progress Bar shipping to turn on it
3. Add total price, messages for free shipping

![BODA Screenshot](docs/Boda-cart-progress-bar-config.png)


## USE COUNTDOWN ON PRODUCT DETAIL PAGE

To enbable countdown on product detail page. We need follow step by step below:

![BODA Screenshot](docs/Boda-countdown.png)


1. Go to Online Store -> Themes -> Customize button -> Settings
2. Expand Product cards -> click Enable Countdown? to enable this featured



3. Select option 
	- Use for all products -> If you chose this option After that go to step 4 
	- Use for different product -> If you chose this option. After that go to step 5
4. Add a deal time with a format like "2025/12/25 22:11:00". This time must be greater than the current time.

5. Go to Settings->Metafields and metaobjects -> Products -> click Add definition button on top right 

![BODA Screenshot](docs/Boda-Metafields-and-metaobjects.png)

6. Create a metafield

```bash

Namespace: custom
Key: countdown
Type: Date and time

```
![BODA Screenshot](docs/Boda-Product-metafield-definitions-countdown.png)


7. Go to  products -> Select product that you would like to show count down

8. Add a deal time for this product. This time must be greater than the current time.

![BODA Screenshot](docs/Boda-product-add-countdown.png)


## SETTING TO SHOW WISHLIST


1. Go to Online Store -> Themes -> Customize button -> Settings

2. Expand Product cards -> click "Enable Wishlist?" to show wishlist icon on card product and product detail page

![BODA Screenshot](docs/Boda-theme-wishlist-config.png)

3. Go to Sections -> Header section -> check "Enable Header Wishlist" 

![BODA Screenshot](docs/Boda-wishlist-header.png)

3.  Go to Online Store -> Pages -> Create wishlist page

```bash

URL and handle: wish-list
Theme template: wishlist

```

![BODA Screenshot](docs/Boda-Eboost-Wishlist.png)


## TURN ON THE COMPARISON ON THE COLLECTION PAGE

![BODA Screenshot](docs/compare-popup.png)

1. Go to Online Store -> Themes -> Customize button -> Theme settings
2. Expand Compare Products tab
3. Turn on/off and update your setting 


![COSMETIC Screenshot](docs/Boda-Eboost-compare.png)



## TURN ON THE NEWSLETTER POPUP

![BODA Screenshot](docs/Boda-newsletterpopup.jpg)

1. Go to Online Store -> Themes -> Customize button -> Theme settings
2. Expand Newsletter Popup tab
3. Turn on/off and update your setting 


![BODA Screenshot](docs/Boda-newsletterpopup-config.png)


## SETUP COLOR SWATCH ON PRODUCT CARD

![BODA Screenshot](docs/Boda-swatch.png)

1. Go to Online Store -> Themes -> Customize button -> Settings

2. Expand Product cards 

3. Add name of option that you would like to show the color swatch ( ex: color or colour ....)


![BODA Screenshot](docs/Boda-swatch-config.png)



## HOME PAGE

![BODA Screenshot](docs/HOME.png)
![BODA Screenshot](docs/home-mobile.png)


## COLLECTION PAGE

![BODA Screenshot](docs/PLP.png)
![BODA Screenshot](docs/PLP_list.png)
![BODA Screenshot](docs/PLP_showmore.png)
![BODA Screenshot](docs/PLP-mobile.png)

 
##  PRODUCT DETAIL PAGE

![BODA Screenshot](docs/PDP.png)
![BODA Screenshot](docs/PDP_mobile.png)


##  CART PAGE

![BODA Screenshot](docs/CART.png)
![BODA Screenshot](docs/Cart-mobile.png)


##  WISH LIST

![BODA Screenshot](docs/wishlist.png)
![BODA Screenshot](docs/wishlist-mobile.png)


##  FAQ

![BODA Screenshot](docs/faq.png)
![BODA Screenshot](docs/faq-mobile.png)


##  ABOUS US

![BODA Screenshot](docs/about-us.png)
![BODA Screenshot](docs/about-us-mobile.png)


##  CONTACT US

![BODA Screenshot](docs/contact.png)
![BODA Screenshot](docs/contact-mobile.png)


##  BLOG

![BODA Screenshot](docs/blog.png)
![BODA Screenshot](docs/blog-mobile.png)


## Bugs/Feature Requests & Contribution

Please do open a pull request on GitHub should you want to contribute, or create an issue.

## License
[BSD-4-Clause](http://directory.fsf.org/wiki/License:BSD_4Clause) - Do as you wish 👍

## Our website

https://www.eboosttech.net

[DONATE](https://paypal.me/eboost10)  `❤❤❤`
