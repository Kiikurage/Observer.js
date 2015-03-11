# Observer.js

A Wrapper module of Object.observe / unobserve.

## Strong Point

If you call Native-API many times, it's too slowly.
```javascript
var object = {};
console.time('NativeAPI');
for (var i = 0; i < 1000000; i++) Object.observe(object, function(){});
console.timeEnd('NativeAPI');
// -> about 3000ms ~ 8000ms
```

But, using this module, it's very fast!
```javascript
var object = {};
console.time('Observer.js');
for (var i = 0; i < 1000000; i++) Observer.observe(object, function(){});
console.timeEnd('Observer.js');
// -> about 500ms ~ 1500ms
```

See this [http://qiita.com/Mr_Temperman/items/19893807b51ddb14408c](http://qiita.com/Mr_Temperman/items/19893807b51ddb14408c)(Japanese)

## Usage

### Objserver.observe(object, callback);

Observe object.

### Objserver.unobserve(object, callback);

Unobserve object.

### Browser Compatibility

This module need native-support of Object.observe / unobserve,
so, only Chrome and Opera is supported now. sorry.