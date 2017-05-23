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
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSTtBQUNGLFFBQUksR0FBRyxFQUFFO0FBQ1AsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJdkIsVUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLGNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxlQUFLLEVBQUUsTUFBTTtBQUNiLG9CQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEI7S0FDRjtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7O0dBRWI7Q0FDRjs7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O3FCQUVuQixTQUFTIiwiZmlsZSI6ImV4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiJdfQ==


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(15);

var _decorators = __webpack_require__(13);

var _logger = __webpack_require__(23);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.10';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjEwJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiJdfQ==


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseElement = __webpack_require__(7);
var template = __webpack_require__(11);

var BaseModalDialog = function (_BaseElement) {
    _inherits(BaseModalDialog, _BaseElement);

    function BaseModalDialog(options) {
        _classCallCheck(this, BaseModalDialog);

        var _this = _possibleConstructorReturn(this, (BaseModalDialog.__proto__ || Object.getPrototypeOf(BaseModalDialog)).call(this, template));

        _this.title = options.title || "";
        _this.content = options.content || "";
        _this.okCaption = options.okCaption || "ОК";
        _this.hideOkButton = options.hideOkButton || false;
        _this.callback = options.callback || null;
        _this.modalMode = options.modalMode || "md";
        _this.render(true);
        $('body').append(_this.el);
        if (_this.hideOkButton) {
            _this.$('.btn-ok').addClass('hidden');
        }
        _this.show();
        return _this;
    }

    _createClass(BaseModalDialog, [{
        key: 'setupListeners',
        value: function setupListeners() {
            var _this2 = this;

            if (this.callback) {
                this.$('.btn-ok').on('click', function (e) {
                    _this2.runCallback(e);
                });
            }
        }
    }, {
        key: 'runCallback',
        value: function runCallback(e) {
            var result = this.callback(e);
            if (result) {
                this.hide();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.modal('hide');
        }
    }, {
        key: 'show',
        value: function show() {
            this.$el.modal('show');
        }
    }, {
        key: 'setContent',
        value: function setContent(content) {
            this.$('.custom-content').html(content);
        }
    }, {
        key: 'contextData',
        get: function get() {
            return {
                title: this.title,
                content: this.content,
                okCaption: this.okCaption || "OK"
            };
        }
    }]);

    return BaseModalDialog;
}(BaseElement);

module.exports = BaseModalDialog;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseElement = function () {
    /**
     * Конструктор
     * @param template Шаблон
     * @param element элемент, в который все оборачивается
     */
    function BaseElement(template) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';

        _classCallCheck(this, BaseElement);

        /**
         * Элемент, в который оборачивается виджет
         * @type {Element}
         */
        this.el = document.createElement(element);
        //небольшой хелпер
        this.$el = $(this.el);
        /**
         * Шаблон элемента
         */
        this.template = template;
    }

    /**
     * Локальный скоуп
     * @param selector
     * @returns {*}
     */


    _createClass(BaseElement, [{
        key: '$',
        value: function $(selector) {
            return this.$el.find(selector);
        }
    }, {
        key: 'setupListeners',
        value: function setupListeners() {}
    }, {
        key: 'render',
        value: function render() {
            var revertToChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var autoSetupListeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.$el.html(this.template(this.contextData));
            if (revertToChild) {
                this.el = this.el.firstElementChild;
                this.$el = $(this.el);
            }
            if (autoSetupListeners) {
                this.setupListeners();
            }
        }
    }, {
        key: 'contextData',
        get: function get() {
            return {};
        }
    }]);

    return BaseElement;
}();

module.exports = BaseElement;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(12)['default'];


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(8);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "modal-lg";
},"3":function(container,depth0,helpers,partials,data) {
    return "modal-sm";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"modal-dialog "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modalLg : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modalSM : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" role=\"document\">\n        <div class=\"modal-content\">\n\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\n                    "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n                </h4>\n            </div>\n\n            <div class=\"modal-body\">\n                <div class=\"custom-content\">\n                    "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default btn-cancel\" data-dismiss=\"modal\">Отмена</button>\n                    <button type=\"button\" class=\"btn btn-primary btn-ok\">"
    + alias4(((helper = (helper = helpers.okCaption || (depth0 != null ? depth0.okCaption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"okCaption","hash":{},"data":data}) : helper)))
    + "</button>\n                </div>\n\n            </div>\n        </div>\n    </div>";
},"useData":true});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = __webpack_require__(5);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(26);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(2);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(25);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(24);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = __webpack_require__(14);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = __webpack_require__(16);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(17);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(18);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(19);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(20);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(21);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(22);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(5);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcs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QUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUYsU0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDM0I7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iXX0=


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseModalDialog = __webpack_require__(6);
var CHANGE_PROFILE_REQUEST_URL = '/accounts/api/change_request/';

var LibrarianProfile = function () {
    function LibrarianProfile() {
        _classCallCheck(this, LibrarianProfile);

        this.setupListener();
    }

    _createClass(LibrarianProfile, [{
        key: 'setupListener',
        value: function setupListener() {}
    }]);

    return LibrarianProfile;
}();

var ReaderProfile = function () {
    function ReaderProfile() {
        _classCallCheck(this, ReaderProfile);

        this.setupListener();
    }

    _createClass(ReaderProfile, [{
        key: 'setupListener',
        value: function setupListener() {
            var _this = this;

            $('.btn-change-profile-request').on('click', function () {
                _this.sendRequest();
            });
        }
    }, {
        key: 'sendRequest',
        value: function sendRequest() {
            new BaseModalDialog({
                title: "Запрос",
                content: 'Ходите отправить запрос на изменение информации в Вашем профиле?',
                okCaption: 'Отправить',
                callback: function callback() {
                    $.ajax(CHANGE_PROFILE_REQUEST_URL, { method: 'get' }).then(function (data) {
                        if (data.sucess) {
                            alert('Запрос принят');
                        } else {
                            if (data.error) {
                                alert(data.error);
                            }
                        }
                    });
                    return true;
                }
            });
        }
    }]);

    return ReaderProfile;
}();

