# Remote Roofing’s Backend Development challenge

Code repository for API test code for Remote Roofing

In this repository you can find all the code and config files that you need to run the application

## Config files

We've got two config files:

* /src/server/config/config.json: Here you can find the config of your database. By default, the application runs in development mode, so change that values, please.
* .env: In this file you ca find the configuration of server. You can find the name and port of server and the domain of the API.

## Package.json

In this file you can find several scripts:

* clean-build: Clean the build directory
* dev: Run the application in development mode
* build-server: Create a directory with all the code which is needed to a production server
* test: Run the tests developed for the application

## Security
* _helmet_: Helmet helps you secure your Express apps by setting various HTTP headers. Helmet is a collection of 14 smaller middleware functions that set HTTP response headers. Running app.use(helmet()) will not include all of these middleware functions by default.


## Testing

To make the tests of the application I have used Jest. Please, before to run the tests, clean de database of data, because during the test run this insert
data in the tables and make searches from this data.