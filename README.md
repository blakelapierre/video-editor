# base-angular

#### An advanced, base Angular.js project supporting ECMAScript 6/7, LESS, modularized Angular development, and comes with an out-of-the-box full-featured Gulp.js build and development pipeline.

#### Tuned for rapid web application development and deployment.

---------------

 First, make sure you have gulpur installed so that you can use ECMAScript 6 features in the gulpfile. This allows more concise syntax and is thus easier to read.

`npm install -g gulpur`

##### Install
````
git clone https://github.com/blakelapierre/base-angular
cd base-angular/frontend
npm install
````


##### Development
During development use the `dev` task to launch a browser window pre-wired to live reload instantly when you modify the source (HTML/LESS/JS).

`gulpur dev`


##### Build
Produce a concatenated, minified, distributable directory.

`gulpur build`

The output is placed in `frontend/.dist`.


---------------
Pull Requests, Issues, and all other Contributions are welcome and encouraged. The goal of this project is to be a base to facilitate the rapid development of websites, either for personal projects, or for widespread distribution.