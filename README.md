# Table Of Contents
*  [WebtrekkTask](#WebtrekkTask)
*  [Features implemented](#features-implemented)
*  [Running the project](#running-the-project)



# WebtrekkTask
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7 for `Webtrekk` company.


# Features implemented  
* JSDocs:
    full documentation using project comments can be found 
    via running the following command `npm run compodoc`
    then open the following page `documentation/index.html` 

* Unit Testing: 
    can be tested using `ng test --code-coverage` then navigate to `coverage/index.html`

* Multi language support to test any other language 

* Using `ngx-bootstrap` with overriding the bootstrap `scss` source code for better look and feel

* Angular Lazy loading modules

* Created special icons font from svg using `iconmoon` fonts

* Used Heruko for deployment with each master push on `https://webtrekk-customer-management.herokuapp.com/customers`

* Used `travis` for CI/CD to check if all the unit test runs and build work before deployment

* Created database on mongoLab on the following url to connect  `mongodb://admin:admin123@ds147180.mlab.com:47180/webtrekk`

* Created NodeJs server with express and mongoose to handle DB schema validation and seed data you provided as intial value for customers

* Create `RWA` with `bootstrap` with all screens responsive design

# Running the project
after downloading the project use `npm i` to install the project packages dependency
then run the following command `ng serve -o --port 5000` the project shall be running on the following url
`http://localhost:5000` after that you can navigate from search and hotil lists lists to see the application flow 