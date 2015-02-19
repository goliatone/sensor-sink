

To run the app, from terminal:

```terminal
$ ENV=development DEBUG=sensor-sink ./bin/www
```

If you  have `supervisor` installed:
```terminal
$ ENV=development DEBUG=sensor-sink supervisor ./bin/www 
```

If not you can install it by issuing the following command:
```terminal
$ npm i -g supervisor
```


### Development
To run mocha tests:

```terminal
$ ./node_modules/mocha/bin/mocha tests/* -G -w
```

TODO:
- Check `swig` template engine.

Estimote UUID:
uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
major: Location
minor: Sublocation
region: <= we have a location, devices places in one location can be members of multiple regions.


Flow:
- Device needs to be registered. APIKEY+TOKEN, will get an UUID if not present. Will get a configuration object, with initial device setup.
- Device sends live updates.
- Device gets live updates.


* Auth 
* Set value of device
