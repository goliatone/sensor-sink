

To run the app, from terminal:

```terminal
$ DEBUG=sensor-sink ./bin/www
```

If you  have `supervisor` installed:
```terminal
$ DEBUG=sensor-sink supervisor ./bin/www 
```

If not you can install it by issuing the following command:
```terminal
$ npm i -g supervisor
```


TODO:
- Check `swig` template engine.

Estimote UUID:
B9407F30-F5F8-466E-AFF9-25556B57FE6D
major:
minor:
region: <= we have a location, devices places in one location can be members of multiple regions.
