# Easy Http Mock

This project is to make it extremely easy to capture data for use in AngularJs testing, just by browsing your application.

I would consider this an extreme pre-release. The api isn't stable, hell there isn't even unit testing for it yet. It's more of an experiment at this point.


## Usage

Include the file as you would any other AngularJs module, and at ``easyHttpMock`` to your app's module list. That's it! As you browse your application it will record the data in memory. Dump this however you wish, such as the console or by writing it on the page.

## Usage with testing (Jasmine)

While this is **completely untested**, I'm imagining that you would write the dumped data into a .js file and include that in your testing includes. Then when you need to setup your backend you would do something like:

```javascript

easyHttpMock($httpBackend, data);

```

This function will setup the ``$httpBackend.when().respond()`` calls.

See [$httpBackend docs](http://docs.angularjs.org/api/ngMock/service/$httpBackend) for more details.