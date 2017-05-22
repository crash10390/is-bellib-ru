/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(14);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(11);

var ReactCurrentOwner = __webpack_require__(12);

var warning = __webpack_require__(2);
var canDefineProperty = __webpack_require__(13);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(38);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(6);

var ReactNoopUpdateQueue = __webpack_require__(34);

var canDefineProperty = __webpack_require__(13);
var emptyObject = __webpack_require__(15);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(2);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(6);

var ReactCurrentOwner = __webpack_require__(12);

var invariant = __webpack_require__(4);
var warning = __webpack_require__(2);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(2);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, exports) {

module.exports = "/static/images/glyphicons-halflings-regular.eot";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(12);
var ReactComponentTreeHook = __webpack_require__(33);
var ReactElement = __webpack_require__(5);

var checkReactTypeSpec = __webpack_require__(71);

var canDefineProperty = __webpack_require__(13);
var getIteratorFn = __webpack_require__(41);
var warning = __webpack_require__(2);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

let validator =  __webpack_require__(57);

module.exports = validator;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(63);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(74)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./main.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./main.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(44);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validator = __webpack_require__(43);
__webpack_require__(45);
var submittedForms = document.getElementById('validateThisID');
if (submittedForms) {
    submittedForms.addEventListener('submit', function (e) {
        validator(e);
    });
}

var Test = function (_Component) {
    _inherits(Test, _Component);

    function Test() {
        _classCallCheck(this, Test);

        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));
    }

    return Test;
}(_react.Component);

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);", ""]);

// module
exports.push([module.i, "/* -------= imports =------- */\n/*!\n * Bootstrap v3.3.7 (http://getbootstrap.com)\n * Copyright 2011-2016 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  padding: 0;\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(" + __webpack_require__(36) + ");\n  src: url(" + __webpack_require__(36) + "?#iefix) format('embedded-opentype'), url(" + __webpack_require__(55) + ") format('woff2'), url(" + __webpack_require__(54) + ") format('woff'), url(" + __webpack_require__(53) + ") format('truetype'), url(" + __webpack_require__(52) + "#glyphicons_halflingsregular) format('svg');\n}\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.glyphicon-asterisk:before {\n  content: \"*\";\n}\n.glyphicon-plus:before {\n  content: \"+\";\n}\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\";\n}\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n.glyphicon-pencil:before {\n  content: \"\\270F\";\n}\n.glyphicon-glass:before {\n  content: \"\\E001\";\n}\n.glyphicon-music:before {\n  content: \"\\E002\";\n}\n.glyphicon-search:before {\n  content: \"\\E003\";\n}\n.glyphicon-heart:before {\n  content: \"\\E005\";\n}\n.glyphicon-star:before {\n  content: \"\\E006\";\n}\n.glyphicon-star-empty:before {\n  content: \"\\E007\";\n}\n.glyphicon-user:before {\n  content: \"\\E008\";\n}\n.glyphicon-film:before {\n  content: \"\\E009\";\n}\n.glyphicon-th-large:before {\n  content: \"\\E010\";\n}\n.glyphicon-th:before {\n  content: \"\\E011\";\n}\n.glyphicon-th-list:before {\n  content: \"\\E012\";\n}\n.glyphicon-ok:before {\n  content: \"\\E013\";\n}\n.glyphicon-remove:before {\n  content: \"\\E014\";\n}\n.glyphicon-zoom-in:before {\n  content: \"\\E015\";\n}\n.glyphicon-zoom-out:before {\n  content: \"\\E016\";\n}\n.glyphicon-off:before {\n  content: \"\\E017\";\n}\n.glyphicon-signal:before {\n  content: \"\\E018\";\n}\n.glyphicon-cog:before {\n  content: \"\\E019\";\n}\n.glyphicon-trash:before {\n  content: \"\\E020\";\n}\n.glyphicon-home:before {\n  content: \"\\E021\";\n}\n.glyphicon-file:before {\n  content: \"\\E022\";\n}\n.glyphicon-time:before {\n  content: \"\\E023\";\n}\n.glyphicon-road:before {\n  content: \"\\E024\";\n}\n.glyphicon-download-alt:before {\n  content: \"\\E025\";\n}\n.glyphicon-download:before {\n  content: \"\\E026\";\n}\n.glyphicon-upload:before {\n  content: \"\\E027\";\n}\n.glyphicon-inbox:before {\n  content: \"\\E028\";\n}\n.glyphicon-play-circle:before {\n  content: \"\\E029\";\n}\n.glyphicon-repeat:before {\n  content: \"\\E030\";\n}\n.glyphicon-refresh:before {\n  content: \"\\E031\";\n}\n.glyphicon-list-alt:before {\n  content: \"\\E032\";\n}\n.glyphicon-lock:before {\n  content: \"\\E033\";\n}\n.glyphicon-flag:before {\n  content: \"\\E034\";\n}\n.glyphicon-headphones:before {\n  content: \"\\E035\";\n}\n.glyphicon-volume-off:before {\n  content: \"\\E036\";\n}\n.glyphicon-volume-down:before {\n  content: \"\\E037\";\n}\n.glyphicon-volume-up:before {\n  content: \"\\E038\";\n}\n.glyphicon-qrcode:before {\n  content: \"\\E039\";\n}\n.glyphicon-barcode:before {\n  content: \"\\E040\";\n}\n.glyphicon-tag:before {\n  content: \"\\E041\";\n}\n.glyphicon-tags:before {\n  content: \"\\E042\";\n}\n.glyphicon-book:before {\n  content: \"\\E043\";\n}\n.glyphicon-bookmark:before {\n  content: \"\\E044\";\n}\n.glyphicon-print:before {\n  content: \"\\E045\";\n}\n.glyphicon-camera:before {\n  content: \"\\E046\";\n}\n.glyphicon-font:before {\n  content: \"\\E047\";\n}\n.glyphicon-bold:before {\n  content: \"\\E048\";\n}\n.glyphicon-italic:before {\n  content: \"\\E049\";\n}\n.glyphicon-text-height:before {\n  content: \"\\E050\";\n}\n.glyphicon-text-width:before {\n  content: \"\\E051\";\n}\n.glyphicon-align-left:before {\n  content: \"\\E052\";\n}\n.glyphicon-align-center:before {\n  content: \"\\E053\";\n}\n.glyphicon-align-right:before {\n  content: \"\\E054\";\n}\n.glyphicon-align-justify:before {\n  content: \"\\E055\";\n}\n.glyphicon-list:before {\n  content: \"\\E056\";\n}\n.glyphicon-indent-left:before {\n  content: \"\\E057\";\n}\n.glyphicon-indent-right:before {\n  content: \"\\E058\";\n}\n.glyphicon-facetime-video:before {\n  content: \"\\E059\";\n}\n.glyphicon-picture:before {\n  content: \"\\E060\";\n}\n.glyphicon-map-marker:before {\n  content: \"\\E062\";\n}\n.glyphicon-adjust:before {\n  content: \"\\E063\";\n}\n.glyphicon-tint:before {\n  content: \"\\E064\";\n}\n.glyphicon-edit:before {\n  content: \"\\E065\";\n}\n.glyphicon-share:before {\n  content: \"\\E066\";\n}\n.glyphicon-check:before {\n  content: \"\\E067\";\n}\n.glyphicon-move:before {\n  content: \"\\E068\";\n}\n.glyphicon-step-backward:before {\n  content: \"\\E069\";\n}\n.glyphicon-fast-backward:before {\n  content: \"\\E070\";\n}\n.glyphicon-backward:before {\n  content: \"\\E071\";\n}\n.glyphicon-play:before {\n  content: \"\\E072\";\n}\n.glyphicon-pause:before {\n  content: \"\\E073\";\n}\n.glyphicon-stop:before {\n  content: \"\\E074\";\n}\n.glyphicon-forward:before {\n  content: \"\\E075\";\n}\n.glyphicon-fast-forward:before {\n  content: \"\\E076\";\n}\n.glyphicon-step-forward:before {\n  content: \"\\E077\";\n}\n.glyphicon-eject:before {\n  content: \"\\E078\";\n}\n.glyphicon-chevron-left:before {\n  content: \"\\E079\";\n}\n.glyphicon-chevron-right:before {\n  content: \"\\E080\";\n}\n.glyphicon-plus-sign:before {\n  content: \"\\E081\";\n}\n.glyphicon-minus-sign:before {\n  content: \"\\E082\";\n}\n.glyphicon-remove-sign:before {\n  content: \"\\E083\";\n}\n.glyphicon-ok-sign:before {\n  content: \"\\E084\";\n}\n.glyphicon-question-sign:before {\n  content: \"\\E085\";\n}\n.glyphicon-info-sign:before {\n  content: \"\\E086\";\n}\n.glyphicon-screenshot:before {\n  content: \"\\E087\";\n}\n.glyphicon-remove-circle:before {\n  content: \"\\E088\";\n}\n.glyphicon-ok-circle:before {\n  content: \"\\E089\";\n}\n.glyphicon-ban-circle:before {\n  content: \"\\E090\";\n}\n.glyphicon-arrow-left:before {\n  content: \"\\E091\";\n}\n.glyphicon-arrow-right:before {\n  content: \"\\E092\";\n}\n.glyphicon-arrow-up:before {\n  content: \"\\E093\";\n}\n.glyphicon-arrow-down:before {\n  content: \"\\E094\";\n}\n.glyphicon-share-alt:before {\n  content: \"\\E095\";\n}\n.glyphicon-resize-full:before {\n  content: \"\\E096\";\n}\n.glyphicon-resize-small:before {\n  content: \"\\E097\";\n}\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\";\n}\n.glyphicon-gift:before {\n  content: \"\\E102\";\n}\n.glyphicon-leaf:before {\n  content: \"\\E103\";\n}\n.glyphicon-fire:before {\n  content: \"\\E104\";\n}\n.glyphicon-eye-open:before {\n  content: \"\\E105\";\n}\n.glyphicon-eye-close:before {\n  content: \"\\E106\";\n}\n.glyphicon-warning-sign:before {\n  content: \"\\E107\";\n}\n.glyphicon-plane:before {\n  content: \"\\E108\";\n}\n.glyphicon-calendar:before {\n  content: \"\\E109\";\n}\n.glyphicon-random:before {\n  content: \"\\E110\";\n}\n.glyphicon-comment:before {\n  content: \"\\E111\";\n}\n.glyphicon-magnet:before {\n  content: \"\\E112\";\n}\n.glyphicon-chevron-up:before {\n  content: \"\\E113\";\n}\n.glyphicon-chevron-down:before {\n  content: \"\\E114\";\n}\n.glyphicon-retweet:before {\n  content: \"\\E115\";\n}\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\";\n}\n.glyphicon-folder-close:before {\n  content: \"\\E117\";\n}\n.glyphicon-folder-open:before {\n  content: \"\\E118\";\n}\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\";\n}\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\";\n}\n.glyphicon-hdd:before {\n  content: \"\\E121\";\n}\n.glyphicon-bullhorn:before {\n  content: \"\\E122\";\n}\n.glyphicon-bell:before {\n  content: \"\\E123\";\n}\n.glyphicon-certificate:before {\n  content: \"\\E124\";\n}\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\";\n}\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\";\n}\n.glyphicon-hand-right:before {\n  content: \"\\E127\";\n}\n.glyphicon-hand-left:before {\n  content: \"\\E128\";\n}\n.glyphicon-hand-up:before {\n  content: \"\\E129\";\n}\n.glyphicon-hand-down:before {\n  content: \"\\E130\";\n}\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\";\n}\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\";\n}\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\";\n}\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\";\n}\n.glyphicon-globe:before {\n  content: \"\\E135\";\n}\n.glyphicon-wrench:before {\n  content: \"\\E136\";\n}\n.glyphicon-tasks:before {\n  content: \"\\E137\";\n}\n.glyphicon-filter:before {\n  content: \"\\E138\";\n}\n.glyphicon-briefcase:before {\n  content: \"\\E139\";\n}\n.glyphicon-fullscreen:before {\n  content: \"\\E140\";\n}\n.glyphicon-dashboard:before {\n  content: \"\\E141\";\n}\n.glyphicon-paperclip:before {\n  content: \"\\E142\";\n}\n.glyphicon-heart-empty:before {\n  content: \"\\E143\";\n}\n.glyphicon-link:before {\n  content: \"\\E144\";\n}\n.glyphicon-phone:before {\n  content: \"\\E145\";\n}\n.glyphicon-pushpin:before {\n  content: \"\\E146\";\n}\n.glyphicon-usd:before {\n  content: \"\\E148\";\n}\n.glyphicon-gbp:before {\n  content: \"\\E149\";\n}\n.glyphicon-sort:before {\n  content: \"\\E150\";\n}\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\";\n}\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\";\n}\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\";\n}\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\";\n}\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\";\n}\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\";\n}\n.glyphicon-unchecked:before {\n  content: \"\\E157\";\n}\n.glyphicon-expand:before {\n  content: \"\\E158\";\n}\n.glyphicon-collapse-down:before {\n  content: \"\\E159\";\n}\n.glyphicon-collapse-up:before {\n  content: \"\\E160\";\n}\n.glyphicon-log-in:before {\n  content: \"\\E161\";\n}\n.glyphicon-flash:before {\n  content: \"\\E162\";\n}\n.glyphicon-log-out:before {\n  content: \"\\E163\";\n}\n.glyphicon-new-window:before {\n  content: \"\\E164\";\n}\n.glyphicon-record:before {\n  content: \"\\E165\";\n}\n.glyphicon-save:before {\n  content: \"\\E166\";\n}\n.glyphicon-open:before {\n  content: \"\\E167\";\n}\n.glyphicon-saved:before {\n  content: \"\\E168\";\n}\n.glyphicon-import:before {\n  content: \"\\E169\";\n}\n.glyphicon-export:before {\n  content: \"\\E170\";\n}\n.glyphicon-send:before {\n  content: \"\\E171\";\n}\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\";\n}\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\";\n}\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\";\n}\n.glyphicon-floppy-save:before {\n  content: \"\\E175\";\n}\n.glyphicon-floppy-open:before {\n  content: \"\\E176\";\n}\n.glyphicon-credit-card:before {\n  content: \"\\E177\";\n}\n.glyphicon-transfer:before {\n  content: \"\\E178\";\n}\n.glyphicon-cutlery:before {\n  content: \"\\E179\";\n}\n.glyphicon-header:before {\n  content: \"\\E180\";\n}\n.glyphicon-compressed:before {\n  content: \"\\E181\";\n}\n.glyphicon-earphone:before {\n  content: \"\\E182\";\n}\n.glyphicon-phone-alt:before {\n  content: \"\\E183\";\n}\n.glyphicon-tower:before {\n  content: \"\\E184\";\n}\n.glyphicon-stats:before {\n  content: \"\\E185\";\n}\n.glyphicon-sd-video:before {\n  content: \"\\E186\";\n}\n.glyphicon-hd-video:before {\n  content: \"\\E187\";\n}\n.glyphicon-subtitles:before {\n  content: \"\\E188\";\n}\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\";\n}\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\";\n}\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\";\n}\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\";\n}\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\";\n}\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\";\n}\n.glyphicon-registration-mark:before {\n  content: \"\\E195\";\n}\n.glyphicon-cloud-download:before {\n  content: \"\\E197\";\n}\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\";\n}\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\";\n}\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\";\n}\n.glyphicon-cd:before {\n  content: \"\\E201\";\n}\n.glyphicon-save-file:before {\n  content: \"\\E202\";\n}\n.glyphicon-open-file:before {\n  content: \"\\E203\";\n}\n.glyphicon-level-up:before {\n  content: \"\\E204\";\n}\n.glyphicon-copy:before {\n  content: \"\\E205\";\n}\n.glyphicon-paste:before {\n  content: \"\\E206\";\n}\n.glyphicon-alert:before {\n  content: \"\\E209\";\n}\n.glyphicon-equalizer:before {\n  content: \"\\E210\";\n}\n.glyphicon-king:before {\n  content: \"\\E211\";\n}\n.glyphicon-queen:before {\n  content: \"\\E212\";\n}\n.glyphicon-pawn:before {\n  content: \"\\E213\";\n}\n.glyphicon-bishop:before {\n  content: \"\\E214\";\n}\n.glyphicon-knight:before {\n  content: \"\\E215\";\n}\n.glyphicon-baby-formula:before {\n  content: \"\\E216\";\n}\n.glyphicon-tent:before {\n  content: \"\\26FA\";\n}\n.glyphicon-blackboard:before {\n  content: \"\\E218\";\n}\n.glyphicon-bed:before {\n  content: \"\\E219\";\n}\n.glyphicon-apple:before {\n  content: \"\\F8FF\";\n}\n.glyphicon-erase:before {\n  content: \"\\E221\";\n}\n.glyphicon-hourglass:before {\n  content: \"\\231B\";\n}\n.glyphicon-lamp:before {\n  content: \"\\E223\";\n}\n.glyphicon-duplicate:before {\n  content: \"\\E224\";\n}\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\";\n}\n.glyphicon-scissors:before {\n  content: \"\\E226\";\n}\n.glyphicon-bitcoin:before {\n  content: \"\\E227\";\n}\n.glyphicon-btc:before {\n  content: \"\\E227\";\n}\n.glyphicon-xbt:before {\n  content: \"\\E227\";\n}\n.glyphicon-yen:before {\n  content: \"\\A5\";\n}\n.glyphicon-jpy:before {\n  content: \"\\A5\";\n}\n.glyphicon-ruble:before {\n  content: \"\\20BD\";\n}\n.glyphicon-rub:before {\n  content: \"\\20BD\";\n}\n.glyphicon-scale:before {\n  content: \"\\E230\";\n}\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\";\n}\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\";\n}\n.glyphicon-education:before {\n  content: \"\\E233\";\n}\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\";\n}\n.glyphicon-option-vertical:before {\n  content: \"\\E235\";\n}\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\";\n}\n.glyphicon-modal-window:before {\n  content: \"\\E237\";\n}\n.glyphicon-oil:before {\n  content: \"\\E238\";\n}\n.glyphicon-grain:before {\n  content: \"\\E239\";\n}\n.glyphicon-sunglasses:before {\n  content: \"\\E240\";\n}\n.glyphicon-text-size:before {\n  content: \"\\E241\";\n}\n.glyphicon-text-color:before {\n  content: \"\\E242\";\n}\n.glyphicon-text-background:before {\n  content: \"\\E243\";\n}\n.glyphicon-object-align-top:before {\n  content: \"\\E244\";\n}\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\";\n}\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\";\n}\n.glyphicon-object-align-left:before {\n  content: \"\\E247\";\n}\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\";\n}\n.glyphicon-object-align-right:before {\n  content: \"\\E249\";\n}\n.glyphicon-triangle-right:before {\n  content: \"\\E250\";\n}\n.glyphicon-triangle-left:before {\n  content: \"\\E251\";\n}\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\";\n}\n.glyphicon-triangle-top:before {\n  content: \"\\E253\";\n}\n.glyphicon-console:before {\n  content: \"\\E254\";\n}\n.glyphicon-superscript:before {\n  content: \"\\E255\";\n}\n.glyphicon-subscript:before {\n  content: \"\\E256\";\n}\n.glyphicon-menu-left:before {\n  content: \"\\E257\";\n}\n.glyphicon-menu-right:before {\n  content: \"\\E258\";\n}\n.glyphicon-menu-down:before {\n  content: \"\\E259\";\n}\n.glyphicon-menu-up:before {\n  content: \"\\E260\";\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  line-height: 1.42857143;\n  color: #777;\n  background-color: #FCFCFC;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #D9230F;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #91170a;\n  text-decoration: underline;\n}\na:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nfigure {\n  margin: 0;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive,\n.thumbnail > img,\n.thumbnail a > img,\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857143;\n  background-color: #FCFCFC;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -moz-transition: all 0.2s ease-in-out;\n  -ms-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n.img-circle {\n  border-radius: 50%;\n}\nhr {\n  margin-top: 18px;\n  margin-bottom: 18px;\n  border: 0;\n  border-top: 1px solid #ddd;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n[role=\"button\"] {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-weight: 300;\n  line-height: 1.1;\n  color: #444;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small,\nh1 .small,\nh2 .small,\nh3 .small,\nh4 .small,\nh5 .small,\nh6 .small,\n.h1 .small,\n.h2 .small,\n.h3 .small,\n.h4 .small,\n.h5 .small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #808080;\n}\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 18px;\n  margin-bottom: 9px;\n}\nh1 small,\n.h1 small,\nh2 small,\n.h2 small,\nh3 small,\n.h3 small,\nh1 .small,\n.h1 .small,\nh2 .small,\n.h2 .small,\nh3 .small,\n.h3 .small {\n  font-size: 65%;\n}\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 9px;\n  margin-bottom: 9px;\n}\nh4 small,\n.h4 small,\nh5 small,\n.h5 small,\nh6 small,\n.h6 small,\nh4 .small,\n.h4 .small,\nh5 .small,\n.h5 .small,\nh6 .small,\n.h6 .small {\n  font-size: 75%;\n}\nh1,\n.h1 {\n  font-size: 33px;\n}\nh2,\n.h2 {\n  font-size: 27px;\n}\nh3,\n.h3 {\n  font-size: 23px;\n}\nh4,\n.h4 {\n  font-size: 17px;\n}\nh5,\n.h5 {\n  font-size: 13px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\np {\n  margin: 0 0 9px;\n}\n.lead {\n  margin-bottom: 18px;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 19.5px;\n  }\n}\nsmall,\n.small {\n  font-size: 92%;\n}\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n.text-nowrap {\n  white-space: nowrap;\n}\n.text-lowercase {\n  text-transform: lowercase;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-muted {\n  color: #808080;\n}\n.text-primary {\n  color: #D9230F;\n}\na.text-primary:hover,\na.text-primary:focus {\n  color: #a91b0c;\n}\n.text-success {\n  color: #468847;\n}\na.text-success:hover,\na.text-success:focus {\n  color: #356635;\n}\n.text-info {\n  color: #3a87ad;\n}\na.text-info:hover,\na.text-info:focus {\n  color: #2d6987;\n}\n.text-warning {\n  color: #c09853;\n}\na.text-warning:hover,\na.text-warning:focus {\n  color: #a47e3c;\n}\n.text-danger {\n  color: #b94a48;\n}\na.text-danger:hover,\na.text-danger:focus {\n  color: #953b39;\n}\n.bg-primary {\n  color: #fff;\n  background-color: #D9230F;\n}\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #a91b0c;\n}\n.bg-success {\n  background-color: #dff0d8;\n}\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3;\n}\n.bg-info {\n  background-color: #d9edf7;\n}\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee;\n}\n.bg-warning {\n  background-color: #fcf8e3;\n}\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5;\n}\n.bg-danger {\n  background-color: #f2dede;\n}\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9;\n}\n.page-header {\n  padding-bottom: 8px;\n  margin: 36px 0 18px;\n  border-bottom: 1px solid #ddd;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 9px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\ndl {\n  margin-top: 0;\n  margin-bottom: 18px;\n}\ndt,\ndd {\n  line-height: 1.42857143;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #808080;\n}\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 9px 18px;\n  margin: 0 0 18px;\n  font-size: 16.25px;\n  border-left: 5px solid #ddd;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857143;\n  color: #808080;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014   \\A0';\n}\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #ddd;\n  border-left: 0;\n  text-align: right;\n}\n.blockquote-reverse footer:before,\nblockquote.pull-right footer:before,\n.blockquote-reverse small:before,\nblockquote.pull-right small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\nblockquote.pull-right footer:after,\n.blockquote-reverse small:after,\nblockquote.pull-right small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right .small:after {\n  content: '\\A0   \\2014';\n}\naddress {\n  margin-bottom: 18px;\n  font-style: normal;\n  line-height: 1.42857143;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  box-shadow: none;\n}\npre {\n  display: block;\n  padding: 8.5px;\n  margin: 0 0 9px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #444;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n.col-xs-12 {\n  width: 100%;\n}\n.col-xs-11 {\n  width: 91.66666667%;\n}\n.col-xs-10 {\n  width: 83.33333333%;\n}\n.col-xs-9 {\n  width: 75%;\n}\n.col-xs-8 {\n  width: 66.66666667%;\n}\n.col-xs-7 {\n  width: 58.33333333%;\n}\n.col-xs-6 {\n  width: 50%;\n}\n.col-xs-5 {\n  width: 41.66666667%;\n}\n.col-xs-4 {\n  width: 33.33333333%;\n}\n.col-xs-3 {\n  width: 25%;\n}\n.col-xs-2 {\n  width: 16.66666667%;\n}\n.col-xs-1 {\n  width: 8.33333333%;\n}\n.col-xs-pull-12 {\n  right: 100%;\n}\n.col-xs-pull-11 {\n  right: 91.66666667%;\n}\n.col-xs-pull-10 {\n  right: 83.33333333%;\n}\n.col-xs-pull-9 {\n  right: 75%;\n}\n.col-xs-pull-8 {\n  right: 66.66666667%;\n}\n.col-xs-pull-7 {\n  right: 58.33333333%;\n}\n.col-xs-pull-6 {\n  right: 50%;\n}\n.col-xs-pull-5 {\n  right: 41.66666667%;\n}\n.col-xs-pull-4 {\n  right: 33.33333333%;\n}\n.col-xs-pull-3 {\n  right: 25%;\n}\n.col-xs-pull-2 {\n  right: 16.66666667%;\n}\n.col-xs-pull-1 {\n  right: 8.33333333%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-12 {\n  left: 100%;\n}\n.col-xs-push-11 {\n  left: 91.66666667%;\n}\n.col-xs-push-10 {\n  left: 83.33333333%;\n}\n.col-xs-push-9 {\n  left: 75%;\n}\n.col-xs-push-8 {\n  left: 66.66666667%;\n}\n.col-xs-push-7 {\n  left: 58.33333333%;\n}\n.col-xs-push-6 {\n  left: 50%;\n}\n.col-xs-push-5 {\n  left: 41.66666667%;\n}\n.col-xs-push-4 {\n  left: 33.33333333%;\n}\n.col-xs-push-3 {\n  left: 25%;\n}\n.col-xs-push-2 {\n  left: 16.66666667%;\n}\n.col-xs-push-1 {\n  left: 8.33333333%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n.col-xs-offset-11 {\n  margin-left: 91.66666667%;\n}\n.col-xs-offset-10 {\n  margin-left: 83.33333333%;\n}\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n.col-xs-offset-8 {\n  margin-left: 66.66666667%;\n}\n.col-xs-offset-7 {\n  margin-left: 58.33333333%;\n}\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n.col-xs-offset-5 {\n  margin-left: 41.66666667%;\n}\n.col-xs-offset-4 {\n  margin-left: 33.33333333%;\n}\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n.col-xs-offset-2 {\n  margin-left: 16.66666667%;\n}\n.col-xs-offset-1 {\n  margin-left: 8.33333333%;\n}\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n  .col-sm-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-sm-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n  .col-sm-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-sm-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n  .col-sm-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-sm-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n  .col-sm-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-sm-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-12 {\n    left: 100%;\n  }\n  .col-sm-push-11 {\n    left: 91.66666667%;\n  }\n  .col-sm-push-10 {\n    left: 83.33333333%;\n  }\n  .col-sm-push-9 {\n    left: 75%;\n  }\n  .col-sm-push-8 {\n    left: 66.66666667%;\n  }\n  .col-sm-push-7 {\n    left: 58.33333333%;\n  }\n  .col-sm-push-6 {\n    left: 50%;\n  }\n  .col-sm-push-5 {\n    left: 41.66666667%;\n  }\n  .col-sm-push-4 {\n    left: 33.33333333%;\n  }\n  .col-sm-push-3 {\n    left: 25%;\n  }\n  .col-sm-push-2 {\n    left: 16.66666667%;\n  }\n  .col-sm-push-1 {\n    left: 8.33333333%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .col-md-pull-12 {\n    right: 100%;\n  }\n  .col-md-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-md-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-md-pull-9 {\n    right: 75%;\n  }\n  .col-md-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-md-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-md-pull-6 {\n    right: 50%;\n  }\n  .col-md-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-md-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-md-pull-3 {\n    right: 25%;\n  }\n  .col-md-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-md-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-12 {\n    left: 100%;\n  }\n  .col-md-push-11 {\n    left: 91.66666667%;\n  }\n  .col-md-push-10 {\n    left: 83.33333333%;\n  }\n  .col-md-push-9 {\n    left: 75%;\n  }\n  .col-md-push-8 {\n    left: 66.66666667%;\n  }\n  .col-md-push-7 {\n    left: 58.33333333%;\n  }\n  .col-md-push-6 {\n    left: 50%;\n  }\n  .col-md-push-5 {\n    left: 41.66666667%;\n  }\n  .col-md-push-4 {\n    left: 33.33333333%;\n  }\n  .col-md-push-3 {\n    left: 25%;\n  }\n  .col-md-push-2 {\n    left: 16.66666667%;\n  }\n  .col-md-push-1 {\n    left: 8.33333333%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n  .col-md-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-md-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n  .col-md-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-md-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n  .col-md-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-md-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n  .col-md-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-md-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n  .col-lg-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-lg-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n  .col-lg-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-lg-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n  .col-lg-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-lg-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n  .col-lg-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-lg-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-12 {\n    left: 100%;\n  }\n  .col-lg-push-11 {\n    left: 91.66666667%;\n  }\n  .col-lg-push-10 {\n    left: 83.33333333%;\n  }\n  .col-lg-push-9 {\n    left: 75%;\n  }\n  .col-lg-push-8 {\n    left: 66.66666667%;\n  }\n  .col-lg-push-7 {\n    left: 58.33333333%;\n  }\n  .col-lg-push-6 {\n    left: 50%;\n  }\n  .col-lg-push-5 {\n    left: 41.66666667%;\n  }\n  .col-lg-push-4 {\n    left: 33.33333333%;\n  }\n  .col-lg-push-3 {\n    left: 25%;\n  }\n  .col-lg-push-2 {\n    left: 16.66666667%;\n  }\n  .col-lg-push-1 {\n    left: 8.33333333%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n}\ntable {\n  background-color: transparent;\n}\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #808080;\n  text-align: left;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 18px;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #ddd;\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #ddd;\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid #ddd;\n}\n.table .table {\n  background-color: #FCFCFC;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5;\n}\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column;\n}\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n.table > thead > tr > td.info,\n.table > tbody > tr > td.info,\n.table > tfoot > tr > td.info,\n.table > thead > tr > th.info,\n.table > tbody > tr > th.info,\n.table > tfoot > tr > th.info,\n.table > thead > tr.info > td,\n.table > tbody > tr.info > td,\n.table > tfoot > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr.info > th,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 13.5px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #ddd;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 18px;\n  font-size: 19.5px;\n  line-height: inherit;\n  color: #777;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\noutput {\n  display: block;\n  padding-top: 9px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  color: #777;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 36px;\n  padding: 8px 12px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  color: #777;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  -moz-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  -ms-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.form-control::-moz-placeholder {\n  color: #ddd;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #ddd;\n}\n.form-control::-webkit-input-placeholder {\n  color: #ddd;\n}\n.form-control::-ms-expand {\n  border: 0;\n  background-color: transparent;\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #ddd;\n  opacity: 1;\n}\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\ntextarea.form-control {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 36px;\n  }\n  input[type=\"date\"].input-sm,\n  input[type=\"time\"].input-sm,\n  input[type=\"datetime-local\"].input-sm,\n  input[type=\"month\"].input-sm,\n  .input-group-sm input[type=\"date\"],\n  .input-group-sm input[type=\"time\"],\n  .input-group-sm input[type=\"datetime-local\"],\n  .input-group-sm input[type=\"month\"] {\n    line-height: 30px;\n  }\n  input[type=\"date\"].input-lg,\n  input[type=\"time\"].input-lg,\n  input[type=\"datetime-local\"].input-lg,\n  input[type=\"month\"].input-lg,\n  .input-group-lg input[type=\"date\"],\n  .input-group-lg input[type=\"time\"],\n  .input-group-lg input[type=\"datetime-local\"],\n  .input-group-lg input[type=\"month\"] {\n    line-height: 53px;\n  }\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  min-height: 18px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"].disabled,\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\nfieldset[disabled] input[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n.radio-inline.disabled,\n.checkbox-inline.disabled,\nfieldset[disabled] .radio-inline,\nfieldset[disabled] .checkbox-inline {\n  cursor: not-allowed;\n}\n.radio.disabled label,\n.checkbox.disabled label,\nfieldset[disabled] .radio label,\nfieldset[disabled] .checkbox label {\n  cursor: not-allowed;\n}\n.form-control-static {\n  padding-top: 9px;\n  padding-bottom: 9px;\n  margin-bottom: 0;\n  min-height: 31px;\n}\n.form-control-static.input-lg,\n.form-control-static.input-sm {\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-sm {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-sm {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-sm,\nselect[multiple].input-sm {\n  height: auto;\n}\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px;\n}\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto;\n}\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 30px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.input-lg {\n  height: 53px;\n  padding: 14px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-lg {\n  height: 53px;\n  line-height: 53px;\n}\ntextarea.input-lg,\nselect[multiple].input-lg {\n  height: auto;\n}\n.form-group-lg .form-control {\n  height: 53px;\n  padding: 14px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.form-group-lg select.form-control {\n  height: 53px;\n  line-height: 53px;\n}\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto;\n}\n.form-group-lg .form-control-static {\n  height: 53px;\n  min-height: 35px;\n  padding: 15px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n}\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 45px;\n}\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 36px;\n  height: 36px;\n  line-height: 36px;\n  text-align: center;\n  pointer-events: none;\n}\n.input-lg + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 53px;\n  height: 53px;\n  line-height: 53px;\n}\n.input-sm + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #468847;\n}\n.has-success .form-control {\n  border-color: #468847;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #356635;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n}\n.has-success .input-group-addon {\n  color: #468847;\n  border-color: #468847;\n  background-color: #dff0d8;\n}\n.has-success .form-control-feedback {\n  color: #468847;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #c09853;\n}\n.has-warning .form-control {\n  border-color: #c09853;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #a47e3c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n}\n.has-warning .input-group-addon {\n  color: #c09853;\n  border-color: #c09853;\n  background-color: #fcf8e3;\n}\n.has-warning .form-control-feedback {\n  color: #c09853;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #b94a48;\n}\n.has-error .form-control {\n  border-color: #b94a48;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #953b39;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n}\n.has-error .input-group-addon {\n  color: #b94a48;\n  border-color: #b94a48;\n  background-color: #f2dede;\n}\n.has-error .form-control-feedback {\n  color: #b94a48;\n}\n.has-feedback label ~ .form-control-feedback {\n  top: 23px;\n}\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #b7b7b7;\n}\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 9px;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 9px;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 15px;\n    font-size: 17px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px;\n  }\n}\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 8px 12px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.btn:focus,\n.btn:active:focus,\n.btn.active:focus,\n.btn.focus,\n.btn:active.focus,\n.btn.active.focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #fff;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  outline: 0;\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  -moz-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  filter: alpha(opacity=65);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=65);\n  opacity: 0.65;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n}\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n.btn-default {\n  color: #fff;\n  background-color: #474949;\n  border-color: #474949;\n}\n.btn-default:focus,\n.btn-default.focus {\n  color: #fff;\n  background-color: #2e2f2f;\n  border-color: #080808;\n}\n.btn-default:hover {\n  color: #fff;\n  background-color: #2e2f2f;\n  border-color: #292a2a;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  color: #fff;\n  background-color: #2e2f2f;\n  border-color: #292a2a;\n}\n.btn-default:active:hover,\n.btn-default.active:hover,\n.open > .dropdown-toggle.btn-default:hover,\n.btn-default:active:focus,\n.btn-default.active:focus,\n.open > .dropdown-toggle.btn-default:focus,\n.btn-default:active.focus,\n.btn-default.active.focus,\n.open > .dropdown-toggle.btn-default.focus {\n  color: #fff;\n  background-color: #1c1d1d;\n  border-color: #080808;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  background-image: none;\n}\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default.focus {\n  background-color: #474949;\n  border-color: #474949;\n}\n.btn-default .badge {\n  color: #474949;\n  background-color: #fff;\n}\n.btn-primary {\n  color: #fff;\n  background-color: #D9230F;\n  border-color: #D9230F;\n}\n.btn-primary:focus,\n.btn-primary.focus {\n  color: #fff;\n  background-color: #a91b0c;\n  border-color: #621007;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #a91b0c;\n  border-color: #a01a0b;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  color: #fff;\n  background-color: #a91b0c;\n  border-color: #a01a0b;\n}\n.btn-primary:active:hover,\n.btn-primary.active:hover,\n.open > .dropdown-toggle.btn-primary:hover,\n.btn-primary:active:focus,\n.btn-primary.active:focus,\n.open > .dropdown-toggle.btn-primary:focus,\n.btn-primary:active.focus,\n.btn-primary.active.focus,\n.open > .dropdown-toggle.btn-primary.focus {\n  color: #fff;\n  background-color: #881609;\n  border-color: #621007;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  background-image: none;\n}\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary.focus {\n  background-color: #D9230F;\n  border-color: #D9230F;\n}\n.btn-primary .badge {\n  color: #D9230F;\n  background-color: #fff;\n}\n.btn-success {\n  color: #fff;\n  background-color: #469408;\n  border-color: #469408;\n}\n.btn-success:focus,\n.btn-success.focus {\n  color: #fff;\n  background-color: #2f6405;\n  border-color: #0d1b01;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #2f6405;\n  border-color: #2b5a05;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  color: #fff;\n  background-color: #2f6405;\n  border-color: #2b5a05;\n}\n.btn-success:active:hover,\n.btn-success.active:hover,\n.open > .dropdown-toggle.btn-success:hover,\n.btn-success:active:focus,\n.btn-success.active:focus,\n.open > .dropdown-toggle.btn-success:focus,\n.btn-success:active.focus,\n.btn-success.active.focus,\n.open > .dropdown-toggle.btn-success.focus {\n  color: #fff;\n  background-color: #1f4204;\n  border-color: #0d1b01;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  background-image: none;\n}\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success.focus {\n  background-color: #469408;\n  border-color: #469408;\n}\n.btn-success .badge {\n  color: #469408;\n  background-color: #fff;\n}\n.btn-info {\n  color: #fff;\n  background-color: #029ACF;\n  border-color: #029ACF;\n}\n.btn-info:focus,\n.btn-info.focus {\n  color: #fff;\n  background-color: #02749c;\n  border-color: #013c51;\n}\n.btn-info:hover {\n  color: #fff;\n  background-color: #02749c;\n  border-color: #016d92;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  color: #fff;\n  background-color: #02749c;\n  border-color: #016d92;\n}\n.btn-info:active:hover,\n.btn-info.active:hover,\n.open > .dropdown-toggle.btn-info:hover,\n.btn-info:active:focus,\n.btn-info.active:focus,\n.open > .dropdown-toggle.btn-info:focus,\n.btn-info:active.focus,\n.btn-info.active.focus,\n.open > .dropdown-toggle.btn-info.focus {\n  color: #fff;\n  background-color: #015a79;\n  border-color: #013c51;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  background-image: none;\n}\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info.focus {\n  background-color: #029ACF;\n  border-color: #029ACF;\n}\n.btn-info .badge {\n  color: #029ACF;\n  background-color: #fff;\n}\n.btn-warning {\n  color: #fff;\n  background-color: #9B479F;\n  border-color: #9B479F;\n}\n.btn-warning:focus,\n.btn-warning.focus {\n  color: #fff;\n  background-color: #79377c;\n  border-color: #452047;\n}\n.btn-warning:hover {\n  color: #fff;\n  background-color: #79377c;\n  border-color: #723475;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  color: #fff;\n  background-color: #79377c;\n  border-color: #723475;\n}\n.btn-warning:active:hover,\n.btn-warning.active:hover,\n.open > .dropdown-toggle.btn-warning:hover,\n.btn-warning:active:focus,\n.btn-warning.active:focus,\n.open > .dropdown-toggle.btn-warning:focus,\n.btn-warning:active.focus,\n.btn-warning.active.focus,\n.open > .dropdown-toggle.btn-warning.focus {\n  color: #fff;\n  background-color: #612c63;\n  border-color: #452047;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  background-image: none;\n}\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning.focus {\n  background-color: #9B479F;\n  border-color: #9B479F;\n}\n.btn-warning .badge {\n  color: #9B479F;\n  background-color: #fff;\n}\n.btn-danger {\n  color: #fff;\n  background-color: #D9831F;\n  border-color: #D9831F;\n}\n.btn-danger:focus,\n.btn-danger.focus {\n  color: #fff;\n  background-color: #ac6819;\n  border-color: #69400f;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #ac6819;\n  border-color: #a36317;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  color: #fff;\n  background-color: #ac6819;\n  border-color: #a36317;\n}\n.btn-danger:active:hover,\n.btn-danger.active:hover,\n.open > .dropdown-toggle.btn-danger:hover,\n.btn-danger:active:focus,\n.btn-danger.active:focus,\n.open > .dropdown-toggle.btn-danger:focus,\n.btn-danger:active.focus,\n.btn-danger.active.focus,\n.open > .dropdown-toggle.btn-danger.focus {\n  color: #fff;\n  background-color: #8d5514;\n  border-color: #69400f;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  background-image: none;\n}\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger.focus {\n  background-color: #D9831F;\n  border-color: #D9831F;\n}\n.btn-danger .badge {\n  color: #D9831F;\n  background-color: #fff;\n}\n.btn-link {\n  color: #D9230F;\n  font-weight: normal;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #91170a;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #808080;\n  text-decoration: none;\n}\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 14px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -moz-transition: opacity 0.15s linear;\n  -ms-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\ntr.collapse.in {\n  display: table-row;\n}\ntbody.collapse.in {\n  display: table-row-group;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.dropup,\n.dropdown {\n  position: relative;\n}\n.dropdown-toggle:focus {\n  outline: 0;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 13px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 8px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857143;\n  color: #444;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #fff;\n  background-color: #D9230F;\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #D9230F;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #808080;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n.dropdown-menu-left {\n  left: 0;\n  right: auto;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  color: #808080;\n  white-space: nowrap;\n}\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n  content: \"\";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    left: auto;\n    right: 0;\n  }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar .btn,\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.btn-group > .btn-lg + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  -moz-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-lg .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n.dropup .btn-lg .caret {\n  border-width: 0 5px 5px;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group .form-control:focus {\n  z-index: 3;\n}\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 53px;\n  padding: 14px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-group-lg > .form-control,\nselect.input-group-lg > .input-group-addon,\nselect.input-group-lg > .input-group-btn > .btn {\n  height: 53px;\n  line-height: 53px;\n}\ntextarea.input-group-lg > .form-control,\ntextarea.input-group-lg > .input-group-addon,\ntextarea.input-group-lg > .input-group-btn > .btn,\nselect[multiple].input-group-lg > .form-control,\nselect[multiple].input-group-lg > .input-group-addon,\nselect[multiple].input-group-lg > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-group-sm > .form-control,\nselect.input-group-sm > .input-group-addon,\nselect.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-group-sm > .form-control,\ntextarea.input-group-sm > .input-group-addon,\ntextarea.input-group-sm > .input-group-btn > .btn,\nselect[multiple].input-group-sm > .form-control,\nselect[multiple].input-group-sm > .input-group-addon,\nselect[multiple].input-group-sm > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  padding: 8px 12px;\n  font-size: 13px;\n  font-weight: normal;\n  line-height: 1;\n  color: #777;\n  text-align: center;\n  background-color: #ddd;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg {\n  padding: 14px 16px;\n  font-size: 17px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #ddd;\n}\n.nav > li.disabled > a {\n  color: #808080;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #808080;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #ddd;\n  border-color: #D9230F;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 8px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #ddd #ddd #ddd;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #777;\n  background-color: #FCFCFC;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #FCFCFC;\n  }\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #D9230F;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus {\n    border-bottom-color: #FCFCFC;\n  }\n}\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 40px;\n  margin-bottom: 18px;\n  border: 1px solid transparent;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch;\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n.container > .navbar-header,\n.container-fluid > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container-fluid > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n.navbar-brand {\n  float: left;\n  padding: 11px 15px;\n  font-size: 17px;\n  line-height: 18px;\n  height: 40px;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n.navbar-brand > img {\n  display: block;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n.navbar-nav {\n  margin: 5.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 18px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 18px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 11px;\n    padding-bottom: 11px;\n  }\n}\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    border: 0;\n    margin-left: 0;\n    margin-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none;\n  }\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.navbar-btn {\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n.navbar-btn.btn-sm {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.navbar-btn.btn-xs {\n  margin-top: 9px;\n  margin-bottom: 9px;\n}\n.navbar-text {\n  margin-top: 11px;\n  margin-bottom: 11px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-left: 15px;\n    margin-right: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n.navbar-default {\n  background-color: #fff;\n  border-color: #eeeeee;\n}\n.navbar-default .navbar-brand {\n  color: #777;\n}\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #D9230F;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #D9230F;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #D9230F;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #ddd;\n}\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #ddd;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #ccc;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #eeeeee;\n}\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  background-color: transparent;\n  color: #D9230F;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #777;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #D9230F;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #D9230F;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #777;\n}\n.navbar-default .navbar-link:hover {\n  color: #D9230F;\n}\n.navbar-default .btn-link {\n  color: #777;\n}\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #D9230F;\n}\n.navbar-default .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-default .btn-link:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #444;\n}\n.navbar-inverse {\n  background-color: #D9230F;\n  border-color: #a91b0c;\n}\n.navbar-inverse .navbar-brand {\n  color: #fac0ba;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #fac0ba;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #fac0ba;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #a91b0c;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #a91b0c;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #b81e0d;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: transparent;\n  color: #fff;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #a91b0c;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #a91b0c;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #fac0ba;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #fac0ba;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n.navbar-inverse .btn-link {\n  color: #fac0ba;\n}\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n.navbar-inverse .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #ccc;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 18px;\n  list-style: none;\n  background-color: transparent;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: \"/\\A0\";\n  padding: 0 5px;\n  color: #ccc;\n}\n.breadcrumb > .active {\n  color: #808080;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 18px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 8px 12px;\n  line-height: 1.42857143;\n  text-decoration: none;\n  color: #444;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  margin-left: -1px;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > span:hover,\n.pagination > li > a:focus,\n.pagination > li > span:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #D9230F;\n  border-color: #D9230F;\n}\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  z-index: 3;\n  color: #fff;\n  background-color: #D9230F;\n  border-color: #D9230F;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #ddd;\n  background-color: #fff;\n  border-color: #ddd;\n  cursor: not-allowed;\n}\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 14px 16px;\n  font-size: 17px;\n  line-height: 1.3333333;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 18px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #D9230F;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #ddd;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\na.label:hover,\na.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.label:empty {\n  display: none;\n}\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n.label-default {\n  background-color: #474949;\n}\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #2e2f2f;\n}\n.label-primary {\n  background-color: #D9230F;\n}\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #a91b0c;\n}\n.label-success {\n  background-color: #469408;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #2f6405;\n}\n.label-info {\n  background-color: #029ACF;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #02749c;\n}\n.label-warning {\n  background-color: #9B479F;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #79377c;\n}\n.label-danger {\n  background-color: #D9831F;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #ac6819;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #D9230F;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.badge:hover,\na.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #D9230F;\n  background-color: #fff;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #f4f4f4;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 20px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #dbdbdb;\n}\n.container .jumbotron,\n.container-fluid .jumbotron {\n  border-radius: 6px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-left: 60px;\n    padding-right: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 59px;\n  }\n}\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 18px;\n  line-height: 1.42857143;\n  background-color: #FCFCFC;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -moz-transition: border 0.2s ease-in-out;\n  -ms-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  margin-left: auto;\n  margin-right: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #D9230F;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #777;\n}\n.alert {\n  padding: 15px;\n  margin-bottom: 18px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #468847;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #356635;\n}\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #3a87ad;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #2d6987;\n}\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #fbeed5;\n  color: #c09853;\n}\n.alert-warning hr {\n  border-top-color: #f8e5be;\n}\n.alert-warning .alert-link {\n  color: #a47e3c;\n}\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #eed3d7;\n  color: #b94a48;\n}\n.alert-danger hr {\n  border-top-color: #e6c1c7;\n}\n.alert-danger .alert-link {\n  color: #953b39;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 18px;\n  margin-bottom: 18px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 18px;\n  color: #fff;\n  text-align: center;\n  background-color: #D9230F;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -moz-transition: width 0.6s ease;\n  -ms-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n}\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-success {\n  background-color: #469408;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #029ACF;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #9B479F;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-danger {\n  background-color: #D9831F;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden;\n}\n.media-body {\n  width: 10000px;\n}\n.media-object {\n  display: block;\n}\n.media-object.img-thumbnail {\n  max-width: none;\n}\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n.media-middle {\n  vertical-align: middle;\n}\n.media-bottom {\n  vertical-align: bottom;\n}\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\na.list-group-item,\nbutton.list-group-item {\n  color: #555;\n}\na.list-group-item .list-group-item-heading,\nbutton.list-group-item .list-group-item-heading {\n  color: #333;\n}\na.list-group-item:hover,\nbutton.list-group-item:hover,\na.list-group-item:focus,\nbutton.list-group-item:focus {\n  text-decoration: none;\n  color: #555;\n  background-color: #f5f5f5;\n}\nbutton.list-group-item {\n  width: 100%;\n  text-align: left;\n}\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  background-color: #ddd;\n  color: #808080;\n  cursor: not-allowed;\n}\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #808080;\n}\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #D9230F;\n  border-color: #D9230F;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #fac0ba;\n}\n.list-group-item-success {\n  color: #468847;\n  background-color: #dff0d8;\n}\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #468847;\n}\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover,\nbutton.list-group-item-success:hover,\na.list-group-item-success:focus,\nbutton.list-group-item-success:focus {\n  color: #468847;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active,\nbutton.list-group-item-success.active,\na.list-group-item-success.active:hover,\nbutton.list-group-item-success.active:hover,\na.list-group-item-success.active:focus,\nbutton.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #468847;\n  border-color: #468847;\n}\n.list-group-item-info {\n  color: #3a87ad;\n  background-color: #d9edf7;\n}\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #3a87ad;\n}\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover,\nbutton.list-group-item-info:hover,\na.list-group-item-info:focus,\nbutton.list-group-item-info:focus {\n  color: #3a87ad;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active,\nbutton.list-group-item-info.active,\na.list-group-item-info.active:hover,\nbutton.list-group-item-info.active:hover,\na.list-group-item-info.active:focus,\nbutton.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #3a87ad;\n  border-color: #3a87ad;\n}\n.list-group-item-warning {\n  color: #c09853;\n  background-color: #fcf8e3;\n}\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #c09853;\n}\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover,\nbutton.list-group-item-warning:hover,\na.list-group-item-warning:focus,\nbutton.list-group-item-warning:focus {\n  color: #c09853;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active,\nbutton.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\nbutton.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus,\nbutton.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #c09853;\n  border-color: #c09853;\n}\n.list-group-item-danger {\n  color: #b94a48;\n  background-color: #f2dede;\n}\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #b94a48;\n}\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover,\nbutton.list-group-item-danger:hover,\na.list-group-item-danger:focus,\nbutton.list-group-item-danger:focus {\n  color: #b94a48;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active,\nbutton.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\nbutton.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus,\nbutton.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #b94a48;\n  border-color: #b94a48;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n.panel {\n  margin-bottom: 18px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.panel-body {\n  padding: 15px;\n}\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 15px;\n  color: inherit;\n}\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #FCFCFC;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd;\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0;\n}\n.panel-group {\n  margin-bottom: 18px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #ddd;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #ddd;\n}\n.panel-default {\n  border-color: #ddd;\n}\n.panel-default > .panel-heading {\n  color: #444;\n  background-color: #FCFCFC;\n  border-color: #ddd;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ddd;\n}\n.panel-default > .panel-heading .badge {\n  color: #FCFCFC;\n  background-color: #444;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ddd;\n}\n.panel-primary {\n  border-color: #D9230F;\n}\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #D9230F;\n  border-color: #D9230F;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #D9230F;\n}\n.panel-primary > .panel-heading .badge {\n  color: #D9230F;\n  background-color: #fff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #D9230F;\n}\n.panel-success {\n  border-color: #469408;\n}\n.panel-success > .panel-heading {\n  color: #fff;\n  background-color: #469408;\n  border-color: #469408;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #469408;\n}\n.panel-success > .panel-heading .badge {\n  color: #469408;\n  background-color: #fff;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #469408;\n}\n.panel-info {\n  border-color: #029ACF;\n}\n.panel-info > .panel-heading {\n  color: #fff;\n  background-color: #029ACF;\n  border-color: #029ACF;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #029ACF;\n}\n.panel-info > .panel-heading .badge {\n  color: #029ACF;\n  background-color: #fff;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #029ACF;\n}\n.panel-warning {\n  border-color: #9B479F;\n}\n.panel-warning > .panel-heading {\n  color: #fff;\n  background-color: #9B479F;\n  border-color: #9B479F;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #9B479F;\n}\n.panel-warning > .panel-heading .badge {\n  color: #9B479F;\n  background-color: #fff;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #9B479F;\n}\n.panel-danger {\n  border-color: #D9831F;\n}\n.panel-danger > .panel-heading {\n  color: #fff;\n  background-color: #D9831F;\n  border-color: #D9831F;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #D9831F;\n}\n.panel-danger > .panel-heading .badge {\n  color: #D9831F;\n  background-color: #fff;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #D9831F;\n}\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f4f4f4;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 19.5px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=20);\n  opacity: 0.2;\n}\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  filter: alpha(opacity=50);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\n  opacity: 0.5;\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  -o-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  -o-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0;\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  filter: alpha(opacity=0);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n}\n.modal-backdrop.in {\n  filter: alpha(opacity=50);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\n  opacity: 0.5;\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.42857143;\n}\n.modal-body {\n  position: relative;\n  padding: 20px;\n}\n.modal-footer {\n  padding: 20px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 12px;\n  filter: alpha(opacity=0);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n}\n.tooltip.in {\n  filter: alpha(opacity=90);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=90);\n  opacity: 0.9;\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 13px;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 13px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover > .arrow {\n  border-width: 11px;\n}\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top > .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #fff;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right > .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #fff;\n}\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom > .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left > .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #fff;\n  bottom: -10px;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  -moz-transition: 0.6s ease-in-out left;\n  -ms-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  line-height: 1;\n}\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    -moz-transition: -moz-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n    -moz-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n    -moz-perspective: 1000px;\n    perspective: 1000px;\n  }\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    left: 0;\n  }\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  filter: alpha(opacity=50);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\n  opacity: 0.5;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  background-color: rgba(0, 0, 0, 0);\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  outline: 0;\n  color: #fff;\n  text-decoration: none;\n  filter: alpha(opacity=90);\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=90);\n  opacity: 0.9;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  margin-top: -10px;\n  z-index: 5;\n  display: inline-block;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  line-height: 1;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203A';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: rgba(0, 0, 0, 0);\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n}\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px;\n  }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix,\n.dl-horizontal dd,\n.container,\n.container-fluid,\n.row,\n.form-horizontal .form-group,\n.btn-toolbar,\n.btn-group-vertical > .btn-group,\n.nav,\n.navbar,\n.navbar-header,\n.navbar-collapse,\n.pager,\n.panel-body,\n.modal-header,\n.modal-footer {\n  *zoom: expression(this.runtimeStyle.zoom='1', this.appendChild(document.createElement('br')).style.cssText='clear:both;font:0/0 serif');\n  zoom: 1 !ie;\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-header:before,\n.modal-header:after,\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-header:after,\n.modal-footer:after {\n  clear: both;\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-header:before,\n.modal-header:after,\n.modal-footer:before,\n.modal-footer:after {\n  content: \"\";\n  display: table;\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-header:after,\n.modal-footer:after {\n  clear: both;\n}\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table !important;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table !important;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  table.visible-print {\n    display: table !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n/* MIXINS */\n/* by https://bitbucket.org/wowua/ */\n.inlineblock {\n  display: inline-block;\n  vertical-align: top;\n  zoom: 1 !ie;\n  display: inline !ie;\n}\n.clearfix,\n.dl-horizontal dd,\n.container,\n.container-fluid,\n.row,\n.form-horizontal .form-group,\n.btn-toolbar,\n.btn-group-vertical > .btn-group,\n.nav,\n.navbar,\n.navbar-header,\n.navbar-collapse,\n.pager,\n.panel-body,\n.modal-header,\n.modal-footer {\n  *zoom: expression(this.runtimeStyle.zoom='1', this.appendChild(document.createElement('br')).style.cssText='clear:both;font:0/0 serif');\n  zoom: 1 !ie;\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-header:before,\n.modal-header:after,\n.modal-footer:before,\n.modal-footer:after {\n  content: \"\";\n  display: table;\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-header:after,\n.modal-footer:after {\n  clear: both;\n}\n.navbar-inverse .badge {\n  background-color: #fff;\n  color: #D9230F;\n}\n.btn {\n  font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.btn-default,\n.btn-default:hover {\n  background-image: -webkit-linear-gradient(#4f5151, #474949 6%, #3f4141);\n  background-image: -o-linear-gradient(#4f5151, #474949 6%, #3f4141);\n  background-image: linear-gradient(#4f5151, #474949 6%, #3f4141);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff4f5151', endColorstr='#ff3f4141', GradientType=0);\n  filter: none;\n  border: 1px solid #2e2f2f;\n}\n.btn-primary,\n.btn-primary:hover {\n  background-image: -webkit-linear-gradient(#e72510, #D9230F 6%, #cb210e);\n  background-image: -o-linear-gradient(#e72510, #D9230F 6%, #cb210e);\n  background-image: linear-gradient(#e72510, #D9230F 6%, #cb210e);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffe72510', endColorstr='#ffcb210e', GradientType=0);\n  filter: none;\n  border: 1px solid #a91b0c;\n}\n.btn-success,\n.btn-success:hover {\n  background-image: -webkit-linear-gradient(#4da309, #469408 6%, #3f8507);\n  background-image: -o-linear-gradient(#4da309, #469408 6%, #3f8507);\n  background-image: linear-gradient(#4da309, #469408 6%, #3f8507);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff4da309', endColorstr='#ff3f8507', GradientType=0);\n  filter: none;\n  border: 1px solid #2f6405;\n}\n.btn-info,\n.btn-info:hover {\n  background-image: -webkit-linear-gradient(#02a5de, #029ACF 6%, #028fc0);\n  background-image: -o-linear-gradient(#02a5de, #029ACF 6%, #028fc0);\n  background-image: linear-gradient(#02a5de, #029ACF 6%, #028fc0);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff02a5de', endColorstr='#ff028fc0', GradientType=0);\n  filter: none;\n  border: 1px solid #02749c;\n}\n.btn-warning,\n.btn-warning:hover {\n  background-image: -webkit-linear-gradient(#a54caa, #9B479F 6%, #914294);\n  background-image: -o-linear-gradient(#a54caa, #9B479F 6%, #914294);\n  background-image: linear-gradient(#a54caa, #9B479F 6%, #914294);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffa54caa', endColorstr='#ff914294', GradientType=0);\n  filter: none;\n  border: 1px solid #79377c;\n}\n.btn-danger,\n.btn-danger:hover {\n  background-image: -webkit-linear-gradient(#e08b27, #D9831F 6%, #cc7b1d);\n  background-image: -o-linear-gradient(#e08b27, #D9831F 6%, #cc7b1d);\n  background-image: linear-gradient(#e08b27, #D9831F 6%, #cc7b1d);\n  background-repeat: no-repeat;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffe08b27', endColorstr='#ffcc7b1d', GradientType=0);\n  filter: none;\n  border: 1px solid #ac6819;\n}\nbody {\n  font-weight: 200;\n}\nth {\n  color: #444;\n}\nlegend {\n  color: #444;\n}\nlabel {\n  font-weight: normal;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label,\n.has-warning .form-control-feedback {\n  color: #D9831F;\n}\n.has-warning .form-control,\n.has-warning .form-control:focus {\n  border-color: #D9831F;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label,\n.has-error .form-control-feedback {\n  color: #D9230F;\n}\n.has-error .form-control,\n.has-error .form-control:focus {\n  border-color: #D9230F;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label,\n.has-success .form-control-feedback {\n  color: #469408;\n}\n.has-success .form-control,\n.has-success .form-control:focus {\n  border-color: #469408;\n}\n.pager a {\n  color: #444;\n}\n.pager a:hover,\n.pager .active > a {\n  border-color: #D9230F;\n  color: #fff;\n}\n.pager .disabled > a {\n  border-color: #ddd;\n}\n.breadcrumb__container_margin-top {\n  margin-top: 3em;\n}\n.common__container_margin-bottom {\n  margin-bottom: 2em;\n}\n.navbar_bottom__workaround_height {\n  height: 3em;\n}\n.documentation_link__list {\n  margin-left: 0;\n  padding-left: 0;\n}\n.documentation_link__list_item {\n  list-style-type: none;\n}\n/* -------= imports =------- */\n", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "/static/images/glyphicons-halflings-regular.svg";

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "/static/images/glyphicons-halflings-regular.ttf";

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "/static/images/glyphicons-halflings-regular.woff";

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "/static/images/glyphicons-halflings-regular.woff2";

/***/ }),
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// установочные переменые ======================================================
let validators = {
    classes : {
        hasError: 'has-error',
        hasSucess: 'has-success'
    },
    clean : {
        errorMsg: ''
    },
    requireField : {
        errorMsg: 'Поле является обязательным для заполнения'
    },
    phone : {
        regExprPattern: '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$',
        regExprFlags: '',
        errorMsg: 'В поле нужно вводить номер телефона, в формате: +7(XXX)XXX-XXXX'
    },
    email : {
        regExprPattern: '.+@.+\\..+',
        regExprFlags: 'i',
        errorMsg: 'В поле нужно вводить email, в формате: someaddress@domain.xxx'
    },
    customValidator: {
        regExprPattern: '',
        regExprFlags: '',
        errorMsg: ''
    }
};
// установочные переменые ======================================================

// вспомогательные функции======================================================
// Функция сравнивающая является ли поле обязательным для заполнения
/**
* Функция проверки заполнено ли поле
* @param  {DOM ELEMENT} inputDOM   проверяемый инпут
* @return {boolean}                если поле пустое то возвращается false
*                                  иначе true
*/
function checkInputForRequire( inputDOM ) {
    // Для inputDOM.value не учитываем введенные пробелы, в случае их наличия строка считается пустой!
    if ( !inputDOM.value.trim() ) {
        return false;
    }
    return true;
}; // checkInputForRequire

// Функция сравнивающая данные в поле с предустановленной регуляркой
/**
* [checkInputTemplRegular проверка на соответсвие данных введенных в поле
* на соответсвие регулярному выражению
* @param  {string} validatorStr      тип валидируемого шаблона, указанный для поля (пример: email, phone и т.д.)
* @param  {DOM Element} inputDOM     DOM элемент, input из валидируемой формы
* @return {boolean}                  если строка в поле совпадает с регуляркой, то true
*                                    иначе false
*/
function checkInputTemplRegular( validatorStr, inputDOM ) {
    let validObj = validators[validatorStr];
    let string = inputDOM.value;
    let expression;

    // построить регулярку в зависимости о наличия флагов
    if ( validObj.regExprFlags === '' ) {
        expression = new RegExp(validObj.regExprPattern);
    } else {
        expression = new RegExp(validObj.regExprPattern, validObj.regExprFlags);
    }

    // проверка на соответсвие строки из инпута, шаблонной регулярке
    if ( expression.test(string) ) {
        return true;
    } else {
        return false;
    }

}; // checkInputTemplRegular

// функция для вывода сообщения об ошибке и выделении инпута в цвет ошибки (например красный)
// TODO предусмотреть задание классов для отвалидированного поля, например зелененьким;)
/**
 * setValidateStatusInDOM сообщение об ошибке, если поле не прошло валидацию
 * @param {Boolean} isErrorInInput    есть ошибка в input формы или нет
 * @param {DOM Element}  inputDOM     DOM элемент, input из валидируемой формы
 * @param {string}  validatorErrorMsg сообщение об ошибке
 */
function setValidateStatusInDOM( isErrorInInput, inputDOM, validatorErrorMsg ) {
    let parentDOM = inputDOM.parentElement;
    let nextDOM = parentDOM.getElementsByTagName('span');
    if ( isErrorInInput === false ) {
        parentDOM.classList.add(validators.classes.hasError);
        nextDOM[0].innerHTML = validatorErrorMsg;             //берем самый первый span внутри родителя
    } else {
        parentDOM.classList.remove(validators.classes.hasError);
        nextDOM[0].innerHTML = validators.clean.errorMsg;
    }
    return;
}; //requireErrValidateStatusInDOM

// Объединение нескольких коллекций элементов в один массив
/**
 * Объединение нескольких коллекций элементов в один массив
 * @param  {DOM}                target        DOM элемент в котором нужно искать требуемые элементы
 * @param  {HTMLCollection}     tempArray     строковый массив с указанием тегов
 * @return {array}              resultArray   результирующий массив объединенных коллекций элементов
 */
function concatTagNamesCollectionToArray(target, tempArray){
    let resultArray = [];
    let targetDOM = target;
    let tempHTMLCollection = null;
    for(let a=0; a<tempArray.length; a++) {
        tempHTMLCollection = targetDOM.getElementsByTagName(tempArray[a]);
        for(let i=0; i<tempHTMLCollection.length; i++) {
            resultArray.push(tempHTMLCollection[i]);
        }
    }
    return resultArray;
} // concatTagNamesCollectionToArray
// вспомогательные функции======================================================

// Обработчики событий =========================================================

/**
 * [Вадидация формы. Экспортируемая функция]
 * @param  {Event} e   [Event object]
 * @param  {Boolean} log [Print logs to a console]
 * @return {undefined}     [nothing]
 */
module.exports = function handleFormValidate(e, log) {
    let isPrintLogs = log || false,
    target = e.target,
    checkStatus = false,
    checkFormStatus = false,
    isNeedFormValidate = undefined,
    allFormElements = undefined,
    isRequire = '',
    validator = '',
    customValidator = '';
    target.noValidate = true;          // Отключить браузерную валидацию для формы

    if ( target.tagName === 'FORM' ) {
        isNeedFormValidate = target.getAttribute('data-js-validation');
        // Проверка формы на, то требует ли фолрма валидации с помощью mmJSValadation
        if ( isNeedFormValidate === 'true' ) {
            allFormElements = concatTagNamesCollectionToArray(target, ['input', 'textarea'] );        // можно задавать список различных тегов для объединения в единую HTML клоллекцию

            // Проверка на наличие инпуитов в форме
            if ( allFormElements.length !== 0 ) {
                // Проверка всех полей в единственном цикле
                for (let i=0;i<allFormElements.length;i++) {
                    isRequire = allFormElements[i].getAttribute('data-validation-require');
                    validator = allFormElements[i].getAttribute('data-validation-templ');
                    customValidator = allFormElements[i].getAttribute('data-validation-custom');

                    // Проверка обязательных полей
                    if ( isRequire === 'true' ) {
                        checkStatus = checkInputForRequire( allFormElements[i] );
                        checkFormStatus = checkStatus;       // если поле пустое, то FALSE, иначе TRUE
                        setValidateStatusInDOM( checkStatus, allFormElements[i], validators.requireField.errorMsg );

                        if ( checkStatus ) {
                            if ( validator ) {
                                checkStatus = checkInputTemplRegular( validator, allFormElements[i] )
                                checkFormStatus = checkStatus;
                                setValidateStatusInDOM( checkStatus, allFormElements[i], validators[validator].errorMsg );
                            } else if ( customValidator ) {
                                let customValidatorArray = customValidator.split(';');
                                let validator = 'customValidator';

                                // уберем кавычки из начала и конца строки
                                for (let i=0;i<customValidatorArray.length;i++) {
                                    customValidatorArray[i] = customValidatorArray[i].slice(1, -1);
                                }

                                // наполним объект кастомной строкой для валидации
                                validators.customValidator.regExprPattern = customValidatorArray[0];
                                validators.customValidator.regExprFlags = customValidatorArray[1];
                                validators.customValidator.errorMsg = customValidatorArray[2];

                                checkStatus = checkInputTemplRegular( validator, allFormElements[i] )
                                checkFormStatus = checkStatus;
                                setValidateStatusInDOM( checkStatus, allFormElements[i], validators[validator].errorMsg );

                                // почистим объект кастомного валидатора
                                validators.customValidator.regExprPattern = '';
                                validators.customValidator.regExprFlags = '';
                                validators.customValidator.errorMsg = '';
                            }
                        }
                    } // Проверка обязательных полей
                    // Проверка необязательных полей
                    else {
                        if ( validator && allFormElements[i].value ) {
                            checkStatus = checkInputTemplRegular( validator, allFormElements[i] )
                            checkFormStatus = checkStatus;
                            setValidateStatusInDOM( checkStatus, allFormElements[i], validators[validator].errorMsg );
                        } else if ( customValidator && allFormElements[i].value ) {
                            let customValidatorArray = customValidator.split(';');
                            let validator = 'customValidator';

                            // уберем кавычки из начала и конца строки
                            for (let i=0;i<customValidatorArray.length;i++) {
                                customValidatorArray[i] = customValidatorArray[i].slice(1, -1);
                            }

                            // наполним объект кастомной строкой для валидации
                            validators.customValidator.regExprPattern = customValidatorArray[0];
                            validators.customValidator.regExprFlags = customValidatorArray[1];
                            validators.customValidator.errorMsg = customValidatorArray[2];

                            checkStatus = checkInputTemplRegular( validator, allFormElements[i] )
                            checkFormStatus = checkStatus;
                            setValidateStatusInDOM( checkStatus, allFormElements[i], validators[validator].errorMsg );

                            // почистим объект кастомного валидатора
                            validators.customValidator.regExprPattern = '';
                            validators.customValidator.regExprFlags = '';
                            validators.customValidator.errorMsg = '';
                        }
                    } // Проверка необязательных полей
                }  // окончание проверки всех полей

                // Если в инпутах формы есть ошибки, то форму не отправлять
                if ( !checkFormStatus ) {
                    if(isPrintLogs) console.log('В инпутах есть ошибка. Форма не отправлена');
                    e.preventDefault();
                } else {
                    if(isPrintLogs) console.log('Ошибок нет. Форма отправлена!');
                } //Если в инпутах формы есть ошибки, то форму не отправлять

            } // Проверка на наличие инпуитов в форме
            // Если инпутов нет, то завершить обработку и выйти
            else {
                e.preventDefault();
                return;
            } // Если инпутов нет, то завершить обработку и выйти
        } // Проверка формы на, то требует ли фолрма валидации с помощью mmJSValadation
        // Если форма не требует валидации с помощью mmJSValadation, то просто отдать ее BACK-END
        else {
            if(isPrintLogs) console.log('Форма поехала в бекэнд');
        }         // Если форма не требует валидации с помощью mmJSValadation, то просто отдать ее BACK-END
    }

}; // handleFormValidate
// Обработчики событий =========================================================


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(2);
  var ReactPropTypesSecret = __webpack_require__(37);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(60);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(14);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(2);

var ReactPropTypesSecret = __webpack_require__(37);
var checkPropTypes = __webpack_require__(58);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(6);

var invariant = __webpack_require__(4);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(11);

var ReactChildren = __webpack_require__(64);
var ReactComponent = __webpack_require__(32);
var ReactPureComponent = __webpack_require__(69);
var ReactClass = __webpack_require__(65);
var ReactDOMFactories = __webpack_require__(66);
var ReactElement = __webpack_require__(5);
var ReactPropTypes = __webpack_require__(67);
var ReactVersion = __webpack_require__(70);

var onlyChild = __webpack_require__(72);
var warning = __webpack_require__(2);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var canDefineProperty = __webpack_require__(13);
  var ReactElementValidator = __webpack_require__(39);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

// TODO: Fix tests so that this deprecation warning doesn't cause failures.
if (process.env.NODE_ENV !== 'production') {
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        process.env.NODE_ENV !== 'production' ? warning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated. Use ' + 'the prop-types package from npm instead.') : void 0;
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });
  }
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(62);
var ReactElement = __webpack_require__(5);

var emptyFunction = __webpack_require__(14);
var traverseAllChildren = __webpack_require__(73);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(6),
    _assign = __webpack_require__(11);

var ReactComponent = __webpack_require__(32);
var ReactElement = __webpack_require__(5);
var ReactPropTypeLocationNames = __webpack_require__(40);
var ReactNoopUpdateQueue = __webpack_require__(34);

var emptyObject = __webpack_require__(15);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(2);

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

var didWarnDeprecated = false;

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(didWarnDeprecated, '%s: React.createClass is deprecated and will be removed in version 16. ' + 'Use plain JavaScript classes instead. If you\'re not yet ready to ' + 'migrate, create-react-class is available on npm as a ' + 'drop-in replacement.', spec && spec.displayName || 'A Component') : void 0;
      didWarnDeprecated = true;
    }

    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(5);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(39);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(5),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(59);

module.exports = factory(isValidElement);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(11);

var ReactComponent = __webpack_require__(32);
var ReactNoopUpdateQueue = __webpack_require__(34);

var emptyObject = __webpack_require__(15);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.5.4';

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(6);

var ReactPropTypeLocationNames = __webpack_require__(40);
var ReactPropTypesSecret = __webpack_require__(68);

var invariant = __webpack_require__(4);
var warning = __webpack_require__(2);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(33);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(33);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(6);

var ReactElement = __webpack_require__(5);

var invariant = __webpack_require__(4);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(6);

var ReactCurrentOwner = __webpack_require__(12);
var REACT_ELEMENT_TYPE = __webpack_require__(38);

var getIteratorFn = __webpack_require__(41);
var invariant = __webpack_require__(4);
var KeyEscapeUtils = __webpack_require__(61);
var warning = __webpack_require__(2);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(75);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFjNzEyOGU1OGUyMzdhY2ZiZDkiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi93YXJuaW5nLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9yZWFjdFByb2RJbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2VtcHR5T2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50VHJlZUhvb2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5lb3QiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9tbS1qcy12YWxpZGF0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvcmVhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2xlc3MvbWFpbi5sZXNzPzYyOTMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbGVzcy9tYWluLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jvb3RzdHJhcC9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnN2ZyIsIndlYnBhY2s6Ly8vLi9+L2Jvb3RzdHJhcC9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnR0ZiIsIndlYnBhY2s6Ly8vLi9+L2Jvb3RzdHJhcC9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLndvZmYiLCJ3ZWJwYWNrOi8vLy4vfi9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci53b2ZmMiIsIndlYnBhY2s6Ly8vLi9+L21tLWpzLXZhbGlkYXRpb24vc3JjL21tLWZvcm0tdmFsaWRhdGlvbi5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL34vcHJvcC10eXBlcy9mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9LZXlFc2NhcGVVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkcmVuLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQdXJlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9jaGVja1JlYWN0VHlwZVNwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvb25seUNoaWxkLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2ZpeFVybHMuanMiXSwibmFtZXMiOlsidmFsaWRhdG9yIiwicmVxdWlyZSIsInN1Ym1pdHRlZEZvcm1zIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiVGVzdCIsImdldENvb2tpZSIsIm5hbWUiLCJjb29raWVWYWx1ZSIsImNvb2tpZSIsImNvb2tpZXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJqUXVlcnkiLCJ0cmltIiwic3Vic3RyaW5nIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiJCIsImFqYXhTZXR1cCIsImJlZm9yZVNlbmQiLCJ4aHIiLCJzZXR0aW5ncyIsInRlc3QiLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7O0FDblZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0RBQW9EOztBQUVwRCxzQkFBc0IsbUJBQW1CO0FBQ3pDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTs7QUFFQSxvQzs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7O0FBRUEsbUM7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUSxvQkFBb0IsRUFBRTtBQUMxRDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsbUM7Ozs7Ozs7O0FDeEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUMvZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Qjs7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QSxhQUFhLE9BQU87QUFDcEIsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0Qjs7Ozs7Ozs7QUNqdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DOzs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx5Qzs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxzQzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEI7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmFjNzEyOGU1OGUyMzdhY2ZiZDkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZianMvbGliL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFN5bWJvbCcpO1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZmFjdG9yeVxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jbG9uZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5pc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogV0FSTklORzogRE8gTk9UIG1hbnVhbGx5IHJlcXVpcmUgdGhpcyBtb2R1bGUuXG4gKiBUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIGBpbnZhcmlhbnQoLi4uKWAgdXNlZCBieSB0aGUgZXJyb3IgY29kZSBzeXN0ZW1cbiAqIGFuZCB3aWxsIF9vbmx5XyBiZSByZXF1aXJlZCBieSB0aGUgY29ycmVzcG9uZGluZyBiYWJlbCBwYXNzLlxuICogSXQgYWx3YXlzIHRocm93cy5cbiAqL1xuXG5mdW5jdGlvbiByZWFjdFByb2RJbnZhcmlhbnQoY29kZSkge1xuICB2YXIgYXJnQ291bnQgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblxuICB2YXIgbWVzc2FnZSA9ICdNaW5pZmllZCBSZWFjdCBlcnJvciAjJyArIGNvZGUgKyAnOyB2aXNpdCAnICsgJ2h0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PScgKyBjb2RlO1xuXG4gIGZvciAodmFyIGFyZ0lkeCA9IDA7IGFyZ0lkeCA8IGFyZ0NvdW50OyBhcmdJZHgrKykge1xuICAgIG1lc3NhZ2UgKz0gJyZhcmdzW109JyArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbYXJnSWR4ICsgMV0pO1xuICB9XG5cbiAgbWVzc2FnZSArPSAnIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCcgKyAnIGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLic7XG5cbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgcmVhY3RQcm9kSW52YXJpYW50J3Mgb3duIGZyYW1lXG5cbiAgdGhyb3cgZXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3RQcm9kSW52YXJpYW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvcmVhY3RQcm9kSW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vb2JqZWN0LWFzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RDdXJyZW50T3duZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IF9wcm9kSW52YXJpYW50KCc4NScpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoaGFzT3duUHJvcGVydHkpXG4gIC8vIFN0cmlwIHJlZ2V4IGNoYXJhY3RlcnMgc28gd2UgY2FuIHVzZSBpdCBmb3IgcmVnZXhcbiAgLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLy8gUmVtb3ZlIGhhc093blByb3BlcnR5IGZyb20gdGhlIHRlbXBsYXRlIHRvIG1ha2UgaXQgZ2VuZXJpY1xuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCcpO1xuICB0cnkge1xuICAgIHZhciBzb3VyY2UgPSBmdW5jVG9TdHJpbmcuY2FsbChmbik7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChzb3VyY2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGNhblVzZUNvbGxlY3Rpb25zID1cbi8vIEFycmF5LmZyb21cbnR5cGVvZiBBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nICYmXG4vLyBNYXBcbnR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwKSAmJlxuLy8gTWFwLnByb3RvdHlwZS5rZXlzXG5NYXAucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXAucHJvdG90eXBlLmtleXMpICYmXG4vLyBTZXRcbnR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0KSAmJlxuLy8gU2V0LnByb3RvdHlwZS5rZXlzXG5TZXQucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQucHJvdG90eXBlLmtleXMpO1xuXG52YXIgc2V0SXRlbTtcbnZhciBnZXRJdGVtO1xudmFyIHJlbW92ZUl0ZW07XG52YXIgZ2V0SXRlbUlEcztcbnZhciBhZGRSb290O1xudmFyIHJlbW92ZVJvb3Q7XG52YXIgZ2V0Um9vdElEcztcblxuaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gIHZhciBpdGVtTWFwID0gbmV3IE1hcCgpO1xuICB2YXIgcm9vdElEU2V0ID0gbmV3IFNldCgpO1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICBpdGVtTWFwLnNldChpZCwgaXRlbSk7XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gaXRlbU1hcC5nZXQoaWQpO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaXRlbU1hcFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1NYXAua2V5cygpKTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0LmFkZChpZCk7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXRbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290SURTZXQua2V5cygpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBpdGVtQnlLZXkgPSB7fTtcbiAgdmFyIHJvb3RCeUtleSA9IHt9O1xuXG4gIC8vIFVzZSBub24tbnVtZXJpYyBrZXlzIHRvIHByZXZlbnQgVjggcGVyZm9ybWFuY2UgaXNzdWVzOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG4gIHZhciBnZXRLZXlGcm9tSUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gJy4nICsgaWQ7XG4gIH07XG4gIHZhciBnZXRJREZyb21LZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGtleS5zdWJzdHIoMSksIDEwKTtcbiAgfTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgaXRlbUJ5S2V5W2tleV0gPSBpdGVtO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcmV0dXJuIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtQnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByb290QnlLZXlba2V5XSA9IHRydWU7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgcm9vdEJ5S2V5W2tleV07XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJvb3RCeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG59XG5cbnZhciB1bm1vdW50ZWRJRHMgPSBbXTtcblxuZnVuY3Rpb24gcHVyZ2VEZWVwKGlkKSB7XG4gIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gIGlmIChpdGVtKSB7XG4gICAgdmFyIGNoaWxkSURzID0gaXRlbS5jaGlsZElEcztcblxuICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgIGNoaWxkSURzLmZvckVhY2gocHVyZ2VEZWVwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWU7XG4gIGlmIChvd25lcklEKSB7XG4gICAgb3duZXJOYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShvd25lcklEKTtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50LCAnUmVhY3RDb21wb25lbnRUcmVlSG9vazogTWlzc2luZyBSZWFjdCBlbGVtZW50IGZvciBkZWJ1Z0lEICVzIHdoZW4gJyArICdidWlsZGluZyBzdGFjaycsIGlkKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgZWxlbWVudCAmJiBlbGVtZW50Ll9zb3VyY2UsIG93bmVyTmFtZSk7XG59XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0ge1xuICBvblNldENoaWxkcmVuOiBmdW5jdGlvbiAoaWQsIG5leHRDaGlsZElEcykge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmNoaWxkSURzID0gbmV4dENoaWxkSURzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXh0Q2hpbGRJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuZXh0Q2hpbGRJRCA9IG5leHRDaGlsZElEc1tpXTtcbiAgICAgIHZhciBuZXh0Q2hpbGQgPSBnZXRJdGVtKG5leHRDaGlsZElEKTtcbiAgICAgICFuZXh0Q2hpbGQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgaG9vayBldmVudHMgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDAnKSA6IHZvaWQgMDtcbiAgICAgICEobmV4dENoaWxkLmNoaWxkSURzICE9IG51bGwgfHwgdHlwZW9mIG5leHRDaGlsZC5lbGVtZW50ICE9PSAnb2JqZWN0JyB8fCBuZXh0Q2hpbGQuZWxlbWVudCA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvblNldENoaWxkcmVuKCkgdG8gZmlyZSBmb3IgYSBjb250YWluZXIgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MScpIDogdm9pZCAwO1xuICAgICAgIW5leHRDaGlsZC5pc01vdW50ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25Nb3VudENvbXBvbmVudCgpIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnNzEnKSA6IHZvaWQgMDtcbiAgICAgIGlmIChuZXh0Q2hpbGQucGFyZW50SUQgPT0gbnVsbCkge1xuICAgICAgICBuZXh0Q2hpbGQucGFyZW50SUQgPSBpZDtcbiAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5IGJ1dCBtb3VudGluZyBhIG5ldyByb290IGR1cmluZyBpblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgY3VycmVudGx5IGNhdXNlcyBub3QteWV0LW1vdW50ZWQgY29tcG9uZW50cyB0b1xuICAgICAgICAvLyBiZSBwdXJnZWQgZnJvbSBvdXIgdHJlZSBkYXRhIHNvIHRoZWlyIHBhcmVudCBpZCBpcyBtaXNzaW5nLlxuICAgICAgfVxuICAgICAgIShuZXh0Q2hpbGQucGFyZW50SUQgPT09IGlkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiBfcHJvZEludmFyaWFudCgnMTQyJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogdm9pZCAwO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVNb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIHBhcmVudElEOiBwYXJlbnRJRCxcbiAgICAgIHRleHQ6IG51bGwsXG4gICAgICBjaGlsZElEczogW10sXG4gICAgICBpc01vdW50ZWQ6IGZhbHNlLFxuICAgICAgdXBkYXRlQ291bnQ6IDBcbiAgICB9O1xuICAgIHNldEl0ZW0oaWQsIGl0ZW0pO1xuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50KSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmlzTW91bnRlZCA9IHRydWU7XG4gICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgYWRkUm9vdChpZCk7XG4gICAgfVxuICB9LFxuICBvblVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0udXBkYXRlQ291bnQrKztcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGV4aXN0cy5cbiAgICAgIC8vIGBpdGVtYCBtaWdodCBub3QgZXhpc3QgaWYgaXQgaXMgaW5zaWRlIGFuIGVycm9yIGJvdW5kYXJ5LCBhbmQgYSBzaWJsaW5nXG4gICAgICAvLyBlcnJvciBib3VuZGFyeSBjaGlsZCB0aHJldyB3aGlsZSBtb3VudGluZy4gVGhlbiB0aGlzIGluc3RhbmNlIG5ldmVyXG4gICAgICAvLyBnb3QgYSBjaGFuY2UgdG8gbW91bnQsIGJ1dCBpdCBzdGlsbCBnZXRzIGFuIHVubW91bnRpbmcgZXZlbnQgZHVyaW5nXG4gICAgICAvLyB0aGUgZXJyb3IgYm91bmRhcnkgY2xlYW51cC5cbiAgICAgIGl0ZW0uaXNNb3VudGVkID0gZmFsc2U7XG4gICAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgcmVtb3ZlUm9vdChpZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5wdXNoKGlkKTtcbiAgfSxcbiAgcHVyZ2VVbm1vdW50ZWRDb21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0Q29tcG9uZW50VHJlZUhvb2suX3ByZXZlbnRQdXJnaW5nKSB7XG4gICAgICAvLyBTaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5tb3VudGVkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB1bm1vdW50ZWRJRHNbaV07XG4gICAgICBwdXJnZURlZXAoaWQpO1xuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMubGVuZ3RoID0gMDtcbiAgfSxcbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pc01vdW50ZWQgOiBmYWxzZTtcbiAgfSxcbiAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW06IGZ1bmN0aW9uICh0b3BFbGVtZW50KSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodG9wRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZSh0b3BFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IHRvcEVsZW1lbnQuX293bmVyO1xuICAgICAgaW5mbyArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHRvcEVsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgb3duZXIuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudE93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB2YXIgaWQgPSBjdXJyZW50T3duZXIgJiYgY3VycmVudE93bmVyLl9kZWJ1Z0lEO1xuXG4gICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGlkKTtcbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgd2hpbGUgKGlkKSB7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlSUQoaWQpO1xuICAgICAgaWQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFBhcmVudElEKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldENoaWxkSURzOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jaGlsZElEcyA6IFtdO1xuICB9LFxuICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBnZXREaXNwbGF5TmFtZShlbGVtZW50KTtcbiAgfSxcbiAgZ2V0RWxlbWVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gIH0sXG4gIGdldE93bmVySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuX293bmVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuX293bmVyLl9kZWJ1Z0lEO1xuICB9LFxuICBnZXRQYXJlbnRJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ucGFyZW50SUQgOiBudWxsO1xuICB9LFxuICBnZXRTb3VyY2U6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5fc291cmNlIDogbnVsbDtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnJyArIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlQ291bnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnVwZGF0ZUNvdW50IDogMDtcbiAgfSxcblxuXG4gIGdldFJvb3RJRHM6IGdldFJvb3RJRHMsXG4gIGdldFJlZ2lzdGVyZWRJRHM6IGdldEl0ZW1JRHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50VHJlZUhvb2suanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiL3N0YXRpYy9pbWFnZXMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5lb3RcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vdHN0cmFwL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIuZW90XG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50IHR5cGUuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudFN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgY2hlY2tSZWFjdFR5cGVTcGVjID0gcmVxdWlyZSgnLi9jaGVja1JlYWN0VHlwZVNwZWMnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShlbGVtZW50UHJvcHMpIHtcbiAgaWYgKGVsZW1lbnRQcm9wcyAhPT0gbnVsbCAmJiBlbGVtZW50UHJvcHMgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50UHJvcHMuX19zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50UHJvcHMuX19zb3VyY2U7XG4gICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgIHJldHVybiAnIENoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnIENoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSA9IHt9KTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGVsZW1lbnQuX293bmVyLmdldE5hbWUoKSArICcuJztcbiAgfVxuXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4lcycsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIsIFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCkpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyBwcm92aWRlIGltcGxpY2l0IGtleXMuXG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUmVhY3RUeXBlU3BlYyhjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZWxlbWVudCwgbnVsbCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIH1cbn1cblxudmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHtcblxuICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAgIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGluZm8gPSAnJztcbiAgICAgICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0eXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArICdpdFxcJ3MgZGVmaW5lZCBpbi4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNvdXJjZUluZm8gPSBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShwcm9wcyk7XG4gICAgICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbmZvICs9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oKTtcblxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZSA9PSBudWxsID8gdHlwZSA6IHR5cGVvZiB0eXBlLCBpbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAgIC8vIFRPRE86IERyb3AgdGhpcyB3aGVuIHRoZXNlIGFyZSBubyBsb25nZXIgYWxsb3dlZCBhcyB0aGUgdHlwZSBhcmd1bWVudC5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAgIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgICAvLyBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kIHByb2QuXG4gICAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZUZhY3Rvcnk6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAgIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICAgIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpIDogdm9pZCAwO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xuICB9LFxuXG4gIGNsb25lRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgdmFsaWRhdG9yID0gIHJlcXVpcmUoJy4vc3JjL21tLWZvcm0tdmFsaWRhdGlvbi5tb2R1bGUnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdG9yO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbW0tanMtdmFsaWRhdGlvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1JlYWN0Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvcmVhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9pbmRleC5qcyEuL21haW4ubGVzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9pbmRleC5qcyEuL21haW4ubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvaW5kZXguanMhLi9tYWluLmxlc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2xlc3MvbWFpbi5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxubGV0IHZhbGlkYXRvciA9IHJlcXVpcmUoJ21tLWpzLXZhbGlkYXRpb24nKTtcclxucmVxdWlyZSgnLi9sZXNzL21haW4ubGVzcycpO1xyXG5sZXQgc3VibWl0dGVkRm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmFsaWRhdGVUaGlzSUQnKTtcclxuaWYgKHN1Ym1pdHRlZEZvcm1zKSB7XHJcbiAgICBzdWJtaXR0ZWRGb3Jtcy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgIHZhbGlkYXRvcihlKTtcclxuICAgIH0pO1xyXG59XHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gICAgbGV0IGNvb2tpZVZhbHVlID0gbnVsbDtcclxuICAgIGlmIChkb2N1bWVudC5jb29raWUgJiYgZG9jdW1lbnQuY29va2llICE9ICcnKSB7XHJcbiAgICAgICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvb2tpZSA9IGpRdWVyeS50cmltKGNvb2tpZXNbaV0pO1xyXG4gICAgICAgICAgICAvLyBEb2VzIHRoaXMgY29va2llIHN0cmluZyBiZWdpbiB3aXRoIHRoZSBuYW1lIHdlIHdhbnQ/XHJcbiAgICAgICAgICAgIGlmIChjb29raWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoICsgMSkgPT0gKG5hbWUgKyAnPScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb29raWVWYWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29va2llVmFsdWU7XHJcbn1cclxuXHJcbiQuYWpheFNldHVwKHtcclxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKCEoL15odHRwOi4qLy50ZXN0KHNldHRpbmdzLnVybCkgfHwgL15odHRwczouKi8udGVzdChzZXR0aW5ncy51cmwpKSkge1xyXG4gICAgICAgICAgICAvLyBPbmx5IHNlbmQgdGhlIHRva2VuIHRvIHJlbGF0aXZlIFVSTHMgaS5lLiBsb2NhbGx5LlxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlgtQ1NSRlRva2VuXCIsIGdldENvb2tpZSgnY3NyZnRva2VuJykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC5qcyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiAtLS0tLS0tPSBpbXBvcnRzID0tLS0tLS0tICovXFxuLyohXFxuICogQm9vdHN0cmFwIHYzLjMuNyAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXFxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXFxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcXG4gKi9cXG4vKiEgbm9ybWFsaXplLmNzcyB2My4wLjMgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbn1cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5kZXRhaWxzLFxcbmZpZ2NhcHRpb24sXFxuZmlndXJlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1haW4sXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbixcXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5hdWRpbyxcXG5jYW52YXMsXFxucHJvZ3Jlc3MsXFxudmlkZW8ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5hdWRpbzpub3QoW2NvbnRyb2xzXSkge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGhlaWdodDogMDtcXG59XFxuW2hpZGRlbl0sXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuYTphY3RpdmUsXFxuYTpob3ZlciB7XFxuICBvdXRsaW5lOiAwO1xcbn1cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkO1xcbn1cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuZGZuIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5tYXJrIHtcXG4gIGJhY2tncm91bmQ6ICNmZjA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5pbWcge1xcbiAgYm9yZGVyOiAwO1xcbn1cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAxZW0gNDBweDtcXG59XFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICBoZWlnaHQ6IDA7XFxufVxcbnByZSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuY29kZSxcXG5rYmQsXFxucHJlLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xcbiAgZm9udC1zaXplOiAxZW07XFxufVxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBmb250OiBpbmhlcml0O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5idXR0b24ge1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcbmJ1dHRvbixcXG5odG1sIGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcbmlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbmJ1dHRvbltkaXNhYmxlZF0sXFxuaHRtbCBpbnB1dFtkaXNhYmxlZF0ge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuaW5wdXQ6Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuaW5wdXQge1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG59XFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxufVxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuZmllbGRzZXQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2MwYzBjMDtcXG4gIG1hcmdpbjogMCAycHg7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC42MjVlbSAwLjc1ZW07XFxufVxcbmxlZ2VuZCB7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxub3B0Z3JvdXAge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxudGQsXFxudGgge1xcbiAgcGFkZGluZzogMDtcXG59XFxuLyohIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL2g1YnAvaHRtbDUtYm9pbGVycGxhdGUvYmxvYi9tYXN0ZXIvc3JjL2Nzcy9tYWluLmNzcyAqL1xcbkBtZWRpYSBwcmludCB7XFxuICAqLFxcbiAgKjpiZWZvcmUsXFxuICAqOmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMwMDAgIWltcG9ydGFudDtcXG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcbiAgICB0ZXh0LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgYSxcXG4gIGE6dmlzaXRlZCB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgfVxcbiAgYVtocmVmXTphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCIgKFxcXCIgYXR0cihocmVmKSBcXFwiKVxcXCI7XFxuICB9XFxuICBhYmJyW3RpdGxlXTphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCIgKFxcXCIgYXR0cih0aXRsZSkgXFxcIilcXFwiO1xcbiAgfVxcbiAgYVtocmVmXj1cXFwiI1xcXCJdOmFmdGVyLFxcbiAgYVtocmVmXj1cXFwiamF2YXNjcmlwdDpcXFwiXTphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgfVxcbiAgcHJlLFxcbiAgYmxvY2txdW90ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxuICAgIHBhZ2UtYnJlYWstaW5zaWRlOiBhdm9pZDtcXG4gIH1cXG4gIHRoZWFkIHtcXG4gICAgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwO1xcbiAgfVxcbiAgdHIsXFxuICBpbWcge1xcbiAgICBwYWdlLWJyZWFrLWluc2lkZTogYXZvaWQ7XFxuICB9XFxuICBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIH1cXG4gIHAsXFxuICBoMixcXG4gIGgzIHtcXG4gICAgb3JwaGFuczogMztcXG4gICAgd2lkb3dzOiAzO1xcbiAgfVxcbiAgaDIsXFxuICBoMyB7XFxuICAgIHBhZ2UtYnJlYWstYWZ0ZXI6IGF2b2lkO1xcbiAgfVxcbiAgLm5hdmJhciB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuICAuYnRuID4gLmNhcmV0LFxcbiAgLmRyb3B1cCA+IC5idG4gPiAuY2FyZXQge1xcbiAgICBib3JkZXItdG9wLWNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7XFxuICB9XFxuICAubGFiZWwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcbiAgfVxcbiAgLnRhYmxlIHtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgLnRhYmxlIHRkLFxcbiAgLnRhYmxlIHRoIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xcbiAgfVxcbiAgLnRhYmxlLWJvcmRlcmVkIHRoLFxcbiAgLnRhYmxlLWJvcmRlcmVkIHRkIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnR2x5cGhpY29ucyBIYWxmbGluZ3MnO1xcbiAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLmVvdFwiKSArIFwiKTtcXG4gIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5lb3RcIikgKyBcIj8jaWVmaXgpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci53b2ZmMlwiKSArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIud29mZlwiKSArIFwiKSBmb3JtYXQoJ3dvZmYnKSwgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci50dGZcIikgKyBcIikgZm9ybWF0KCd0cnVldHlwZScpLCB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnN2Z1wiKSArIFwiI2dseXBoaWNvbnNfaGFsZmxpbmdzcmVndWxhcikgZm9ybWF0KCdzdmcnKTtcXG59XFxuLmdseXBoaWNvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDFweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtZmFtaWx5OiAnR2x5cGhpY29ucyBIYWxmbGluZ3MnO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbn1cXG4uZ2x5cGhpY29uLWFzdGVyaXNrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiKlxcXCI7XFxufVxcbi5nbHlwaGljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIitcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV1cm86YmVmb3JlLFxcbi5nbHlwaGljb24tZXVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIwQUNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1pbnVzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIyMTJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNsb3VkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI2MDFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVudmVsb3BlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI3MDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBlbmNpbDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyNzBGXFxcIjtcXG59XFxuLmdseXBoaWNvbi1nbGFzczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDAxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1tdXNpYzpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDAyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zZWFyY2g6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAwM1xcXCI7XFxufVxcbi5nbHlwaGljb24taGVhcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tc3RhcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDA2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zdGFyLWVtcHR5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMDdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVzZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAwOFxcXCI7XFxufVxcbi5nbHlwaGljb24tZmlsbTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDA5XFxcIjtcXG59XFxuLmdseXBoaWNvbi10aC1sYXJnZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDEwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDExXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aC1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMTJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMTNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlbW92ZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDE0XFxcIjtcXG59XFxuLmdseXBoaWNvbi16b29tLWluOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXpvb20tb3V0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9mZjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDE3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaWduYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAxOFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29nOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMTlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyYXNoOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMjBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhvbWU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAyMVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmlsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDIyXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aW1lOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJvYWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAyNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZG93bmxvYWQtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWRvd25sb2FkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVwbG9hZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDI3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1pbmJveDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDI4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGF5LWNpcmNsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDI5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZXBlYXQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAzMFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVmcmVzaDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDMxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1saXN0LWFsdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDMyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sb2NrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMzNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsYWc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAzNFxcXCI7XFxufVxcbi5nbHlwaGljb24taGVhZHBob25lczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDM1XFxcIjtcXG59XFxuLmdseXBoaWNvbi12b2x1bWUtb2ZmOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXZvbHVtZS1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwMzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXZvbHVtZS11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDM4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1xcmNvZGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTAzOVxcXCI7XFxufVxcbi5nbHlwaGljb24tYmFyY29kZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDQwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10YWc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA0MVxcXCI7XFxufVxcbi5nbHlwaGljb24tdGFnczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDQyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1ib29rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJvb2ttYXJrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNDRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXByaW50OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNDVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNhbWVyYTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDQ2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mb250OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNDdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJvbGQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA0OFxcXCI7XFxufVxcbi5nbHlwaGljb24taXRhbGljOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtaGVpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtd2lkdGg6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA1MVxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDUyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1hbGlnbi1jZW50ZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA1M1xcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA1NFxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tanVzdGlmeTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDU1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWluZGVudC1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNTdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWluZGVudC1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDU4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mYWNldGltZS12aWRlbzpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDU5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1waWN0dXJlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNjBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1hcC1tYXJrZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA2MlxcXCI7XFxufVxcbi5nbHlwaGljb24tYWRqdXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRpbnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA2NFxcXCI7XFxufVxcbi5nbHlwaGljb24tZWRpdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDY1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaGFyZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDY2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGVjazpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDY3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1tb3ZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNjhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0ZXAtYmFja3dhcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA2OVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmFzdC1iYWNrd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDcwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1iYWNrd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDcxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGF5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNzJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBhdXNlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNzNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0b3A6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA3NFxcXCI7XFxufVxcbi5nbHlwaGljb24tZm9yd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDc1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mYXN0LWZvcndhcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA3NlxcXCI7XFxufVxcbi5nbHlwaGljb24tc3RlcC1mb3J3YXJkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVqZWN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwNzhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNoZXZyb24tbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDc5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwODBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBsdXMtc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDgxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1taW51cy1zaWduOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwODJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlbW92ZS1zaWduOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwODNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA4NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcXVlc3Rpb24tc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDg1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1pbmZvLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA4NlxcXCI7XFxufVxcbi5nbHlwaGljb24tc2NyZWVuc2hvdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDg3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZW1vdmUtY2lyY2xlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwODhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rLWNpcmNsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDg5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1iYW4tY2lyY2xlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwOTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWFycm93LWxlZnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA5MVxcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA5MlxcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA5M1xcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctZG93bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMDk0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaGFyZS1hbHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA5NVxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLWZ1bGw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTA5NlxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLXNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUwOTdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEwMVxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2lmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTAyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sZWFmOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZpcmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEwNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZXllLW9wZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tZXllLWNsb3NlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMDZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXdhcm5pbmctc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTA3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGFuZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTA4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jYWxlbmRhcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTA5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yYW5kb206YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTExMFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29tbWVudDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTExXFxcIjtcXG59XFxuLmdseXBoaWNvbi1tYWduZXQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTExMlxcXCI7XFxufVxcbi5nbHlwaGljb24tY2hldnJvbi11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTEzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGV2cm9uLWRvd246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTExNFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmV0d2VldDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTE1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaG9wcGluZy1jYXJ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZvbGRlci1jbG9zZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTE3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mb2xkZXItb3BlbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTE4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZXNpemUtdmVydGljYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTExOVxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLWhvcml6b250YWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEyMFxcXCI7XFxufVxcbi5nbHlwaGljb24taGRkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMjFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJ1bGxob3JuOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMjJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJlbGw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEyM1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2VydGlmaWNhdGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEyNFxcXCI7XFxufVxcbi5nbHlwaGljb24tdGh1bWJzLXVwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRodW1icy1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhhbmQtcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEyN1xcXCI7XFxufVxcbi5nbHlwaGljb24taGFuZC1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMjhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhhbmQtdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEyOVxcXCI7XFxufVxcbi5nbHlwaGljb24taGFuZC1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMzBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTMxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaXJjbGUtYXJyb3ctbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTMyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaXJjbGUtYXJyb3ctdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEzM1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2lyY2xlLWFycm93LWRvd246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEzNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2xvYmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEzNVxcXCI7XFxufVxcbi5nbHlwaGljb24td3JlbmNoOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRhc2tzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxMzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZpbHRlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTM4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1icmllZmNhc2U6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTEzOVxcXCI7XFxufVxcbi5nbHlwaGljb24tZnVsbHNjcmVlbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTQwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1kYXNoYm9hcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE0MVxcXCI7XFxufVxcbi5nbHlwaGljb24tcGFwZXJjbGlwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNDJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhlYXJ0LWVtcHR5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWxpbms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE0NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcGhvbmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE0NVxcXCI7XFxufVxcbi5nbHlwaGljb24tcHVzaHBpbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTQ2XFxcIjtcXG59XFxuLmdseXBoaWNvbi11c2Q6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE0OFxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2JwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE1MFxcXCI7XFxufVxcbi5nbHlwaGljb24tc29ydC1ieS1hbHBoYWJldDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTUxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTUyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LW9yZGVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNTNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQtYnktb3JkZXItYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNTRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQtYnktYXR0cmlidXRlczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTU1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LWF0dHJpYnV0ZXMtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVuY2hlY2tlZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTU3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1leHBhbmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE1OFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29sbGFwc2UtZG93bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTU5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jb2xsYXBzZS11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTYwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sb2ctaW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE2MVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmxhc2g6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE2MlxcXCI7XFxufVxcbi5nbHlwaGljb24tbG9nLW91dDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTYzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1uZXctd2luZG93OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNjRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlY29yZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTY1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zYXZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9wZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE2N1xcXCI7XFxufVxcbi5nbHlwaGljb24tc2F2ZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE2OFxcXCI7XFxufVxcbi5nbHlwaGljb24taW1wb3J0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNjlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV4cG9ydDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTcwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zZW5kOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1kaXNrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1zYXZlZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTczXFxcIjtcXG59XFxuLmdseXBoaWNvbi1mbG9wcHktcmVtb3ZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1zYXZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1vcGVuOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNyZWRpdC1jYXJkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyYW5zZmVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxNzhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWN1dGxlcnk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE3OVxcXCI7XFxufVxcbi5nbHlwaGljb24taGVhZGVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNvbXByZXNzZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE4MVxcXCI7XFxufVxcbi5nbHlwaGljb24tZWFycGhvbmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE4MlxcXCI7XFxufVxcbi5nbHlwaGljb24tcGhvbmUtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRvd2VyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0YXRzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNkLXZpZGVvOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhkLXZpZGVvOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxODdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN1YnRpdGxlczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTg4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3VuZC1zdGVyZW86YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE4OVxcXCI7XFxufVxcbi5nbHlwaGljb24tc291bmQtZG9sYnk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE5MFxcXCI7XFxufVxcbi5nbHlwaGljb24tc291bmQtNS0xOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxOTFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvdW5kLTYtMTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTkyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3VuZC03LTE6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE5M1xcXCI7XFxufVxcbi5nbHlwaGljb24tY29weXJpZ2h0LW1hcms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE5NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVnaXN0cmF0aW9uLW1hcms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE5NVxcXCI7XFxufVxcbi5nbHlwaGljb24tY2xvdWQtZG93bmxvYWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTE5N1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2xvdWQtdXBsb2FkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUxOThcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyZWUtY29uaWZlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMTk5XFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmVlLWRlY2lkdW91czpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjAwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjAxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zYXZlLWZpbGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIwMlxcXCI7XFxufVxcbi5nbHlwaGljb24tb3Blbi1maWxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWxldmVsLXVwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMDRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNvcHk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tcGFzdGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIwNlxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxlcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIwOVxcXCI7XFxufVxcbi5nbHlwaGljb24tZXF1YWxpemVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWtpbmc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIxMVxcXCI7XFxufVxcbi5nbHlwaGljb24tcXVlZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIxMlxcXCI7XFxufVxcbi5nbHlwaGljb24tcGF3bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjEzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1iaXNob3A6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIxNFxcXCI7XFxufVxcbi5nbHlwaGljb24ta25pZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJhYnktZm9ybXVsYTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjE2XFxcIjtcXG59XFxuLmdseXBoaWNvbi10ZW50OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI2RkFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJsYWNrYm9hcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIxOFxcXCI7XFxufVxcbi5nbHlwaGljb24tYmVkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMTlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWFwcGxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEY4RkZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVyYXNlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMjFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhvdXJnbGFzczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyMzFCXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sYW1wOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWR1cGxpY2F0ZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjI0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1waWdneS1iYW5rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNjaXNzb3JzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJpdGNvaW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIyN1xcXCI7XFxufVxcbi5nbHlwaGljb24tYnRjOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMjdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXhidDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjI3XFxcIjtcXG59XFxuLmdseXBoaWNvbi15ZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcQTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWpweTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxBNVxcXCI7XFxufVxcbi5nbHlwaGljb24tcnVibGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcMjBCRFxcXCI7XFxufVxcbi5nbHlwaGljb24tcnViOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIwQkRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNjYWxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMzBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWljZS1sb2xseTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjMxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1pY2UtbG9sbHktdGFzdGVkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMzJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVkdWNhdGlvbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjMzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1vcHRpb24taG9yaXpvbnRhbDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjM0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1vcHRpb24tdmVydGljYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIzNVxcXCI7XFxufVxcbi5nbHlwaGljb24tbWVudS1oYW1idXJnZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTIzNlxcXCI7XFxufVxcbi5nbHlwaGljb24tbW9kYWwtd2luZG93OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyMzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9pbDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjM4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1ncmFpbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjM5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zdW5nbGFzc2VzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNDBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtc2l6ZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjQxXFxcIjtcXG59XFxuLmdseXBoaWNvbi10ZXh0LWNvbG9yOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNDJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtYmFja2dyb3VuZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjQzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1vYmplY3QtYWxpZ24tdG9wOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNDRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi1ib3R0b206YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI0NVxcXCI7XFxufVxcbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLWhvcml6b250YWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI0NlxcXCI7XFxufVxcbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLWxlZnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI0N1xcXCI7XFxufVxcbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLXZlcnRpY2FsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNDhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjQ5XFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmlhbmdsZS1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjUwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmlhbmdsZS1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNTFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjUyXFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmlhbmdsZS10b3A6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI1M1xcXCI7XFxufVxcbi5nbHlwaGljb24tY29uc29sZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjU0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zdXBlcnNjcmlwdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFMjU1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zdWJzY3JpcHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI1NlxcXCI7XFxufVxcbi5nbHlwaGljb24tbWVudS1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNTdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1lbnUtcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI1OFxcXCI7XFxufVxcbi5nbHlwaGljb24tbWVudS1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEUyNTlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1lbnUtdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTI2MFxcXCI7XFxufVxcbioge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuKjpiZWZvcmUsXFxuKjphZnRlciB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5odG1sIHtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG59XFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGNvbG9yOiAjNzc3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZDRkNGQztcXG59XFxuaW5wdXQsXFxuYnV0dG9uLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbn1cXG5hIHtcXG4gIGNvbG9yOiAjRDkyMzBGO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5hOmhvdmVyLFxcbmE6Zm9jdXMge1xcbiAgY29sb3I6ICM5MTE3MGE7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuYTpmb2N1cyB7XFxuICBvdXRsaW5lOiA1cHggYXV0byAtd2Via2l0LWZvY3VzLXJpbmctY29sb3I7XFxuICBvdXRsaW5lLW9mZnNldDogLTJweDtcXG59XFxuZmlndXJlIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuaW1nIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5pbWctcmVzcG9uc2l2ZSxcXG4udGh1bWJuYWlsID4gaW1nLFxcbi50aHVtYm5haWwgYSA+IGltZyxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGltZyxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGEgPiBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5pbWctcm91bmRlZCB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi5pbWctdGh1bWJuYWlsIHtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZDRkNGQztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcXG4gIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcXG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5pbWctY2lyY2xlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuaHIge1xcbiAgbWFyZ2luLXRvcDogMThweDtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuLnNyLW9ubHkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDFweDtcXG4gIGhlaWdodDogMXB4O1xcbiAgbWFyZ2luOiAtMXB4O1xcbiAgcGFkZGluZzogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xcbiAgYm9yZGVyOiAwO1xcbn1cXG4uc3Itb25seS1mb2N1c2FibGU6YWN0aXZlLFxcbi5zci1vbmx5LWZvY3VzYWJsZTpmb2N1cyB7XFxuICBwb3NpdGlvbjogc3RhdGljO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIGNsaXA6IGF1dG87XFxufVxcbltyb2xlPVxcXCJidXR0b25cXFwiXSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbi5oMSxcXG4uaDIsXFxuLmgzLFxcbi5oNCxcXG4uaDUsXFxuLmg2IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMS4xO1xcbiAgY29sb3I6ICM0NDQ7XFxufVxcbmgxIHNtYWxsLFxcbmgyIHNtYWxsLFxcbmgzIHNtYWxsLFxcbmg0IHNtYWxsLFxcbmg1IHNtYWxsLFxcbmg2IHNtYWxsLFxcbi5oMSBzbWFsbCxcXG4uaDIgc21hbGwsXFxuLmgzIHNtYWxsLFxcbi5oNCBzbWFsbCxcXG4uaDUgc21hbGwsXFxuLmg2IHNtYWxsLFxcbmgxIC5zbWFsbCxcXG5oMiAuc21hbGwsXFxuaDMgLnNtYWxsLFxcbmg0IC5zbWFsbCxcXG5oNSAuc21hbGwsXFxuaDYgLnNtYWxsLFxcbi5oMSAuc21hbGwsXFxuLmgyIC5zbWFsbCxcXG4uaDMgLnNtYWxsLFxcbi5oNCAuc21hbGwsXFxuLmg1IC5zbWFsbCxcXG4uaDYgLnNtYWxsIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGNvbG9yOiAjODA4MDgwO1xcbn1cXG5oMSxcXG4uaDEsXFxuaDIsXFxuLmgyLFxcbmgzLFxcbi5oMyB7XFxuICBtYXJnaW4tdG9wOiAxOHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogOXB4O1xcbn1cXG5oMSBzbWFsbCxcXG4uaDEgc21hbGwsXFxuaDIgc21hbGwsXFxuLmgyIHNtYWxsLFxcbmgzIHNtYWxsLFxcbi5oMyBzbWFsbCxcXG5oMSAuc21hbGwsXFxuLmgxIC5zbWFsbCxcXG5oMiAuc21hbGwsXFxuLmgyIC5zbWFsbCxcXG5oMyAuc21hbGwsXFxuLmgzIC5zbWFsbCB7XFxuICBmb250LXNpemU6IDY1JTtcXG59XFxuaDQsXFxuLmg0LFxcbmg1LFxcbi5oNSxcXG5oNixcXG4uaDYge1xcbiAgbWFyZ2luLXRvcDogOXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogOXB4O1xcbn1cXG5oNCBzbWFsbCxcXG4uaDQgc21hbGwsXFxuaDUgc21hbGwsXFxuLmg1IHNtYWxsLFxcbmg2IHNtYWxsLFxcbi5oNiBzbWFsbCxcXG5oNCAuc21hbGwsXFxuLmg0IC5zbWFsbCxcXG5oNSAuc21hbGwsXFxuLmg1IC5zbWFsbCxcXG5oNiAuc21hbGwsXFxuLmg2IC5zbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTtcXG59XFxuaDEsXFxuLmgxIHtcXG4gIGZvbnQtc2l6ZTogMzNweDtcXG59XFxuaDIsXFxuLmgyIHtcXG4gIGZvbnQtc2l6ZTogMjdweDtcXG59XFxuaDMsXFxuLmgzIHtcXG4gIGZvbnQtc2l6ZTogMjNweDtcXG59XFxuaDQsXFxuLmg0IHtcXG4gIGZvbnQtc2l6ZTogMTdweDtcXG59XFxuaDUsXFxuLmg1IHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG59XFxuaDYsXFxuLmg2IHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxucCB7XFxuICBtYXJnaW46IDAgMCA5cHg7XFxufVxcbi5sZWFkIHtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubGVhZCB7XFxuICAgIGZvbnQtc2l6ZTogMTkuNXB4O1xcbiAgfVxcbn1cXG5zbWFsbCxcXG4uc21hbGwge1xcbiAgZm9udC1zaXplOiA5MiU7XFxufVxcbm1hcmssXFxuLm1hcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcXG4gIHBhZGRpbmc6IC4yZW07XFxufVxcbi50ZXh0LWxlZnQge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLnRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi50ZXh0LWp1c3RpZnkge1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG59XFxuLnRleHQtbm93cmFwIHtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbi50ZXh0LWxvd2VyY2FzZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcbn1cXG4udGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuLnRleHQtY2FwaXRhbGl6ZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuLnRleHQtbXV0ZWQge1xcbiAgY29sb3I6ICM4MDgwODA7XFxufVxcbi50ZXh0LXByaW1hcnkge1xcbiAgY29sb3I6ICNEOTIzMEY7XFxufVxcbmEudGV4dC1wcmltYXJ5OmhvdmVyLFxcbmEudGV4dC1wcmltYXJ5OmZvY3VzIHtcXG4gIGNvbG9yOiAjYTkxYjBjO1xcbn1cXG4udGV4dC1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjNDY4ODQ3O1xcbn1cXG5hLnRleHQtc3VjY2Vzczpob3ZlcixcXG5hLnRleHQtc3VjY2Vzczpmb2N1cyB7XFxuICBjb2xvcjogIzM1NjYzNTtcXG59XFxuLnRleHQtaW5mbyB7XFxuICBjb2xvcjogIzNhODdhZDtcXG59XFxuYS50ZXh0LWluZm86aG92ZXIsXFxuYS50ZXh0LWluZm86Zm9jdXMge1xcbiAgY29sb3I6ICMyZDY5ODc7XFxufVxcbi50ZXh0LXdhcm5pbmcge1xcbiAgY29sb3I6ICNjMDk4NTM7XFxufVxcbmEudGV4dC13YXJuaW5nOmhvdmVyLFxcbmEudGV4dC13YXJuaW5nOmZvY3VzIHtcXG4gIGNvbG9yOiAjYTQ3ZTNjO1xcbn1cXG4udGV4dC1kYW5nZXIge1xcbiAgY29sb3I6ICNiOTRhNDg7XFxufVxcbmEudGV4dC1kYW5nZXI6aG92ZXIsXFxuYS50ZXh0LWRhbmdlcjpmb2N1cyB7XFxuICBjb2xvcjogIzk1M2IzOTtcXG59XFxuLmJnLXByaW1hcnkge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG5hLmJnLXByaW1hcnk6aG92ZXIsXFxuYS5iZy1wcmltYXJ5OmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOTFiMGM7XFxufVxcbi5iZy1zdWNjZXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmYwZDg7XFxufVxcbmEuYmctc3VjY2Vzczpob3ZlcixcXG5hLmJnLXN1Y2Nlc3M6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MxZTJiMztcXG59XFxuLmJnLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZWRmNztcXG59XFxuYS5iZy1pbmZvOmhvdmVyLFxcbmEuYmctaW5mbzpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkOWVlO1xcbn1cXG4uYmctd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzO1xcbn1cXG5hLmJnLXdhcm5pbmc6aG92ZXIsXFxuYS5iZy13YXJuaW5nOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2VjYjU7XFxufVxcbi5iZy1kYW5nZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcXG59XFxuYS5iZy1kYW5nZXI6aG92ZXIsXFxuYS5iZy1kYW5nZXI6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0YjliOTtcXG59XFxuLnBhZ2UtaGVhZGVyIHtcXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XFxuICBtYXJnaW46IDM2cHggMCAxOHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XFxufVxcbnVsLFxcbm9sIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiA5cHg7XFxufVxcbnVsIHVsLFxcbm9sIHVsLFxcbnVsIG9sLFxcbm9sIG9sIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5saXN0LXVuc3R5bGVkIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbi5saXN0LWlubGluZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxufVxcbi5saXN0LWlubGluZSA+IGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcbn1cXG5kbCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcXG59XFxuZHQsXFxuZGQge1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxufVxcbmR0IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5kZCB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZGwtaG9yaXpvbnRhbCBkdCB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIGNsZWFyOiBsZWZ0O1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB9XFxuICAuZGwtaG9yaXpvbnRhbCBkZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxODBweDtcXG4gIH1cXG59XFxuYWJiclt0aXRsZV0sXFxuYWJicltkYXRhLW9yaWdpbmFsLXRpdGxlXSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkICM4MDgwODA7XFxufVxcbi5pbml0aWFsaXNtIHtcXG4gIGZvbnQtc2l6ZTogOTAlO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiA5cHggMThweDtcXG4gIG1hcmdpbjogMCAwIDE4cHg7XFxuICBmb250LXNpemU6IDE2LjI1cHg7XFxuICBib3JkZXItbGVmdDogNXB4IHNvbGlkICNkZGQ7XFxufVxcbmJsb2NrcXVvdGUgcDpsYXN0LWNoaWxkLFxcbmJsb2NrcXVvdGUgdWw6bGFzdC1jaGlsZCxcXG5ibG9ja3F1b3RlIG9sOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuYmxvY2txdW90ZSBmb290ZXIsXFxuYmxvY2txdW90ZSBzbWFsbCxcXG5ibG9ja3F1b3RlIC5zbWFsbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogODAlO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBjb2xvcjogIzgwODA4MDtcXG59XFxuYmxvY2txdW90ZSBmb290ZXI6YmVmb3JlLFxcbmJsb2NrcXVvdGUgc21hbGw6YmVmb3JlLFxcbmJsb2NrcXVvdGUgLnNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIwMTQgICBcXFxcQTAnO1xcbn1cXG4uYmxvY2txdW90ZS1yZXZlcnNlLFxcbmJsb2NrcXVvdGUucHVsbC1yaWdodCB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1sZWZ0OiAwO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi5ibG9ja3F1b3RlLXJldmVyc2UgZm9vdGVyOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgZm9vdGVyOmJlZm9yZSxcXG4uYmxvY2txdW90ZS1yZXZlcnNlIHNtYWxsOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgc21hbGw6YmVmb3JlLFxcbi5ibG9ja3F1b3RlLXJldmVyc2UgLnNtYWxsOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgLnNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnJztcXG59XFxuLmJsb2NrcXVvdGUtcmV2ZXJzZSBmb290ZXI6YWZ0ZXIsXFxuYmxvY2txdW90ZS5wdWxsLXJpZ2h0IGZvb3RlcjphZnRlcixcXG4uYmxvY2txdW90ZS1yZXZlcnNlIHNtYWxsOmFmdGVyLFxcbmJsb2NrcXVvdGUucHVsbC1yaWdodCBzbWFsbDphZnRlcixcXG4uYmxvY2txdW90ZS1yZXZlcnNlIC5zbWFsbDphZnRlcixcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgLnNtYWxsOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICdcXFxcQTAgICBcXFxcMjAxNCc7XFxufVxcbmFkZHJlc3Mge1xcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbn1cXG5jb2RlLFxcbmtiZCxcXG5wcmUsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFxcXCJDb3VyaWVyIE5ld1xcXCIsIG1vbm9zcGFjZTtcXG59XFxuY29kZSB7XFxuICBwYWRkaW5nOiAycHggNHB4O1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICBjb2xvcjogI2M3MjU0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWYyZjQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbmtiZCB7XFxuICBwYWRkaW5nOiAycHggNHB4O1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbn1cXG5rYmQga2JkIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcbnByZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDguNXB4O1xcbiAgbWFyZ2luOiAwIDAgOXB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxuICBjb2xvcjogIzQ0NDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5wcmUgY29kZSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1zaXplOiBpbmhlcml0O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5wcmUtc2Nyb2xsYWJsZSB7XFxuICBtYXgtaGVpZ2h0OiAzNDBweDtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA3NTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDk3MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDExNzBweDtcXG4gIH1cXG59XFxuLmNvbnRhaW5lci1mbHVpZCB7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxufVxcbi5yb3cge1xcbiAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG59XFxuLmNvbC14cy0xLCAuY29sLXNtLTEsIC5jb2wtbWQtMSwgLmNvbC1sZy0xLCAuY29sLXhzLTIsIC5jb2wtc20tMiwgLmNvbC1tZC0yLCAuY29sLWxnLTIsIC5jb2wteHMtMywgLmNvbC1zbS0zLCAuY29sLW1kLTMsIC5jb2wtbGctMywgLmNvbC14cy00LCAuY29sLXNtLTQsIC5jb2wtbWQtNCwgLmNvbC1sZy00LCAuY29sLXhzLTUsIC5jb2wtc20tNSwgLmNvbC1tZC01LCAuY29sLWxnLTUsIC5jb2wteHMtNiwgLmNvbC1zbS02LCAuY29sLW1kLTYsIC5jb2wtbGctNiwgLmNvbC14cy03LCAuY29sLXNtLTcsIC5jb2wtbWQtNywgLmNvbC1sZy03LCAuY29sLXhzLTgsIC5jb2wtc20tOCwgLmNvbC1tZC04LCAuY29sLWxnLTgsIC5jb2wteHMtOSwgLmNvbC1zbS05LCAuY29sLW1kLTksIC5jb2wtbGctOSwgLmNvbC14cy0xMCwgLmNvbC1zbS0xMCwgLmNvbC1tZC0xMCwgLmNvbC1sZy0xMCwgLmNvbC14cy0xMSwgLmNvbC1zbS0xMSwgLmNvbC1tZC0xMSwgLmNvbC1sZy0xMSwgLmNvbC14cy0xMiwgLmNvbC1zbS0xMiwgLmNvbC1tZC0xMiwgLmNvbC1sZy0xMiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiAxcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcbn1cXG4uY29sLXhzLTEsIC5jb2wteHMtMiwgLmNvbC14cy0zLCAuY29sLXhzLTQsIC5jb2wteHMtNSwgLmNvbC14cy02LCAuY29sLXhzLTcsIC5jb2wteHMtOCwgLmNvbC14cy05LCAuY29sLXhzLTEwLCAuY29sLXhzLTExLCAuY29sLXhzLTEyIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbn1cXG4uY29sLXhzLTEyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uY29sLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy05IHtcXG4gIHdpZHRoOiA3NSU7XFxufVxcbi5jb2wteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLTcge1xcbiAgd2lkdGg6IDU4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy02IHtcXG4gIHdpZHRoOiA1MCU7XFxufVxcbi5jb2wteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLTQge1xcbiAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy0zIHtcXG4gIHdpZHRoOiAyNSU7XFxufVxcbi5jb2wteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1bGwtMTIge1xcbiAgcmlnaHQ6IDEwMCU7XFxufVxcbi5jb2wteHMtcHVsbC0xMSB7XFxuICByaWdodDogOTEuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1bGwtMTAge1xcbiAgcmlnaHQ6IDgzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdWxsLTkge1xcbiAgcmlnaHQ6IDc1JTtcXG59XFxuLmNvbC14cy1wdWxsLTgge1xcbiAgcmlnaHQ6IDY2LjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy1wdWxsLTcge1xcbiAgcmlnaHQ6IDU4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdWxsLTYge1xcbiAgcmlnaHQ6IDUwJTtcXG59XFxuLmNvbC14cy1wdWxsLTUge1xcbiAgcmlnaHQ6IDQxLjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy1wdWxsLTQge1xcbiAgcmlnaHQ6IDMzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdWxsLTMge1xcbiAgcmlnaHQ6IDI1JTtcXG59XFxuLmNvbC14cy1wdWxsLTIge1xcbiAgcmlnaHQ6IDE2LjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy1wdWxsLTEge1xcbiAgcmlnaHQ6IDguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1bGwtMCB7XFxuICByaWdodDogYXV0bztcXG59XFxuLmNvbC14cy1wdXNoLTEyIHtcXG4gIGxlZnQ6IDEwMCU7XFxufVxcbi5jb2wteHMtcHVzaC0xMSB7XFxuICBsZWZ0OiA5MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtcHVzaC0xMCB7XFxuICBsZWZ0OiA4My4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtcHVzaC05IHtcXG4gIGxlZnQ6IDc1JTtcXG59XFxuLmNvbC14cy1wdXNoLTgge1xcbiAgbGVmdDogNjYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1c2gtNyB7XFxuICBsZWZ0OiA1OC4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtcHVzaC02IHtcXG4gIGxlZnQ6IDUwJTtcXG59XFxuLmNvbC14cy1wdXNoLTUge1xcbiAgbGVmdDogNDEuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1c2gtNCB7XFxuICBsZWZ0OiAzMy4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtcHVzaC0zIHtcXG4gIGxlZnQ6IDI1JTtcXG59XFxuLmNvbC14cy1wdXNoLTIge1xcbiAgbGVmdDogMTYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1c2gtMSB7XFxuICBsZWZ0OiA4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdXNoLTAge1xcbiAgbGVmdDogYXV0bztcXG59XFxuLmNvbC14cy1vZmZzZXQtMTIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTExIHtcXG4gIG1hcmdpbi1sZWZ0OiA5MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTEwIHtcXG4gIG1hcmdpbi1sZWZ0OiA4My4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTkge1xcbiAgbWFyZ2luLWxlZnQ6IDc1JTtcXG59XFxuLmNvbC14cy1vZmZzZXQtOCB7XFxuICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLW9mZnNldC03IHtcXG4gIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTYge1xcbiAgbWFyZ2luLWxlZnQ6IDUwJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtNSB7XFxuICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLW9mZnNldC00IHtcXG4gIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTMge1xcbiAgbWFyZ2luLWxlZnQ6IDI1JTtcXG59XFxuLmNvbC14cy1vZmZzZXQtMiB7XFxuICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLW9mZnNldC0xIHtcXG4gIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtMCB7XFxuICBtYXJnaW4tbGVmdDogMCU7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmNvbC1zbS0xLCAuY29sLXNtLTIsIC5jb2wtc20tMywgLmNvbC1zbS00LCAuY29sLXNtLTUsIC5jb2wtc20tNiwgLmNvbC1zbS03LCAuY29sLXNtLTgsIC5jb2wtc20tOSwgLmNvbC1zbS0xMCwgLmNvbC1zbS0xMSwgLmNvbC1zbS0xMiB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbiAgLmNvbC1zbS0xMiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1zbS0xMSB7XFxuICAgIHdpZHRoOiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLTEwIHtcXG4gICAgd2lkdGg6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tOSB7XFxuICAgIHdpZHRoOiA3NSU7XFxuICB9XFxuICAuY29sLXNtLTgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS03IHtcXG4gICAgd2lkdGg6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tNiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICB9XFxuICAuY29sLXNtLTUge1xcbiAgICB3aWR0aDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS00IHtcXG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tMyB7XFxuICAgIHdpZHRoOiAyNSU7XFxuICB9XFxuICAuY29sLXNtLTIge1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS0xIHtcXG4gICAgd2lkdGg6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAuY29sLXNtLXB1bGwtMTEge1xcbiAgICByaWdodDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTEwIHtcXG4gICAgcmlnaHQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC05IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC04IHtcXG4gICAgcmlnaHQ6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC03IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC02IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC01IHtcXG4gICAgcmlnaHQ6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC00IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC0zIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC0yIHtcXG4gICAgcmlnaHQ6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC0xIHtcXG4gICAgcmlnaHQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTAge1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0xMiB7XFxuICAgIGxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtMTEge1xcbiAgICBsZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtMTAge1xcbiAgICBsZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtOSB7XFxuICAgIGxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC04IHtcXG4gICAgbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTcge1xcbiAgICBsZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtNiB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC01IHtcXG4gICAgbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTQge1xcbiAgICBsZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtMyB7XFxuICAgIGxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0yIHtcXG4gICAgbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTEge1xcbiAgICBsZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0wIHtcXG4gICAgbGVmdDogYXV0bztcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTEyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC0xMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC0xMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC05IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTgge1xcbiAgICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtNyB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC02IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTUge1xcbiAgICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtNCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC0zIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTAge1xcbiAgICBtYXJnaW4tbGVmdDogMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcbiAgLmNvbC1tZC0xLCAuY29sLW1kLTIsIC5jb2wtbWQtMywgLmNvbC1tZC00LCAuY29sLW1kLTUsIC5jb2wtbWQtNiwgLmNvbC1tZC03LCAuY29sLW1kLTgsIC5jb2wtbWQtOSwgLmNvbC1tZC0xMCwgLmNvbC1tZC0xMSwgLmNvbC1tZC0xMiB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbiAgLmNvbC1tZC0xMiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1tZC0xMSB7XFxuICAgIHdpZHRoOiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLTEwIHtcXG4gICAgd2lkdGg6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtOSB7XFxuICAgIHdpZHRoOiA3NSU7XFxuICB9XFxuICAuY29sLW1kLTgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC03IHtcXG4gICAgd2lkdGg6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtNiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICB9XFxuICAuY29sLW1kLTUge1xcbiAgICB3aWR0aDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC00IHtcXG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtMyB7XFxuICAgIHdpZHRoOiAyNSU7XFxuICB9XFxuICAuY29sLW1kLTIge1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC0xIHtcXG4gICAgd2lkdGg6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAuY29sLW1kLXB1bGwtMTEge1xcbiAgICByaWdodDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTEwIHtcXG4gICAgcmlnaHQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC05IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC04IHtcXG4gICAgcmlnaHQ6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC03IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC02IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC01IHtcXG4gICAgcmlnaHQ6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC00IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC0zIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC0yIHtcXG4gICAgcmlnaHQ6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC0xIHtcXG4gICAgcmlnaHQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTAge1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0xMiB7XFxuICAgIGxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtMTEge1xcbiAgICBsZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtMTAge1xcbiAgICBsZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtOSB7XFxuICAgIGxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC04IHtcXG4gICAgbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTcge1xcbiAgICBsZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtNiB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC01IHtcXG4gICAgbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTQge1xcbiAgICBsZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtMyB7XFxuICAgIGxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0yIHtcXG4gICAgbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTEge1xcbiAgICBsZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0wIHtcXG4gICAgbGVmdDogYXV0bztcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTEyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC0xMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC0xMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC05IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTgge1xcbiAgICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtNyB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC02IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTUge1xcbiAgICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtNCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC0zIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTAge1xcbiAgICBtYXJnaW4tbGVmdDogMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gIC5jb2wtbGctMSwgLmNvbC1sZy0yLCAuY29sLWxnLTMsIC5jb2wtbGctNCwgLmNvbC1sZy01LCAuY29sLWxnLTYsIC5jb2wtbGctNywgLmNvbC1sZy04LCAuY29sLWxnLTksIC5jb2wtbGctMTAsIC5jb2wtbGctMTEsIC5jb2wtbGctMTIge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gIH1cXG4gIC5jb2wtbGctMTIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtbGctMTEge1xcbiAgICB3aWR0aDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy0xMCB7XFxuICAgIHdpZHRoOiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLTkge1xcbiAgICB3aWR0aDogNzUlO1xcbiAgfVxcbiAgLmNvbC1sZy04IHtcXG4gICAgd2lkdGg6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctNyB7XFxuICAgIHdpZHRoOiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLTYge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgfVxcbiAgLmNvbC1sZy01IHtcXG4gICAgd2lkdGg6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctNCB7XFxuICAgIHdpZHRoOiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLTMge1xcbiAgICB3aWR0aDogMjUlO1xcbiAgfVxcbiAgLmNvbC1sZy0yIHtcXG4gICAgd2lkdGg6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctMSB7XFxuICAgIHdpZHRoOiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0xMiB7XFxuICAgIHJpZ2h0OiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdWxsLTExIHtcXG4gICAgcmlnaHQ6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0xMCB7XFxuICAgIHJpZ2h0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtOSB7XFxuICAgIHJpZ2h0OiA3NSU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtOCB7XFxuICAgIHJpZ2h0OiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtNyB7XFxuICAgIHJpZ2h0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtNiB7XFxuICAgIHJpZ2h0OiA1MCU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtNSB7XFxuICAgIHJpZ2h0OiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtNCB7XFxuICAgIHJpZ2h0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtMyB7XFxuICAgIHJpZ2h0OiAyNSU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtMiB7XFxuICAgIHJpZ2h0OiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtMSB7XFxuICAgIHJpZ2h0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0wIHtcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMTIge1xcbiAgICBsZWZ0OiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTExIHtcXG4gICAgbGVmdDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTEwIHtcXG4gICAgbGVmdDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTkge1xcbiAgICBsZWZ0OiA3NSU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtOCB7XFxuICAgIGxlZnQ6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC03IHtcXG4gICAgbGVmdDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTYge1xcbiAgICBsZWZ0OiA1MCU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtNSB7XFxuICAgIGxlZnQ6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC00IHtcXG4gICAgbGVmdDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTMge1xcbiAgICBsZWZ0OiAyNSU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMiB7XFxuICAgIGxlZnQ6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC0xIHtcXG4gICAgbGVmdDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMCB7XFxuICAgIGxlZnQ6IGF1dG87XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0xMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtMTEge1xcbiAgICBtYXJnaW4tbGVmdDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtMTAge1xcbiAgICBtYXJnaW4tbGVmdDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtOSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA3NSU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC04IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTcge1xcbiAgICBtYXJnaW4tbGVmdDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtNiB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1MCU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC01IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTQge1xcbiAgICBtYXJnaW4tbGVmdDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtMyB7XFxuICAgIG1hcmdpbi1sZWZ0OiAyNSU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0yIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTEge1xcbiAgICBtYXJnaW4tbGVmdDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0wIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDAlO1xcbiAgfVxcbn1cXG50YWJsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuY2FwdGlvbiB7XFxuICBwYWRkaW5nLXRvcDogOHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDhweDtcXG4gIGNvbG9yOiAjODA4MDgwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxudGgge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLnRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcXG59XFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0aCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGgsXFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGQge1xcbiAgcGFkZGluZzogOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0aCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZGQ7XFxufVxcbi50YWJsZSA+IGNhcHRpb24gKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsXFxuLnRhYmxlID4gY29sZ3JvdXAgKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsXFxuLnRhYmxlID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLFxcbi50YWJsZSA+IGNhcHRpb24gKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnRhYmxlID4gY29sZ3JvdXAgKyB0aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnRhYmxlID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCA+IHRkIHtcXG4gIGJvcmRlci10b3A6IDA7XFxufVxcbi50YWJsZSA+IHRib2R5ICsgdGJvZHkge1xcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNkZGQ7XFxufVxcbi50YWJsZSAudGFibGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZDRkNGQztcXG59XFxuLnRhYmxlLWNvbmRlbnNlZCA+IHRoZWFkID4gdHIgPiB0aCxcXG4udGFibGUtY29uZGVuc2VkID4gdGJvZHkgPiB0ciA+IHRoLFxcbi50YWJsZS1jb25kZW5zZWQgPiB0Zm9vdCA+IHRyID4gdGgsXFxuLnRhYmxlLWNvbmRlbnNlZCA+IHRoZWFkID4gdHIgPiB0ZCxcXG4udGFibGUtY29uZGVuc2VkID4gdGJvZHkgPiB0ciA+IHRkLFxcbi50YWJsZS1jb25kZW5zZWQgPiB0Zm9vdCA+IHRyID4gdGQge1xcbiAgcGFkZGluZzogNXB4O1xcbn1cXG4udGFibGUtYm9yZGVyZWQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG59XFxuLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoLFxcbi50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0aCxcXG4udGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGgsXFxuLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkLFxcbi50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0ZCxcXG4udGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG59XFxuLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoLFxcbi50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZCB7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XFxufVxcbi50YWJsZS1zdHJpcGVkID4gdGJvZHkgPiB0cjpudGgtb2YtdHlwZShvZGQpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XFxufVxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHI6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG59XFxudGFibGUgY29sW2NsYXNzKj1cXFwiY29sLVxcXCJdIHtcXG4gIHBvc2l0aW9uOiBzdGF0aWM7XFxuICBmbG9hdDogbm9uZTtcXG4gIGRpc3BsYXk6IHRhYmxlLWNvbHVtbjtcXG59XFxudGFibGUgdGRbY2xhc3MqPVxcXCJjb2wtXFxcIl0sXFxudGFibGUgdGhbY2xhc3MqPVxcXCJjb2wtXFxcIl0ge1xcbiAgcG9zaXRpb246IHN0YXRpYztcXG4gIGZsb2F0OiBub25lO1xcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcXG59XFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLmFjdGl2ZSxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGQuYWN0aXZlLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0ZC5hY3RpdmUsXFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLmFjdGl2ZSxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGguYWN0aXZlLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0aC5hY3RpdmUsXFxuLnRhYmxlID4gdGhlYWQgPiB0ci5hY3RpdmUgPiB0ZCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLmFjdGl2ZSA+IHRkLFxcbi50YWJsZSA+IHRmb290ID4gdHIuYWN0aXZlID4gdGQsXFxuLnRhYmxlID4gdGhlYWQgPiB0ci5hY3RpdmUgPiB0aCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLmFjdGl2ZSA+IHRoLFxcbi50YWJsZSA+IHRmb290ID4gdHIuYWN0aXZlID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG59XFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRkLmFjdGl2ZTpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGguYWN0aXZlOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIuYWN0aXZlOmhvdmVyID4gdGQsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0cjpob3ZlciA+IC5hY3RpdmUsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5hY3RpdmU6aG92ZXIgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4O1xcbn1cXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGQuc3VjY2VzcyxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGQuc3VjY2VzcyxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGQuc3VjY2VzcyxcXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGguc3VjY2VzcyxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGguc3VjY2VzcyxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGguc3VjY2VzcyxcXG4udGFibGUgPiB0aGVhZCA+IHRyLnN1Y2Nlc3MgPiB0ZCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLnN1Y2Nlc3MgPiB0ZCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLnN1Y2Nlc3MgPiB0ZCxcXG4udGFibGUgPiB0aGVhZCA+IHRyLnN1Y2Nlc3MgPiB0aCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLnN1Y2Nlc3MgPiB0aCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLnN1Y2Nlc3MgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xcbn1cXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGQuc3VjY2Vzczpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGguc3VjY2Vzczpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLnN1Y2Nlc3M6aG92ZXIgPiB0ZCxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyOmhvdmVyID4gLnN1Y2Nlc3MsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5zdWNjZXNzOmhvdmVyID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QwZTljNjtcXG59XFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLmluZm8sXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLmluZm8sXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkLmluZm8sXFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLmluZm8sXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLmluZm8sXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLmluZm8sXFxuLnRhYmxlID4gdGhlYWQgPiB0ci5pbmZvID4gdGQsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci5pbmZvID4gdGQsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5pbmZvID4gdGQsXFxuLnRhYmxlID4gdGhlYWQgPiB0ci5pbmZvID4gdGgsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci5pbmZvID4gdGgsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5pbmZvID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZWRmNztcXG59XFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRkLmluZm86aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRoLmluZm86aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5pbmZvOmhvdmVyID4gdGQsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0cjpob3ZlciA+IC5pbmZvLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIuaW5mbzpob3ZlciA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjNGUzZjM7XFxufVxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZC53YXJuaW5nLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC53YXJuaW5nLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0ZC53YXJuaW5nLFxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0aC53YXJuaW5nLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0aC53YXJuaW5nLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0aC53YXJuaW5nLFxcbi50YWJsZSA+IHRoZWFkID4gdHIud2FybmluZyA+IHRkLFxcbi50YWJsZSA+IHRib2R5ID4gdHIud2FybmluZyA+IHRkLFxcbi50YWJsZSA+IHRmb290ID4gdHIud2FybmluZyA+IHRkLFxcbi50YWJsZSA+IHRoZWFkID4gdHIud2FybmluZyA+IHRoLFxcbi50YWJsZSA+IHRib2R5ID4gdHIud2FybmluZyA+IHRoLFxcbi50YWJsZSA+IHRmb290ID4gdHIud2FybmluZyA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmY2Y4ZTM7XFxufVxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0ZC53YXJuaW5nOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0aC53YXJuaW5nOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIud2FybmluZzpob3ZlciA+IHRkLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHI6aG92ZXIgPiAud2FybmluZyxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLndhcm5pbmc6aG92ZXIgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmMmNjO1xcbn1cXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGQuZGFuZ2VyLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5kYW5nZXIsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkLmRhbmdlcixcXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGguZGFuZ2VyLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0aC5kYW5nZXIsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLmRhbmdlcixcXG4udGFibGUgPiB0aGVhZCA+IHRyLmRhbmdlciA+IHRkLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuZGFuZ2VyID4gdGQsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5kYW5nZXIgPiB0ZCxcXG4udGFibGUgPiB0aGVhZCA+IHRyLmRhbmdlciA+IHRoLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuZGFuZ2VyID4gdGgsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5kYW5nZXIgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlO1xcbn1cXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGQuZGFuZ2VyOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0aC5kYW5nZXI6aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5kYW5nZXI6aG92ZXIgPiB0ZCxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyOmhvdmVyID4gLmRhbmdlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLmRhbmdlcjpob3ZlciA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlYmNjY2M7XFxufVxcbi50YWJsZS1yZXNwb25zaXZlIHtcXG4gIG92ZXJmbG93LXg6IGF1dG87XFxuICBtaW4taGVpZ2h0OiAwLjAxJTtcXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gIC50YWJsZS1yZXNwb25zaXZlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi1ib3R0b206IDEzLjVweDtcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgICAtbXMtb3ZlcmZsb3ctc3R5bGU6IC1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUgPiB0Ym9keSA+IHRyID4gdGgsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZSA+IHRmb290ID4gdHIgPiB0aCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUgPiB0Ym9keSA+IHRyID4gdGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZSA+IHRmb290ID4gdHIgPiB0ZCB7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB9XFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCB7XFxuICAgIGJvcmRlcjogMDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkOmZpcnN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1sZWZ0OiAwO1xcbiAgfVxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQ6bGFzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZDpsYXN0LWNoaWxkIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xcbiAgfVxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0cjpsYXN0LWNoaWxkID4gdGgsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyOmxhc3QtY2hpbGQgPiB0ZCB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7XFxuICB9XFxufVxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IDA7XFxuICBtaW4td2lkdGg6IDA7XFxufVxcbmxlZ2VuZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBmb250LXNpemU6IDE5LjVweDtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgY29sb3I6ICM3Nzc7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U1ZTVlNTtcXG59XFxubGFiZWwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBtYXJnaW46IDRweCAwIDA7XFxuICBtYXJnaW4tdG9wOiAxcHggXFxcXDk7XFxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbmlucHV0W3R5cGU9XFxcInJhbmdlXFxcIl0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuc2VsZWN0W211bHRpcGxlXSxcXG5zZWxlY3Rbc2l6ZV0ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl06Zm9jdXMsXFxuaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpmb2N1cyxcXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmZvY3VzIHtcXG4gIG91dGxpbmU6IDVweCBhdXRvIC13ZWJraXQtZm9jdXMtcmluZy1jb2xvcjtcXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbn1cXG5vdXRwdXQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLXRvcDogOXB4O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBjb2xvcjogIzc3NztcXG59XFxuLmZvcm0tY29udHJvbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzNnB4O1xcbiAgcGFkZGluZzogOHB4IDEycHg7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGNvbG9yOiAjNzc3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgLjE1cztcXG4gIC1tb3otdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgLjE1cztcXG4gIC1tcy10cmFuc2l0aW9uOiBib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAuMTVzO1xcbiAgLW8tdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIGVhc2UtaW4tb3V0IC4xNXMsIGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgLjE1cztcXG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXM7XFxufVxcbi5mb3JtLWNvbnRyb2w6Zm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiAjNjZhZmU5O1xcbiAgb3V0bGluZTogMDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksIDAgMCA4cHggcmdiYSgxMDIsIDE3NSwgMjMzLCAwLjYpO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KSwgMCAwIDhweCByZ2JhKDEwMiwgMTc1LCAyMzMsIDAuNik7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KSwgMCAwIDhweCByZ2JhKDEwMiwgMTc1LCAyMzMsIDAuNik7XFxufVxcbi5mb3JtLWNvbnRyb2w6Oi1tb3otcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNkZGQ7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG4uZm9ybS1jb250cm9sOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2RkZDtcXG59XFxuLmZvcm0tY29udHJvbDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2RkZDtcXG59XFxuLmZvcm0tY29udHJvbDo6LW1zLWV4cGFuZCB7XFxuICBib3JkZXI6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLmZvcm0tY29udHJvbFtkaXNhYmxlZF0sXFxuLmZvcm0tY29udHJvbFtyZWFkb25seV0sXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5mb3JtLWNvbnRyb2wge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG4gIG9wYWNpdHk6IDE7XFxufVxcbi5mb3JtLWNvbnRyb2xbZGlzYWJsZWRdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuZm9ybS1jb250cm9sIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbnRleHRhcmVhLmZvcm0tY29udHJvbCB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMCkge1xcbiAgaW5wdXRbdHlwZT1cXFwiZGF0ZVxcXCJdLmZvcm0tY29udHJvbCxcXG4gIGlucHV0W3R5cGU9XFxcInRpbWVcXFwiXS5mb3JtLWNvbnRyb2wsXFxuICBpbnB1dFt0eXBlPVxcXCJkYXRldGltZS1sb2NhbFxcXCJdLmZvcm0tY29udHJvbCxcXG4gIGlucHV0W3R5cGU9XFxcIm1vbnRoXFxcIl0uZm9ybS1jb250cm9sIHtcXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XFxuICB9XFxuICBpbnB1dFt0eXBlPVxcXCJkYXRlXFxcIl0uaW5wdXQtc20sXFxuICBpbnB1dFt0eXBlPVxcXCJ0aW1lXFxcIl0uaW5wdXQtc20sXFxuICBpbnB1dFt0eXBlPVxcXCJkYXRldGltZS1sb2NhbFxcXCJdLmlucHV0LXNtLFxcbiAgaW5wdXRbdHlwZT1cXFwibW9udGhcXFwiXS5pbnB1dC1zbSxcXG4gIC5pbnB1dC1ncm91cC1zbSBpbnB1dFt0eXBlPVxcXCJkYXRlXFxcIl0sXFxuICAuaW5wdXQtZ3JvdXAtc20gaW5wdXRbdHlwZT1cXFwidGltZVxcXCJdLFxcbiAgLmlucHV0LWdyb3VwLXNtIGlucHV0W3R5cGU9XFxcImRhdGV0aW1lLWxvY2FsXFxcIl0sXFxuICAuaW5wdXQtZ3JvdXAtc20gaW5wdXRbdHlwZT1cXFwibW9udGhcXFwiXSB7XFxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgfVxcbiAgaW5wdXRbdHlwZT1cXFwiZGF0ZVxcXCJdLmlucHV0LWxnLFxcbiAgaW5wdXRbdHlwZT1cXFwidGltZVxcXCJdLmlucHV0LWxnLFxcbiAgaW5wdXRbdHlwZT1cXFwiZGF0ZXRpbWUtbG9jYWxcXFwiXS5pbnB1dC1sZyxcXG4gIGlucHV0W3R5cGU9XFxcIm1vbnRoXFxcIl0uaW5wdXQtbGcsXFxuICAuaW5wdXQtZ3JvdXAtbGcgaW5wdXRbdHlwZT1cXFwiZGF0ZVxcXCJdLFxcbiAgLmlucHV0LWdyb3VwLWxnIGlucHV0W3R5cGU9XFxcInRpbWVcXFwiXSxcXG4gIC5pbnB1dC1ncm91cC1sZyBpbnB1dFt0eXBlPVxcXCJkYXRldGltZS1sb2NhbFxcXCJdLFxcbiAgLmlucHV0LWdyb3VwLWxnIGlucHV0W3R5cGU9XFxcIm1vbnRoXFxcIl0ge1xcbiAgICBsaW5lLWhlaWdodDogNTNweDtcXG4gIH1cXG59XFxuLmZvcm0tZ3JvdXAge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuLnJhZGlvLFxcbi5jaGVja2JveCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG4ucmFkaW8gbGFiZWwsXFxuLmNoZWNrYm94IGxhYmVsIHtcXG4gIG1pbi1oZWlnaHQ6IDE4cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnJhZGlvIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuLnJhZGlvLWlubGluZSBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbi5jaGVja2JveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcbi5jaGVja2JveC1pbmxpbmUgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBtYXJnaW4tbGVmdDogLTIwcHg7XFxuICBtYXJnaW4tdG9wOiA0cHggXFxcXDk7XFxufVxcbi5yYWRpbyArIC5yYWRpbyxcXG4uY2hlY2tib3ggKyAuY2hlY2tib3gge1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG59XFxuLnJhZGlvLWlubGluZSxcXG4uY2hlY2tib3gtaW5saW5lIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnJhZGlvLWlubGluZSArIC5yYWRpby1pbmxpbmUsXFxuLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdW2Rpc2FibGVkXSxcXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdW2Rpc2FibGVkXSxcXG5pbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLmRpc2FibGVkLFxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0uZGlzYWJsZWQsXFxuZmllbGRzZXRbZGlzYWJsZWRdIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuZmllbGRzZXRbZGlzYWJsZWRdIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLnJhZGlvLWlubGluZS5kaXNhYmxlZCxcXG4uY2hlY2tib3gtaW5saW5lLmRpc2FibGVkLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAucmFkaW8taW5saW5lLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuY2hlY2tib3gtaW5saW5lIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbi5yYWRpby5kaXNhYmxlZCBsYWJlbCxcXG4uY2hlY2tib3guZGlzYWJsZWQgbGFiZWwsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5yYWRpbyBsYWJlbCxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmNoZWNrYm94IGxhYmVsIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbi5mb3JtLWNvbnRyb2wtc3RhdGljIHtcXG4gIHBhZGRpbmctdG9wOiA5cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIG1pbi1oZWlnaHQ6IDMxcHg7XFxufVxcbi5mb3JtLWNvbnRyb2wtc3RhdGljLmlucHV0LWxnLFxcbi5mb3JtLWNvbnRyb2wtc3RhdGljLmlucHV0LXNtIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxufVxcbi5pbnB1dC1zbSB7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbnNlbGVjdC5pbnB1dC1zbSB7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG59XFxudGV4dGFyZWEuaW5wdXQtc20sXFxuc2VsZWN0W211bHRpcGxlXS5pbnB1dC1zbSB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5mb3JtLWdyb3VwLXNtIC5mb3JtLWNvbnRyb2wge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uZm9ybS1ncm91cC1zbSBzZWxlY3QuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogMzBweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbn1cXG4uZm9ybS1ncm91cC1zbSB0ZXh0YXJlYS5mb3JtLWNvbnRyb2wsXFxuLmZvcm0tZ3JvdXAtc20gc2VsZWN0W211bHRpcGxlXS5mb3JtLWNvbnRyb2wge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uZm9ybS1ncm91cC1zbSAuZm9ybS1jb250cm9sLXN0YXRpYyB7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBtaW4taGVpZ2h0OiAzMHB4O1xcbiAgcGFkZGluZzogNnB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG4uaW5wdXQtbGcge1xcbiAgaGVpZ2h0OiA1M3B4O1xcbiAgcGFkZGluZzogMTRweCAxNnB4O1xcbiAgZm9udC1zaXplOiAxN3B4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMzMzMzMzMztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuc2VsZWN0LmlucHV0LWxnIHtcXG4gIGhlaWdodDogNTNweDtcXG4gIGxpbmUtaGVpZ2h0OiA1M3B4O1xcbn1cXG50ZXh0YXJlYS5pbnB1dC1sZyxcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWxnIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmZvcm0tZ3JvdXAtbGcgLmZvcm0tY29udHJvbCB7XFxuICBoZWlnaHQ6IDUzcHg7XFxuICBwYWRkaW5nOiAxNHB4IDE2cHg7XFxuICBmb250LXNpemU6IDE3cHg7XFxuICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG4uZm9ybS1ncm91cC1sZyBzZWxlY3QuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogNTNweDtcXG4gIGxpbmUtaGVpZ2h0OiA1M3B4O1xcbn1cXG4uZm9ybS1ncm91cC1sZyB0ZXh0YXJlYS5mb3JtLWNvbnRyb2wsXFxuLmZvcm0tZ3JvdXAtbGcgc2VsZWN0W211bHRpcGxlXS5mb3JtLWNvbnRyb2wge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uZm9ybS1ncm91cC1sZyAuZm9ybS1jb250cm9sLXN0YXRpYyB7XFxuICBoZWlnaHQ6IDUzcHg7XFxuICBtaW4taGVpZ2h0OiAzNXB4O1xcbiAgcGFkZGluZzogMTVweCAxNnB4O1xcbiAgZm9udC1zaXplOiAxN3B4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMzMzMzMzMztcXG59XFxuLmhhcy1mZWVkYmFjayB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5oYXMtZmVlZGJhY2sgLmZvcm0tY29udHJvbCB7XFxuICBwYWRkaW5nLXJpZ2h0OiA0NXB4O1xcbn1cXG4uZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgei1pbmRleDogMjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDM2cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogMzZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uaW5wdXQtbGcgKyAuZm9ybS1jb250cm9sLWZlZWRiYWNrLFxcbi5pbnB1dC1ncm91cC1sZyArIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2ssXFxuLmZvcm0tZ3JvdXAtbGcgLmZvcm0tY29udHJvbCArIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgd2lkdGg6IDUzcHg7XFxuICBoZWlnaHQ6IDUzcHg7XFxuICBsaW5lLWhlaWdodDogNTNweDtcXG59XFxuLmlucHV0LXNtICsgLmZvcm0tY29udHJvbC1mZWVkYmFjayxcXG4uaW5wdXQtZ3JvdXAtc20gKyAuZm9ybS1jb250cm9sLWZlZWRiYWNrLFxcbi5mb3JtLWdyb3VwLXNtIC5mb3JtLWNvbnRyb2wgKyAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcbi5oYXMtc3VjY2VzcyAuaGVscC1ibG9jayxcXG4uaGFzLXN1Y2Nlc3MgLmNvbnRyb2wtbGFiZWwsXFxuLmhhcy1zdWNjZXNzIC5yYWRpbyxcXG4uaGFzLXN1Y2Nlc3MgLmNoZWNrYm94LFxcbi5oYXMtc3VjY2VzcyAucmFkaW8taW5saW5lLFxcbi5oYXMtc3VjY2VzcyAuY2hlY2tib3gtaW5saW5lLFxcbi5oYXMtc3VjY2Vzcy5yYWRpbyBsYWJlbCxcXG4uaGFzLXN1Y2Nlc3MuY2hlY2tib3ggbGFiZWwsXFxuLmhhcy1zdWNjZXNzLnJhZGlvLWlubGluZSBsYWJlbCxcXG4uaGFzLXN1Y2Nlc3MuY2hlY2tib3gtaW5saW5lIGxhYmVsIHtcXG4gIGNvbG9yOiAjNDY4ODQ3O1xcbn1cXG4uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbCB7XFxuICBib3JkZXItY29sb3I6ICM0Njg4NDc7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KTtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbn1cXG4uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICMzNTY2MzU7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjN2FiYTdiO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCA2cHggIzdhYmE3YjtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjN2FiYTdiO1xcbn1cXG4uaGFzLXN1Y2Nlc3MgLmlucHV0LWdyb3VwLWFkZG9uIHtcXG4gIGNvbG9yOiAjNDY4ODQ3O1xcbiAgYm9yZGVyLWNvbG9yOiAjNDY4ODQ3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RmZjBkODtcXG59XFxuLmhhcy1zdWNjZXNzIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgY29sb3I6ICM0Njg4NDc7XFxufVxcbi5oYXMtd2FybmluZyAuaGVscC1ibG9jayxcXG4uaGFzLXdhcm5pbmcgLmNvbnRyb2wtbGFiZWwsXFxuLmhhcy13YXJuaW5nIC5yYWRpbyxcXG4uaGFzLXdhcm5pbmcgLmNoZWNrYm94LFxcbi5oYXMtd2FybmluZyAucmFkaW8taW5saW5lLFxcbi5oYXMtd2FybmluZyAuY2hlY2tib3gtaW5saW5lLFxcbi5oYXMtd2FybmluZy5yYWRpbyBsYWJlbCxcXG4uaGFzLXdhcm5pbmcuY2hlY2tib3ggbGFiZWwsXFxuLmhhcy13YXJuaW5nLnJhZGlvLWlubGluZSBsYWJlbCxcXG4uaGFzLXdhcm5pbmcuY2hlY2tib3gtaW5saW5lIGxhYmVsIHtcXG4gIGNvbG9yOiAjYzA5ODUzO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbCB7XFxuICBib3JkZXItY29sb3I6ICNjMDk4NTM7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KTtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICNhNDdlM2M7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjZGJjNTllO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCA2cHggI2RiYzU5ZTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjZGJjNTllO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmlucHV0LWdyb3VwLWFkZG9uIHtcXG4gIGNvbG9yOiAjYzA5ODUzO1xcbiAgYm9yZGVyLWNvbG9yOiAjYzA5ODUzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcXG59XFxuLmhhcy13YXJuaW5nIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgY29sb3I6ICNjMDk4NTM7XFxufVxcbi5oYXMtZXJyb3IgLmhlbHAtYmxvY2ssXFxuLmhhcy1lcnJvciAuY29udHJvbC1sYWJlbCxcXG4uaGFzLWVycm9yIC5yYWRpbyxcXG4uaGFzLWVycm9yIC5jaGVja2JveCxcXG4uaGFzLWVycm9yIC5yYWRpby1pbmxpbmUsXFxuLmhhcy1lcnJvciAuY2hlY2tib3gtaW5saW5lLFxcbi5oYXMtZXJyb3IucmFkaW8gbGFiZWwsXFxuLmhhcy1lcnJvci5jaGVja2JveCBsYWJlbCxcXG4uaGFzLWVycm9yLnJhZGlvLWlubGluZSBsYWJlbCxcXG4uaGFzLWVycm9yLmNoZWNrYm94LWlubGluZSBsYWJlbCB7XFxuICBjb2xvcjogI2I5NGE0ODtcXG59XFxuLmhhcy1lcnJvciAuZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1jb2xvcjogI2I5NGE0ODtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxufVxcbi5oYXMtZXJyb3IgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICM5NTNiMzk7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjZDU5MzkyO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCA2cHggI2Q1OTM5MjtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjZDU5MzkyO1xcbn1cXG4uaGFzLWVycm9yIC5pbnB1dC1ncm91cC1hZGRvbiB7XFxuICBjb2xvcjogI2I5NGE0ODtcXG4gIGJvcmRlci1jb2xvcjogI2I5NGE0ODtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmRlZGU7XFxufVxcbi5oYXMtZXJyb3IgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICBjb2xvcjogI2I5NGE0ODtcXG59XFxuLmhhcy1mZWVkYmFjayBsYWJlbCB+IC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgdG9wOiAyM3B4O1xcbn1cXG4uaGFzLWZlZWRiYWNrIGxhYmVsLnNyLW9ubHkgfiAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHRvcDogMDtcXG59XFxuLmhlbHAtYmxvY2sge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgY29sb3I6ICNiN2I3Yjc7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmZvcm0taW5saW5lIC5mb3JtLWdyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5mb3JtLWNvbnRyb2wge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5mb3JtLWNvbnRyb2wtc3RhdGljIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5pbnB1dC1ncm91cCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5mb3JtLWlubGluZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFkZG9uLFxcbiAgLmZvcm0taW5saW5lIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYnRuLFxcbiAgLmZvcm0taW5saW5lIC5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmlucHV0LWdyb3VwID4gLmZvcm0tY29udHJvbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5jb250cm9sLWxhYmVsIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5mb3JtLWlubGluZSAucmFkaW8sXFxuICAuZm9ybS1pbmxpbmUgLmNoZWNrYm94IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5yYWRpbyBsYWJlbCxcXG4gIC5mb3JtLWlubGluZSAuY2hlY2tib3ggbGFiZWwge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLnJhZGlvIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuICAuZm9ybS1pbmxpbmUgLmNoZWNrYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5oYXMtZmVlZGJhY2sgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICAgIHRvcDogMDtcXG4gIH1cXG59XFxuLmZvcm0taG9yaXpvbnRhbCAucmFkaW8sXFxuLmZvcm0taG9yaXpvbnRhbCAuY2hlY2tib3gsXFxuLmZvcm0taG9yaXpvbnRhbCAucmFkaW8taW5saW5lLFxcbi5mb3JtLWhvcml6b250YWwgLmNoZWNrYm94LWlubGluZSB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIHBhZGRpbmctdG9wOiA5cHg7XFxufVxcbi5mb3JtLWhvcml6b250YWwgLnJhZGlvLFxcbi5mb3JtLWhvcml6b250YWwgLmNoZWNrYm94IHtcXG4gIG1pbi1oZWlnaHQ6IDI3cHg7XFxufVxcbi5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXAge1xcbiAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZm9ybS1ob3Jpem9udGFsIC5jb250cm9sLWxhYmVsIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIHBhZGRpbmctdG9wOiA5cHg7XFxuICB9XFxufVxcbi5mb3JtLWhvcml6b250YWwgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHJpZ2h0OiAxNXB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXAtbGcgLmNvbnRyb2wtbGFiZWwge1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gICAgZm9udC1zaXplOiAxN3B4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXAtc20gLmNvbnRyb2wtbGFiZWwge1xcbiAgICBwYWRkaW5nLXRvcDogNnB4O1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICB9XFxufVxcbi5idG4ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgcGFkZGluZzogOHB4IDEycHg7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5idG46Zm9jdXMsXFxuLmJ0bjphY3RpdmU6Zm9jdXMsXFxuLmJ0bi5hY3RpdmU6Zm9jdXMsXFxuLmJ0bi5mb2N1cyxcXG4uYnRuOmFjdGl2ZS5mb2N1cyxcXG4uYnRuLmFjdGl2ZS5mb2N1cyB7XFxuICBvdXRsaW5lOiA1cHggYXV0byAtd2Via2l0LWZvY3VzLXJpbmctY29sb3I7XFxuICBvdXRsaW5lLW9mZnNldDogLTJweDtcXG59XFxuLmJ0bjpob3ZlcixcXG4uYnRuOmZvY3VzLFxcbi5idG4uZm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcbi5idG46YWN0aXZlLFxcbi5idG4uYWN0aXZlIHtcXG4gIG91dGxpbmU6IDA7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyNSk7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG59XFxuLmJ0bi5kaXNhYmxlZCxcXG4uYnRuW2Rpc2FibGVkXSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0biB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTY1KTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTY1KTtcXG4gIG9wYWNpdHk6IDAuNjU7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5hLmJ0bi5kaXNhYmxlZCxcXG5maWVsZHNldFtkaXNhYmxlZF0gYS5idG4ge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5idG4tZGVmYXVsdCB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NzQ5NDk7XFxuICBib3JkZXItY29sb3I6ICM0NzQ5NDk7XFxufVxcbi5idG4tZGVmYXVsdDpmb2N1cyxcXG4uYnRuLWRlZmF1bHQuZm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmUyZjJmO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDgwODA4O1xcbn1cXG4uYnRuLWRlZmF1bHQ6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmUyZjJmO1xcbiAgYm9yZGVyLWNvbG9yOiAjMjkyYTJhO1xcbn1cXG4uYnRuLWRlZmF1bHQ6YWN0aXZlLFxcbi5idG4tZGVmYXVsdC5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kZWZhdWx0IHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJlMmYyZjtcXG4gIGJvcmRlci1jb2xvcjogIzI5MmEyYTtcXG59XFxuLmJ0bi1kZWZhdWx0OmFjdGl2ZTpob3ZlcixcXG4uYnRuLWRlZmF1bHQuYWN0aXZlOmhvdmVyLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tZGVmYXVsdDpob3ZlcixcXG4uYnRuLWRlZmF1bHQ6YWN0aXZlOmZvY3VzLFxcbi5idG4tZGVmYXVsdC5hY3RpdmU6Zm9jdXMsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kZWZhdWx0OmZvY3VzLFxcbi5idG4tZGVmYXVsdDphY3RpdmUuZm9jdXMsXFxuLmJ0bi1kZWZhdWx0LmFjdGl2ZS5mb2N1cyxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRlZmF1bHQuZm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWMxZDFkO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDgwODA4O1xcbn1cXG4uYnRuLWRlZmF1bHQ6YWN0aXZlLFxcbi5idG4tZGVmYXVsdC5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxufVxcbi5idG4tZGVmYXVsdC5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLWRlZmF1bHRbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQ6aG92ZXIsXFxuLmJ0bi1kZWZhdWx0LmRpc2FibGVkOmZvY3VzLFxcbi5idG4tZGVmYXVsdFtkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGVmYXVsdDpmb2N1cyxcXG4uYnRuLWRlZmF1bHQuZGlzYWJsZWQuZm9jdXMsXFxuLmJ0bi1kZWZhdWx0W2Rpc2FibGVkXS5mb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kZWZhdWx0LmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NzQ5NDk7XFxuICBib3JkZXItY29sb3I6ICM0NzQ5NDk7XFxufVxcbi5idG4tZGVmYXVsdCAuYmFkZ2Uge1xcbiAgY29sb3I6ICM0NzQ5NDk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4uYnRuLXByaW1hcnkge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4uYnRuLXByaW1hcnk6Zm9jdXMsXFxuLmJ0bi1wcmltYXJ5LmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E5MWIwYztcXG4gIGJvcmRlci1jb2xvcjogIzYyMTAwNztcXG59XFxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E5MWIwYztcXG4gIGJvcmRlci1jb2xvcjogI2EwMWEwYjtcXG59XFxuLmJ0bi1wcmltYXJ5OmFjdGl2ZSxcXG4uYnRuLXByaW1hcnkuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tcHJpbWFyeSB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOTFiMGM7XFxuICBib3JkZXItY29sb3I6ICNhMDFhMGI7XFxufVxcbi5idG4tcHJpbWFyeTphY3RpdmU6aG92ZXIsXFxuLmJ0bi1wcmltYXJ5LmFjdGl2ZTpob3ZlcixcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXByaW1hcnk6aG92ZXIsXFxuLmJ0bi1wcmltYXJ5OmFjdGl2ZTpmb2N1cyxcXG4uYnRuLXByaW1hcnkuYWN0aXZlOmZvY3VzLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tcHJpbWFyeTpmb2N1cyxcXG4uYnRuLXByaW1hcnk6YWN0aXZlLmZvY3VzLFxcbi5idG4tcHJpbWFyeS5hY3RpdmUuZm9jdXMsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1wcmltYXJ5LmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg4MTYwOTtcXG4gIGJvcmRlci1jb2xvcjogIzYyMTAwNztcXG59XFxuLmJ0bi1wcmltYXJ5OmFjdGl2ZSxcXG4uYnRuLXByaW1hcnkuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tcHJpbWFyeSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLXByaW1hcnkuZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXTpob3ZlcixcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1wcmltYXJ5OmhvdmVyLFxcbi5idG4tcHJpbWFyeS5kaXNhYmxlZDpmb2N1cyxcXG4uYnRuLXByaW1hcnlbZGlzYWJsZWRdOmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXByaW1hcnk6Zm9jdXMsXFxuLmJ0bi1wcmltYXJ5LmRpc2FibGVkLmZvY3VzLFxcbi5idG4tcHJpbWFyeVtkaXNhYmxlZF0uZm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tcHJpbWFyeS5mb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4uYnRuLXByaW1hcnkgLmJhZGdlIHtcXG4gIGNvbG9yOiAjRDkyMzBGO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuLmJ0bi1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ2OTQwODtcXG4gIGJvcmRlci1jb2xvcjogIzQ2OTQwODtcXG59XFxuLmJ0bi1zdWNjZXNzOmZvY3VzLFxcbi5idG4tc3VjY2Vzcy5mb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyZjY0MDU7XFxuICBib3JkZXItY29sb3I6ICMwZDFiMDE7XFxufVxcbi5idG4tc3VjY2Vzczpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyZjY0MDU7XFxuICBib3JkZXItY29sb3I6ICMyYjVhMDU7XFxufVxcbi5idG4tc3VjY2VzczphY3RpdmUsXFxuLmJ0bi1zdWNjZXNzLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3Mge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY2NDA1O1xcbiAgYm9yZGVyLWNvbG9yOiAjMmI1YTA1O1xcbn1cXG4uYnRuLXN1Y2Nlc3M6YWN0aXZlOmhvdmVyLFxcbi5idG4tc3VjY2Vzcy5hY3RpdmU6aG92ZXIsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1zdWNjZXNzOmhvdmVyLFxcbi5idG4tc3VjY2VzczphY3RpdmU6Zm9jdXMsXFxuLmJ0bi1zdWNjZXNzLmFjdGl2ZTpmb2N1cyxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3M6Zm9jdXMsXFxuLmJ0bi1zdWNjZXNzOmFjdGl2ZS5mb2N1cyxcXG4uYnRuLXN1Y2Nlc3MuYWN0aXZlLmZvY3VzLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tc3VjY2Vzcy5mb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjQyMDQ7XFxuICBib3JkZXItY29sb3I6ICMwZDFiMDE7XFxufVxcbi5idG4tc3VjY2VzczphY3RpdmUsXFxuLmJ0bi1zdWNjZXNzLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG59XFxuLmJ0bi1zdWNjZXNzLmRpc2FibGVkOmhvdmVyLFxcbi5idG4tc3VjY2Vzc1tkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2Vzczpob3ZlcixcXG4uYnRuLXN1Y2Nlc3MuZGlzYWJsZWQ6Zm9jdXMsXFxuLmJ0bi1zdWNjZXNzW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1zdWNjZXNzOmZvY3VzLFxcbi5idG4tc3VjY2Vzcy5kaXNhYmxlZC5mb2N1cyxcXG4uYnRuLXN1Y2Nlc3NbZGlzYWJsZWRdLmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXN1Y2Nlc3MuZm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ2OTQwODtcXG4gIGJvcmRlci1jb2xvcjogIzQ2OTQwODtcXG59XFxuLmJ0bi1zdWNjZXNzIC5iYWRnZSB7XFxuICBjb2xvcjogIzQ2OTQwODtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcbi5idG4taW5mbyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMjlBQ0Y7XFxuICBib3JkZXItY29sb3I6ICMwMjlBQ0Y7XFxufVxcbi5idG4taW5mbzpmb2N1cyxcXG4uYnRuLWluZm8uZm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI3NDljO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDEzYzUxO1xcbn1cXG4uYnRuLWluZm86aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI3NDljO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDE2ZDkyO1xcbn1cXG4uYnRuLWluZm86YWN0aXZlLFxcbi5idG4taW5mby5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1pbmZvIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzQ5YztcXG4gIGJvcmRlci1jb2xvcjogIzAxNmQ5MjtcXG59XFxuLmJ0bi1pbmZvOmFjdGl2ZTpob3ZlcixcXG4uYnRuLWluZm8uYWN0aXZlOmhvdmVyLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4taW5mbzpob3ZlcixcXG4uYnRuLWluZm86YWN0aXZlOmZvY3VzLFxcbi5idG4taW5mby5hY3RpdmU6Zm9jdXMsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1pbmZvOmZvY3VzLFxcbi5idG4taW5mbzphY3RpdmUuZm9jdXMsXFxuLmJ0bi1pbmZvLmFjdGl2ZS5mb2N1cyxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWluZm8uZm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDE1YTc5O1xcbiAgYm9yZGVyLWNvbG9yOiAjMDEzYzUxO1xcbn1cXG4uYnRuLWluZm86YWN0aXZlLFxcbi5idG4taW5mby5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1pbmZvIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxufVxcbi5idG4taW5mby5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLWluZm9bZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm86aG92ZXIsXFxuLmJ0bi1pbmZvLmRpc2FibGVkOmZvY3VzLFxcbi5idG4taW5mb1tkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4taW5mbzpmb2N1cyxcXG4uYnRuLWluZm8uZGlzYWJsZWQuZm9jdXMsXFxuLmJ0bi1pbmZvW2Rpc2FibGVkXS5mb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1pbmZvLmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMjlBQ0Y7XFxuICBib3JkZXItY29sb3I6ICMwMjlBQ0Y7XFxufVxcbi5idG4taW5mbyAuYmFkZ2Uge1xcbiAgY29sb3I6ICMwMjlBQ0Y7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4uYnRuLXdhcm5pbmcge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOUI0NzlGO1xcbiAgYm9yZGVyLWNvbG9yOiAjOUI0NzlGO1xcbn1cXG4uYnRuLXdhcm5pbmc6Zm9jdXMsXFxuLmJ0bi13YXJuaW5nLmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc5Mzc3YztcXG4gIGJvcmRlci1jb2xvcjogIzQ1MjA0NztcXG59XFxuLmJ0bi13YXJuaW5nOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc5Mzc3YztcXG4gIGJvcmRlci1jb2xvcjogIzcyMzQ3NTtcXG59XFxuLmJ0bi13YXJuaW5nOmFjdGl2ZSxcXG4uYnRuLXdhcm5pbmcuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4td2FybmluZyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3OTM3N2M7XFxuICBib3JkZXItY29sb3I6ICM3MjM0NzU7XFxufVxcbi5idG4td2FybmluZzphY3RpdmU6aG92ZXIsXFxuLmJ0bi13YXJuaW5nLmFjdGl2ZTpob3ZlcixcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXdhcm5pbmc6aG92ZXIsXFxuLmJ0bi13YXJuaW5nOmFjdGl2ZTpmb2N1cyxcXG4uYnRuLXdhcm5pbmcuYWN0aXZlOmZvY3VzLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4td2FybmluZzpmb2N1cyxcXG4uYnRuLXdhcm5pbmc6YWN0aXZlLmZvY3VzLFxcbi5idG4td2FybmluZy5hY3RpdmUuZm9jdXMsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi13YXJuaW5nLmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzYxMmM2MztcXG4gIGJvcmRlci1jb2xvcjogIzQ1MjA0NztcXG59XFxuLmJ0bi13YXJuaW5nOmFjdGl2ZSxcXG4uYnRuLXdhcm5pbmcuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4td2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLXdhcm5pbmcuZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi13YXJuaW5nW2Rpc2FibGVkXTpob3ZlcixcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi13YXJuaW5nOmhvdmVyLFxcbi5idG4td2FybmluZy5kaXNhYmxlZDpmb2N1cyxcXG4uYnRuLXdhcm5pbmdbZGlzYWJsZWRdOmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXdhcm5pbmc6Zm9jdXMsXFxuLmJ0bi13YXJuaW5nLmRpc2FibGVkLmZvY3VzLFxcbi5idG4td2FybmluZ1tkaXNhYmxlZF0uZm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4td2FybmluZy5mb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOUI0NzlGO1xcbiAgYm9yZGVyLWNvbG9yOiAjOUI0NzlGO1xcbn1cXG4uYnRuLXdhcm5pbmcgLmJhZGdlIHtcXG4gIGNvbG9yOiAjOUI0NzlGO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuLmJ0bi1kYW5nZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDk4MzFGO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDk4MzFGO1xcbn1cXG4uYnRuLWRhbmdlcjpmb2N1cyxcXG4uYnRuLWRhbmdlci5mb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYzY4MTk7XFxuICBib3JkZXItY29sb3I6ICM2OTQwMGY7XFxufVxcbi5idG4tZGFuZ2VyOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FjNjgxOTtcXG4gIGJvcmRlci1jb2xvcjogI2EzNjMxNztcXG59XFxuLmJ0bi1kYW5nZXI6YWN0aXZlLFxcbi5idG4tZGFuZ2VyLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRhbmdlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYzY4MTk7XFxuICBib3JkZXItY29sb3I6ICNhMzYzMTc7XFxufVxcbi5idG4tZGFuZ2VyOmFjdGl2ZTpob3ZlcixcXG4uYnRuLWRhbmdlci5hY3RpdmU6aG92ZXIsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kYW5nZXI6aG92ZXIsXFxuLmJ0bi1kYW5nZXI6YWN0aXZlOmZvY3VzLFxcbi5idG4tZGFuZ2VyLmFjdGl2ZTpmb2N1cyxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRhbmdlcjpmb2N1cyxcXG4uYnRuLWRhbmdlcjphY3RpdmUuZm9jdXMsXFxuLmJ0bi1kYW5nZXIuYWN0aXZlLmZvY3VzLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tZGFuZ2VyLmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhkNTUxNDtcXG4gIGJvcmRlci1jb2xvcjogIzY5NDAwZjtcXG59XFxuLmJ0bi1kYW5nZXI6YWN0aXZlLFxcbi5idG4tZGFuZ2VyLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLWRhbmdlci5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLWRhbmdlcltkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyOmhvdmVyLFxcbi5idG4tZGFuZ2VyLmRpc2FibGVkOmZvY3VzLFxcbi5idG4tZGFuZ2VyW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kYW5nZXI6Zm9jdXMsXFxuLmJ0bi1kYW5nZXIuZGlzYWJsZWQuZm9jdXMsXFxuLmJ0bi1kYW5nZXJbZGlzYWJsZWRdLmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRhbmdlci5mb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDk4MzFGO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDk4MzFGO1xcbn1cXG4uYnRuLWRhbmdlciAuYmFkZ2Uge1xcbiAgY29sb3I6ICNEOTgzMUY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4uYnRuLWxpbmsge1xcbiAgY29sb3I6ICNEOTIzMEY7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1saW5rLFxcbi5idG4tbGluazphY3RpdmUsXFxuLmJ0bi1saW5rLmFjdGl2ZSxcXG4uYnRuLWxpbmtbZGlzYWJsZWRdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWxpbmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbn1cXG4uYnRuLWxpbmssXFxuLmJ0bi1saW5rOmhvdmVyLFxcbi5idG4tbGluazpmb2N1cyxcXG4uYnRuLWxpbms6YWN0aXZlIHtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5idG4tbGluazpob3ZlcixcXG4uYnRuLWxpbms6Zm9jdXMge1xcbiAgY29sb3I6ICM5MTE3MGE7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uYnRuLWxpbmtbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWxpbms6aG92ZXIsXFxuLmJ0bi1saW5rW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1saW5rOmZvY3VzIHtcXG4gIGNvbG9yOiAjODA4MDgwO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG4uYnRuLWxnLFxcbi5idG4tZ3JvdXAtbGcgPiAuYnRuIHtcXG4gIHBhZGRpbmc6IDE0cHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMTdweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi5idG4tc20sXFxuLmJ0bi1ncm91cC1zbSA+IC5idG4ge1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uYnRuLXhzLFxcbi5idG4tZ3JvdXAteHMgPiAuYnRuIHtcXG4gIHBhZGRpbmc6IDFweCA1cHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uYnRuLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5idG4tYmxvY2sgKyAuYnRuLWJsb2NrIHtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0uYnRuLWJsb2NrLFxcbmlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0uYnRuLWJsb2NrLFxcbmlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLmJ0bi1ibG9jayB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZhZGUge1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBsaW5lYXI7XFxuICAtbW96LXRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgbGluZWFyO1xcbiAgLW1zLXRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGxpbmVhcjtcXG59XFxuLmZhZGUuaW4ge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuLmNvbGxhcHNlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5jb2xsYXBzZS5pbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxudHIuY29sbGFwc2UuaW4ge1xcbiAgZGlzcGxheTogdGFibGUtcm93O1xcbn1cXG50Ym9keS5jb2xsYXBzZS5pbiB7XFxuICBkaXNwbGF5OiB0YWJsZS1yb3ctZ3JvdXA7XFxufVxcbi5jb2xsYXBzaW5nIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IGhlaWdodCwgdmlzaWJpbGl0eTtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGhlaWdodCwgdmlzaWJpbGl0eTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4zNXM7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjM1cztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcXG59XFxuLmNhcmV0IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBib3JkZXItdG9wOiA0cHggZGFzaGVkO1xcbiAgYm9yZGVyLXRvcDogNHB4IHNvbGlkIFxcXFw5O1xcbiAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG4uZHJvcHVwLFxcbi5kcm9wZG93biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5kcm9wZG93bi10b2dnbGU6Zm9jdXMge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLmRyb3Bkb3duLW1lbnUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgcGFkZGluZzogNXB4IDA7XFxuICBtYXJnaW46IDJweCAwIDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCA2cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTc1KTtcXG4gIC1tb3otYm94LXNoYWRvdzogMCA2cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTc1KTtcXG4gIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7XFxuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xcbn1cXG4uZHJvcGRvd24tbWVudS5wdWxsLXJpZ2h0IHtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogYXV0bztcXG59XFxuLmRyb3Bkb3duLW1lbnUgLmRpdmlkZXIge1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW46IDhweCAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XFxufVxcbi5kcm9wZG93bi1tZW51ID4gbGkgPiBhIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogM3B4IDIwcHg7XFxuICBjbGVhcjogYm90aDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGNvbG9yOiAjNDQ0O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6aG92ZXIsXFxuLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6Zm9jdXMge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4uZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhLFxcbi5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGE6aG92ZXIsXFxuLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIG91dGxpbmU6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4uZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGEsXFxuLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmhvdmVyLFxcbi5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYTpmb2N1cyB7XFxuICBjb2xvcjogIzgwODA4MDtcXG59XFxuLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmhvdmVyLFxcbi5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYTpmb2N1cyB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChlbmFibGVkID0gZmFsc2UpO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLm9wZW4gPiAuZHJvcGRvd24tbWVudSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLm9wZW4gPiBhIHtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5kcm9wZG93bi1tZW51LXJpZ2h0IHtcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogMDtcXG59XFxuLmRyb3Bkb3duLW1lbnUtbGVmdCB7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IGF1dG87XFxufVxcbi5kcm9wZG93bi1oZWFkZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAzcHggMjBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgY29sb3I6ICM4MDgwODA7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4uZHJvcGRvd24tYmFja2Ryb3Age1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogOTkwO1xcbn1cXG4ucHVsbC1yaWdodCA+IC5kcm9wZG93bi1tZW51IHtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogYXV0bztcXG59XFxuLmRyb3B1cCAuY2FyZXQsXFxuLm5hdmJhci1maXhlZC1ib3R0b20gLmRyb3Bkb3duIC5jYXJldCB7XFxuICBib3JkZXItdG9wOiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogNHB4IGRhc2hlZDtcXG4gIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCBcXFxcOTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbn1cXG4uZHJvcHVwIC5kcm9wZG93bi1tZW51LFxcbi5uYXZiYXItZml4ZWQtYm90dG9tIC5kcm9wZG93biAuZHJvcGRvd24tbWVudSB7XFxuICB0b3A6IGF1dG87XFxuICBib3R0b206IDEwMCU7XFxuICBtYXJnaW4tYm90dG9tOiAycHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1yaWdodCAuZHJvcGRvd24tbWVudSB7XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiAwO1xcbiAgfVxcbiAgLm5hdmJhci1yaWdodCAuZHJvcGRvd24tbWVudS1sZWZ0IHtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxufVxcbi5idG4tZ3JvdXAsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG46aG92ZXIsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG46aG92ZXIsXFxuLmJ0bi1ncm91cCA+IC5idG46Zm9jdXMsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG46Zm9jdXMsXFxuLmJ0bi1ncm91cCA+IC5idG46YWN0aXZlLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuOmFjdGl2ZSxcXG4uYnRuLWdyb3VwID4gLmJ0bi5hY3RpdmUsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4uYWN0aXZlIHtcXG4gIHotaW5kZXg6IDI7XFxufVxcbi5idG4tZ3JvdXAgLmJ0biArIC5idG4sXFxuLmJ0bi1ncm91cCAuYnRuICsgLmJ0bi1ncm91cCxcXG4uYnRuLWdyb3VwIC5idG4tZ3JvdXAgKyAuYnRuLFxcbi5idG4tZ3JvdXAgLmJ0bi1ncm91cCArIC5idG4tZ3JvdXAge1xcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XFxufVxcbi5idG4tdG9vbGJhciB7XFxuICBtYXJnaW4tbGVmdDogLTVweDtcXG59XFxuLmJ0bi10b29sYmFyIC5idG4sXFxuLmJ0bi10b29sYmFyIC5idG4tZ3JvdXAsXFxuLmJ0bi10b29sYmFyIC5pbnB1dC1ncm91cCB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLmJ0bi10b29sYmFyID4gLmJ0bixcXG4uYnRuLXRvb2xiYXIgPiAuYnRuLWdyb3VwLFxcbi5idG4tdG9vbGJhciA+IC5pbnB1dC1ncm91cCB7XFxuICBtYXJnaW4tbGVmdDogNXB4O1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpOm5vdCguZHJvcGRvd24tdG9nZ2xlKSB7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG46Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKTpub3QoLmRyb3Bkb3duLXRvZ2dsZSkge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG46bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSxcXG4uYnRuLWdyb3VwID4gLmRyb3Bkb3duLXRvZ2dsZTpub3QoOmZpcnN0LWNoaWxkKSB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG4tZ3JvdXAge1xcbiAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCkgPiAuYnRuIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkgPiAuYnRuOmxhc3QtY2hpbGQsXFxuLmJ0bi1ncm91cCA+IC5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKSA+IC5kcm9wZG93bi10b2dnbGUge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG4tZ3JvdXA6bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSA+IC5idG46Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAgLmRyb3Bkb3duLXRvZ2dsZTphY3RpdmUsXFxuLmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGUge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG4gKyAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIHBhZGRpbmctbGVmdDogOHB4O1xcbiAgcGFkZGluZy1yaWdodDogOHB4O1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bi1sZyArIC5kcm9wZG93bi10b2dnbGUge1xcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xcbiAgcGFkZGluZy1yaWdodDogMTJweDtcXG59XFxuLmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGUge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyNSk7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG59XFxuLmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGUuYnRuLWxpbmsge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xcbiAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuLmJ0biAuY2FyZXQge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5idG4tbGcgLmNhcmV0IHtcXG4gIGJvcmRlci13aWR0aDogNXB4IDVweCAwO1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcXG59XFxuLmRyb3B1cCAuYnRuLWxnIC5jYXJldCB7XFxuICBib3JkZXItd2lkdGg6IDAgNXB4IDVweDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4sXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXAsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXAgPiAuYnRuIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZmxvYXQ6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXAgPiAuYnRuIHtcXG4gIGZsb2F0OiBub25lO1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0biArIC5idG4sXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4gKyAuYnRuLWdyb3VwLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwICsgLmJ0bixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cCArIC5idG4tZ3JvdXAge1xcbiAgbWFyZ2luLXRvcDogLTFweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG46bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpID4gLmJ0biB7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpmaXJzdC1jaGlsZDpub3QoOmxhc3QtY2hpbGQpID4gLmJ0bjpsYXN0LWNoaWxkLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkgPiAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSA+IC5idG46Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwLWp1c3RpZmllZCB7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XFxufVxcbi5idG4tZ3JvdXAtanVzdGlmaWVkID4gLmJ0bixcXG4uYnRuLWdyb3VwLWp1c3RpZmllZCA+IC5idG4tZ3JvdXAge1xcbiAgZmxvYXQ6IG5vbmU7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgd2lkdGg6IDElO1xcbn1cXG4uYnRuLWdyb3VwLWp1c3RpZmllZCA+IC5idG4tZ3JvdXAgLmJ0biB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmJ0bi1ncm91cC1qdXN0aWZpZWQgPiAuYnRuLWdyb3VwIC5kcm9wZG93bi1tZW51IHtcXG4gIGxlZnQ6IGF1dG87XFxufVxcbltkYXRhLXRvZ2dsZT1cXFwiYnV0dG9uc1xcXCJdID4gLmJ0biBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbltkYXRhLXRvZ2dsZT1cXFwiYnV0dG9uc1xcXCJdID4gLmJ0bi1ncm91cCA+IC5idG4gaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSxcXG5bZGF0YS10b2dnbGU9XFxcImJ1dHRvbnNcXFwiXSA+IC5idG4gaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bZGF0YS10b2dnbGU9XFxcImJ1dHRvbnNcXFwiXSA+IC5idG4tZ3JvdXAgPiAuYnRuIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uaW5wdXQtZ3JvdXAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogdGFibGU7XFxuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbn1cXG4uaW5wdXQtZ3JvdXBbY2xhc3MqPVxcXCJjb2wtXFxcIl0ge1xcbiAgZmxvYXQ6IG5vbmU7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBwYWRkaW5nLXJpZ2h0OiAwO1xcbn1cXG4uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAyO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOmZvY3VzIHtcXG4gIHotaW5kZXg6IDM7XFxufVxcbi5pbnB1dC1ncm91cC1sZyA+IC5mb3JtLWNvbnRyb2wsXFxuLmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbi5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcXG4gIGhlaWdodDogNTNweDtcXG4gIHBhZGRpbmc6IDE0cHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMTdweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbnNlbGVjdC5pbnB1dC1ncm91cC1sZyA+IC5mb3JtLWNvbnRyb2wsXFxuc2VsZWN0LmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbnNlbGVjdC5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcXG4gIGhlaWdodDogNTNweDtcXG4gIGxpbmUtaGVpZ2h0OiA1M3B4O1xcbn1cXG50ZXh0YXJlYS5pbnB1dC1ncm91cC1sZyA+IC5mb3JtLWNvbnRyb2wsXFxudGV4dGFyZWEuaW5wdXQtZ3JvdXAtbGcgPiAuaW5wdXQtZ3JvdXAtYWRkb24sXFxudGV4dGFyZWEuaW5wdXQtZ3JvdXAtbGcgPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0bixcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWdyb3VwLWxnID4gLmZvcm0tY29udHJvbCxcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbnNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtbGcgPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5pbnB1dC1ncm91cC1zbSA+IC5mb3JtLWNvbnRyb2wsXFxuLmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbi5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcXG4gIGhlaWdodDogMzBweDtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuc2VsZWN0LmlucHV0LWdyb3VwLXNtID4gLmZvcm0tY29udHJvbCxcXG5zZWxlY3QuaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYWRkb24sXFxuc2VsZWN0LmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWJ0biA+IC5idG4ge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcbnRleHRhcmVhLmlucHV0LWdyb3VwLXNtID4gLmZvcm0tY29udHJvbCxcXG50ZXh0YXJlYS5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1hZGRvbixcXG50ZXh0YXJlYS5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuLFxcbnNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtc20gPiAuZm9ybS1jb250cm9sLFxcbnNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYWRkb24sXFxuc2VsZWN0W211bHRpcGxlXS5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uLFxcbi5pbnB1dC1ncm91cC1idG4sXFxuLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2wge1xcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCksXFxuLmlucHV0LWdyb3VwLWJ0bjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpLFxcbi5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uLFxcbi5pbnB1dC1ncm91cC1idG4ge1xcbiAgd2lkdGg6IDElO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxuICBwYWRkaW5nOiA4cHggMTJweDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGNvbG9yOiAjNzc3O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1zbSB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWxnIHtcXG4gIHBhZGRpbmc6IDE0cHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMTdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuLmlucHV0LWdyb3VwLWFkZG9uIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2w6Zmlyc3QtY2hpbGQsXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkLFxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLFxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLWdyb3VwID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmRyb3Bkb3duLXRvZ2dsZSxcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpLFxcbi5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZCA+IC5idG4tZ3JvdXA6bm90KDpsYXN0LWNoaWxkKSA+IC5idG4ge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci1yaWdodDogMDtcXG59XFxuLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2w6bGFzdC1jaGlsZCxcXG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCxcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuLFxcbi5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZCA+IC5idG4tZ3JvdXAgPiAuYnRuLFxcbi5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZCA+IC5kcm9wZG93bi10b2dnbGUsXFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5idG46bm90KDpmaXJzdC1jaGlsZCksXFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5idG4tZ3JvdXA6bm90KDpmaXJzdC1jaGlsZCkgPiAuYnRuIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCB7XFxuICBib3JkZXItbGVmdDogMDtcXG59XFxuLmlucHV0LWdyb3VwLWJ0biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LXNpemU6IDA7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4uaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5pbnB1dC1ncm91cC1idG4gPiAuYnRuICsgLmJ0biB7XFxuICBtYXJnaW4tbGVmdDogLTFweDtcXG59XFxuLmlucHV0LWdyb3VwLWJ0biA+IC5idG46aG92ZXIsXFxuLmlucHV0LWdyb3VwLWJ0biA+IC5idG46Zm9jdXMsXFxuLmlucHV0LWdyb3VwLWJ0biA+IC5idG46YWN0aXZlIHtcXG4gIHotaW5kZXg6IDI7XFxufVxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLFxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLWdyb3VwIHtcXG4gIG1hcmdpbi1yaWdodDogLTFweDtcXG59XFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuLWdyb3VwIHtcXG4gIHotaW5kZXg6IDI7XFxuICBtYXJnaW4tbGVmdDogLTFweDtcXG59XFxuLm5hdiB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuLm5hdiA+IGxpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4ubmF2ID4gbGkgPiBhIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbn1cXG4ubmF2ID4gbGkgPiBhOmhvdmVyLFxcbi5uYXYgPiBsaSA+IGE6Zm9jdXMge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG59XFxuLm5hdiA+IGxpLmRpc2FibGVkID4gYSB7XFxuICBjb2xvcjogIzgwODA4MDtcXG59XFxuLm5hdiA+IGxpLmRpc2FibGVkID4gYTpob3ZlcixcXG4ubmF2ID4gbGkuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjODA4MDgwO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG4ubmF2IC5vcGVuID4gYSxcXG4ubmF2IC5vcGVuID4gYTpob3ZlcixcXG4ubmF2IC5vcGVuID4gYTpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4ubmF2IC5uYXYtZGl2aWRlciB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogOHB4IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcXG59XFxuLm5hdiA+IGxpID4gYSA+IGltZyB7XFxuICBtYXgtd2lkdGg6IG5vbmU7XFxufVxcbi5uYXYtdGFicyB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcXG59XFxuLm5hdi10YWJzID4gbGkge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tYm90dG9tOiAtMXB4O1xcbn1cXG4ubmF2LXRhYnMgPiBsaSA+IGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAycHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XFxufVxcbi5uYXYtdGFicyA+IGxpID4gYTpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICNkZGQgI2RkZCAjZGRkO1xcbn1cXG4ubmF2LXRhYnMgPiBsaS5hY3RpdmUgPiBhLFxcbi5uYXYtdGFicyA+IGxpLmFjdGl2ZSA+IGE6aG92ZXIsXFxuLm5hdi10YWJzID4gbGkuYWN0aXZlID4gYTpmb2N1cyB7XFxuICBjb2xvcjogIzc3NztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQ0ZDRkM7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWJvdHRvbTogMDtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiBsaSB7XFxuICBmbG9hdDogbm9uZTtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiBsaSA+IGEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5kcm9wZG93biAuZHJvcGRvd24tbWVudSB7XFxuICB0b3A6IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gbGkge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICB3aWR0aDogMSU7XFxuICB9XFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYSxcXG4ubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcXG4gIH1cXG4gIC5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGEsXFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYTpmb2N1cyB7XFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNGQ0ZDRkM7XFxuICB9XFxufVxcbi5uYXYtcGlsbHMgPiBsaSB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLm5hdi1waWxscyA+IGxpID4gYSB7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5uYXYtcGlsbHMgPiBsaSArIGxpIHtcXG4gIG1hcmdpbi1sZWZ0OiAycHg7XFxufVxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhLFxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q5MjMwRjtcXG59XFxuLm5hdi1zdGFja2VkID4gbGkge1xcbiAgZmxvYXQ6IG5vbmU7XFxufVxcbi5uYXYtc3RhY2tlZCA+IGxpICsgbGkge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5uYXYtanVzdGlmaWVkIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ubmF2LWp1c3RpZmllZCA+IGxpIHtcXG4gIGZsb2F0OiBub25lO1xcbn1cXG4ubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcbi5uYXYtanVzdGlmaWVkID4gLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51IHtcXG4gIHRvcDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdi1qdXN0aWZpZWQgPiBsaSB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgIHdpZHRoOiAxJTtcXG4gIH1cXG4gIC5uYXYtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG59XFxuLm5hdi10YWJzLWp1c3RpZmllZCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbn1cXG4ubmF2LXRhYnMtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhLFxcbi5uYXYtdGFicy1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4ubmF2LXRhYnMtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2LXRhYnMtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xcbiAgfVxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhLFxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0ZDRkNGQztcXG4gIH1cXG59XFxuLnRhYi1jb250ZW50ID4gLnRhYi1wYW5lIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi50YWItY29udGVudCA+IC5hY3RpdmUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5uYXYtdGFicyAuZHJvcGRvd24tbWVudSB7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4ubmF2YmFyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDQwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhciB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWhlYWRlciB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbn1cXG4ubmF2YmFyLWNvbGxhcHNlIHtcXG4gIG92ZXJmbG93LXg6IHZpc2libGU7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XFxufVxcbi5uYXZiYXItY29sbGFwc2UuaW4ge1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWNvbGxhcHNlIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGJvcmRlci10b3A6IDA7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICB9XFxuICAubmF2YmFyLWNvbGxhcHNlLmNvbGxhcHNlIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgLm5hdmJhci1jb2xsYXBzZS5pbiB7XFxuICAgIG92ZXJmbG93LXk6IHZpc2libGU7XFxuICB9XFxuICAubmF2YmFyLWZpeGVkLXRvcCAubmF2YmFyLWNvbGxhcHNlLFxcbiAgLm5hdmJhci1zdGF0aWMtdG9wIC5uYXZiYXItY29sbGFwc2UsXFxuICAubmF2YmFyLWZpeGVkLWJvdHRvbSAubmF2YmFyLWNvbGxhcHNlIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xcbiAgfVxcbn1cXG4ubmF2YmFyLWZpeGVkLXRvcCAubmF2YmFyLWNvbGxhcHNlLFxcbi5uYXZiYXItZml4ZWQtYm90dG9tIC5uYXZiYXItY29sbGFwc2Uge1xcbiAgbWF4LWhlaWdodDogMzQwcHg7XFxufVxcbkBtZWRpYSAobWF4LWRldmljZS13aWR0aDogNDgwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xcbiAgLm5hdmJhci1maXhlZC10b3AgLm5hdmJhci1jb2xsYXBzZSxcXG4gIC5uYXZiYXItZml4ZWQtYm90dG9tIC5uYXZiYXItY29sbGFwc2Uge1xcbiAgICBtYXgtaGVpZ2h0OiAyMDBweDtcXG4gIH1cXG59XFxuLmNvbnRhaW5lciA+IC5uYXZiYXItaGVhZGVyLFxcbi5jb250YWluZXItZmx1aWQgPiAubmF2YmFyLWhlYWRlcixcXG4uY29udGFpbmVyID4gLm5hdmJhci1jb2xsYXBzZSxcXG4uY29udGFpbmVyLWZsdWlkID4gLm5hdmJhci1jb2xsYXBzZSB7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5jb250YWluZXIgPiAubmF2YmFyLWhlYWRlcixcXG4gIC5jb250YWluZXItZmx1aWQgPiAubmF2YmFyLWhlYWRlcixcXG4gIC5jb250YWluZXIgPiAubmF2YmFyLWNvbGxhcHNlLFxcbiAgLmNvbnRhaW5lci1mbHVpZCA+IC5uYXZiYXItY29sbGFwc2Uge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbn1cXG4ubmF2YmFyLXN0YXRpYy10b3Age1xcbiAgei1pbmRleDogMTAwMDtcXG4gIGJvcmRlci13aWR0aDogMCAwIDFweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLXN0YXRpYy10b3Age1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgfVxcbn1cXG4ubmF2YmFyLWZpeGVkLXRvcCxcXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAxMDMwO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5uYXZiYXItZml4ZWQtdG9wLFxcbiAgLm5hdmJhci1maXhlZC1ib3R0b20ge1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgfVxcbn1cXG4ubmF2YmFyLWZpeGVkLXRvcCB7XFxuICB0b3A6IDA7XFxuICBib3JkZXItd2lkdGg6IDAgMCAxcHg7XFxufVxcbi5uYXZiYXItZml4ZWQtYm90dG9tIHtcXG4gIGJvdHRvbTogMDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICBib3JkZXItd2lkdGg6IDFweCAwIDA7XFxufVxcbi5uYXZiYXItYnJhbmQge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBwYWRkaW5nOiAxMXB4IDE1cHg7XFxuICBmb250LXNpemU6IDE3cHg7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuLm5hdmJhci1icmFuZDpob3ZlcixcXG4ubmF2YmFyLWJyYW5kOmZvY3VzIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuLm5hdmJhci1icmFuZCA+IGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyID4gLmNvbnRhaW5lciAubmF2YmFyLWJyYW5kLFxcbiAgLm5hdmJhciA+IC5jb250YWluZXItZmx1aWQgLm5hdmJhci1icmFuZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtMTVweDtcXG4gIH1cXG59XFxuLm5hdmJhci10b2dnbGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgcGFkZGluZzogOXB4IDEwcHg7XFxuICBtYXJnaW4tdG9wOiAzcHg7XFxuICBtYXJnaW4tYm90dG9tOiAzcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLm5hdmJhci10b2dnbGU6Zm9jdXMge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLm5hdmJhci10b2dnbGUgLmljb24tYmFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDIycHg7XFxuICBoZWlnaHQ6IDJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDFweDtcXG59XFxuLm5hdmJhci10b2dnbGUgLmljb24tYmFyICsgLmljb24tYmFyIHtcXG4gIG1hcmdpbi10b3A6IDRweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLXRvZ2dsZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi5uYXZiYXItbmF2IHtcXG4gIG1hcmdpbjogNS41cHggLTE1cHg7XFxufVxcbi5uYXZiYXItbmF2ID4gbGkgPiBhIHtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSB7XFxuICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgIGZsb2F0OiBub25lO1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gIH1cXG4gIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhLFxcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWhlYWRlciB7XFxuICAgIHBhZGRpbmc6IDVweCAxNXB4IDVweCAyNXB4O1xcbiAgfVxcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGEge1xcbiAgICBsaW5lLWhlaWdodDogMThweDtcXG4gIH1cXG4gIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5uYXZiYXItbmF2IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMDtcXG4gIH1cXG4gIC5uYXZiYXItbmF2ID4gbGkge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gIH1cXG4gIC5uYXZiYXItbmF2ID4gbGkgPiBhIHtcXG4gICAgcGFkZGluZy10b3A6IDExcHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMXB4O1xcbiAgfVxcbn1cXG4ubmF2YmFyLWZvcm0ge1xcbiAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSksIDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSwgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSwgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBtYXJnaW4tYm90dG9tOiAycHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWdyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWNvbnRyb2wge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWNvbnRyb2wtc3RhdGljIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5uYXZiYXItZm9ybSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFkZG9uLFxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYnRuLFxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLmlucHV0LWdyb3VwID4gLmZvcm0tY29udHJvbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5jb250cm9sLWxhYmVsIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5uYXZiYXItZm9ybSAucmFkaW8sXFxuICAubmF2YmFyLWZvcm0gLmNoZWNrYm94IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5yYWRpbyBsYWJlbCxcXG4gIC5uYXZiYXItZm9ybSAuY2hlY2tib3ggbGFiZWwge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLnJhZGlvIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuICAubmF2YmFyLWZvcm0gLmNoZWNrYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5oYXMtZmVlZGJhY2sgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICAgIHRvcDogMDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAubmF2YmFyLWZvcm0gLmZvcm0tZ3JvdXAge1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLmZvcm0tZ3JvdXA6bGFzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1mb3JtIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGJvcmRlcjogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gICAgcGFkZGluZy10b3A6IDA7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgIC1tb3otYm94LXNoYWRvdzogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gIH1cXG59XFxuLm5hdmJhci1uYXYgPiBsaSA+IC5kcm9wZG93bi1tZW51IHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxufVxcbi5uYXZiYXItZml4ZWQtYm90dG9tIC5uYXZiYXItbmF2ID4gbGkgPiAuZHJvcGRvd24tbWVudSB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG59XFxuLm5hdmJhci1idG4ge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xcbn1cXG4ubmF2YmFyLWJ0bi5idG4tc20ge1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ubmF2YmFyLWJ0bi5idG4teHMge1xcbiAgbWFyZ2luLXRvcDogOXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogOXB4O1xcbn1cXG4ubmF2YmFyLXRleHQge1xcbiAgbWFyZ2luLXRvcDogMTFweDtcXG4gIG1hcmdpbi1ib3R0b206IDExcHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci10ZXh0IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1sZWZ0IHtcXG4gICAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG4gIH1cXG4gIC5uYXZiYXItcmlnaHQge1xcbiAgICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG4gIH1cXG4gIC5uYXZiYXItcmlnaHQgfiAubmF2YmFyLXJpZ2h0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgfVxcbn1cXG4ubmF2YmFyLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1jb2xvcjogI2VlZWVlZTtcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItYnJhbmQge1xcbiAgY29sb3I6ICM3Nzc7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWJyYW5kOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWJyYW5kOmZvY3VzIHtcXG4gIGNvbG9yOiAjRDkyMzBGO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLXRleHQge1xcbiAgY29sb3I6ICM3Nzc7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IGxpID4gYSB7XFxuICBjb2xvcjogIzc3NztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gbGkgPiBhOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IGxpID4gYTpmb2N1cyB7XFxuICBjb2xvcjogI0Q5MjMwRjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAuYWN0aXZlID4gYSxcXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAuYWN0aXZlID4gYTpmb2N1cyB7XFxuICBjb2xvcjogI0Q5MjMwRjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAuZGlzYWJsZWQgPiBhLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gLmRpc2FibGVkID4gYTpmb2N1cyB7XFxuICBjb2xvcjogIzQ0NDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10b2dnbGUge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkO1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10b2dnbGU6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItdG9nZ2xlOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLXRvZ2dsZSAuaWNvbi1iYXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItY29sbGFwc2UsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItZm9ybSB7XFxuICBib3JkZXItY29sb3I6ICNlZWVlZWU7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5vcGVuID4gYSxcXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAub3BlbiA+IGE6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gLm9wZW4gPiBhOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6ICNEOTIzMEY7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhIHtcXG4gICAgY29sb3I6ICM3Nzc7XFxuICB9XFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6aG92ZXIsXFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogI0Q5MjMwRjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYSxcXG4gIC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogI0Q5MjMwRjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhLFxcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYTpob3ZlcixcXG4gIC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogIzQ0NDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWxpbmsge1xcbiAgY29sb3I6ICM3Nzc7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWxpbms6aG92ZXIge1xcbiAgY29sb3I6ICNEOTIzMEY7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAuYnRuLWxpbmsge1xcbiAgY29sb3I6ICM3Nzc7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAuYnRuLWxpbms6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5idG4tbGluazpmb2N1cyB7XFxuICBjb2xvcjogI0Q5MjMwRjtcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5idG4tbGlua1tkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5uYXZiYXItZGVmYXVsdCAuYnRuLWxpbms6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5idG4tbGlua1tkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5uYXZiYXItZGVmYXVsdCAuYnRuLWxpbms6Zm9jdXMge1xcbiAgY29sb3I6ICM0NDQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbiAgYm9yZGVyLWNvbG9yOiAjYTkxYjBjO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1icmFuZCB7XFxuICBjb2xvcjogI2ZhYzBiYTtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItYnJhbmQ6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItYnJhbmQ6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItdGV4dCB7XFxuICBjb2xvcjogI2ZhYzBiYTtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gbGkgPiBhIHtcXG4gIGNvbG9yOiAjZmFjMGJhO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiBsaSA+IGE6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gbGkgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhLFxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5kaXNhYmxlZCA+IGEsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLmRpc2FibGVkID4gYTpob3ZlcixcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiAuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjY2NjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLXRvZ2dsZSB7XFxuICBib3JkZXItY29sb3I6ICNhOTFiMGM7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLXRvZ2dsZTpob3ZlcixcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci10b2dnbGU6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E5MWIwYztcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItdG9nZ2xlIC5pY29uLWJhciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1jb2xsYXBzZSxcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1mb3JtIHtcXG4gIGJvcmRlci1jb2xvcjogI2I4MWUwZDtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLm9wZW4gPiBhLFxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5vcGVuID4gYTpob3ZlcixcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiAub3BlbiA+IGE6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZHJvcGRvd24taGVhZGVyIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjYTkxYjBjO1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51IC5kaXZpZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E5MWIwYztcXG4gIH1cXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IGxpID4gYSB7XFxuICAgIGNvbG9yOiAjZmFjMGJhO1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhOmZvY3VzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGEsXFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYSxcXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gICAgY29sb3I6ICNjY2M7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1saW5rIHtcXG4gIGNvbG9yOiAjZmFjMGJhO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1saW5rOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLmJ0bi1saW5rIHtcXG4gIGNvbG9yOiAjZmFjMGJhO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLmJ0bi1saW5rOmhvdmVyLFxcbi5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbms6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbmtbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAubmF2YmFyLWludmVyc2UgLmJ0bi1saW5rOmhvdmVyLFxcbi5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbmtbZGlzYWJsZWRdOmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAubmF2YmFyLWludmVyc2UgLmJ0bi1saW5rOmZvY3VzIHtcXG4gIGNvbG9yOiAjY2NjO1xcbn1cXG4uYnJlYWRjcnVtYiB7XFxuICBwYWRkaW5nOiA4cHggMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5icmVhZGNydW1iID4gbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4uYnJlYWRjcnVtYiA+IGxpICsgbGk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIvXFxcXEEwXFxcIjtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbiAgY29sb3I6ICNjY2M7XFxufVxcbi5icmVhZGNydW1iID4gLmFjdGl2ZSB7XFxuICBjb2xvcjogIzgwODA4MDtcXG59XFxuLnBhZ2luYXRpb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAxOHB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGkge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbn1cXG4ucGFnaW5hdGlvbiA+IGxpID4gYSxcXG4ucGFnaW5hdGlvbiA+IGxpID4gc3BhbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIHBhZGRpbmc6IDhweCAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzQ0NDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGk6Zmlyc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uID4gbGk6Zmlyc3QtY2hpbGQgPiBzcGFuIHtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbn1cXG4ucGFnaW5hdGlvbiA+IGxpOmxhc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uID4gbGk6bGFzdC1jaGlsZCA+IHNwYW4ge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGkgPiBhOmhvdmVyLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBzcGFuOmhvdmVyLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBhOmZvY3VzLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBzcGFuOmZvY3VzIHtcXG4gIHotaW5kZXg6IDI7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTIzMEY7XFxuICBib3JkZXItY29sb3I6ICNEOTIzMEY7XFxufVxcbi5wYWdpbmF0aW9uID4gLmFjdGl2ZSA+IGEsXFxuLnBhZ2luYXRpb24gPiAuYWN0aXZlID4gc3BhbixcXG4ucGFnaW5hdGlvbiA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbi5wYWdpbmF0aW9uID4gLmFjdGl2ZSA+IHNwYW46aG92ZXIsXFxuLnBhZ2luYXRpb24gPiAuYWN0aXZlID4gYTpmb2N1cyxcXG4ucGFnaW5hdGlvbiA+IC5hY3RpdmUgPiBzcGFuOmZvY3VzIHtcXG4gIHotaW5kZXg6IDM7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTIzMEY7XFxuICBib3JkZXItY29sb3I6ICNEOTIzMEY7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5wYWdpbmF0aW9uID4gLmRpc2FibGVkID4gc3BhbixcXG4ucGFnaW5hdGlvbiA+IC5kaXNhYmxlZCA+IHNwYW46aG92ZXIsXFxuLnBhZ2luYXRpb24gPiAuZGlzYWJsZWQgPiBzcGFuOmZvY3VzLFxcbi5wYWdpbmF0aW9uID4gLmRpc2FibGVkID4gYSxcXG4ucGFnaW5hdGlvbiA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLnBhZ2luYXRpb24gPiAuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZGRkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1jb2xvcjogI2RkZDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbi5wYWdpbmF0aW9uLWxnID4gbGkgPiBhLFxcbi5wYWdpbmF0aW9uLWxnID4gbGkgPiBzcGFuIHtcXG4gIHBhZGRpbmc6IDE0cHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMTdweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxufVxcbi5wYWdpbmF0aW9uLWxnID4gbGk6Zmlyc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uLWxnID4gbGk6Zmlyc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDZweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXG59XFxuLnBhZ2luYXRpb24tbGcgPiBsaTpsYXN0LWNoaWxkID4gYSxcXG4ucGFnaW5hdGlvbi1sZyA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA2cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG4ucGFnaW5hdGlvbi1zbSA+IGxpID4gYSxcXG4ucGFnaW5hdGlvbi1zbSA+IGxpID4gc3BhbiB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcbi5wYWdpbmF0aW9uLXNtID4gbGk6Zmlyc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uLXNtID4gbGk6Zmlyc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhZ2luYXRpb24tc20gPiBsaTpsYXN0LWNoaWxkID4gYSxcXG4ucGFnaW5hdGlvbi1zbSA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFnZXIge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAxOHB4IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ucGFnZXIgbGkge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbn1cXG4ucGFnZXIgbGkgPiBhLFxcbi5wYWdlciBsaSA+IHNwYW4ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNXB4IDE0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxufVxcbi5wYWdlciBsaSA+IGE6aG92ZXIsXFxuLnBhZ2VyIGxpID4gYTpmb2N1cyB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4ucGFnZXIgLm5leHQgPiBhLFxcbi5wYWdlciAubmV4dCA+IHNwYW4ge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ucGFnZXIgLnByZXZpb3VzID4gYSxcXG4ucGFnZXIgLnByZXZpb3VzID4gc3BhbiB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGEsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGE6Zm9jdXMsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IHNwYW4ge1xcbiAgY29sb3I6ICNkZGQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG4gIHBhZGRpbmc6IC4yZW0gLjZlbSAuM2VtO1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYm9yZGVyLXJhZGl1czogLjI1ZW07XFxufVxcbmEubGFiZWw6aG92ZXIsXFxuYS5sYWJlbDpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmxhYmVsOmVtcHR5IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5idG4gLmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogLTFweDtcXG59XFxuLmxhYmVsLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDk0OTtcXG59XFxuLmxhYmVsLWRlZmF1bHRbaHJlZl06aG92ZXIsXFxuLmxhYmVsLWRlZmF1bHRbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJlMmYyZjtcXG59XFxuLmxhYmVsLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q5MjMwRjtcXG59XFxuLmxhYmVsLXByaW1hcnlbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXByaW1hcnlbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E5MWIwYztcXG59XFxuLmxhYmVsLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ2OTQwODtcXG59XFxuLmxhYmVsLXN1Y2Nlc3NbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXN1Y2Nlc3NbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmNjQwNTtcXG59XFxuLmxhYmVsLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyOUFDRjtcXG59XFxuLmxhYmVsLWluZm9baHJlZl06aG92ZXIsXFxuLmxhYmVsLWluZm9baHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzQ5YztcXG59XFxuLmxhYmVsLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlCNDc5RjtcXG59XFxuLmxhYmVsLXdhcm5pbmdbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXdhcm5pbmdbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc5Mzc3YztcXG59XFxuLmxhYmVsLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDk4MzFGO1xcbn1cXG4ubGFiZWwtZGFuZ2VyW2hyZWZdOmhvdmVyLFxcbi5sYWJlbC1kYW5nZXJbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FjNjgxOTtcXG59XFxuLmJhZGdlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1pbi13aWR0aDogMTBweDtcXG4gIHBhZGRpbmc6IDNweCA3cHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTIzMEY7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG4uYmFkZ2U6ZW1wdHkge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmJ0biAuYmFkZ2Uge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAtMXB4O1xcbn1cXG4uYnRuLXhzIC5iYWRnZSxcXG4uYnRuLWdyb3VwLXhzID4gLmJ0biAuYmFkZ2Uge1xcbiAgdG9wOiAwO1xcbiAgcGFkZGluZzogMXB4IDVweDtcXG59XFxuYS5iYWRnZTpob3ZlcixcXG5hLmJhZGdlOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSA+IC5iYWRnZSxcXG4ubmF2LXBpbGxzID4gLmFjdGl2ZSA+IGEgPiAuYmFkZ2Uge1xcbiAgY29sb3I6ICNEOTIzMEY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtID4gLmJhZGdlIHtcXG4gIGZsb2F0OiByaWdodDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbSA+IC5iYWRnZSArIC5iYWRnZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG59XFxuLm5hdi1waWxscyA+IGxpID4gYSA+IC5iYWRnZSB7XFxuICBtYXJnaW4tbGVmdDogM3B4O1xcbn1cXG4uanVtYm90cm9uIHtcXG4gIHBhZGRpbmctdG9wOiAzMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0O1xcbn1cXG4uanVtYm90cm9uIGgxLFxcbi5qdW1ib3Ryb24gLmgxIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uanVtYm90cm9uIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcbi5qdW1ib3Ryb24gPiBociB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjZGJkYmRiO1xcbn1cXG4uY29udGFpbmVyIC5qdW1ib3Ryb24sXFxuLmNvbnRhaW5lci1mbHVpZCAuanVtYm90cm9uIHtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxufVxcbi5qdW1ib3Ryb24gLmNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuanVtYm90cm9uIHtcXG4gICAgcGFkZGluZy10b3A6IDQ4cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiA0OHB4O1xcbiAgfVxcbiAgLmNvbnRhaW5lciAuanVtYm90cm9uLFxcbiAgLmNvbnRhaW5lci1mbHVpZCAuanVtYm90cm9uIHtcXG4gICAgcGFkZGluZy1sZWZ0OiA2MHB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiA2MHB4O1xcbiAgfVxcbiAgLmp1bWJvdHJvbiBoMSxcXG4gIC5qdW1ib3Ryb24gLmgxIHtcXG4gICAgZm9udC1zaXplOiA1OXB4O1xcbiAgfVxcbn1cXG4udGh1bWJuYWlsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZDRkNGQztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlciAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgLW1vei10cmFuc2l0aW9uOiBib3JkZXIgMC4ycyBlYXNlLWluLW91dDtcXG4gIC1tcy10cmFuc2l0aW9uOiBib3JkZXIgMC4ycyBlYXNlLWluLW91dDtcXG4gIC1vLXRyYW5zaXRpb246IGJvcmRlciAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyIDAuMnMgZWFzZS1pbi1vdXQ7XFxufVxcbi50aHVtYm5haWwgPiBpbWcsXFxuLnRodW1ibmFpbCBhID4gaW1nIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5hLnRodW1ibmFpbDpob3ZlcixcXG5hLnRodW1ibmFpbDpmb2N1cyxcXG5hLnRodW1ibmFpbC5hY3RpdmUge1xcbiAgYm9yZGVyLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4udGh1bWJuYWlsIC5jYXB0aW9uIHtcXG4gIHBhZGRpbmc6IDlweDtcXG4gIGNvbG9yOiAjNzc3O1xcbn1cXG4uYWxlcnQge1xcbiAgcGFkZGluZzogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLmFsZXJ0IGg0IHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLmFsZXJ0IC5hbGVydC1saW5rIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4uYWxlcnQgPiBwLFxcbi5hbGVydCA+IHVsIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5hbGVydCA+IHAgKyBwIHtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuLmFsZXJ0LWRpc21pc3NhYmxlLFxcbi5hbGVydC1kaXNtaXNzaWJsZSB7XFxuICBwYWRkaW5nLXJpZ2h0OiAzNXB4O1xcbn1cXG4uYWxlcnQtZGlzbWlzc2FibGUgLmNsb3NlLFxcbi5hbGVydC1kaXNtaXNzaWJsZSAuY2xvc2Uge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAtMnB4O1xcbiAgcmlnaHQ6IC0yMXB4O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5hbGVydC1zdWNjZXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmYwZDg7XFxuICBib3JkZXItY29sb3I6ICNkNmU5YzY7XFxuICBjb2xvcjogIzQ2ODg0NztcXG59XFxuLmFsZXJ0LXN1Y2Nlc3MgaHIge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2M5ZTJiMztcXG59XFxuLmFsZXJ0LXN1Y2Nlc3MgLmFsZXJ0LWxpbmsge1xcbiAgY29sb3I6ICMzNTY2MzU7XFxufVxcbi5hbGVydC1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XFxuICBib3JkZXItY29sb3I6ICNiY2U4ZjE7XFxuICBjb2xvcjogIzNhODdhZDtcXG59XFxuLmFsZXJ0LWluZm8gaHIge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2E2ZTFlYztcXG59XFxuLmFsZXJ0LWluZm8gLmFsZXJ0LWxpbmsge1xcbiAgY29sb3I6ICMyZDY5ODc7XFxufVxcbi5hbGVydC13YXJuaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmY2Y4ZTM7XFxuICBib3JkZXItY29sb3I6ICNmYmVlZDU7XFxuICBjb2xvcjogI2MwOTg1MztcXG59XFxuLmFsZXJ0LXdhcm5pbmcgaHIge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2Y4ZTViZTtcXG59XFxuLmFsZXJ0LXdhcm5pbmcgLmFsZXJ0LWxpbmsge1xcbiAgY29sb3I6ICNhNDdlM2M7XFxufVxcbi5hbGVydC1kYW5nZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcXG4gIGJvcmRlci1jb2xvcjogI2VlZDNkNztcXG4gIGNvbG9yOiAjYjk0YTQ4O1xcbn1cXG4uYWxlcnQtZGFuZ2VyIGhyIHtcXG4gIGJvcmRlci10b3AtY29sb3I6ICNlNmMxYzc7XFxufVxcbi5hbGVydC1kYW5nZXIgLmFsZXJ0LWxpbmsge1xcbiAgY29sb3I6ICM5NTNiMzk7XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBwcm9ncmVzcy1iYXItc3RyaXBlcyB7XFxuICBmcm9tIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNDBweCAwO1xcbiAgfVxcbiAgdG8ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcHJvZ3Jlc3MtYmFyLXN0cmlwZXMge1xcbiAgZnJvbSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDQwcHggMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgfVxcbn1cXG4ucHJvZ3Jlc3Mge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGhlaWdodDogMThweDtcXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLnByb2dyZXNzLWJhciB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgLW1vei10cmFuc2l0aW9uOiB3aWR0aCAwLjZzIGVhc2U7XFxuICAtbXMtdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgLW8tdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLFxcbi5wcm9ncmVzcy1iYXItc3RyaXBlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtc2l6ZTogNDBweCA0MHB4O1xcbn1cXG4ucHJvZ3Jlc3MuYWN0aXZlIC5wcm9ncmVzcy1iYXIsXFxuLnByb2dyZXNzLWJhci5hY3RpdmUge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHByb2dyZXNzLWJhci1zdHJpcGVzIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gIC1vLWFuaW1hdGlvbjogcHJvZ3Jlc3MtYmFyLXN0cmlwZXMgMnMgbGluZWFyIGluZmluaXRlO1xcbiAgYW5pbWF0aW9uOiBwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5wcm9ncmVzcy1iYXItc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY5NDA4O1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItaW5mbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI5QUNGO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLWluZm8ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOUI0NzlGO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEOTgzMUY7XFxufVxcbi5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXItZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbn1cXG4ubWVkaWEge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuLm1lZGlhOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5tZWRpYSxcXG4ubWVkaWEtYm9keSB7XFxuICB6b29tOiAxO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1lZGlhLWJvZHkge1xcbiAgd2lkdGg6IDEwMDAwcHg7XFxufVxcbi5tZWRpYS1vYmplY3Qge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5tZWRpYS1vYmplY3QuaW1nLXRodW1ibmFpbCB7XFxuICBtYXgtd2lkdGg6IG5vbmU7XFxufVxcbi5tZWRpYS1yaWdodCxcXG4ubWVkaWEgPiAucHVsbC1yaWdodCB7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxufVxcbi5tZWRpYS1sZWZ0LFxcbi5tZWRpYSA+IC5wdWxsLWxlZnQge1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuLm1lZGlhLWxlZnQsXFxuLm1lZGlhLXJpZ2h0LFxcbi5tZWRpYS1ib2R5IHtcXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbn1cXG4ubWVkaWEtbWlkZGxlIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5tZWRpYS1ib3R0b20ge1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXG59XFxuLm1lZGlhLWhlYWRpbmcge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLm1lZGlhLWxpc3Qge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuLmxpc3QtZ3JvdXAge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA0cHg7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0ge1xcbiAgY29sb3I6ICM1NTU7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyB7XFxuICBjb2xvcjogIzMzMztcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW06aG92ZXIsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbTpmb2N1cyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtOmZvY3VzIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNTU1O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG59XFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQsXFxuLmxpc3QtZ3JvdXAtaXRlbS5kaXNhYmxlZDpob3ZlcixcXG4ubGlzdC1ncm91cC1pdGVtLmRpc2FibGVkOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxuICBjb2xvcjogIzgwODA4MDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQ6aG92ZXIgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQ6Zm9jdXMgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLmRpc2FibGVkIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCxcXG4ubGlzdC1ncm91cC1pdGVtLmRpc2FibGVkOmhvdmVyIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCxcXG4ubGlzdC1ncm91cC1pdGVtLmRpc2FibGVkOmZvY3VzIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCB7XFxuICBjb2xvcjogIzgwODA4MDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6aG92ZXIsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6Zm9jdXMge1xcbiAgei1pbmRleDogMjtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q5MjMwRjtcXG4gIGJvcmRlci1jb2xvcjogI0Q5MjMwRjtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmhvdmVyIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpmb2N1cyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nID4gc21hbGwsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6aG92ZXIgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nID4gc21hbGwsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6Zm9jdXMgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nID4gc21hbGwsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nID4gLnNtYWxsLFxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmhvdmVyIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyA+IC5zbWFsbCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpmb2N1cyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcgPiAuc21hbGwge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpob3ZlciAubGlzdC1ncm91cC1pdGVtLXRleHQsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6Zm9jdXMgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcXG4gIGNvbG9yOiAjZmFjMGJhO1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3Mge1xcbiAgY29sb3I6ICM0Njg4NDc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tc3VjY2VzcyB7XFxuICBjb2xvcjogIzQ2ODg0NztcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0tc3VjY2VzcyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0tc3VjY2Vzczpob3ZlcixcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3M6aG92ZXIsXFxuYS5saXN0LWdyb3VwLWl0ZW0tc3VjY2Vzczpmb2N1cyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3M6Zm9jdXMge1xcbiAgY29sb3I6ICM0Njg4NDc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBlOWM2O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZSxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MuYWN0aXZlLFxcbmEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MuYWN0aXZlOmhvdmVyLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tc3VjY2Vzcy5hY3RpdmU6aG92ZXIsXFxuYS5saXN0LWdyb3VwLWl0ZW0tc3VjY2Vzcy5hY3RpdmU6Zm9jdXMsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Njg4NDc7XFxuICBib3JkZXItY29sb3I6ICM0Njg4NDc7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0taW5mbyB7XFxuICBjb2xvcjogIzNhODdhZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWluZm8sXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS1pbmZvIHtcXG4gIGNvbG9yOiAjM2E4N2FkO1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLWluZm8gLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvOmhvdmVyLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0taW5mbzpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvOmZvY3VzLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0taW5mbzpmb2N1cyB7XFxuICBjb2xvcjogIzNhODdhZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjNGUzZjM7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWluZm8uYWN0aXZlLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0taW5mby5hY3RpdmUsXFxuYS5saXN0LWdyb3VwLWl0ZW0taW5mby5hY3RpdmU6aG92ZXIsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS1pbmZvLmFjdGl2ZTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvLmFjdGl2ZTpmb2N1cyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLWluZm8uYWN0aXZlOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNhODdhZDtcXG4gIGJvcmRlci1jb2xvcjogIzNhODdhZDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nIHtcXG4gIGNvbG9yOiAjYzA5ODUzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0td2FybmluZyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcge1xcbiAgY29sb3I6ICNjMDk4NTM7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0td2FybmluZyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmc6aG92ZXIsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmc6Zm9jdXMsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nOmZvY3VzIHtcXG4gIGNvbG9yOiAjYzA5ODUzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZjJjYztcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0td2FybmluZy5hY3RpdmUsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nLmFjdGl2ZTpob3ZlcixcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcuYWN0aXZlOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcuYWN0aXZlOmZvY3VzLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0td2FybmluZy5hY3RpdmU6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzA5ODUzO1xcbiAgYm9yZGVyLWNvbG9yOiAjYzA5ODUzO1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLWRhbmdlciB7XFxuICBjb2xvcjogI2I5NGE0ODtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmRlZGU7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWRhbmdlcixcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLWRhbmdlciB7XFxuICBjb2xvcjogI2I5NGE0ODtcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyxcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLWRhbmdlciAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWRhbmdlcjpob3ZlcixcXG5idXR0b24ubGlzdC1ncm91cC1pdGVtLWRhbmdlcjpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXI6Zm9jdXMsXFxuYnV0dG9uLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXI6Zm9jdXMge1xcbiAgY29sb3I6ICNiOTRhNDg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJjY2NjO1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIuYWN0aXZlLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIuYWN0aXZlOmhvdmVyLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyLmFjdGl2ZTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIuYWN0aXZlOmZvY3VzLFxcbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyLmFjdGl2ZTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiOTRhNDg7XFxuICBib3JkZXItY29sb3I6ICNiOTRhNDg7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLXRleHQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjM7XFxufVxcbi5wYW5lbCB7XFxuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG4gIC1tb3otYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxuICBib3gtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG59XFxuLnBhbmVsLWJvZHkge1xcbiAgcGFkZGluZzogMTVweDtcXG59XFxuLnBhbmVsLWhlYWRpbmcge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsLWhlYWRpbmcgPiAuZHJvcGRvd24gLmRyb3Bkb3duLXRvZ2dsZSB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLnBhbmVsLXRpdGxlIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5wYW5lbC10aXRsZSA+IGEsXFxuLnBhbmVsLXRpdGxlID4gc21hbGwsXFxuLnBhbmVsLXRpdGxlID4gLnNtYWxsLFxcbi5wYW5lbC10aXRsZSA+IHNtYWxsID4gYSxcXG4ucGFuZWwtdGl0bGUgPiAuc21hbGwgPiBhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4ucGFuZWwtZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQ0ZDRkM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC5saXN0LWdyb3VwLFxcbi5wYW5lbCA+IC5wYW5lbC1jb2xsYXBzZSA+IC5saXN0LWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0sXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLmxpc3QtZ3JvdXAgLmxpc3QtZ3JvdXAtaXRlbSB7XFxuICBib3JkZXItd2lkdGg6IDFweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLnBhbmVsID4gLmxpc3QtZ3JvdXA6Zmlyc3QtY2hpbGQgLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAucGFuZWwtY29sbGFwc2UgPiAubGlzdC1ncm91cDpmaXJzdC1jaGlsZCAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3A6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFuZWwgPiAubGlzdC1ncm91cDpsYXN0LWNoaWxkIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAucGFuZWwtY29sbGFwc2UgPiAubGlzdC1ncm91cDpsYXN0LWNoaWxkIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsID4gLnBhbmVsLWhlYWRpbmcgKyAucGFuZWwtY29sbGFwc2UgPiAubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcXG59XFxuLnBhbmVsLWhlYWRpbmcgKyAubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDA7XFxufVxcbi5saXN0LWdyb3VwICsgLnBhbmVsLWZvb3RlciB7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUsXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLnRhYmxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZSBjYXB0aW9uLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlIGNhcHRpb24sXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLnRhYmxlIGNhcHRpb24ge1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aDpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFuZWwgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRib2R5Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRib2R5Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6bGFzdC1jaGlsZCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRmb290Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRmb290Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6bGFzdC1jaGlsZCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLFxcbi5wYW5lbCA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLXJlc3BvbnNpdmUsXFxuLnBhbmVsID4gLnRhYmxlICsgLnBhbmVsLWJvZHksXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgKyAucGFuZWwtYm9keSB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuLnBhbmVsID4gLnRhYmxlID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aCxcXG4ucGFuZWwgPiAudGFibGUgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkIHtcXG4gIGJvcmRlci10b3A6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCB7XFxuICBib3JkZXI6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci1sZWZ0OiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGQ6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItcmlnaHQ6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0cjpsYXN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0cjpsYXN0LWNoaWxkID4gdGgsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHI6bGFzdC1jaGlsZCA+IHRoIHtcXG4gIGJvcmRlci1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlIHtcXG4gIGJvcmRlcjogMDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbC1ncm91cCB7XFxuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xcbn1cXG4ucGFuZWwtZ3JvdXAgLnBhbmVsIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwgKyAucGFuZWwge1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4ucGFuZWwtZ3JvdXAgLnBhbmVsLWhlYWRpbmcge1xcbiAgYm9yZGVyLWJvdHRvbTogMDtcXG59XFxuLnBhbmVsLWdyb3VwIC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHksXFxuLnBhbmVsLWdyb3VwIC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLmxpc3QtZ3JvdXAge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwtZm9vdGVyIHtcXG4gIGJvcmRlci10b3A6IDA7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwtZm9vdGVyICsgLnBhbmVsLWNvbGxhcHNlIC5wYW5lbC1ib2R5IHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xcbn1cXG4ucGFuZWwtZGVmYXVsdCB7XFxuICBib3JkZXItY29sb3I6ICNkZGQ7XFxufVxcbi5wYW5lbC1kZWZhdWx0ID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICM0NDQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkNGQ0ZDO1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkO1xcbn1cXG4ucGFuZWwtZGVmYXVsdCA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2RkZDtcXG59XFxuLnBhbmVsLWRlZmF1bHQgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNGQ0ZDRkM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xcbn1cXG4ucGFuZWwtZGVmYXVsdCA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjZGRkO1xcbn1cXG4ucGFuZWwtcHJpbWFyeSB7XFxuICBib3JkZXItY29sb3I6ICNEOTIzMEY7XFxufVxcbi5wYW5lbC1wcmltYXJ5ID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDkyMzBGO1xcbiAgYm9yZGVyLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4ucGFuZWwtcHJpbWFyeSA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI0Q5MjMwRjtcXG59XFxuLnBhbmVsLXByaW1hcnkgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNEOTIzMEY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ucGFuZWwtcHJpbWFyeSA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjRDkyMzBGO1xcbn1cXG4ucGFuZWwtc3VjY2VzcyB7XFxuICBib3JkZXItY29sb3I6ICM0Njk0MDg7XFxufVxcbi5wYW5lbC1zdWNjZXNzID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY5NDA4O1xcbiAgYm9yZGVyLWNvbG9yOiAjNDY5NDA4O1xcbn1cXG4ucGFuZWwtc3VjY2VzcyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzQ2OTQwODtcXG59XFxuLnBhbmVsLXN1Y2Nlc3MgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICM0Njk0MDg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ucGFuZWwtc3VjY2VzcyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjNDY5NDA4O1xcbn1cXG4ucGFuZWwtaW5mbyB7XFxuICBib3JkZXItY29sb3I6ICMwMjlBQ0Y7XFxufVxcbi5wYW5lbC1pbmZvID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI5QUNGO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDI5QUNGO1xcbn1cXG4ucGFuZWwtaW5mbyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzAyOUFDRjtcXG59XFxuLnBhbmVsLWluZm8gPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICMwMjlBQ0Y7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ucGFuZWwtaW5mbyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjMDI5QUNGO1xcbn1cXG4ucGFuZWwtd2FybmluZyB7XFxuICBib3JkZXItY29sb3I6ICM5QjQ3OUY7XFxufVxcbi5wYW5lbC13YXJuaW5nID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOUI0NzlGO1xcbiAgYm9yZGVyLWNvbG9yOiAjOUI0NzlGO1xcbn1cXG4ucGFuZWwtd2FybmluZyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzlCNDc5RjtcXG59XFxuLnBhbmVsLXdhcm5pbmcgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICM5QjQ3OUY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ucGFuZWwtd2FybmluZyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjOUI0NzlGO1xcbn1cXG4ucGFuZWwtZGFuZ2VyIHtcXG4gIGJvcmRlci1jb2xvcjogI0Q5ODMxRjtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q5ODMxRjtcXG4gIGJvcmRlci1jb2xvcjogI0Q5ODMxRjtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI0Q5ODMxRjtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nIC5iYWRnZSB7XFxuICBjb2xvcjogI0Q5ODMxRjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcbi5wYW5lbC1kYW5nZXIgPiAucGFuZWwtZm9vdGVyICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0Q5ODMxRjtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUgLmVtYmVkLXJlc3BvbnNpdmUtaXRlbSxcXG4uZW1iZWQtcmVzcG9uc2l2ZSBpZnJhbWUsXFxuLmVtYmVkLXJlc3BvbnNpdmUgZW1iZWQsXFxuLmVtYmVkLXJlc3BvbnNpdmUgb2JqZWN0LFxcbi5lbWJlZC1yZXNwb25zaXZlIHZpZGVvIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMDtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUtMTZieTkge1xcbiAgcGFkZGluZy1ib3R0b206IDU2LjI1JTtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUtNGJ5MyB7XFxuICBwYWRkaW5nLWJvdHRvbTogNzUlO1xcbn1cXG4ud2VsbCB7XFxuICBtaW4taGVpZ2h0OiAyMHB4O1xcbiAgcGFkZGluZzogMTlweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2UzZTNlMztcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxufVxcbi53ZWxsIGJsb2NrcXVvdGUge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbn1cXG4ud2VsbC1sZyB7XFxuICBwYWRkaW5nOiAyNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG4ud2VsbC1zbSB7XFxuICBwYWRkaW5nOiA5cHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbi5jbG9zZSB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBmb250LXNpemU6IDE5LjVweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBjb2xvcjogIzAwMDtcXG4gIHRleHQtc2hhZG93OiAwIDFweCAwICNmZmY7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MjApO1xcbiAgLW1zLWZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhKE9wYWNpdHk9MjApO1xcbiAgb3BhY2l0eTogMC4yO1xcbn1cXG4uY2xvc2U6aG92ZXIsXFxuLmNsb3NlOmZvY3VzIHtcXG4gIGNvbG9yOiAjMDAwO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTUwKTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTUwKTtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuYnV0dG9uLmNsb3NlIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogMDtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuLm1vZGFsLW9wZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1vZGFsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTA1MDtcXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5tb2RhbC5mYWRlIC5tb2RhbC1kaWFsb2cge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjUlKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjUlKTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNSUpO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1JSk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XFxuICAtbW96LXRyYW5zaXRpb246IC1tb3otdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiAtby10cmFuc2Zvcm0gMC4zcyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xcbn1cXG4ubW9kYWwuaW4gLm1vZGFsLWRpYWxvZyB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG59XFxuLm1vZGFsLW9wZW4gLm1vZGFsIHtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcbi5tb2RhbC1kaWFsb2cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXJnaW46IDEwcHg7XFxufVxcbi5tb2RhbC1jb250ZW50IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDNweCA5cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAwIDNweCA5cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm94LXNoYWRvdzogMCAzcHggOXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICBvdXRsaW5lOiAwO1xcbn1cXG4ubW9kYWwtYmFja2Ryb3Age1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTA0MDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxufVxcbi5tb2RhbC1iYWNrZHJvcC5mYWRlIHtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTApO1xcbiAgb3BhY2l0eTogMDtcXG59XFxuLm1vZGFsLWJhY2tkcm9wLmluIHtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT01MCk7XFxuICAtbXMtZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT01MCk7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcbi5tb2RhbC1oZWFkZXIge1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xcbn1cXG4ubW9kYWwtaGVhZGVyIC5jbG9zZSB7XFxuICBtYXJnaW4tdG9wOiAtMnB4O1xcbn1cXG4ubW9kYWwtdGl0bGUge1xcbiAgbWFyZ2luOiAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxufVxcbi5tb2RhbC1ib2R5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxufVxcbi5tb2RhbC1mb290ZXIge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNWU1ZTU7XFxufVxcbi5tb2RhbC1mb290ZXIgLmJ0biArIC5idG4ge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5tb2RhbC1mb290ZXIgLmJ0bi1ncm91cCAuYnRuICsgLmJ0biB7XFxuICBtYXJnaW4tbGVmdDogLTFweDtcXG59XFxuLm1vZGFsLWZvb3RlciAuYnRuLWJsb2NrICsgLmJ0bi1ibG9jayB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLm1vZGFsLXNjcm9sbGJhci1tZWFzdXJlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTk5OTlweDtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubW9kYWwtZGlhbG9nIHtcXG4gICAgd2lkdGg6IDYwMHB4O1xcbiAgICBtYXJnaW46IDMwcHggYXV0bztcXG4gIH1cXG4gIC5tb2RhbC1jb250ZW50IHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgLW1vei1ib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgYm94LXNoYWRvdzogMCA1cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB9XFxuICAubW9kYWwtc20ge1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcbiAgLm1vZGFsLWxnIHtcXG4gICAgd2lkdGg6IDkwMHB4O1xcbiAgfVxcbn1cXG4udG9vbHRpcCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDcwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LWZhbWlseTogXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIGxpbmUtYnJlYWs6IGF1dG87XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB0ZXh0LWFsaWduOiBzdGFydDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbiAgd29yZC1icmVhazogbm9ybWFsO1xcbiAgd29yZC1zcGFjaW5nOiBub3JtYWw7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTApO1xcbiAgb3BhY2l0eTogMDtcXG59XFxuLnRvb2x0aXAuaW4ge1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTkwKTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTkwKTtcXG4gIG9wYWNpdHk6IDAuOTtcXG59XFxuLnRvb2x0aXAudG9wIHtcXG4gIG1hcmdpbi10b3A6IC0zcHg7XFxuICBwYWRkaW5nOiA1cHggMDtcXG59XFxuLnRvb2x0aXAucmlnaHQge1xcbiAgbWFyZ2luLWxlZnQ6IDNweDtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbn1cXG4udG9vbHRpcC5ib3R0b20ge1xcbiAgbWFyZ2luLXRvcDogM3B4O1xcbiAgcGFkZGluZzogNXB4IDA7XFxufVxcbi50b29sdGlwLmxlZnQge1xcbiAgbWFyZ2luLWxlZnQ6IC0zcHg7XFxuICBwYWRkaW5nOiAwIDVweDtcXG59XFxuLnRvb2x0aXAtaW5uZXIge1xcbiAgbWF4LXdpZHRoOiAyMDBweDtcXG4gIHBhZGRpbmc6IDNweCA4cHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi50b29sdGlwLWFycm93IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxufVxcbi50b29sdGlwLnRvcCAudG9vbHRpcC1hcnJvdyB7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTVweDtcXG4gIGJvcmRlci13aWR0aDogNXB4IDVweCAwO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzAwMDtcXG59XFxuLnRvb2x0aXAudG9wLWxlZnQgLnRvb2x0aXAtYXJyb3cge1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDVweDtcXG4gIG1hcmdpbi1ib3R0b206IC01cHg7XFxuICBib3JkZXItd2lkdGg6IDVweCA1cHggMDtcXG4gIGJvcmRlci10b3AtY29sb3I6ICMwMDA7XFxufVxcbi50b29sdGlwLnRvcC1yaWdodCAudG9vbHRpcC1hcnJvdyB7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiA1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHggNXB4IDA7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjMDAwO1xcbn1cXG4udG9vbHRpcC5yaWdodCAudG9vbHRpcC1hcnJvdyB7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDA7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHggNXB4IDVweCAwO1xcbiAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjMDAwO1xcbn1cXG4udG9vbHRpcC5sZWZ0IC50b29sdGlwLWFycm93IHtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDA7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHggMCA1cHggNXB4O1xcbiAgYm9yZGVyLWxlZnQtY29sb3I6ICMwMDA7XFxufVxcbi50b29sdGlwLmJvdHRvbSAudG9vbHRpcC1hcnJvdyB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTVweDtcXG4gIGJvcmRlci13aWR0aDogMCA1cHggNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDtcXG59XFxuLnRvb2x0aXAuYm90dG9tLWxlZnQgLnRvb2x0aXAtYXJyb3cge1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDVweDtcXG4gIG1hcmdpbi10b3A6IC01cHg7XFxuICBib3JkZXItd2lkdGg6IDAgNXB4IDVweDtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICMwMDA7XFxufVxcbi50b29sdGlwLmJvdHRvbS1yaWdodCAudG9vbHRpcC1hcnJvdyB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiA1cHg7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiAwIDVweCA1cHg7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjMDAwO1xcbn1cXG4ucG9wb3ZlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTA2MDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBtYXgtd2lkdGg6IDI3NnB4O1xcbiAgcGFkZGluZzogMXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICBsaW5lLWJyZWFrOiBhdXRvO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgdGV4dC1hbGlnbjogc3RhcnQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LXNoYWRvdzogbm9uZTtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcXG4gIHdvcmQtYnJlYWs6IG5vcm1hbDtcXG4gIHdvcmQtc3BhY2luZzogbm9ybWFsO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAwIDVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG4ucG9wb3Zlci50b3Age1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxufVxcbi5wb3BvdmVyLnJpZ2h0IHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4ucG9wb3Zlci5ib3R0b20ge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuLnBvcG92ZXIubGVmdCB7XFxuICBtYXJnaW4tbGVmdDogLTEwcHg7XFxufVxcbi5wb3BvdmVyLXRpdGxlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDhweCAxNHB4O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxufVxcbi5wb3BvdmVyLWNvbnRlbnQge1xcbiAgcGFkZGluZzogOXB4IDE0cHg7XFxufVxcbi5wb3BvdmVyID4gLmFycm93LFxcbi5wb3BvdmVyID4gLmFycm93OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG59XFxuLnBvcG92ZXIgPiAuYXJyb3cge1xcbiAgYm9yZGVyLXdpZHRoOiAxMXB4O1xcbn1cXG4ucG9wb3ZlciA+IC5hcnJvdzphZnRlciB7XFxuICBib3JkZXItd2lkdGg6IDEwcHg7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG59XFxuLnBvcG92ZXIudG9wID4gLmFycm93IHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTFweDtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjOTk5OTk5O1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGJvdHRvbTogLTExcHg7XFxufVxcbi5wb3BvdmVyLnRvcCA+IC5hcnJvdzphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBib3R0b206IDFweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTBweDtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjZmZmO1xcbn1cXG4ucG9wb3Zlci5yaWdodCA+IC5hcnJvdyB7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IC0xMXB4O1xcbiAgbWFyZ2luLXRvcDogLTExcHg7XFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogIzk5OTk5OTtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG59XFxuLnBvcG92ZXIucmlnaHQgPiAuYXJyb3c6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgbGVmdDogMXB4O1xcbiAgYm90dG9tOiAtMTBweDtcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xcbiAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcbn1cXG4ucG9wb3Zlci5ib3R0b20gPiAuYXJyb3cge1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC0xMXB4O1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMDtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICM5OTk5OTk7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgdG9wOiAtMTFweDtcXG59XFxuLnBvcG92ZXIuYm90dG9tID4gLmFycm93OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIHRvcDogMXB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xcbiAgYm9yZGVyLXRvcC13aWR0aDogMDtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICNmZmY7XFxufVxcbi5wb3BvdmVyLmxlZnQgPiAuYXJyb3cge1xcbiAgdG9wOiA1MCU7XFxuICByaWdodDogLTExcHg7XFxuICBtYXJnaW4tdG9wOiAtMTFweDtcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjOTk5OTk5O1xcbiAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxufVxcbi5wb3BvdmVyLmxlZnQgPiAuYXJyb3c6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgcmlnaHQ6IDFweDtcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmZmO1xcbiAgYm90dG9tOiAtMTBweDtcXG59XFxuLmNhcm91c2VsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmNhcm91c2VsLWlubmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLml0ZW0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogMC42cyBlYXNlLWluLW91dCBsZWZ0O1xcbiAgLW1vei10cmFuc2l0aW9uOiAwLjZzIGVhc2UtaW4tb3V0IGxlZnQ7XFxuICAtbXMtdHJhbnNpdGlvbjogMC42cyBlYXNlLWluLW91dCBsZWZ0O1xcbiAgLW8tdHJhbnNpdGlvbjogMC42cyBlYXNlLWluLW91dCBsZWZ0O1xcbiAgdHJhbnNpdGlvbjogMC42cyBlYXNlLWluLW91dCBsZWZ0O1xcbn1cXG4uY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGltZyxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSA+IGEgPiBpbWcge1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbkBtZWRpYSBhbGwgYW5kICh0cmFuc2Zvcm0tM2QpLCAoLXdlYmtpdC10cmFuc2Zvcm0tM2QpIHtcXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtIHtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjZzIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IC1tb3otdHJhbnNmb3JtIDAuNnMgZWFzZS1pbi1vdXQ7XFxuICAgIC1vLXRyYW5zaXRpb246IC1vLXRyYW5zZm9ybSAwLjZzIGVhc2UtaW4tb3V0O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC42cyBlYXNlLWluLW91dDtcXG4gICAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIC1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIC13ZWJraXQtcGVyc3BlY3RpdmU6IDEwMDBweDtcXG4gICAgLW1vei1wZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgICBwZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgfVxcbiAgLmNhcm91c2VsLWlubmVyID4gLml0ZW0ubmV4dCxcXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLmFjdGl2ZS5yaWdodCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKTtcXG4gICAgbGVmdDogMDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLnByZXYsXFxuICAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbS5hY3RpdmUubGVmdCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApO1xcbiAgICBsZWZ0OiAwO1xcbiAgfVxcbiAgLmNhcm91c2VsLWlubmVyID4gLml0ZW0ubmV4dC5sZWZ0LFxcbiAgLmNhcm91c2VsLWlubmVyID4gLml0ZW0ucHJldi5yaWdodCxcXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLmFjdGl2ZSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcXG4gICAgbGVmdDogMDtcXG4gIH1cXG59XFxuLmNhcm91c2VsLWlubmVyID4gLmFjdGl2ZSxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAubmV4dCxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAucHJldiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLmFjdGl2ZSB7XFxuICBsZWZ0OiAwO1xcbn1cXG4uY2Fyb3VzZWwtaW5uZXIgPiAubmV4dCxcXG4uY2Fyb3VzZWwtaW5uZXIgPiAucHJldiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLm5leHQge1xcbiAgbGVmdDogMTAwJTtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLnByZXYge1xcbiAgbGVmdDogLTEwMCU7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5uZXh0LmxlZnQsXFxuLmNhcm91c2VsLWlubmVyID4gLnByZXYucmlnaHQge1xcbiAgbGVmdDogMDtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLmFjdGl2ZS5sZWZ0IHtcXG4gIGxlZnQ6IC0xMDAlO1xcbn1cXG4uY2Fyb3VzZWwtaW5uZXIgPiAuYWN0aXZlLnJpZ2h0IHtcXG4gIGxlZnQ6IDEwMCU7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTUlO1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTUwKTtcXG4gIC1tcy1maWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTUwKTtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbC5sZWZ0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC41KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC41KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDAsIDAsIDAsIDAuNSkgMCUsIHJnYmEoMCwgMCwgMCwgMC4wMDAxKSAxMDAlKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyM4MDAwMDAwMCcsIGVuZENvbG9yc3RyPScjMDAwMDAwMDAnLCBHcmFkaWVudFR5cGU9MSk7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sLnJpZ2h0IHtcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogMDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC4wMDAxKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjUpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC4wMDAxKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjUpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDAsIDAsIDAsIDAuMDAwMSkgMCUsIHJnYmEoMCwgMCwgMCwgMC41KSAxMDAlKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyMwMDAwMDAwMCcsIGVuZENvbG9yc3RyPScjODAwMDAwMDAnLCBHcmFkaWVudFR5cGU9MSk7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sOmhvdmVyLFxcbi5jYXJvdXNlbC1jb250cm9sOmZvY3VzIHtcXG4gIG91dGxpbmU6IDA7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT05MCk7XFxuICAtbXMtZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT05MCk7XFxuICBvcGFjaXR5OiAwLjk7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsXFxuLmNhcm91c2VsLWNvbnRyb2wgLmljb24tbmV4dCxcXG4uY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCxcXG4uY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIHotaW5kZXg6IDU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsXFxuLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQge1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1uZXh0LFxcbi5jYXJvdXNlbC1jb250cm9sIC5nbHlwaGljb24tY2hldnJvbi1yaWdodCB7XFxuICByaWdodDogNTAlO1xcbiAgbWFyZ2luLXJpZ2h0OiAtMTBweDtcXG59XFxuLmNhcm91c2VsLWNvbnRyb2wgLmljb24tcHJldixcXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1uZXh0IHtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBmb250LWZhbWlseTogc2VyaWY7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXY6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjAzOSc7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjAzQSc7XFxufVxcbi5jYXJvdXNlbC1pbmRpY2F0b3JzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMTBweDtcXG4gIGxlZnQ6IDUwJTtcXG4gIHotaW5kZXg6IDE1O1xcbiAgd2lkdGg6IDYwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtMzAlO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmNhcm91c2VsLWluZGljYXRvcnMgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBtYXJnaW46IDFweDtcXG4gIHRleHQtaW5kZW50OiAtOTk5cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAgXFxcXDk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbn1cXG4uY2Fyb3VzZWwtaW5kaWNhdG9ycyAuYWN0aXZlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHdpZHRoOiAxMnB4O1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuLmNhcm91c2VsLWNhcHRpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTUlO1xcbiAgcmlnaHQ6IDE1JTtcXG4gIGJvdHRvbTogMjBweDtcXG4gIHotaW5kZXg6IDEwO1xcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcbi5jYXJvdXNlbC1jYXB0aW9uIC5idG4ge1xcbiAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCxcXG4gIC5jYXJvdXNlbC1jb250cm9sIC5nbHlwaGljb24tY2hldnJvbi1yaWdodCxcXG4gIC5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsXFxuICAuY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1uZXh0IHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1jb250cm9sIC5nbHlwaGljb24tY2hldnJvbi1sZWZ0LFxcbiAgLmNhcm91c2VsLWNvbnRyb2wgLmljb24tcHJldiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1jb250cm9sIC5nbHlwaGljb24tY2hldnJvbi1yaWdodCxcXG4gIC5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcbiAgfVxcbiAgLmNhcm91c2VsLWNhcHRpb24ge1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHJpZ2h0OiAyMCU7XFxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xcbiAgfVxcbiAgLmNhcm91c2VsLWluZGljYXRvcnMge1xcbiAgICBib3R0b206IDIwcHg7XFxuICB9XFxufVxcbi5jbGVhcmZpeCxcXG4uZGwtaG9yaXpvbnRhbCBkZCxcXG4uY29udGFpbmVyLFxcbi5jb250YWluZXItZmx1aWQsXFxuLnJvdyxcXG4uZm9ybS1ob3Jpem9udGFsIC5mb3JtLWdyb3VwLFxcbi5idG4tdG9vbGJhcixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cCxcXG4ubmF2LFxcbi5uYXZiYXIsXFxuLm5hdmJhci1oZWFkZXIsXFxuLm5hdmJhci1jb2xsYXBzZSxcXG4ucGFnZXIsXFxuLnBhbmVsLWJvZHksXFxuLm1vZGFsLWhlYWRlcixcXG4ubW9kYWwtZm9vdGVyIHtcXG4gICp6b29tOiBleHByZXNzaW9uKHRoaXMucnVudGltZVN0eWxlLnpvb209JzEnLCB0aGlzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpLnN0eWxlLmNzc1RleHQ9J2NsZWFyOmJvdGg7Zm9udDowLzAgc2VyaWYnKTtcXG4gIHpvb206IDEgIWllO1xcbn1cXG4uY2xlYXJmaXg6YmVmb3JlLFxcbi5jbGVhcmZpeDphZnRlcixcXG4uZGwtaG9yaXpvbnRhbCBkZDpiZWZvcmUsXFxuLmRsLWhvcml6b250YWwgZGQ6YWZ0ZXIsXFxuLmNvbnRhaW5lcjpiZWZvcmUsXFxuLmNvbnRhaW5lcjphZnRlcixcXG4uY29udGFpbmVyLWZsdWlkOmJlZm9yZSxcXG4uY29udGFpbmVyLWZsdWlkOmFmdGVyLFxcbi5yb3c6YmVmb3JlLFxcbi5yb3c6YWZ0ZXIsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDpiZWZvcmUsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDphZnRlcixcXG4uYnRuLXRvb2xiYXI6YmVmb3JlLFxcbi5idG4tdG9vbGJhcjphZnRlcixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpiZWZvcmUsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6YWZ0ZXIsXFxuLm5hdjpiZWZvcmUsXFxuLm5hdjphZnRlcixcXG4ubmF2YmFyOmJlZm9yZSxcXG4ubmF2YmFyOmFmdGVyLFxcbi5uYXZiYXItaGVhZGVyOmJlZm9yZSxcXG4ubmF2YmFyLWhlYWRlcjphZnRlcixcXG4ubmF2YmFyLWNvbGxhcHNlOmJlZm9yZSxcXG4ubmF2YmFyLWNvbGxhcHNlOmFmdGVyLFxcbi5wYWdlcjpiZWZvcmUsXFxuLnBhZ2VyOmFmdGVyLFxcbi5wYW5lbC1ib2R5OmJlZm9yZSxcXG4ucGFuZWwtYm9keTphZnRlcixcXG4ubW9kYWwtaGVhZGVyOmJlZm9yZSxcXG4ubW9kYWwtaGVhZGVyOmFmdGVyLFxcbi5tb2RhbC1mb290ZXI6YmVmb3JlLFxcbi5tb2RhbC1mb290ZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgZGlzcGxheTogdGFibGU7XFxufVxcbi5jbGVhcmZpeDphZnRlcixcXG4uZGwtaG9yaXpvbnRhbCBkZDphZnRlcixcXG4uY29udGFpbmVyOmFmdGVyLFxcbi5jb250YWluZXItZmx1aWQ6YWZ0ZXIsXFxuLnJvdzphZnRlcixcXG4uZm9ybS1ob3Jpem9udGFsIC5mb3JtLWdyb3VwOmFmdGVyLFxcbi5idG4tdG9vbGJhcjphZnRlcixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDphZnRlcixcXG4ubmF2OmFmdGVyLFxcbi5uYXZiYXI6YWZ0ZXIsXFxuLm5hdmJhci1oZWFkZXI6YWZ0ZXIsXFxuLm5hdmJhci1jb2xsYXBzZTphZnRlcixcXG4ucGFnZXI6YWZ0ZXIsXFxuLnBhbmVsLWJvZHk6YWZ0ZXIsXFxuLm1vZGFsLWhlYWRlcjphZnRlcixcXG4ubW9kYWwtZm9vdGVyOmFmdGVyIHtcXG4gIGNsZWFyOiBib3RoO1xcbn1cXG4uY2xlYXJmaXg6YmVmb3JlLFxcbi5jbGVhcmZpeDphZnRlcixcXG4uZGwtaG9yaXpvbnRhbCBkZDpiZWZvcmUsXFxuLmRsLWhvcml6b250YWwgZGQ6YWZ0ZXIsXFxuLmNvbnRhaW5lcjpiZWZvcmUsXFxuLmNvbnRhaW5lcjphZnRlcixcXG4uY29udGFpbmVyLWZsdWlkOmJlZm9yZSxcXG4uY29udGFpbmVyLWZsdWlkOmFmdGVyLFxcbi5yb3c6YmVmb3JlLFxcbi5yb3c6YWZ0ZXIsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDpiZWZvcmUsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDphZnRlcixcXG4uYnRuLXRvb2xiYXI6YmVmb3JlLFxcbi5idG4tdG9vbGJhcjphZnRlcixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpiZWZvcmUsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6YWZ0ZXIsXFxuLm5hdjpiZWZvcmUsXFxuLm5hdjphZnRlcixcXG4ubmF2YmFyOmJlZm9yZSxcXG4ubmF2YmFyOmFmdGVyLFxcbi5uYXZiYXItaGVhZGVyOmJlZm9yZSxcXG4ubmF2YmFyLWhlYWRlcjphZnRlcixcXG4ubmF2YmFyLWNvbGxhcHNlOmJlZm9yZSxcXG4ubmF2YmFyLWNvbGxhcHNlOmFmdGVyLFxcbi5wYWdlcjpiZWZvcmUsXFxuLnBhZ2VyOmFmdGVyLFxcbi5wYW5lbC1ib2R5OmJlZm9yZSxcXG4ucGFuZWwtYm9keTphZnRlcixcXG4ubW9kYWwtaGVhZGVyOmJlZm9yZSxcXG4ubW9kYWwtaGVhZGVyOmFmdGVyLFxcbi5tb2RhbC1mb290ZXI6YmVmb3JlLFxcbi5tb2RhbC1mb290ZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG59XFxuLmNsZWFyZml4OmFmdGVyLFxcbi5kbC1ob3Jpem9udGFsIGRkOmFmdGVyLFxcbi5jb250YWluZXI6YWZ0ZXIsXFxuLmNvbnRhaW5lci1mbHVpZDphZnRlcixcXG4ucm93OmFmdGVyLFxcbi5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXA6YWZ0ZXIsXFxuLmJ0bi10b29sYmFyOmFmdGVyLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwOmFmdGVyLFxcbi5uYXY6YWZ0ZXIsXFxuLm5hdmJhcjphZnRlcixcXG4ubmF2YmFyLWhlYWRlcjphZnRlcixcXG4ubmF2YmFyLWNvbGxhcHNlOmFmdGVyLFxcbi5wYWdlcjphZnRlcixcXG4ucGFuZWwtYm9keTphZnRlcixcXG4ubW9kYWwtaGVhZGVyOmFmdGVyLFxcbi5tb2RhbC1mb290ZXI6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcbi5jZW50ZXItYmxvY2sge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnB1bGwtcmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XFxufVxcbi5wdWxsLWxlZnQge1xcbiAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG59XFxuLmhpZGUge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG4uc2hvdyB7XFxuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbn1cXG4uaW52aXNpYmxlIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuLnRleHQtaGlkZSB7XFxuICBmb250OiAwLzAgYTtcXG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDA7XFxufVxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG4uYWZmaXgge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbn1cXG5ALW1zLXZpZXdwb3J0IHtcXG4gIHdpZHRoOiBkZXZpY2Utd2lkdGg7XFxufVxcbi52aXNpYmxlLXhzLFxcbi52aXNpYmxlLXNtLFxcbi52aXNpYmxlLW1kLFxcbi52aXNpYmxlLWxnIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLnZpc2libGUteHMtYmxvY2ssXFxuLnZpc2libGUteHMtaW5saW5lLFxcbi52aXNpYmxlLXhzLWlubGluZS1ibG9jayxcXG4udmlzaWJsZS1zbS1ibG9jayxcXG4udmlzaWJsZS1zbS1pbmxpbmUsXFxuLnZpc2libGUtc20taW5saW5lLWJsb2NrLFxcbi52aXNpYmxlLW1kLWJsb2NrLFxcbi52aXNpYmxlLW1kLWlubGluZSxcXG4udmlzaWJsZS1tZC1pbmxpbmUtYmxvY2ssXFxuLnZpc2libGUtbGctYmxvY2ssXFxuLnZpc2libGUtbGctaW5saW5lLFxcbi52aXNpYmxlLWxnLWlubGluZS1ibG9jayB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnZpc2libGUteHMge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS14cyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0ci52aXNpYmxlLXhzIHtcXG4gICAgZGlzcGxheTogdGFibGUtcm93ICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0aC52aXNpYmxlLXhzLFxcbiAgdGQudmlzaWJsZS14cyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAudmlzaWJsZS14cy1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnZpc2libGUteHMtaW5saW5lIHtcXG4gICAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnZpc2libGUteHMtaW5saW5lLWJsb2NrIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAudmlzaWJsZS1zbSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0YWJsZS52aXNpYmxlLXNtIHtcXG4gICAgZGlzcGxheTogdGFibGUgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRyLnZpc2libGUtc20ge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1yb3cgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRoLnZpc2libGUtc20sXFxuICB0ZC52aXNpYmxlLXNtIHtcXG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTFweCkge1xcbiAgLnZpc2libGUtc20tYmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTFweCkge1xcbiAgLnZpc2libGUtc20taW5saW5lIHtcXG4gICAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAudmlzaWJsZS1zbS1pbmxpbmUtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XFxuICAudmlzaWJsZS1tZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0YWJsZS52aXNpYmxlLW1kIHtcXG4gICAgZGlzcGxheTogdGFibGUgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRyLnZpc2libGUtbWQge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1yb3cgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRoLnZpc2libGUtbWQsXFxuICB0ZC52aXNpYmxlLW1kIHtcXG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIGFuZCAobWF4LXdpZHRoOiAxMTk5cHgpIHtcXG4gIC52aXNpYmxlLW1kLWJsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XFxuICAudmlzaWJsZS1tZC1pbmxpbmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XFxuICAudmlzaWJsZS1tZC1pbmxpbmUtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLnZpc2libGUtbGcge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS1sZyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0ci52aXNpYmxlLWxnIHtcXG4gICAgZGlzcGxheTogdGFibGUtcm93ICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0aC52aXNpYmxlLWxnLFxcbiAgdGQudmlzaWJsZS1sZyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLnZpc2libGUtbGctYmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAudmlzaWJsZS1sZy1pbmxpbmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLnZpc2libGUtbGctaW5saW5lLWJsb2NrIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLmhpZGRlbi14cyB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogOTkxcHgpIHtcXG4gIC5oaWRkZW4tc20ge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkgYW5kIChtYXgtd2lkdGg6IDExOTlweCkge1xcbiAgLmhpZGRlbi1tZCB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLmhpZGRlbi1sZyB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuLnZpc2libGUtcHJpbnQge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5AbWVkaWEgcHJpbnQge1xcbiAgLnZpc2libGUtcHJpbnQge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS1wcmludCB7XFxuICAgIGRpc3BsYXk6IHRhYmxlICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0ci52aXNpYmxlLXByaW50IHtcXG4gICAgZGlzcGxheTogdGFibGUtcm93ICFpbXBvcnRhbnQ7XFxuICB9XFxuICB0aC52aXNpYmxlLXByaW50LFxcbiAgdGQudmlzaWJsZS1wcmludCB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuLnZpc2libGUtcHJpbnQtYmxvY2sge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5AbWVkaWEgcHJpbnQge1xcbiAgLnZpc2libGUtcHJpbnQtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG4udmlzaWJsZS1wcmludC1pbmxpbmUge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5AbWVkaWEgcHJpbnQge1xcbiAgLnZpc2libGUtcHJpbnQtaW5saW5lIHtcXG4gICAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbi52aXNpYmxlLXByaW50LWlubGluZS1ibG9jayB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbkBtZWRpYSBwcmludCB7XFxuICAudmlzaWJsZS1wcmludC1pbmxpbmUtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIHByaW50IHtcXG4gIC5oaWRkZW4tcHJpbnQge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbi8qIE1JWElOUyAqL1xcbi8qIGJ5IGh0dHBzOi8vYml0YnVja2V0Lm9yZy93b3d1YS8gKi9cXG4uaW5saW5lYmxvY2sge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gIHpvb206IDEgIWllO1xcbiAgZGlzcGxheTogaW5saW5lICFpZTtcXG59XFxuLmNsZWFyZml4LFxcbi5kbC1ob3Jpem9udGFsIGRkLFxcbi5jb250YWluZXIsXFxuLmNvbnRhaW5lci1mbHVpZCxcXG4ucm93LFxcbi5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXAsXFxuLmJ0bi10b29sYmFyLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwLFxcbi5uYXYsXFxuLm5hdmJhcixcXG4ubmF2YmFyLWhlYWRlcixcXG4ubmF2YmFyLWNvbGxhcHNlLFxcbi5wYWdlcixcXG4ucGFuZWwtYm9keSxcXG4ubW9kYWwtaGVhZGVyLFxcbi5tb2RhbC1mb290ZXIge1xcbiAgKnpvb206IGV4cHJlc3Npb24odGhpcy5ydW50aW1lU3R5bGUuem9vbT0nMScsIHRoaXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSkuc3R5bGUuY3NzVGV4dD0nY2xlYXI6Ym90aDtmb250OjAvMCBzZXJpZicpO1xcbiAgem9vbTogMSAhaWU7XFxufVxcbi5jbGVhcmZpeDpiZWZvcmUsXFxuLmNsZWFyZml4OmFmdGVyLFxcbi5kbC1ob3Jpem9udGFsIGRkOmJlZm9yZSxcXG4uZGwtaG9yaXpvbnRhbCBkZDphZnRlcixcXG4uY29udGFpbmVyOmJlZm9yZSxcXG4uY29udGFpbmVyOmFmdGVyLFxcbi5jb250YWluZXItZmx1aWQ6YmVmb3JlLFxcbi5jb250YWluZXItZmx1aWQ6YWZ0ZXIsXFxuLnJvdzpiZWZvcmUsXFxuLnJvdzphZnRlcixcXG4uZm9ybS1ob3Jpem9udGFsIC5mb3JtLWdyb3VwOmJlZm9yZSxcXG4uZm9ybS1ob3Jpem9udGFsIC5mb3JtLWdyb3VwOmFmdGVyLFxcbi5idG4tdG9vbGJhcjpiZWZvcmUsXFxuLmJ0bi10b29sYmFyOmFmdGVyLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwOmJlZm9yZSxcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDphZnRlcixcXG4ubmF2OmJlZm9yZSxcXG4ubmF2OmFmdGVyLFxcbi5uYXZiYXI6YmVmb3JlLFxcbi5uYXZiYXI6YWZ0ZXIsXFxuLm5hdmJhci1oZWFkZXI6YmVmb3JlLFxcbi5uYXZiYXItaGVhZGVyOmFmdGVyLFxcbi5uYXZiYXItY29sbGFwc2U6YmVmb3JlLFxcbi5uYXZiYXItY29sbGFwc2U6YWZ0ZXIsXFxuLnBhZ2VyOmJlZm9yZSxcXG4ucGFnZXI6YWZ0ZXIsXFxuLnBhbmVsLWJvZHk6YmVmb3JlLFxcbi5wYW5lbC1ib2R5OmFmdGVyLFxcbi5tb2RhbC1oZWFkZXI6YmVmb3JlLFxcbi5tb2RhbC1oZWFkZXI6YWZ0ZXIsXFxuLm1vZGFsLWZvb3RlcjpiZWZvcmUsXFxuLm1vZGFsLWZvb3RlcjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG4uY2xlYXJmaXg6YWZ0ZXIsXFxuLmRsLWhvcml6b250YWwgZGQ6YWZ0ZXIsXFxuLmNvbnRhaW5lcjphZnRlcixcXG4uY29udGFpbmVyLWZsdWlkOmFmdGVyLFxcbi5yb3c6YWZ0ZXIsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDphZnRlcixcXG4uYnRuLXRvb2xiYXI6YWZ0ZXIsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6YWZ0ZXIsXFxuLm5hdjphZnRlcixcXG4ubmF2YmFyOmFmdGVyLFxcbi5uYXZiYXItaGVhZGVyOmFmdGVyLFxcbi5uYXZiYXItY29sbGFwc2U6YWZ0ZXIsXFxuLnBhZ2VyOmFmdGVyLFxcbi5wYW5lbC1ib2R5OmFmdGVyLFxcbi5tb2RhbC1oZWFkZXI6YWZ0ZXIsXFxuLm1vZGFsLWZvb3RlcjphZnRlciB7XFxuICBjbGVhcjogYm90aDtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5iYWRnZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgY29sb3I6ICNEOTIzMEY7XFxufVxcbi5idG4ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG4uYnRuLWRlZmF1bHQsXFxuLmJ0bi1kZWZhdWx0OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCM0ZjUxNTEsICM0NzQ5NDkgNiUsICMzZjQxNDEpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KCM0ZjUxNTEsICM0NzQ5NDkgNiUsICMzZjQxNDEpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCM0ZjUxNTEsICM0NzQ5NDkgNiUsICMzZjQxNDEpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyNmZjRmNTE1MScsIGVuZENvbG9yc3RyPScjZmYzZjQxNDEnLCBHcmFkaWVudFR5cGU9MCk7XFxuICBmaWx0ZXI6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMmUyZjJmO1xcbn1cXG4uYnRuLXByaW1hcnksXFxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCNlNzI1MTAsICNEOTIzMEYgNiUsICNjYjIxMGUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KCNlNzI1MTAsICNEOTIzMEYgNiUsICNjYjIxMGUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCNlNzI1MTAsICNEOTIzMEYgNiUsICNjYjIxMGUpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyNmZmU3MjUxMCcsIGVuZENvbG9yc3RyPScjZmZjYjIxMGUnLCBHcmFkaWVudFR5cGU9MCk7XFxuICBmaWx0ZXI6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYTkxYjBjO1xcbn1cXG4uYnRuLXN1Y2Nlc3MsXFxuLmJ0bi1zdWNjZXNzOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCM0ZGEzMDksICM0Njk0MDggNiUsICMzZjg1MDcpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KCM0ZGEzMDksICM0Njk0MDggNiUsICMzZjg1MDcpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCM0ZGEzMDksICM0Njk0MDggNiUsICMzZjg1MDcpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyNmZjRkYTMwOScsIGVuZENvbG9yc3RyPScjZmYzZjg1MDcnLCBHcmFkaWVudFR5cGU9MCk7XFxuICBmaWx0ZXI6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMmY2NDA1O1xcbn1cXG4uYnRuLWluZm8sXFxuLmJ0bi1pbmZvOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCMwMmE1ZGUsICMwMjlBQ0YgNiUsICMwMjhmYzApO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KCMwMmE1ZGUsICMwMjlBQ0YgNiUsICMwMjhmYzApO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCMwMmE1ZGUsICMwMjlBQ0YgNiUsICMwMjhmYzApO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyNmZjAyYTVkZScsIGVuZENvbG9yc3RyPScjZmYwMjhmYzAnLCBHcmFkaWVudFR5cGU9MCk7XFxuICBmaWx0ZXI6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDI3NDljO1xcbn1cXG4uYnRuLXdhcm5pbmcsXFxuLmJ0bi13YXJuaW5nOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCNhNTRjYWEsICM5QjQ3OUYgNiUsICM5MTQyOTQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KCNhNTRjYWEsICM5QjQ3OUYgNiUsICM5MTQyOTQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCNhNTRjYWEsICM5QjQ3OUYgNiUsICM5MTQyOTQpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyNmZmE1NGNhYScsIGVuZENvbG9yc3RyPScjZmY5MTQyOTQnLCBHcmFkaWVudFR5cGU9MCk7XFxuICBmaWx0ZXI6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNzkzNzdjO1xcbn1cXG4uYnRuLWRhbmdlcixcXG4uYnRuLWRhbmdlcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgjZTA4YjI3LCAjRDk4MzFGIDYlLCAjY2M3YjFkKTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCgjZTA4YjI3LCAjRDk4MzFGIDYlLCAjY2M3YjFkKTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgjZTA4YjI3LCAjRDk4MzFGIDYlLCAjY2M3YjFkKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yc3RyPScjZmZlMDhiMjcnLCBlbmRDb2xvcnN0cj0nI2ZmY2M3YjFkJywgR3JhZGllbnRUeXBlPTApO1xcbiAgZmlsdGVyOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FjNjgxOTtcXG59XFxuYm9keSB7XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG50aCB7XFxuICBjb2xvcjogIzQ0NDtcXG59XFxubGVnZW5kIHtcXG4gIGNvbG9yOiAjNDQ0O1xcbn1cXG5sYWJlbCB7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmhlbHAtYmxvY2ssXFxuLmhhcy13YXJuaW5nIC5jb250cm9sLWxhYmVsLFxcbi5oYXMtd2FybmluZyAucmFkaW8sXFxuLmhhcy13YXJuaW5nIC5jaGVja2JveCxcXG4uaGFzLXdhcm5pbmcgLnJhZGlvLWlubGluZSxcXG4uaGFzLXdhcm5pbmcgLmNoZWNrYm94LWlubGluZSxcXG4uaGFzLXdhcm5pbmcucmFkaW8gbGFiZWwsXFxuLmhhcy13YXJuaW5nLmNoZWNrYm94IGxhYmVsLFxcbi5oYXMtd2FybmluZy5yYWRpby1pbmxpbmUgbGFiZWwsXFxuLmhhcy13YXJuaW5nLmNoZWNrYm94LWlubGluZSBsYWJlbCxcXG4uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICBjb2xvcjogI0Q5ODMxRjtcXG59XFxuLmhhcy13YXJuaW5nIC5mb3JtLWNvbnRyb2wsXFxuLmhhcy13YXJuaW5nIC5mb3JtLWNvbnRyb2w6Zm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiAjRDk4MzFGO1xcbn1cXG4uaGFzLWVycm9yIC5oZWxwLWJsb2NrLFxcbi5oYXMtZXJyb3IgLmNvbnRyb2wtbGFiZWwsXFxuLmhhcy1lcnJvciAucmFkaW8sXFxuLmhhcy1lcnJvciAuY2hlY2tib3gsXFxuLmhhcy1lcnJvciAucmFkaW8taW5saW5lLFxcbi5oYXMtZXJyb3IgLmNoZWNrYm94LWlubGluZSxcXG4uaGFzLWVycm9yLnJhZGlvIGxhYmVsLFxcbi5oYXMtZXJyb3IuY2hlY2tib3ggbGFiZWwsXFxuLmhhcy1lcnJvci5yYWRpby1pbmxpbmUgbGFiZWwsXFxuLmhhcy1lcnJvci5jaGVja2JveC1pbmxpbmUgbGFiZWwsXFxuLmhhcy1lcnJvciAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIGNvbG9yOiAjRDkyMzBGO1xcbn1cXG4uaGFzLWVycm9yIC5mb3JtLWNvbnRyb2wsXFxuLmhhcy1lcnJvciAuZm9ybS1jb250cm9sOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogI0Q5MjMwRjtcXG59XFxuLmhhcy1zdWNjZXNzIC5oZWxwLWJsb2NrLFxcbi5oYXMtc3VjY2VzcyAuY29udHJvbC1sYWJlbCxcXG4uaGFzLXN1Y2Nlc3MgLnJhZGlvLFxcbi5oYXMtc3VjY2VzcyAuY2hlY2tib3gsXFxuLmhhcy1zdWNjZXNzIC5yYWRpby1pbmxpbmUsXFxuLmhhcy1zdWNjZXNzIC5jaGVja2JveC1pbmxpbmUsXFxuLmhhcy1zdWNjZXNzLnJhZGlvIGxhYmVsLFxcbi5oYXMtc3VjY2Vzcy5jaGVja2JveCBsYWJlbCxcXG4uaGFzLXN1Y2Nlc3MucmFkaW8taW5saW5lIGxhYmVsLFxcbi5oYXMtc3VjY2Vzcy5jaGVja2JveC1pbmxpbmUgbGFiZWwsXFxuLmhhcy1zdWNjZXNzIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgY29sb3I6ICM0Njk0MDg7XFxufVxcbi5oYXMtc3VjY2VzcyAuZm9ybS1jb250cm9sLFxcbi5oYXMtc3VjY2VzcyAuZm9ybS1jb250cm9sOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzQ2OTQwODtcXG59XFxuLnBhZ2VyIGEge1xcbiAgY29sb3I6ICM0NDQ7XFxufVxcbi5wYWdlciBhOmhvdmVyLFxcbi5wYWdlciAuYWN0aXZlID4gYSB7XFxuICBib3JkZXItY29sb3I6ICNEOTIzMEY7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGEge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkO1xcbn1cXG4uYnJlYWRjcnVtYl9fY29udGFpbmVyX21hcmdpbi10b3Age1xcbiAgbWFyZ2luLXRvcDogM2VtO1xcbn1cXG4uY29tbW9uX19jb250YWluZXJfbWFyZ2luLWJvdHRvbSB7XFxuICBtYXJnaW4tYm90dG9tOiAyZW07XFxufVxcbi5uYXZiYXJfYm90dG9tX193b3JrYXJvdW5kX2hlaWdodCB7XFxuICBoZWlnaHQ6IDNlbTtcXG59XFxuLmRvY3VtZW50YXRpb25fbGlua19fbGlzdCB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG59XFxuLmRvY3VtZW50YXRpb25fbGlua19fbGlzdF9pdGVtIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG59XFxuLyogLS0tLS0tLT0gaW1wb3J0cyA9LS0tLS0tLSAqL1xcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlci9kaXN0IS4vYXBwL2xlc3MvbWFpbi5sZXNzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCIvc3RhdGljL2ltYWdlcy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5zdmdcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCIvc3RhdGljL2ltYWdlcy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnR0ZlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ib290c3RyYXAvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci50dGZcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCIvc3RhdGljL2ltYWdlcy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLndvZmZcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vdHN0cmFwL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIud29mZlxuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIi9zdGF0aWMvaW1hZ2VzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIud29mZjJcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vdHN0cmFwL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIud29mZjJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vINGD0YHRgtCw0L3QvtCy0L7Rh9C90YvQtSDQv9C10YDQtdC80LXQvdGL0LUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmxldCB2YWxpZGF0b3JzID0ge1xyXG4gICAgY2xhc3NlcyA6IHtcclxuICAgICAgICBoYXNFcnJvcjogJ2hhcy1lcnJvcicsXHJcbiAgICAgICAgaGFzU3VjZXNzOiAnaGFzLXN1Y2Nlc3MnXHJcbiAgICB9LFxyXG4gICAgY2xlYW4gOiB7XHJcbiAgICAgICAgZXJyb3JNc2c6ICcnXHJcbiAgICB9LFxyXG4gICAgcmVxdWlyZUZpZWxkIDoge1xyXG4gICAgICAgIGVycm9yTXNnOiAn0J/QvtC70LUg0Y/QstC70Y/QtdGC0YHRjyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0Lwg0LTQu9GPINC30LDQv9C+0LvQvdC10L3QuNGPJ1xyXG4gICAgfSxcclxuICAgIHBob25lIDoge1xyXG4gICAgICAgIHJlZ0V4cHJQYXR0ZXJuOiAnXigoOHxcXFxcKzcpW1xcXFwtIF0/KT8oXFxcXCg/XFxcXGR7M31cXFxcKT9bXFxcXC0gXT8pP1tcXFxcZFxcXFwtIF17NywxMH0kJyxcclxuICAgICAgICByZWdFeHByRmxhZ3M6ICcnLFxyXG4gICAgICAgIGVycm9yTXNnOiAn0JIg0L/QvtC70LUg0L3Rg9C20L3QviDQstCy0L7QtNC40YLRjCDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAsINCyINGE0L7RgNC80LDRgtC1OiArNyhYWFgpWFhYLVhYWFgnXHJcbiAgICB9LFxyXG4gICAgZW1haWwgOiB7XHJcbiAgICAgICAgcmVnRXhwclBhdHRlcm46ICcuK0AuK1xcXFwuLisnLFxyXG4gICAgICAgIHJlZ0V4cHJGbGFnczogJ2knLFxyXG4gICAgICAgIGVycm9yTXNnOiAn0JIg0L/QvtC70LUg0L3Rg9C20L3QviDQstCy0L7QtNC40YLRjCBlbWFpbCwg0LIg0YTQvtGA0LzQsNGC0LU6IHNvbWVhZGRyZXNzQGRvbWFpbi54eHgnXHJcbiAgICB9LFxyXG4gICAgY3VzdG9tVmFsaWRhdG9yOiB7XHJcbiAgICAgICAgcmVnRXhwclBhdHRlcm46ICcnLFxyXG4gICAgICAgIHJlZ0V4cHJGbGFnczogJycsXHJcbiAgICAgICAgZXJyb3JNc2c6ICcnXHJcbiAgICB9XHJcbn07XHJcbi8vINGD0YHRgtCw0L3QvtCy0L7Rh9C90YvQtSDQv9C10YDQtdC80LXQvdGL0LUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YTRg9C90LrRhtC40Lg9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8g0KTRg9C90LrRhtC40Y8g0YHRgNCw0LLQvdC40LLQsNGO0YnQsNGPINGP0LLQu9GP0LXRgtGB0Y8g0LvQuCDQv9C+0LvQtSDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0Lwg0LTQu9GPINC30LDQv9C+0LvQvdC10L3QuNGPXHJcbi8qKlxyXG4qINCk0YPQvdC60YbQuNGPINC/0YDQvtCy0LXRgNC60Lgg0LfQsNC/0L7Qu9C90LXQvdC+INC70Lgg0L/QvtC70LVcclxuKiBAcGFyYW0gIHtET00gRUxFTUVOVH0gaW5wdXRET00gICDQv9GA0L7QstC10YDRj9C10LzRi9C5INC40L3Qv9GD0YJcclxuKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICDQtdGB0LvQuCDQv9C+0LvQtSDQv9GD0YHRgtC+0LUg0YLQviDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8gZmFsc2VcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQuNC90LDRh9C1IHRydWVcclxuKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dEZvclJlcXVpcmUoIGlucHV0RE9NICkge1xyXG4gICAgLy8g0JTQu9GPIGlucHV0RE9NLnZhbHVlINC90LUg0YPRh9C40YLRi9Cy0LDQtdC8INCy0LLQtdC00LXQvdC90YvQtSDQv9GA0L7QsdC10LvRiywg0LIg0YHQu9GD0YfQsNC1INC40YUg0L3QsNC70LjRh9C40Y8g0YHRgtGA0L7QutCwINGB0YfQuNGC0LDQtdGC0YHRjyDQv9GD0YHRgtC+0LkhXHJcbiAgICBpZiAoICFpbnB1dERPTS52YWx1ZS50cmltKCkgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07IC8vIGNoZWNrSW5wdXRGb3JSZXF1aXJlXHJcblxyXG4vLyDQpNGD0L3QutGG0LjRjyDRgdGA0LDQstC90LjQstCw0Y7RidCw0Y8g0LTQsNC90L3Ri9C1INCyINC/0L7Qu9C1INGBINC/0YDQtdC00YPRgdGC0LDQvdC+0LLQu9C10L3QvdC+0Lkg0YDQtdCz0YPQu9GP0YDQutC+0LlcclxuLyoqXHJcbiogW2NoZWNrSW5wdXRUZW1wbFJlZ3VsYXIg0L/RgNC+0LLQtdGA0LrQsCDQvdCwINGB0L7QvtGC0LLQtdGC0YHQstC40LUg0LTQsNC90L3Ri9GFINCy0LLQtdC00LXQvdC90YvRhSDQsiDQv9C+0LvQtVxyXG4qINC90LAg0YHQvtC+0YLQstC10YLRgdCy0LjQtSDRgNC10LPRg9C70Y/RgNC90L7QvNGDINCy0YvRgNCw0LbQtdC90LjRjlxyXG4qIEBwYXJhbSAge3N0cmluZ30gdmFsaWRhdG9yU3RyICAgICAg0YLQuNC/INCy0LDQu9C40LTQuNGA0YPQtdC80L7Qs9C+INGI0LDQsdC70L7QvdCwLCDRg9C60LDQt9Cw0L3QvdGL0Lkg0LTQu9GPINC/0L7Qu9GPICjQv9GA0LjQvNC10YA6IGVtYWlsLCBwaG9uZSDQuCDRgi7QtC4pXHJcbiogQHBhcmFtICB7RE9NIEVsZW1lbnR9IGlucHV0RE9NICAgICBET00g0Y3Qu9C10LzQtdC90YIsIGlucHV0INC40Lcg0LLQsNC70LjQtNC40YDRg9C10LzQvtC5INGE0L7RgNC80YtcclxuKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgINC10YHQu9C4INGB0YLRgNC+0LrQsCDQsiDQv9C+0LvQtSDRgdC+0LLQv9Cw0LTQsNC10YIg0YEg0YDQtdCz0YPQu9GP0YDQutC+0LksINGC0L4gdHJ1ZVxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0LjQvdCw0YfQtSBmYWxzZVxyXG4qL1xyXG5mdW5jdGlvbiBjaGVja0lucHV0VGVtcGxSZWd1bGFyKCB2YWxpZGF0b3JTdHIsIGlucHV0RE9NICkge1xyXG4gICAgbGV0IHZhbGlkT2JqID0gdmFsaWRhdG9yc1t2YWxpZGF0b3JTdHJdO1xyXG4gICAgbGV0IHN0cmluZyA9IGlucHV0RE9NLnZhbHVlO1xyXG4gICAgbGV0IGV4cHJlc3Npb247XHJcblxyXG4gICAgLy8g0L/QvtGB0YLRgNC+0LjRgtGMINGA0LXQs9GD0LvRj9GA0LrRgyDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+INC90LDQu9C40YfQuNGPINGE0LvQsNCz0L7QslxyXG4gICAgaWYgKCB2YWxpZE9iai5yZWdFeHByRmxhZ3MgPT09ICcnICkge1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKHZhbGlkT2JqLnJlZ0V4cHJQYXR0ZXJuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXhwcmVzc2lvbiA9IG5ldyBSZWdFeHAodmFsaWRPYmoucmVnRXhwclBhdHRlcm4sIHZhbGlkT2JqLnJlZ0V4cHJGbGFncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINGB0L7QvtGC0LLQtdGC0YHQstC40LUg0YHRgtGA0L7QutC4INC40Lcg0LjQvdC/0YPRgtCwLCDRiNCw0LHQu9C+0L3QvdC+0Lkg0YDQtdCz0YPQu9GP0YDQutC1XHJcbiAgICBpZiAoIGV4cHJlc3Npb24udGVzdChzdHJpbmcpICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59OyAvLyBjaGVja0lucHV0VGVtcGxSZWd1bGFyXHJcblxyXG4vLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLRi9Cy0L7QtNCwINGB0L7QvtCx0YnQtdC90LjRjyDQvtCxINC+0YjQuNCx0LrQtSDQuCDQstGL0LTQtdC70LXQvdC40Lgg0LjQvdC/0YPRgtCwINCyINGG0LLQtdGCINC+0YjQuNCx0LrQuCAo0L3QsNC/0YDQuNC80LXRgCDQutGA0LDRgdC90YvQuSlcclxuLy8gVE9ETyDQv9GA0LXQtNGD0YHQvNC+0YLRgNC10YLRjCDQt9Cw0LTQsNC90LjQtSDQutC70LDRgdGB0L7QsiDQtNC70Y8g0L7RgtCy0LDQu9C40LTQuNGA0L7QstCw0L3QvdC+0LPQviDQv9C+0LvRjywg0L3QsNC/0YDQuNC80LXRgCDQt9C10LvQtdC90LXQvdGM0LrQuNC8OylcclxuLyoqXHJcbiAqIHNldFZhbGlkYXRlU3RhdHVzSW5ET00g0YHQvtC+0LHRidC10L3QuNC1INC+0LEg0L7RiNC40LHQutC1LCDQtdGB0LvQuCDQv9C+0LvQtSDQvdC1INC/0YDQvtGI0LvQviDQstCw0LvQuNC00LDRhtC40Y5cclxuICogQHBhcmFtIHtCb29sZWFufSBpc0Vycm9ySW5JbnB1dCAgICDQtdGB0YLRjCDQvtGI0LjQsdC60LAg0LIgaW5wdXQg0YTQvtGA0LzRiyDQuNC70Lgg0L3QtdGCXHJcbiAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9ICBpbnB1dERPTSAgICAgRE9NINGN0LvQtdC80LXQvdGCLCBpbnB1dCDQuNC3INCy0LDQu9C40LTQuNGA0YPQtdC80L7QuSDRhNC+0YDQvNGLXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAgdmFsaWRhdG9yRXJyb3JNc2cg0YHQvtC+0LHRidC10L3QuNC1INC+0LEg0L7RiNC40LHQutC1XHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRWYWxpZGF0ZVN0YXR1c0luRE9NKCBpc0Vycm9ySW5JbnB1dCwgaW5wdXRET00sIHZhbGlkYXRvckVycm9yTXNnICkge1xyXG4gICAgbGV0IHBhcmVudERPTSA9IGlucHV0RE9NLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBsZXQgbmV4dERPTSA9IHBhcmVudERPTS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpO1xyXG4gICAgaWYgKCBpc0Vycm9ySW5JbnB1dCA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgcGFyZW50RE9NLmNsYXNzTGlzdC5hZGQodmFsaWRhdG9ycy5jbGFzc2VzLmhhc0Vycm9yKTtcclxuICAgICAgICBuZXh0RE9NWzBdLmlubmVySFRNTCA9IHZhbGlkYXRvckVycm9yTXNnOyAgICAgICAgICAgICAvL9Cx0LXRgNC10Lwg0YHQsNC80YvQuSDQv9C10YDQstGL0Lkgc3BhbiDQstC90YPRgtGA0Lgg0YDQvtC00LjRgtC10LvRj1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJlbnRET00uY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0b3JzLmNsYXNzZXMuaGFzRXJyb3IpO1xyXG4gICAgICAgIG5leHRET01bMF0uaW5uZXJIVE1MID0gdmFsaWRhdG9ycy5jbGVhbi5lcnJvck1zZztcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufTsgLy9yZXF1aXJlRXJyVmFsaWRhdGVTdGF0dXNJbkRPTVxyXG5cclxuLy8g0J7QsdGK0LXQtNC40L3QtdC90LjQtSDQvdC10YHQutC+0LvRjNC60LjRhSDQutC+0LvQu9C10LrRhtC40Lkg0Y3Qu9C10LzQtdC90YLQvtCyINCyINC+0LTQuNC9INC80LDRgdGB0LjQslxyXG4vKipcclxuICog0J7QsdGK0LXQtNC40L3QtdC90LjQtSDQvdC10YHQutC+0LvRjNC60LjRhSDQutC+0LvQu9C10LrRhtC40Lkg0Y3Qu9C10LzQtdC90YLQvtCyINCyINC+0LTQuNC9INC80LDRgdGB0LjQslxyXG4gKiBAcGFyYW0gIHtET019ICAgICAgICAgICAgICAgIHRhcmdldCAgICAgICAgRE9NINGN0LvQtdC80LXQvdGCINCyINC60L7RgtC+0YDQvtC8INC90YPQttC90L4g0LjRgdC60LDRgtGMINGC0YDQtdCx0YPQtdC80YvQtSDRjdC70LXQvNC10L3RgtGLXHJcbiAqIEBwYXJhbSAge0hUTUxDb2xsZWN0aW9ufSAgICAgdGVtcEFycmF5ICAgICDRgdGC0YDQvtC60L7QstGL0Lkg0LzQsNGB0YHQuNCyINGBINGD0LrQsNC30LDQvdC40LXQvCDRgtC10LPQvtCyXHJcbiAqIEByZXR1cm4ge2FycmF5fSAgICAgICAgICAgICAgcmVzdWx0QXJyYXkgICDRgNC10LfRg9C70YzRgtC40YDRg9GO0YnQuNC5INC80LDRgdGB0LjQsiDQvtCx0YrQtdC00LjQvdC10L3QvdGL0YUg0LrQvtC70LvQtdC60YbQuNC5INGN0LvQtdC80LXQvdGC0L7QslxyXG4gKi9cclxuZnVuY3Rpb24gY29uY2F0VGFnTmFtZXNDb2xsZWN0aW9uVG9BcnJheSh0YXJnZXQsIHRlbXBBcnJheSl7XHJcbiAgICBsZXQgcmVzdWx0QXJyYXkgPSBbXTtcclxuICAgIGxldCB0YXJnZXRET00gPSB0YXJnZXQ7XHJcbiAgICBsZXQgdGVtcEhUTUxDb2xsZWN0aW9uID0gbnVsbDtcclxuICAgIGZvcihsZXQgYT0wOyBhPHRlbXBBcnJheS5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIHRlbXBIVE1MQ29sbGVjdGlvbiA9IHRhcmdldERPTS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0ZW1wQXJyYXlbYV0pO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRlbXBIVE1MQ29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKHRlbXBIVE1MQ29sbGVjdGlvbltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdEFycmF5O1xyXG59IC8vIGNvbmNhdFRhZ05hbWVzQ29sbGVjdGlvblRvQXJyYXlcclxuLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGE0YPQvdC60YbQuNC4PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyDQntCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLyoqXHJcbiAqIFvQktCw0LTQuNC00LDRhtC40Y8g0YTQvtGA0LzRiy4g0K3QutGB0L/QvtGA0YLQuNGA0YPQtdC80LDRjyDRhNGD0L3QutGG0LjRj11cclxuICogQHBhcmFtICB7RXZlbnR9IGUgICBbRXZlbnQgb2JqZWN0XVxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBsb2cgW1ByaW50IGxvZ3MgdG8gYSBjb25zb2xlXVxyXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9ICAgICBbbm90aGluZ11cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlRm9ybVZhbGlkYXRlKGUsIGxvZykge1xyXG4gICAgbGV0IGlzUHJpbnRMb2dzID0gbG9nIHx8IGZhbHNlLFxyXG4gICAgdGFyZ2V0ID0gZS50YXJnZXQsXHJcbiAgICBjaGVja1N0YXR1cyA9IGZhbHNlLFxyXG4gICAgY2hlY2tGb3JtU3RhdHVzID0gZmFsc2UsXHJcbiAgICBpc05lZWRGb3JtVmFsaWRhdGUgPSB1bmRlZmluZWQsXHJcbiAgICBhbGxGb3JtRWxlbWVudHMgPSB1bmRlZmluZWQsXHJcbiAgICBpc1JlcXVpcmUgPSAnJyxcclxuICAgIHZhbGlkYXRvciA9ICcnLFxyXG4gICAgY3VzdG9tVmFsaWRhdG9yID0gJyc7XHJcbiAgICB0YXJnZXQubm9WYWxpZGF0ZSA9IHRydWU7ICAgICAgICAgIC8vINCe0YLQutC70Y7Rh9C40YLRjCDQsdGA0LDRg9C30LXRgNC90YPRjiDQstCw0LvQuNC00LDRhtC40Y4g0LTQu9GPINGE0L7RgNC80YtcclxuXHJcbiAgICBpZiAoIHRhcmdldC50YWdOYW1lID09PSAnRk9STScgKSB7XHJcbiAgICAgICAgaXNOZWVkRm9ybVZhbGlkYXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1qcy12YWxpZGF0aW9uJyk7XHJcbiAgICAgICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDRhNC+0YDQvNGLINC90LAsINGC0L4g0YLRgNC10LHRg9C10YIg0LvQuCDRhNC+0LvRgNC80LAg0LLQsNC70LjQtNCw0YbQuNC4INGBINC/0L7QvNC+0YnRjNGOIG1tSlNWYWxhZGF0aW9uXHJcbiAgICAgICAgaWYgKCBpc05lZWRGb3JtVmFsaWRhdGUgPT09ICd0cnVlJyApIHtcclxuICAgICAgICAgICAgYWxsRm9ybUVsZW1lbnRzID0gY29uY2F0VGFnTmFtZXNDb2xsZWN0aW9uVG9BcnJheSh0YXJnZXQsIFsnaW5wdXQnLCAndGV4dGFyZWEnXSApOyAgICAgICAgLy8g0LzQvtC20L3QviDQt9Cw0LTQsNCy0LDRgtGMINGB0L/QuNGB0L7QuiDRgNCw0LfQu9C40YfQvdGL0YUg0YLQtdCz0L7QsiDQtNC70Y8g0L7QsdGK0LXQtNC40L3QtdC90LjRjyDQsiDQtdC00LjQvdGD0Y4gSFRNTCDQutC70L7Qu9C70LXQutGG0LjRjlxyXG5cclxuICAgICAgICAgICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQvdCwINC90LDQu9C40YfQuNC1INC40L3Qv9GD0LjRgtC+0LIg0LIg0YTQvtGA0LzQtVxyXG4gICAgICAgICAgICBpZiAoIGFsbEZvcm1FbGVtZW50cy5sZW5ndGggIT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQn9GA0L7QstC10YDQutCwINCy0YHQtdGFINC/0L7Qu9C10Lkg0LIg0LXQtNC40L3RgdGC0LLQtdC90L3QvtC8INGG0LjQutC70LVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGFsbEZvcm1FbGVtZW50cy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlID0gYWxsRm9ybUVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS12YWxpZGF0aW9uLXJlcXVpcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBhbGxGb3JtRWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbGlkYXRpb24tdGVtcGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21WYWxpZGF0b3IgPSBhbGxGb3JtRWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbGlkYXRpb24tY3VzdG9tJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L7QsdGP0LfQsNGC0LXQu9GM0L3Ri9GFINC/0L7Qu9C10LlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzUmVxdWlyZSA9PT0gJ3RydWUnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1N0YXR1cyA9IGNoZWNrSW5wdXRGb3JSZXF1aXJlKCBhbGxGb3JtRWxlbWVudHNbaV0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtU3RhdHVzID0gY2hlY2tTdGF0dXM7ICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9C1INC/0YPRgdGC0L7QtSwg0YLQviBGQUxTRSwg0LjQvdCw0YfQtSBUUlVFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkYXRlU3RhdHVzSW5ET00oIGNoZWNrU3RhdHVzLCBhbGxGb3JtRWxlbWVudHNbaV0sIHZhbGlkYXRvcnMucmVxdWlyZUZpZWxkLmVycm9yTXNnICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNoZWNrU3RhdHVzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWxpZGF0b3IgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTdGF0dXMgPSBjaGVja0lucHV0VGVtcGxSZWd1bGFyKCB2YWxpZGF0b3IsIGFsbEZvcm1FbGVtZW50c1tpXSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtU3RhdHVzID0gY2hlY2tTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRhdGVTdGF0dXNJbkRPTSggY2hlY2tTdGF0dXMsIGFsbEZvcm1FbGVtZW50c1tpXSwgdmFsaWRhdG9yc1t2YWxpZGF0b3JdLmVycm9yTXNnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjdXN0b21WYWxpZGF0b3IgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1c3RvbVZhbGlkYXRvckFycmF5ID0gY3VzdG9tVmFsaWRhdG9yLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkYXRvciA9ICdjdXN0b21WYWxpZGF0b3InO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDRg9Cx0LXRgNC10Lwg0LrQsNCy0YvRh9C60Lgg0LjQtyDQvdCw0YfQsNC70LAg0Lgg0LrQvtC90YbQsCDRgdGC0YDQvtC60LhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTxjdXN0b21WYWxpZGF0b3JBcnJheS5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbGlkYXRvckFycmF5W2ldID0gY3VzdG9tVmFsaWRhdG9yQXJyYXlbaV0uc2xpY2UoMSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L3QsNC/0L7Qu9C90LjQvCDQvtCx0YrQtdC60YIg0LrQsNGB0YLQvtC80L3QvtC5INGB0YLRgNC+0LrQvtC5INC00LvRjyDQstCw0LvQuNC00LDRhtC40LhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzLmN1c3RvbVZhbGlkYXRvci5yZWdFeHByUGF0dGVybiA9IGN1c3RvbVZhbGlkYXRvckFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnMuY3VzdG9tVmFsaWRhdG9yLnJlZ0V4cHJGbGFncyA9IGN1c3RvbVZhbGlkYXRvckFycmF5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnMuY3VzdG9tVmFsaWRhdG9yLmVycm9yTXNnID0gY3VzdG9tVmFsaWRhdG9yQXJyYXlbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhdHVzID0gY2hlY2tJbnB1dFRlbXBsUmVndWxhciggdmFsaWRhdG9yLCBhbGxGb3JtRWxlbWVudHNbaV0gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRm9ybVN0YXR1cyA9IGNoZWNrU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkYXRlU3RhdHVzSW5ET00oIGNoZWNrU3RhdHVzLCBhbGxGb3JtRWxlbWVudHNbaV0sIHZhbGlkYXRvcnNbdmFsaWRhdG9yXS5lcnJvck1zZyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9C+0YfQuNGB0YLQuNC8INC+0LHRitC10LrRgiDQutCw0YHRgtC+0LzQvdC+0LPQviDQstCw0LvQuNC00LDRgtC+0YDQsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnMuY3VzdG9tVmFsaWRhdG9yLnJlZ0V4cHJQYXR0ZXJuID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5jdXN0b21WYWxpZGF0b3IucmVnRXhwckZsYWdzID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5jdXN0b21WYWxpZGF0b3IuZXJyb3JNc2cgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy8g0J/RgNC+0LLQtdGA0LrQsCDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0YUg0L/QvtC70LXQuVxyXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L3QtdC+0LHRj9C30LDRgtC10LvRjNC90YvRhSDQv9C+0LvQtdC5XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdmFsaWRhdG9yICYmIGFsbEZvcm1FbGVtZW50c1tpXS52YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhdHVzID0gY2hlY2tJbnB1dFRlbXBsUmVndWxhciggdmFsaWRhdG9yLCBhbGxGb3JtRWxlbWVudHNbaV0gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtU3RhdHVzID0gY2hlY2tTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGF0ZVN0YXR1c0luRE9NKCBjaGVja1N0YXR1cywgYWxsRm9ybUVsZW1lbnRzW2ldLCB2YWxpZGF0b3JzW3ZhbGlkYXRvcl0uZXJyb3JNc2cgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY3VzdG9tVmFsaWRhdG9yICYmIGFsbEZvcm1FbGVtZW50c1tpXS52YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXN0b21WYWxpZGF0b3JBcnJheSA9IGN1c3RvbVZhbGlkYXRvci5zcGxpdCgnOycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkYXRvciA9ICdjdXN0b21WYWxpZGF0b3InO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINGD0LHQtdGA0LXQvCDQutCw0LLRi9GH0LrQuCDQuNC3INC90LDRh9Cw0LvQsCDQuCDQutC+0L3RhtCwINGB0YLRgNC+0LrQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8Y3VzdG9tVmFsaWRhdG9yQXJyYXkubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbGlkYXRvckFycmF5W2ldID0gY3VzdG9tVmFsaWRhdG9yQXJyYXlbaV0uc2xpY2UoMSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC90LDQv9C+0LvQvdC40Lwg0L7QsdGK0LXQutGCINC60LDRgdGC0L7QvNC90L7QuSDRgdGC0YDQvtC60L7QuSDQtNC70Y8g0LLQsNC70LjQtNCw0YbQuNC4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzLmN1c3RvbVZhbGlkYXRvci5yZWdFeHByUGF0dGVybiA9IGN1c3RvbVZhbGlkYXRvckFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5jdXN0b21WYWxpZGF0b3IucmVnRXhwckZsYWdzID0gY3VzdG9tVmFsaWRhdG9yQXJyYXlbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzLmN1c3RvbVZhbGlkYXRvci5lcnJvck1zZyA9IGN1c3RvbVZhbGlkYXRvckFycmF5WzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhdHVzID0gY2hlY2tJbnB1dFRlbXBsUmVndWxhciggdmFsaWRhdG9yLCBhbGxGb3JtRWxlbWVudHNbaV0gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JtU3RhdHVzID0gY2hlY2tTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGF0ZVN0YXR1c0luRE9NKCBjaGVja1N0YXR1cywgYWxsRm9ybUVsZW1lbnRzW2ldLCB2YWxpZGF0b3JzW3ZhbGlkYXRvcl0uZXJyb3JNc2cgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9C+0YfQuNGB0YLQuNC8INC+0LHRitC10LrRgiDQutCw0YHRgtC+0LzQvdC+0LPQviDQstCw0LvQuNC00LDRgtC+0YDQsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5jdXN0b21WYWxpZGF0b3IucmVnRXhwclBhdHRlcm4gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnMuY3VzdG9tVmFsaWRhdG9yLnJlZ0V4cHJGbGFncyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5jdXN0b21WYWxpZGF0b3IuZXJyb3JNc2cgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy8g0J/RgNC+0LLQtdGA0LrQsCDQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3Ri9GFINC/0L7Qu9C10LlcclxuICAgICAgICAgICAgICAgIH0gIC8vINC+0LrQvtC90YfQsNC90LjQtSDQv9GA0L7QstC10YDQutC4INCy0YHQtdGFINC/0L7Qu9C10LlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQldGB0LvQuCDQsiDQuNC90L/Rg9GC0LDRhSDRhNC+0YDQvNGLINC10YHRgtGMINC+0YjQuNCx0LrQuCwg0YLQviDRhNC+0YDQvNGDINC90LUg0L7RgtC/0YDQsNCy0LvRj9GC0YxcclxuICAgICAgICAgICAgICAgIGlmICggIWNoZWNrRm9ybVN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1ByaW50TG9ncykgY29uc29sZS5sb2coJ9CSINC40L3Qv9GD0YLQsNGFINC10YHRgtGMINC+0YjQuNCx0LrQsC4g0KTQvtGA0LzQsCDQvdC1INC+0YLQv9GA0LDQstC70LXQvdCwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1ByaW50TG9ncykgY29uc29sZS5sb2coJ9Ce0YjQuNCx0L7QuiDQvdC10YIuINCk0L7RgNC80LAg0L7RgtC/0YDQsNCy0LvQtdC90LAhJyk7XHJcbiAgICAgICAgICAgICAgICB9IC8v0JXRgdC70Lgg0LIg0LjQvdC/0YPRgtCw0YUg0YTQvtGA0LzRiyDQtdGB0YLRjCDQvtGI0LjQsdC60LgsINGC0L4g0YTQvtGA0LzRgyDQvdC1INC+0YLQv9GA0LDQstC70Y/RgtGMXHJcblxyXG4gICAgICAgICAgICB9IC8vINCf0YDQvtCy0LXRgNC60LAg0L3QsCDQvdCw0LvQuNGH0LjQtSDQuNC90L/Rg9C40YLQvtCyINCyINGE0L7RgNC80LVcclxuICAgICAgICAgICAgLy8g0JXRgdC70Lgg0LjQvdC/0YPRgtC+0LIg0L3QtdGCLCDRgtC+INC30LDQstC10YDRiNC40YLRjCDQvtCx0YDQsNCx0L7RgtC60YMg0Lgg0LLRi9C50YLQuFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAvLyDQldGB0LvQuCDQuNC90L/Rg9GC0L7QsiDQvdC10YIsINGC0L4g0LfQsNCy0LXRgNGI0LjRgtGMINC+0LHRgNCw0LHQvtGC0LrRgyDQuCDQstGL0LnRgtC4XHJcbiAgICAgICAgfSAvLyDQn9GA0L7QstC10YDQutCwINGE0L7RgNC80Ysg0L3QsCwg0YLQviDRgtGA0LXQsdGD0LXRgiDQu9C4INGE0L7Qu9GA0LzQsCDQstCw0LvQuNC00LDRhtC40Lgg0YEg0L/QvtC80L7RidGM0Y4gbW1KU1ZhbGFkYXRpb25cclxuICAgICAgICAvLyDQldGB0LvQuCDRhNC+0YDQvNCwINC90LUg0YLRgNC10LHRg9C10YIg0LLQsNC70LjQtNCw0YbQuNC4INGBINC/0L7QvNC+0YnRjNGOIG1tSlNWYWxhZGF0aW9uLCDRgtC+INC/0YDQvtGB0YLQviDQvtGC0LTQsNGC0Ywg0LXQtSBCQUNLLUVORFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZihpc1ByaW50TG9ncykgY29uc29sZS5sb2coJ9Ck0L7RgNC80LAg0L/QvtC10YXQsNC70LAg0LIg0LHQtdC60Y3QvdC0Jyk7XHJcbiAgICAgICAgfSAgICAgICAgIC8vINCV0YHQu9C4INGE0L7RgNC80LAg0L3QtSDRgtGA0LXQsdGD0LXRgiDQstCw0LvQuNC00LDRhtC40Lgg0YEg0L/QvtC80L7RidGM0Y4gbW1KU1ZhbGFkYXRpb24sINGC0L4g0L/RgNC+0YHRgtC+INC+0YLQtNCw0YLRjCDQtdC1IEJBQ0stRU5EXHJcbiAgICB9XHJcblxyXG59OyAvLyBoYW5kbGVGb3JtVmFsaWRhdGVcclxuLy8g0J7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21tLWpzLXZhbGlkYXRpb24vc3JjL21tLWZvcm0tdmFsaWRhdGlvbi5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ1JlYWN0LlByb3BUeXBlcy4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUpO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gUmVhY3QgMTUuNSByZWZlcmVuY2VzIHRoaXMgbW9kdWxlLCBhbmQgYXNzdW1lcyBQcm9wVHlwZXMgYXJlIHN0aWxsIGNhbGxhYmxlIGluIHByb2R1Y3Rpb24uXG4vLyBUaGVyZWZvcmUgd2UgcmUtZXhwb3J0IGRldmVsb3BtZW50LW9ubHkgdmVyc2lvbiB3aXRoIGFsbCB0aGUgUHJvcFR5cGVzIGNoZWNrcyBoZXJlLlxuLy8gSG93ZXZlciBpZiBvbmUgaXMgbWlncmF0aW5nIHRvIHRoZSBgcHJvcC10eXBlc2AgbnBtIGxpYnJhcnksIHRoZXkgd2lsbCBnbyB0aHJvdWdoIHRoZVxuLy8gYGluZGV4LmpzYCBlbnRyeSBwb2ludCwgYW5kIGl0IHdpbGwgYnJhbmNoIGRlcGVuZGluZyBvbiB0aGUgZW52aXJvbm1lbnQuXG52YXIgZmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQpIHtcbiAgLy8gSXQgaXMgc3RpbGwgYWxsb3dlZCBpbiAxNS41LlxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IGZhbHNlO1xuICByZXR1cm4gZmFjdG9yeShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb3AtdHlwZXMvZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFVuZXNjYXBlIGFuZCB1bndyYXAga2V5IGZvciBodW1hbi1yZWFkYWJsZSBkaXNwbGF5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byB1bmVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVuZXNjYXBlZCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGtleSkge1xuICB2YXIgdW5lc2NhcGVSZWdleCA9IC8oPTB8PTIpL2c7XG4gIHZhciB1bmVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0wJzogJz0nLFxuICAgICc9Mic6ICc6J1xuICB9O1xuICB2YXIga2V5U3Vic3RyaW5nID0ga2V5WzBdID09PSAnLicgJiYga2V5WzFdID09PSAnJCcgPyBrZXkuc3Vic3RyaW5nKDIpIDoga2V5LnN1YnN0cmluZygxKTtcblxuICByZXR1cm4gKCcnICsga2V5U3Vic3RyaW5nKS5yZXBsYWNlKHVuZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiB1bmVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcbn1cblxudmFyIEtleUVzY2FwZVV0aWxzID0ge1xuICBlc2NhcGU6IGVzY2FwZSxcbiAgdW5lc2NhcGU6IHVuZXNjYXBlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleUVzY2FwZVV0aWxzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvS2V5RXNjYXBlVXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFN0YXRpYyBwb29sZXJzLiBTZXZlcmFsIGN1c3RvbSB2ZXJzaW9ucyBmb3IgZWFjaCBwb3RlbnRpYWwgbnVtYmVyIG9mXG4gKiBhcmd1bWVudHMuIEEgY29tcGxldGVseSBnZW5lcmljIHBvb2xlciBpcyBlYXN5IHRvIGltcGxlbWVudCwgYnV0IHdvdWxkXG4gKiByZXF1aXJlIGFjY2Vzc2luZyB0aGUgYGFyZ3VtZW50c2Agb2JqZWN0LiBJbiBlYWNoIG9mIHRoZXNlLCBgdGhpc2AgcmVmZXJzIHRvXG4gKiB0aGUgQ2xhc3MgaXRzZWxmLCBub3QgYW4gaW5zdGFuY2UuIElmIGFueSBvdGhlcnMgYXJlIG5lZWRlZCwgc2ltcGx5IGFkZCB0aGVtXG4gKiBoZXJlLCBvciBpbiB0aGVpciBvd24gZmlsZXMuXG4gKi9cbnZhciBvbmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChjb3B5RmllbGRzRnJvbSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBjb3B5RmllbGRzRnJvbSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoY29weUZpZWxkc0Zyb20pO1xuICB9XG59O1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMykge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzKTtcbiAgfVxufTtcblxudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQpO1xuICB9XG59O1xuXG52YXIgc3RhbmRhcmRSZWxlYXNlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICAhKGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBfcHJvZEludmFyaWFudCgnMjUnKSA6IHZvaWQgMDtcbiAgaW5zdGFuY2UuZGVzdHJ1Y3RvcigpO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCA8IEtsYXNzLnBvb2xTaXplKSB7XG4gICAgS2xhc3MuaW5zdGFuY2VQb29sLnB1c2goaW5zdGFuY2UpO1xuICB9XG59O1xuXG52YXIgREVGQVVMVF9QT09MX1NJWkUgPSAxMDtcbnZhciBERUZBVUxUX1BPT0xFUiA9IG9uZUFyZ3VtZW50UG9vbGVyO1xuXG4vKipcbiAqIEF1Z21lbnRzIGBDb3B5Q29uc3RydWN0b3JgIHRvIGJlIGEgcG9vbGFibGUgY2xhc3MsIGF1Z21lbnRpbmcgb25seSB0aGUgY2xhc3NcbiAqIGl0c2VsZiAoc3RhdGljYWxseSkgbm90IGFkZGluZyBhbnkgcHJvdG90eXBpY2FsIGZpZWxkcy4gQW55IENvcHlDb25zdHJ1Y3RvclxuICogeW91IGdpdmUgdGhpcyBtYXkgaGF2ZSBhIGBwb29sU2l6ZWAgcHJvcGVydHksIGFuZCB3aWxsIGxvb2sgZm9yIGFcbiAqIHByb3RvdHlwaWNhbCBgZGVzdHJ1Y3RvcmAgb24gaW5zdGFuY2VzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgLy8gQ2FzdGluZyBhcyBhbnkgc28gdGhhdCBmbG93IGlnbm9yZXMgdGhlIGFjdHVhbCBpbXBsZW1lbnRhdGlvbiBhbmQgdHJ1c3RzXG4gIC8vIGl0IHRvIG1hdGNoIHRoZSB0eXBlIHdlIGRlY2xhcmVkXG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdFB1cmVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0UHVyZUNvbXBvbmVudCcpO1xudmFyIFJlYWN0Q2xhc3MgPSByZXF1aXJlKCcuL1JlYWN0Q2xhc3MnKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHJlcXVpcmUoJy4vUmVhY3RET01GYWN0b3JpZXMnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlcycpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJy4vUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBvbmx5Q2hpbGQgPSByZXF1aXJlKCcuL29ubHlDaGlsZCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIHZhciBkaWRXYXJuUHJvcFR5cGVzRGVwcmVjYXRlZCA9IGZhbHNlO1xuICBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQ7XG4gIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbiAgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNsb25lRWxlbWVudDtcbn1cblxudmFyIF9fc3ByZWFkID0gX2Fzc2lnbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBfX3NwcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWQsICdSZWFjdC5fX3NwcmVhZCBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIHVzZWQuIFVzZSAnICsgJ09iamVjdC5hc3NpZ24gZGlyZWN0bHkgb3IgYW5vdGhlciBoZWxwZXIgZnVuY3Rpb24gd2l0aCBzaW1pbGFyICcgKyAnc2VtYW50aWNzLiBZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIHlvdXIgY29tcGlsZXIuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtc3ByZWFkLWRlcHJlY2F0aW9uIGZvciBtb3JlIGRldGFpbHMuJykgOiB2b2lkIDA7XG4gICAgd2FybmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gX2Fzc2lnbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUmVhY3RQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIC8vIERlcHJlY2F0ZWQgaG9vayBmb3IgSlNYIHNwcmVhZCwgZG9uJ3QgdXNlIHRoaXMgZm9yIGFueXRoaW5nLlxuICBfX3NwcmVhZDogX19zcHJlYWRcbn07XG5cbi8vIFRPRE86IEZpeCB0ZXN0cyBzbyB0aGF0IHRoaXMgZGVwcmVjYXRpb24gd2FybmluZyBkb2Vzbid0IGNhdXNlIGZhaWx1cmVzLlxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0LCAnUHJvcFR5cGVzJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5Qcm9wVHlwZXNEZXByZWNhdGVkLCAnQWNjZXNzaW5nIFByb3BUeXBlcyB2aWEgdGhlIG1haW4gUmVhY3QgcGFja2FnZSBpcyBkZXByZWNhdGVkLiBVc2UgJyArICd0aGUgcHJvcC10eXBlcyBwYWNrYWdlIGZyb20gbnBtIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gICAgICAgIGRpZFdhcm5Qcm9wVHlwZXNEZXByZWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdC5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MuZm91ckFyZ3VtZW50UG9vbGVyO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICBGb3JFYWNoQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogbWFwcGluZy4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBNYXBCb29rS2VlcGluZ1xuICogQHBhcmFtIHshKn0gbWFwUmVzdWx0IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICogQHBhcmFtIHshZnVuY3Rpb259IG1hcEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICogQHBhcmFtIHs/Kn0gbWFwQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICovXG5mdW5jdGlvbiBNYXBCb29rS2VlcGluZyhtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gIHRoaXMua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICB0aGlzLmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5NYXBCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICB0aGlzLmtleVByZWZpeCA9IG51bGw7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhNYXBCb29rS2VlcGluZywgZm91ckFyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBNYXBCb29rS2VlcGluZy5nZXRQb29sZWQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICBNYXBCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZER1bW15LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4udG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkcmVuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKSxcbiAgICBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9ICdtaXhpbnMnO1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGFub255bW91cyBmdW5jdGlvbnMgd2hpY2ggZG8gbm90XG4vLyBoYXZlIC5uYW1lIHNldCB0byB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgYmVpbmcgYXNzaWduZWQgdG8uXG5mdW5jdGlvbiBpZGVudGl0eShmbikge1xuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xuXG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBob3N0IGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6ICdERUZJTkVfT05DRScsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICdERUZJTkVfT05DRScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiAnT1ZFUlJJREVfQkFTRSdcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgJ2NoaWxkQ29udGV4dCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsICdjb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsICdwcm9wJyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSAnT1ZFUlJJREVfQkFTRScpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSBgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyBkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzMnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzQnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB0eXBlb2ZTcGVjID0gdHlwZW9mIHNwZWM7XG4gICAgICB2YXIgaXNNaXhpblZhbGlkID0gdHlwZW9mU3BlYyA9PT0gJ29iamVjdCcgJiYgc3BlYyAhPT0gbnVsbDtcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaXNNaXhpblZhbGlkLCAnJXM6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gaW5jbHVkZSBhIG1peGluIHRoYXQgaXMgZWl0aGVyIG51bGwgJyArICdvciBub3QgYW4gb2JqZWN0LiBDaGVjayB0aGUgbWl4aW5zIGluY2x1ZGVkIGJ5IHRoZSBjb21wb25lbnQsICcgKyAnYXMgd2VsbCBhcyBhbnkgbWl4aW5zIHRoZXkgaW5jbHVkZSB0aGVtc2VsdmVzLiAnICsgJ0V4cGVjdGVkIG9iamVjdCBidXQgZ290ICVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgc3BlYyA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2ZTcGVjKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc1JykgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzYnKSA6IHZvaWQgMDtcblxuICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHZhciBhdXRvQmluZFBhaXJzID0gcHJvdG8uX19yZWFjdEF1dG9CaW5kUGFpcnM7XG5cbiAgLy8gQnkgaGFuZGxpbmcgbWl4aW5zIGJlZm9yZSBhbnkgb3RoZXIgcHJvcGVydGllcywgd2UgZW5zdXJlIHRoZSBzYW1lXG4gIC8vIGNoYWluaW5nIG9yZGVyIGlzIGFwcGxpZWQgdG8gbWV0aG9kcyB3aXRoIERFRklORV9NQU5ZIHBvbGljeSwgd2hldGhlclxuICAvLyBtaXhpbnMgYXJlIGxpc3RlZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlc2UgbWV0aG9kcyBpbiB0aGUgc3BlYy5cbiAgaWYgKHNwZWMuaGFzT3duUHJvcGVydHkoTUlYSU5TX0tFWSkpIHtcbiAgICBSRVNFUlZFRF9TUEVDX0tFWVMubWl4aW5zKENvbnN0cnVjdG9yLCBzcGVjLm1peGlucyk7XG4gIH1cblxuICBmb3IgKHZhciBuYW1lIGluIHNwZWMpIHtcbiAgICBpZiAoIXNwZWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSBNSVhJTlNfS0VZKSB7XG4gICAgICAvLyBXZSBoYXZlIGFscmVhZHkgaGFuZGxlZCBtaXhpbnMgaW4gYSBzcGVjaWFsIGNhc2UgYWJvdmUuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcGVydHkgPSBzcGVjW25hbWVdO1xuICAgIHZhciBpc0FscmVhZHlEZWZpbmVkID0gcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKTtcblxuICAgIGlmIChSRVNFUlZFRF9TUEVDX0tFWVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIFJFU0VSVkVEX1NQRUNfS0VZU1tuYW1lXShDb25zdHJ1Y3RvciwgcHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBtZXRob2RzIG9uIHByb3RvdHlwZTpcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbWVtYmVyIG1ldGhvZHMgc2hvdWxkIG5vdCBiZSBhdXRvbWF0aWNhbGx5IGJvdW5kOlxuICAgICAgLy8gMS4gRXhwZWN0ZWQgUmVhY3RDbGFzcyBtZXRob2RzIChpbiB0aGUgXCJpbnRlcmZhY2VcIikuXG4gICAgICAvLyAyLiBPdmVycmlkZGVuIG1ldGhvZHMgKHRoYXQgd2VyZSBtaXhlZCBpbikuXG4gICAgICB2YXIgaXNSZWFjdENsYXNzTWV0aG9kID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgdmFyIHNob3VsZEF1dG9CaW5kID0gaXNGdW5jdGlvbiAmJiAhaXNSZWFjdENsYXNzTWV0aG9kICYmICFpc0FscmVhZHlEZWZpbmVkICYmIHNwZWMuYXV0b2JpbmQgIT09IGZhbHNlO1xuXG4gICAgICBpZiAoc2hvdWxkQXV0b0JpbmQpIHtcbiAgICAgICAgYXV0b0JpbmRQYWlycy5wdXNoKG5hbWUsIHByb3BlcnR5KTtcbiAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdO1xuXG4gICAgICAgICAgLy8gVGhlc2UgY2FzZXMgc2hvdWxkIGFscmVhZHkgYmUgY2F1Z2h0IGJ5IHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUuXG4gICAgICAgICAgIShpc1JlYWN0Q2xhc3NNZXRob2QgJiYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBVbmV4cGVjdGVkIHNwZWMgcG9saWN5ICVzIGZvciBrZXkgJXMgd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc3Jywgc3BlY1BvbGljeSwgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkIHByb3BlcnR5LCBgJXNgLCB0aGF0IHNob3VsZG5cXCd0IGJlIG9uIHRoZSBcInN0YXRpY3NcIiBrZXkuIERlZmluZSBpdCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc4JywgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICB2YXIgaXNJbmhlcml0ZWQgPSBuYW1lIGluIENvbnN0cnVjdG9yO1xuICAgICEhaXNJbmhlcml0ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OScsIG5hbWUpIDogdm9pZCAwO1xuICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYnV0IHRocm93IGlmIGJvdGggY29udGFpbiB0aGUgc2FtZSBrZXkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHR3byBUaGUgc2Vjb25kIG9iamVjdFxuICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICovXG5mdW5jdGlvbiBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKG9uZSwgdHdvKSB7XG4gICEob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBDYW5ub3QgbWVyZ2Ugbm9uLW9iamVjdHMuJykgOiBfcHJvZEludmFyaWFudCgnODAnKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluOyBpbiBwYXJ0aWN1bGFyLCB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdHdvIGdldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBfcHJvZEludmFyaWFudCgnODEnLCBrZXkpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbnZhciBkaWRXYXJuRGVwcmVjYXRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIE1vZHVsZSBmb3IgY3JlYXRpbmcgY29tcG9zaXRlIGNvbXBvbmVudHMuXG4gKlxuICogQGNsYXNzIFJlYWN0Q2xhc3NcbiAqL1xudmFyIFJlYWN0Q2xhc3MgPSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgY29tcG9uZW50IGNsYXNzIGdpdmVuIGEgY2xhc3Mgc3BlY2lmaWNhdGlvbi5cbiAgICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWNsYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlQ2xhc3M6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5EZXByZWNhdGVkLCAnJXM6IFJlYWN0LmNyZWF0ZUNsYXNzIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDE2LiAnICsgJ1VzZSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzZXMgaW5zdGVhZC4gSWYgeW91XFwncmUgbm90IHlldCByZWFkeSB0byAnICsgJ21pZ3JhdGUsIGNyZWF0ZS1yZWFjdC1jbGFzcyBpcyBhdmFpbGFibGUgb24gbnBtIGFzIGEgJyArICdkcm9wLWluIHJlcGxhY2VtZW50LicsIHNwZWMgJiYgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIGRpZFdhcm5EZXByZWNhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUbyBrZWVwIG91ciB3YXJuaW5ncyBtb3JlIHVuZGVyc3RhbmRhYmxlLCB3ZSdsbCB1c2UgYSBsaXR0bGUgaGFjayBoZXJlIHRvXG4gICAgLy8gZW5zdXJlIHRoYXQgQ29uc3RydWN0b3IubmFtZSAhPT0gJ0NvbnN0cnVjdG9yJy4gVGhpcyBtYWtlcyBzdXJlIHdlIGRvbid0XG4gICAgLy8gdW5uZWNlc3NhcmlseSBpZGVudGlmeSBhIGNsYXNzIHdpdGhvdXQgZGlzcGxheU5hbWUgYXMgJ0NvbnN0cnVjdG9yJy5cbiAgICB2YXIgQ29uc3RydWN0b3IgPSBpZGVudGl0eShmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIC8vIFRoaXMgY29uc3RydWN0b3IgZ2V0cyBvdmVycmlkZGVuIGJ5IG1vY2tzLiBUaGUgYXJndW1lbnQgaXMgdXNlZFxuICAgICAgLy8gYnkgbW9ja3MgdG8gYXNzZXJ0IG9uIHdoYXQgZ2V0cyBtb3VudGVkLlxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3IsICdTb21ldGhpbmcgaXMgY2FsbGluZyBhIFJlYWN0IGNvbXBvbmVudCBkaXJlY3RseS4gVXNlIGEgZmFjdG9yeSBvciAnICsgJ0pTWCBpbnN0ZWFkLiBTZWU6IGh0dHBzOi8vZmIubWUvcmVhY3QtbGVnYWN5ZmFjdG9yeScpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBXaXJlIHVwIGF1dG8tYmluZGluZ1xuICAgICAgaWYgKHRoaXMuX19yZWFjdEF1dG9CaW5kUGFpcnMubGVuZ3RoKSB7XG4gICAgICAgIGJpbmRBdXRvQmluZE1ldGhvZHModGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuXG4gICAgICAvLyBSZWFjdENsYXNzZXMgZG9lc24ndCBoYXZlIGNvbnN0cnVjdG9ycy4gSW5zdGVhZCwgdGhleSB1c2UgdGhlXG4gICAgICAvLyBnZXRJbml0aWFsU3RhdGUgYW5kIGNvbXBvbmVudFdpbGxNb3VudCBtZXRob2RzIGZvciBpbml0aWFsaXphdGlvbi5cblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHRoaXMuZ2V0SW5pdGlhbFN0YXRlID8gdGhpcy5nZXRJbml0aWFsU3RhdGUoKSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZ2V0SW5pdGlhbFN0YXRlLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYmFkIHByYWN0aWNlLiBDb25zaWRlciB3YXJuaW5nIGhlcmUgYW5kXG4gICAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgICBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzgyJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfSk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBfcHJvZEludmFyaWFudCgnODMnKSA6IHZvaWQgMDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFNob3VsZFVwZGF0ZSwgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUmVkdWNlIHRpbWUgc3BlbnQgZG9pbmcgbG9va3VwcyBieSBzZXR0aW5nIHRoZXNlIG9uIHRoZSBwcm90b3R5cGUuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBSZWFjdENsYXNzSW50ZXJmYWNlKSB7XG4gICAgICBpZiAoIUNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICBpbmplY3RlZE1peGlucy5wdXNoKG1peGluKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENsYXNzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBzdXBwb3J0ZWQgSFRNTCB0YWdzIHRvIGBSZWFjdERPTUNvbXBvbmVudGAgY2xhc3Nlcy5cbiAqIFRoaXMgaXMgYWxzbyBhY2Nlc3NpYmxlIHZpYSBgUmVhY3QuRE9NYC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHtcbiAgYTogY3JlYXRlRE9NRmFjdG9yeSgnYScpLFxuICBhYmJyOiBjcmVhdGVET01GYWN0b3J5KCdhYmJyJyksXG4gIGFkZHJlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ2FkZHJlc3MnKSxcbiAgYXJlYTogY3JlYXRlRE9NRmFjdG9yeSgnYXJlYScpLFxuICBhcnRpY2xlOiBjcmVhdGVET01GYWN0b3J5KCdhcnRpY2xlJyksXG4gIGFzaWRlOiBjcmVhdGVET01GYWN0b3J5KCdhc2lkZScpLFxuICBhdWRpbzogY3JlYXRlRE9NRmFjdG9yeSgnYXVkaW8nKSxcbiAgYjogY3JlYXRlRE9NRmFjdG9yeSgnYicpLFxuICBiYXNlOiBjcmVhdGVET01GYWN0b3J5KCdiYXNlJyksXG4gIGJkaTogY3JlYXRlRE9NRmFjdG9yeSgnYmRpJyksXG4gIGJkbzogY3JlYXRlRE9NRmFjdG9yeSgnYmRvJyksXG4gIGJpZzogY3JlYXRlRE9NRmFjdG9yeSgnYmlnJyksXG4gIGJsb2NrcXVvdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jsb2NrcXVvdGUnKSxcbiAgYm9keTogY3JlYXRlRE9NRmFjdG9yeSgnYm9keScpLFxuICBicjogY3JlYXRlRE9NRmFjdG9yeSgnYnInKSxcbiAgYnV0dG9uOiBjcmVhdGVET01GYWN0b3J5KCdidXR0b24nKSxcbiAgY2FudmFzOiBjcmVhdGVET01GYWN0b3J5KCdjYW52YXMnKSxcbiAgY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnY2FwdGlvbicpLFxuICBjaXRlOiBjcmVhdGVET01GYWN0b3J5KCdjaXRlJyksXG4gIGNvZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvZGUnKSxcbiAgY29sOiBjcmVhdGVET01GYWN0b3J5KCdjb2wnKSxcbiAgY29sZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbGdyb3VwJyksXG4gIGRhdGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGEnKSxcbiAgZGF0YWxpc3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGFsaXN0JyksXG4gIGRkOiBjcmVhdGVET01GYWN0b3J5KCdkZCcpLFxuICBkZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlbCcpLFxuICBkZXRhaWxzOiBjcmVhdGVET01GYWN0b3J5KCdkZXRhaWxzJyksXG4gIGRmbjogY3JlYXRlRE9NRmFjdG9yeSgnZGZuJyksXG4gIGRpYWxvZzogY3JlYXRlRE9NRmFjdG9yeSgnZGlhbG9nJyksXG4gIGRpdjogY3JlYXRlRE9NRmFjdG9yeSgnZGl2JyksXG4gIGRsOiBjcmVhdGVET01GYWN0b3J5KCdkbCcpLFxuICBkdDogY3JlYXRlRE9NRmFjdG9yeSgnZHQnKSxcbiAgZW06IGNyZWF0ZURPTUZhY3RvcnkoJ2VtJyksXG4gIGVtYmVkOiBjcmVhdGVET01GYWN0b3J5KCdlbWJlZCcpLFxuICBmaWVsZHNldDogY3JlYXRlRE9NRmFjdG9yeSgnZmllbGRzZXQnKSxcbiAgZmlnY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnZmlnY2FwdGlvbicpLFxuICBmaWd1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ3VyZScpLFxuICBmb290ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvb3RlcicpLFxuICBmb3JtOiBjcmVhdGVET01GYWN0b3J5KCdmb3JtJyksXG4gIGgxOiBjcmVhdGVET01GYWN0b3J5KCdoMScpLFxuICBoMjogY3JlYXRlRE9NRmFjdG9yeSgnaDInKSxcbiAgaDM6IGNyZWF0ZURPTUZhY3RvcnkoJ2gzJyksXG4gIGg0OiBjcmVhdGVET01GYWN0b3J5KCdoNCcpLFxuICBoNTogY3JlYXRlRE9NRmFjdG9yeSgnaDUnKSxcbiAgaDY6IGNyZWF0ZURPTUZhY3RvcnkoJ2g2JyksXG4gIGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWQnKSxcbiAgaGVhZGVyOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkZXInKSxcbiAgaGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdoZ3JvdXAnKSxcbiAgaHI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hyJyksXG4gIGh0bWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2h0bWwnKSxcbiAgaTogY3JlYXRlRE9NRmFjdG9yeSgnaScpLFxuICBpZnJhbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ2lmcmFtZScpLFxuICBpbWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltZycpLFxuICBpbnB1dDogY3JlYXRlRE9NRmFjdG9yeSgnaW5wdXQnKSxcbiAgaW5zOiBjcmVhdGVET01GYWN0b3J5KCdpbnMnKSxcbiAga2JkOiBjcmVhdGVET01GYWN0b3J5KCdrYmQnKSxcbiAga2V5Z2VuOiBjcmVhdGVET01GYWN0b3J5KCdrZXlnZW4nKSxcbiAgbGFiZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2xhYmVsJyksXG4gIGxlZ2VuZDogY3JlYXRlRE9NRmFjdG9yeSgnbGVnZW5kJyksXG4gIGxpOiBjcmVhdGVET01GYWN0b3J5KCdsaScpLFxuICBsaW5rOiBjcmVhdGVET01GYWN0b3J5KCdsaW5rJyksXG4gIG1haW46IGNyZWF0ZURPTUZhY3RvcnkoJ21haW4nKSxcbiAgbWFwOiBjcmVhdGVET01GYWN0b3J5KCdtYXAnKSxcbiAgbWFyazogY3JlYXRlRE9NRmFjdG9yeSgnbWFyaycpLFxuICBtZW51OiBjcmVhdGVET01GYWN0b3J5KCdtZW51JyksXG4gIG1lbnVpdGVtOiBjcmVhdGVET01GYWN0b3J5KCdtZW51aXRlbScpLFxuICBtZXRhOiBjcmVhdGVET01GYWN0b3J5KCdtZXRhJyksXG4gIG1ldGVyOiBjcmVhdGVET01GYWN0b3J5KCdtZXRlcicpLFxuICBuYXY6IGNyZWF0ZURPTUZhY3RvcnkoJ25hdicpLFxuICBub3NjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnbm9zY3JpcHQnKSxcbiAgb2JqZWN0OiBjcmVhdGVET01GYWN0b3J5KCdvYmplY3QnKSxcbiAgb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ29sJyksXG4gIG9wdGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdvcHRncm91cCcpLFxuICBvcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGlvbicpLFxuICBvdXRwdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ291dHB1dCcpLFxuICBwOiBjcmVhdGVET01GYWN0b3J5KCdwJyksXG4gIHBhcmFtOiBjcmVhdGVET01GYWN0b3J5KCdwYXJhbScpLFxuICBwaWN0dXJlOiBjcmVhdGVET01GYWN0b3J5KCdwaWN0dXJlJyksXG4gIHByZTogY3JlYXRlRE9NRmFjdG9yeSgncHJlJyksXG4gIHByb2dyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdwcm9ncmVzcycpLFxuICBxOiBjcmVhdGVET01GYWN0b3J5KCdxJyksXG4gIHJwOiBjcmVhdGVET01GYWN0b3J5KCdycCcpLFxuICBydDogY3JlYXRlRE9NRmFjdG9yeSgncnQnKSxcbiAgcnVieTogY3JlYXRlRE9NRmFjdG9yeSgncnVieScpLFxuICBzOiBjcmVhdGVET01GYWN0b3J5KCdzJyksXG4gIHNhbXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3NhbXAnKSxcbiAgc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdzY3JpcHQnKSxcbiAgc2VjdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnc2VjdGlvbicpLFxuICBzZWxlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3NlbGVjdCcpLFxuICBzbWFsbDogY3JlYXRlRE9NRmFjdG9yeSgnc21hbGwnKSxcbiAgc291cmNlOiBjcmVhdGVET01GYWN0b3J5KCdzb3VyY2UnKSxcbiAgc3BhbjogY3JlYXRlRE9NRmFjdG9yeSgnc3BhbicpLFxuICBzdHJvbmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0cm9uZycpLFxuICBzdHlsZTogY3JlYXRlRE9NRmFjdG9yeSgnc3R5bGUnKSxcbiAgc3ViOiBjcmVhdGVET01GYWN0b3J5KCdzdWInKSxcbiAgc3VtbWFyeTogY3JlYXRlRE9NRmFjdG9yeSgnc3VtbWFyeScpLFxuICBzdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1cCcpLFxuICB0YWJsZTogY3JlYXRlRE9NRmFjdG9yeSgndGFibGUnKSxcbiAgdGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rib2R5JyksXG4gIHRkOiBjcmVhdGVET01GYWN0b3J5KCd0ZCcpLFxuICB0ZXh0YXJlYTogY3JlYXRlRE9NRmFjdG9yeSgndGV4dGFyZWEnKSxcbiAgdGZvb3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rmb290JyksXG4gIHRoOiBjcmVhdGVET01GYWN0b3J5KCd0aCcpLFxuICB0aGVhZDogY3JlYXRlRE9NRmFjdG9yeSgndGhlYWQnKSxcbiAgdGltZTogY3JlYXRlRE9NRmFjdG9yeSgndGltZScpLFxuICB0aXRsZTogY3JlYXRlRE9NRmFjdG9yeSgndGl0bGUnKSxcbiAgdHI6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyJyksXG4gIHRyYWNrOiBjcmVhdGVET01GYWN0b3J5KCd0cmFjaycpLFxuICB1OiBjcmVhdGVET01GYWN0b3J5KCd1JyksXG4gIHVsOiBjcmVhdGVET01GYWN0b3J5KCd1bCcpLFxuICAndmFyJzogY3JlYXRlRE9NRmFjdG9yeSgndmFyJyksXG4gIHZpZGVvOiBjcmVhdGVET01GYWN0b3J5KCd2aWRlbycpLFxuICB3YnI6IGNyZWF0ZURPTUZhY3RvcnkoJ3dicicpLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpcmNsZScpLFxuICBjbGlwUGF0aDogY3JlYXRlRE9NRmFjdG9yeSgnY2xpcFBhdGgnKSxcbiAgZGVmczogY3JlYXRlRE9NRmFjdG9yeSgnZGVmcycpLFxuICBlbGxpcHNlOiBjcmVhdGVET01GYWN0b3J5KCdlbGxpcHNlJyksXG4gIGc6IGNyZWF0ZURPTUZhY3RvcnkoJ2cnKSxcbiAgaW1hZ2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltYWdlJyksXG4gIGxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmUnKSxcbiAgbGluZWFyR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmVhckdyYWRpZW50JyksXG4gIG1hc2s6IGNyZWF0ZURPTUZhY3RvcnkoJ21hc2snKSxcbiAgcGF0aDogY3JlYXRlRE9NRmFjdG9yeSgncGF0aCcpLFxuICBwYXR0ZXJuOiBjcmVhdGVET01GYWN0b3J5KCdwYXR0ZXJuJyksXG4gIHBvbHlnb246IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlnb24nKSxcbiAgcG9seWxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlsaW5lJyksXG4gIHJhZGlhbEdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdyYWRpYWxHcmFkaWVudCcpLFxuICByZWN0OiBjcmVhdGVET01GYWN0b3J5KCdyZWN0JyksXG4gIHN0b3A6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0b3AnKSxcbiAgc3ZnOiBjcmVhdGVET01GYWN0b3J5KCdzdmcnKSxcbiAgdGV4dDogY3JlYXRlRE9NRmFjdG9yeSgndGV4dCcpLFxuICB0c3BhbjogY3JlYXRlRE9NRmFjdG9yeSgndHNwYW4nKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3RvcmllcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0RE9NRmFjdG9yaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpLFxuICAgIGlzVmFsaWRFbGVtZW50ID0gX3JlcXVpcmUuaXNWYWxpZEVsZW1lbnQ7XG5cbnZhciBmYWN0b3J5ID0gcmVxdWlyZSgncHJvcC10eXBlcy9mYWN0b3J5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShpc1ZhbGlkRWxlbWVudCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0UHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gUmVhY3RDb21wb25lbnQuXG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBSZWFjdENvbXBvbmVudC5wcm90b3R5cGU7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVhY3RQdXJlQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKFJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdFB1cmVDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjUuNCc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rO1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG59XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/b2JqZWN0fSBlbGVtZW50IFRoZSBSZWFjdCBlbGVtZW50IHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0gez9udW1iZXJ9IGRlYnVnSUQgVGhlIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tSZWFjdFR5cGVTcGVjKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCwgZGVidWdJRCkge1xuICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgISh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzg0JywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpIDogdm9pZCAwO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudFN0YWNrSW5mbyA9ICcnO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKCFSZWFjdENvbXBvbmVudFRyZWVIb29rKSB7XG4gICAgICAgICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWJ1Z0lEICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIGNvbXBvbmVudFN0YWNrSW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tSZWFjdFR5cGVTcGVjO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvY2hlY2tSZWFjdFR5cGVTcGVjLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDMnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL29ubHlDaGlsZC5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgS2V5RXNjYXBlVXRpbHMgPSByZXF1aXJlKCcuL0tleUVzY2FwZVV0aWxzJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVGhpcyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50IHNpbmNlIHRoaXMgZmlsZSBpcyBzaGFyZWQgYmV0d2VlblxuICogaXNvbW9ycGhpYyBhbmQgcmVuZGVyZXJzLiBXZSBjb3VsZCBleHRyYWN0IHRoaXMgdG8gYVxuICpcbiAqL1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBLZXlFc2NhcGVVdGlscy5lc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gIC8vIFRoZSBmb2xsb3dpbmcgaXMgaW5saW5lZCBmcm9tIFJlYWN0RWxlbWVudC4gVGhpcyBtZWFucyB3ZSBjYW4gb3B0aW1pemVcbiAgLy8gc29tZSBjaGVja3MuIFJlYWN0IEZpYmVyIGFsc28gaW5saW5lcyB0aGlzIGxvZ2ljIGZvciBzaW1pbGFyIHB1cnBvc2VzLlxuICB0eXBlID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbi4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyc7XG4gICAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgaWYgKG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lKSB7XG4gICAgICAgICAgICAgIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgKyAnYC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZC4gSXQgaXMgYW4gJyArICdleHBlcmltZW50YWwgZmVhdHVyZSB0aGF0IG1pZ2h0IGJlIHJlbW92ZWQuIENvbnZlcnQgaXQgdG8gYSAnICsgJ3NlcXVlbmNlIC8gaXRlcmFibGUgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLiVzJywgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgY2hpbGQgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBLZXlFc2NhcGVVdGlscy5lc2NhcGUoZW50cnlbMF0pICsgU1VCU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCAwKTtcbiAgICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBfcHJvZEludmFyaWFudCgnMzEnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xudmFyIHN0eWxlc0luRG9tID0ge30sXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciBtZW1vO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIG1lbW87XG5cdFx0fTtcblx0fSxcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0XHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdFx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlciBcblx0XHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0XHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG5cdH0pLFxuXHRnZXRFbGVtZW50ID0gKGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW8gPSB7fTtcblx0XHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHRcdH07XG5cdH0pKGZ1bmN0aW9uIChzdHlsZVRhcmdldCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0eWxlVGFyZ2V0KVxuXHR9KSxcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdLFxuXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vZml4VXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0SW50byA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZVxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcblx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cdGlmICghc3R5bGVUYXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHN0eWxlVGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIHN0eWxlVGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0c3R5bGVUYXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZVRhcmdldC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHN0eWxlVGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YXR0YWNoVGFnQXR0cnMoc3R5bGVFbGVtZW50LCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhdHRhY2hUYWdBdHRycyhsaW5rRWxlbWVudCwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYXR0YWNoVGFnQXR0cnMoZWxlbWVudCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcblx0XHRpZihuZXdPYmopIHtcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcblx0XHR9XG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0LyogSWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpe1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvZml4VXJscy5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==