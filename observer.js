/**
 *  @namespace
 */
var Observer = {};

/**
 *  @typedef {number}
 */
Observer.GUID;

/**
 *  generate GUID
 *  @return {GUID}
 */
var GUID = (function() {
    var GUID_ = 0;
    return function() {
        return ++GUID_;
    }
}());

/**
 *  Map of observe data.
 *  @type {Object<GUID, [Function]>}
 */
Observer.callbacks = {};

/**
 *  Is Object.observe native-supported.
 *  @type {boolean}
 */
Observer.NATIVE_SUPPORT = (typeof Object.observe === 'function');


/**
 *  Observe object with a property name.
 *  @param {Object} object target object.
 *  @param {Function} callback callback function.
 */
Observer.observe = function(object, callback) {
    var id = object.observerGUID_;

    if (id) {
        Observer.callbacks[id].push(callback);
        return;
    }

    id = object.observerGUID_ = GUID();
    Observer.callbacks[id] = [callback];

    Object.observe(object, Observer.observeCallback);
};


/**
 *  Unobserve object with a property name.
 *  @param {Object} object target object.
 *  @param {string} name target property name.
 *  @param {Function} callback callback function.
 */
Observer.unobserve = function(object, name, callback) {
    var id = object.observerGUID_,
        i, max, callbacks;

    if (!id) return;

    callbacks = Observer.callbacks[id];
    for (i = 0, max = callbacks.length; i < max; i++) {
        if (callbacks[i] === fn) {
            callbacks.splice(i, 1);
            i--;
            max--;
        }
    }

    if (max === 0) {
        Observer.unobserveAll(object);
    }
};

/**
 *  Unobserve object for all property
 *  @param {Object} object target object
 */
Observer.unobserveAll = function(object) {
    var id = object.observerGUID_;

    if (!id) return;

    delete Observer.callbacks[id];
    Object.unobserve(object, Observer.observeCallback);
};

/**
 *  Callback function of Object.observer.
 *  @param {[Object]} changes changed.
 *  @private
 */
Observer.observeCallback = function(changes) {
    var object = changes[0].object,
        id = object.observerGUID_,
        callbacks, i, max;

    if (!id) return;

    callbacks = Observer.callbacks[id];

    for (i = 0, max = callbacks.length; i < max; i++) {
        callbacks[i](changes);
    }
};