var readerProfile = new ReaderProfile();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTFkNmUxMjUxY2Q5ZTQxMmExNTg/YzBhMioqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3V0aWxzLmpzPzIzNDkqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcz9iZGQ1KiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzPzc4ZWYqIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL21vZGFsL21vZGFsLmNvbXBvbmVudC5qcz8wZDUzKiIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9CYXNlRWxlbWVudC5qcz9iYTdiKiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvcnVudGltZS5qcz81MjVkKiIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50ZW1wbGF0ZS5oYW5kbGViYXJzPzVlYWMqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUuanM/Yzk5MSoiLCJ3ZWJwYWNrOi8vLy4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvZGVjb3JhdG9ycy5qcz9kMTk2KiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcz83NTU5KiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzLmpzPzI2MzQqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanM/MTZjNSoiLCJ3ZWJwYWNrOi8vLy4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzPzMyZmYqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanM/OWUwZSoiLCJ3ZWJwYWNrOi8vLy4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcz9iNTRhKiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcz9jYzk3KiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcz80ZTA2KiIsIndlYnBhY2s6Ly8vLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanM/YTZhYyoiLCJ3ZWJwYWNrOi8vLy4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvbG9nZ2VyLmpzP2UxOGIqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzPzI2OTUqIiwid2VicGFjazovLy8uL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3J1bnRpbWUuanM/NmEyNCoiLCJ3ZWJwYWNrOi8vLy4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanM/ZDY2NyoiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcz8zNjk4KiIsIndlYnBhY2s6Ly8vLi9hcHAvYWNjb3VudHMvYWNjb3VudHMuanMiXSwibmFtZXMiOlsiQmFzZUVsZW1lbnQiLCJyZXF1aXJlIiwidGVtcGxhdGUiLCJCYXNlTW9kYWxEaWFsb2ciLCJvcHRpb25zIiwidGl0bGUiLCJjb250ZW50Iiwib2tDYXB0aW9uIiwiaGlkZU9rQnV0dG9uIiwiY2FsbGJhY2siLCJtb2RhbE1vZGUiLCJyZW5kZXIiLCIkIiwiYXBwZW5kIiwiZWwiLCJhZGRDbGFzcyIsInNob3ciLCJvbiIsImUiLCJydW5DYWxsYmFjayIsInJlc3VsdCIsImhpZGUiLCIkZWwiLCJtb2RhbCIsImh0bWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNlbGVjdG9yIiwiZmluZCIsInJldmVydFRvQ2hpbGQiLCJhdXRvU2V0dXBMaXN0ZW5lcnMiLCJjb250ZXh0RGF0YSIsImZpcnN0RWxlbWVudENoaWxkIiwic2V0dXBMaXN0ZW5lcnMiLCJDSEFOR0VfUFJPRklMRV9SRVFVRVNUX1VSTCIsIkxpYnJhcmlhblByb2ZpbGUiLCJzZXR1cExpc3RlbmVyIiwiUmVhZGVyUHJvZmlsZSIsInNlbmRSZXF1ZXN0IiwiYWpheCIsIm1ldGhvZCIsInRoZW4iLCJkYXRhIiwic3VjZXNzIiwiYWxlcnQiLCJlcnJvciIsInJlYWRlclByb2ZpbGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWixZQUFZO0FBQ1osY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkOztB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QUFRLENBQVIsQ0FBeEI7QUFDQSxJQUFNb0MsNkJBQTZCLCtCQUFuQzs7SUFFTUMsZ0I7QUFDRixnQ0FBYztBQUFBOztBQUNWLGFBQUtDLGFBQUw7QUFDSDs7Ozt3Q0FFZSxDQUVmOzs7Ozs7SUFHQ0MsYTtBQUNGLDZCQUFjO0FBQUE7O0FBQ1YsYUFBS0QsYUFBTDtBQUNIOzs7O3dDQUVlO0FBQUE7O0FBQ1ozQixjQUFFLDZCQUFGLEVBQWlDSyxFQUFqQyxDQUFvQyxPQUFwQyxFQUE2QyxZQUFJO0FBQUMsc0JBQUt3QixXQUFMO0FBQW9CLGFBQXRFO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFJdEMsZUFBSixDQUFvQjtBQUNoQkUsdUJBQU8sUUFEUztBQUVoQkMseUJBQVMsa0VBRk87QUFHaEJDLDJCQUFXLFdBSEs7QUFJaEJFLDBCQUFVLG9CQUFNO0FBQ1pHLHNCQUFFOEIsSUFBRixDQUFPTCwwQkFBUCxFQUFtQyxFQUFDTSxRQUFRLEtBQVQsRUFBbkMsRUFBb0RDLElBQXBELENBQ0ksVUFBQ0MsSUFBRCxFQUFVO0FBQ04sNEJBQUlBLEtBQUtDLE1BQVQsRUFBaUI7QUFDYkMsa0NBQU0sZUFBTjtBQUNILHlCQUZELE1BR0s7QUFDRCxnQ0FBSUYsS0FBS0csS0FBVCxFQUFnQjtBQUNaRCxzQ0FBTUYsS0FBS0csS0FBWDtBQUNIO0FBQ0o7QUFDSixxQkFWTDtBQVdBLDJCQUFPLElBQVA7QUFDSDtBQWpCZSxhQUFwQjtBQW1CSDs7Ozs7O0FBRUwsSUFBSUMsZ0JBQWdCLElBQUlULGFBQUosRUFBcEIsQyIsImZpbGUiOiJhY2NvdW50cy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMWQ2ZTEyNTFjZDllNDEyYTE1OCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbmV4cG9ydHMuZXNjYXBlRXhwcmVzc2lvbiA9IGVzY2FwZUV4cHJlc3Npb247XG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IGNyZWF0ZUZyYW1lO1xuZXhwb3J0cy5ibG9ja1BhcmFtcyA9IGJsb2NrUGFyYW1zO1xuZXhwb3J0cy5hcHBlbmRDb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoO1xudmFyIGVzY2FwZSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjeDI3OycsXG4gICdgJzogJyYjeDYwOycsXG4gICc9JzogJyYjeDNEOydcbn07XG5cbnZhciBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgcG9zc2libGUgPSAvWyY8PlwiJ2A9XS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBleHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbi8qIGVzbGludC1lbmFibGUgZnVuYy1zdHlsZSAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuXG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICB2YXIgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDNWMGFXeHpMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3UVVGQlFTeEpRVUZOTEUxQlFVMHNSMEZCUnp0QlFVTmlMRXRCUVVjc1JVRkJSU3hQUVVGUE8wRkJRMW9zUzBGQlJ5eEZRVUZGTEUxQlFVMDdRVUZEV0N4TFFVRkhMRVZCUVVVc1RVRkJUVHRCUVVOWUxFdEJRVWNzUlVGQlJTeFJRVUZSTzBGQlEySXNTMEZCUnl4RlFVRkZMRkZCUVZFN1FVRkRZaXhMUVVGSExFVkJRVVVzVVVGQlVUdEJRVU5pTEV0QlFVY3NSVUZCUlN4UlFVRlJPME5CUTJRc1EwRkJRenM3UVVGRlJpeEpRVUZOTEZGQlFWRXNSMEZCUnl4WlFVRlpPMGxCUTNaQ0xGRkJRVkVzUjBGQlJ5eFhRVUZYTEVOQlFVTTdPMEZCUlRkQ0xGTkJRVk1zVlVGQlZTeERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTjJRaXhUUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0RFFVTndRanM3UVVGRlRTeFRRVUZUTEUxQlFVMHNRMEZCUXl4SFFVRkhMRzlDUVVGdFFqdEJRVU16UXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdEJRVU42UXl4VFFVRkxMRWxCUVVrc1IwRkJSeXhKUVVGSkxGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlR0QlFVTTFRaXhWUVVGSkxFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RFFVRkRMRVZCUVVVN1FVRkRNMFFzVjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UFFVTTVRanRMUVVOR08wZEJRMFk3TzBGQlJVUXNVMEZCVHl4SFFVRkhMRU5CUVVNN1EwRkRXanM3UVVGRlRTeEpRVUZKTEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUTBGQlF6czdPenM3TzBGQlMyaEVMRWxCUVVrc1ZVRkJWU3hIUVVGSExHOUNRVUZUTEV0QlFVc3NSVUZCUlR0QlFVTXZRaXhUUVVGUExFOUJRVThzUzBGQlN5eExRVUZMTEZWQlFWVXNRMEZCUXp0RFFVTndReXhEUVVGRE96czdRVUZIUml4SlFVRkpMRlZCUVZVc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJUdEJRVU51UWl4VlFVbE5MRlZCUVZVc1IwRkthRUlzVlVGQlZTeEhRVUZITEZWQlFWTXNTMEZCU3l4RlFVRkZPMEZCUXpOQ0xGZEJRVThzVDBGQlR5eExRVUZMTEV0QlFVc3NWVUZCVlN4SlFVRkpMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NiVUpCUVcxQ0xFTkJRVU03UjBGRGNFWXNRMEZCUXp0RFFVTklPMUZCUTA4c1ZVRkJWU3hIUVVGV0xGVkJRVlU3T3pzN08wRkJTVmdzU1VGQlRTeFBRVUZQTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTlCUVU4c1NVRkJTU3hWUVVGVExFdEJRVXNzUlVGQlJUdEJRVU4wUkN4VFFVRlBMRUZCUVVNc1MwRkJTeXhKUVVGSkxFOUJRVThzUzBGQlN5eExRVUZMTEZGQlFWRXNSMEZCU1N4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEdkQ1FVRm5RaXhIUVVGSExFdEJRVXNzUTBGQlF6dERRVU5xUnl4RFFVRkRPenM3T3p0QlFVZExMRk5CUVZNc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVTdRVUZEY0VNc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRCUVVOb1JDeFJRVUZKTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhMUVVGTExFVkJRVVU3UVVGRGRFSXNZVUZCVHl4RFFVRkRMRU5CUVVNN1MwRkRWanRIUVVOR08wRkJRMFFzVTBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0RFFVTllPenRCUVVkTkxGTkJRVk1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hGUVVGRk8wRkJRM1pETEUxQlFVa3NUMEZCVHl4TlFVRk5MRXRCUVVzc1VVRkJVU3hGUVVGRk96dEJRVVU1UWl4UlFVRkpMRTFCUVUwc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlF6TkNMR0ZCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETzB0QlEzaENMRTFCUVUwc1NVRkJTU3hOUVVGTkxFbEJRVWtzU1VGQlNTeEZRVUZGTzBGQlEzcENMR0ZCUVU4c1JVRkJSU3hEUVVGRE8wdEJRMWdzVFVGQlRTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZPMEZCUTJ4Q0xHRkJRVThzVFVGQlRTeEhRVUZITEVWQlFVVXNRMEZCUXp0TFFVTndRanM3T3pzN1FVRkxSQ3hWUVVGTkxFZEJRVWNzUlVGQlJTeEhRVUZITEUxQlFVMHNRMEZCUXp0SFFVTjBRanM3UVVGRlJDeE5RVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJUdEJRVUZGTEZkQlFVOHNUVUZCVFN4RFFVRkRPMGRCUVVVN1FVRkRPVU1zVTBGQlR5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dERRVU0zUXpzN1FVRkZUU3hUUVVGVExFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVTdRVUZETjBJc1RVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeExRVUZMTEV0QlFVc3NRMEZCUXl4RlFVRkZPMEZCUTNwQ0xGZEJRVThzU1VGQlNTeERRVUZETzBkQlEySXNUVUZCVFN4SlFVRkpMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeExRVUZMTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1JVRkJSVHRCUVVNdlF5eFhRVUZQTEVsQlFVa3NRMEZCUXp0SFFVTmlMRTFCUVUwN1FVRkRUQ3hYUVVGUExFdEJRVXNzUTBGQlF6dEhRVU5rTzBOQlEwWTdPMEZCUlUwc1UwRkJVeXhYUVVGWExFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlEyeERMRTFCUVVrc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkRMMElzVDBGQlN5eERRVUZETEU5QlFVOHNSMEZCUnl4TlFVRk5MRU5CUVVNN1FVRkRka0lzVTBGQlR5eExRVUZMTEVOQlFVTTdRMEZEWkRzN1FVRkZUU3hUUVVGVExGZEJRVmNzUTBGQlF5eE5RVUZOTEVWQlFVVXNSMEZCUnl4RlFVRkZPMEZCUTNaRExGRkJRVTBzUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRPMEZCUTJ4Q0xGTkJRVThzVFVGQlRTeERRVUZETzBOQlEyWTdPMEZCUlUwc1UwRkJVeXhwUWtGQmFVSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1JVRkJSU3hGUVVGRk8wRkJRMnBFTEZOQlFVOHNRMEZCUXl4WFFVRlhMRWRCUVVjc1YwRkJWeXhIUVVGSExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVRXNSMEZCU1N4RlFVRkZMRU5CUVVNN1EwRkRjRVFpTENKbWFXeGxJam9pZFhScGJITXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamIyNXpkQ0JsYzJOaGNHVWdQU0I3WEc0Z0lDY21Kem9nSnlaaGJYQTdKeXhjYmlBZ0p6d25PaUFuSm14ME95Y3NYRzRnSUNjK0p6b2dKeVpuZERzbkxGeHVJQ0FuWENJbk9pQW5KbkYxYjNRN0p5eGNiaUFnWENJblhDSTZJQ2NtSTNneU56c25MRnh1SUNBbllDYzZJQ2NtSTNnMk1Ec25MRnh1SUNBblBTYzZJQ2NtSTNnelJEc25YRzU5TzF4dVhHNWpiMjV6ZENCaVlXUkRhR0Z5Y3lBOUlDOWJKancrWENJbllEMWRMMmNzWEc0Z0lDQWdJQ0J3YjNOemFXSnNaU0E5SUM5YkpqdytYQ0luWUQxZEx6dGNibHh1Wm5WdVkzUnBiMjRnWlhOallYQmxRMmhoY2loamFISXBJSHRjYmlBZ2NtVjBkWEp1SUdWelkyRndaVnRqYUhKZE8xeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWlhoMFpXNWtLRzlpYWk4cUlDd2dMaTR1YzI5MWNtTmxJQ292S1NCN1hHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBeE95QnBJRHdnWVhKbmRXMWxiblJ6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ1ptOXlJQ2hzWlhRZ2EyVjVJR2x1SUdGeVozVnRaVzUwYzF0cFhTa2dlMXh1SUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoaGNtZDFiV1Z1ZEhOYmFWMHNJR3RsZVNrcElIdGNiaUFnSUNBZ0lDQWdiMkpxVzJ0bGVWMGdQU0JoY21kMWJXVnVkSE5iYVYxYmEyVjVYVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdiMkpxTzF4dWZWeHVYRzVsZUhCdmNuUWdiR1YwSUhSdlUzUnlhVzVuSUQwZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnp0Y2JseHVMeThnVTI5MWNtTmxaQ0JtY205dElHeHZaR0Z6YUZ4dUx5OGdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMMkpsYzNScFpXcHpMMnh2WkdGemFDOWliRzlpTDIxaGMzUmxjaTlNU1VORlRsTkZMblI0ZEZ4dUx5b2daWE5zYVc1MExXUnBjMkZpYkdVZ1puVnVZeTF6ZEhsc1pTQXFMMXh1YkdWMElHbHpSblZ1WTNScGIyNGdQU0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuWm5WdVkzUnBiMjRuTzF4dWZUdGNiaTh2SUdaaGJHeGlZV05ySUdadmNpQnZiR1JsY2lCMlpYSnphVzl1Y3lCdlppQkRhSEp2YldVZ1lXNWtJRk5oWm1GeWFWeHVMeW9nYVhOMFlXNWlkV3dnYVdkdWIzSmxJRzVsZUhRZ0tpOWNibWxtSUNocGMwWjFibU4wYVc5dUtDOTRMeWtwSUh0Y2JpQWdhWE5HZFc1amRHbHZiaUE5SUdaMWJtTjBhVzl1S0haaGJIVmxLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyWjFibU4wYVc5dUp5QW1KaUIwYjFOMGNtbHVaeTVqWVd4c0tIWmhiSFZsS1NBOVBUMGdKMXR2WW1wbFkzUWdSblZ1WTNScGIyNWRKenRjYmlBZ2ZUdGNibjFjYm1WNGNHOXlkQ0I3YVhOR2RXNWpkR2x2Ym4wN1hHNHZLaUJsYzJ4cGJuUXRaVzVoWW14bElHWjFibU10YzNSNWJHVWdLaTljYmx4dUx5b2dhWE4wWVc1aWRXd2dhV2R1YjNKbElHNWxlSFFnS2k5Y2JtVjRjRzl5ZENCamIyNXpkQ0JwYzBGeWNtRjVJRDBnUVhKeVlYa3VhWE5CY25KaGVTQjhmQ0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnS0haaGJIVmxJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NwSUQ4Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd4MVpTa2dQVDA5SUNkYmIySnFaV04wSUVGeWNtRjVYU2NnT2lCbVlXeHpaVHRjYm4wN1hHNWNiaTh2SUU5c1pHVnlJRWxGSUhabGNuTnBiMjV6SUdSdklHNXZkQ0JrYVhKbFkzUnNlU0J6ZFhCd2IzSjBJR2x1WkdWNFQyWWdjMjhnZDJVZ2JYVnpkQ0JwYlhCc1pXMWxiblFnYjNWeUlHOTNiaXdnYzJGa2JIa3VYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdhVzVrWlhoUFppaGhjbkpoZVN3Z2RtRnNkV1VwSUh0Y2JpQWdabTl5SUNoc1pYUWdhU0E5SURBc0lHeGxiaUE5SUdGeWNtRjVMbXhsYm1kMGFEc2dhU0E4SUd4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHRnljbUY1VzJsZElEMDlQU0IyWVd4MVpTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHazdYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlBdE1UdGNibjFjYmx4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1pYTmpZWEJsUlhod2NtVnpjMmx2YmloemRISnBibWNwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJ6ZEhKcGJtY2dJVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnTHk4Z1pHOXVKM1FnWlhOallYQmxJRk5oWm1WVGRISnBibWR6TENCemFXNWpaU0IwYUdWNUozSmxJR0ZzY21WaFpIa2djMkZtWlZ4dUlDQWdJR2xtSUNoemRISnBibWNnSmlZZ2MzUnlhVzVuTG5SdlNGUk5UQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSE4wY21sdVp5NTBiMGhVVFV3b0tUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tITjBjbWx1WnlBOVBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnSnljN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNnaGMzUnlhVzVuS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYzNSeWFXNW5JQ3NnSnljN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1JtOXlZMlVnWVNCemRISnBibWNnWTI5dWRtVnljMmx2YmlCaGN5QjBhR2x6SUhkcGJHd2dZbVVnWkc5dVpTQmllU0IwYUdVZ1lYQndaVzVrSUhKbFoyRnlaR3hsYzNNZ1lXNWtYRzRnSUNBZ0x5OGdkR2hsSUhKbFoyVjRJSFJsYzNRZ2QybHNiQ0JrYnlCMGFHbHpJSFJ5WVc1emNHRnlaVzUwYkhrZ1ltVm9hVzVrSUhSb1pTQnpZMlZ1WlhNc0lHTmhkWE5wYm1jZ2FYTnpkV1Z6SUdsbVhHNGdJQ0FnTHk4Z1lXNGdiMkpxWldOMEozTWdkRzhnYzNSeWFXNW5JR2hoY3lCbGMyTmhjR1ZrSUdOb1lYSmhZM1JsY25NZ2FXNGdhWFF1WEc0Z0lDQWdjM1J5YVc1bklEMGdKeWNnS3lCemRISnBibWM3WEc0Z0lIMWNibHh1SUNCcFppQW9JWEJ2YzNOcFlteGxMblJsYzNRb2MzUnlhVzVuS1NrZ2V5QnlaWFIxY200Z2MzUnlhVzVuT3lCOVhHNGdJSEpsZEhWeWJpQnpkSEpwYm1jdWNtVndiR0ZqWlNoaVlXUkRhR0Z5Y3l3Z1pYTmpZWEJsUTJoaGNpazdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCcGMwVnRjSFI1S0haaGJIVmxLU0I3WEc0Z0lHbG1JQ2doZG1Gc2RXVWdKaVlnZG1Gc2RXVWdJVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCbGJITmxJR2xtSUNocGMwRnljbUY1S0haaGJIVmxLU0FtSmlCMllXeDFaUzVzWlc1bmRHZ2dQVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdOeVpXRjBaVVp5WVcxbEtHOWlhbVZqZENrZ2UxeHVJQ0JzWlhRZ1puSmhiV1VnUFNCbGVIUmxibVFvZTMwc0lHOWlhbVZqZENrN1hHNGdJR1p5WVcxbExsOXdZWEpsYm5RZ1BTQnZZbXBsWTNRN1hHNGdJSEpsZEhWeWJpQm1jbUZ0WlR0Y2JuMWNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR0pzYjJOclVHRnlZVzF6S0hCaGNtRnRjeXdnYVdSektTQjdYRzRnSUhCaGNtRnRjeTV3WVhSb0lEMGdhV1J6TzF4dUlDQnlaWFIxY200Z2NHRnlZVzF6TzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ29ZMjl1ZEdWNGRGQmhkR2dzSUdsa0tTQjdYRzRnSUhKbGRIVnliaUFvWTI5dWRHVjRkRkJoZEdnZ1B5QmpiMjUwWlhoMFVHRjBhQ0FySUNjdUp5QTZJQ2NuS1NBcklHbGtPMXh1ZlZ4dUlsMTlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICB2YXIgbG9jID0gbm9kZSAmJiBub2RlLmxvYyxcbiAgICAgIGxpbmUgPSB1bmRlZmluZWQsXG4gICAgICBjb2x1bW4gPSB1bmRlZmluZWQ7XG4gIGlmIChsb2MpIHtcbiAgICBsaW5lID0gbG9jLnN0YXJ0LmxpbmU7XG4gICAgY29sdW1uID0gbG9jLnN0YXJ0LmNvbHVtbjtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgY29sdW1uO1xuICB9XG5cbiAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEV4Y2VwdGlvbik7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChsb2MpIHtcbiAgICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG5cbiAgICAgIC8vIFdvcmsgYXJvdW5kIGlzc3VlIHVuZGVyIHNhZmFyaSB3aGVyZSB3ZSBjYW4ndCBkaXJlY3RseSBzZXQgdGhlIGNvbHVtbiB2YWx1ZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2x1bW4nLCB7XG4gICAgICAgICAgdmFsdWU6IGNvbHVtbixcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChub3ApIHtcbiAgICAvKiBJZ25vcmUgaWYgdGhlIGJyb3dzZXIgaXMgdmVyeSBwYXJ0aWN1bGFyICovXG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBFeGNlcHRpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJWNFkyVndkR2x2Ymk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPMEZCUTBFc1NVRkJUU3hWUVVGVkxFZEJRVWNzUTBGQlF5eGhRVUZoTEVWQlFVVXNWVUZCVlN4RlFVRkZMRmxCUVZrc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeEZRVUZGTEZGQlFWRXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenM3UVVGRmJrY3NVMEZCVXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJUdEJRVU5vUXl4TlFVRkpMRWRCUVVjc1IwRkJSeXhKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVkQlFVYzdUVUZEZEVJc1NVRkJTU3haUVVGQk8wMUJRMG9zVFVGQlRTeFpRVUZCTEVOQlFVTTdRVUZEV0N4TlFVRkpMRWRCUVVjc1JVRkJSVHRCUVVOUUxGRkJRVWtzUjBGQlJ5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJRenRCUVVOMFFpeFZRVUZOTEVkQlFVY3NSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU03TzBGQlJURkNMRmRCUVU4c1NVRkJTU3hMUVVGTExFZEJRVWNzU1VGQlNTeEhRVUZITEVkQlFVY3NSMEZCUnl4TlFVRk5MRU5CUVVNN1IwRkRlRU03TzBGQlJVUXNUVUZCU1N4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6czdPMEZCUnpGRUxFOUJRVXNzU1VGQlNTeEhRVUZITEVkQlFVY3NRMEZCUXl4RlFVRkZMRWRCUVVjc1IwRkJSeXhWUVVGVkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4RlFVRkZPMEZCUTJoRUxGRkJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1IwRkRPVU03T3p0QlFVZEVMRTFCUVVrc1MwRkJTeXhEUVVGRExHbENRVUZwUWl4RlFVRkZPMEZCUXpOQ0xGTkJRVXNzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhKUVVGSkxFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTTdSMEZETVVNN08wRkJSVVFzVFVGQlNUdEJRVU5HTEZGQlFVa3NSMEZCUnl4RlFVRkZPMEZCUTFBc1ZVRkJTU3hEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTTdPenM3UVVGSmRrSXNWVUZCU1N4TlFVRk5MRU5CUVVNc1kwRkJZeXhGUVVGRk8wRkJRM3BDTEdOQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGRkJRVkVzUlVGQlJUdEJRVU53UXl4bFFVRkxMRVZCUVVVc1RVRkJUVHRCUVVOaUxHOUNRVUZWTEVWQlFVVXNTVUZCU1R0VFFVTnFRaXhEUVVGRExFTkJRVU03VDBGRFNpeE5RVUZOTzBGQlEwd3NXVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU03VDBGRGRFSTdTMEZEUmp0SFFVTkdMRU5CUVVNc1QwRkJUeXhIUVVGSExFVkJRVVU3TzBkQlJXSTdRMEZEUmpzN1FVRkZSQ3hUUVVGVExFTkJRVU1zVTBGQlV5eEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRkZMRU5CUVVNN08zRkNRVVZ1UWl4VFFVRlRJaXdpWm1sc1pTSTZJbVY0WTJWd2RHbHZiaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklseHVZMjl1YzNRZ1pYSnliM0pRY205d2N5QTlJRnNuWkdWelkzSnBjSFJwYjI0bkxDQW5abWxzWlU1aGJXVW5MQ0FuYkdsdVpVNTFiV0psY2ljc0lDZHRaWE56WVdkbEp5d2dKMjVoYldVbkxDQW5iblZ0WW1WeUp5d2dKM04wWVdOckoxMDdYRzVjYm1aMWJtTjBhVzl1SUVWNFkyVndkR2x2YmlodFpYTnpZV2RsTENCdWIyUmxLU0I3WEc0Z0lHeGxkQ0JzYjJNZ1BTQnViMlJsSUNZbUlHNXZaR1V1Ykc5akxGeHVJQ0FnSUNBZ2JHbHVaU3hjYmlBZ0lDQWdJR052YkhWdGJqdGNiaUFnYVdZZ0tHeHZZeWtnZTF4dUlDQWdJR3hwYm1VZ1BTQnNiMk11YzNSaGNuUXViR2x1WlR0Y2JpQWdJQ0JqYjJ4MWJXNGdQU0JzYjJNdWMzUmhjblF1WTI5c2RXMXVPMXh1WEc0Z0lDQWdiV1Z6YzJGblpTQXJQU0FuSUMwZ0p5QXJJR3hwYm1VZ0t5QW5PaWNnS3lCamIyeDFiVzQ3WEc0Z0lIMWNibHh1SUNCc1pYUWdkRzF3SUQwZ1JYSnliM0l1Y0hKdmRHOTBlWEJsTG1OdmJuTjBjblZqZEc5eUxtTmhiR3dvZEdocGN5d2diV1Z6YzJGblpTazdYRzVjYmlBZ0x5OGdWVzVtYjNKMGRXNWhkR1ZzZVNCbGNuSnZjbk1nWVhKbElHNXZkQ0JsYm5WdFpYSmhZbXhsSUdsdUlFTm9jbTl0WlNBb1lYUWdiR1ZoYzNRcExDQnpieUJnWm05eUlIQnliM0FnYVc0Z2RHMXdZQ0JrYjJWemJpZDBJSGR2Y21zdVhHNGdJR1p2Y2lBb2JHVjBJR2xrZUNBOUlEQTdJR2xrZUNBOElHVnljbTl5VUhKdmNITXViR1Z1WjNSb095QnBaSGdyS3lrZ2UxeHVJQ0FnSUhSb2FYTmJaWEp5YjNKUWNtOXdjMXRwWkhoZFhTQTlJSFJ0Y0Z0bGNuSnZjbEJ5YjNCelcybGtlRjFkTzF4dUlDQjlYRzVjYmlBZ0x5b2dhWE4wWVc1aWRXd2dhV2R1YjNKbElHVnNjMlVnS2k5Y2JpQWdhV1lnS0VWeWNtOXlMbU5oY0hSMWNtVlRkR0ZqYTFSeVlXTmxLU0I3WEc0Z0lDQWdSWEp5YjNJdVkyRndkSFZ5WlZOMFlXTnJWSEpoWTJVb2RHaHBjeXdnUlhoalpYQjBhVzl1S1R0Y2JpQWdmVnh1WEc0Z0lIUnllU0I3WEc0Z0lDQWdhV1lnS0d4dll5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1c2FXNWxUblZ0WW1WeUlEMGdiR2x1WlR0Y2JseHVJQ0FnSUNBZ0x5OGdWMjl5YXlCaGNtOTFibVFnYVhOemRXVWdkVzVrWlhJZ2MyRm1ZWEpwSUhkb1pYSmxJSGRsSUdOaGJpZDBJR1JwY21WamRHeDVJSE5sZENCMGFHVWdZMjlzZFcxdUlIWmhiSFZsWEc0Z0lDQWdJQ0F2S2lCcGMzUmhibUoxYkNCcFoyNXZjbVVnYm1WNGRDQXFMMXh1SUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTa2dlMXh1SUNBZ0lDQWdJQ0JQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2RHaHBjeXdnSjJOdmJIVnRiaWNzSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZV3gxWlRvZ1kyOXNkVzF1TEZ4dUlDQWdJQ0FnSUNBZ0lHVnVkVzFsY21GaWJHVTZJSFJ5ZFdWY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1OdmJIVnRiaUE5SUdOdmJIVnRianRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgwZ1kyRjBZMmdnS0c1dmNDa2dlMXh1SUNBZ0lDOHFJRWxuYm05eVpTQnBaaUIwYUdVZ1luSnZkM05sY2lCcGN5QjJaWEo1SUhCaGNuUnBZM1ZzWVhJZ0tpOWNiaUFnZlZ4dWZWeHVYRzVGZUdObGNIUnBiMjR1Y0hKdmRHOTBlWEJsSUQwZ2JtVjNJRVZ5Y205eUtDazdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRVY0WTJWd2RHbHZianRjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvZXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkhhbmRsZWJhcnNFbnZpcm9ubWVudCA9IEhhbmRsZWJhcnNFbnZpcm9ubWVudDtcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9leGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xuXG52YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG52YXIgX2hlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIF9kZWNvcmF0b3JzID0gcmVxdWlyZSgnLi9kZWNvcmF0b3JzJyk7XG5cbnZhciBfbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXInKTtcblxudmFyIF9sb2dnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9nZ2VyKTtcblxudmFyIFZFUlNJT04gPSAnNC4wLjEwJztcbmV4cG9ydHMuVkVSU0lPTiA9IFZFUlNJT047XG52YXIgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnRzLkNPTVBJTEVSX1JFVklTSU9OID0gQ09NUElMRVJfUkVWSVNJT047XG52YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmV4cG9ydHMuUkVWSVNJT05fQ0hBTkdFUyA9IFJFVklTSU9OX0NIQU5HRVM7XG52YXIgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5mdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIF9oZWxwZXJzLnJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIF9kZWNvcmF0b3JzLnJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBfbG9nZ2VyMlsnZGVmYXVsdCddLFxuICBsb2c6IF9sb2dnZXIyWydkZWZhdWx0J10ubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbiByZWdpc3RlckhlbHBlcihuYW1lLCBmbikge1xuICAgIGlmIChfdXRpbHMudG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTtcbiAgICAgIH1cbiAgICAgIF91dGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbiB1bnJlZ2lzdGVySGVscGVyKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24gcmVnaXN0ZXJQYXJ0aWFsKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAoX3V0aWxzLnRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIF91dGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ0F0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiIGFzIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24gdW5yZWdpc3RlclBhcnRpYWwobmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbiByZWdpc3RlckRlY29yYXRvcihuYW1lLCBmbikge1xuICAgIGlmIChfdXRpbHMudG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTtcbiAgICAgIH1cbiAgICAgIF91dGlscy5leHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbiB1bnJlZ2lzdGVyRGVjb3JhdG9yKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG52YXIgbG9nID0gX2xvZ2dlcjJbJ2RlZmF1bHQnXS5sb2c7XG5cbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IF91dGlscy5jcmVhdGVGcmFtZTtcbmV4cG9ydHMubG9nZ2VyID0gX2xvZ2dlcjJbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJKaGMyVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdjVUpCUVRSRExGTkJRVk03TzNsQ1FVTXZRaXhoUVVGaE96czdPM1ZDUVVORkxGZEJRVmM3T3pCQ1FVTlNMR05CUVdNN08zTkNRVU51UXl4VlFVRlZPenM3TzBGQlJYUkNMRWxCUVUwc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF6czdRVUZEZWtJc1NVRkJUU3hwUWtGQmFVSXNSMEZCUnl4RFFVRkRMRU5CUVVNN096dEJRVVUxUWl4SlFVRk5MR2RDUVVGblFpeEhRVUZITzBGQlF6bENMRWRCUVVNc1JVRkJSU3hoUVVGaE8wRkJRMmhDTEVkQlFVTXNSVUZCUlN4bFFVRmxPMEZCUTJ4Q0xFZEJRVU1zUlVGQlJTeGxRVUZsTzBGQlEyeENMRWRCUVVNc1JVRkJSU3hWUVVGVk8wRkJRMklzUjBGQlF5eEZRVUZGTEd0Q1FVRnJRanRCUVVOeVFpeEhRVUZETEVWQlFVVXNhVUpCUVdsQ08wRkJRM0JDTEVkQlFVTXNSVUZCUlN4VlFVRlZPME5CUTJRc1EwRkJRenM3TzBGQlJVWXNTVUZCVFN4VlFVRlZMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTTdPMEZCUlRsQ0xGTkJRVk1zY1VKQlFYRkNMRU5CUVVNc1QwRkJUeXhGUVVGRkxGRkJRVkVzUlVGQlJTeFZRVUZWTEVWQlFVVTdRVUZEYmtVc1RVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eFBRVUZQTEVsQlFVa3NSVUZCUlN4RFFVRkRPMEZCUXpkQ0xFMUJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NVVUZCVVN4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVNdlFpeE5RVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRlZCUVZVc1NVRkJTU3hGUVVGRkxFTkJRVU03TzBGQlJXNURMR3REUVVGMVFpeEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTTNRaXgzUTBGQk1FSXNTVUZCU1N4RFFVRkRMRU5CUVVNN1EwRkRha003TzBGQlJVUXNjVUpCUVhGQ0xFTkJRVU1zVTBGQlV5eEhRVUZITzBGQlEyaERMR0ZCUVZjc1JVRkJSU3h4UWtGQmNVSTdPMEZCUld4RExGRkJRVTBzY1VKQlFWRTdRVUZEWkN4TFFVRkhMRVZCUVVVc2IwSkJRVThzUjBGQlJ6czdRVUZGWml4blFrRkJZeXhGUVVGRkxIZENRVUZUTEVsQlFVa3NSVUZCUlN4RlFVRkZMRVZCUVVVN1FVRkRha01zVVVGQlNTeG5Ra0ZCVXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzVlVGQlZTeEZRVUZGTzBGQlEzUkRMRlZCUVVrc1JVRkJSU3hGUVVGRk8wRkJRVVVzWTBGQlRTd3lRa0ZCWXl4NVEwRkJlVU1zUTBGQlF5eERRVUZETzA5QlFVVTdRVUZETTBVc2IwSkJRVThzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVNMVFpeE5RVUZOTzBGQlEwd3NWVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTTdTMEZEZWtJN1IwRkRSanRCUVVORUxHdENRVUZuUWl4RlFVRkZMREJDUVVGVExFbEJRVWtzUlVGQlJUdEJRVU12UWl4WFFVRlBMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdSMEZETTBJN08wRkJSVVFzYVVKQlFXVXNSVUZCUlN4NVFrRkJVeXhKUVVGSkxFVkJRVVVzVDBGQlR5eEZRVUZGTzBGQlEzWkRMRkZCUVVrc1owSkJRVk1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRlZCUVZVc1JVRkJSVHRCUVVOMFF5eHZRa0ZCVHl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlF6ZENMRTFCUVUwN1FVRkRUQ3hWUVVGSkxFOUJRVThzVDBGQlR5eExRVUZMTEZkQlFWY3NSVUZCUlR0QlFVTnNReXhqUVVGTkxIbEZRVUV3UkN4SlFVRkpMRzlDUVVGcFFpeERRVUZETzA5QlEzWkdPMEZCUTBRc1ZVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1MwRkRMMEk3UjBGRFJqdEJRVU5FTEcxQ1FVRnBRaXhGUVVGRkxESkNRVUZUTEVsQlFVa3NSVUZCUlR0QlFVTm9ReXhYUVVGUExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1IwRkROVUk3TzBGQlJVUXNiVUpCUVdsQ0xFVkJRVVVzTWtKQlFWTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1JVRkJSVHRCUVVOd1F5eFJRVUZKTEdkQ1FVRlRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eFZRVUZWTEVWQlFVVTdRVUZEZEVNc1ZVRkJTU3hGUVVGRkxFVkJRVVU3UVVGQlJTeGpRVUZOTERKQ1FVRmpMRFJEUVVFMFF5eERRVUZETEVOQlFVTTdUMEZCUlR0QlFVTTVSU3h2UWtGQlR5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJReTlDTEUxQlFVMDdRVUZEVEN4VlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0TFFVTTFRanRIUVVOR08wRkJRMFFzY1VKQlFXMUNMRVZCUVVVc05rSkJRVk1zU1VGQlNTeEZRVUZGTzBGQlEyeERMRmRCUVU4c1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SFFVTTVRanREUVVOR0xFTkJRVU03TzBGQlJVc3NTVUZCU1N4SFFVRkhMRWRCUVVjc2IwSkJRVThzUjBGQlJ5eERRVUZET3pzN1VVRkZjRUlzVjBGQlZ6dFJRVUZGTEUxQlFVMGlMQ0ptYVd4bElqb2lZbUZ6WlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdZM0psWVhSbFJuSmhiV1VzSUdWNGRHVnVaQ3dnZEc5VGRISnBibWQ5SUdaeWIyMGdKeTR2ZFhScGJITW5PMXh1YVcxd2IzSjBJRVY0WTJWd2RHbHZiaUJtY205dElDY3VMMlY0WTJWd2RHbHZiaWM3WEc1cGJYQnZjblFnZTNKbFoybHpkR1Z5UkdWbVlYVnNkRWhsYkhCbGNuTjlJR1p5YjIwZ0p5NHZhR1ZzY0dWeWN5YzdYRzVwYlhCdmNuUWdlM0psWjJsemRHVnlSR1ZtWVhWc2RFUmxZMjl5WVhSdmNuTjlJR1p5YjIwZ0p5NHZaR1ZqYjNKaGRHOXljeWM3WEc1cGJYQnZjblFnYkc5bloyVnlJR1p5YjIwZ0p5NHZiRzluWjJWeUp6dGNibHh1Wlhod2IzSjBJR052Ym5OMElGWkZVbE5KVDA0Z1BTQW5OQzR3TGpFd0p6dGNibVY0Y0c5eWRDQmpiMjV6ZENCRFQwMVFTVXhGVWw5U1JWWkpVMGxQVGlBOUlEYzdYRzVjYm1WNGNHOXlkQ0JqYjI1emRDQlNSVlpKVTBsUFRsOURTRUZPUjBWVElEMGdlMXh1SUNBeE9pQW5QRDBnTVM0d0xuSmpMakluTENBdkx5QXhMakF1Y21NdU1pQnBjeUJoWTNSMVlXeHNlU0J5WlhZeUlHSjFkQ0JrYjJWemJpZDBJSEpsY0c5eWRDQnBkRnh1SUNBeU9pQW5QVDBnTVM0d0xqQXRjbU11TXljc1hHNGdJRE02SUNjOVBTQXhMakF1TUMxeVl5NDBKeXhjYmlBZ05Eb2dKejA5SURFdWVDNTRKeXhjYmlBZ05Ub2dKejA5SURJdU1DNHdMV0ZzY0doaExuZ25MRnh1SUNBMk9pQW5QajBnTWk0d0xqQXRZbVYwWVM0eEp5eGNiaUFnTnpvZ0p6NDlJRFF1TUM0d0oxeHVmVHRjYmx4dVkyOXVjM1FnYjJKcVpXTjBWSGx3WlNBOUlDZGJiMkpxWldOMElFOWlhbVZqZEYwbk8xeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdTR0Z1Wkd4bFltRnljMFZ1ZG1seWIyNXRaVzUwS0dobGJIQmxjbk1zSUhCaGNuUnBZV3h6TENCa1pXTnZjbUYwYjNKektTQjdYRzRnSUhSb2FYTXVhR1ZzY0dWeWN5QTlJR2hsYkhCbGNuTWdmSHdnZTMwN1hHNGdJSFJvYVhNdWNHRnlkR2xoYkhNZ1BTQndZWEowYVdGc2N5QjhmQ0I3ZlR0Y2JpQWdkR2hwY3k1a1pXTnZjbUYwYjNKeklEMGdaR1ZqYjNKaGRHOXljeUI4ZkNCN2ZUdGNibHh1SUNCeVpXZHBjM1JsY2tSbFptRjFiSFJJWld4d1pYSnpLSFJvYVhNcE8xeHVJQ0J5WldkcGMzUmxja1JsWm1GMWJIUkVaV052Y21GMGIzSnpLSFJvYVhNcE8xeHVmVnh1WEc1SVlXNWtiR1ZpWVhKelJXNTJhWEp2Ym0xbGJuUXVjSEp2ZEc5MGVYQmxJRDBnZTF4dUlDQmpiMjV6ZEhKMVkzUnZjam9nU0dGdVpHeGxZbUZ5YzBWdWRtbHliMjV0Wlc1MExGeHVYRzRnSUd4dloyZGxjam9nYkc5bloyVnlMRnh1SUNCc2IyYzZJR3h2WjJkbGNpNXNiMmNzWEc1Y2JpQWdjbVZuYVhOMFpYSklaV3h3WlhJNklHWjFibU4wYVc5dUtHNWhiV1VzSUdadUtTQjdYRzRnSUNBZ2FXWWdLSFJ2VTNSeWFXNW5MbU5oYkd3b2JtRnRaU2tnUFQwOUlHOWlhbVZqZEZSNWNHVXBJSHRjYmlBZ0lDQWdJR2xtSUNobWJpa2dleUIwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkQmNtY2dibTkwSUhOMWNIQnZjblJsWkNCM2FYUm9JRzExYkhScGNHeGxJR2hsYkhCbGNuTW5LVHNnZlZ4dUlDQWdJQ0FnWlhoMFpXNWtLSFJvYVhNdWFHVnNjR1Z5Y3l3Z2JtRnRaU2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIUm9hWE11YUdWc2NHVnljMXR1WVcxbFhTQTlJR1p1TzF4dUlDQWdJSDFjYmlBZ2ZTeGNiaUFnZFc1eVpXZHBjM1JsY2tobGJIQmxjam9nWm5WdVkzUnBiMjRvYm1GdFpTa2dlMXh1SUNBZ0lHUmxiR1YwWlNCMGFHbHpMbWhsYkhCbGNuTmJibUZ0WlYwN1hHNGdJSDBzWEc1Y2JpQWdjbVZuYVhOMFpYSlFZWEowYVdGc09pQm1kVzVqZEdsdmJpaHVZVzFsTENCd1lYSjBhV0ZzS1NCN1hHNGdJQ0FnYVdZZ0tIUnZVM1J5YVc1bkxtTmhiR3dvYm1GdFpTa2dQVDA5SUc5aWFtVmpkRlI1Y0dVcElIdGNiaUFnSUNBZ0lHVjRkR1Z1WkNoMGFHbHpMbkJoY25ScFlXeHpMQ0J1WVcxbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCd1lYSjBhV0ZzSUQwOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYaGpaWEIwYVc5dUtHQkJkSFJsYlhCMGFXNW5JSFJ2SUhKbFoybHpkR1Z5SUdFZ2NHRnlkR2xoYkNCallXeHNaV1FnWENJa2UyNWhiV1Y5WENJZ1lYTWdkVzVrWldacGJtVmtZQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0IwYUdsekxuQmhjblJwWVd4elcyNWhiV1ZkSUQwZ2NHRnlkR2xoYkR0Y2JpQWdJQ0I5WEc0Z0lIMHNYRzRnSUhWdWNtVm5hWE4wWlhKUVlYSjBhV0ZzT2lCbWRXNWpkR2x2YmlodVlXMWxLU0I3WEc0Z0lDQWdaR1ZzWlhSbElIUm9hWE11Y0dGeWRHbGhiSE5iYm1GdFpWMDdYRzRnSUgwc1hHNWNiaUFnY21WbmFYTjBaWEpFWldOdmNtRjBiM0k2SUdaMWJtTjBhVzl1S0c1aGJXVXNJR1p1S1NCN1hHNGdJQ0FnYVdZZ0tIUnZVM1J5YVc1bkxtTmhiR3dvYm1GdFpTa2dQVDA5SUc5aWFtVmpkRlI1Y0dVcElIdGNiaUFnSUNBZ0lHbG1JQ2htYmlrZ2V5QjBhSEp2ZHlCdVpYY2dSWGhqWlhCMGFXOXVLQ2RCY21jZ2JtOTBJSE4xY0hCdmNuUmxaQ0IzYVhSb0lHMTFiSFJwY0d4bElHUmxZMjl5WVhSdmNuTW5LVHNnZlZ4dUlDQWdJQ0FnWlhoMFpXNWtLSFJvYVhNdVpHVmpiM0poZEc5eWN5d2dibUZ0WlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSFJvYVhNdVpHVmpiM0poZEc5eWMxdHVZVzFsWFNBOUlHWnVPMXh1SUNBZ0lIMWNiaUFnZlN4Y2JpQWdkVzV5WldkcGMzUmxja1JsWTI5eVlYUnZjam9nWm5WdVkzUnBiMjRvYm1GdFpTa2dlMXh1SUNBZ0lHUmxiR1YwWlNCMGFHbHpMbVJsWTI5eVlYUnZjbk5iYm1GdFpWMDdYRzRnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0JzWlhRZ2JHOW5JRDBnYkc5bloyVnlMbXh2Wnp0Y2JseHVaWGh3YjNKMElIdGpjbVZoZEdWR2NtRnRaU3dnYkc5bloyVnlmVHRjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiY29uc3QgQmFzZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9CYXNlRWxlbWVudCcpO1xubGV0IHRlbXBsYXRlID0gcmVxdWlyZSgnLi9tb2RhbC50ZW1wbGF0ZS5oYW5kbGViYXJzJyk7XG5cbmNsYXNzIEJhc2VNb2RhbERpYWxvZyBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGUgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gb3B0aW9ucy5jb250ZW50IHx8IFwiXCI7XG4gICAgICAgIHRoaXMub2tDYXB0aW9uID0gb3B0aW9ucy5va0NhcHRpb24gfHwgXCLQntCaXCI7XG4gICAgICAgIHRoaXMuaGlkZU9rQnV0dG9uID0gb3B0aW9ucy5oaWRlT2tCdXR0b24gfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrIHx8IG51bGw7XG4gICAgICAgIHRoaXMubW9kYWxNb2RlID0gb3B0aW9ucy5tb2RhbE1vZGUgfHwgXCJtZFwiO1xuICAgICAgICB0aGlzLnJlbmRlcih0cnVlKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh0aGlzLmVsKTtcbiAgICAgICAgaWYgKHRoaXMuaGlkZU9rQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLiQoJy5idG4tb2snKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHREYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnQsXG4gICAgICAgICAgICBva0NhcHRpb246IHRoaXMub2tDYXB0aW9uIHx8IFwiT0tcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLiQoJy5idG4tb2snKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucnVuQ2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJ1bkNhbGxiYWNrKGUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2FsbGJhY2soZSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy4kZWwubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLiRlbC5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29udGVudCkge1xuICAgICAgICB0aGlzLiQoJy5jdXN0b20tY29udGVudCcpLmh0bWwoY29udGVudCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VNb2RhbERpYWxvZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5jb21wb25lbnQuanMiLCJjbGFzcyBCYXNlRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICog0JrQvtC90YHRgtGA0YPQutGC0L7RgFxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSDQqNCw0LHQu9C+0L1cbiAgICAgKiBAcGFyYW0gZWxlbWVudCDRjdC70LXQvNC10L3Rgiwg0LIg0LrQvtGC0L7RgNGL0Lkg0LLRgdC1INC+0LHQvtGA0LDRh9C40LLQsNC10YLRgdGPXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGVtcGxhdGUsIGVsZW1lbnQgPSAnZGl2Jykge1xuICAgICAgICAvKipcbiAgICAgICAgICog0K3Qu9C10LzQtdC90YIsINCyINC60L7RgtC+0YDRi9C5INC+0LHQvtGA0LDRh9C40LLQsNC10YLRgdGPINCy0LjQtNC20LXRglxuICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAvL9C90LXQsdC+0LvRjNGI0L7QuSDRhdC10LvQv9C10YBcbiAgICAgICAgdGhpcy4kZWwgPSAkKHRoaXMuZWwpO1xuICAgICAgICAvKipcbiAgICAgICAgICog0KjQsNCx0LvQvtC9INGN0LvQtdC80LXQvdGC0LBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCb0L7QutCw0LvRjNC90YvQuSDRgdC60L7Rg9C/XG4gICAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgJChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWwuZmluZChzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHREYXRhKCkge1xuICAgICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICByZW5kZXIocmV2ZXJ0VG9DaGlsZCA9IGZhbHNlLCBhdXRvU2V0dXBMaXN0ZW5lcnMgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh0aGlzLmNvbnRleHREYXRhKSk7XG4gICAgICAgIGlmIChyZXZlcnRUb0NoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmVsID0gdGhpcy5lbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0b1NldHVwTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUVsZW1lbnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbXBvbmVudHMvQmFzZUVsZW1lbnQuanMiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIi9Vc2Vycy9uaWtvbGFzL2RldmVsb3AvZnJlZWxhbmNlL2lzLWJlbGxpYi5maW4vc3JjL3N0YXRpYy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCJtb2RhbC1sZ1wiO1xufSxcIjNcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIm1vZGFsLXNtXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZyBcIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm1vZGFsTGcgOiBkZXB0aDApLHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiBcIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm1vZGFsU00gOiBkZXB0aDApLHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDMsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIlxcXCIgcm9sZT1cXFwiZG9jdW1lbnRcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPjxzcGFuXFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiIGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxuICAgICAgICAgICAgICAgIDwvaDQ+XFxuICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImN1c3RvbS1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgKyAoKHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY29udGVudCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY29udGVudCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY29udGVudFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgYnRuLWNhbmNlbFxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCI+0J7RgtC80LXQvdCwPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tb2tcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5va0NhcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9rQ2FwdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2tDYXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudGVtcGxhdGUuaGFuZGxlYmFyc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIF9oYW5kbGViYXJzQmFzZSA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9iYXNlJyk7XG5cbnZhciBiYXNlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2hhbmRsZWJhcnNCYXNlKTtcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcblxudmFyIF9oYW5kbGViYXJzU2FmZVN0cmluZyA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZycpO1xuXG52YXIgX2hhbmRsZWJhcnNTYWZlU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNTYWZlU3RyaW5nKTtcblxudmFyIF9oYW5kbGViYXJzRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbicpO1xuXG52YXIgX2hhbmRsZWJhcnNFeGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc0V4Y2VwdGlvbik7XG5cbnZhciBfaGFuZGxlYmFyc1V0aWxzID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL3V0aWxzJyk7XG5cbnZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9oYW5kbGViYXJzVXRpbHMpO1xuXG52YXIgX2hhbmRsZWJhcnNSdW50aW1lID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL3J1bnRpbWUnKTtcblxudmFyIHJ1bnRpbWUgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaGFuZGxlYmFyc1J1bnRpbWUpO1xuXG52YXIgX2hhbmRsZWJhcnNOb0NvbmZsaWN0ID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL25vLWNvbmZsaWN0Jyk7XG5cbnZhciBfaGFuZGxlYmFyc05vQ29uZmxpY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc05vQ29uZmxpY3QpO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IF9oYW5kbGViYXJzU2FmZVN0cmluZzJbJ2RlZmF1bHQnXTtcbiAgaGIuRXhjZXB0aW9uID0gX2hhbmRsZWJhcnNFeGNlcHRpb24yWydkZWZhdWx0J107XG4gIGhiLlV0aWxzID0gVXRpbHM7XG4gIGhiLmVzY2FwZUV4cHJlc3Npb24gPSBVdGlscy5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbiAoc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbnZhciBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxuX2hhbmRsZWJhcnNOb0NvbmZsaWN0MlsnZGVmYXVsdCddKGluc3QpO1xuXG5pbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBpbnN0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TG5KMWJuUnBiV1V1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3T3pzN09FSkJRWE5DTEcxQ1FVRnRRanM3U1VGQk4wSXNTVUZCU1RzN096czdiME5CU1U4c01FSkJRVEJDT3pzN08yMURRVU16UWl4M1FrRkJkMEk3T3pzN0swSkJRM1pDTEc5Q1FVRnZRanM3U1VGQkwwSXNTMEZCU3pzN2FVTkJRMUVzYzBKQlFYTkNPenRKUVVGdVF5eFBRVUZQT3p0dlEwRkZTU3d3UWtGQk1FSTdPenM3TzBGQlIycEVMRk5CUVZNc1RVRkJUU3hIUVVGSE8wRkJRMmhDTEUxQlFVa3NSVUZCUlN4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExIRkNRVUZ4UWl4RlFVRkZMRU5CUVVNN08wRkJSVEZETEU5QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzBGQlEzWkNMRWxCUVVVc1EwRkJReXhWUVVGVkxHOURRVUZoTEVOQlFVTTdRVUZETTBJc1NVRkJSU3hEUVVGRExGTkJRVk1zYlVOQlFWa3NRMEZCUXp0QlFVTjZRaXhKUVVGRkxFTkJRVU1zUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0QlFVTnFRaXhKUVVGRkxFTkJRVU1zWjBKQlFXZENMRWRCUVVjc1MwRkJTeXhEUVVGRExHZENRVUZuUWl4RFFVRkRPenRCUVVVM1F5eEpRVUZGTEVOQlFVTXNSVUZCUlN4SFFVRkhMRTlCUVU4c1EwRkJRenRCUVVOb1FpeEpRVUZGTEVOQlFVTXNVVUZCVVN4SFFVRkhMRlZCUVZNc1NVRkJTU3hGUVVGRk8wRkJRek5DTEZkQlFVOHNUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdSMEZEYmtNc1EwRkJRenM3UVVGRlJpeFRRVUZQTEVWQlFVVXNRMEZCUXp0RFFVTllPenRCUVVWRUxFbEJRVWtzU1VGQlNTeEhRVUZITEUxQlFVMHNSVUZCUlN4RFFVRkRPMEZCUTNCQ0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRPenRCUVVWeVFpeHJRMEZCVnl4SlFVRkpMRU5CUVVNc1EwRkJRenM3UVVGRmFrSXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6czdjVUpCUlZJc1NVRkJTU0lzSW1acGJHVWlPaUpvWVc1a2JHVmlZWEp6TG5KMWJuUnBiV1V1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ0tpQmhjeUJpWVhObElHWnliMjBnSnk0dmFHRnVaR3hsWW1GeWN5OWlZWE5sSnp0Y2JseHVMeThnUldGamFDQnZaaUIwYUdWelpTQmhkV2R0Wlc1MElIUm9aU0JJWVc1a2JHVmlZWEp6SUc5aWFtVmpkQzRnVG04Z2JtVmxaQ0IwYnlCelpYUjFjQ0JvWlhKbExseHVMeThnS0ZSb2FYTWdhWE1nWkc5dVpTQjBieUJsWVhOcGJIa2djMmhoY21VZ1kyOWtaU0JpWlhSM1pXVnVJR052YlcxdmJtcHpJR0Z1WkNCaWNtOTNjMlVnWlc1MmN5bGNibWx0Y0c5eWRDQlRZV1psVTNSeWFXNW5JR1p5YjIwZ0p5NHZhR0Z1Wkd4bFltRnljeTl6WVdabExYTjBjbWx1WnljN1hHNXBiWEJ2Y25RZ1JYaGpaWEIwYVc5dUlHWnliMjBnSnk0dmFHRnVaR3hsWW1GeWN5OWxlR05sY0hScGIyNG5PMXh1YVcxd2IzSjBJQ29nWVhNZ1ZYUnBiSE1nWm5KdmJTQW5MaTlvWVc1a2JHVmlZWEp6TDNWMGFXeHpKenRjYm1sdGNHOXlkQ0FxSUdGeklISjFiblJwYldVZ1puSnZiU0FuTGk5b1lXNWtiR1ZpWVhKekwzSjFiblJwYldVbk8xeHVYRzVwYlhCdmNuUWdibTlEYjI1bWJHbGpkQ0JtY205dElDY3VMMmhoYm1Sc1pXSmhjbk12Ym04dFkyOXVabXhwWTNRbk8xeHVYRzR2THlCR2IzSWdZMjl0Y0dGMGFXSnBiR2wwZVNCaGJtUWdkWE5oWjJVZ2IzVjBjMmxrWlNCdlppQnRiMlIxYkdVZ2MzbHpkR1Z0Y3l3Z2JXRnJaU0IwYUdVZ1NHRnVaR3hsWW1GeWN5QnZZbXBsWTNRZ1lTQnVZVzFsYzNCaFkyVmNibVoxYm1OMGFXOXVJR055WldGMFpTZ3BJSHRjYmlBZ2JHVjBJR2hpSUQwZ2JtVjNJR0poYzJVdVNHRnVaR3hsWW1GeWMwVnVkbWx5YjI1dFpXNTBLQ2s3WEc1Y2JpQWdWWFJwYkhNdVpYaDBaVzVrS0doaUxDQmlZWE5sS1R0Y2JpQWdhR0l1VTJGbVpWTjBjbWx1WnlBOUlGTmhabVZUZEhKcGJtYzdYRzRnSUdoaUxrVjRZMlZ3ZEdsdmJpQTlJRVY0WTJWd2RHbHZianRjYmlBZ2FHSXVWWFJwYkhNZ1BTQlZkR2xzY3p0Y2JpQWdhR0l1WlhOallYQmxSWGh3Y21WemMybHZiaUE5SUZWMGFXeHpMbVZ6WTJGd1pVVjRjSEpsYzNOcGIyNDdYRzVjYmlBZ2FHSXVWazBnUFNCeWRXNTBhVzFsTzF4dUlDQm9ZaTUwWlcxd2JHRjBaU0E5SUdaMWJtTjBhVzl1S0hOd1pXTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2NuVnVkR2x0WlM1MFpXMXdiR0YwWlNoemNHVmpMQ0JvWWlrN1hHNGdJSDA3WEc1Y2JpQWdjbVYwZFhKdUlHaGlPMXh1ZlZ4dVhHNXNaWFFnYVc1emRDQTlJR055WldGMFpTZ3BPMXh1YVc1emRDNWpjbVZoZEdVZ1BTQmpjbVZoZEdVN1hHNWNibTV2UTI5dVpteHBZM1FvYVc1emRDazdYRzVjYm1sdWMzUmJKMlJsWm1GMWJIUW5YU0E5SUdsdWMzUTdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR2x1YzNRN1hHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMgPSByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzO1xuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2RlY29yYXRvcnNJbmxpbmUgPSByZXF1aXJlKCcuL2RlY29yYXRvcnMvaW5saW5lJyk7XG5cbnZhciBfZGVjb3JhdG9yc0lubGluZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWNvcmF0b3JzSW5saW5lKTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICBfZGVjb3JhdG9yc0lubGluZTJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyUmxZMjl5WVhSdmNuTXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdaME5CUVRKQ0xIRkNRVUZ4UWpzN096dEJRVVY2UXl4VFFVRlRMSGxDUVVGNVFpeERRVUZETEZGQlFWRXNSVUZCUlR0QlFVTnNSQ3huUTBGQlpTeFJRVUZSTEVOQlFVTXNRMEZCUXp0RFFVTXhRaUlzSW1acGJHVWlPaUprWldOdmNtRjBiM0p6TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElISmxaMmx6ZEdWeVNXNXNhVzVsSUdaeWIyMGdKeTR2WkdWamIzSmhkRzl5Y3k5cGJteHBibVVuTzF4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2NtVm5hWE4wWlhKRVpXWmhkV3gwUkdWamIzSmhkRzl5Y3locGJuTjBZVzVqWlNrZ2UxeHVJQ0J5WldkcGMzUmxja2x1YkdsdVpTaHBibk4wWVc1alpTazdYRzU5WEc1Y2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2RlY29yYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uIChmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHZhciByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gX3V0aWxzLmV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgdmFyIHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJSbFkyOXlZWFJ2Y25NdmFXNXNhVzVsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdjVUpCUVhGQ0xGVkJRVlU3TzNGQ1FVVm9RaXhWUVVGVExGRkJRVkVzUlVGQlJUdEJRVU5vUXl4VlFVRlJMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNVVUZCVVN4RlFVRkZMRlZCUVZNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUXpORkxGRkJRVWtzUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXp0QlFVTmlMRkZCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEZRVUZGTzBGQlEyNUNMRmRCUVVzc1EwRkJReXhSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEzQkNMRk5CUVVjc1IwRkJSeXhWUVVGVExFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVTdPMEZCUlM5Q0xGbEJRVWtzVVVGQlVTeEhRVUZITEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNN1FVRkRiRU1zYVVKQlFWTXNRMEZCUXl4UlFVRlJMRWRCUVVjc1kwRkJUeXhGUVVGRkxFVkJRVVVzVVVGQlVTeEZRVUZGTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVNeFJDeFpRVUZKTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBGQlF5OUNMR2xDUVVGVExFTkJRVU1zVVVGQlVTeEhRVUZITEZGQlFWRXNRMEZCUXp0QlFVTTVRaXhsUVVGUExFZEJRVWNzUTBGQlF6dFBRVU5hTEVOQlFVTTdTMEZEU0RzN1FVRkZSQ3hUUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVVM1F5eFhRVUZQTEVkQlFVY3NRMEZCUXp0SFFVTmFMRU5CUVVNc1EwRkJRenREUVVOS0lpd2labWxzWlNJNkltbHViR2x1WlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdaWGgwWlc1a2ZTQm1jbTl0SUNjdUxpOTFkR2xzY3ljN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUtHbHVjM1JoYm1ObEtTQjdYRzRnSUdsdWMzUmhibU5sTG5KbFoybHpkR1Z5UkdWamIzSmhkRzl5S0NkcGJteHBibVVuTENCbWRXNWpkR2x2YmlobWJpd2djSEp2Y0hNc0lHTnZiblJoYVc1bGNpd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHeGxkQ0J5WlhRZ1BTQm1ianRjYmlBZ0lDQnBaaUFvSVhCeWIzQnpMbkJoY25ScFlXeHpLU0I3WEc0Z0lDQWdJQ0J3Y205d2N5NXdZWEowYVdGc2N5QTlJSHQ5TzF4dUlDQWdJQ0FnY21WMElEMGdablZ1WTNScGIyNG9ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lDQWdJQ0F2THlCRGNtVmhkR1VnWVNCdVpYY2djR0Z5ZEdsaGJITWdjM1JoWTJzZ1puSmhiV1VnY0hKcGIzSWdkRzhnWlhobFl5NWNiaUFnSUNBZ0lDQWdiR1YwSUc5eWFXZHBibUZzSUQwZ1kyOXVkR0ZwYm1WeUxuQmhjblJwWVd4ek8xeHVJQ0FnSUNBZ0lDQmpiMjUwWVdsdVpYSXVjR0Z5ZEdsaGJITWdQU0JsZUhSbGJtUW9lMzBzSUc5eWFXZHBibUZzTENCd2NtOXdjeTV3WVhKMGFXRnNjeWs3WEc0Z0lDQWdJQ0FnSUd4bGRDQnlaWFFnUFNCbWJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lDQWdZMjl1ZEdGcGJtVnlMbkJoY25ScFlXeHpJRDBnYjNKcFoybHVZV3c3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhRN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhCeWIzQnpMbkJoY25ScFlXeHpXMjl3ZEdsdmJuTXVZWEpuYzFzd1hWMGdQU0J2Y0hScGIyNXpMbVp1TzF4dVhHNGdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdmU2s3WEc1OVhHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5yZWdpc3RlckRlZmF1bHRIZWxwZXJzID0gcmVnaXN0ZXJEZWZhdWx0SGVscGVycztcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nID0gcmVxdWlyZSgnLi9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nJyk7XG5cbnZhciBfaGVscGVyc0Jsb2NrSGVscGVyTWlzc2luZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nKTtcblxudmFyIF9oZWxwZXJzRWFjaCA9IHJlcXVpcmUoJy4vaGVscGVycy9lYWNoJyk7XG5cbnZhciBfaGVscGVyc0VhY2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc0VhY2gpO1xuXG52YXIgX2hlbHBlcnNIZWxwZXJNaXNzaW5nID0gcmVxdWlyZSgnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJyk7XG5cbnZhciBfaGVscGVyc0hlbHBlck1pc3NpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc0hlbHBlck1pc3NpbmcpO1xuXG52YXIgX2hlbHBlcnNJZiA9IHJlcXVpcmUoJy4vaGVscGVycy9pZicpO1xuXG52YXIgX2hlbHBlcnNJZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzSWYpO1xuXG52YXIgX2hlbHBlcnNMb2cgPSByZXF1aXJlKCcuL2hlbHBlcnMvbG9nJyk7XG5cbnZhciBfaGVscGVyc0xvZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzTG9nKTtcblxudmFyIF9oZWxwZXJzTG9va3VwID0gcmVxdWlyZSgnLi9oZWxwZXJzL2xvb2t1cCcpO1xuXG52YXIgX2hlbHBlcnNMb29rdXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc0xvb2t1cCk7XG5cbnZhciBfaGVscGVyc1dpdGggPSByZXF1aXJlKCcuL2hlbHBlcnMvd2l0aCcpO1xuXG52YXIgX2hlbHBlcnNXaXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNXaXRoKTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICBfaGVscGVyc0Jsb2NrSGVscGVyTWlzc2luZzJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG4gIF9oZWxwZXJzRWFjaDJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG4gIF9oZWxwZXJzSGVscGVyTWlzc2luZzJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG4gIF9oZWxwZXJzSWYyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xuICBfaGVscGVyc0xvZzJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG4gIF9oZWxwZXJzTG9va3VwMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbiAgX2hlbHBlcnNXaXRoMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJobGJIQmxjbk11YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3ZVVOQlFYVkRMR2REUVVGblF6czdPenN5UWtGRE9VTXNaMEpCUVdkQ096czdPMjlEUVVOUUxEQkNRVUV3UWpzN096dDVRa0ZEY2tNc1kwRkJZenM3T3pzd1FrRkRZaXhsUVVGbE96czdPelpDUVVOYUxHdENRVUZyUWpzN096c3lRa0ZEY0VJc1owSkJRV2RDT3pzN08wRkJSV3hETEZOQlFWTXNjMEpCUVhOQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTzBGQlF5OURMSGxEUVVFeVFpeFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTnlReXd5UWtGQllTeFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTjJRaXh2UTBGQmMwSXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRhRU1zZVVKQlFWY3NVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRja0lzTUVKQlFWa3NVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRkRUlzTmtKQlFXVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRla0lzTWtKQlFXRXNVVUZCVVN4RFFVRkRMRU5CUVVNN1EwRkRlRUlpTENKbWFXeGxJam9pYUdWc2NHVnljeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCeVpXZHBjM1JsY2tKc2IyTnJTR1ZzY0dWeVRXbHpjMmx1WnlCbWNtOXRJQ2N1TDJobGJIQmxjbk12WW14dlkyc3RhR1ZzY0dWeUxXMXBjM05wYm1jbk8xeHVhVzF3YjNKMElISmxaMmx6ZEdWeVJXRmphQ0JtY205dElDY3VMMmhsYkhCbGNuTXZaV0ZqYUNjN1hHNXBiWEJ2Y25RZ2NtVm5hWE4wWlhKSVpXeHdaWEpOYVhOemFXNW5JR1p5YjIwZ0p5NHZhR1ZzY0dWeWN5OW9aV3h3WlhJdGJXbHpjMmx1WnljN1hHNXBiWEJ2Y25RZ2NtVm5hWE4wWlhKSlppQm1jbTl0SUNjdUwyaGxiSEJsY25NdmFXWW5PMXh1YVcxd2IzSjBJSEpsWjJsemRHVnlURzluSUdaeWIyMGdKeTR2YUdWc2NHVnljeTlzYjJjbk8xeHVhVzF3YjNKMElISmxaMmx6ZEdWeVRHOXZhM1Z3SUdaeWIyMGdKeTR2YUdWc2NHVnljeTlzYjI5cmRYQW5PMXh1YVcxd2IzSjBJSEpsWjJsemRHVnlWMmwwYUNCbWNtOXRJQ2N1TDJobGJIQmxjbk12ZDJsMGFDYzdYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJ5WldkcGMzUmxja1JsWm1GMWJIUklaV3h3WlhKektHbHVjM1JoYm1ObEtTQjdYRzRnSUhKbFoybHpkR1Z5UW14dlkydElaV3h3WlhKTmFYTnphVzVuS0dsdWMzUmhibU5sS1R0Y2JpQWdjbVZuYVhOMFpYSkZZV05vS0dsdWMzUmhibU5sS1R0Y2JpQWdjbVZuYVhOMFpYSklaV3h3WlhKTmFYTnphVzVuS0dsdWMzUmhibU5sS1R0Y2JpQWdjbVZuYVhOMFpYSkpaaWhwYm5OMFlXNWpaU2s3WEc0Z0lISmxaMmx6ZEdWeVRHOW5LR2x1YzNSaGJtTmxLVHRjYmlBZ2NtVm5hWE4wWlhKTWIyOXJkWEFvYVc1emRHRnVZMlVwTzF4dUlDQnlaV2RwYzNSbGNsZHBkR2dvYVc1emRHRnVZMlVwTzF4dWZWeHVJbDE5XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgdmFyIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoX3V0aWxzLmlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICB2YXIgZGF0YSA9IF91dGlscy5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gX3V0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHsgZGF0YTogZGF0YSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJobGJIQmxjbk12WW14dlkyc3RhR1ZzY0dWeUxXMXBjM05wYm1jdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenR4UWtGQmMwUXNWVUZCVlRzN2NVSkJSV3BFTEZWQlFWTXNVVUZCVVN4RlFVRkZPMEZCUTJoRExGVkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzVlVGQlV5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUTNaRkxGRkJRVWtzVDBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXl4UFFVRlBPMUZCUTNwQ0xFVkJRVVVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVWd1FpeFJRVUZKTEU5QlFVOHNTMEZCU3l4SlFVRkpMRVZCUVVVN1FVRkRjRUlzWVVGQlR5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRha0lzVFVGQlRTeEpRVUZKTEU5QlFVOHNTMEZCU3l4TFFVRkxMRWxCUVVrc1QwRkJUeXhKUVVGSkxFbEJRVWtzUlVGQlJUdEJRVU12UXl4aFFVRlBMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU4wUWl4TlFVRk5MRWxCUVVrc1pVRkJVU3hQUVVGUExFTkJRVU1zUlVGQlJUdEJRVU16UWl4VlFVRkpMRTlCUVU4c1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eEZRVUZGTzBGQlEzUkNMRmxCUVVrc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU5tTEdsQ1FVRlBMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUXpsQ096dEJRVVZFTEdWQlFVOHNVVUZCVVN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMDlCUTJoRUxFMUJRVTA3UVVGRFRDeGxRVUZQTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRQUVVOMFFqdExRVU5HTEUxQlFVMDdRVUZEVEN4VlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTXZRaXhaUVVGSkxFbEJRVWtzUjBGQlJ5eHRRa0ZCV1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGNrTXNXVUZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXg1UWtGQmEwSXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUXpkRkxHVkJRVThzUjBGQlJ5eEZRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJRenRQUVVONFFqczdRVUZGUkN4aFFVRlBMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdTMEZETjBJN1IwRkRSaXhEUVVGRExFTkJRVU03UTBGRFNpSXNJbVpwYkdVaU9pSmliRzlqYXkxb1pXeHdaWEl0YldsemMybHVaeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN1lYQndaVzVrUTI5dWRHVjRkRkJoZEdnc0lHTnlaV0YwWlVaeVlXMWxMQ0JwYzBGeWNtRjVmU0JtY205dElDY3VMaTkxZEdsc2N5YzdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVLR2x1YzNSaGJtTmxLU0I3WEc0Z0lHbHVjM1JoYm1ObExuSmxaMmx6ZEdWeVNHVnNjR1Z5S0NkaWJHOWphMGhsYkhCbGNrMXBjM05wYm1jbkxDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2JHVjBJR2x1ZG1WeWMyVWdQU0J2Y0hScGIyNXpMbWx1ZG1WeWMyVXNYRzRnSUNBZ0lDQWdJR1p1SUQwZ2IzQjBhVzl1Y3k1bWJqdGNibHh1SUNBZ0lHbG1JQ2hqYjI1MFpYaDBJRDA5UFNCMGNuVmxLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdabTRvZEdocGN5azdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaGpiMjUwWlhoMElEMDlQU0JtWVd4elpTQjhmQ0JqYjI1MFpYaDBJRDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBiblpsY25ObEtIUm9hWE1wTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvYVhOQmNuSmhlU2hqYjI1MFpYaDBLU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHTnZiblJsZUhRdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1cFpITXBJSHRjYmlBZ0lDQWdJQ0FnSUNCdmNIUnBiMjV6TG1sa2N5QTlJRnR2Y0hScGIyNXpMbTVoYldWZE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2x1YzNSaGJtTmxMbWhsYkhCbGNuTXVaV0ZqYUNoamIyNTBaWGgwTENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJwYm5abGNuTmxLSFJvYVhNcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1a1lYUmhJQ1ltSUc5d2RHbHZibk11YVdSektTQjdYRzRnSUNBZ0lDQWdJR3hsZENCa1lYUmhJRDBnWTNKbFlYUmxSbkpoYldVb2IzQjBhVzl1Y3k1a1lYUmhLVHRjYmlBZ0lDQWdJQ0FnWkdGMFlTNWpiMjUwWlhoMFVHRjBhQ0E5SUdGd2NHVnVaRU52Ym5SbGVIUlFZWFJvS0c5d2RHbHZibk11WkdGMFlTNWpiMjUwWlhoMFVHRjBhQ3dnYjNCMGFXOXVjeTV1WVcxbEtUdGNiaUFnSUNBZ0lDQWdiM0IwYVc5dWN5QTlJSHRrWVhSaE9pQmtZWFJoZlR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUdadUtHTnZiblJsZUhRc0lHOXdkR2x2Ym5NcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OVhHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG52YXIgX2V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL2V4Y2VwdGlvbicpO1xuXG52YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSA9IHVuZGVmaW5lZCxcbiAgICAgICAgY29udGV4dFBhdGggPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IF91dGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoX3V0aWxzLmlzRnVuY3Rpb24oY29udGV4dCkpIHtcbiAgICAgIGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IF91dGlscy5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBfdXRpbHMuYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKF91dGlscy5pc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24oaSwgaSwgaSA9PT0gY29udGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwcmlvcktleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmIChjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuICAgICAgICAgICAgLy8gdGhlIGxhc3QgaXRlcmF0aW9uIHdpdGhvdXQgaGF2ZSB0byBzY2FuIHRoZSBvYmplY3QgdHdpY2UgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYW4gaXRlcm1lZGlhdGUga2V5cyBhcnJheS5cbiAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZaV0ZqYUM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3TzNGQ1FVRXJSU3hWUVVGVk96dDVRa0ZEYmtVc1kwRkJZenM3T3p0eFFrRkZja0lzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJRM3BFTEZGQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVN1FVRkRXaXhaUVVGTkxESkNRVUZqTERaQ1FVRTJRaXhEUVVGRExFTkJRVU03UzBGRGNFUTdPMEZCUlVRc1VVRkJTU3hGUVVGRkxFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdVVUZEWml4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVTg3VVVGRGVrSXNRMEZCUXl4SFFVRkhMRU5CUVVNN1VVRkRUQ3hIUVVGSExFZEJRVWNzUlVGQlJUdFJRVU5TTEVsQlFVa3NXVUZCUVR0UlFVTktMRmRCUVZjc1dVRkJRU3hEUVVGRE96dEJRVVZvUWl4UlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTXZRaXhwUWtGQlZ5eEhRVUZITEhsQ1FVRnJRaXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NSVUZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRPMHRCUTJwR096dEJRVVZFTEZGQlFVa3NhMEpCUVZjc1QwRkJUeXhEUVVGRExFVkJRVVU3UVVGQlJTeGhRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVUZGT3p0QlFVVXhSQ3hSUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVTdRVUZEYUVJc1ZVRkJTU3hIUVVGSExHMUNRVUZaTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOc1F6czdRVUZGUkN4aFFVRlRMR0ZCUVdFc1EwRkJReXhMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTEVsQlFVa3NSVUZCUlR0QlFVTjZReXhWUVVGSkxFbEJRVWtzUlVGQlJUdEJRVU5TTEZsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMnBDTEZsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMjVDTEZsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU42UWl4WlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdPMEZCUlc1Q0xGbEJRVWtzVjBGQlZ5eEZRVUZGTzBGQlEyWXNZMEZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXhYUVVGWExFZEJRVWNzUzBGQlN5eERRVUZETzFOQlEzaERPMDlCUTBZN08wRkJSVVFzVTBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzBGQlF6ZENMRmxCUVVrc1JVRkJSU3hKUVVGSk8wRkJRMVlzYlVKQlFWY3NSVUZCUlN4dFFrRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlN4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRExGZEJRVmNzUjBGQlJ5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1QwRkRMMFVzUTBGQlF5eERRVUZETzB0QlEwbzdPMEZCUlVRc1VVRkJTU3hQUVVGUExFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NVVUZCVVN4RlFVRkZPMEZCUXpGRExGVkJRVWtzWlVGQlVTeFBRVUZQTEVOQlFVTXNSVUZCUlR0QlFVTndRaXhoUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0QlFVTjJReXhqUVVGSkxFTkJRVU1zU1VGQlNTeFBRVUZQTEVWQlFVVTdRVUZEYUVJc2VVSkJRV0VzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1MwRkJTeXhQUVVGUExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMWRCUXk5RE8xTkJRMFk3VDBGRFJpeE5RVUZOTzBGQlEwd3NXVUZCU1N4UlFVRlJMRmxCUVVFc1EwRkJRenM3UVVGRllpeGhRVUZMTEVsQlFVa3NSMEZCUnl4SlFVRkpMRTlCUVU4c1JVRkJSVHRCUVVOMlFpeGpRVUZKTEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVU3T3pzN1FVRkpMMElzWjBKQlFVa3NVVUZCVVN4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVNeFFpd3lRa0ZCWVN4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdZVUZEYUVNN1FVRkRSQ3h2UWtGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXp0QlFVTm1MR0ZCUVVNc1JVRkJSU3hEUVVGRE8xZEJRMHc3VTBGRFJqdEJRVU5FTEZsQlFVa3NVVUZCVVN4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVNeFFpeDFRa0ZCWVN4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTNSRE8wOUJRMFk3UzBGRFJqczdRVUZGUkN4UlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3UVVGRFdDeFRRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRM0pDT3p0QlFVVkVMRmRCUVU4c1IwRkJSeXhEUVVGRE8wZEJRMW9zUTBGQlF5eERRVUZETzBOQlEwb2lMQ0ptYVd4bElqb2laV0ZqYUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ3NJR0pzYjJOclVHRnlZVzF6TENCamNtVmhkR1ZHY21GdFpTd2dhWE5CY25KaGVTd2dhWE5HZFc1amRHbHZibjBnWm5KdmJTQW5MaTR2ZFhScGJITW5PMXh1YVcxd2IzSjBJRVY0WTJWd2RHbHZiaUJtY205dElDY3VMaTlsZUdObGNIUnBiMjRuTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlocGJuTjBZVzVqWlNrZ2UxeHVJQ0JwYm5OMFlXNWpaUzV5WldkcGMzUmxja2hsYkhCbGNpZ25aV0ZqYUNjc0lHWjFibU4wYVc5dUtHTnZiblJsZUhRc0lHOXdkR2x2Ym5NcElIdGNiaUFnSUNCcFppQW9JVzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQWdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjAxMWMzUWdjR0Z6Y3lCcGRHVnlZWFJ2Y2lCMGJ5QWpaV0ZqYUNjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUd4bGRDQm1iaUE5SUc5d2RHbHZibk11Wm00c1hHNGdJQ0FnSUNBZ0lHbHVkbVZ5YzJVZ1BTQnZjSFJwYjI1ekxtbHVkbVZ5YzJVc1hHNGdJQ0FnSUNBZ0lHa2dQU0F3TEZ4dUlDQWdJQ0FnSUNCeVpYUWdQU0FuSnl4Y2JpQWdJQ0FnSUNBZ1pHRjBZU3hjYmlBZ0lDQWdJQ0FnWTI5dWRHVjRkRkJoZEdnN1hHNWNiaUFnSUNCcFppQW9iM0IwYVc5dWN5NWtZWFJoSUNZbUlHOXdkR2x2Ym5NdWFXUnpLU0I3WEc0Z0lDQWdJQ0JqYjI1MFpYaDBVR0YwYUNBOUlHRndjR1Z1WkVOdmJuUmxlSFJRWVhSb0tHOXdkR2x2Ym5NdVpHRjBZUzVqYjI1MFpYaDBVR0YwYUN3Z2IzQjBhVzl1Y3k1cFpITmJNRjBwSUNzZ0p5NG5PMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2hwYzBaMWJtTjBhVzl1S0dOdmJuUmxlSFFwS1NCN0lHTnZiblJsZUhRZ1BTQmpiMjUwWlhoMExtTmhiR3dvZEdocGN5azdJSDFjYmx4dUlDQWdJR2xtSUNodmNIUnBiMjV6TG1SaGRHRXBJSHRjYmlBZ0lDQWdJR1JoZEdFZ1BTQmpjbVZoZEdWR2NtRnRaU2h2Y0hScGIyNXpMbVJoZEdFcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdWNFpXTkpkR1Z5WVhScGIyNG9abWxsYkdRc0lHbHVaR1Y0TENCc1lYTjBLU0I3WEc0Z0lDQWdJQ0JwWmlBb1pHRjBZU2tnZTF4dUlDQWdJQ0FnSUNCa1lYUmhMbXRsZVNBOUlHWnBaV3hrTzF4dUlDQWdJQ0FnSUNCa1lYUmhMbWx1WkdWNElEMGdhVzVrWlhnN1hHNGdJQ0FnSUNBZ0lHUmhkR0V1Wm1seWMzUWdQU0JwYm1SbGVDQTlQVDBnTUR0Y2JpQWdJQ0FnSUNBZ1pHRjBZUzVzWVhOMElEMGdJU0ZzWVhOME8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoamIyNTBaWGgwVUdGMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUdSaGRHRXVZMjl1ZEdWNGRGQmhkR2dnUFNCamIyNTBaWGgwVUdGMGFDQXJJR1pwWld4a08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZENBOUlISmxkQ0FySUdadUtHTnZiblJsZUhSYlptbGxiR1JkTENCN1hHNGdJQ0FnSUNBZ0lHUmhkR0U2SUdSaGRHRXNYRzRnSUNBZ0lDQWdJR0pzYjJOclVHRnlZVzF6T2lCaWJHOWphMUJoY21GdGN5aGJZMjl1ZEdWNGRGdG1hV1ZzWkYwc0lHWnBaV3hrWFN3Z1cyTnZiblJsZUhSUVlYUm9JQ3NnWm1sbGJHUXNJRzUxYkd4ZEtWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR052Ym5SbGVIUWdKaVlnZEhsd1pXOW1JR052Ym5SbGVIUWdQVDA5SUNkdlltcGxZM1FuS1NCN1hHNGdJQ0FnSUNCcFppQW9hWE5CY25KaGVTaGpiMjUwWlhoMEtTa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JxSUQwZ1kyOXVkR1Y0ZEM1c1pXNW5kR2c3SUdrZ1BDQnFPeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2FTQnBiaUJqYjI1MFpYaDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxlR1ZqU1hSbGNtRjBhVzl1S0drc0lHa3NJR2tnUFQwOUlHTnZiblJsZUhRdWJHVnVaM1JvSUMwZ01TazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCc1pYUWdjSEpwYjNKTFpYazdYRzVjYmlBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYTJWNUlHbHVJR052Ym5SbGVIUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9ZMjl1ZEdWNGRDNW9ZWE5QZDI1UWNtOXdaWEowZVNoclpYa3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJYWlNkeVpTQnlkVzV1YVc1bklIUm9aU0JwZEdWeVlYUnBiMjV6SUc5dVpTQnpkR1Z3SUc5MWRDQnZaaUJ6ZVc1aklITnZJSGRsSUdOaGJpQmtaWFJsWTNSY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUhSb1pTQnNZWE4wSUdsMFpYSmhkR2x2YmlCM2FYUm9iM1YwSUdoaGRtVWdkRzhnYzJOaGJpQjBhR1VnYjJKcVpXTjBJSFIzYVdObElHRnVaQ0JqY21WaGRHVmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklHRnVJR2wwWlhKdFpXUnBZWFJsSUd0bGVYTWdZWEp5WVhrdVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NISnBiM0pMWlhrZ0lUMDlJSFZ1WkdWbWFXNWxaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JsZUdWalNYUmxjbUYwYVc5dUtIQnlhVzl5UzJWNUxDQnBJQzBnTVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQndjbWx2Y2t0bGVTQTlJR3RsZVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2tyS3p0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnYVdZZ0tIQnlhVzl5UzJWNUlDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmxlR1ZqU1hSbGNtRjBhVzl1S0hCeWFXOXlTMlY1TENCcElDMGdNU3dnZEhKMVpTazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYVNBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnY21WMElEMGdhVzUyWlhKelpTaDBhR2x6S1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjbVYwTzF4dUlDQjlLVHRjYm4xY2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9leGNlcHRpb24gPSByZXF1aXJlKCcuLi9leGNlcHRpb24nKTtcblxudmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24gKCkgLyogW2FyZ3MsIF1vcHRpb25zICove1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0cnVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZhR1ZzY0dWeUxXMXBjM05wYm1jdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3p0NVFrRkJjMElzWTBGQll6czdPenR4UWtGRmNrSXNWVUZCVXl4UlFVRlJMRVZCUVVVN1FVRkRhRU1zVlVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4bFFVRmxMRVZCUVVVc2FVTkJRV2RETzBGQlEzWkZMRkZCUVVrc1UwRkJVeXhEUVVGRExFMUJRVTBzUzBGQlN5eERRVUZETEVWQlFVVTdPMEZCUlRGQ0xHRkJRVThzVTBGQlV5eERRVUZETzB0QlEyeENMRTFCUVUwN08wRkJSVXdzV1VGQlRTd3lRa0ZCWXl4dFFrRkJiVUlzUjBGQlJ5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1MwRkRka1k3UjBGRFJpeERRVUZETEVOQlFVTTdRMEZEU2lJc0ltWnBiR1VpT2lKb1pXeHdaWEl0YldsemMybHVaeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCRmVHTmxjSFJwYjI0Z1puSnZiU0FuTGk0dlpYaGpaWEIwYVc5dUp6dGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNG9hVzV6ZEdGdVkyVXBJSHRjYmlBZ2FXNXpkR0Z1WTJVdWNtVm5hWE4wWlhKSVpXeHdaWElvSjJobGJIQmxjazFwYzNOcGJtY25MQ0JtZFc1amRHbHZiaWd2S2lCYllYSm5jeXdnWFc5d2RHbHZibk1nS2k4cElIdGNiaUFnSUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQTlQVDBnTVNrZ2UxeHVJQ0FnSUNBZ0x5OGdRU0J0YVhOemFXNW5JR1pwWld4a0lHbHVJR0VnZTN0bWIyOTlmU0JqYjI1emRISjFZM1F1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkVzVrWldacGJtVmtPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBdkx5QlRiMjFsYjI1bElHbHpJR0ZqZEhWaGJHeDVJSFJ5ZVdsdVp5QjBieUJqWVd4c0lITnZiV1YwYUdsdVp5d2dZbXh2ZHlCMWNDNWNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMDFwYzNOcGJtY2dhR1ZzY0dWeU9pQmNJaWNnS3lCaGNtZDFiV1Z1ZEhOYllYSm5kVzFsYm5SekxteGxibWQwYUNBdElERmRMbTVoYldVZ0t5QW5YQ0luS1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1ZlZ4dUlsMTlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbiAoY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoX3V0aWxzLmlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7XG4gICAgICBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwgfHwgX3V0aWxzLmlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbiAoY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7IGZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaCB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmFXWXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3p0eFFrRkJhME1zVlVGQlZUczdjVUpCUlRkQ0xGVkJRVk1zVVVGQlVTeEZRVUZGTzBGQlEyaERMRlZCUVZFc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeEZRVUZGTEZWQlFWTXNWMEZCVnl4RlFVRkZMRTlCUVU4c1JVRkJSVHRCUVVNelJDeFJRVUZKTEd0Q1FVRlhMRmRCUVZjc1EwRkJReXhGUVVGRk8wRkJRVVVzYVVKQlFWY3NSMEZCUnl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzB0QlFVVTdPenM3TzBGQlMzUkZMRkZCUVVrc1FVRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SlFVRkpMRU5CUVVNc1YwRkJWeXhKUVVGTExHVkJRVkVzVjBGQlZ5eERRVUZETEVWQlFVVTdRVUZEZGtVc1lVRkJUeXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUXpsQ0xFMUJRVTA3UVVGRFRDeGhRVUZQTEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UzBGRGVrSTdSMEZEUml4RFFVRkRMRU5CUVVNN08wRkJSVWdzVlVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1ZVRkJVeXhYUVVGWExFVkJRVVVzVDBGQlR5eEZRVUZGTzBGQlF5OUVMRmRCUVU4c1VVRkJVU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGZEJRVmNzUlVGQlJTeEZRVUZETEVWQlFVVXNSVUZCUlN4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNSVUZCUlN4RlFVRkZMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZETEVOQlFVTXNRMEZCUXp0SFFVTjJTQ3hEUVVGRExFTkJRVU03UTBGRFNpSXNJbVpwYkdVaU9pSnBaaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN2FYTkZiWEIwZVN3Z2FYTkdkVzVqZEdsdmJuMGdabkp2YlNBbkxpNHZkWFJwYkhNbk8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpaHBibk4wWVc1alpTa2dlMXh1SUNCcGJuTjBZVzVqWlM1eVpXZHBjM1JsY2tobGJIQmxjaWduYVdZbkxDQm1kVzVqZEdsdmJpaGpiMjVrYVhScGIyNWhiQ3dnYjNCMGFXOXVjeWtnZTF4dUlDQWdJR2xtSUNocGMwWjFibU4wYVc5dUtHTnZibVJwZEdsdmJtRnNLU2tnZXlCamIyNWthWFJwYjI1aGJDQTlJR052Ym1ScGRHbHZibUZzTG1OaGJHd29kR2hwY3lrN0lIMWNibHh1SUNBZ0lDOHZJRVJsWm1GMWJIUWdZbVZvWVhacGIzSWdhWE1nZEc4Z2NtVnVaR1Z5SUhSb1pTQndiM05wZEdsMlpTQndZWFJvSUdsbUlIUm9aU0IyWVd4MVpTQnBjeUIwY25WMGFIa2dZVzVrSUc1dmRDQmxiWEIwZVM1Y2JpQWdJQ0F2THlCVWFHVWdZR2x1WTJ4MVpHVmFaWEp2WUNCdmNIUnBiMjRnYldGNUlHSmxJSE5sZENCMGJ5QjBjbVZoZENCMGFHVWdZMjl1WkhScGIyNWhiQ0JoY3lCd2RYSmxiSGtnYm05MElHVnRjSFI1SUdKaGMyVmtJRzl1SUhSb1pWeHVJQ0FnSUM4dklHSmxhR0YyYVc5eUlHOW1JR2x6Ulcxd2RIa3VJRVZtWm1WamRHbDJaV3g1SUhSb2FYTWdaR1YwWlhKdGFXNWxjeUJwWmlBd0lHbHpJR2hoYm1Sc1pXUWdZbmtnZEdobElIQnZjMmwwYVhabElIQmhkR2dnYjNJZ2JtVm5ZWFJwZG1VdVhHNGdJQ0FnYVdZZ0tDZ2hiM0IwYVc5dWN5NW9ZWE5vTG1sdVkyeDFaR1ZhWlhKdklDWW1JQ0ZqYjI1a2FYUnBiMjVoYkNrZ2ZId2dhWE5GYlhCMGVTaGpiMjVrYVhScGIyNWhiQ2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ2Y0hScGIyNXpMbWx1ZG1WeWMyVW9kR2hwY3lrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnZjSFJwYjI1ekxtWnVLSFJvYVhNcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1Y2JpQWdhVzV6ZEdGdVkyVXVjbVZuYVhOMFpYSklaV3h3WlhJb0ozVnViR1Z6Y3ljc0lHWjFibU4wYVc5dUtHTnZibVJwZEdsdmJtRnNMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHbHVjM1JoYm1ObExtaGxiSEJsY25OYkoybG1KMTB1WTJGc2JDaDBhR2x6TENCamIyNWthWFJwYjI1aGJDd2dlMlp1T2lCdmNIUnBiMjV6TG1sdWRtVnljMlVzSUdsdWRtVnljMlU2SUc5d2RHbHZibk11Wm00c0lHaGhjMmc2SUc5d2RHbHZibk11YUdGemFIMHBPMXh1SUNCOUtUdGNibjFjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbiAoKSAvKiBtZXNzYWdlLCBvcHRpb25zICove1xuICAgIHZhciBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmJHOW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN2NVSkJRV1VzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eExRVUZMTEVWQlFVVXNhME5CUVdsRE8wRkJRemxFTEZGQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRMnhDTEU5QlFVOHNSMEZCUnl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTTVReXhUUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1FVRkROME1zVlVGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU42UWpzN1FVRkZSQ3hSUVVGSkxFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEWkN4UlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVsQlFVa3NSVUZCUlR0QlFVTTVRaXhYUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1MwRkROVUlzVFVGQlRTeEpRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NTVUZCU1N4RlFVRkZPMEZCUTNKRUxGZEJRVXNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRMUVVNMVFqdEJRVU5FTEZGQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU03TzBGQlJXaENMRmxCUVZFc1EwRkJReXhIUVVGSExFMUJRVUVzUTBGQldpeFJRVUZSTEVWQlFWTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1IwRkRlRUlzUTBGQlF5eERRVUZETzBOQlEwb2lMQ0ptYVd4bElqb2liRzluTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2laWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KMnh2Wnljc0lHWjFibU4wYVc5dUtDOHFJRzFsYzNOaFoyVXNJRzl3ZEdsdmJuTWdLaThwSUh0Y2JpQWdJQ0JzWlhRZ1lYSm5jeUE5SUZ0MWJtUmxabWx1WldSZExGeHVJQ0FnSUNBZ0lDQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpXMkZ5WjNWdFpXNTBjeTVzWlc1bmRHZ2dMU0F4WFR0Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnTFNBeE95QnBLeXNwSUh0Y2JpQWdJQ0FnSUdGeVozTXVjSFZ6YUNoaGNtZDFiV1Z1ZEhOYmFWMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHeGxkQ0JzWlhabGJDQTlJREU3WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11YUdGemFDNXNaWFpsYkNBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCc1pYWmxiQ0E5SUc5d2RHbHZibk11YUdGemFDNXNaWFpsYkR0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0c5d2RHbHZibk11WkdGMFlTQW1KaUJ2Y0hScGIyNXpMbVJoZEdFdWJHVjJaV3dnSVQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnYkdWMlpXd2dQU0J2Y0hScGIyNXpMbVJoZEdFdWJHVjJaV3c3WEc0Z0lDQWdmVnh1SUNBZ0lHRnlaM05iTUYwZ1BTQnNaWFpsYkR0Y2JseHVJQ0FnSUdsdWMzUmhibU5sTG14dlp5Z3VMaTRnWVhKbmN5azdYRzRnSUgwcE8xeHVmVnh1SWwxOVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmJHOXZhM1Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdjVUpCUVdVc1ZVRkJVeXhSUVVGUkxFVkJRVVU3UVVGRGFFTXNWVUZCVVN4RFFVRkRMR05CUVdNc1EwRkJReXhSUVVGUkxFVkJRVVVzVlVGQlV5eEhRVUZITEVWQlFVVXNTMEZCU3l4RlFVRkZPMEZCUTNKRUxGZEJRVThzUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRIUVVNeFFpeERRVUZETEVOQlFVTTdRMEZEU2lJc0ltWnBiR1VpT2lKc2IyOXJkWEF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlocGJuTjBZVzVqWlNrZ2UxeHVJQ0JwYm5OMFlXNWpaUzV5WldkcGMzUmxja2hsYkhCbGNpZ25iRzl2YTNWd0p5d2dablZ1WTNScGIyNG9iMkpxTENCbWFXVnNaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFXMlpwWld4a1hUdGNiaUFnZlNrN1hHNTlYRzRpWFgwPVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKF91dGlscy5pc0Z1bmN0aW9uKGNvbnRleHQpKSB7XG4gICAgICBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIV91dGlscy5pc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgZGF0YSA9IF91dGlscy5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gX3V0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogX3V0aWxzLmJsb2NrUGFyYW1zKFtjb250ZXh0XSwgW2RhdGEgJiYgZGF0YS5jb250ZXh0UGF0aF0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZkMmwwYUM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPM0ZDUVVFclJTeFZRVUZWT3p0eFFrRkZNVVVzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJRM3BFTEZGQlFVa3NhMEpCUVZjc1QwRkJUeXhEUVVGRExFVkJRVVU3UVVGQlJTeGhRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVUZGT3p0QlFVVXhSQ3hSUVVGSkxFVkJRVVVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVWd1FpeFJRVUZKTEVOQlFVTXNaVUZCVVN4UFFVRlBMRU5CUVVNc1JVRkJSVHRCUVVOeVFpeFZRVUZKTEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE8wRkJRM2hDTEZWQlFVa3NUMEZCVHl4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU1zUjBGQlJ5eEZRVUZGTzBGQlF5OUNMRmxCUVVrc1IwRkJSeXh0UWtGQldTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRha01zV1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4NVFrRkJhMElzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMDlCUTJoR096dEJRVVZFTEdGQlFVOHNSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJSVHRCUVVOcVFpeFpRVUZKTEVWQlFVVXNTVUZCU1R0QlFVTldMRzFDUVVGWExFVkJRVVVzYlVKQlFWa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRExFbEJRVWtzU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1QwRkRhRVVzUTBGQlF5eERRVUZETzB0QlEwb3NUVUZCVFR0QlFVTk1MR0ZCUVU4c1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0TFFVTTVRanRIUVVOR0xFTkJRVU1zUTBGQlF6dERRVU5LSWl3aVptbHNaU0k2SW5kcGRHZ3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJYQnZjblFnZTJGd2NHVnVaRU52Ym5SbGVIUlFZWFJvTENCaWJHOWphMUJoY21GdGN5d2dZM0psWVhSbFJuSmhiV1VzSUdselJXMXdkSGtzSUdselJuVnVZM1JwYjI1OUlHWnliMjBnSnk0dUwzVjBhV3h6Snp0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KM2RwZEdnbkxDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2FXWWdLR2x6Um5WdVkzUnBiMjRvWTI5dWRHVjRkQ2twSUhzZ1kyOXVkR1Y0ZENBOUlHTnZiblJsZUhRdVkyRnNiQ2gwYUdsektUc2dmVnh1WEc0Z0lDQWdiR1YwSUdadUlEMGdiM0IwYVc5dWN5NW1ianRjYmx4dUlDQWdJR2xtSUNnaGFYTkZiWEIwZVNoamIyNTBaWGgwS1NrZ2UxeHVJQ0FnSUNBZ2JHVjBJR1JoZEdFZ1BTQnZjSFJwYjI1ekxtUmhkR0U3WEc0Z0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1a1lYUmhJQ1ltSUc5d2RHbHZibk11YVdSektTQjdYRzRnSUNBZ0lDQWdJR1JoZEdFZ1BTQmpjbVZoZEdWR2NtRnRaU2h2Y0hScGIyNXpMbVJoZEdFcE8xeHVJQ0FnSUNBZ0lDQmtZWFJoTG1OdmJuUmxlSFJRWVhSb0lEMGdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ29iM0IwYVc5dWN5NWtZWFJoTG1OdmJuUmxlSFJRWVhSb0xDQnZjSFJwYjI1ekxtbGtjMXN3WFNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCbWJpaGpiMjUwWlhoMExDQjdYRzRnSUNBZ0lDQWdJR1JoZEdFNklHUmhkR0VzWEc0Z0lDQWdJQ0FnSUdKc2IyTnJVR0Z5WVcxek9pQmliRzlqYTFCaGNtRnRjeWhiWTI5dWRHVjRkRjBzSUZ0a1lYUmhJQ1ltSUdSaGRHRXVZMjl1ZEdWNGRGQmhkR2hkS1Z4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnZjSFJwYjI1ekxtbHVkbVZ5YzJVb2RHaHBjeWs3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibjFjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG4gIGxldmVsOiAnaW5mbycsXG5cbiAgLy8gTWFwcyBhIGdpdmVuIGxldmVsIHZhbHVlIHRvIHRoZSBgbWV0aG9kTWFwYCBpbmRleGVzIGFib3ZlLlxuICBsb29rdXBMZXZlbDogZnVuY3Rpb24gbG9va3VwTGV2ZWwobGV2ZWwpIHtcbiAgICBpZiAodHlwZW9mIGxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGxldmVsTWFwID0gX3V0aWxzLmluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uIGxvZyhsZXZlbCkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIHZhciBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBtZXRob2QgPSAnbG9nJztcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1lc3NhZ2UgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIG1lc3NhZ2VbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlW21ldGhvZF0uYXBwbHkoY29uc29sZSwgbWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gbG9nZ2VyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyeHZaMmRsY2k1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPM0ZDUVVGelFpeFRRVUZUT3p0QlFVVXZRaXhKUVVGSkxFMUJRVTBzUjBGQlJ6dEJRVU5ZTEZkQlFWTXNSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEU5QlFVOHNRMEZCUXp0QlFVTTNReXhQUVVGTExFVkJRVVVzVFVGQlRUczdPMEZCUjJJc1lVRkJWeXhGUVVGRkxIRkNRVUZUTEV0QlFVc3NSVUZCUlR0QlFVTXpRaXhSUVVGSkxFOUJRVThzUzBGQlN5eExRVUZMTEZGQlFWRXNSVUZCUlR0QlFVTTNRaXhWUVVGSkxGRkJRVkVzUjBGQlJ5eGxRVUZSTEUxQlFVMHNRMEZCUXl4VFFVRlRMRVZCUVVVc1MwRkJTeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETEVOQlFVTTdRVUZET1VRc1ZVRkJTU3hSUVVGUkxFbEJRVWtzUTBGQlF5eEZRVUZGTzBGQlEycENMR0ZCUVVzc1IwRkJSeXhSUVVGUkxFTkJRVU03VDBGRGJFSXNUVUZCVFR0QlFVTk1MR0ZCUVVzc1IwRkJSeXhSUVVGUkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMDlCUXpkQ08wdEJRMFk3TzBGQlJVUXNWMEZCVHl4TFFVRkxMRU5CUVVNN1IwRkRaRHM3TzBGQlIwUXNTMEZCUnl4RlFVRkZMR0ZCUVZNc1MwRkJTeXhGUVVGak8wRkJReTlDTEZOQlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZET3p0QlFVVnNReXhSUVVGSkxFOUJRVThzVDBGQlR5eExRVUZMTEZkQlFWY3NTVUZCU1N4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4TFFVRkxMRVZCUVVVN1FVRkRMMFVzVlVGQlNTeE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU55UXl4VlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGT3p0QlFVTndRaXhqUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETzA5QlEyaENPenQzUTBGUWJVSXNUMEZCVHp0QlFVRlFMR1ZCUVU4N096dEJRVkV6UWl4aFFVRlBMRU5CUVVNc1RVRkJUU3hQUVVGRExFTkJRV1lzVDBGQlR5eEZRVUZaTEU5QlFVOHNRMEZCUXl4RFFVRkRPMHRCUXpkQ08wZEJRMFk3UTBGRFJpeERRVUZET3p0eFFrRkZZU3hOUVVGTklpd2labWxzWlNJNklteHZaMmRsY2k1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdhVzVrWlhoUFpuMGdabkp2YlNBbkxpOTFkR2xzY3ljN1hHNWNibXhsZENCc2IyZG5aWElnUFNCN1hHNGdJRzFsZEdodlpFMWhjRG9nV3lka1pXSjFaeWNzSUNkcGJtWnZKeXdnSjNkaGNtNG5MQ0FuWlhKeWIzSW5YU3hjYmlBZ2JHVjJaV3c2SUNkcGJtWnZKeXhjYmx4dUlDQXZMeUJOWVhCeklHRWdaMmwyWlc0Z2JHVjJaV3dnZG1Gc2RXVWdkRzhnZEdobElHQnRaWFJvYjJSTllYQmdJR2x1WkdWNFpYTWdZV0p2ZG1VdVhHNGdJR3h2YjJ0MWNFeGxkbVZzT2lCbWRXNWpkR2x2Ymloc1pYWmxiQ2tnZTF4dUlDQWdJR2xtSUNoMGVYQmxiMllnYkdWMlpXd2dQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnSUNCc1pYUWdiR1YyWld4TllYQWdQU0JwYm1SbGVFOW1LR3h2WjJkbGNpNXRaWFJvYjJSTllYQXNJR3hsZG1Wc0xuUnZURzkzWlhKRFlYTmxLQ2twTzF4dUlDQWdJQ0FnYVdZZ0tHeGxkbVZzVFdGd0lENDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjJaV3dnUFNCc1pYWmxiRTFoY0R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUd4bGRtVnNJRDBnY0dGeWMyVkpiblFvYkdWMlpXd3NJREV3S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdiR1YyWld3N1hHNGdJSDBzWEc1Y2JpQWdMeThnUTJGdUlHSmxJRzkyWlhKeWFXUmtaVzRnYVc0Z2RHaGxJR2h2YzNRZ1pXNTJhWEp2Ym0xbGJuUmNiaUFnYkc5bk9pQm1kVzVqZEdsdmJpaHNaWFpsYkN3Z0xpNHViV1Z6YzJGblpTa2dlMXh1SUNBZ0lHeGxkbVZzSUQwZ2JHOW5aMlZ5TG14dmIydDFjRXhsZG1Wc0tHeGxkbVZzS1R0Y2JseHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1kyOXVjMjlzWlNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2JHOW5aMlZ5TG14dmIydDFjRXhsZG1Wc0tHeHZaMmRsY2k1c1pYWmxiQ2tnUEQwZ2JHVjJaV3dwSUh0Y2JpQWdJQ0FnSUd4bGRDQnRaWFJvYjJRZ1BTQnNiMmRuWlhJdWJXVjBhRzlrVFdGd1cyeGxkbVZzWFR0Y2JpQWdJQ0FnSUdsbUlDZ2hZMjl1YzI5c1pWdHRaWFJvYjJSZEtTQjdJQ0FnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0YkdsdVpTQnVieTFqYjI1emIyeGxYRzRnSUNBZ0lDQWdJRzFsZEdodlpDQTlJQ2RzYjJjbk8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ1kyOXVjMjlzWlZ0dFpYUm9iMlJkS0M0dUxtMWxjM05oWjJVcE95QWdJQ0F2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMV052Ym5OdmJHVmNiaUFnSUNCOVhHNGdJSDFjYm4wN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHeHZaMmRsY2p0Y2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2xvZ2dlci5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKEhhbmRsZWJhcnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgdmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyxcbiAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBIYW5kbGViYXJzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyNXZMV052Ym1ac2FXTjBMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN08zRkNRVU5sTEZWQlFWTXNWVUZCVlN4RlFVRkZPenRCUVVWc1F5eE5RVUZKTEVsQlFVa3NSMEZCUnl4UFFVRlBMRTFCUVUwc1MwRkJTeXhYUVVGWExFZEJRVWNzVFVGQlRTeEhRVUZITEUxQlFVMDdUVUZEZEVRc1YwRkJWeXhIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdPMEZCUld4RExGbEJRVlVzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCVnp0QlFVTnFReXhSUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEV0QlFVc3NWVUZCVlN4RlFVRkZPMEZCUTJ4RExGVkJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NWMEZCVnl4RFFVRkRPMHRCUXk5Q08wRkJRMFFzVjBGQlR5eFZRVUZWTEVOQlFVTTdSMEZEYmtJc1EwRkJRenREUVVOSUlpd2labWxzWlNJNkltNXZMV052Ym1ac2FXTjBMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b2daMnh2WW1Gc0lIZHBibVJ2ZHlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b1NHRnVaR3hsWW1GeWN5a2dlMXh1SUNBdktpQnBjM1JoYm1KMWJDQnBaMjV2Y21VZ2JtVjRkQ0FxTDF4dUlDQnNaWFFnY205dmRDQTlJSFI1Y0dWdlppQm5iRzlpWVd3Z0lUMDlJQ2QxYm1SbFptbHVaV1FuSUQ4Z1oyeHZZbUZzSURvZ2QybHVaRzkzTEZ4dUlDQWdJQ0FnSkVoaGJtUnNaV0poY25NZ1BTQnliMjkwTGtoaGJtUnNaV0poY25NN1hHNGdJQzhxSUdsemRHRnVZblZzSUdsbmJtOXlaU0J1WlhoMElDb3ZYRzRnSUVoaGJtUnNaV0poY25NdWJtOURiMjVtYkdsamRDQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJR2xtSUNoeWIyOTBMa2hoYm1Sc1pXSmhjbk1nUFQwOUlFaGhibVJzWldKaGNuTXBJSHRjYmlBZ0lDQWdJSEp2YjNRdVNHRnVaR3hsWW1GeWN5QTlJQ1JJWVc1a2JHVmlZWEp6TzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1NHRnVaR3hsWW1GeWN6dGNiaUFnZlR0Y2JuMWNiaUpkZlE9PVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9uby1jb25mbGljdC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuY2hlY2tSZXZpc2lvbiA9IGNoZWNrUmV2aXNpb247XG5leHBvcnRzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG5leHBvcnRzLndyYXBQcm9ncmFtID0gd3JhcFByb2dyYW07XG5leHBvcnRzLnJlc29sdmVQYXJ0aWFsID0gcmVzb2x2ZVBhcnRpYWw7XG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO1xuZXhwb3J0cy5ub29wID0gbm9vcDtcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIFV0aWxzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzKTtcblxudmFyIF9leGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xuXG52YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG52YXIgX2Jhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICBjdXJyZW50UmV2aXNpb24gPSBfYmFzZS5DT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBfYmFzZS5SRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IF9iYXNlLlJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgKyAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICB2YXIgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24gc3RyaWN0KG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24gbG9va3VwKGRlcHRocywgbmFtZSkge1xuICAgICAgdmFyIGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uIGxhbWJkYShjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uIGZuKGkpIHtcbiAgICAgIHZhciByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbiBwcm9ncmFtKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIHZhciBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEodmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24gbWVyZ2UocGFyYW0sIGNvbW1vbikge1xuICAgICAgdmFyIG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiBwYXJhbSAhPT0gY29tbW9uKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIHZhciBkZXB0aHMgPSB1bmRlZmluZWQsXG4gICAgICAgIGJsb2NrUGFyYW1zID0gdGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zID8gW10gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBjb250ZXh0ICE9IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQgLyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbiAoaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICB2YXIgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT0gZGVwdGhzWzBdICYmICEoY29udGV4dCA9PT0gY29udGFpbmVyLm51bGxDb250ZXh0ICYmIGRlcHRoc1swXSA9PT0gbnVsbCkpIHtcbiAgICAgIGN1cnJlbnREZXB0aHMgPSBbY29udGV4dF0uY29uY2F0KGRlcHRocyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgb3B0aW9ucy5kYXRhIHx8IGRhdGEsIGJsb2NrUGFyYW1zICYmIFtvcHRpb25zLmJsb2NrUGFyYW1zXS5jb25jYXQoYmxvY2tQYXJhbXMpLCBjdXJyZW50RGVwdGhzKTtcbiAgfVxuXG4gIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgdmFyIGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIHZhciBwYXJ0aWFsQmxvY2sgPSB1bmRlZmluZWQ7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgb3B0aW9ucy5kYXRhID0gX2Jhc2UuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG4gICAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGZ1bmN0aW9uIHBhcnRpYWxCbG9ja1dyYXBwZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcbiAgICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICAgIG9wdGlvbnMuZGF0YSA9IF9iYXNlLmNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcbiAgICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIGlmIChmbi5wYXJ0aWFscykge1xuICAgICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9vcCgpIHtcbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gX2Jhc2UuY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwzSjFiblJwYldVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN096czdPenM3T3pzN2NVSkJRWFZDTEZOQlFWTTdPMGxCUVhCQ0xFdEJRVXM3TzNsQ1FVTkxMR0ZCUVdFN096czdiMEpCUXpoQ0xGRkJRVkU3TzBGQlJXeEZMRk5CUVZNc1lVRkJZU3hEUVVGRExGbEJRVmtzUlVGQlJUdEJRVU14UXl4TlFVRk5MR2RDUVVGblFpeEhRVUZITEZsQlFWa3NTVUZCU1N4WlFVRlpMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dE5RVU4yUkN4bFFVRmxMREJDUVVGdlFpeERRVUZET3p0QlFVVXhReXhOUVVGSkxHZENRVUZuUWl4TFFVRkxMR1ZCUVdVc1JVRkJSVHRCUVVONFF5eFJRVUZKTEdkQ1FVRm5RaXhIUVVGSExHVkJRV1VzUlVGQlJUdEJRVU4wUXl4VlFVRk5MR1ZCUVdVc1IwRkJSeXgxUWtGQmFVSXNaVUZCWlN4RFFVRkRPMVZCUTI1RUxHZENRVUZuUWl4SFFVRkhMSFZDUVVGcFFpeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8wRkJRelZFTEZsQlFVMHNNa0pCUVdNc2VVWkJRWGxHTEVkQlEzWkhMSEZFUVVGeFJDeEhRVUZITEdWQlFXVXNSMEZCUnl4dFJFRkJiVVFzUjBGQlJ5eG5Ra0ZCWjBJc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU5vU3l4TlFVRk5PenRCUVVWTUxGbEJRVTBzTWtKQlFXTXNkMFpCUVhkR0xFZEJRM1JITEdsRVFVRnBSQ3hIUVVGSExGbEJRVmtzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOdVJqdEhRVU5HTzBOQlEwWTdPMEZCUlUwc1UwRkJVeXhSUVVGUkxFTkJRVU1zV1VGQldTeEZRVUZGTEVkQlFVY3NSVUZCUlRzN1FVRkZNVU1zVFVGQlNTeERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTlNMRlZCUVUwc01rSkJRV01zYlVOQlFXMURMRU5CUVVNc1EwRkJRenRIUVVNeFJEdEJRVU5FTEUxQlFVa3NRMEZCUXl4WlFVRlpMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeEZRVUZGTzBGQlEzWkRMRlZCUVUwc01rSkJRV01zTWtKQlFUSkNMRWRCUVVjc1QwRkJUeXhaUVVGWkxFTkJRVU1zUTBGQlF6dEhRVU40UlRzN1FVRkZSQ3hqUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4WlFVRlpMRU5CUVVNc1RVRkJUU3hEUVVGRE96czdPMEZCU1d4RUxFdEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNZVUZCWVN4RFFVRkRMRmxCUVZrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6czdRVUZGTlVNc1YwRkJVeXh2UWtGQmIwSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJUdEJRVU4yUkN4UlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVU3UVVGRGFFSXNZVUZCVHl4SFFVRkhMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGJFUXNWVUZCU1N4UFFVRlBMRU5CUVVNc1IwRkJSeXhGUVVGRk8wRkJRMllzWlVGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU03VDBGRGRrSTdTMEZEUmpzN1FVRkZSQ3hYUVVGUExFZEJRVWNzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8wRkJRM1JGTEZGQlFVa3NUVUZCVFN4SFFVRkhMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zWVVGQllTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXpzN1FVRkZlRVVzVVVGQlNTeE5RVUZOTEVsQlFVa3NTVUZCU1N4SlFVRkpMRWRCUVVjc1EwRkJReXhQUVVGUExFVkJRVVU3UVVGRGFrTXNZVUZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhQUVVGUExFVkJRVVVzV1VGQldTeERRVUZETEdWQlFXVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRCUVVONlJpeFpRVUZOTEVkQlFVY3NUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8wdEJRek5FTzBGQlEwUXNVVUZCU1N4TlFVRk5MRWxCUVVrc1NVRkJTU3hGUVVGRk8wRkJRMnhDTEZWQlFVa3NUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJSVHRCUVVOc1FpeFpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlF5OUNMR0ZCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1FVRkROVU1zWTBGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlR0QlFVTTFRaXhyUWtGQlRUdFhRVU5RT3p0QlFVVkVMR1ZCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVFN4SFFVRkhMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU4wUXp0QlFVTkVMR05CUVUwc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMDlCUXpOQ08wRkJRMFFzWVVGQlR5eE5RVUZOTEVOQlFVTTdTMEZEWml4TlFVRk5PMEZCUTB3c1dVRkJUU3d5UWtGQll5eGpRVUZqTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1IwRkJSeXd3UkVGQk1FUXNRMEZCUXl4RFFVRkRPMHRCUTJwSU8wZEJRMFk3T3p0QlFVZEVMRTFCUVVrc1UwRkJVeXhIUVVGSE8wRkJRMlFzVlVGQlRTeEZRVUZGTEdkQ1FVRlRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVU3UVVGRE1VSXNWVUZCU1N4RlFVRkZMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVUVzUVVGQlF5eEZRVUZGTzBGQlEyeENMR05CUVUwc01rSkJRV01zUjBGQlJ5eEhRVUZITEVsQlFVa3NSMEZCUnl4dFFrRkJiVUlzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXp0UFFVTTNSRHRCUVVORUxHRkJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUTJ4Q08wRkJRMFFzVlVGQlRTeEZRVUZGTEdkQ1FVRlRMRTFCUVUwc1JVRkJSU3hKUVVGSkxFVkJRVVU3UVVGRE4wSXNWVUZCVFN4SFFVRkhMRWRCUVVjc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF6dEJRVU14UWl4WFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8wRkJRelZDTEZsQlFVa3NUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFVkJRVVU3UVVGRGVFTXNhVUpCUVU4c1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTNoQ08wOUJRMFk3UzBGRFJqdEJRVU5FTEZWQlFVMHNSVUZCUlN4blFrRkJVeXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzBGQlEycERMR0ZCUVU4c1QwRkJUeXhQUVVGUExFdEJRVXNzVlVGQlZTeEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETzB0QlEzaEZPenRCUVVWRUxHOUNRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJReXhuUWtGQlowSTdRVUZEZUVNc2FVSkJRV0VzUlVGQlJTeHZRa0ZCYjBJN08wRkJSVzVETEUxQlFVVXNSVUZCUlN4WlFVRlRMRU5CUVVNc1JVRkJSVHRCUVVOa0xGVkJRVWtzUjBGQlJ5eEhRVUZITEZsQlFWa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVNeFFpeFRRVUZITEVOQlFVTXNVMEZCVXl4SFFVRkhMRmxCUVZrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZGtNc1lVRkJUeXhIUVVGSExFTkJRVU03UzBGRFdqczdRVUZGUkN4WlFVRlJMRVZCUVVVc1JVRkJSVHRCUVVOYUxGZEJRVThzUlVGQlJTeHBRa0ZCVXl4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRmRCUVZjc1JVRkJSU3hOUVVGTkxFVkJRVVU3UVVGRGJrVXNWVUZCU1N4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdWVUZEYWtNc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRjRUlzVlVGQlNTeEpRVUZKTEVsQlFVa3NUVUZCVFN4SlFVRkpMRmRCUVZjc1NVRkJTU3h0UWtGQmJVSXNSVUZCUlR0QlFVTjRSQ3h6UWtGQll5eEhRVUZITEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUlVGQlJTeEpRVUZKTEVWQlFVVXNiVUpCUVcxQ0xFVkJRVVVzVjBGQlZ5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMDlCUXpOR0xFMUJRVTBzU1VGQlNTeERRVUZETEdOQlFXTXNSVUZCUlR0QlFVTXhRaXh6UWtGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03VDBGRE9VUTdRVUZEUkN4aFFVRlBMR05CUVdNc1EwRkJRenRMUVVOMlFqczdRVUZGUkN4UlFVRkpMRVZCUVVVc1kwRkJVeXhMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTzBGQlF6TkNMR0ZCUVU4c1MwRkJTeXhKUVVGSkxFdEJRVXNzUlVGQlJTeEZRVUZGTzBGQlEzWkNMR0ZCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETzA5QlEzWkNPMEZCUTBRc1lVRkJUeXhMUVVGTExFTkJRVU03UzBGRFpEdEJRVU5FTEZOQlFVc3NSVUZCUlN4bFFVRlRMRXRCUVVzc1JVRkJSU3hOUVVGTkxFVkJRVVU3UVVGRE4wSXNWVUZCU1N4SFFVRkhMRWRCUVVjc1MwRkJTeXhKUVVGSkxFMUJRVTBzUTBGQlF6czdRVUZGTVVJc1ZVRkJTU3hMUVVGTExFbEJRVWtzVFVGQlRTeEpRVUZMTEV0QlFVc3NTMEZCU3l4TlFVRk5MRUZCUVVNc1JVRkJSVHRCUVVONlF5eFhRVUZITEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzVFVGQlRTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMDlCUTNaRE96dEJRVVZFTEdGQlFVOHNSMEZCUnl4RFFVRkRPMHRCUTFvN08wRkJSVVFzWlVGQlZ5eEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRE96dEJRVVUxUWl4UlFVRkpMRVZCUVVVc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTzBGQlEycENMR2RDUVVGWkxFVkJRVVVzV1VGQldTeERRVUZETEZGQlFWRTdSMEZEY0VNc1EwRkJRenM3UVVGRlJpeFhRVUZUTEVkQlFVY3NRMEZCUXl4UFFVRlBMRVZCUVdkQ08xRkJRV1FzVDBGQlR5eDVSRUZCUnl4RlFVRkZPenRCUVVOb1F5eFJRVUZKTEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE96dEJRVVY0UWl4UFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBGQlEzQkNMRkZCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEpRVUZKTEZsQlFWa3NRMEZCUXl4UFFVRlBMRVZCUVVVN1FVRkROVU1zVlVGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03UzBGRGFFTTdRVUZEUkN4UlFVRkpMRTFCUVUwc1dVRkJRVHRSUVVOT0xGZEJRVmNzUjBGQlJ5eFpRVUZaTEVOQlFVTXNZMEZCWXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhUUVVGVExFTkJRVU03UVVGREwwUXNVVUZCU1N4WlFVRlpMRU5CUVVNc1UwRkJVeXhGUVVGRk8wRkJRekZDTEZWQlFVa3NUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJSVHRCUVVOc1FpeGpRVUZOTEVkQlFVY3NUMEZCVHl4SlFVRkpMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VDBGRE0wWXNUVUZCVFR0QlFVTk1MR05CUVUwc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzA5QlEzQkNPMHRCUTBZN08wRkJSVVFzWVVGQlV5eEpRVUZKTEVOQlFVTXNUMEZCVHl4blFrRkJaVHRCUVVOc1F5eGhRVUZQTEVWQlFVVXNSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlJTeFBRVUZQTEVWQlFVVXNVMEZCVXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hUUVVGVExFTkJRVU1zVVVGQlVTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03UzBGRGNrZzdRVUZEUkN4UlFVRkpMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTEU5QlFVOHNRMEZCUXl4TlFVRk5MRWxCUVVrc1JVRkJSU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVOQlFVTXNRMEZCUXp0QlFVTjBSeXhYUVVGUExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1IwRkRMMEk3UVVGRFJDeExRVUZITEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJRenM3UVVGRmFrSXNTMEZCUnl4RFFVRkRMRTFCUVUwc1IwRkJSeXhWUVVGVExFOUJRVThzUlVGQlJUdEJRVU0zUWl4UlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFOUJRVThzUlVGQlJUdEJRVU53UWl4bFFVRlRMRU5CUVVNc1QwRkJUeXhIUVVGSExGTkJRVk1zUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1JVRkJSU3hIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdPMEZCUld4RkxGVkJRVWtzV1VGQldTeERRVUZETEZWQlFWVXNSVUZCUlR0QlFVTXpRaXhwUWtGQlV5eERRVUZETEZGQlFWRXNSMEZCUnl4VFFVRlRMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eFJRVUZSTEVWQlFVVXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wOUJRM1JGTzBGQlEwUXNWVUZCU1N4WlFVRlpMRU5CUVVNc1ZVRkJWU3hKUVVGSkxGbEJRVmtzUTBGQlF5eGhRVUZoTEVWQlFVVTdRVUZEZWtRc2FVSkJRVk1zUTBGQlF5eFZRVUZWTEVkQlFVY3NVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlZTeEZRVUZGTEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRQUVVNMVJUdExRVU5HTEUxQlFVMDdRVUZEVEN4bFFVRlRMRU5CUVVNc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTTdRVUZEY0VNc1pVRkJVeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRPMEZCUTNSRExHVkJRVk1zUTBGQlF5eFZRVUZWTEVkQlFVY3NUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJRenRMUVVNelF6dEhRVU5HTEVOQlFVTTdPMEZCUlVZc1MwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlJ5eFZRVUZUTEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzUlVGQlJUdEJRVU5zUkN4UlFVRkpMRmxCUVZrc1EwRkJReXhqUVVGakxFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVTdRVUZETDBNc1dVRkJUU3d5UWtGQll5eDNRa0ZCZDBJc1EwRkJReXhEUVVGRE8wdEJReTlETzBGQlEwUXNVVUZCU1N4WlFVRlpMRU5CUVVNc1UwRkJVeXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlEzSkRMRmxCUVUwc01rSkJRV01zZVVKQlFYbENMRU5CUVVNc1EwRkJRenRMUVVOb1JEczdRVUZGUkN4WFFVRlBMRmRCUVZjc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF5eEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFVkJRVVVzUTBGQlF5eEZRVUZGTEZkQlFWY3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRIUVVOcVJpeERRVUZETzBGQlEwWXNVMEZCVHl4SFFVRkhMRU5CUVVNN1EwRkRXanM3UVVGRlRTeFRRVUZUTEZkQlFWY3NRMEZCUXl4VFFVRlRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUlVGQlJTeEpRVUZKTEVWQlFVVXNiVUpCUVcxQ0xFVkJRVVVzVjBGQlZ5eEZRVUZGTEUxQlFVMHNSVUZCUlR0QlFVTTFSaXhYUVVGVExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFXZENPMUZCUVdRc1QwRkJUeXg1UkVGQlJ5eEZRVUZGT3p0QlFVTnFReXhSUVVGSkxHRkJRV0VzUjBGQlJ5eE5RVUZOTEVOQlFVTTdRVUZETTBJc1VVRkJTU3hOUVVGTkxFbEJRVWtzVDBGQlR5eEpRVUZKTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFOUJRVThzUzBGQlN5eFRRVUZUTEVOQlFVTXNWMEZCVnl4SlFVRkpMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eEpRVUZKTEVOQlFVRXNRVUZCUXl4RlFVRkZPMEZCUTJoSExHMUNRVUZoTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdTMEZETVVNN08wRkJSVVFzVjBGQlR5eEZRVUZGTEVOQlFVTXNVMEZCVXl4RlFVTm1MRTlCUVU4c1JVRkRVQ3hUUVVGVExFTkJRVU1zVDBGQlR5eEZRVUZGTEZOQlFWTXNRMEZCUXl4UlFVRlJMRVZCUTNKRExFOUJRVThzUTBGQlF5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RlFVTndRaXhYUVVGWExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEZRVU40UkN4aFFVRmhMRU5CUVVNc1EwRkJRenRIUVVOd1FqczdRVUZGUkN4TlFVRkpMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTXNSVUZCUlN4RlFVRkZMRWxCUVVrc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRU5CUVVNc1EwRkJRenM3UVVGRmVrVXNUVUZCU1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRGFrSXNUVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkRlRU1zVFVGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4dFFrRkJiVUlzU1VGQlNTeERRVUZETEVOQlFVTTdRVUZETlVNc1UwRkJUeXhKUVVGSkxFTkJRVU03UTBGRFlqczdRVUZGVFN4VFFVRlRMR05CUVdNc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlR0QlFVTjRSQ3hOUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTzBGQlExb3NVVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hMUVVGTExHZENRVUZuUWl4RlFVRkZPMEZCUTNKRExHRkJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8wdEJRM3BETEUxQlFVMDdRVUZEVEN4aFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExGRkJRVkVzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRNVU03UjBGRFJpeE5RVUZOTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlRzN1FVRkZla01zVjBGQlR5eERRVUZETEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNN1FVRkRka0lzVjBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03UjBGRGNrTTdRVUZEUkN4VFFVRlBMRTlCUVU4c1EwRkJRenREUVVOb1FqczdRVUZGVFN4VFFVRlRMR0ZCUVdFc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlRzN1FVRkZka1FzVFVGQlRTeHRRa0ZCYlVJc1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeEpRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03UVVGRE1VVXNVMEZCVHl4RFFVRkRMRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU03UVVGRGRrSXNUVUZCU1N4UFFVRlBMRU5CUVVNc1IwRkJSeXhGUVVGRk8wRkJRMllzVjBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRWRCUVVjc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dEhRVU4yUlRzN1FVRkZSQ3hOUVVGSkxGbEJRVmtzV1VGQlFTeERRVUZETzBGQlEycENMRTFCUVVrc1QwRkJUeXhEUVVGRExFVkJRVVVzU1VGQlNTeFBRVUZQTEVOQlFVTXNSVUZCUlN4TFFVRkxMRWxCUVVrc1JVRkJSVHM3UVVGRGNrTXNZVUZCVHl4RFFVRkRMRWxCUVVrc1IwRkJSeXhyUWtGQldTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN08wRkJSWHBETEZWQlFVa3NSVUZCUlN4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRkxFTkJRVU03UVVGRGNFSXNhMEpCUVZrc1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXl4SFFVRkhMRk5CUVZNc2JVSkJRVzFDTEVOQlFVTXNUMEZCVHl4RlFVRm5RanRaUVVGa0xFOUJRVThzZVVSQlFVY3NSVUZCUlRzN096dEJRVWt2Uml4bFFVRlBMRU5CUVVNc1NVRkJTU3hIUVVGSExHdENRVUZaTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVONlF5eGxRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhIUVVGSExHMUNRVUZ0UWl4RFFVRkRPMEZCUTNCRUxHVkJRVThzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRQUVVNM1FpeERRVUZETzBGQlEwWXNWVUZCU1N4RlFVRkZMRU5CUVVNc1VVRkJVU3hGUVVGRk8wRkJRMllzWlVGQlR5eERRVUZETEZGQlFWRXNSMEZCUnl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkZMRVZCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFBRVU53UlRzN1IwRkRSanM3UVVGRlJDeE5RVUZKTEU5QlFVOHNTMEZCU3l4VFFVRlRMRWxCUVVrc1dVRkJXU3hGUVVGRk8wRkJRM3BETEZkQlFVOHNSMEZCUnl4WlFVRlpMRU5CUVVNN1IwRkRlRUk3TzBGQlJVUXNUVUZCU1N4UFFVRlBMRXRCUVVzc1UwRkJVeXhGUVVGRk8wRkJRM3BDTEZWQlFVMHNNa0pCUVdNc1kwRkJZeXhIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVU1zUTBGQlF6dEhRVU0xUlN4TlFVRk5MRWxCUVVrc1QwRkJUeXhaUVVGWkxGRkJRVkVzUlVGQlJUdEJRVU4wUXl4WFFVRlBMRTlCUVU4c1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdSMEZEYkVNN1EwRkRSanM3UVVGRlRTeFRRVUZUTEVsQlFVa3NSMEZCUnp0QlFVRkZMRk5CUVU4c1JVRkJSU3hEUVVGRE8wTkJRVVU3TzBGQlJYSkRMRk5CUVZNc1VVRkJVU3hEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVTdRVUZETDBJc1RVRkJTU3hEUVVGRExFbEJRVWtzU1VGQlNTeEZRVUZGTEUxQlFVMHNTVUZCU1N4SlFVRkpMRU5CUVVFc1FVRkJReXhGUVVGRk8wRkJRemxDTEZGQlFVa3NSMEZCUnl4SlFVRkpMRWRCUVVjc2EwSkJRVmtzU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMEZCUTNKRExGRkJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRPMGRCUTNKQ08wRkJRMFFzVTBGQlR5eEpRVUZKTEVOQlFVTTdRMEZEWWpzN1FVRkZSQ3hUUVVGVExHbENRVUZwUWl4RFFVRkRMRVZCUVVVc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRk8wRkJRM3BGTEUxQlFVa3NSVUZCUlN4RFFVRkRMRk5CUVZNc1JVRkJSVHRCUVVOb1FpeFJRVUZKTEV0QlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNN1FVRkRaaXhSUVVGSkxFZEJRVWNzUlVGQlJTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEVsQlFVa3NUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkROVVlzVTBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03UjBGRE0wSTdRVUZEUkN4VFFVRlBMRWxCUVVrc1EwRkJRenREUVVOaUlpd2labWxzWlNJNkluSjFiblJwYldVdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdLaUJoY3lCVmRHbHNjeUJtY205dElDY3VMM1YwYVd4ekp6dGNibWx0Y0c5eWRDQkZlR05sY0hScGIyNGdabkp2YlNBbkxpOWxlR05sY0hScGIyNG5PMXh1YVcxd2IzSjBJSHNnUTA5TlVFbE1SVkpmVWtWV1NWTkpUMDRzSUZKRlZrbFRTVTlPWDBOSVFVNUhSVk1zSUdOeVpXRjBaVVp5WVcxbElIMGdabkp2YlNBbkxpOWlZWE5sSnp0Y2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHTm9aV05yVW1WMmFYTnBiMjRvWTI5dGNHbHNaWEpKYm1adktTQjdYRzRnSUdOdmJuTjBJR052YlhCcGJHVnlVbVYyYVhOcGIyNGdQU0JqYjIxd2FXeGxja2x1Wm04Z0ppWWdZMjl0Y0dsc1pYSkpibVp2V3pCZElIeDhJREVzWEc0Z0lDQWdJQ0FnSUdOMWNuSmxiblJTWlhacGMybHZiaUE5SUVOUFRWQkpURVZTWDFKRlZrbFRTVTlPTzF4dVhHNGdJR2xtSUNoamIyMXdhV3hsY2xKbGRtbHphVzl1SUNFOVBTQmpkWEp5Wlc1MFVtVjJhWE5wYjI0cElIdGNiaUFnSUNCcFppQW9ZMjl0Y0dsc1pYSlNaWFpwYzJsdmJpQThJR04xY25KbGJuUlNaWFpwYzJsdmJpa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ2NuVnVkR2x0WlZabGNuTnBiMjV6SUQwZ1VrVldTVk5KVDA1ZlEwaEJUa2RGVTF0amRYSnlaVzUwVW1WMmFYTnBiMjVkTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl0Y0dsc1pYSldaWEp6YVc5dWN5QTlJRkpGVmtsVFNVOU9YME5JUVU1SFJWTmJZMjl0Y0dsc1pYSlNaWFpwYzJsdmJsMDdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWGhqWlhCMGFXOXVLQ2RVWlcxd2JHRjBaU0IzWVhNZ2NISmxZMjl0Y0dsc1pXUWdkMmwwYUNCaGJpQnZiR1JsY2lCMlpYSnphVzl1SUc5bUlFaGhibVJzWldKaGNuTWdkR2hoYmlCMGFHVWdZM1Z5Y21WdWRDQnlkVzUwYVcxbExpQW5JQ3RjYmlBZ0lDQWdJQ0FnSUNBZ0lDZFFiR1ZoYzJVZ2RYQmtZWFJsSUhsdmRYSWdjSEpsWTI5dGNHbHNaWElnZEc4Z1lTQnVaWGRsY2lCMlpYSnphVzl1SUNnbklDc2djblZ1ZEdsdFpWWmxjbk5wYjI1eklDc2dKeWtnYjNJZ1pHOTNibWR5WVdSbElIbHZkWElnY25WdWRHbHRaU0IwYnlCaGJpQnZiR1JsY2lCMlpYSnphVzl1SUNnbklDc2dZMjl0Y0dsc1pYSldaWEp6YVc5dWN5QXJJQ2NwTGljcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0F2THlCVmMyVWdkR2hsSUdWdFltVmtaR1ZrSUhabGNuTnBiMjRnYVc1bWJ5QnphVzVqWlNCMGFHVWdjblZ1ZEdsdFpTQmtiMlZ6YmlkMElHdHViM2NnWVdKdmRYUWdkR2hwY3lCeVpYWnBjMmx2YmlCNVpYUmNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMVJsYlhCc1lYUmxJSGRoY3lCd2NtVmpiMjF3YVd4bFpDQjNhWFJvSUdFZ2JtVjNaWElnZG1WeWMybHZiaUJ2WmlCSVlXNWtiR1ZpWVhKeklIUm9ZVzRnZEdobElHTjFjbkpsYm5RZ2NuVnVkR2x0WlM0Z0p5QXJYRzRnSUNBZ0lDQWdJQ0FnSUNBblVHeGxZWE5sSUhWd1pHRjBaU0I1YjNWeUlISjFiblJwYldVZ2RHOGdZU0J1WlhkbGNpQjJaWEp6YVc5dUlDZ25JQ3NnWTI5dGNHbHNaWEpKYm1adld6RmRJQ3NnSnlrdUp5azdYRzRnSUNBZ2ZWeHVJQ0I5WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQjBaVzF3YkdGMFpTaDBaVzF3YkdGMFpWTndaV01zSUdWdWRpa2dlMXh1SUNBdktpQnBjM1JoYm1KMWJDQnBaMjV2Y21VZ2JtVjRkQ0FxTDF4dUlDQnBaaUFvSVdWdWRpa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMDV2SUdWdWRtbHliMjV0Wlc1MElIQmhjM05sWkNCMGJ5QjBaVzF3YkdGMFpTY3BPMXh1SUNCOVhHNGdJR2xtSUNnaGRHVnRjR3hoZEdWVGNHVmpJSHg4SUNGMFpXMXdiR0YwWlZOd1pXTXViV0ZwYmlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmVHTmxjSFJwYjI0b0oxVnVhMjV2ZDI0Z2RHVnRjR3hoZEdVZ2IySnFaV04wT2lBbklDc2dkSGx3Wlc5bUlIUmxiWEJzWVhSbFUzQmxZeWs3WEc0Z0lIMWNibHh1SUNCMFpXMXdiR0YwWlZOd1pXTXViV0ZwYmk1a1pXTnZjbUYwYjNJZ1BTQjBaVzF3YkdGMFpWTndaV011YldGcGJsOWtPMXh1WEc0Z0lDOHZJRTV2ZEdVNklGVnphVzVuSUdWdWRpNVdUU0J5WldabGNtVnVZMlZ6SUhKaGRHaGxjaUIwYUdGdUlHeHZZMkZzSUhaaGNpQnlaV1psY21WdVkyVnpJSFJvY205MVoyaHZkWFFnZEdocGN5QnpaV04wYVc5dUlIUnZJR0ZzYkc5M1hHNGdJQzh2SUdadmNpQmxlSFJsY201aGJDQjFjMlZ5Y3lCMGJ5QnZkbVZ5Y21sa1pTQjBhR1Z6WlNCaGN5QndjM1ZsWkc4dGMzVndjRzl5ZEdWa0lFRlFTWE11WEc0Z0lHVnVkaTVXVFM1amFHVmphMUpsZG1semFXOXVLSFJsYlhCc1lYUmxVM0JsWXk1amIyMXdhV3hsY2lrN1hHNWNiaUFnWm5WdVkzUnBiMjRnYVc1MmIydGxVR0Z5ZEdsaGJGZHlZWEJ3WlhJb2NHRnlkR2xoYkN3Z1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lrZ2UxeHVJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtaGhjMmdwSUh0Y2JpQWdJQ0FnSUdOdmJuUmxlSFFnUFNCVmRHbHNjeTVsZUhSbGJtUW9lMzBzSUdOdmJuUmxlSFFzSUc5d2RHbHZibk11YUdGemFDazdYRzRnSUNBZ0lDQnBaaUFvYjNCMGFXOXVjeTVwWkhNcElIdGNiaUFnSUNBZ0lDQWdiM0IwYVc5dWN5NXBaSE5iTUYwZ1BTQjBjblZsTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJSEJoY25ScFlXd2dQU0JsYm5ZdVZrMHVjbVZ6YjJ4MlpWQmhjblJwWVd3dVkyRnNiQ2gwYUdsekxDQndZWEowYVdGc0xDQmpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNCc1pYUWdjbVZ6ZFd4MElEMGdaVzUyTGxaTkxtbHVkbTlyWlZCaGNuUnBZV3d1WTJGc2JDaDBhR2x6TENCd1lYSjBhV0ZzTENCamIyNTBaWGgwTENCdmNIUnBiMjV6S1R0Y2JseHVJQ0FnSUdsbUlDaHlaWE4xYkhRZ1BUMGdiblZzYkNBbUppQmxibll1WTI5dGNHbHNaU2tnZTF4dUlDQWdJQ0FnYjNCMGFXOXVjeTV3WVhKMGFXRnNjMXR2Y0hScGIyNXpMbTVoYldWZElEMGdaVzUyTG1OdmJYQnBiR1VvY0dGeWRHbGhiQ3dnZEdWdGNHeGhkR1ZUY0dWakxtTnZiWEJwYkdWeVQzQjBhVzl1Y3l3Z1pXNTJLVHRjYmlBZ0lDQWdJSEpsYzNWc2RDQTlJRzl3ZEdsdmJuTXVjR0Z5ZEdsaGJITmJiM0IwYVc5dWN5NXVZVzFsWFNoamIyNTBaWGgwTENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hKbGMzVnNkQ0FoUFNCdWRXeHNLU0I3WEc0Z0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1cGJtUmxiblFwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJR3hwYm1WeklEMGdjbVZ6ZFd4MExuTndiR2wwS0NkY1hHNG5LVHRjYmlBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYVNBOUlEQXNJR3dnUFNCc2FXNWxjeTVzWlc1bmRHZzdJR2tnUENCc095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvSVd4cGJtVnpXMmxkSUNZbUlHa2dLeUF4SUQwOVBTQnNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCc2FXNWxjMXRwWFNBOUlHOXdkR2x2Ym5NdWFXNWtaVzUwSUNzZ2JHbHVaWE5iYVYwN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MElEMGdiR2x1WlhNdWFtOXBiaWduWEZ4dUp5azdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaWFIxY200Z2NtVnpkV3gwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWGhqWlhCMGFXOXVLQ2RVYUdVZ2NHRnlkR2xoYkNBbklDc2diM0IwYVc5dWN5NXVZVzFsSUNzZ0p5QmpiM1ZzWkNCdWIzUWdZbVVnWTI5dGNHbHNaV1FnZDJobGJpQnlkVzV1YVc1bklHbHVJSEoxYm5ScGJXVXRiMjVzZVNCdGIyUmxKeWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnTHk4Z1NuVnpkQ0JoWkdRZ2QyRjBaWEpjYmlBZ2JHVjBJR052Ym5SaGFXNWxjaUE5SUh0Y2JpQWdJQ0J6ZEhKcFkzUTZJR1oxYm1OMGFXOXVLRzlpYWl3Z2JtRnRaU2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRW9ibUZ0WlNCcGJpQnZZbW9wS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMXdpSnlBcklHNWhiV1VnS3lBblhDSWdibTkwSUdSbFptbHVaV1FnYVc0Z0p5QXJJRzlpYWlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnYjJKcVcyNWhiV1ZkTzF4dUlDQWdJSDBzWEc0Z0lDQWdiRzl2YTNWd09pQm1kVzVqZEdsdmJpaGtaWEIwYUhNc0lHNWhiV1VwSUh0Y2JpQWdJQ0FnSUdOdmJuTjBJR3hsYmlBOUlHUmxjSFJvY3k1c1pXNW5kR2c3WEc0Z0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUd4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hrWlhCMGFITmJhVjBnSmlZZ1pHVndkR2h6VzJsZFcyNWhiV1ZkSUNFOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pHVndkR2h6VzJsZFcyNWhiV1ZkTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JpQWdJQ0JzWVcxaVpHRTZJR1oxYm1OMGFXOXVLR04xY25KbGJuUXNJR052Ym5SbGVIUXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBlWEJsYjJZZ1kzVnljbVZ1ZENBOVBUMGdKMloxYm1OMGFXOXVKeUEvSUdOMWNuSmxiblF1WTJGc2JDaGpiMjUwWlhoMEtTQTZJR04xY25KbGJuUTdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHVnpZMkZ3WlVWNGNISmxjM05wYjI0NklGVjBhV3h6TG1WelkyRndaVVY0Y0hKbGMzTnBiMjRzWEc0Z0lDQWdhVzUyYjJ0bFVHRnlkR2xoYkRvZ2FXNTJiMnRsVUdGeWRHbGhiRmR5WVhCd1pYSXNYRzVjYmlBZ0lDQm1iam9nWm5WdVkzUnBiMjRvYVNrZ2UxeHVJQ0FnSUNBZ2JHVjBJSEpsZENBOUlIUmxiWEJzWVhSbFUzQmxZMXRwWFR0Y2JpQWdJQ0FnSUhKbGRDNWtaV052Y21GMGIzSWdQU0IwWlcxd2JHRjBaVk53WldOYmFTQXJJQ2RmWkNkZE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUhKbGREdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ2NISnZaM0poYlhNNklGdGRMRnh1SUNBZ0lIQnliMmR5WVcwNklHWjFibU4wYVc5dUtHa3NJR1JoZEdFc0lHUmxZMnhoY21Wa1FteHZZMnRRWVhKaGJYTXNJR0pzYjJOclVHRnlZVzF6TENCa1pYQjBhSE1wSUh0Y2JpQWdJQ0FnSUd4bGRDQndjbTluY21GdFYzSmhjSEJsY2lBOUlIUm9hWE11Y0hKdlozSmhiWE5iYVYwc1hHNGdJQ0FnSUNBZ0lDQWdabTRnUFNCMGFHbHpMbVp1S0drcE8xeHVJQ0FnSUNBZ2FXWWdLR1JoZEdFZ2ZId2daR1Z3ZEdoeklIeDhJR0pzYjJOclVHRnlZVzF6SUh4OElHUmxZMnhoY21Wa1FteHZZMnRRWVhKaGJYTXBJSHRjYmlBZ0lDQWdJQ0FnY0hKdlozSmhiVmR5WVhCd1pYSWdQU0IzY21Gd1VISnZaM0poYlNoMGFHbHpMQ0JwTENCbWJpd2daR0YwWVN3Z1pHVmpiR0Z5WldSQ2JHOWphMUJoY21GdGN5d2dZbXh2WTJ0UVlYSmhiWE1zSUdSbGNIUm9jeWs3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0NGd2NtOW5jbUZ0VjNKaGNIQmxjaWtnZTF4dUlDQWdJQ0FnSUNCd2NtOW5jbUZ0VjNKaGNIQmxjaUE5SUhSb2FYTXVjSEp2WjNKaGJYTmJhVjBnUFNCM2NtRndVSEp2WjNKaGJTaDBhR2x6TENCcExDQm1iaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjSEp2WjNKaGJWZHlZWEJ3WlhJN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdSaGRHRTZJR1oxYm1OMGFXOXVLSFpoYkhWbExDQmtaWEIwYUNrZ2UxeHVJQ0FnSUNBZ2QyaHBiR1VnS0haaGJIVmxJQ1ltSUdSbGNIUm9MUzBwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnNkV1VnUFNCMllXeDFaUzVmY0dGeVpXNTBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdjbVYwZFhKdUlIWmhiSFZsTzF4dUlDQWdJSDBzWEc0Z0lDQWdiV1Z5WjJVNklHWjFibU4wYVc5dUtIQmhjbUZ0TENCamIyMXRiMjRwSUh0Y2JpQWdJQ0FnSUd4bGRDQnZZbW9nUFNCd1lYSmhiU0I4ZkNCamIyMXRiMjQ3WEc1Y2JpQWdJQ0FnSUdsbUlDaHdZWEpoYlNBbUppQmpiMjF0YjI0Z0ppWWdLSEJoY21GdElDRTlQU0JqYjIxdGIyNHBLU0I3WEc0Z0lDQWdJQ0FnSUc5aWFpQTlJRlYwYVd4ekxtVjRkR1Z1WkNoN2ZTd2dZMjl0Ylc5dUxDQndZWEpoYlNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCdlltbzdYRzRnSUNBZ2ZTeGNiaUFnSUNBdkx5QkJiaUJsYlhCMGVTQnZZbXBsWTNRZ2RHOGdkWE5sSUdGeklISmxjR3hoWTJWdFpXNTBJR1p2Y2lCdWRXeHNMV052Ym5SbGVIUnpYRzRnSUNBZ2JuVnNiRU52Ym5SbGVIUTZJRTlpYW1WamRDNXpaV0ZzS0h0OUtTeGNibHh1SUNBZ0lHNXZiM0E2SUdWdWRpNVdUUzV1YjI5d0xGeHVJQ0FnSUdOdmJYQnBiR1Z5U1c1bWJ6b2dkR1Z0Y0d4aGRHVlRjR1ZqTG1OdmJYQnBiR1Z5WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVjBLR052Ym5SbGVIUXNJRzl3ZEdsdmJuTWdQU0I3ZlNrZ2UxeHVJQ0FnSUd4bGRDQmtZWFJoSUQwZ2IzQjBhVzl1Y3k1a1lYUmhPMXh1WEc0Z0lDQWdjbVYwTGw5elpYUjFjQ2h2Y0hScGIyNXpLVHRjYmlBZ0lDQnBaaUFvSVc5d2RHbHZibk11Y0dGeWRHbGhiQ0FtSmlCMFpXMXdiR0YwWlZOd1pXTXVkWE5sUkdGMFlTa2dlMXh1SUNBZ0lDQWdaR0YwWVNBOUlHbHVhWFJFWVhSaEtHTnZiblJsZUhRc0lHUmhkR0VwTzF4dUlDQWdJSDFjYmlBZ0lDQnNaWFFnWkdWd2RHaHpMRnh1SUNBZ0lDQWdJQ0JpYkc5amExQmhjbUZ0Y3lBOUlIUmxiWEJzWVhSbFUzQmxZeTUxYzJWQ2JHOWphMUJoY21GdGN5QS9JRnRkSURvZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUdsbUlDaDBaVzF3YkdGMFpWTndaV011ZFhObFJHVndkR2h6S1NCN1hHNGdJQ0FnSUNCcFppQW9iM0IwYVc5dWN5NWtaWEIwYUhNcElIdGNiaUFnSUNBZ0lDQWdaR1Z3ZEdoeklEMGdZMjl1ZEdWNGRDQWhQU0J2Y0hScGIyNXpMbVJsY0hSb2Mxc3dYU0EvSUZ0amIyNTBaWGgwWFM1amIyNWpZWFFvYjNCMGFXOXVjeTVrWlhCMGFITXBJRG9nYjNCMGFXOXVjeTVrWlhCMGFITTdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQmtaWEIwYUhNZ1BTQmJZMjl1ZEdWNGRGMDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2JXRnBiaWhqYjI1MFpYaDBMeW9zSUc5d2RHbHZibk1xTHlrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUNjbklDc2dkR1Z0Y0d4aGRHVlRjR1ZqTG0xaGFXNG9ZMjl1ZEdGcGJtVnlMQ0JqYjI1MFpYaDBMQ0JqYjI1MFlXbHVaWEl1YUdWc2NHVnljeXdnWTI5dWRHRnBibVZ5TG5CaGNuUnBZV3h6TENCa1lYUmhMQ0JpYkc5amExQmhjbUZ0Y3l3Z1pHVndkR2h6S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdiV0ZwYmlBOUlHVjRaV04xZEdWRVpXTnZjbUYwYjNKektIUmxiWEJzWVhSbFUzQmxZeTV0WVdsdUxDQnRZV2x1TENCamIyNTBZV2x1WlhJc0lHOXdkR2x2Ym5NdVpHVndkR2h6SUh4OElGdGRMQ0JrWVhSaExDQmliRzlqYTFCaGNtRnRjeWs3WEc0Z0lDQWdjbVYwZFhKdUlHMWhhVzRvWTI5dWRHVjRkQ3dnYjNCMGFXOXVjeWs3WEc0Z0lIMWNiaUFnY21WMExtbHpWRzl3SUQwZ2RISjFaVHRjYmx4dUlDQnlaWFF1WDNObGRIVndJRDBnWm5WdVkzUnBiMjRvYjNCMGFXOXVjeWtnZTF4dUlDQWdJR2xtSUNnaGIzQjBhVzl1Y3k1d1lYSjBhV0ZzS1NCN1hHNGdJQ0FnSUNCamIyNTBZV2x1WlhJdWFHVnNjR1Z5Y3lBOUlHTnZiblJoYVc1bGNpNXRaWEpuWlNodmNIUnBiMjV6TG1obGJIQmxjbk1zSUdWdWRpNW9aV3h3WlhKektUdGNibHh1SUNBZ0lDQWdhV1lnS0hSbGJYQnNZWFJsVTNCbFl5NTFjMlZRWVhKMGFXRnNLU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuUmhhVzVsY2k1d1lYSjBhV0ZzY3lBOUlHTnZiblJoYVc1bGNpNXRaWEpuWlNodmNIUnBiMjV6TG5CaGNuUnBZV3h6TENCbGJuWXVjR0Z5ZEdsaGJITXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdhV1lnS0hSbGJYQnNZWFJsVTNCbFl5NTFjMlZRWVhKMGFXRnNJSHg4SUhSbGJYQnNZWFJsVTNCbFl5NTFjMlZFWldOdmNtRjBiM0p6S1NCN1hHNGdJQ0FnSUNBZ0lHTnZiblJoYVc1bGNpNWtaV052Y21GMGIzSnpJRDBnWTI5dWRHRnBibVZ5TG0xbGNtZGxLRzl3ZEdsdmJuTXVaR1ZqYjNKaGRHOXljeXdnWlc1MkxtUmxZMjl5WVhSdmNuTXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCamIyNTBZV2x1WlhJdWFHVnNjR1Z5Y3lBOUlHOXdkR2x2Ym5NdWFHVnNjR1Z5Y3p0Y2JpQWdJQ0FnSUdOdmJuUmhhVzVsY2k1d1lYSjBhV0ZzY3lBOUlHOXdkR2x2Ym5NdWNHRnlkR2xoYkhNN1hHNGdJQ0FnSUNCamIyNTBZV2x1WlhJdVpHVmpiM0poZEc5eWN5QTlJRzl3ZEdsdmJuTXVaR1ZqYjNKaGRHOXljenRjYmlBZ0lDQjlYRzRnSUgwN1hHNWNiaUFnY21WMExsOWphR2xzWkNBOUlHWjFibU4wYVc5dUtHa3NJR1JoZEdFc0lHSnNiMk5yVUdGeVlXMXpMQ0JrWlhCMGFITXBJSHRjYmlBZ0lDQnBaaUFvZEdWdGNHeGhkR1ZUY0dWakxuVnpaVUpzYjJOclVHRnlZVzF6SUNZbUlDRmliRzlqYTFCaGNtRnRjeWtnZTF4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWNFkyVndkR2x2YmlnbmJYVnpkQ0J3WVhOeklHSnNiMk5ySUhCaGNtRnRjeWNwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZEdWdGNHeGhkR1ZUY0dWakxuVnpaVVJsY0hSb2N5QW1KaUFoWkdWd2RHaHpLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkdGRYTjBJSEJoYzNNZ2NHRnlaVzUwSUdSbGNIUm9jeWNwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQjNjbUZ3VUhKdlozSmhiU2hqYjI1MFlXbHVaWElzSUdrc0lIUmxiWEJzWVhSbFUzQmxZMXRwWFN3Z1pHRjBZU3dnTUN3Z1lteHZZMnRRWVhKaGJYTXNJR1JsY0hSb2N5azdYRzRnSUgwN1hHNGdJSEpsZEhWeWJpQnlaWFE3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQjNjbUZ3VUhKdlozSmhiU2hqYjI1MFlXbHVaWElzSUdrc0lHWnVMQ0JrWVhSaExDQmtaV05zWVhKbFpFSnNiMk5yVUdGeVlXMXpMQ0JpYkc5amExQmhjbUZ0Y3l3Z1pHVndkR2h6S1NCN1hHNGdJR1oxYm1OMGFXOXVJSEJ5YjJjb1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lBOUlIdDlLU0I3WEc0Z0lDQWdiR1YwSUdOMWNuSmxiblJFWlhCMGFITWdQU0JrWlhCMGFITTdYRzRnSUNBZ2FXWWdLR1JsY0hSb2N5QW1KaUJqYjI1MFpYaDBJQ0U5SUdSbGNIUm9jMXN3WFNBbUppQWhLR052Ym5SbGVIUWdQVDA5SUdOdmJuUmhhVzVsY2k1dWRXeHNRMjl1ZEdWNGRDQW1KaUJrWlhCMGFITmJNRjBnUFQwOUlHNTFiR3dwS1NCN1hHNGdJQ0FnSUNCamRYSnlaVzUwUkdWd2RHaHpJRDBnVzJOdmJuUmxlSFJkTG1OdmJtTmhkQ2hrWlhCMGFITXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCbWJpaGpiMjUwWVdsdVpYSXNYRzRnSUNBZ0lDQWdJR052Ym5SbGVIUXNYRzRnSUNBZ0lDQWdJR052Ym5SaGFXNWxjaTVvWld4d1pYSnpMQ0JqYjI1MFlXbHVaWEl1Y0dGeWRHbGhiSE1zWEc0Z0lDQWdJQ0FnSUc5d2RHbHZibk11WkdGMFlTQjhmQ0JrWVhSaExGeHVJQ0FnSUNBZ0lDQmliRzlqYTFCaGNtRnRjeUFtSmlCYmIzQjBhVzl1Y3k1aWJHOWphMUJoY21GdGMxMHVZMjl1WTJGMEtHSnNiMk5yVUdGeVlXMXpLU3hjYmlBZ0lDQWdJQ0FnWTNWeWNtVnVkRVJsY0hSb2N5azdYRzRnSUgxY2JseHVJQ0J3Y205bklEMGdaWGhsWTNWMFpVUmxZMjl5WVhSdmNuTW9abTRzSUhCeWIyY3NJR052Ym5SaGFXNWxjaXdnWkdWd2RHaHpMQ0JrWVhSaExDQmliRzlqYTFCaGNtRnRjeWs3WEc1Y2JpQWdjSEp2Wnk1d2NtOW5jbUZ0SUQwZ2FUdGNiaUFnY0hKdlp5NWtaWEIwYUNBOUlHUmxjSFJvY3lBL0lHUmxjSFJvY3k1c1pXNW5kR2dnT2lBd08xeHVJQ0J3Y205bkxtSnNiMk5yVUdGeVlXMXpJRDBnWkdWamJHRnlaV1JDYkc5amExQmhjbUZ0Y3lCOGZDQXdPMXh1SUNCeVpYUjFjbTRnY0hKdlp6dGNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUhKbGMyOXNkbVZRWVhKMGFXRnNLSEJoY25ScFlXd3NJR052Ym5SbGVIUXNJRzl3ZEdsdmJuTXBJSHRjYmlBZ2FXWWdLQ0Z3WVhKMGFXRnNLU0I3WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11Ym1GdFpTQTlQVDBnSjBCd1lYSjBhV0ZzTFdKc2IyTnJKeWtnZTF4dUlDQWdJQ0FnY0dGeWRHbGhiQ0E5SUc5d2RHbHZibk11WkdGMFlWc25jR0Z5ZEdsaGJDMWliRzlqYXlkZE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J3WVhKMGFXRnNJRDBnYjNCMGFXOXVjeTV3WVhKMGFXRnNjMXR2Y0hScGIyNXpMbTVoYldWZE8xeHVJQ0FnSUgxY2JpQWdmU0JsYkhObElHbG1JQ2doY0dGeWRHbGhiQzVqWVd4c0lDWW1JQ0Z2Y0hScGIyNXpMbTVoYldVcElIdGNiaUFnSUNBdkx5QlVhR2x6SUdseklHRWdaSGx1WVcxcFl5QndZWEowYVdGc0lIUm9ZWFFnY21WMGRYSnVaV1FnWVNCemRISnBibWRjYmlBZ0lDQnZjSFJwYjI1ekxtNWhiV1VnUFNCd1lYSjBhV0ZzTzF4dUlDQWdJSEJoY25ScFlXd2dQU0J2Y0hScGIyNXpMbkJoY25ScFlXeHpXM0JoY25ScFlXeGRPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQndZWEowYVdGc08xeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnYVc1MmIydGxVR0Z5ZEdsaGJDaHdZWEowYVdGc0xDQmpiMjUwWlhoMExDQnZjSFJwYjI1ektTQjdYRzRnSUM4dklGVnpaU0IwYUdVZ1kzVnljbVZ1ZENCamJHOXpkWEpsSUdOdmJuUmxlSFFnZEc4Z2MyRjJaU0IwYUdVZ2NHRnlkR2xoYkMxaWJHOWpheUJwWmlCMGFHbHpJSEJoY25ScFlXeGNiaUFnWTI5dWMzUWdZM1Z5Y21WdWRGQmhjblJwWVd4Q2JHOWpheUE5SUc5d2RHbHZibk11WkdGMFlTQW1KaUJ2Y0hScGIyNXpMbVJoZEdGYkozQmhjblJwWVd3dFlteHZZMnNuWFR0Y2JpQWdiM0IwYVc5dWN5NXdZWEowYVdGc0lEMGdkSEoxWlR0Y2JpQWdhV1lnS0c5d2RHbHZibk11YVdSektTQjdYRzRnSUNBZ2IzQjBhVzl1Y3k1a1lYUmhMbU52Ym5SbGVIUlFZWFJvSUQwZ2IzQjBhVzl1Y3k1cFpITmJNRjBnZkh3Z2IzQjBhVzl1Y3k1a1lYUmhMbU52Ym5SbGVIUlFZWFJvTzF4dUlDQjlYRzVjYmlBZ2JHVjBJSEJoY25ScFlXeENiRzlqYXp0Y2JpQWdhV1lnS0c5d2RHbHZibk11Wm00Z0ppWWdiM0IwYVc5dWN5NW1iaUFoUFQwZ2JtOXZjQ2tnZTF4dUlDQWdJRzl3ZEdsdmJuTXVaR0YwWVNBOUlHTnlaV0YwWlVaeVlXMWxLRzl3ZEdsdmJuTXVaR0YwWVNrN1hHNGdJQ0FnTHk4Z1YzSmhjSEJsY2lCbWRXNWpkR2x2YmlCMGJ5Qm5aWFFnWVdOalpYTnpJSFJ2SUdOMWNuSmxiblJRWVhKMGFXRnNRbXh2WTJzZ1puSnZiU0IwYUdVZ1kyeHZjM1Z5WlZ4dUlDQWdJR3hsZENCbWJpQTlJRzl3ZEdsdmJuTXVabTQ3WEc0Z0lDQWdjR0Z5ZEdsaGJFSnNiMk5ySUQwZ2IzQjBhVzl1Y3k1a1lYUmhXeWR3WVhKMGFXRnNMV0pzYjJOckoxMGdQU0JtZFc1amRHbHZiaUJ3WVhKMGFXRnNRbXh2WTJ0WGNtRndjR1Z5S0dOdmJuUmxlSFFzSUc5d2RHbHZibk1nUFNCN2ZTa2dlMXh1WEc0Z0lDQWdJQ0F2THlCU1pYTjBiM0psSUhSb1pTQndZWEowYVdGc0xXSnNiMk5ySUdaeWIyMGdkR2hsSUdOc2IzTjFjbVVnWm05eUlIUm9aU0JsZUdWamRYUnBiMjRnYjJZZ2RHaGxJR0pzYjJOclhHNGdJQ0FnSUNBdkx5QnBMbVV1SUhSb1pTQndZWEowSUdsdWMybGtaU0IwYUdVZ1lteHZZMnNnYjJZZ2RHaGxJSEJoY25ScFlXd2dZMkZzYkM1Y2JpQWdJQ0FnSUc5d2RHbHZibk11WkdGMFlTQTlJR055WldGMFpVWnlZVzFsS0c5d2RHbHZibk11WkdGMFlTazdYRzRnSUNBZ0lDQnZjSFJwYjI1ekxtUmhkR0ZiSjNCaGNuUnBZV3d0WW14dlkyc25YU0E5SUdOMWNuSmxiblJRWVhKMGFXRnNRbXh2WTJzN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWm00b1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JwWmlBb1ptNHVjR0Z5ZEdsaGJITXBJSHRjYmlBZ0lDQWdJRzl3ZEdsdmJuTXVjR0Z5ZEdsaGJITWdQU0JWZEdsc2N5NWxlSFJsYm1Rb2UzMHNJRzl3ZEdsdmJuTXVjR0Z5ZEdsaGJITXNJR1p1TG5CaGNuUnBZV3h6S1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCcFppQW9jR0Z5ZEdsaGJDQTlQVDBnZFc1a1pXWnBibVZrSUNZbUlIQmhjblJwWVd4Q2JHOWpheWtnZTF4dUlDQWdJSEJoY25ScFlXd2dQU0J3WVhKMGFXRnNRbXh2WTJzN1hHNGdJSDFjYmx4dUlDQnBaaUFvY0dGeWRHbGhiQ0E5UFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVjRZMlZ3ZEdsdmJpZ25WR2hsSUhCaGNuUnBZV3dnSnlBcklHOXdkR2x2Ym5NdWJtRnRaU0FySUNjZ1kyOTFiR1FnYm05MElHSmxJR1p2ZFc1a0p5azdYRzRnSUgwZ1pXeHpaU0JwWmlBb2NHRnlkR2xoYkNCcGJuTjBZVzVqWlc5bUlFWjFibU4wYVc5dUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUhCaGNuUnBZV3dvWTI5dWRHVjRkQ3dnYjNCMGFXOXVjeWs3WEc0Z0lIMWNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUc1dmIzQW9LU0I3SUhKbGRIVnliaUFuSnpzZ2ZWeHVYRzVtZFc1amRHbHZiaUJwYm1sMFJHRjBZU2hqYjI1MFpYaDBMQ0JrWVhSaEtTQjdYRzRnSUdsbUlDZ2haR0YwWVNCOGZDQWhLQ2R5YjI5MEp5QnBiaUJrWVhSaEtTa2dlMXh1SUNBZ0lHUmhkR0VnUFNCa1lYUmhJRDhnWTNKbFlYUmxSbkpoYldVb1pHRjBZU2tnT2lCN2ZUdGNiaUFnSUNCa1lYUmhMbkp2YjNRZ1BTQmpiMjUwWlhoME8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCa1lYUmhPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmxlR1ZqZFhSbFJHVmpiM0poZEc5eWN5aG1iaXdnY0hKdlp5d2dZMjl1ZEdGcGJtVnlMQ0JrWlhCMGFITXNJR1JoZEdFc0lHSnNiMk5yVUdGeVlXMXpLU0I3WEc0Z0lHbG1JQ2htYmk1a1pXTnZjbUYwYjNJcElIdGNiaUFnSUNCc1pYUWdjSEp2Y0hNZ1BTQjdmVHRjYmlBZ0lDQndjbTluSUQwZ1ptNHVaR1ZqYjNKaGRHOXlLSEJ5YjJjc0lIQnliM0J6TENCamIyNTBZV2x1WlhJc0lHUmxjSFJvY3lBbUppQmtaWEIwYUhOYk1GMHNJR1JoZEdFc0lHSnNiMk5yVUdGeVlXMXpMQ0JrWlhCMGFITXBPMXh1SUNBZ0lGVjBhV3h6TG1WNGRHVnVaQ2h3Y205bkxDQndjbTl3Y3lrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhCeWIyYzdYRzU5WEc0aVhYMD1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2FmZVN0cmluZztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMM05oWm1VdGMzUnlhVzVuTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdRVUZEUVN4VFFVRlRMRlZCUVZVc1EwRkJReXhOUVVGTkxFVkJRVVU3UVVGRE1VSXNUVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU03UTBGRGRFSTdPMEZCUlVRc1ZVRkJWU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVkQlFVY3NWVUZCVlN4RFFVRkRMRk5CUVZNc1EwRkJReXhOUVVGTkxFZEJRVWNzV1VGQlZ6dEJRVU4yUlN4VFFVRlBMRVZCUVVVc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETzBOQlEzcENMRU5CUVVNN08zRkNRVVZoTEZWQlFWVWlMQ0ptYVd4bElqb2ljMkZtWlMxemRISnBibWN1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZMeUJDZFdsc1pDQnZkWFFnYjNWeUlHSmhjMmxqSUZOaFptVlRkSEpwYm1jZ2RIbHdaVnh1Wm5WdVkzUnBiMjRnVTJGbVpWTjBjbWx1WnloemRISnBibWNwSUh0Y2JpQWdkR2hwY3k1emRISnBibWNnUFNCemRISnBibWM3WEc1OVhHNWNibE5oWm1WVGRISnBibWN1Y0hKdmRHOTBlWEJsTG5SdlUzUnlhVzVuSUQwZ1UyRm1aVk4wY21sdVp5NXdjbTkwYjNSNWNHVXVkRzlJVkUxTUlEMGdablZ1WTNScGIyNG9LU0I3WEc0Z0lISmxkSFZ5YmlBbkp5QXJJSFJvYVhNdWMzUnlhVzVuTzF4dWZUdGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVMkZtWlZOMGNtbHVaenRjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJjb25zdCBCYXNlTW9kYWxEaWFsb2cgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmNvbXBvbmVudCcpO1xuY29uc3QgQ0hBTkdFX1BST0ZJTEVfUkVRVUVTVF9VUkwgPSAnL2FjY291bnRzL2FwaS9jaGFuZ2VfcmVxdWVzdC8nO1xuXG5jbGFzcyBMaWJyYXJpYW5Qcm9maWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXR1cExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgc2V0dXBMaXN0ZW5lcigpIHtcblxuICAgIH1cbn1cblxuY2xhc3MgUmVhZGVyUHJvZmlsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHNldHVwTGlzdGVuZXIoKSB7XG4gICAgICAgICQoJy5idG4tY2hhbmdlLXByb2ZpbGUtcmVxdWVzdCcpLm9uKCdjbGljaycsICgpPT57dGhpcy5zZW5kUmVxdWVzdCgpO30pXG4gICAgfVxuXG4gICAgc2VuZFJlcXVlc3QoKSB7XG4gICAgICAgIG5ldyBCYXNlTW9kYWxEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IFwi0JfQsNC/0YDQvtGBXCIsXG4gICAgICAgICAgICBjb250ZW50OiAn0KXQvtC00LjRgtC1INC+0YLQv9GA0LDQstC40YLRjCDQt9Cw0L/RgNC+0YEg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LjQvdGE0L7RgNC80LDRhtC40Lgg0LIg0JLQsNGI0LXQvCDQv9GA0L7RhNC40LvQtT8nLFxuICAgICAgICAgICAgb2tDYXB0aW9uOiAn0J7RgtC/0YDQsNCy0LjRgtGMJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJC5hamF4KENIQU5HRV9QUk9GSUxFX1JFUVVFU1RfVVJMLCB7bWV0aG9kOiAnZ2V0J30pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgn0JfQsNC/0YDQvtGBINC/0YDQuNC90Y/RgicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5sZXQgcmVhZGVyUHJvZmlsZSA9IG5ldyBSZWFkZXJQcm9maWxlKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FjY291bnRzL2FjY291bnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==