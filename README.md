### Sensor Sink

#### Development

You need to pull dependencies using `npm i` form your source directory.

Ensure you have [envset][envset] and [slv][slv] installed, you can follow instructions on their respective repositories.

**Generate envset file from template**
Locally save the file `.envset.tpl` as `.envset` and provide valid values for the environment variables:

* NODE_UBIDOTS_TOKEN
* NODE_UBIDOTS_URL

* NODE_BEEBOTTEB_ACCESS_KEY
* NODE_BEEBOTTEB_SECRET_KEY


Once you have a valid `envset` file, to run the server:

```
$ envset development -- ./bin/www
```

If you  have `supervisor` installed:
```terminal
$ envset development -- supervisor ./bin/www
```

If not you can install it by issuing the following command:
```terminal
$ npm i -g supervisor
```

#### Tests

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

Data Models:

Location:
- Region
- Building
- Floor
- Unit (Office, House, Apartment)
- Room

Entities:
- Device (RPi, Arduino)
- Sensor
- Actuator (light, led, speaker)
- Commander (button)

Actions:
- Scene
- Command
- Action
- Event

Support:
- Configuration


Humans:
- User
- Employee
- Guest
- Visitor

[pir-sensors]:https://github.com/goliatone/rpi-pir-sensor
[envset]:https://github.com/goliatone/envset
[slv]:https://github.com/goliatone/slv
