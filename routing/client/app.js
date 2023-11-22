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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./src/audio/click.mp3":
/*!*****************************!*\
  !*** ./src/audio/click.mp3 ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/click.mp3";

/***/ }),

/***/ "./src/audio/launch.mp3":
/*!******************************!*\
  !*** ./src/audio/launch.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/launch.mp3";

/***/ }),

/***/ "./src/audio/place.mp3":
/*!*****************************!*\
  !*** ./src/audio/place.mp3 ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/place.mp3";

/***/ }),

/***/ "./src/img/toolset.png":
/*!*****************************!*\
  !*** ./src/img/toolset.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/toolset.png";

/***/ }),

/***/ "./src/img/unloaded.png":
/*!******************************!*\
  !*** ./src/img/unloaded.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/unloaded.png";

/***/ }),

/***/ "./src/js sync recursive ^\\.\\/.*$":
/*!******************************!*\
  !*** ./src/js sync ^\.\/.*$ ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Fx": "./src/js/Fx.js",
	"./Fx.js": "./src/js/Fx.js",
	"./Player": "./src/js/Player.js",
	"./Player.js": "./src/js/Player.js",
	"./World": "./src/js/World.js",
	"./World.js": "./src/js/World.js",
	"./canvas_renderer": "./src/js/canvas_renderer.js",
	"./canvas_renderer.js": "./src/js/canvas_renderer.js",
	"./captcha": "./src/js/captcha.js",
	"./captcha.js": "./src/js/captcha.js",
	"./conf": "./src/js/conf.js",
	"./conf.js": "./src/js/conf.js",
	"./context": "./src/js/context.js",
	"./context.js": "./src/js/context.js",
	"./global": "./src/js/global.js",
	"./global.js": "./src/js/global.js",
	"./local_player": "./src/js/local_player.js",
	"./local_player.js": "./src/js/local_player.js",
	"./main": "./src/js/main.js",
	"./main.js": "./src/js/main.js",
	"./networking": "./src/js/networking.js",
	"./networking.js": "./src/js/networking.js",
	"./polyfill/canvas-toBlob": "./src/js/polyfill/canvas-toBlob.js",
	"./polyfill/canvas-toBlob.js": "./src/js/polyfill/canvas-toBlob.js",
	"./protocol/Protocol": "./src/js/protocol/Protocol.js",
	"./protocol/Protocol.js": "./src/js/protocol/Protocol.js",
	"./protocol/all": "./src/js/protocol/all.js",
	"./protocol/all.js": "./src/js/protocol/all.js",
	"./protocol/old": "./src/js/protocol/old.js",
	"./protocol/old.js": "./src/js/protocol/old.js",
	"./protocol/proto_parse": "./src/js/protocol/proto_parse.js",
	"./protocol/proto_parse.js": "./src/js/protocol/proto_parse.js",
	"./protocol/v0x00": "./src/js/protocol/v0x00.js",
	"./protocol/v0x00.js": "./src/js/protocol/v0x00.js",
	"./tool_renderer": "./src/js/tool_renderer.js",
	"./tool_renderer.js": "./src/js/tool_renderer.js",
	"./tools": "./src/js/tools.js",
	"./tools.js": "./src/js/tools.js",
	"./util/Bucket": "./src/js/util/Bucket.js",
	"./util/Bucket.js": "./src/js/util/Bucket.js",
	"./util/Lerp": "./src/js/util/Lerp.js",
	"./util/Lerp.js": "./src/js/util/Lerp.js",
	"./util/anchorme": "./src/js/util/anchorme.js",
	"./util/anchorme.js": "./src/js/util/anchorme.js",
	"./util/color": "./src/js/util/color.js",
	"./util/color.js": "./src/js/util/color.js",
	"./util/misc": "./src/js/util/misc.js",
	"./util/misc.js": "./src/js/util/misc.js",
	"./util/normalizeWheel": "./src/js/util/normalizeWheel.js",
	"./util/normalizeWheel.js": "./src/js/util/normalizeWheel.js",
	"./windowsys": "./src/js/windowsys.js",
	"./windowsys.js": "./src/js/windowsys.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/js sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/js/Fx.js":
/*!**********************!*\
  !*** ./src/js/Fx.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Fx = exports.activeFx = exports.WORLDFX = exports.PLAYERFX = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = __webpack_require__(/*! ./util/color.js */ "./src/js/util/color.js");

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _canvas_renderer = __webpack_require__(/*! ./canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _local_player = __webpack_require__(/*! ./local_player.js */ "./src/js/local_player.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PLAYERFX = exports.PLAYERFX = {
	NONE: null,
	RECT_SELECT_ALIGNED: function RECT_SELECT_ALIGNED(pixelSize, htmlColor) {
		return function (fx, ctx, time) {
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / (16 * pixelSize)) * pixelSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / (16 * pixelSize)) * pixelSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = htmlColor || fx.extra.player.htmlRgb;
			ctx.strokeRect(fxx, fxy, _canvas_renderer.camera.zoom * pixelSize, _canvas_renderer.camera.zoom * pixelSize);
			return 1; /* Rendering finished (won't change on next frame) */
		};
	}
};

var WORLDFX = exports.WORLDFX = {
	NONE: null,
	RECT_FADE_ALIGNED: function RECT_FADE_ALIGNED(size, x, y) {
		var startTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _misc.getTime)();
		return function (fx, ctx, time) {
			var alpha = 1 - (time - startTime) / 1000;
			if (alpha <= 0) {
				fx.delete();
				return 2; /* 2 = An FX object was deleted */
			}
			var fxx = (x * size - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (y * size - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var s = _canvas_renderer.camera.zoom * size;
			ctx.globalAlpha = alpha;
			ctx.strokeStyle = fx.extra.htmlRgb || "#000000";
			ctx.strokeRect(fxx, fxy, s, s);
			if (_conf.options.enableIdView && _local_player.player.rank >= _conf.RANK.MODERATOR && _canvas_renderer.camera.zoom >= 8 && fx.extra.tag) {
				fxx += s;
				var str = fx.extra.tag;
				var ts = ctx.measureText(str).width;
				ctx.fillStyle = "#FFFFFF";
				ctx.strokeStyle = "#000000";
				ctx.strokeText(str, fxx, fxy);
				ctx.fillText(str, fxx, fxy);
			}

			return 0; /* 0 = Animation not finished */
		};
	}
};

var activeFx = exports.activeFx = [];

/*PublicAPI.activeFx = activeFx;*/

var Fx = exports.Fx = function () {
	function Fx(renderFunc, extra) {
		_classCallCheck(this, Fx);

		this.visible = true;
		this.renderFunc = renderFunc;
		this.extra = extra || {};
		activeFx.push(this);
	}

	_createClass(Fx, [{
		key: 'render',
		value: function render(ctx, time) {
			if (this.renderFunc && this.visible) {
				return this.renderFunc(this, ctx, time);
			}
			return 1;
		}
	}, {
		key: 'setVisibleFunc',
		value: function setVisibleFunc(func) {
			Object.defineProperty(this, 'visible', {
				get: func
			});
		}
	}, {
		key: 'setVisible',
		value: function setVisible(bool) {
			this.visible = bool;
		}
	}, {
		key: 'setRenderer',
		value: function setRenderer(func) {
			this.renderFunc = func;
		}
	}, {
		key: 'update',
		value: function update(extra) {
			this.extra = extra;
		}
	}, {
		key: 'delete',
		value: function _delete() {
			var i = activeFx.indexOf(this);
			if (i !== -1) {
				activeFx.splice(i, 1);
			}
		}
	}]);

	return Fx;
}();

_global.PublicAPI.fx = {
	world: WORLDFX,
	player: PLAYERFX,
	class: Fx
};

_global.eventSys.on(_conf.EVENTS.net.world.tilesUpdated, function (tiles) {
	var time = (0, _misc.getTime)(true);
	var made = false;

	for (var i = 0; i < tiles.length; i++) {
		var t = tiles[i];

		if (_canvas_renderer.camera.isVisible(t.x, t.y, 1, 1)) {
			new Fx(WORLDFX.RECT_FADE_ALIGNED(1, t.x, t.y), { htmlRgb: _color.colorUtils.toHTML(t.rgb ^ 0xFFFFFF), tag: '' + t.id });
			made = true;
		}
	}
	if (made) {
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.net.chunk.set, function (chunkX, chunkY, data) {
	var wX = chunkX * _conf.protocol.chunkSize;
	var wY = chunkY * _conf.protocol.chunkSize;
	if (_canvas_renderer.camera.isVisible(wX, wY, _conf.protocol.chunkSize, _conf.protocol.chunkSize)) {
		new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY));
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.net.chunk.lock, function (chunkX, chunkY, state, local) {
	var wX = chunkX * _conf.protocol.chunkSize;
	var wY = chunkY * _conf.protocol.chunkSize;
	if (!local && _canvas_renderer.camera.isVisible(wX, wY, _conf.protocol.chunkSize, _conf.protocol.chunkSize)) {
		new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY), {
			htmlRgb: state ? "#00FF00" : "#FF0000"
		});
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Lerp = __webpack_require__(/*! ./util/Lerp.js */ "./src/js/util/Lerp.js");

var _color = __webpack_require__(/*! ./util/color.js */ "./src/js/util/color.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _Fx = __webpack_require__(/*! ./Fx.js */ "./src/js/Fx.js");

var _tools = __webpack_require__(/*! ./tools.js */ "./src/js/tools.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
	let toolSize = 30; // tool size in the player list
	toolSize = toolSize.toString() + "px";
    function Player(x, y, rgb, tool, id) {
        _classCallCheck(this, Player);

        this.id = id.toString(); /* Prevents calling .toString every frame */
        this._x = new _Lerp.Lerp(x, x, 65);
        this._y = new _Lerp.Lerp(y, y, 65);

        this.tool = _tools.tools[tool] || _tools.tools['cursor'];
        this.fx = new _Fx.Fx(tool ? tool.fxType : _Fx.PLAYERFX.NONE, { player: this });
        this.fx.setVisible(_main.misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));

        this.rgb = rgb;
        this.htmlRgb = _color.colorUtils.toHTML(_color.colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));

        this.clr = ((id + 75387) * 67283 + 53143) % 256 << 16 | ((id + 9283) * 4673 + 7483) % 256 << 8 | id * 3000 % 256;
        this.clr = _color.colorUtils.toHTML(this.clr);

        var playerListEntry = document.createElement("tr");
		document.getElementById("toole-container").childNodes.forEach((toolElement) => {
		    if(!toolElement.id.endsWith(this.tool.id)) return;
		    toolElement = toolElement.firstChild;
		    let img = `url('${location.origin + "/img/toolset.png"})`;
		    let pos = toolElement.style["background-position"];
		   	tool = `<div style='background-image: ${img}; background-position: ${pos}; width: ${toolSize}; height: ${toolSize};'></div>`;
		});
        playerListEntry.innerHTML = `<td>${this.id}</td><td>${Math.floor(x / 16)}</td><td>${Math.floor(y / 16)}</td><td style="color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}); font-size: 25px;">■</td><td>${tool}</td>`;
        _main.playerList[this.id] = playerListEntry;
        _main.playerListTable.appendChild(playerListEntry);
    }

    _createClass(Player, [{
        key: 'update',
        value: function update(x, y, rgb, tool) {
            this._x.val = x;
            this._y.val = y;
            /* TODO: fix weird bug (caused by connecting before tools initialized?) */
            //console.log(tool)
            this.tool = _tools.tools[tool] || _tools.tools['cursor'];
            this.fx.setRenderer((this.tool || {}).fxRenderer); // temp until fix: || {}
            this.fx.setVisible(_main.misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));
            this.rgb = rgb;
            this.htmlRgb = _color.colorUtils.toHTML(_color.colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));

            _main.playerList[this.id].childNodes[1].innerHTML = Math.floor(x / 16);
            _main.playerList[this.id].childNodes[2].innerHTML = Math.floor(y / 16);
            _main.playerList[this.id].childNodes[3].style.color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
			document.getElementById("toole-container").childNodes.forEach((toolElement) => {
			    if(!toolElement.id.endsWith(this.tool.id)) return;
			    toolElement = toolElement.firstChild;
		    	let img = `url("${location.origin + "/img/toolset.png"}")`;
			    let pos = toolElement.style["background-position"];
			   	tool = `<div style='background-image: ${img}; background-position: ${pos}; width: ${toolSize}; height: ${toolSize};'></div>`;
           	 	_main.playerList[this.id].childNodes[4].innerHTML = tool;
			});
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.fx.delete();

            _main.playerListTable.removeChild(_main.playerList[this.id]);
            delete _main.playerList[this.id];
        }
    }, {
        key: 'tileX',
        get: function get() {
            return Math.floor(this.x / 16);
        }
    }, {
        key: 'tileY',
        get: function get() {
            return Math.floor(this.y / 16);
        }
    }, {
        key: 'endX',
        get: function get() {
            return this._x.end;
        }
    }, {
        key: 'endY',
        get: function get() {
            return this._y.end;
        }
    }, {
        key: 'x',
        get: function get() {
            return this._x.val;
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y.val;
        }
    }]);

    return Player;
}();

/***/ }),

/***/ "./src/js/World.js":
/*!*************************!*\
  !*** ./src/js/World.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.World = exports.Chunk = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _color = __webpack_require__(/*! ./util/color.js */ "./src/js/util/color.js");

var _networking = __webpack_require__(/*! ./networking.js */ "./src/js/networking.js");

var _canvas_renderer = __webpack_require__(/*! ./canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _local_player = __webpack_require__(/*! ./local_player.js */ "./src/js/local_player.js");

var _Player = __webpack_require__(/*! ./Player.js */ "./src/js/Player.js");

var _Fx = __webpack_require__(/*! ./Fx.js */ "./src/js/Fx.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lastPlace = 0;

var Chunk = exports.Chunk = function () {
	function Chunk(x, y, netdata, locked) {
		_classCallCheck(this, Chunk);

		/* netdata = Uint32Array */
		this.needsRedraw = false;
		this.x = x;
		this.y = y;
		this.tmpChunkBuf = netdata;
		this.view = null;
		this.locked = locked;
		this.lockedNeighbors = 0; /* Up, Right, Down, Left */
	}

	_createClass(Chunk, [{
		key: 'update',
		value: function update(x, y, color) {
			/* WARNING: Should absMod if not power of two */
			x &= _conf.protocol.chunkSize - 1;
			y &= _conf.protocol.chunkSize - 1;
			this.view.set(x, y, 0xFF000000 | color);
			this.needsRedraw = true;
		}
	}, {
		key: 'forEach',
		value: function forEach(cb) {
			var s = _conf.protocol.chunkSize;
			for (var i = 0; i < s; i++) {
				for (var j = 0; j < s; j++) {
					if (!cb(j, i, this.get(j, i))) {
						return false;
					}
				}
			}
			return true;
		}
	}, {
		key: 'get',
		value: function get(x, y) {
			x &= _conf.protocol.chunkSize - 1;
			y &= _conf.protocol.chunkSize - 1;
			return this.view.get(x, y);
		}
	}, {
		key: 'set',
		value: function set(data) {
			if (Number.isInteger(data)) {
				this.view.fill(0xFF000000 | data);
			} else {
				this.view.fillFromBuf(data);
			}
			this.needsRedraw = true;
		}
	}, {
		key: 'remove',
		value: function remove() {
			/* Can be called when manually unloading too */
			_global.eventSys.emit(_conf.EVENTS.net.chunk.unload, this);
		}
	}]);

	return Chunk;
}();

Chunk.dir = {
	UP: 8,
	RIGHT: 4,
	DOWN: 2,
	LEFT: 1
};

var World = exports.World = function () {
	function World(worldName) {
		var _this = this;

		_classCallCheck(this, World);

		this.name = worldName;
		this.chunks = {};
		this.protectedChunks = {};
		this.players = {};
		this.undoHistory = [];
		this.pathUpdaterTimeout = -1;
		this.pathFx = new _Fx.Fx(function (fx, ctx, time) {
			var retval = 1;
			if (fx.extra.path) {
				ctx.strokeStyle = "#525252";
				var l = ctx.lineWidth;
				ctx.lineWidth = 3 / _canvas_renderer.camera.zoom;
				ctx.setTransform(_canvas_renderer.camera.zoom, 0, 0, _canvas_renderer.camera.zoom, -_canvas_renderer.camera.x * _canvas_renderer.camera.zoom, -_canvas_renderer.camera.y * _canvas_renderer.camera.zoom);
				if (time - fx.extra.placeTime < 1500) {
					ctx.globalAlpha = (1 - (time - fx.extra.placeTime) / 1500) * 0.5;
					ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
					ctx.fill(fx.extra.path);
					retval = 0;
				}
				ctx.globalAlpha = 0.75;
				ctx.stroke(fx.extra.path);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.lineWidth = l;
			}
			return retval;
		});

		var loadCFunc = function loadCFunc(chunk) {
			return _this.chunkLoaded(chunk);
		};
		var unloadCFunc = function unloadCFunc(chunk) {
			return _this.chunkUnloaded(chunk);
		};
		var setCFunc = function setCFunc(x, y, data) {
			return _this.chunkPasted(x, y, data);
		};
		var lockCFunc = function lockCFunc(x, y, newState) {
			return _this.chunkLocked(x, y, newState);
		};
		var disconnectedFunc = function disconnectedFunc() {
			return _global.eventSys.emit(_conf.EVENTS.net.world.leave);
		};
		var updateTileFunc = function updateTileFunc(t) {
			return _this.tilesUpdated(t);
		};
		var updatePlayerFunc = function updatePlayerFunc(p) {
			return _this.playersMoved(p);
		};
		var destroyPlayerFunc = function destroyPlayerFunc(p) {
			return _this.playersLeft(p);
		};
		var leaveWFunc = function leaveWFunc() {
			_this.pathFx.delete();
			_this.unloadAllChunks();
			_this.playersLeft(Object.keys(_this.players));
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.load, loadCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.unload, unloadCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.set, setCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.lock, lockCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, disconnectedFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.tilesUpdated, updateTileFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.playersMoved, updatePlayerFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.playersLeft, destroyPlayerFunc);
		};
		_global.eventSys.on(_conf.EVENTS.net.chunk.load, loadCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.unload, unloadCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.set, setCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.lock, lockCFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.tilesUpdated, updateTileFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.playersMoved, updatePlayerFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.playersLeft, destroyPlayerFunc);
		_global.eventSys.once(_conf.EVENTS.net.world.leave, leaveWFunc);
		_global.eventSys.once(_conf.EVENTS.net.disconnected, disconnectedFunc);
	}

	_createClass(World, [{
		key: 'makeLockedChunksPath',
		value: function makeLockedChunksPath() {
			var d = Chunk.dir;
			var mainPath = new Path2D();

			var vpoints = {};
			var hpoints = {};

			var addPoint = function addPoint(fx, fy, tx, ty, points) {
				var fkey = fx + ',' + fy;
				var tkey = tx + ',' + ty;
				if (tkey in points && fkey in points) {
					points[points[fkey]] = points[tkey];
					points[points[tkey]] = points[fkey];
					delete points[tkey];
					delete points[fkey];
				} else if (tkey in points) {
					var newTo = points[tkey];
					points[newTo] = fkey;
					delete points[tkey];
					points[fkey] = newTo;
				} else if (fkey in points) {
					var newFrom = points[fkey];
					points[newFrom] = tkey;
					delete points[fkey];
					points[tkey] = newFrom;
				} else {
					points[fkey] = tkey;
					points[tkey] = fkey;
				}
			};

			for (var k in this.protectedChunks) {
				var chunk = this.protectedChunks[k];
				var ln = chunk.lockedNeighbors;
				if (ln === (d.LEFT | d.DOWN | d.UP | d.RIGHT)) {
					continue;
				}

				if (!(ln & d.UP)) {
					addPoint(chunk.x + 1, chunk.y, chunk.x, chunk.y, hpoints);
				}
				if (!(ln & d.DOWN)) {
					addPoint(chunk.x, chunk.y + 1, chunk.x + 1, chunk.y + 1, hpoints);
				}

				if (!(ln & d.LEFT)) {
					addPoint(chunk.x, chunk.y + 1, chunk.x, chunk.y, vpoints);
				}
				if (!(ln & d.RIGHT)) {
					addPoint(chunk.x + 1, chunk.y + 1, chunk.x + 1, chunk.y, vpoints);
				}
			}

			var polys = 0;
			var pointobjs = [vpoints, hpoints];
			for (var p in vpoints) {
				var a = p.split(',');
				mainPath.moveTo(a[0] * 16, a[1] * 16);

				delete vpoints[vpoints[p]];
				delete vpoints[p];
				p = hpoints[p];
				for (var i = 0; p && (a = p.split(',')); i++) {
					var prev = pointobjs[i + 1 & 1];
					var next = pointobjs[i & 1];
					mainPath.lineTo(a[0] * 16, a[1] * 16);

					delete prev[prev[p]];
					delete prev[p];
					p = next[p];
				}
				mainPath.closePath();
				++polys;
			}

			return polys === 0 ? null : mainPath;
		}
	}, {
		key: 'findNeighborLockedChunks',
		value: function findNeighborLockedChunks(chunk, newState) {
			var _this2 = this;

			var d = Chunk.dir;
			var checkSide = function checkSide(x, y, to, from) {
				var sidec = _this2.getChunkAt(chunk.x + x, chunk.y + y);
				if (sidec && sidec.locked) {
					if (newState) {
						chunk.lockedNeighbors |= to;
						sidec.lockedNeighbors |= from;
					} else {
						chunk.lockedNeighbors &= ~to;
						sidec.lockedNeighbors &= ~from;
					}
				}
			};

			checkSide(0, -1, d.UP, d.DOWN);
			checkSide(1, 0, d.RIGHT, d.LEFT);
			checkSide(-1, 0, d.LEFT, d.RIGHT);
			checkSide(0, 1, d.DOWN, d.UP);

			clearTimeout(this.pathUpdaterTimeout);
			this.pathUpdaterTimeout = setTimeout(function () {
				_this2.pathFx.update({ path: _this2.makeLockedChunksPath() });
				_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
			}, 100);
		}
	}, {
		key: 'loadChunk',
		value: function loadChunk(x, y) {
			var key = x + ',' + y;
			if (!this.chunks[key] && _networking.net.isConnected()) {
				_networking.net.protocol.requestChunk(x, y);
			}
		}
	}, {
		key: 'allChunksLoaded',
		value: function allChunksLoaded() {
			return _networking.net.protocol.allChunksLoaded();
		}
	}, {
		key: 'tilesUpdated',
		value: function tilesUpdated(tiles) {
			var chunksUpdated = {};
			var chunkSize = _conf.protocol.chunkSize;
			for (var i = 0; i < tiles.length; i++) {
				var t = tiles[i];
				var key = Math.floor(t.x / chunkSize) + ',' + Math.floor(t.y / chunkSize);
				var chunk = this.chunks[key];
				if (chunk) {
					chunksUpdated[key] = chunk;
					chunk.update(t.x, t.y, t.rgb);
				}
			}
			for (var c in chunksUpdated) {
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunksUpdated[c]);
			}
		}
	}, {
		key: 'playersMoved',
		value: function playersMoved(players) {
			var rendered = false;
			for (var id in players) {
				var player = this.players[id];
				var u = players[id];
				if (player) {
					player.update(u.x, u.y, u.rgb, u.tool);
				} else {
					player = this.players[id] = new _Player.Player(u.x, u.y, u.rgb, u.tool, id);
				}
				if (!rendered && ((0, _canvas_renderer.isVisible)(player.endX / 16, player.endY / 16, 4, 4) || (0, _canvas_renderer.isVisible)(player.x / 16, player.y / 16, 4, 4))) {
					rendered = true;
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				}
			}
		}
	}, {
		key: 'playersLeft',
		value: function playersLeft(ids) {
			var rendered = false;
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];
				var player = this.players[id];
				if (player) {
					player.disconnect();
					if (!rendered && (0, _canvas_renderer.isVisible)(player.x / 16, player.y / 16, 4, 4)) {
						rendered = true;
						_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
					}
				}
				delete this.players[id];
			}
		}
	}, {
		key: 'setPixel',
		value: function setPixel(x, y, color, noUndo) {
			var time = Date.now();
			var chunkSize = _conf.protocol.chunkSize;
			var chunk = this.chunks[Math.floor(x / chunkSize) + ',' + Math.floor(y / chunkSize)];
			
			if (chunk && (!chunk.locked || _local_player.player.rank >= _conf.RANK.MODERATOR)) {
				var oldPixel = this.getPixel(x, y, chunk);
				if (!oldPixel || oldPixel[0] === color[0] && oldPixel[1] === color[1] && oldPixel[2] === color[2] || !_networking.net.protocol.updatePixel(x, y, color)) {
					return false;
				}
				if (!noUndo) {
					oldPixel.push(x, y, time);
					this.undoHistory.push(oldPixel);
				}
				chunk.update(x, y, _color.colorUtils.u24_888(color[0], color[1], color[2]));
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunk);
				if (time - lastPlace > 30) {
					_main.sounds.play(_main.sounds.place);
					lastPlace = time;
				}
				return true;
			} else if (chunk && chunk.locked) {
				this.pathFx.extra.placeTime = time;
				_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
			}
			
			return false;
		}
	}, {
		key: 'undo',
		value: function undo(bulkUndo) {
			var eq = function eq(a, b) {
				return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
			};
			if (this.undoHistory.length === 0) {
				return false;
			}
			var changeTime = null;
			for (var i = this.undoHistory.length; --i >= 0;) {
				var undo = this.undoHistory[i];
				if (!changeTime) {
					changeTime = undo[5];
				}
				var px = this.getPixel(undo[3], undo[4]);
				if (px) {
					var shouldContinue = !bulkUndo || changeTime - undo[5] < 500;
					var unchanged = eq(px, undo);
					if (!shouldContinue) {
						break;
					}
					if (unchanged || this.setPixel(undo[3], undo[4], undo, true)) {
						this.undoHistory.splice(i, 1);
						if (!bulkUndo) {
							break;
						}
					}
				}
			}
		}
	}, {
		key: 'getChunkAt',
		value: function getChunkAt(x, y) {
			return this.chunks[x + ',' + y];
		}
	}, {
		key: 'getPixel',
		value: function getPixel(x, y, chunk) {
			if (!chunk) {
				var chunkSize = _conf.protocol.chunkSize;
				chunk = this.chunks[Math.floor(x / chunkSize) + ',' + Math.floor(y / chunkSize)];
			}

			if (chunk) {
				var clr = chunk.get(x, y);
				return [clr & 0xFF, clr >> 8 & 0xFF, clr >> 16 & 0xFF];
			}
			return null;
		}
	}, {
		key: 'validMousePos',
		value: function validMousePos(tileX, tileY) {
			return this.getPixel(tileX, tileY) !== null;
		}
	}, {
		key: 'chunkLocked',
		value: function chunkLocked(x, y, newState) {
			var key = x + ',' + y;
			var chunk = this.getChunkAt(x, y);
			if (chunk) {
				if (newState) {
					this.protectedChunks[key] = chunk;
					chunk.locked = true;
				} else {
					delete this.protectedChunks[key];
					chunk.locked = false;
				}
				this.findNeighborLockedChunks(chunk, newState);
			}
		}
	}, {
		key: 'chunkLoaded',
		value: function chunkLoaded(chunk) {
			var key = chunk.x + ',' + chunk.y;
			this.chunks[key] = chunk;
			if (chunk.locked) {
				this.protectedChunks[key] = chunk;
				this.findNeighborLockedChunks(chunk, chunk.locked);
			}
			_global.eventSys.emit(_conf.EVENTS.renderer.addChunk, chunk);
		}
	}, {
		key: 'chunkUnloaded',
		value: function chunkUnloaded(chunk) {
			var key = chunk.x + ',' + chunk.y;
			delete this.chunks[key];
			if (chunk.locked) {
				delete this.protectedChunks[key];
				chunk.locked = false;
				this.findNeighborLockedChunks(chunk, chunk.locked);
			}
			_global.eventSys.emit(_conf.EVENTS.renderer.rmChunk, chunk);
		}
	}, {
		key: 'chunkPasted',
		value: function chunkPasted(x, y, data) {
			var chunk = this.chunks[x + ',' + y];
			if (chunk) {
				chunk.set(data);
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunk);
			}
		}
	}, {
		key: 'unloadAllChunks',
		value: function unloadAllChunks() {
			for (var c in this.chunks) {
				this.chunks[c].remove();
			}
		}
	}]);

	return World;
}();

/***/ }),

/***/ "./src/js/canvas_renderer.js":
/*!***********************************!*\
  !*** ./src/js/canvas_renderer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderer = exports.camera = exports.isVisible = exports.moveCameraTo = exports.moveCameraBy = exports.centerCameraTo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.drawText = drawText;
exports.unloadFarClusters = unloadFarClusters;

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _local_player = __webpack_require__(/*! ./local_player.js */ "./src/js/local_player.js");

var _Fx = __webpack_require__(/*! ./Fx.js */ "./src/js/Fx.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _color = __webpack_require__(/*! ./util/color.js */ "./src/js/util/color.js");

var _Lerp = __webpack_require__(/*! ./util/Lerp.js */ "./src/js/util/Lerp.js");

var _tools = __webpack_require__(/*! ./tools.js */ "./src/js/tools.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.centerCameraTo = centerCameraTo;
exports.moveCameraBy = moveCameraBy;
exports.moveCameraTo = moveCameraTo;
exports.isVisible = isVisible;

/* oh boy, i'm going to get shit for making this private, aren't i?  */

var cameraValues = {
	x: 0,
	y: 0,
	zoom: -1 /*,
          lerpZoom: new Lerp(options.defaultZoom, options.defaultZoom, 200)*/
};

var camera = exports.camera = {
	get x() {
		return cameraValues.x;
	},
	get y() {
		return cameraValues.y;
	},
	get zoom() {
		return cameraValues.zoom;
	},
	/*get lerpZoom() { return cameraValues.lerpZoom.val; },*/
	set zoom(z) {
		z = Math.min(_conf.options.zoomLimitMax, Math.max(_conf.options.zoomLimitMin, z));
		if (z !== cameraValues.zoom) {
			var center = getCenterPixel();
			cameraValues.zoom = z;
			centerCameraTo(center[0], center[1]);
			_global.eventSys.emit(_conf.EVENTS.camera.zoom, z);
		}
	},
	isVisible: isVisible
};

var rendererValues = {
	updateRequired: 3,
	animContext: null,
	gridShown: true,
	gridPattern: null, /* Rendered each time the zoom changes */
	unloadedPattern: null,
	worldBackground: null,
	minGridZoom: _conf.options.minGridZoom,
	updatedClusters: [], /* Clusters to render in the next frame */
	clusters: {},
	visibleClusters: [],
	currentFontSize: -1
};

/*PublicAPI.rval = rendererValues;*/

var renderer = exports.renderer = {
	rendertype: {
		ALL: 3,
		FX: 1,
		WORLD: 2
	},
	patterns: {
		get unloaded() {
			return rendererValues.unloadedPattern;
		}
	},
	render: requestRender,
	showGrid: setGridVisibility,
	get gridShown() {
		return rendererValues.gridShown;
	},
	updateCamera: onCameraMove,
	unloadFarClusters: unloadFarClusters
};

_global.PublicAPI.camera = camera;
_global.PublicAPI.renderer = renderer;

var BufView = function () {
	function BufView(u32data, x, y, w, h, realw) {
		_classCallCheck(this, BufView);

		this.data = u32data;
		if (_conf.options.chunkBugWorkaround) {
			this.changes = [];
		}
		this.offx = x;
		this.offy = y;
		this.realwidth = realw;
		this.width = w;
		this.height = h;
	}

	_createClass(BufView, [{
		key: 'get',
		value: function get(x, y) {
			return this.data[this.offx + x + (this.offy + y) * this.realwidth];
		}
	}, {
		key: 'set',
		value: function set(x, y, data) {
			this.data[this.offx + x + (this.offy + y) * this.realwidth] = data;
			if (_conf.options.chunkBugWorkaround) {
				this.changes.push([0, x, y, data]);
			}
		}
	}, {
		key: 'fill',
		value: function fill(data) {
			for (var i = 0; i < this.height; i++) {
				for (var j = 0; j < this.width; j++) {
					this.data[this.offx + j + (this.offy + i) * this.realwidth] = data;
				}
			}
			if (_conf.options.chunkBugWorkaround) {
				this.changes.push([1, 0, 0, data]);
			}
		}
	}, {
		key: 'fillFromBuf',
		value: function fillFromBuf(u32buf) {
			for (var i = 0; i < this.height; i++) {
				for (var j = 0; j < this.width; j++) {
					this.data[this.offx + j + (this.offy + i) * this.realwidth] = u32buf[j + i * this.width];
					if (_conf.options.chunkBugWorkaround) {
						/* Terrible */
						this.changes.push([0, j, i, u32buf[j + i * this.width]]);
					}
				}
			}
		}
	}]);

	return BufView;
}();

var ChunkCluster = function () {
	function ChunkCluster(x, y) {
		_classCallCheck(this, ChunkCluster);

		this.removed = false;
		this.toUpdate = false;
		this.shown = false; /* is in document? */
		this.x = x;
		this.y = y;
		this.canvas = document.createElement("canvas");
		this.canvas.width = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		this.canvas.height = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		this.ctx = this.canvas.getContext("2d");
		this.data = this.ctx.createImageData(this.canvas.width, this.canvas.height);
		this.u32data = new Uint32Array(this.data.data.buffer);
		this.chunks = [];
		if (_conf.options.chunkBugWorkaround) {
			this.currentColor = 0;
		}
	}

	_createClass(ChunkCluster, [{
		key: 'render',
		value: function render() {
			this.toUpdate = false;
			for (var i = this.chunks.length; i--;) {
				var c = this.chunks[i];
				if (c.needsRedraw) {
					c.needsRedraw = false;
					if (_conf.options.chunkBugWorkaround) {
						var arr = c.view.changes;
						var s = _conf.protocol.chunkSize;
						for (var j = 0; j < arr.length; j++) {
							var current = arr[j];
							if (this.currentColor !== current[3]) {
								this.currentColor = current[3];
								this.ctx.fillStyle = _color.colorUtils.toHTML(current[3]);
							}
							switch (current[0]) {
								case 0:
									this.ctx.fillRect(c.view.offx + current[1], c.view.offy + current[2], 1, 1);
									break;
								case 1:
									this.ctx.fillRect(c.view.offx, c.view.offy, s, s);
									break;
							}
						}
						c.view.changes = [];
					} else {
						this.ctx.putImageData(this.data, 0, 0, c.view.offx, c.view.offy, c.view.width, c.view.height);
					}
				}
			}
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.removed = true;
			if (this.shown) {
				var visiblecl = rendererValues.visibleClusters;
				visiblecl.splice(visiblecl.indexOf(this), 1);
				this.shown = false;
			}
			this.canvas.width = 0;
			this.u32data = this.data = null;
			delete rendererValues.clusters[this.x + ',' + this.y];
			for (var i = 0; i < this.chunks.length; i++) {
				this.chunks[i].view = null;
				this.chunks[i].remove();
			}
			this.chunks = [];
		}
	}, {
		key: 'addChunk',
		value: function addChunk(chunk) {
			/* WARNING: Should absMod if not power of two */
			var x = chunk.x & _conf.protocol.clusterChunkAmount - 1;
			var y = chunk.y & _conf.protocol.clusterChunkAmount - 1;
			var s = _conf.protocol.chunkSize;
			var view = new BufView(this.u32data, x * s, y * s, s, s, _conf.protocol.clusterChunkAmount * s);
			if (chunk.tmpChunkBuf) {
				view.fillFromBuf(chunk.tmpChunkBuf);
				chunk.tmpChunkBuf = null;
			}
			chunk.view = view;
			this.chunks.push(chunk);
			chunk.needsRedraw = true;
		}
	}, {
		key: 'delChunk',
		value: function delChunk(chunk) {
			chunk.view = null;
			/* There is no real need to clearRect the chunk area */
			var i = this.chunks.indexOf(chunk);
			if (i !== -1) {
				this.chunks.splice(i, 1);
			}
			if (!this.chunks.length) {
				this.remove();
			}
		}
	}]);

	return ChunkCluster;
}();

/* Draws white text with a black border */


function drawText(ctx, str, x, y, centered) {
	ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
	if (centered) {
		x -= ctx.measureText(str).width >> 1;
	}
	ctx.strokeText(str, x, y);
	ctx.globalAlpha = 1;
	ctx.fillText(str, x, y);
}

function isVisible(x, y, w, h) {
	var cx = camera.x;
	var cy = camera.y;
	var czoom = camera.zoom;
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	return x + w > cx && y + h > cy && x <= cx + cw / czoom && y <= cy + ch / czoom;
}

function unloadFarClusters() {
	/* Slow? */
	var camx = camera.x;
	var camy = camera.y;
	var zoom = camera.zoom;
	var camw = window.innerWidth / zoom | 0;
	var camh = window.innerHeight / zoom | 0;
	var ctrx = camx + camw / 2;
	var ctry = camy + camh / 2;
	var s = _conf.protocol.clusterChunkAmount * _conf.protocol.chunkSize;
	for (var c in rendererValues.clusters) {
		c = rendererValues.clusters[c];
		if (!isVisible(c.x * s, c.y * s, s, s)) {
			var dx = Math.abs(ctrx / s - c.x) | 0;
			var dy = Math.abs(ctry / s - c.y) | 0;
			var dist = dx + dy;
			if (dist > _conf.options.unloadDistance) {
				c.remove();
			}
		}
	}
}

function render(type) {
	var time = (0, _misc.getTime)(true);
	var camx = camera.x;
	var camy = camera.y;
	var zoom = camera.zoom;
	var needsRender = 0;

	if (type & renderer.rendertype.WORLD) {
		var uClusters = rendererValues.updatedClusters;
		for (var i = 0; i < uClusters.length; i++) {
			var c = uClusters[i];
			c.render();
		}
		rendererValues.updatedClusters = [];
	}

	if (type & renderer.rendertype.FX && _main.misc.world !== null) {
		var ctx = rendererValues.animContext;
		var visible = rendererValues.visibleClusters;
		var clusterCanvasSize = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		var cwidth = window.innerWidth;
		var cheight = window.innerHeight;
		var background = rendererValues.worldBackground;
		var allChunksLoaded = _main.misc.world.allChunksLoaded();

		if (!allChunksLoaded) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		ctx.lineWidth = 2.5 / 16 * zoom;

		ctx.scale(zoom, zoom);

		for (var i = 0; i < visible.length; i++) {
			var cluster = visible[i];
			var gx = -(camx - cluster.x * clusterCanvasSize);
			var gy = -(camy - cluster.y * clusterCanvasSize);
			var clipx = gx < 0 ? -gx : 0;
			var clipy = gy < 0 ? -gy : 0;
			var x = gx < 0 ? 0 : gx;
			var y = gy < 0 ? 0 : gy;
			var clipw = clusterCanvasSize - clipx;
			var cliph = clusterCanvasSize - clipy;
			clipw = clipw + x < cwidth / zoom ? clipw : cwidth / zoom - x;
			cliph = cliph + y < cheight / zoom ? cliph : cheight / zoom - y;
			clipw = clipw + 1 | 0; /* Math.ceil */
			cliph = cliph + 1 | 0;
			if (clipw > 0 && cliph > 0) {
				ctx.drawImage(cluster.canvas, clipx, clipy, clipw, cliph, x, y, clipw, cliph);
			}
		}

		ctx.scale(1 / zoom, 1 / zoom);

		if (background != null) {
			var newscale = zoom / _conf.options.defaultZoom;
			var oldscale = _conf.options.defaultZoom / zoom;
			var gx = -(camx * zoom) % (background.width * newscale);
			var gy = -(camy * zoom) % (background.height * newscale);
			ctx.translate(gx, gy);

			ctx.fillStyle = background;
			ctx.globalCompositeOperation = "destination-over";

			ctx.scale(newscale, newscale);
			ctx.fillRect(-gx / newscale, -gy / newscale, ctx.canvas.width * oldscale, ctx.canvas.height * oldscale);
			ctx.scale(oldscale, oldscale);

			ctx.translate(-gx, -gy);
		}

		var gx = -(camx * zoom) % (16 * zoom);
		var gy = -(camy * zoom) % (16 * zoom);
		ctx.translate(gx, gy);

		if (rendererValues.gridShown && rendererValues.gridPattern) {
			ctx.fillStyle = rendererValues.gridPattern;
			if (!allChunksLoaded) {
				ctx.globalCompositeOperation = "source-atop";
			}
			ctx.fillRect(-gx, -gy, ctx.canvas.width, ctx.canvas.height);
		}

		if (rendererValues.unloadedPattern != null && (!allChunksLoaded || background != null)) {
			ctx.fillStyle = rendererValues.unloadedPattern;
			ctx.globalCompositeOperation = "destination-over";
			ctx.fillRect(-gx, -gy, ctx.canvas.width, ctx.canvas.height);
		}

		ctx.translate(-gx, -gy);

		ctx.globalCompositeOperation = "source-over";

		for (var i = 0; i < _Fx.activeFx.length; i++) {
			switch (_Fx.activeFx[i].render(ctx, time)) {
				case 0:
					/* Anim not finished */
					needsRender |= renderer.rendertype.FX;
					break;
				case 2:
					/* Obj deleted from array, prevent flickering */
					--i;
					break;
			}
		}
		ctx.globalAlpha = 1;
		var players = _main.misc.world.players;
		var fontsize = 10 / 16 * zoom | 0;
		if (rendererValues.currentFontSize != fontsize) {
			ctx.font = fontsize + "px sans-serif";
			rendererValues.currentFontSize = fontsize;
		}
		for (var p in players) {
			var player = players[p];
			if (!renderPlayer(player, fontsize)) {
				needsRender |= renderer.rendertype.FX;
			}
		}
	}

	requestRender(needsRender);
}

function renderPlayer(targetPlayer, fontsize) {
	var camx = camera.x * 16;
	var camy = camera.y * 16;
	var zoom = camera.zoom;
	var ctx = rendererValues.animContext;
	var cnvs = ctx.canvas;
	var tool = targetPlayer.tool;
	if (!tool) {
		/* Render the default tool if the selected one isn't defined */
		tool = _tools.tools['cursor'];
	}
	var toolwidth = tool.cursor.width / 16 * zoom;
	var toolheight = tool.cursor.height / 16 * zoom;

	var x = targetPlayer.x;
	var y = targetPlayer.y;
	var cx = (x - camx - tool.offset[0]) * (zoom / 16) | 0;
	var cy = (y - camy - tool.offset[1]) * (zoom / 16) | 0;

	if (cx < -toolwidth || cy < -toolheight || cx > cnvs.width || cy > cnvs.height) {
		return true;
	}

	if (fontsize > 3) {
		var idstr = targetPlayer.id;
		var textw = ctx.measureText(idstr).width + zoom / 2;

		ctx.globalAlpha = 1;
		ctx.fillStyle = targetPlayer.clr;
		ctx.fillRect(cx, cy + toolheight, textw, zoom);
		ctx.globalAlpha = 0.2;
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(cx, cy + toolheight, textw, zoom);
		ctx.globalAlpha = 1;
		drawText(ctx, idstr, cx + zoom / 4, cy + fontsize + toolheight + zoom / 8);
	}

	ctx.drawImage(tool.cursor, cx, cy, toolwidth, toolheight);

	return x === targetPlayer.endX && y === targetPlayer.endY;
}

function requestRender(type) {
	rendererValues.updateRequired |= type;
}

function setGridVisibility(enabled) {
	rendererValues.gridShown = enabled;
	requestRender(renderer.rendertype.FX);
}

function renderGrid(zoom) {
	var tmpcanvas = document.createElement("canvas");
	var ctx = tmpcanvas.getContext("2d");
	var size = tmpcanvas.width = tmpcanvas.height = Math.round(16 * zoom);
	ctx.setLineDash([1]);
	ctx.globalAlpha = 0.2;
	if (zoom >= 4) {
		var fadeMult = Math.min(1, zoom - 4);
		if (fadeMult < 1) {
			ctx.globalAlpha = 0.2 * fadeMult;
		}
		ctx.beginPath();
		for (var i = 16; --i;) {
			ctx.moveTo(i * zoom + .5, 0);
			ctx.lineTo(i * zoom + .5, size);
			ctx.moveTo(0, i * zoom + .5);
			ctx.lineTo(size, i * zoom + .5);
		}
		ctx.stroke();
		ctx.globalAlpha = Math.max(0.2, 1 * fadeMult);
	}
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, size);
	ctx.lineTo(size, size);
	ctx.stroke();
	return ctx.createPattern(tmpcanvas, "repeat");
}

function setGridZoom(zoom) {
	if (zoom >= rendererValues.minGridZoom) {
		rendererValues.gridPattern = renderGrid(zoom);
	} else {
		rendererValues.gridPattern = null;
	}
}

function updateVisible() {
	var clusters = rendererValues.clusters;
	var visiblecl = rendererValues.visibleClusters;
	for (var c in clusters) {
		c = clusters[c];
		var size = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		var visible = isVisible(c.x * size, c.y * size, size, size);
		if (!visible && c.shown) {
			c.shown = false;
			visiblecl.splice(visiblecl.indexOf(c), 1);
		} else if (visible && !c.shown) {
			c.shown = true;
			visiblecl.push(c);
			requestRender(renderer.rendertype.WORLD);
		}
	}
};

function onResize() {
	_main.elements.animCanvas.width = window.innerWidth;
	_main.elements.animCanvas.height = window.innerHeight;
	var ctx = rendererValues.animContext;
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	rendererValues.currentFontSize = -1;
	onCameraMove();
}

function alignCamera() {
	var zoom = cameraValues.zoom;
	var alignedX = Math.round(cameraValues.x * zoom) / zoom;
	var alignedY = Math.round(cameraValues.y * zoom) / zoom;
	cameraValues.x = alignedX;
	cameraValues.y = alignedY;
}

function requestMissingChunks() {
	/* TODO: move this to World */
	var x = camera.x / _conf.protocol.chunkSize - 2 | 0;
	var mx = camera.x / _conf.protocol.chunkSize + window.innerWidth / camera.zoom / _conf.protocol.chunkSize | 0;
	var cy = camera.y / _conf.protocol.chunkSize - 2 | 0;
	var my = camera.y / _conf.protocol.chunkSize + window.innerHeight / camera.zoom / _conf.protocol.chunkSize | 0;
	while (++x <= mx) {
		var y = cy;
		while (++y <= my) {
			_main.misc.world.loadChunk(x, y);
		}
	}
}

function onCameraMove() {
	_global.eventSys.emit(_conf.EVENTS.camera.moved, camera);
	alignCamera();
	updateVisible();
	if (_main.misc.world !== null) {
		requestMissingChunks();
	}
	requestRender(renderer.rendertype.FX);
}

function getCenterPixel() {
	var x = Math.round(cameraValues.x + window.innerWidth / camera.zoom / 2);
	var y = Math.round(cameraValues.y + window.innerHeight / camera.zoom / 2);
	return [x, y];
}

function centerCameraTo(x, y) {
	cameraValues.x = -(window.innerWidth / camera.zoom / 2) + x;
	cameraValues.y = -(window.innerHeight / camera.zoom / 2) + y;
	onCameraMove();
}

function moveCameraBy(x, y) {
	cameraValues.x += x;
	cameraValues.y += y;
	onCameraMove();
}

function moveCameraTo(x, y) {
	cameraValues.x = x;
	cameraValues.y = y;
	onCameraMove();
}

_global.eventSys.on(_conf.EVENTS.net.world.teleported, function (x, y) {
	centerCameraTo(x, y);
});

_global.eventSys.on(_conf.EVENTS.camera.zoom, function (z) {
	setGridZoom(z);
	/*cameraValues.lerpZoom.val = z;*/
	requestRender(renderer.rendertype.FX);
});

_global.eventSys.on(_conf.EVENTS.renderer.addChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var clusters = rendererValues.clusters;
	var cluster = clusters[key];
	if (!cluster) {
		cluster = clusters[key] = new ChunkCluster(clusterX, clusterY);
		updateVisible();
	}
	cluster.addChunk(chunk);
	if (!cluster.toUpdate) {
		cluster.toUpdate = true;
		rendererValues.updatedClusters.push(cluster);
	}
	var size = _conf.protocol.chunkSize;
	if (cluster.toUpdate || isVisible(chunk.x * size, chunk.y * size, size, size)) {
		requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.renderer.rmChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var clusters = rendererValues.clusters;
	var cluster = clusters[key];
	if (cluster) {
		cluster.delChunk(chunk);
		if (!cluster.removed && !cluster.toUpdate) {
			cluster.toUpdate = true;
			rendererValues.updatedClusters.push(cluster);
		}
	}
});

_global.eventSys.on(_conf.EVENTS.renderer.updateChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var cluster = rendererValues.clusters[key];
	if (cluster && !cluster.toUpdate) {
		cluster.toUpdate = true;
		rendererValues.updatedClusters.push(cluster);
	}
	var size = _conf.protocol.chunkSize;
	if (isVisible(chunk.x * size, chunk.y * size, size, size)) {
		requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.misc.worldInitialized, function () {
	requestMissingChunks();
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	rendererValues.animContext = _main.elements.animCanvas.getContext("2d", { alpha: false });
	window.addEventListener("resize", onResize);
	onResize();
	camera.zoom = _conf.options.defaultZoom;
	centerCameraTo(0, 0);

	var mkPatternFromUrl = function mkPatternFromUrl(url, cb) {
		var patImg = new Image();
		patImg.onload = function () {
			var pat = rendererValues.animContext.createPattern(patImg, "repeat");
			pat.width = patImg.width;
			pat.height = patImg.height;
			cb(pat);
		};
		patImg.src = url;
	};

	/* Create the pattern images */
	mkPatternFromUrl(_conf.options.unloadedPatternUrl, function (pat) {
		rendererValues.unloadedPattern = pat;
	});

	if (_conf.options.backgroundUrl != null) {
		mkPatternFromUrl(_conf.options.backgroundUrl, function (pat) {
			rendererValues.worldBackground = pat;
		});
	}

	function frameLoop() {
		var type = void 0;
		if ((type = rendererValues.updateRequired) !== 0) {
			rendererValues.updateRequired = 0;
			render(type);
		}
		window.requestAnimationFrame(frameLoop);
	}
	_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, frameLoop);
});

/***/ }),

/***/ "./src/js/captcha.js":
/*!***************************!*\
  !*** ./src/js/captcha.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadAndRequestCaptcha = loadAndRequestCaptcha;

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _windowsys = __webpack_require__(/*! ./windowsys.js */ "./src/js/windowsys.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var SITEKEY = "6LfDk7AgAAAAAO7lvBvIK0wGEE6A0rS9sy-q4KrI";

function loadCaptcha(onload) {
	if (!window.grecaptcha) {
		if (window.callback) {
			/* Hacky solution for race condition */
			window.callback = function () {
				onload();
				this();
			}.bind(window.callback);
		} else {
			window.callback = function () {
				delete window.callback;
				onload();
			};
			_global.eventSys.emit(_conf.EVENTS.misc.loadingCaptcha);
			(0, _misc.loadScript)("https://www.google.com/recaptcha/api.js?onload=callback&render=explicit");
		}
	} else {
		onload();
	}
}

function requestVerification() {
	_windowsys.windowSys.addWindow(new _windowsys.GUIWindow("Verification needed", {
		centered: true
	}, function (wdow) {
		var id = grecaptcha.render(wdow.addObj((0, _misc.mkHTML)("div", {
			id: "captchawdow"
		})), {
			theme: "light",
			sitekey: SITEKEY,
			callback: function callback(token) {
				_global.eventSys.emit(_conf.EVENTS.misc.captchaToken, token);
				wdow.close();
			}
		});
		wdow.frame.style.cssText = "";
		wdow.container.style.cssText = "overflow: hidden; background-color: #F9F9F9";
	}));
}

function loadAndRequestCaptcha() {
	if ('owopcaptcha' in localStorage) {
		setTimeout(function () {
			_global.eventSys.emit(_conf.EVENTS.misc.captchaToken, localStorage.owopcaptcha);
		}, 0);
	} else {
		loadCaptcha(requestVerification);
	}
}

/***/ }),

/***/ "./src/js/conf.js":
/*!************************!*\
  !*** ./src/js/conf.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = exports.EVENTS = exports.RANK = exports.protocol = undefined;

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _toolset = __webpack_require__(/*! ../img/toolset.png */ "./src/img/toolset.png");

var _toolset2 = _interopRequireDefault(_toolset);

var _unloaded = __webpack_require__(/*! ../img/unloaded.png */ "./src/img/unloaded.png");

var _unloaded2 = _interopRequireDefault(_unloaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Important constants */

var protocol = exports.protocol = null;

/* The raw event ID numbers should NOT be used, instead import the EVENTS object in your file. */
var evtId = 6666666; /* no */

var RANK = exports.RANK = {
	NONE: 0,
	USER: 1,
	MODERATOR: 2,
	ADMIN: 3
};

_global.PublicAPI.RANK = RANK;

var EVENTS = exports.EVENTS = {
	loaded: ++evtId,
	init: ++evtId,
	tick: ++evtId,
	misc: {
		toolsRendered: ++evtId,
		toolsInitialized: ++evtId,
		logoMakeRoom: ++evtId,
		worldInitialized: ++evtId,
		windowAdded: ++evtId,
		captchaToken: ++evtId,
		loadingCaptcha: ++evtId
	},
	renderer: {
		addChunk: ++evtId,
		rmChunk: ++evtId,
		updateChunk: ++evtId
	},
	camera: {
		moved: ++evtId,
		zoom: ++evtId /* (zoom value), note that this event should not be used to SET zoom level. */
	},
	net: {
		connecting: ++evtId,
		connected: ++evtId,
		disconnected: ++evtId,
		playerCount: ++evtId,
		chat: ++evtId,
		devChat: ++evtId,
		world: {
			leave: ++evtId,
			join: ++evtId, /* (worldName string) */
			joining: ++evtId, /* (worldName string) */
			setId: ++evtId,
			playersMoved: ++evtId, /* (Object with all the updated player values) */
			playersLeft: ++evtId,
			tilesUpdated: ++evtId,
			teleported: ++evtId
		},
		chunk: {
			load: ++evtId, /* (Chunk class) */
			unload: ++evtId, /* (x, y) */
			set: ++evtId, /* (x, y, data), backwards compat */
			lock: ++evtId,
			allLoaded: ++evtId
		},
		sec: {
			rank: ++evtId
		},
		maxCount: ++evtId
	}
};

/*export const PUBLIC_EVENTS = {
	loaded: EVENTS.loaded,
	init: EVENTS.init,
	tick: EVENTS.tick,
	toolsInitialized: EVENTS.misc.toolsInitialized,
	allChunksLoaded: EVENTS.net.chunk.allLoaded
};*/

_global.PublicAPI.events = EVENTS;

var userOptions = {};
if ((0, _misc.storageEnabled)()) {
	try {
		userOptions = JSON.parse(localStorage.getItem('owopOptions') || '{}');
	} catch (e) {
		console.error('Error while parsing user options!', e);
	}
}

var shouldFool = function (d) {
	return d.getMonth() == 3 && d.getDate() == 1;
}(new Date());

var options = exports.options = (0, _misc.propertyDefaults)(userOptions, {
	serverAddress: [{
		default: true,
		title: 'Official server',
		proto: 'old',
		url: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}${window.location.pathname}` // "wss://ywop.scar17off.repl.co/"
	}],
	fallbackFps: 30,
	maxChatBuffer: 256,
	tickSpeed: 30,
	minGridZoom: 1,
	movementSpeed: 1,
	defaultWorld: shouldFool ? "aprilfools" : location.href.split('/').reverse()[0].replace('/', '').replace('#', '').replace('?', '') || "main",
	enableSounds: true,
	enableIdView: true,
	defaultZoom: 16,
	zoomStrength: 1,
	zoomLimitMin: 1,
	zoomLimitMax: 32,
	unloadDistance: 10,
	toolSetUrl: _toolset2.default,
	unloadedPatternUrl: _unloaded2.default,
	noUi: false,
	fool: shouldFool,
	backgroundUrl: null,
	chunkBugWorkaround: false,
	hexCoords: false,
	showPlaceBucket: true
});

if (options.chunkBugWorkaround) {
	console.debug('Chunk bug workaround enabled!');
}

_global.PublicAPI.options = options;

_global.eventSys.on(EVENTS.net.connecting, function (server) {
	exports.protocol = protocol = server.proto;
});

/***/ }),

/***/ "./src/js/context.js":
/*!***************************!*\
  !*** ./src/js/context.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createContextMenu = createContextMenu;
var shown = false;
var contextMenu = document.createElement("div");
contextMenu.className = "context-menu";

function removeMenu(event) {
	document.body.removeChild(contextMenu);
	document.removeEventListener("click", removeMenu);
	shown = false;
}

function createContextMenu(x, y, buttons) {
	if (shown) {
		removeMenu();
	}

	contextMenu.innerHTML = "";
	for (var i = 0; i < buttons.length; i++) {
		var button = document.createElement("button");
		button.textContent = buttons[i][0];
		button.addEventListener("click", buttons[i][1]);
		contextMenu.appendChild(button);
	}
	document.body.appendChild(contextMenu);
	shown = true;
	var height = contextMenu.offsetHeight;
	if (y + height > window.innerHeight - 20) {
		contextMenu.style.top = y - height + "px";
	} else {
		contextMenu.style.top = y + "px";
	}
	contextMenu.style.left = x + "px";

	document.addEventListener("click", removeMenu);
}

/***/ }),

/***/ "./src/js/global.js":
/*!**************************!*\
  !*** ./src/js/global.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventSys = exports.PublicAPI = undefined;

var _events = __webpack_require__(/*! events */ "./node_modules/events/events.js");

var PublicAPI = exports.PublicAPI = window.OWOP = window.WorldOfPixels = {spawnbanner: true};
var eventSys = exports.eventSys = new _events.EventEmitter();

/***/ }),

/***/ "./src/js/local_player.js":
/*!********************************!*\
  !*** ./src/js/local_player.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.player = exports.networkRankVerification = exports.undoHistory = exports.updateClientFx = undefined;
exports.shouldUpdate = shouldUpdate;
exports.getDefaultTool = getDefaultTool;

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _color = __webpack_require__(/*! ./util/color.js */ "./src/js/util/color.js");

var _canvas_renderer = __webpack_require__(/*! ./canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _tool_renderer = __webpack_require__(/*! ./tool_renderer.js */ "./src/js/tool_renderer.js");

var _tools = __webpack_require__(/*! ./tools.js */ "./src/js/tools.js");

var _Fx = __webpack_require__(/*! ./Fx.js */ "./src/js/Fx.js");

var _networking = __webpack_require__(/*! ./networking.js */ "./src/js/networking.js");

var _Bucket = __webpack_require__(/*! ./util/Bucket.js */ "./src/js/util/Bucket.js");

exports.updateClientFx = updateClientFx;


var toolSelected = null;
var palette = [[57,205,121,255],
	[30,143,115,255],
	[43,87,88,255],
	[22,38,53,255],
	[30,144,85,255],
	[66,204,57,255],
	[174,254,93,255],
	[251,212,57,255],
	[229,112,68,255],
	[172,57,64,255],
	[104,37,70,255],
	[57,17,54,255],
	[43,11,32,255],
	[74,25,44,255],
	[154,74,75,255],
	[222,142,117,255],
	[255,210,168,255],
	[156,196,196,255],
	[96,126,137,255],
	[68,77,92,255],
	[36,36,46,255],
	[85,77,75,255],
	[139,127,115,255],
	[254,255,239,255],
	[255,151,191,255],
	[216,86,184,255],
	[151,44,158,255],
	[81,29,112,255],
	[39,23,62,255],
	[15,19,28,255],
	[33,27,73,255],
	[40,52,134,255],
	[51,99,175,255],
	[82,164,220,255],
	[144,241,248,255]
];
	
var paletteIndex = 0;

var undoHistory = exports.undoHistory = [];

var clientFx = new _Fx.Fx(_Fx.PLAYERFX.NONE, {
	isLocalPlayer: true,
	player: {
		get tileX() {
			return _main.mouse.tileX;
		},
		get tileY() {
			return _main.mouse.tileY;
		},
		get x() {
			return _main.mouse.worldX;
		},
		get y() {
			return _main.mouse.worldY;
		},
		get htmlRgb() {
			return player.htmlRgb;
		},
		get tool() {
			return player.tool;
		}
	}
});

clientFx.setVisibleFunc(function () {
	return _main.mouse.insideViewport && _main.mouse.validTile;
});

// exported variables are always const it seems
var networkRankVerification = exports.networkRankVerification = [_conf.RANK.NONE];
var rank = _conf.RANK.NONE;
var somethingChanged = false;

var cachedHtmlRgb = [null, ""];

var player = exports.player = {
	get paletteIndex() {
		return paletteIndex;
	},
	set paletteIndex(i) {
		paletteIndex = (0, _misc.absMod)(i, palette.length);
		updatePalette();
	},
	get htmlRgb() {
		var selClr = player.selectedColor;
		if (cachedHtmlRgb[0] === selClr) {
			return cachedHtmlRgb[1];
		} else {
			var str = _color.colorUtils.toHTML(_color.colorUtils.u24_888(selClr[0], selClr[1], selClr[2]));
			cachedHtmlRgb[0] = selClr;
			cachedHtmlRgb[1] = str;
			return str;
		}
	},
	get selectedColor() {
		return palette[paletteIndex];
	},
	set selectedColor(c) {
		addPaletteColor(c);
	},
	get palette() {
		return palette;
	},
	get rank() {
		return rank;
	},
	get tool() {
		return toolSelected;
	},
	set tool(name) {
		selectTool(name);
	},
	/* TODO: Clear confusion between netid and tool id */
	get toolId() {
		return _networking.net.currentServer.proto.tools.id[toolSelected.id];
	},
	get tools() {
		return _tools.tools;
	},
	get id() {
		return _networking.net.protocol.id;
	}
};

_global.PublicAPI.player = player;

function shouldUpdate() {
	/* sets colorChanged to false when called */
	return somethingChanged ? !(somethingChanged = false) : somethingChanged;
}

function changedColor() {
	updateClientFx();
	updatePaletteIndex();
	somethingChanged = true;
}

function updatePalette() {
	var paletteColors = _main.elements.paletteColors;
	paletteColors.innerHTML = "";
	var colorClick = function colorClick(index) {
		return function () {
			paletteIndex = index;
			changedColor();
		};
	};
	var colorDelete = function colorDelete(index) {
		return function () {
			if (palette.length > 1) {
				palette.splice(index, 1);
				if (paletteIndex > index || paletteIndex === palette.length) {
					--paletteIndex;
				}
				updatePalette();
				changedColor();
			}
		};
	};

	for (var i = 0; i < palette.length; i++) {
		var element = document.createElement("div");
		var clr = palette[i];
		element.style.backgroundColor = "rgb(" + clr[0] + "," + clr[1] + "," + clr[2] + ")";
		(0, _misc.setTooltip)(element, _color.colorUtils.toHTML(_color.colorUtils.u24_888(clr[0], clr[1], clr[2])));
		element.onmouseup = function (e) {
			switch (e.button) {
				case 0:
					this.sel();
					break;
				case 2:
					this.del();
					break;
			}
			return false;
		}.bind({
			sel: colorClick(i),
			del: colorDelete(i)
		});
		element.oncontextmenu = function () {
			return false;
		};
		paletteColors.appendChild(element);
	}
	changedColor();
}

function updatePaletteIndex() {
	_main.elements.paletteColors.style.transform = "translateY(" + -paletteIndex * 40 + "px)";
}

function addPaletteColor(color) {
	for (var i = 0; i < palette.length; i++) {
		if (palette[i][0] === color[0] && palette[i][1] === color[1] && palette[i][2] === color[2]) {
			paletteIndex = i;
			changedColor();
			return;
		}
	}
	paletteIndex = palette.length;
	palette.push(color);
	updatePalette();
}

function getDefaultTool() {
	for (var toolName in _tools.tools) {
		if (_tools.tools[toolName].rankRequired <= player.rank) {
			return toolName;
		}
	}
	return null;
}

function selectTool(name) {
	var tool = _tools.tools[name];
	if (!tool || tool === toolSelected || tool.rankRequired > player.rank) {
		return false;
	}
	if (toolSelected) {
		toolSelected.call('deselect');
	}
	toolSelected = tool;
	_main.mouse.cancelMouseDown();
	tool.call('select');
	(0, _tools.updateToolWindow)(name);
	_main.mouse.validClick = false;
	clientFx.setRenderer(tool.fxRenderer);
	somethingChanged = true;
	updateClientFx();
	return true;
}

function updateClientFx() {
	_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
}

_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, function () {
	player.tool = getDefaultTool();
});

_global.eventSys.on(_conf.EVENTS.net.sec.rank, function (newRank) {
	if (networkRankVerification[0] < newRank) {
		return;
	}
	if(OWOP.windowSys.windows['Brush diameter']) {
	   	if(newRank < 2) OWOP.windowSys.windows['Brush diameter'].frame.hidden = true;
	   	else OWOP.windowSys.windows['Brush diameter'].frame.hidden = false;
  	};
	rank = newRank;
	console.log('Got rank:', newRank);
	/* This is why we can't have nice things */
	if (_networking.net.isConnected()) {
		_networking.net.protocol.ws.send(new Uint8Array([newRank]).buffer);
	}
	switch (newRank) {
		case _conf.RANK.USER:
		case _conf.RANK.NONE:
			(0, _main.showDevChat)(false);
			(0, _main.showPlayerList)(false);
			(0, _main.revealSecrets)(false);
			break;

		case _conf.RANK.MODERATOR:
		case _conf.RANK.ADMIN:
			(0, _main.showDevChat)(true);
			(0, _main.showPlayerList)(true);
			(0, _main.revealSecrets)(true);
			break;
	}
	(0, _tools.updateToolbar)();
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	_main.elements.paletteInput.onclick = function () {
		var c = player.selectedColor;
		this.value = _color.colorUtils.toHTML(_color.colorUtils.u24_888(c[0], c[1], c[2]));;
	};
	_main.elements.paletteInput.onchange = function () {
		var value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.value);
		addPaletteColor([parseInt(value[1], 16), parseInt(value[2], 16), parseInt(value[3], 16)]);
	};
	_main.elements.paletteCreate.onclick = function () {
		return _main.elements.paletteInput.click();
	};
	(0, _misc.setTooltip)(_main.elements.paletteCreate, "Add color");
	updatePalette();
});

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * TODO List: 
 * NOTE: Let's stick with the correct way of storing colors,
 * first byte should be red value: 0xAABBGGRR, or [r, g, b]
 */


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.playerListWindow = exports.playerListTable = exports.playerList = exports.sounds = exports.misc = exports.elements = exports.mouse = exports.keysDown = exports.statusMsg = exports.showPlayerList = exports.showDevChat = undefined;
exports.revealSecrets = revealSecrets;

var _normalizeWheel = __webpack_require__(/*! ./util/normalizeWheel.js */ "./src/js/util/normalizeWheel.js");

var _anchorme = __webpack_require__(/*! ./util/anchorme.js */ "./src/js/util/anchorme.js");

var _anchorme2 = _interopRequireDefault(_anchorme);

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _Bucket = __webpack_require__(/*! ./util/Bucket.js */ "./src/js/util/Bucket.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _World = __webpack_require__(/*! ./World.js */ "./src/js/World.js");

var _canvas_renderer = __webpack_require__(/*! ./canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _networking = __webpack_require__(/*! ./networking.js */ "./src/js/networking.js");

var _local_player = __webpack_require__(/*! ./local_player.js */ "./src/js/local_player.js");

var _all = __webpack_require__(/*! ./protocol/all.js */ "./src/js/protocol/all.js");

var _windowsys = __webpack_require__(/*! ./windowsys.js */ "./src/js/windowsys.js");

var _context = __webpack_require__(/*! ./context.js */ "./src/js/context.js");

var _launch = __webpack_require__(/*! ../audio/launch.mp3 */ "./src/audio/launch.mp3");

var _launch2 = _interopRequireDefault(_launch);

var _place = __webpack_require__(/*! ../audio/place.mp3 */ "./src/audio/place.mp3");

var _place2 = _interopRequireDefault(_place);

var _click = __webpack_require__(/*! ../audio/click.mp3 */ "./src/audio/click.mp3");

var _click2 = _interopRequireDefault(_click);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showDevChat = showDevChat;
exports.showPlayerList = showPlayerList;
exports.statusMsg = statusMsg;
var keysDown = exports.keysDown = {};

var mouse = exports.mouse = {
	x: 0, /* pageX */
	y: 0, /* pageY */
	lastX: 0,
	lastY: 0,
	get worldX() {
		return _canvas_renderer.camera.x * 16 + this.x / (_canvas_renderer.camera.zoom / 16);
	},
	get worldY() {
		return _canvas_renderer.camera.y * 16 + this.y / (_canvas_renderer.camera.zoom / 16);
	},
	mouseDownWorldX: 0,
	mouseDownWorldY: 0,
	get tileX() {
		return Math.floor(this.worldX / 16);
	},
	get tileY() {
		return Math.floor(this.worldY / 16);
	},
	buttons: 0,
	validTile: false,
	insideViewport: false,
	touches: [],
	cancelMouseDown: function cancelMouseDown() {
		this.buttons = 0;
	}
};

var elements = exports.elements = {
	viewport: null,
	xyDisplay: null,
	chatInput: null,
	chat: null,
	devChat: null,
	bucketDisplay: null
};

elements.bucketDisplay = document.getElementById("bucket-display");

var misc = exports.misc = {
	localStorage: (0, _misc.storageEnabled)() && window.localStorage,
	_world: null,
	lastXYDisplay: [-1, -1],
	devRecvReader: function devRecvReader(msg) {},
	chatPostFormatRecvModifier: function chatPostFormatRecvModifier(msg) {
		return msg;
	},
	chatRecvModifier: function chatRecvModifier(msg) {
		// highlight localplayer/mention messages
		if((msg.split(':')[0].includes(_local_player.player.id) || msg.split(':')[0].includes(localStorage.nick)) && localStorage.highlightmessages || _conf.options.highlightmessages) { 
        	setTimeout(() => elements.chat.childNodes[1].lastChild.style.backgroundColor = 'rgba(230, 0, 0, 0.4)');
		};
		return msg;
	},
	chatSendModifier: function chatSendModifier(msg) {
		// convert /m to /tell
		msg = msg.split(' ');
    	if(msg[0] == '/m') msg[0] = '/tell';
    	msg = msg.join(' ');
		return msg;
	},
	exceptionTimeout: null,
	worldPasswords: {},
	tick: 0,
	urlWorldName: null,
	connecting: false,
	tickInterval: null,
	lastMessage: null,
	lastCleanup: 0,
	set world(value) {
		/* The reason this is done is because the old functions may reference the old world object */
		_global.PublicAPI.world = getNewWorldApi();
		return this._world = value;
	},
	get world() {
		return this._world;
	},
	guiShown: false,
	cookiesEnabled: (0, _misc.cookiesEnabled)(),
	storageEnabled: (0, _misc.storageEnabled)(),
	showEUCookieNag: !_conf.options.noUi && (0, _misc.cookiesEnabled)() && (0, _misc.getCookie)("nagAccepted") !== "true",
	usingFirefox: navigator.userAgent.indexOf("Firefox") !== -1
};

var sounds = exports.sounds = {
	play: function play(sound) {
		sound.currentTime = 0;
		if (_conf.options.enableSounds) {
			sound.play();
		}
	}
};
sounds.launch = new Audio();
sounds.launch.src = _launch2.default;
sounds.place = new Audio();
sounds.place.src = _place2.default;
sounds.click = new Audio();
sounds.click.src = _click2.default;

var playerList = exports.playerList = {};
var playerListTable = exports.playerListTable = document.createElement("table");
var playerListWindow = exports.playerListWindow = new _windowsys.GUIWindow('Players', { closeable: true }, function (wdow) {
	var tableHeader = document.createElement("tr");
	tableHeader.innerHTML = "<th>Id</th><th>X</th><th>Y</th><th>Color</th><th>Tool</th>";
	playerListTable.appendChild(tableHeader);
	wdow.container.appendChild(playerListTable);
	wdow.container.id = "player-list";
}).move(window.innerWidth - 240, 32);

function getNewWorldApi() {
	var obj = {
		get name() {
			return misc.world.name;
		}
	};
	var defProp = function defProp(prop) {
		Object.defineProperty(obj, prop, {
			get: function get() {
				return misc.world && this['_' + prop] || (this['_' + prop] = misc.world[prop].bind(misc.world));
			}
		});
	};

	defProp('getPixel');
	defProp('setPixel');
	defProp('undo');
	defProp('unloadFarChunks');
	return obj;
}

function receiveMessage(text) {
	console.log(text);
	text = misc.chatRecvModifier(text);
	if (!text) {
		return;
	}

	var addContext = function addContext(elem, nickname, id) {
		elem.addEventListener("click", function (event) {
			(0, _context.createContextMenu)(event.clientX, event.clientY, [["Mute " + nickname, function () {
				_global.PublicAPI.muted.push(id);
				receiveMessage("<span style=\"color: #ffa71f\">Muted " + id + "</span>");
			}]]);
			event.stopPropagation();
		});
	};

	var message = document.createElement("li");
	var realText = text;
	var isAdmin = false;
	if (text.startsWith("[D]")) {
		message.className = "discord";
		var nick = document.createElement("span");
		nick.className = "nick";
		var nickname = text.split(": ")[0] + ": ";
		nick.innerHTML = (0, _misc.escapeHTML)(nickname);
		message.appendChild(nick);
		text = text.slice(nickname.length);
	} else if (text.startsWith("[Server]") || text.startsWith("Server:") || text.startsWith("Nickname set to") || text.startsWith("User: ")) {
		message.className = "server";
	} else if (text.split(" ")[1] == "->" && text.startsWith("[")) { // tell
		var cuttxt = text.split(" ").slice(3).join(" ");
		var id = parseInt(text.split(" ")[0].replace("[", ''));
		if(text.split(" ")[2].includes("me")) {
			if(_global.PublicAPI.muted.includes(id)) {
				return;
			};

			var nick = document.createElement("span");
			nick.className = "tell";
			nick.innerHTML = (0, _misc.escapeHTML)(text.replace(cuttxt, ''));
			addContext(nick, id, id);
			message.appendChild(nick);
			text = text.split(" ").slice(3).join(" ");
		} else {
			message.className = "tell";
		}
	} else if (text.startsWith("(M)")) {
		message.className = "moderator";
	} else if (isNaN(text.split(": ")[0]) && text.split(": ")[0].charAt(0) != "[") {
		message.className = "admin";
		isAdmin = true;
	} else {
		var nick = document.createElement("span");
		nick.className = "nick";
		var nickname = text.split(": ")[0];
		var id = nickname.startsWith("[") ? nickname.split(" ")[0].slice(1, -1) : nickname;
		id = parseInt(id);
		if (_global.PublicAPI.muted.includes(id)) {
			return;
		}
		nick.innerHTML = (0, _misc.escapeHTML)(nickname + ": ");
		nick.addEventListener("click", function (event) {
			(0, _context.createContextMenu)(event.clientX, event.clientY, [["Mute " + nickname, function () {
				_global.PublicAPI.muted.push(id);
				receiveMessage("<span style=\"color: #ffa71f\">Muted " + id + "</span>");
			}]]);
			event.stopPropagation();
		});
		message.appendChild(nick);
		text = text.slice(nickname.length + 2);
	}
	var idIndex = text.indexOf(': '); /* This shouldn't be like this, change on proto switch */
	if (idIndex !== -1) {
		var ntext = text.substr(0, idIndex);
		realText = ntext.replace(/\d+/g, '') + text.slice(idIndex + 2);
	}

	if (misc.lastMessage && misc.lastMessage.text === realText) {
		misc.lastMessage.incCount();
	} else {
		var span = document.createElement("span");
		misc.lastMessage = {
			get text() {
				return realText;
			},
			incCount: function incCount() {
				var times = span.recvTimes || 1;
				span.innerHTML = (0, _anchorme2.default)(text, {
					attributes: [{
						name: "target",
						value: "blank"
					}]
				}) + ' x' + ++times;
				span.recvTimes = times;
				message.style.animation = 'none'; /* Reset fading anim */
				message.offsetHeight; /* Reflow */
				message.style.animation = null;
			}
		};
		if (!isAdmin) {
			text = (0, _misc.escapeHTML)(text).replace(/\&\#x2F;/g, "/");
		}
		text = text.replace(/(?:&lt;|<):(.+?):([0-9]+)(?:&gt;|>)/g, '<img class="emote" title="$1" src="https://cdn.discordapp.com/emojis/$2.png?v=1">');
		text = misc.chatPostFormatRecvModifier(text);
		span.innerHTML = (0, _anchorme2.default)(text, {
			attributes: [{
				name: "target",
				value: "blank"
			}]
		});
		message.appendChild(span);
		scrollChatToBottom(function () {
			elements.chatMessages.appendChild(message);
			var childs = elements.chatMessages.children;
			if (childs.length > _conf.options.maxChatBuffer) {
				childs[0].remove();
			}
		}, true);
	}
}

function receiveDevMessage(text) {
	try {
		misc.devRecvReader(text);
	} catch (e) {}
	var message = document.createElement("li");
	var span = document.createElement("span");
	span.innerHTML = text;
	message.appendChild(span);
	elements.devChatMessages.appendChild(message);
	elements.devChatMessages.scrollTop = elements.devChatMessages.scrollHeight;
}

function scrollChatToBottom(callback) {
	var dontScrollIfNotTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var shouldScroll = !dontScrollIfNotTop || elements.chatMessages.scrollHeight - elements.chatMessages.scrollTop === elements.chatMessages.clientHeight;
	if (callback) callback(); // add all elements here
	if (shouldScroll) elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function clearChat() {
	elements.chatMessages.innerHTML = "";
	elements.devChatMessages.innerHTML = "";
}
window.loaded = false;
window.addEventListener("load", function() {
   	window.loaded = true;
}, false);

function tick() {
	var tickNum = ++misc.tick;
	var speed = Math.max(Math.min(_conf.options.movementSpeed, 64), 0);
	var offX = 0;
	var offY = 0;
	if (keysDown[38]) {
		// Up
		offY -= speed;
	}
	if (keysDown[37]) {
		// Left
		offX -= speed;
	}
	if (keysDown[40]) {
		// Down
		offY += speed;
	}
	if (keysDown[39]) {
		// Right
		offX += speed;
	}
	if (offX !== 0 || offY !== 0) {
		(0, _canvas_renderer.moveCameraBy)(offX, offY);
		updateMouse(null, 'mousemove', mouse.x, mouse.y);
	}

	_global.eventSys.emit(_conf.EVENTS.tick, tickNum);
	if (_local_player.player.tool !== null && misc.world !== null) {
		_local_player.player.tool.call('tick', mouse);
	}
}

function updateMouse(event, eventName, mouseX, mouseY) {
	mouse.x = mouseX;
	mouse.y = mouseY;
	var cancelled = 0;
	if (misc.world !== null) {
		mouse.validTile = misc.world.validMousePos(mouse.tileX, mouse.tileY);
		if (_local_player.player.tool !== null) {
			cancelled = _local_player.player.tool.call(eventName, [mouse, event]);
		}
		if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
			(0, _local_player.updateClientFx)();
		}
	}
	return cancelled;
}

function openChat() {
	elements.chat.className = "active selectable";
	elements.devChat.className = "active selectable";
	elements.chatMessages.className = "active";
	scrollChatToBottom();
}

function closeChat() {
	elements.chat.className = "";
	elements.devChat.className = "";
	elements.chatMessages.className = "";
	elements.chatInput.blur();
	scrollChatToBottom();
}

function showDevChat(bool) {
	elements.devChat.style.display = bool ? "" : "none";
}

function revealSecrets(bool) {
	if (bool) {
		_global.PublicAPI.net = _networking.net;
	} else {
		delete _global.PublicAPI.net;
	}
}

function showPlayerList(bool) {
	if (bool) {
		_windowsys.windowSys.addWindow(playerListWindow);
	} else {
		_windowsys.windowSys.delWindow(playerListWindow);
	}
}

function updateXYDisplay(x, y) {
	if (misc.lastXYDisplay[0] !== x || misc.lastXYDisplay[1] !== y) {
		misc.lastXYDisplay = [x, y];
		if (!_conf.options.hexCoords) {
			elements.xyDisplay.innerHTML = "X: " + x + ", Y: " + y;
		} else {
			elements.xyDisplay.innerHTML = "X: 0x" + x.toString(16) + ", Y: 0x" + y.toString(16);
		}
		return true;
	}
	return false;
}

function updatePlayerCount() {
	var text = ' cursor' + (misc.playerCount !== 1 ? 's online' : ' online');
	var countStr = '' + misc.playerCount;
	if (misc.world && 'maxCount' in misc.world) {
		countStr += '/' + misc.world.maxCount;
	}

	var final = countStr + text;
	elements.playerCountDisplay.innerHTML = final;

	var title = 'World of Pixels';
	if (misc.world) {
		title = '(' + countStr + '/' + misc.world.name + ') ' + title;
	}

	document.title = title;
}

function logoMakeRoom(bool) {
	elements.loadUl.style.transform = bool ? "translateY(-75%) scale(0.5)" : "";
}

function showWorldUI(bool) {
	misc.guiShown = bool;
	elements.xyDisplay.style.transform = bool ? "initial" : "";
	elements.bucketDisplay.style.transform = bool ? "initial" : "";
	elements.playerCountDisplay.style.transform = bool ? "initial" : "";
	elements.palette.style.transform = bool ? "translateY(-50%)" : "";
	elements.chat.style.transform = bool ? "initial" : "";
	elements.chatInput.disabled = !bool;
	elements.chatInput.style.display = "initial";
	elements.paletteBg.style.visibility = bool ? "" : "hidden";
	elements.hubButton.style.visibility = bool ? "" : "hidden";
}

function showLoadScr(bool, showOptions) {
	elements.loadOptions.className = showOptions ? "framed" : "hide";
	if (!bool) {
		elements.loadScr.style.transform = "translateY(-110%)"; /* +10% for shadow */
		(0, _misc.eventOnce)(elements.loadScr, "transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd", function () {
			if (_networking.net.isConnected()) {
				elements.loadScr.className = "hide";
			}
		});
	} else {
		elements.loadScr.className = "";
		elements.loadScr.style.transform = "";
	}
}

function statusMsg(showSpinner, message) {
	var statusShown = elements.status.isConnected;
	if (message === null) {
		elements.status.style.display = "none";
		return;
	} else {
		elements.status.style.display = "";
	}
	elements.statusMsg.innerHTML = message;
	elements.spinner.style.display = showSpinner ? "" : "none";
}

function inGameDisconnected() {
	showWorldUI(false);
	showLoadScr(true, true);
	statusMsg(false, "Lost connection with the server.");
	misc.world = null;
	elements.chat.style.transform = "initial";
	elements.chatInput.style.display = "";
}

function retryingConnect(serverGetter, worldName) {
	if (misc.connecting && !_networking.net.isConnected()) {
		/* We're already connected/trying to connect */
		return;
	}
	misc.connecting = true;
	var currentServer = serverGetter(false);
	var tryConnect = function tryConnect(tryN) {
		if (tryN >= (currentServer.maxRetries || 3)) {
			var ncs = serverGetter(true);
			if (ncs != currentServer) {
				currentServer = ncs;
				tryN = 0;
			}
		}
		_global.eventSys.once(_conf.EVENTS.net.connecting, function () {
			console.debug('Trying \'' + currentServer.title + '\'...');
			statusMsg(true, 'Connecting to \'' + currentServer.title + '\'...');
			showLoadScr(true, false);
		});
		_networking.net.connect(currentServer, worldName);
		var disconnected = function disconnected() {
			++tryN;
			statusMsg(true, 'Couldn\'t connect to server, retrying... (' + tryN + ')');
			setTimeout(tryConnect, Math.min(tryN * 2000, 10000), tryN);
			_global.eventSys.removeListener(_conf.EVENTS.net.connected, connected);
		};
		var connected = function connected() {
			statusMsg(false, "Connected!");
			_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, disconnected);
			_global.eventSys.once(_conf.EVENTS.net.disconnected, inGameDisconnected);
			misc.connecting = false;
		};

		_global.eventSys.once(_conf.EVENTS.net.connected, connected);
		_global.eventSys.once(_conf.EVENTS.net.disconnected, disconnected);
	};
	tryConnect(0);
}

function saveWorldPasswords() {
	if (misc.storageEnabled) {
		misc.localStorage.worldPasswords = JSON.stringify(misc.worldPasswords);
	}
}

function checkFunctionality(callback) {
	/* Multi Browser Support */
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (f) {
		setTimeout(f, 1000 / _conf.options.fallbackFps);
	};

	Number.isInteger = Number.isInteger || function (n) {
		return Math.floor(n) === n && Math.abs(n) !== Infinity;
	};
	Math.trunc = Math.trunc || function (n) {
		return n | 0;
	};

	var toBlob = HTMLCanvasElement.prototype.toBlob = HTMLCanvasElement.prototype.toBlob || HTMLCanvasElement.prototype.msToBlob;

	if (!toBlob) {
		/* Load toBlob polyfill */
		(0, _misc.loadScript)(__webpack_require__(/*! ./polyfill/canvas-toBlob.js */ "./src/js/polyfill/canvas-toBlob.js"), callback);
	} else {
		callback();
	}
}

function init() {
	var viewport = elements.viewport;
	var chatinput = elements.chatInput;

	if (misc.storageEnabled && misc.localStorage.worldPasswords) {
		try {
			misc.worldPasswords = JSON.parse(misc.localStorage.worldPasswords);
		} catch (e) {}
	}

	misc.lastCleanup = 0;

	viewport.oncontextmenu = function () {
		return false;
	};

	viewport.addEventListener("mouseenter", function () {
		mouse.insideViewport = true;
		(0, _local_player.updateClientFx)();
	});
	viewport.addEventListener("mouseleave", function () {
		mouse.insideViewport = false;
		(0, _local_player.updateClientFx)();
	});

	var chatHistory = [];
	var historyIndex = 0;
	chatinput.addEventListener("keydown", function (event) {
		event.stopPropagation();
		var keyCode = event.which || event.keyCode;
		if (historyIndex === 0 || keyCode == 13 && !event.shiftKey) {
			chatHistory[0] = chatinput.value;
		}
		switch (keyCode) {
			case 27:
				closeChat();
				break;
			case 13:
				if (!event.shiftKey) {
					event.preventDefault();
					var text = chatinput.value;
					historyIndex = 0;
					chatHistory.unshift(text);
					if (misc.storageEnabled) {
						if (text.startsWith("/adminlogin ")) {
							misc.localStorage.adminlogin = text.slice(12);
						} else if(text.startsWith("/color ")) {
                            misc.localStorage.color = text.slice(7);
                        } else if (text.startsWith("/modlogin ")) {
							misc.localStorage.modlogin = text.slice(10);
						} else if (text.startsWith("/nick")) {
							var nick = text.slice(6);
							if (nick.length) {
								misc.localStorage.nick = nick;
							} else {
								delete misc.localStorage.nick;
							}
						} else if (text.startsWith("/pass ") && misc.world) {
							var pass = text.slice(6);
							misc.worldPasswords[_networking.net.protocol.worldName] = pass;
							saveWorldPasswords();
						}
					}
					if (!event.ctrlKey) {
						text = misc.chatSendModifier(text);
					}
					_networking.net.protocol.sendMessage(text);
					chatinput.value = '';
					chatinput.style.height = "16px";
					event.stopPropagation();
				}
				break;
			case 38:
				// Arrow up
				if (event.shiftKey && historyIndex < chatHistory.length - 1) {
					historyIndex++;
					chatinput.value = chatHistory[historyIndex];
					chatinput.style.height = 0;
					chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
			case 40:
				// Arrow Down
				if (event.shiftKey && historyIndex > 0) {
					historyIndex--;
					chatinput.value = chatHistory[historyIndex];
					chatinput.style.height = 0;
					chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
		}
	});
	chatinput.addEventListener("keyup", function (event) {
		event.stopPropagation();
		var keyCode = event.which || event.keyCode;
		if (keyCode == 13 && !event.shiftKey) {
			closeChat();
		}
	});
	chatinput.addEventListener("input", function (event) {
		chatinput.style.height = 0;
		chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
	});
	chatinput.addEventListener("focus", function (event) {
		if (!mouse.buttons) {
			openChat();
		} else {
			chatinput.blur();
		}
	});

	window.addEventListener("keydown", function (event) {
		var keyCode = event.which || event.keyCode;
		if (document.activeElement.tagName !== "INPUT" && misc.world !== null) {
			keysDown[keyCode] = true;
			var tool = _local_player.player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keydown')) {
				if (tool.call('keydown', [keysDown, event])) {
					return false;
				}
			}
			switch (keyCode) {
				case 90:
					/* Ctrl + Z */
					if (!event.ctrlKey || !misc.world) {
						break;
					}
					misc.world.undo(event.shiftKey);
					event.preventDefault();
					break;
				case 71:
					/* G */
					_canvas_renderer.renderer.showGrid(!_canvas_renderer.renderer.gridShown);
					break;

				case 112:
					/* F1 */
					showWorldUI(!misc.guiShown);
					event.preventDefault();
					break;

				case 107:
				case 187:
					++_canvas_renderer.camera.zoom;
					break;

				case 109:
				case 189:
					--_canvas_renderer.camera.zoom;
					break;

				default:
					return true;
					break;
			}
			return false;
		}
	});
	window.addEventListener("keyup", function (event) {
		var keyCode = event.which || event.keyCode;
		delete keysDown[keyCode];
		if (document.activeElement.tagName !== "INPUT") {
			var tool = _local_player.player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keyup')) {
				if (tool.call('keyup', [keysDown, event])) {
					return false;
				};
			};
			if (keyCode == 13) {
				elements.chatInput.focus();
			};
        };
	});
	viewport.addEventListener("mousedown", function (event) {
		closeChat();
		mouse.lastX = mouse.x;
		mouse.lastY = mouse.y;
		mouse.x = event.pageX;
		mouse.y = event.pageY;
		mouse.mouseDownWorldX = mouse.worldX;
		mouse.mouseDownWorldY = mouse.worldY;
		if ('buttons' in event) {
			mouse.buttons = event.buttons;
		} else {
			var realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons |= 1 << realBtn;
		}

		var tool = _local_player.player.tool;
		if (tool !== null && misc.world !== null) {
			_local_player.player.tool.call('mousedown', [mouse, event]);
		}
	});

	window.addEventListener("mouseup", function (event) {
		/* Old versions of firefox have the buttons property as the
   * buttons released, instead of the currently pressed buttons.
   **/
		if ('buttons' in event && !misc.usingFirefox) {
			mouse.buttons = event.buttons;
		} else {
			var realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons &= ~(1 << realBtn);
		}
		var tool = _local_player.player.tool;
		if (tool !== null && misc.world !== null) {
			_local_player.player.tool.call('mouseup', [mouse, event]);
		}
	});

	window.addEventListener("mousemove", function (event) {
		var cancelledButtons = updateMouse(event, 'mousemove', event.pageX, event.pageY);
		var remainingButtons = mouse.buttons & ~cancelledButtons;
		if (remainingButtons & 4) {
			/* If middle click was not used for anything */
			(0, _canvas_renderer.moveCameraBy)((mouse.mouseDownWorldX - mouse.worldX) / 16, (mouse.mouseDownWorldY - mouse.worldY) / 16);
		}
	});

	var mousewheel = function mousewheel(event) {
		var nevt = (0, _normalizeWheel.normalizeWheel)(event);
		if (_local_player.player.tool !== null && misc.world !== null && _local_player.player.tool.isEventDefined('scroll')) {
			if (_local_player.player.tool.call('scroll', [mouse, nevt, event])) {
				return;
			}
		}
		if (event.ctrlKey) {
			_canvas_renderer.camera.zoom += Math.max(-1, Math.min(1, -nevt.pixelY));
			//-nevt.spinY * camera.zoom / options.zoomLimitMax; // <- needs to be nicer
		} else {
			var delta = Math.max(-1, Math.min(1, nevt.spinY));
			var pIndex = _local_player.player.paletteIndex;
			if (delta > 0) {
				pIndex++;
			} else if (delta < 0) {
				pIndex--;
			}
			_local_player.player.paletteIndex = pIndex;
		}
	};

	var wheelEventName = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

	viewport.addEventListener(wheelEventName, mousewheel, { passive: true });
	viewport.addEventListener(wheelEventName, function (e) {
		e.preventDefault();
		return false;
	}, { passive: false });

	// Touch support
	var touchEventNoUpdate = function touchEventNoUpdate(evtName) {
		return function (event) {
			var tool = _local_player.player.tool;
			mouse.buttons = 0;
			if (tool !== null && misc.world !== null) {
				_local_player.player.tool.call(evtName, [mouse, event]);
			}
		};
	};
	viewport.addEventListener("touchstart", function (event) {
		var moved = event.changedTouches[0];
		mouse.buttons = 1;
		if (moved) {
			updateMouse(event, 'touchstart', moved.pageX, moved.pageY);
			mouse.mouseDownWorldX = mouse.worldX;
			mouse.mouseDownWorldY = mouse.worldY;
		}
	}, { passive: true });
	viewport.addEventListener("touchmove", function (event) {
		var moved = event.changedTouches[0];
		if (moved) {
			updateMouse(event, 'touchmove', moved.pageX, moved.pageY);
		}
	}, { passive: true });
	viewport.addEventListener("touchend", touchEventNoUpdate('touchend'), { passive: true });
	viewport.addEventListener("touchcancel", touchEventNoUpdate('touchcancel'), { passive: true });

	elements.soundToggle.addEventListener('change', function (e) {
		_conf.options.enableSounds = !elements.soundToggle.checked;
	});
	_conf.options.enableSounds = !elements.soundToggle.checked;

	elements.hexToggle.addEventListener('change', function (e) {
		_conf.options.hexCoords = elements.hexToggle.checked;
	});
	_conf.options.hexCoords = elements.hexToggle.checked;

	elements.highlightMessages.addEventListener('change', function (e) {
		_conf.options.highlightmessages = elements.highlightMessages.checked;
	});
	// Some cool custom css
	console.log("%c" + " _ _ _         _   _    _____ ___    _____ _         _     \n" + "| | | |___ ___| |_| |  |     |  _|  |  _  |_|_ _ ___| |___ \n" + "| | | | . |  _| | . |  |  |  |  _|  |   __| |_'_| -_| |_ -|\n" + "|_____|___|_| |_|___|  |_____|_|    |__|  |_|_,_|___|_|___|", "font-size: 15px; font-weight: bold;");
	console.log("%cWelcome to the developer console!", "font-size: 20px; font-weight: bold; color: #F0F;");

	//windowSys.addWindow(new OWOPDropDown());
	(0, _all.resolveProtocols)();

	/* Calls other initialization functions */
	_global.eventSys.emit(_conf.EVENTS.init);

	updateXYDisplay(0, 0);
	var netlify = window.location.href.includes("netlify.com");
	if (netlify) {
		window.onhashchange = function () {
			window.location.reload(false);
		};
	}

	var worldName = netlify ? window.location.hash : decodeURIComponent(window.location.pathname);
	if (worldName[0] === '/' || worldName[0] === '#') {
		worldName = worldName.slice(1);
	}

	misc.urlWorldName = worldName;
}

function connect() {
	var serverGetter = function (serverList) {
		var defaults = [];
		var availableServers = [];
		for (var i = 0; i < serverList.length; i++) {
			if (serverList[i].default) {
				defaults.push(serverList[i]);
			}
			availableServers.push(serverList[i]);
		}
		var index = 0;
		return function (next) {
			if (next) {
				if (defaults.length) {
					defaults.shift();
				} else {
					++index;
				}
			}
			if (defaults.length) {
				var sv = defaults[0];
				availableServers.push(sv);
				return sv;
			}
			return availableServers[index % availableServers.length];
		};
	}(_conf.options.serverAddress);

	retryingConnect(serverGetter, misc.urlWorldName);

	elements.reconnectBtn.onclick = function () {
		return retryingConnect(serverGetter, misc.urlWorldName);
	};

	misc.tickInterval = setInterval(tick, 1000 / _conf.options.tickSpeed);
	//delete window.localStorage;
}

_global.eventSys.once(_conf.EVENTS.loaded, function () {
	return statusMsg(true, "Initializing...");
});
_global.eventSys.once(_conf.EVENTS.misc.loadingCaptcha, function () {
	return statusMsg(true, "Trying to load captcha...");
});
_global.eventSys.once(_conf.EVENTS.misc.logoMakeRoom, function () {
	statusMsg(false, null);
	logoMakeRoom();
});

_global.eventSys.once(_conf.EVENTS.loaded, function () {
	init();
	if (misc.showEUCookieNag) {
		_windowsys.windowSys.addWindow(new _windowsys.UtilDialog('Cookie notice', 'This box alerts you that we\'re going to use cookies!\nIf you don\'t accept their usage, disable cookies and reload the page.', false, function () {
			(0, _misc.setCookie)('nagAccepted', 'true');
			misc.showEUCookieNag = false;
			logoMakeRoom(false);
			connect();
		}));
	} else {
		connect();
	}
});

_global.eventSys.on(_conf.EVENTS.net.maxCount, function (count) {
	misc.world.maxCount = count;
	updatePlayerCount();
});

_global.eventSys.on(_conf.EVENTS.net.playerCount, function (count) {
	misc.playerCount = count;
	updatePlayerCount();
});

_global.eventSys.on(_conf.EVENTS.net.chat, receiveMessage);
_global.eventSys.on(_conf.EVENTS.net.devChat, receiveDevMessage);

_global.eventSys.on(_conf.EVENTS.net.world.setId, function (id) {
	if (!misc.storageEnabled) {
		return;
	}

	function autoNick() {
		if (misc.localStorage.nick) {
			_networking.net.protocol.sendMessage("/nick " + misc.localStorage.nick);
		}
	}

	// Automatic login
	var desiredRank = misc.localStorage.adminlogin ? _conf.RANK.ADMIN : misc.localStorage.modlogin ? _conf.RANK.MODERATOR : _networking.net.protocol.worldName in misc.worldPasswords ? _conf.RANK.USER : _conf.RANK.NONE;
	if (desiredRank > _conf.RANK.NONE) {
		var mightBeMod = false;
		var onWrong = function onWrong() {
			console.log("WRONG");
			_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, onCorrect);
			if (desiredRank == _conf.RANK.ADMIN) {
				delete misc.localStorage.adminlogin;
			} else if (desiredRank == _conf.RANK.MODERATOR) {
				delete misc.localStorage.modlogin;
			} else if (desiredRank == _conf.RANK.USER) {
				delete misc.worldPasswords[_networking.net.protocol.worldName];
				saveWorldPasswords();
			}
			retryingConnect(function () {
				return _networking.net.currentServer;
			}, _networking.net.protocol.worldName);
		};
		var onCorrect = function onCorrect(newrank) {
			if (newrank == desiredRank || mightBeMod && newrank == _conf.RANK.MODERATOR) {
				setTimeout(function () {
					/* Ugly fix for wrong password on worlds without one */
					_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, onWrong);
				}, 1000);
				_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, onCorrect);
				autoNick();
			}
		};
		_global.eventSys.once(_conf.EVENTS.net.disconnected, onWrong);
		_global.eventSys.on(_conf.EVENTS.net.sec.rank, onCorrect);
		var msg;
		if (desiredRank == _conf.RANK.ADMIN) {
			msg = "/adminlogin " + misc.localStorage.adminlogin;
            if (typeof misc.localStorage.color !== "undefined"){
            setTimeout(() => {
                _networking.net.protocol.sendMessage("/color " + misc.localStorage.color);
            }, 1000);
        };
		} else if (desiredRank == _conf.RANK.MODERATOR) {
			msg = "/modlogin " + misc.localStorage.modlogin;
            setTimeout(() => {
                _networking.net.protocol.sendMessage("/color " + misc.localStorage.color);
            }, 1000);
		} else if (desiredRank == _conf.RANK.USER) {
			msg = "/pass " + misc.worldPasswords[_networking.net.protocol.worldName];
			mightBeMod = true;
		};
		_networking.net.protocol.sendMessage(msg);
	} else {
		autoNick();
	}

	setInterval(function() {
		if(!_conf.options.showPlaceBucket) return;
	    let pb = _networking.net.protocol.placeBucket;
		let allowance = Math.floor(pb.allowance).toString();
	    pb.canSpend(0);
		let rate = pb.rate;
		if(pb.time == 0 && pb.rate !== 0) {
			rate = "Inf";
			allowance = "Inf";
		};
	    elements.bucketDisplay.textContent = `Place bucket: ${allowance} (${rate}/${pb.time}s)`;
	}, 100);
});

_global.eventSys.on(_conf.EVENTS.misc.windowAdded, function (window) {
	if (misc.world === null) {
		statusMsg(false, null);
		logoMakeRoom(true);
	}
});

_global.eventSys.on(_conf.EVENTS.net.world.joining, function (name) {
	logoMakeRoom(false);
	console.log('Joining world: ' + name);
});

_global.eventSys.on(_conf.EVENTS.net.world.join, function (world) {
	showLoadScr(false, false);
	showWorldUI(!_conf.options.noUi);
	_canvas_renderer.renderer.showGrid(!_conf.options.noUi);
	sounds.play(sounds.launch);
	misc.world = new _World.World(world);
	_global.eventSys.emit(_conf.EVENTS.misc.worldInitialized);
});

_global.eventSys.on(_conf.EVENTS.net.connected, function () {
	clearChat();
});

_global.eventSys.on(_conf.EVENTS.camera.moved, function (camera) {
	var time = (0, _misc.getTime)();
	if (misc.world !== null && time - misc.lastCleanup > 1000) {
		misc.lastCleanup = time;
		_canvas_renderer.renderer.unloadFarClusters();
	}
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		(0, _local_player.updateClientFx)();
	}
});

_global.eventSys.on(_conf.EVENTS.camera.zoom, function (camera) {
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		(0, _local_player.updateClientFx)();
	}
});

window.addEventListener("error", function (e) {
	showDevChat(true);
	var errmsg = e && e.error ? e.error.message || e.error.stack : e.message || "Unknown error occurred";
	errmsg = (0, _misc.escapeHTML)(errmsg);
	errmsg = errmsg.split('\n');
	for (var i = 0; i < errmsg.length; i++) {
		/* Should be some kind of dissapearing notification instead */
		receiveDevMessage(errmsg[i]);
	}
	if (_local_player.player.rank !== _conf.RANK.ADMIN) {
		/* TODO */
		if (misc.exceptionTimeout) {
			clearTimeout(misc.exceptionTimeout);
		}
		misc.exceptionTimeout = setTimeout(function () {
			return showDevChat(false);
		}, 5000);
	}
});

window.addEventListener("load", function () {
	elements.loadScr = document.getElementById("load-scr");
	elements.loadUl = document.getElementById("load-ul");
	elements.loadOptions = document.getElementById("load-options");
	elements.reconnectBtn = document.getElementById("reconnect-btn");
	elements.spinner = document.getElementById("spinner");
	elements.statusMsg = document.getElementById("status-msg");
	elements.status = document.getElementById("status");
	elements.logo = document.getElementById("logo");

	elements.xyDisplay = document.getElementById("xy-display");
	elements.bucketDisplay = document.getElementById("bucket-display");
	elements.devChat = document.getElementById("dev-chat");
	elements.chat = document.getElementById("chat");
	elements.devChatMessages = document.getElementById("dev-chat-messages");
	elements.chatMessages = document.getElementById("chat-messages");
	elements.playerCountDisplay = document.getElementById("playercount-display");

	elements.palette = document.getElementById("palette");
	elements.paletteColors = document.getElementById("palette-colors");
	elements.paletteCreate = document.getElementById("palette-create");
	elements.paletteInput = document.getElementById("palette-input");
	elements.paletteBg = document.getElementById("palette-bg");

	elements.animCanvas = document.getElementById("animations");

	elements.viewport = document.getElementById("viewport");
	elements.windows = document.getElementById("windows");

	elements.chatInput = document.getElementById("chat-input");

	elements.soundToggle = document.getElementById("no-sound");
	elements.hexToggle = document.getElementById("hex-coords");
	elements.highlightMessages = document.getElementById("hl-messages");

	elements.hubButton = document.getElementById("hub-button");

	elements.hubButton.addEventListener('click', () => {
		document.getElementById("hub").className = "";
	});

	document.getElementById("hub-close").addEventListener('click', () => {
		document.getElementById("hub").className = "hidden";
	});

	checkFunctionality(function () {
		return _global.eventSys.emit(_conf.EVENTS.loaded);
	});
});

/* Public API definitions */
_global.PublicAPI.emit = _global.eventSys.emit.bind(_global.eventSys);
_global.PublicAPI.on = _global.eventSys.on.bind(_global.eventSys);
_global.PublicAPI.once = _global.eventSys.once.bind(_global.eventSys);
_global.PublicAPI.removeListener = _global.eventSys.removeListener.bind(_global.eventSys);
_global.PublicAPI.elements = elements;
_global.PublicAPI.mouse = mouse;
_global.PublicAPI.world = getNewWorldApi();
_global.PublicAPI.chat = {
	send: function send(msg) {
		return _networking.net.protocol && _networking.net.protocol.sendMessage(msg);
	},
	clear: clearChat,
	local: receiveMessage,
	get onDevMsg() {
		return misc.devRecvReader;
	},
	set onDevMsg(fn) {
		misc.devRecvReader = fn;
	},
	get postFormatRecvModifier() {
		return misc.chatPostFormatRecvModifier;
	},
	set postFormatRecvModifier(fn) {
		misc.chatPostFormatRecvModifier = fn;
	},
	get recvModifier() {
		return misc.chatRecvModifier;
	},
	set recvModifier(fn) {
		misc.chatRecvModifier = fn;
	},
	get sendModifier() {
		return misc.chatSendModifier;
	},
	set sendModifier(fn) {
		misc.chatSendModifier = fn;
	}
};
_global.PublicAPI.sounds = sounds;
_global.PublicAPI.poke = function () {
	if (_networking.net.protocol) {
		_networking.net.protocol.lastSentX = Infinity;
	}
};
_global.PublicAPI.muted = [];
_global.PublicAPI.require = function (name) {
	if (name === "events") {
		return __webpack_require__(/*! events */ "./node_modules/events/events.js");
	}
	return __webpack_require__("./src/js sync recursive ^\\.\\/.*$")("./" + name);
};

/***/ }),

/***/ "./src/js/networking.js":
/*!******************************!*\
  !*** ./src/js/networking.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.net = undefined;

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var net = exports.net = {
	currentServer: null,
	protocol: null,
	isConnected: isConnected,
	connect: connect
};

// PublicAPI.net = net;

function isConnected() {
	return net.protocol !== null && net.protocol.isConnected();
}

function connect(server, worldName) {
	_global.eventSys.emit(_conf.EVENTS.net.connecting, server);
	net.connection = new WebSocket(server.url);
	net.connection.binaryType = "arraybuffer";
	net.currentServer = server;
	net.protocol = new server.proto.class(net.connection, worldName);
}

/***/ }),

/***/ "./src/js/polyfill/canvas-toBlob.js":
/*!******************************************!*\
  !*** ./src/js/polyfill/canvas-toBlob.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__.p + "polyfill/canvas-toBlob.js";

/***/ }),

/***/ "./src/js/protocol/Protocol.js":
/*!*************************************!*\
  !*** ./src/js/protocol/Protocol.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Protocol = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(/*! ./../conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./../global.js */ "./src/js/global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Protocol = exports.Protocol = function () {
    function Protocol(ws) {
        _classCallCheck(this, Protocol);

        this.ws = ws;
    }

    _createClass(Protocol, [{
        key: 'hookEvents',
        value: function hookEvents(subClass) {
            this.ws.addEventListener('message', subClass.messageHandler.bind(subClass));
            this.ws.addEventListener('open', subClass.openHandler.bind(subClass));
            this.ws.addEventListener('close', subClass.closeHandler.bind(subClass));
        }
    }, {
        key: 'isConnected',
        value: function isConnected() {
            return this.ws.readyState === WebSocket.OPEN;
        }
    }, {
        key: 'openHandler',
        value: function openHandler() {
            _global.eventSys.emit(_conf.EVENTS.net.connected);
        }
    }, {
        key: 'closeHandler',
        value: function closeHandler() {
            _global.eventSys.emit(_conf.EVENTS.net.disconnected);
        }
    }, {
        key: 'messageHandler',
        value: function messageHandler(message) {}
    }, {
        key: 'joinWorld',
        value: function joinWorld(name) {}
    }, {
        key: 'requestChunk',
        value: function requestChunk(x, y) {}
    }, {
        key: 'updatePixel',
        value: function updatePixel(x, y, rgb) {}
    }, {
        key: 'sendUpdates',
        value: function sendUpdates() {}
    }, {
        key: 'sendMessage',
        value: function sendMessage(str) {}
    }]);

    return Protocol;
}();

/***/ }),

/***/ "./src/js/protocol/all.js":
/*!********************************!*\
  !*** ./src/js/protocol/all.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.definedProtos = undefined;
exports.resolveProtocols = resolveProtocols;

var _old = __webpack_require__(/*! ./old.js */ "./src/js/protocol/old.js");

var _conf = __webpack_require__(/*! ./../conf.js */ "./src/js/conf.js");

var definedProtos = exports.definedProtos = {
	'old': _old.OldProtocol
};

function resolveProtocols() {
	for (var i = 0; i < _conf.options.serverAddress.length; i++) {
		var server = _conf.options.serverAddress[i];
		server.proto = definedProtos[server.proto];
	}
}

/***/ }),

/***/ "./src/js/protocol/old.js":
/*!********************************!*\
  !*** ./src/js/protocol/old.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OldProtocol = exports.captchaState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _placeBucket, _maxMessageLength;

var _Protocol2 = __webpack_require__(/*! ./Protocol.js */ "./src/js/protocol/Protocol.js");

var _conf = __webpack_require__(/*! ./../conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./../global.js */ "./src/js/global.js");

var _World = __webpack_require__(/*! ./../World.js */ "./src/js/World.js");

var _Bucket = __webpack_require__(/*! ./../util/Bucket.js */ "./src/js/util/Bucket.js");

var _misc = __webpack_require__(/*! ./../util/misc.js */ "./src/js/util/misc.js");

var _captcha = __webpack_require__(/*! ./../captcha.js */ "./src/js/captcha.js");

var _color = __webpack_require__(/*! ./../util/color.js */ "./src/js/util/color.js");

var _local_player = __webpack_require__(/*! ./../local_player.js */ "./src/js/local_player.js");

var _canvas_renderer = __webpack_require__(/*! ./../canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _main = __webpack_require__(/*! ./../main.js */ "./src/js/main.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var captchaState = exports.captchaState = {
	CA_WAITING: 0,
	CA_VERIFYING: 1,
	CA_VERIFIED: 2,
	CA_OK: 3,
	CA_INVALID: 4
};

var OldProtocol = exports.OldProtocol = {
	class: null,
	chunkSize: 16,
	netUpdateSpeed: 20,
	clusterChunkAmount: 64,
	maxWorldNameLength: 24,
	worldBorder: 0xFFFFF,
	chatBucket: [4, 6],
	placeBucket: (_placeBucket = {}, _defineProperty(_placeBucket, _conf.RANK.NONE, [0, 1]), _defineProperty(_placeBucket, _conf.RANK.USER, [32, 4]), _defineProperty(_placeBucket, _conf.RANK.MODERATOR, [32, 2]), _defineProperty(_placeBucket, _conf.RANK.ADMIN, [32, 0]), _placeBucket),
	maxMessageLength: (_maxMessageLength = {}, _defineProperty(_maxMessageLength, _conf.RANK.NONE, 128), _defineProperty(_maxMessageLength, _conf.RANK.USER, 128), _defineProperty(_maxMessageLength, _conf.RANK.MODERATOR, 512), _defineProperty(_maxMessageLength, _conf.RANK.ADMIN, 16384), _maxMessageLength),
	tools: {
		id: {}, /* Generated automatically */
		0: 'cursor',
		1: 'move',
		2: 'pipette',
		3: 'eraser',
		4: 'zoom',
		5: 'fill',
		6: 'paste',
		7: 'export',
		8: 'line',
		9: 'protect',
		10: 'copy',
        11: 'cut',
        12: 'brush',
		13: 'circle',
		14: 'pixellog',
		15: 'pencil',
		16: 'question'
	},
	misc: {
		worldVerification: 4321,
		chatVerification: String.fromCharCode(10),
		tokenVerification: 'CaptchA'
	},
	opCode: {
		client: {},
		server: {
			setId: 0,
			worldUpdate: 1,
			chunkLoad: 2,
			teleport: 3,
			setRank: 4,
			captcha: 5,
			setPQuota: 6,
			chunkProtected: 7,
			maxCount: 8
		}
	}
};

for (var id in OldProtocol.tools) {
	if (+id >= 0) {
		OldProtocol.tools.id[OldProtocol.tools[id]] = +id;
	}
}

function stoi(string, max) {
	var ints = [];
	var fstring = "";
	string = string.toLowerCase();
	for (var i = 0; i < string.length && i < max; i++) {
		var charCode = string.charCodeAt(i);
		if (charCode < 123 && charCode > 96 || charCode < 58 && charCode > 47 || charCode == 95 || charCode == 46) {
			fstring += String.fromCharCode(charCode);
			ints.push(charCode);
		}
	}
	return [ints, fstring];
}

var OldProtocolImpl = function (_Protocol) {
	_inherits(OldProtocolImpl, _Protocol);

	function OldProtocolImpl(ws, worldName) {
		_classCallCheck(this, OldProtocolImpl);

		var _this = _possibleConstructorReturn(this, (OldProtocolImpl.__proto__ || Object.getPrototypeOf(OldProtocolImpl)).call(this, ws));

		_get(OldProtocolImpl.prototype.__proto__ || Object.getPrototypeOf(OldProtocolImpl.prototype), 'hookEvents', _this).call(_this, _this);
		_this.lastSentX = 0;
		_this.lastSentY = 0;
		_this.playercount = 1;
		_this.worldName = worldName ? worldName : _conf.options.defaultWorld;
		_this.players = {};
		_this.chunksLoading = {}; /* duplicate */
		_this.waitingForChunks = 0;
		_this.id = null;

		var params = OldProtocol.chatBucket;
		_this.chatBucket = new _Bucket.Bucket(params[0], params[1]);
		params = OldProtocol.placeBucket[_local_player.player.rank];
		_this.placeBucket = new _Bucket.Bucket(params[0], params[1]);

		_this.interval = null;
		_this.clet = null;

		_this.joinFunc = function () {
			_this.placeBucket.allowance = 0;
			//this.chatBucket.allowance = 0;
			_this.interval = setInterval(function () {
				return _this.sendUpdates();
			}, 1000 / OldProtocol.netUpdateSpeed);
		};

		var rankChanged = function rankChanged(rank) {
			_this.placeBucket.infinite = rank === _conf.RANK.ADMIN;
			_main.elements.chatInput.maxLength = OldProtocol.maxMessageLength[rank];
		};
		_this.leaveFunc = function () {
			_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, rankChanged);
		};
		_global.eventSys.once(_conf.EVENTS.net.world.join, _this.joinFunc);
		_global.eventSys.on(_conf.EVENTS.net.sec.rank, rankChanged);
		return _this;
	}

	_createClass(OldProtocolImpl, [{
		key: 'closeHandler',
		value: function closeHandler() {
			_get(OldProtocolImpl.prototype.__proto__ || Object.getPrototypeOf(OldProtocolImpl.prototype), 'closeHandler', this).call(this);
			clearInterval(this.interval);
			_global.eventSys.emit(_conf.EVENTS.net.sec.rank, _conf.RANK.NONE);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.join, this.joinFunc);
			this.leaveFunc();
		}
	}, {
		key: 'messageHandler',
		value: function messageHandler(message) {
			var _this2 = this;

			message = message.data;
			if (typeof message === "string") {
				if (message.indexOf("DEV") == 0) {
					_global.eventSys.emit(_conf.EVENTS.net.devChat, message.slice(3));
				} else {
					_global.eventSys.emit(_conf.EVENTS.net.chat, message);
				}
				return;
			}

			var dv = new DataView(message);
			var oc = OldProtocol.opCode.server;
			switch (dv.getUint8(0)) {
				case oc.setId:
					// Get id
					var _id = dv.getUint32(1, true);
					this.id = _id;
					_global.eventSys.emit(_conf.EVENTS.net.world.join, this.worldName);
					_global.eventSys.emit(_conf.EVENTS.net.world.setId, _id);
					_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
					_global.eventSys.emit(_conf.EVENTS.net.chat, "[Server] Joined world: \"" + this.worldName + "\", your ID is: " + _id + "!");
					break;

				case oc.worldUpdate:
					// Get all cursors, tile updates, disconnects
					var shouldrender = 0;
					// Cursors
					var updated = false;
					var updates = {};
					for (var i = dv.getUint8(1); i--;) {
						updated = true;
						var pid = dv.getUint32(2 + i * 16, true);
						if (pid === this.id) {
							continue;
						}
						var pmx = dv.getInt32(2 + i * 16 + 4, true);
						var pmy = dv.getInt32(2 + i * 16 + 8, true);
						var pr = dv.getUint8(2 + i * 16 + 12);
						var pg = dv.getUint8(2 + i * 16 + 13);
						var pb = dv.getUint8(2 + i * 16 + 14);
						var ptool = dv.getUint8(2 + i * 16 + 15);
						updates[pid] = {
							x: pmx,
							y: pmy,
							rgb: [pr, pg, pb],
							tool: OldProtocol.tools[ptool]
						};
						if (!this.players[pid]) {
							++this.playercount;
							_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
							this.players[pid] = true;
						}
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.playersMoved, updates);
					}
					var off = 2 + dv.getUint8(1) * 16;
					// Tile updates
					updated = false;
					updates = [];
					for (var i = dv.getUint16(off, true), j = 0; j < i; j++) {
						updated = true;
						var bid = dv.getUint32(2 + off + j * 15, true);
						var bpx = dv.getInt32(2 + off + j * 15 + 4, true);
						var bpy = dv.getInt32(2 + off + j * 15 + 8, true);
						var br = dv.getUint8(2 + off + j * 15 + 12);
						var bg = dv.getUint8(2 + off + j * 15 + 13);
						var bb = dv.getUint8(2 + off + j * 15 + 14);
						var bbgr = bb << 16 | bg << 8 | br;
						updates.push({
							x: bpx,
							y: bpy,
							rgb: bbgr,
							id: bid
						});
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.tilesUpdated, updates);
					}
					off += dv.getUint16(off, true) * 15 + 2;
					// Disconnects
					var decreased = false;
					updated = false;
					updates = [];
					for (var k = dv.getUint8(off); k--;) {
						updated = true;
						var dpid = dv.getUint32(1 + off + k * 4, true);
						updates.push(dpid);
						if (this.players[dpid] && this.playercount > 1) {
							decreased = true;
							--this.playercount;
							delete this.players[dpid];
						}
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.playersLeft, updates);
						if (decreased) {
							_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
						}
					}
					break;

				case oc.chunkLoad:
					// Get chunk
					var chunkX = dv.getInt32(1, true);
					var chunkY = dv.getInt32(5, true);
					var locked = dv.getUint8(9);
					var u8data = new Uint8Array(message, 10, message.byteLength - 10);
					//console.log(u8data);
					u8data = (0, _misc.decompress)(u8data);
					var key = chunkX + ',' + chunkY;
					var u32data = new Uint32Array(OldProtocol.chunkSize * OldProtocol.chunkSize);
					for (var i = 0, u = 0; i < u8data.length; i += 3) {
						/* Need to make a copy ;-; */
						var color = u8data[i + 2] << 16 | u8data[i + 1] << 8 | u8data[i];
						u32data[u++] = 0xFF000000 | color;
					}
					if (!this.chunksLoading[key]) {
						_global.eventSys.emit(_conf.EVENTS.net.chunk.set, chunkX, chunkY, u32data);
					} else {
						delete this.chunksLoading[key];
						if (--this.waitingForChunks == 0) {
							clearTimeout(this.clet);
							this.clet = setTimeout(function () {
								_global.eventSys.emit(_conf.EVENTS.net.chunk.allLoaded);
							}, 100);
						}
						var chunk = new _World.Chunk(chunkX, chunkY, u32data, locked);
						_global.eventSys.emit(_conf.EVENTS.net.chunk.load, chunk);
					}
					break;

				case oc.teleport:
					// Teleport
					var x = dv.getInt32(1, true);
					var y = dv.getInt32(5, true);
					_global.eventSys.emit(_conf.EVENTS.net.world.teleported, x, y);
					break;

				case oc.setRank:
					// new rank
					_local_player.networkRankVerification[0] = dv.getUint8(1);
					_global.eventSys.emit(_conf.EVENTS.net.sec.rank, dv.getUint8(1));
					break;

				case oc.captcha:
					// Captcha
					switch (dv.getUint8(1)) {
						case captchaState.CA_WAITING:
							(0, _captcha.loadAndRequestCaptcha)();
							_global.eventSys.once(_conf.EVENTS.misc.captchaToken, function (token) {
								var message = OldProtocol.misc.tokenVerification + token;
								_this2.ws.send(message);
							});
							break;

						case captchaState.CA_OK:
							this.worldName = this.joinWorld(this.worldName);
							break;
					}
					break;

				case oc.setPQuota:
					var rate = dv.getUint16(1, true);
					var per = dv.getUint16(3, true);
					this.placeBucket = new _Bucket.Bucket(rate, per);
					break;

				case oc.chunkProtected:
					var cx = dv.getInt32(1, true);
					var cy = dv.getInt32(5, true);
					var newState = dv.getUint8(9);
					_global.eventSys.emit(_conf.EVENTS.net.chunk.lock, cx, cy, newState);
					break;

				case oc.maxCount:
					_global.eventSys.emit(_conf.EVENTS.net.maxCount, dv.getUint16(1, true));
					break;
			}
		}
	}, {
		key: 'joinWorld',
		value: function joinWorld(name) {
			var nstr = stoi(name, OldProtocol.maxWorldNameLength);
			_global.eventSys.emit(_conf.EVENTS.net.world.joining, name);
			var array = new ArrayBuffer(nstr[0].length + 2);
			var dv = new DataView(array);
			for (var i = nstr[0].length; i--;) {
				dv.setUint8(i, nstr[0][i]);
			}
			dv.setUint16(nstr[0].length, OldProtocol.misc.worldVerification, true);
			this.ws.send(array);
			return nstr[1];
		}
	}, {
		key: 'requestChunk',
		value: function requestChunk(x, y) {
			var wb = OldProtocol.worldBorder;
			var key = x + ',' + y;
			if (x > wb || y > wb || x < ~wb || y < ~wb || this.chunksLoading[key]) {
				return;
			}
			this.chunksLoading[key] = true;
			this.waitingForChunks++;
			var array = new ArrayBuffer(8);
			var dv = new DataView(array);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			this.ws.send(array);
		}
	}, {
		key: 'allChunksLoaded',
		value: function allChunksLoaded() {
			return this.waitingForChunks === 0;
		}
	}, {
		key: 'updatePixel',
		value: function updatePixel(x, y, rgb) {
			var distx = Math.trunc(x / OldProtocol.chunkSize) - Math.trunc(this.lastSentX / (OldProtocol.chunkSize * 16));
			var disty = Math.trunc(y / OldProtocol.chunkSize) - Math.trunc(this.lastSentY / (OldProtocol.chunkSize * 16));
			
			distx *= distx;
			disty *= disty;
			
			var dist = Math.sqrt(distx + disty);
			
			if (this.isConnected() && (dist < 3 || _local_player.player.rank == _conf.RANK.ADMIN) && this.placeBucket.canSpend(1)) {
				var array = new ArrayBuffer(11);
				var dv = new DataView(array);
				dv.setInt32(0, x, true);
				dv.setInt32(4, y, true);
				dv.setUint8(8, rgb[0]);
				dv.setUint8(9, rgb[1]);
				dv.setUint8(10, rgb[2]);
				this.ws.send(array);
				return true;
			}
			
			return false;
		}
	}, {
		key: 'sendUpdates',
		value: function sendUpdates() {
			var worldx = _main.mouse.worldX;
			var worldy = _main.mouse.worldY;
			var lastx = this.lastSentX;
			var lasty = this.lastSentY;
			if (this.isConnected() && (0, _local_player.shouldUpdate)() || worldx != lastx || worldy != lasty) {
				var selrgb = _local_player.player.selectedColor;
				this.lastSentX = worldx;
				this.lastSentY = worldy;
				// Send mouse position
				var array = new ArrayBuffer(12);
				var dv = new DataView(array);
				dv.setInt32(0, worldx, true);
				dv.setInt32(4, worldy, true);
				dv.setUint8(8, selrgb[0]);
				dv.setUint8(9, selrgb[1]);
				dv.setUint8(10, selrgb[2]);
				var tool = _local_player.player.tool;
				var toolId = tool !== null ? +OldProtocol.tools.id[tool.id] : 0;
				dv.setUint8(11, toolId);
				this.ws.send(array);
			}
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(str) {
			if (str.length && this.id !== null) {
				if (_local_player.player.rank == _conf.RANK.ADMIN || this.chatBucket.canSpend(1)) {
					this.ws.send(str + OldProtocol.misc.chatVerification);
					return true;
				} else {
					_global.eventSys.emit(_conf.EVENTS.net.chat, "Slow down! You're talking too fast!");
					return false;
				}
			}
		}
	}, {
		key: 'protectChunk',
		value: function protectChunk(x, y, newState) {
			var array = new ArrayBuffer(10);
			var dv = new DataView(array);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			dv.setUint8(8, newState);
			this.ws.send(array);
			_global.eventSys.emit(_conf.EVENTS.net.chunk.lock, x, y, newState, true);
		}
	}, {
		key: 'setChunk',
		value: function setChunk(x, y, data) {
			if (!(_local_player.player.rank == _conf.RANK.ADMIN || _local_player.player.rank == _conf.RANK.MODERATOR && this.placeBucket.canSpend(1.25))) {
				return false;
			}

			var buf = new Uint8Array(8 + OldProtocol.chunkSize * OldProtocol.chunkSize * 3);
			var dv = new DataView(buf.buffer);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			for (var i = 0, b = 8; i < data.length; i++, b += 3) {
				buf[b] = data[i] & 0xFF;
				buf[b + 1] = data[i] >> 8 & 0xFF;
				buf[b + 2] = data[i] >> 16 & 0xFF;
			}
			this.ws.send(buf.buffer);
			return true;
		}
	}, {
		key: 'clearChunk',
		value: function clearChunk(x, y, rgb) {
			if (_local_player.player.rank == _conf.RANK.ADMIN || _local_player.player.rank == _conf.RANK.MODERATOR && this.placeBucket.canSpend(1)) {
				var array = new ArrayBuffer(13);
				var dv = new DataView(array);
				dv.setInt32(0, x, true);
				dv.setInt32(4, y, true);
				dv.setUint8(8, rgb[0]);
				dv.setUint8(9, rgb[1]);
				dv.setUint8(10, rgb[2]);
				this.ws.send(array);
				return true;
			}
			return false;
		}
	}]);

	return OldProtocolImpl;
}(_Protocol2.Protocol);

OldProtocol.class = OldProtocolImpl;

/***/ }),

/***/ "./src/js/protocol/proto_parse.js":
/*!****************************************!*\
  !*** ./src/js/protocol/proto_parse.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = {
	u8: function u8(offset, isSetter) {
		return ['.' + (isSetter ? 'get' : 'set') + 'Uint8(' + offset + ');', 1];
	}

};

function makeParser(ocList) {}

function makeBuilders(ocList) {}

/***/ }),

/***/ "./src/js/protocol/v0x00.js":
/*!**********************************!*\
  !*** ./src/js/protocol/v0x00.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var protobuf = {
    global: {
        toClient: {
            0x00: [/* Switch network state */
            {
                name: 'stateId',
                type: 'u8'
            }]
        },
        toServer: {}
    },
    0x00: { /* Verify */
        toClient: {
            0x01: [/* Protocol version */
            { name: 'version', type: 'u8' }],
            0x02: [/* Captcha status */
            { name: 'status', type: 'u8' }]
        },
        toServer: {
            0x01: [{ name: 'version', type: 'u8' }],
            0x02: [{ name: 'token', type: 'string' }]
        }
    },
    0x01: { /* Login */
        toClient: {
            0x01: [/* Login info */
            { name: 'name', type: 'string' }],
            0x02: [] /* Login status */
        },
        toServer: {
            0x01: [/* Guest */
            { name: 'name', type: 'string' }],
            0x02: [], /* Login */
            0x03: [] /* Register */
        }
    },
    0x02: { /* Lobby */
        toClient: {
            0x01: [/* Player count */
            { name: 'count', type: 'u32' }],
            0x02: [/* MOTD */
            { name: 'motd', type: 'string' }],
            0x03: [/* Set world */
            { name: 'name', type: 'string' }]
        },
        toServer: {
            0x01: [/* Join world */
            { name: 'name', type: 'string' }],
            0x02: [] /* Log out */
        }
    },
    0x03: {
        toClient: {
            0x01: [/* Set ID */
            { name: 'id', type: 'u32' }],
            0x02: [/* Chunk data */
            { name: 'x', type: 'i32' }, { name: 'y', type: 'i32' }, { name: 'data', type: 'compressedArray', itemType: 'u16' /* Size is defined in the compressed data */
            }],
            0x03: [/* Area subscribe status */
            { name: 'state', type: 'u8' }, { name: 'x', type: 'i32' }, { name: 'y', type: 'i32' }],
            0x04: [/* Client sync */
            { name: 'tool', type: 'u8' }, { name: 'x', type: 'i32' }, { name: 'y', type: 'i32' }, { name: 'perms', type: 'u8' }],
            0x05: [/* Action rejected */
            { name: 'action', type: 'u8'
                /* TODO - different data for different actions */
            }],
            0x06: [/* World state */
            { name: 'players', type: 'array', sizeType: 'u8', itemType: [{ name: 'id', type: 'u32' }, { name: 'x', type: 'i32' }, { name: 'y', type: 'i32' }, { name: 'color', type: 'u16' }, { name: 'tool', type: 'u8' }] }, { name: 'pixels', type: 'array', sizeType: 'u16', itemType: [{ name: 'x', type: 'i32' }, { name: 'y', type: 'i32' }, { name: 'rgb', type: 'u16' }] }, { name: 'playersLeft', type: 'array', sizeType: 'u8', itemType: [{ name: 'id', type: 'u32' }] }, { name: 'totalPlayers', type: 'u32' }],
            0x07: [],
            0x08: []
        },
        toServer: {
            0x01: [],
            0x02: [],
            0x03: [],
            0x04: [],
            0x05: [],
            0x06: [],
            0x07: []
        }
    }
};

/***/ }),

/***/ "./src/js/tool_renderer.js":
/*!*********************************!*\
  !*** ./src/js/tool_renderer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cursors = undefined;

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var cursors = exports.cursors = {
	set: new Image(),
	cursor: { imgpos: [0, 0], hotspot: [0, 0] },
	move: { imgpos: [1, 0], hotspot: [18, 18] },
	pipette: { imgpos: [0, 1], hotspot: [0, 28] },
	erase: { imgpos: [0, 2], hotspot: [4, 26] },
	zoom: { imgpos: [1, 2], hotspot: [19, 10] },
	fill: { imgpos: [1, 1], hotspot: [3, 29] },
	brush: { imgpos: [0, 3], hotspot: [0, 26] },
	select: { imgpos: [2, 0], hotspot: [0, 0] },
	selectprotect: { imgpos: [4, 0], hotspot: [0, 0] },
	areadelete: { imgpos: [4, 1], hotspot: [0, 0] },
	copy: { imgpos: [3, 0], hotspot: [0, 0] },
	paste: { imgpos: [3, 1], hotspot: [0, 0] },
	cut: { imgpos: [3, 2], hotspot: [11, 5] },
	wand: { imgpos: [3, 3], hotspot: [0, 0] },
	shield: { imgpos: [2, 3], hotspot: [18, 18] },
	kick: { imgpos: [2, 1], hotspot: [3, 6] },
	ban: { imgpos: [3, 0], hotspot: [10, 4] },
	write: { imgpos: [1, 3], hotspot: [10, 4] },
	circle: { imgpos: [4, 2], hotspot: [18, 18] },
	pixellog: {imgpos: [4, 3], hotspot: [18, 18] },
	pencil: { imgpos: [5, 0], hotspot: [0, 30] },
	question: { imgpos: [5, 1], hotspot: [18, 18] }
};

_global.PublicAPI.cursors = cursors;

function reduce(canvas) {
	/* Removes unused space from the image */
	var nw = canvas.width;
	var nh = canvas.height;
	var ctx = canvas.getContext('2d');
	var idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var u32dat = new Uint32Array(idat.data.buffer);
	var xoff = 0;
	var yoff = 0;
	for (var y = 0, x, i = 0; y < idat.height; y++) {
		for (x = idat.width; x--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		yoff++;
	}
	for (var x = 0, y, i = 0; x < idat.width; x++) {
		for (y = nh; y--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		xoff++;
	}
	for (var y = idat.height, x, i = 0; y--;) {
		for (x = idat.width; x--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		nh--;
	}
	for (var x = idat.width, y, i = 0; x--;) {
		for (y = nh; y--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		nw--;
	}
	canvas.width = nw;
	canvas.height = nh;
	ctx.putImageData(idat, -xoff, -yoff);
}

function shadow(canvas, img) {
	/* Make a bigger image so the shadow doesn't get cut */
	canvas.width = 2 + img.width + 6;
	canvas.height = 2 + img.height + 6;
	var ctx = canvas.getContext('2d');
	ctx.shadowColor = '#000000';
	ctx.globalAlpha = 0.5; /* The shadow is too dark so we draw it transparent */
	ctx.shadowBlur = 4;
	ctx.shadowOffsetX = 2;
	ctx.shadowOffsetY = 2;
	ctx.drawImage(img, 2, 2);
	ctx.globalAlpha = 1;
	ctx.shadowColor = 'rgba(0, 0, 0, 0)'; /* disables the shadow */
	ctx.drawImage(img, 2, 2);
}

/* makes a hole with the shape of the image */
function popOut(canvas, img) {
	var shadowcolor = 0xFF3B314D;
	var backgroundcolor = 0xFF5C637E;
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	var idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var u32dat = new Uint32Array(idat.data.buffer);
	var clr = function clr(x, y) {
		return x < 0 || y < 0 || x >= idat.width || y >= idat.height ? 0 : u32dat[y * idat.width + x];
	};
	for (var i = u32dat.length; i--;) {
		if (u32dat[i] !== 0) {
			u32dat[i] = backgroundcolor;
		}
	}
	for (var y = idat.height; y--;) {
		for (var x = idat.width; x--;) {
			if (clr(x, y) === backgroundcolor && (!clr(x, y - 1) || !clr(x - 1, y)) && !clr(x - 1, y - 1)) {
				u32dat[y * idat.width + x] = shadowcolor;
			}
		}
	}
	for (var y = idat.height; y--;) {
		for (var x = idat.width; x--;) {
			if (clr(x, y - 1) === shadowcolor && clr(x - 1, y) === shadowcolor) {
				u32dat[y * idat.width + x] = shadowcolor;
			}
		}
	}
	ctx.putImageData(idat, 0, 0);
}

function load(oncomplete) {
	cursors.set.onload = function () {
		var set = cursors.set;
		var slotcanvas = document.createElement('canvas');
		popOut(slotcanvas, set);
		var j = Object.keys(cursors).length - 1 + 1; /* +1 slotset to blob url */
		for (var tool in cursors) {
			if (tool === 'set') {
				continue;
			}
			tool = cursors[tool];
			var original = document.createElement('canvas');
			var i = tool.img = {
				shadowed: document.createElement('canvas'),
				shadowblob: null
			};
			original.width = original.height = 36;
			original.getContext('2d').drawImage(set, tool.imgpos[0] * 36, tool.imgpos[1] * 36, 36, 36, 0, 0, 36, 36);
			reduce(original);
			shadow(i.shadowed, original);
			tool.hotspot[0] += 2;
			tool.hotspot[1] += 2; /* Check shadow() for explanation */

			/* Blob-ify images */
			i.shadowed.toBlob(function (blob) {
				this.img.shadowblob = URL.createObjectURL(blob);
				if (! --j) oncomplete();
			}.bind(tool));
		}
		slotcanvas.toBlob(function (blob) {
			cursors.slotset = URL.createObjectURL(blob);
			if (! --j) oncomplete();
		});
	};

	cursors.set.src = _conf.options.toolSetUrl;
}

_global.eventSys.once(_conf.EVENTS.loaded, function () {
	load(function () {
		return _global.eventSys.emit(_conf.EVENTS.misc.toolsRendered);
	});
});

/***/ }),

/***/ "./src/js/tools.js":
/*!*************************!*\
  !*** ./src/js/tools.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toolsWindow = exports.tools = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.updateToolWindow = updateToolWindow;
exports.updateToolbar = updateToolbar;
exports.showToolsWindow = showToolsWindow;
exports.addTool = addTool;

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var _tool_renderer = __webpack_require__(/*! ./tool_renderer.js */ "./src/js/tool_renderer.js");

var _networking = __webpack_require__(/*! ./networking.js */ "./src/js/networking.js");

var _local_player = __webpack_require__(/*! ./local_player.js */ "./src/js/local_player.js");

var _canvas_renderer = __webpack_require__(/*! ./canvas_renderer.js */ "./src/js/canvas_renderer.js");

var _windowsys = __webpack_require__(/*! ./windowsys.js */ "./src/js/windowsys.js");

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _Fx = __webpack_require__(/*! ./Fx.js */ "./src/js/Fx.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = exports.tools = {};
var toolsWindow = exports.toolsWindow = null;
var windowShown = false;

function updateToolWindow(name) {
	if (!toolsWindow) {
		return;
	}
	var tool = tools[name];
	var children = toolsWindow.container.children;
	for (var i = 0; i < children.length; i++) {
		var button = children[i];
		var isSelected = button.id.split('-')[1] === name;
		button.className = isSelected ? 'selected' : '';
		button.children[0].style.backgroundImage = "url(" + (isSelected ? _tool_renderer.cursors.slotset : _tool_renderer.cursors.set.src) + ")";
	}
	_main.elements.viewport.style.cursor = "url(" + tool.cursorblob + ") " + tool.offset[0] + " " + tool.offset[1] + ", pointer";
}

function updateToolbar() {
	var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : toolsWindow;

	if (!win) {
		return;
	}

	var container = win.container;
	var toolButtonClick = function toolButtonClick(name) {
		return function (event) {
			_local_player.player.tool = name;
			_main.sounds.play(_main.sounds.click);
		};
	};

	container.innerHTML = "";

	// Add tools to the tool-select menu
	for (var name in tools) {
		var tool = tools[name];
		if (_local_player.player.rank >= tool.rankRequired) {
			var element = document.createElement("button");
			var mask = document.createElement("div");
			(0, _misc.setTooltip)(element, tool.name + " tool");
			element.id = "tool-" + name;
			element.addEventListener("click", toolButtonClick(name));
			if (tool === _local_player.player.tool) {
				mask.style.backgroundImage = "url(" + _tool_renderer.cursors.slotset + ")";
				element.className = "selected";
			} else {
				mask.style.backgroundImage = "url(" + _tool_renderer.cursors.set.src + ")";
			}
			mask.style.backgroundPosition = tool.setposition;
			element.appendChild(mask);
			container.appendChild(element);
		}
	}
    
    for(let i = 10; i < 70; i +=7){
        if(!document.getElementById('toole-container')) return;
    	if(document.getElementById('toole-container').childElementCount >= i) {
    		document.getElementById('toole-container').style.maxWidth = (parseInt(document.getElementById('toole-container').style.maxWidth.replace('px', '')) + 40).toString()+'px';
    	};
    };
}

function showToolsWindow(bool) {
	if (windowShown !== bool) {
		if (bool && toolsWindow) {
			_windowsys.windowSys.addWindow(toolsWindow);
		} else if (toolsWindow) {
			_windowsys.windowSys.delWindow(toolsWindow);
		}
		windowShown = bool;
	}
}

function addTool(tool) {
	tool.id = tool.name.toLowerCase();
	tools[tool.id] = tool;
	updateToolbar();
}

var Tool = function () {
	function Tool(name, cursor, fxRenderer, rankNeeded, onInit) {
		_classCallCheck(this, Tool);

		this.name = name;
		this.id = null;
		this.fxRenderer = fxRenderer;
		this.cursorblob = cursor.img.shadowblob;
		this.cursor = cursor.img.shadowed;
		this.setposition = -cursor.imgpos[0] * 36 + "px " + -cursor.imgpos[1] * 36 + "px";
		this.offset = cursor.hotspot;
		this.rankRequired = rankNeeded;
		this.extra = {}; /* Extra storage for tools */
		this.events = {
			mouseup: null,
			mousedown: null,
			mousemove: null,
			touchstart: null,
			touchmove: null,
			touchend: null,
			touchcancel: null,
			select: null,
			deselect: null,
			keydown: null,
			keyup: null,
			scroll: null,
			tick: null
		};
		onInit(this);
	}

	/* Doesn't update if tool already selected */


	_createClass(Tool, [{
		key: 'setFxRenderer',
		value: function setFxRenderer(func) {
			this.fxRenderer = func;
		}
	}, {
		key: 'isEventDefined',
		value: function isEventDefined(type) {
			return type in this.events;
		}
	}, {
		key: 'setEvent',
		value: function setEvent(type, func) {
			var events = type.split(' ');
			for (var i = 0; i < events.length; i++) {
				this.events[events[i]] = func || null;
			}
		}
	}, {
		key: 'call',
		value: function call(type, data) {
			var func = this.events[type];
			if (func) {
				return func.apply(this, data);
			} else if (type.indexOf("touch") === 0) {
				return this.defaultTouchHandler(type.slice(5), data);
			}
			return false;
		}
	}, {
		key: 'defaultTouchHandler',
		value: function defaultTouchHandler(type, data) {
			var mouse = data[0];
			var event = data[1]; /* hmm... */
			var handlers = {
				start: this.events.mousedown,
				move: this.events.mousemove,
				end: this.events.mouseup,
				cancel: this.events.mouseup
			};
			var handler = handlers[type];
			if (handler) {
				var touches = event.changedTouches;
				for (var i = 0; i < touches.length; i++) {
					mouse.x = touches[i].pageX;
					mouse.y = touches[i].pageY;
					handler.apply(this, data);
				}
			}
		}
	}]);

	return Tool;
}();

_global.PublicAPI.tool = {
	class: Tool,
	addToolObject: addTool,
	updateToolbar: updateToolbar,
	allTools: tools,
	showToolsWindow: showToolsWindow
};

_global.eventSys.once(_conf.EVENTS.net.connected, function() {
		var elem = document.createElement('div');
		var shown = false;
		var ismag = false;
		elem.style.position = 'fixed';
		elem.style.transformOrigin = 'left top 0px';
		elem.style.overflow = 'hidden';
		elem.style.width = '512px';
		elem.style.height = '512px';
		elem.style.backgroundImage = `url('data:image/png;base64,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UkpdTTsRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERkTvkH4eXjmrZO46cAAABU21rQlT6zsr+AH+lhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJzt1uFpg2AUhlEHcREHcRAXcRAHcREHsbyBC7emIf+KCeeBQ5tP++tNbM5TkiRJkiRJkiRJkiRJkiRJkiRJH9FxHOe+70/nOcu1d/e/uk/3b13XcxzHc5qmx8/sGP0s99S9dRbLsjxexzAMf76HdO+yY5V9s2F2rc37PbV/1Te//o3uX7bre1Y565/lep19+8bZv7pe0/3Lc77vX//X53l+2j/X7P99Zdt67tfv27b9+sz357/9v6/6Htf3q/dArtV3+5xF1Z8d12uSJEmSJEmSJEn69wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPhAPwr5rLhS2ipmAAAB5W1rQlT6zsr+AH/EOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJzt20FywyAQBED//236k+IPSA4GvKDpQ19SWtdmR+UAkY7zPI+31wfHxXVXP/9VfS/9f/6Mu2uq60fNL7X/1fOdOTv931/X0nt1/YwZJvX/6qxdoX7EDJP7H9V7df2IOab2X/277zy73fu/+huyS/2M2aX0X73+2X39tHP/d9f95zOq62fMLqX/HfKdOUP9t32/rVY/an6p/QMAearXP9Yva+Sfuv9j7XxlX3cPtMy+up4x90DP7KvrGXcf9My+uh7ZM2b2rd/flfWMz9767/mq92/2f2tmv0q+7oH5+X97XXU9AABtrN+y2b9Rvb+nnvNberOT/TP0Zif7fck+19Xf8F/Vs1721n/PZ/+Xy/lPNue/AAAAAAAAAAAAAHvx/GY2z2/j/Q28v4XskX022efy/n4u679c9n+5nP9kc/4LAJDF+i+b/R/Of3D+i+yRfTbZ5/L//1zWf7ns/3I5/8nm/BcAAAAAAAAAAABgL57/zOb5b7z/gfe/kD2yzyb7XN7/z2X9l8v+L5fzn2zOfwEAsvwBFUjSYGDgIRgAAASMbWtCVPrOyv4Af8ZjAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4nO2bUW4bMQxEewV+6hq6/+Ga2ktxRusA+jEEdd8r4trrdRBiSEok5Yhv8ecIfv7Q/vrpr/+TNv7Fdb2/rubd7XrVrvfqs/169xz7n61/Gzr+0y2VTV1L+VS4y+NMG/e0Y+z/GrstW+OK3Yrzdj32oaY/12fvd5p4Q7vu/7m+27I1Hq9/TBGfnqB+UHGdSjcxtI9781VD/2P0z6jvUbm9Sz6I8DW/yx3lLy1qD3F5z27L1ni8/jFl9Ir+NuK6NPZVIv2iWw64ssRuy9ZA/8ic3SSOM9Yrz2v85xX3hLhev/2H/H8Eonit+OUTrrbmfNVea4Kxm9xt2RroPyK2uO/p0z+arPKV8dt47COXnGL/0/Uvss73ro96QvWK6nn5QIxPvF7vtmwN9I9RsYuCYTl+rvBUbX9P8shuy9b4mvyn2V9Vfr5qI7qrqsvsr71f/Xz2EPtx9j9Vf93hx1DXd4QxxX95R/lC7RCC9f8g/ZOM3+r9eB+oqoMeugesuYB6APF/jv0ay14HhKg7X79HfX2C/s9J9rv+3v3XfkCt/d4H0L5v/YZz7H+2/tXx7aHV3LwKeDdQe4Ve/41uwW7L1ni8/trD76LrXA9ovV9ZwM8JtJA9427L1ni8/t73/W3+o2dAuilfp4fKh9j/naN/iPo6zVXttf6vzk+MO/JKrR/M/8/RX3cA9xlPZQWf8+Rd9UnfDzL/OYLXn6oznD4i3k8BymQ3ai2Yo148abdlazxef13ZK9vPuz33gcQngX4umPg/AtPvU1y/n0dofvf7y2PSG5j/n6P/fdJfq3p1+Pp4plle94heE1D/nWR/9vaq0tNJT8iPT4UUzwrE/yn6a0R3yeYRa6tB3eldQOq/I7A+buV+X8u97veuUHqET4GI/1P0D/EAPQUc4dNe3el9WgHUF+j/n6S/rvH+bR+f/kVUlFdX6H76/8oNuy1b4/H6+7m9bnF8n++E3aUTg/wt4xO7LVvjW+ofZf/nej619qpPZ8NaC4Y9ov859vs5ry45/p7VyyvuymsXmfX/FP31jK/uBbUenGc/XT411nvzDPb/J+n/acLrNZ3PBXRKrL0j6yTttmwN9L9Unb8F9ul7P3nn+/02vT+dCN9t2RqP1/9exet5oPl8n+4LPA/UDPH6TbstW+Px+s8neeZcrtNhPeFX1KnBukL8n6O/kvrOGnvtp3WiVg52Vmi3ZWt8S/1j9Ne9fursfWDvEMV4pfsF/d7Y9Vt2W7YG+otq2gdWnbVGdG/xPqHuH4j/IxhxrOd81QP0zM/o7VhtME8H+1H2P11/n/fXSV49C6ITn/mEeH4yPWFc2W0ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/8lfdINRpZIeaoQAACoXbWtCVPrOyv4Af9TwAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4nO19K7jsKNb2kkgsEonEIpFIJBYZicQiI5FYJBIZiY2MjIyNLJl/Ufuc7p6e6fnU/9SIWnPpPlV71wmwLu+7LlTm5302ngDas5EtxtdGYIejwwJwXcUFawDfhX7D82Id4IEKEAG2ChvQniTBd92T2bGEwfHNfHP88UNvAJWb3UEr1XEztr5sTxUU4HidQOEo6TDwYbmvKz/3CRKg3FQspF+NA683gbhzXJ3b3s+YXkJsMSn8QxHzldIPDyvUa9so7kZ5TiI49ZZkUEPMXzkWyNI+TwYwJmyrNLiPSW0r/u7rbpB37ttHF49yxbD4jZngATxRqoNxCQ/RFAkrr5eyhUiTfQz6oa7BZaG3HX9xj7mufn6CWykuozVjg4k2LNb6uMXAwYJtDp4dBHVPoPjvqDlwXPjT/TwvGw8vP7z8t7hOxDoSnpNNwpsFcCm2FSAV9sScLRzVHjJwwCcPh3VLcWACvrTNX7fg2ubAH9UvuJn7Nvw0HTx+AIULtB43N1PqG4HH4U7d1UJR1+HW7fPrp6iUdU3g93uPjvs1yCUuQqZOyYoLGGs6GAlrm07AvG2BOdgP/OcCKqd1gVXFfDKohtklO9HvEYGbqx24XUbhYdeSKc8LqlJFJUhXYzBNZwPGPrv4KS90aWiTZpj11QnRuFiGPsrKHKgSy0XLxfLjKRWW1DwPLOk29nM0xeHAf9Y1m3rgYvA/pKJKH/Dg9lwbPBlPHE0lTyMoN+Q24DqnFj0Jnarq/dOLB1lBo/fCg0gNtqsIkEygczabzgNNg1jqyPlCY1idJseYSr0TdARluy7K9hL8qM8JMy4YamUolM8/1Dw/nS0x6SRwnU8BPQD9f3gUGhKMC//a/QkfXTxKdMKht1Znm5pgfEksPOS4lX3gRvMOUWpd0G8lW1Bh0f0BiDb9GFgSWb/NPOEXqj8QqFlvaACARp4X/DA2N+GBrR82Skbxl0db8IUFd3Ypms83Pywc5EB3jgqNBm5N4Mem3RNtzAXKaz4/9ejJTNpq7w+zFT2A3Q/aJXeDWohpekZUeAaBEPSEJBGBr2tQ9jibRbeQbfL4CWpBT5nx1Nf63oCrnhw+fv6ShuXc4NiGkboG6UI5+rXiCYYL1qQCOFWtq0scDkPDdrRqYusPTAvo5edDvALvgHmvBaEL5x6NO6RtF2oLUC7UBSCX+OPvRGvxFcLqd/6hVf9FwsKAM/TcqMGUkZWSOHjrVcCFSsr8uXMSj6MSiZ5chLMIDujJn44rOwZ9BwRzrRhGEOMdUSgeS0mt7vemWN2bhMaoCrkxC8v6/itLj/qo6GRYjB9dO0rEo47vYwiIeCSdp0TR17feDxCeohNYYGnXHiDsqOvREEBszI/7cm6wbSSBqMZe1znOhO96QkfPnqBRPRXGbmYQ5GuEROr2rGU7Cjyo/fgWYdP8Piy14qKem2rG72uHMEKfW3Ao9eIkvx0AuofHoJHb9sxw/TQMbssZy3FglFjGk/kJ+nbPtfboGNkuePVIboz7jW9yn0q+gM81rPHB4P9I4Bx1qYnx6uuHl48LZuCnFgzt19dh7BiVholbWhcZOj48x01ASqM58wL9AqziJNNxXRUBoQB9PUiFFgxrBND+M8bKGLrjr/npsrp0v1GTPX+CASwJN8bHBrXfu/3s6udzDcQ+kOOiM/i2797cNlum0WeVqJcMUkyN2I2qqPkRrT8XtygMjSZ33S43QyN+QnsIgl2v0wrX4pdV1FcCsgw3mdIxf2prfoJllGNHu79yFsvH+R/Q40TYLhsSPfTLS7Tc7usIxUDdV93HsU0SA/sw5YCQA+P77ejkvDDOXAba8nh/kPOuds9x305aogs+IwTGDYOEjOBCRZcJmaUplYK6JnnYQX105T9C++oLWextKMJXSXDhgcmx8oDxC7h8vTKXK+j94Fwyt/Yg7d4pkGzcOLfWdGwYBRzBQFouQr2Ao+8YBJVl8YWLjYNSU9/0gcaDbT5kmEmB6f5s/vTyJ04NYYZkxKJHM7kljYa8I6spP+i8zyQFAXMfHN8JA181PROy7Vkcx0JSIy1rInFHUC3QZRL+IudmrcEIwuEl1qktz5MzHjfq0OTMyDjUTTmZGYHPihmKLBus6ORfKm47SILB+sZFFkLGsYYd1mNsv374zu6x5w3LnVuDji9zYZ9nuEkVF0UIMuUsegPSMdoXdIEbOpJrTMbT587BBqHN7RzImQgP5aOLRynmHNR7EjfKb/DLxW5kqPik6Lfw4ZV7QHL1UJg+EMZrwneMa9e9vqELI7gPa1gXZnmREtZFx/eayEGpzULCOcJ1TRCw2940UD25XwTTbJKQxmdXj67Yh91OlRTVI5ZfbpmHR++kcANwCyxahR4S/1V1mzbIk/fDVqab07C45TBFS5E3Kny3/Rhdr3ud/Dc1Rlzp1La7+npR2BWgeiHhgscHCXUVSIA+7v/zpnVwmrLa9vVU2aO7bzNQKYj4tFvgXtU249ba8+NgIC2aZCYS4So9tiXEwMpmWZI8v16Sg9i3YF82najfyHxoHbjM6wUz2KE+gIQyIBlQuhD6cf/XNwcVz46zC/3VDvwsTnO+artGmT1CtYr8YAuo7YGzlUOn8vYEaY5VkikBUumQj0BMxd8G0q6Ei/+JHQK3x6dtYjwyE0ZIk1JxsLIcw7lGvR7l4/j3WBy6aY3kjrL1T22sR0H93RC39NJ9OrYqGr7LE3UMxGYF2DodQMqrUkiZLgPy2e+KsDbC8byxwzaOapDlAadj5kdPcE8tDRD6rTYdSBfS/frcyn9LnclK5ttVwM7sFjq6SseDvp2K/cl2PGd6juOM6ATxIPH/CDFGKnFtmS07kw1J8o0UADcNPwPeHuJP7ChZcg3ZZGXHCs/JRgbKFw3lmQnS+tGl/5ZyxdhIlhAfy8Fh7MfH26HopT4YxhAALKGVuK8z/4sbROxaCIu5RfHKxq4B0nFx8OzYN3AbgT+4g8iM3kusBpD3xSUOyKckgTsP4rw/Hv1RrHIYjTazcFADN2C8YZmGuOlePYQHhP3JUue2XxeG9ZmzKW2jhMc+wEQzIx7Cowy8XycN50n+wh3JrXUPzYtDwcotUo1uEGXjr4Szss/zH3NzlcDuTM/MPMitLxO14BtSKXxMdF8xu+nywTx19X1FCkTIemzC8SQUSNMRDivvTggdXxUy7L9zB2MB268t8nJIkVYuoBmzpYj0Gv/O1NaPJ4CR74yZhSh9C+BvCbLtOl3orKfbNqdGaGx3sYa8QIzSesZ7NrpQX5k/DAG2DUXrG9LdGNBos6L237mjg8N2ouZLqwwv+0LpIk3S/rJoO8DX8fH6F+cE0LGhb7/rKWdSAm0gwySsNb8sIJRFg3j8KD+qOhO2Z8BV67WFF0a8NJ6Z6sAgCejgFgjztd+5w0U0jIEGIZazcT8QbOSYB5D1Qa71DoifFll2tO5zOm1SHqooRwf/sFrfedpHcYQrdzARKU56+/bn4XWIWfQtxSaVp4/owCKiWRAJPSdJhv3OHYM48LfoGHu7mW2IG0wvfoS5jxmDwiH+j8f7/y7jQu+u4NjRzEE9qJ7457yxWZnLDHx6BPTwOmaJGyPCrH9vaLkyWGqB+Me8SXwx1thpMxNBKHz5p3YQZjHFAxOl1g1OS4CImkzAzasa2i6f69PrP9Jy2V3DcUJToF4jbxby/i5sgCUEegLi4oGLDa/E91nS435piOSUg1CuAIhxEB7rdSY3KIQFHPlVO0ICoZJsIHpG63jXjgazgaKLTZv3y/ILLHxQZgxW9dag9muCkSebTrr0YsyUL6EkRU6VuaoKSANB12ne+1ELPYJ1LR8vVOZRQUQ5k6Oo0mfV7Fft8OAlWVrvrlyAn9ph1KWk4zWQT61qcqgPy9Hxqfh1Ijnj1kLYenCDzKzWdmylrWw9C4MQjx4VybhZ7OjHeZ8V3L41dAP9habSEQvXbUWDgXqeK/yqHe9NG7G+iz6oTL9rxz2LcnIMNI0D+ezqp/wUL2f9D5pFwHIS/sB+UIYYpm5C31ugrlxnWxV7oauHkmcao+NZ2wN2Up9XJxuGhwp7RmWwbTHv3gGMewsC3Xe+BwNM/9U7kB03qCYkkef+ePpj2vjD0DCfC4GOnm7d9onz7SYR+tp1xUA1c0PoFEPVsW2c8R84SBiD42Vm8e+5xnQMks48UEpa//SOsECDj++Q+cjc/+gdobsWNJ1LfK6PI2AOF30XYZ9rEVJO4v+gJ5d+SVUhwmvyVwGAgUyMm1rX9USYBE5LlcGlBffMoVXjBgyjnM/E9/3dO7SaZ8wS70x+YShd5a/eIUJqdugo0Wbyx/Ufo7+59Fy380LlBX2SQXVI91KhpKARBs4CANVn6/eY7hpNH+4LqDw3hwxPi7c6yO3KW/dtNnXtdvaO3cc7M47mtT3I/O53Hemnd4xuHuj7r//4+o+XBKSkM3BL/s5NoqS2pYOoq3vzLgB0C64ioQPzbnSaGj8T4OuNZGnxsGLMQzaz8z2wykUJsxmgHq0e1Q6FLIClG9GuT8gKspz1MLlo/naHy0cXj5I7Hj267/VNViWlE/b3m8qqiHL8pwDA5MI0nUgYDR04cuTZ1AZL7I2AyXi67UEc9DrKMg3aEWXALqmsAdfdnzBOPGed6+SD+JkniKbK7s02o+mHJcHDR8wx1ta3bX3uoV5qrm7t0r3TU/0wDEN6AYvH7UxYhjP9nMhVg/aETTteBeL+XhV+WGOwvY6AAWEBGuh2A0dIBXUi4ecNMYrza07XS/1Ugj8siNnncoM97tyOhlh9NkNCEFc227sAkEbfF6hc7jOWbXs0IV05/+G7rdfcSjRu6RTYEzVK03OEd4LcXgyqRJ/3aKgPgo30jHr2gru2o9/9OP+V4BxQ65Rdl3qdF/DzujG2G3il4n4XAPy1SjgjY74lgc++E663Y0Z7ZPOXG93fAx26vW8d94hAd8UwiVFzUK/juRKaXxXMgc4gPwgzeUIyxJB7fL7/BTWzp7iHfcs+eHtxKGG/stvRgmGhPwWAjtD+UZMl8qfMbMGs9jT0gqTPgnhtV0nXhoBH7a+mQ+ga0vTsMRLqEpII2xJr11HW/YwzaUpoG9wsx/+A+uP6iRpLuppSiPfFxPCiFcTCyPbITwFg+sjnhcqyu4aPPCHzjVsQnrhOd9n0tmHE3Pi2olqAjsB4iVxSdHaaAdJeWkrt3WFcKAHKHshamVBFlo/r/+4gMYqa3qMFoWiO4Ped7HkGMPdTAJBMIch5Ds1RA1APzJ4Q7SNSQNOxJjSvYZ85EAInMskBnsSL4LZJFaxFxzhYyfhJctXECjSoE5YqeZ79Yh/Pf4vLvNMaLyOJDXiw3dHcO8YyUn4XAKqLAfXiGdbhTzfP7aJo75PVmFWO814Ip2sE9A27mqXjpyjkvqAspYifMhiH/Ncpz0MH9zoo2ZA7lxxRMz69/jThKfoliPnUYjbuF0I4Af1coBQfswBwtfWayeyrZTzquu1T6bkQkILY7Nor02pz8MRwjIS4CN8lPCYZdHszP4yjCKx8TgYpcDcRYpnUAn/u4+k/1GGkaeREE7VXbAh/khYBob3wiFiXnwLAWto+O3X4nSmka28DKSNX4cjNU5purmNSvXj0lHtbwHNYdjGkrDk1iRFfrBqsMEvpGPXBGIoRttWZN9o+ngBUcKE1h4u42bSkbBozpVP8Itid6kzuvYhYkOqF552rW+E1bfah+A4Mur9RAD0idX32kcZwz5gqeI1i9tWJuu7jl+MjaU0rs/lAu1ohkAn+t8+ufmrg0lmU3awVGJGhtNIkHj81ipWgbQZ06nWIXSCHJY5AjvfdhToONGg424O4mKG7dHXsFzPAO/oKzpFPpDFBL3KLvwS+mQUKG8YRz1IqNcDH+//L7GncJmojBFkeMjq6JFoIKGGtZOZA3z4negqeFAaE10wQrK+zrNsCF+uHtqm9NlqQ0cA4fGAbxjbdIgLljFgBMd9fgA96BScQDe5GLan3u9GP+z+w+lheAvILQTo/MQiiBzvYzGgvSxieVkIn9QcM/HZPbhIfGc8ERlPygrzJDPUGxqTqsO/M3lF7PWtoN5nAF03lr8B3WFH5cPxcdu/Nk85PL/+2LsX22vG5CvSNTjO3zUhLUvDJbIpLliKbcR0P8pQeiV5X3ASzaIG8MXd0+R7joAtoQAcCp6zRM/BlEh82/k58lpIXtsGpi0k7ee6P8z8fAzh0WwaDW+khkQv6pbUkLB/Orkytt2WWIo8FeqblJUnehkHqa9zMFxFS5GwhM3X6OODagXkT3+s/E1+eV8XpvSmDQWJD0vXp9U/5IXJ6v4RhoqQ1U7HNbtaXo7OIESPCFDz9NDN5j9w2IqoVoNJS/erR9N+DQ4GCUQTlvyY+uFuPvCMKQgBIzce933t2oWXgBddrT8PXVMlscSiPVUgD8M21aI8PDLvdlDgQuixAdLC19sjD1YJM23twCLQZlfwfiS/YKstMIo0UZF95DB/vf59rLDTuC0fMlv3RYkQ+LMHPLm9rEiL9RDuGfDeWWy4VHLVE1kPtF0GcnxHkI4lpx+bpbP/8r4nPn6FJ1qzQFvII4vPeH0S/cb1dK94YZUUJlfKWX6stLaCZg6YL2rBjqRybs+jngF74v6VM9BKYcbExfhHrEEOQ30OT/5T4nkOTOaGOCGdOjRHk8/3/+xqT9UjIBDhCFmto6uerSsGOI1qkLWD6VoFvp5lNy2EgOXIYERckABPu1boUA1otvGjza2jyHwofP0OTJLcJ+16W8XTEj/e/OWQokTgWUN2FXdq2mqPXd1sSogF3bBjpzzu1jGSV1G6X14b0b85Lq+iNZPkMSBqm3oQoRPqvha+foUlu/EnMIE3v4/xfKAD5gbwOGfAanJIY7vA1KTYSSC/29cxZzTGHuCCxUVLmjGsfLG7L1vtYSL2tBsqJ8A6Rg8rLPxQ+/xiaZGaTBAHnJjazf/z8vV5FfxVKlm2LEhSq6XTeyHulQ5e1m73MQ6wCY2C97tkwyoV2HjUdw8J4POSD81w5WQK33f9j4fvX0OR9MdowNiLXtCHWj/Of6znqZGw6J5YM+zFIIsE8SE62AiZdC8Q1z/aPNrY5xyEWSe0xOyKQyR747ll4Qc/XSy2XefV/bXxofx+aDGQcDaIiXfDP1//b67kIVbkuYWurZ2JidzI0rI2m/ZiDwGotuSBRDqrMwgBPZJYt1gTWwTpOihQJZEenl8ulTdn+pfHl+PehSQlW+Ec9s1f4fyEBcjbpm3fRSDPzsRi7FvvScCLxHdfbixcMAbmhgqMjZzYqeKU5H/CuhO9re0iQrjxXkKj2CO3cQhZR341P578PTVYEEfmFe0to9Z9ePMxGfxWJVw0dPOS1TMCGx/06dyR8sG9ZgJwtUV08E8qrzdoh4SHlnrn78EbPHnFAEH0zZqFS+CUdu5iNbxXEvw9NjqPQBnKvRPXy8f4PK8tOfOxZzVn8mY42/Wobl3IDMdExFWs0+PppJ1jJGfxmg1w63GWu3rz3INx+uVA5muXSMe3fjY+zCvYfhiY3jjhRoWFwZfXH8e+G6PaINSA5b3OmTdp5lwn1SwQt0dt1iqR1Fjnm3AdCZHg3SIdWmb7W2CamXw+or50hQ/KjbAEYZ0wOIP8wNImxf7d5U/cCpX18/nHZs95r0PDsAdn6zGKuczoBZronL9D8gsAOHeO8s0Ah/l0luYPceiPXPcRKpHPHYDOXf1cgZXo8jVBJR/IPQ5OCrvswqEDoNO3H+78LA9XeHvs1uAI1Z7WVeP9jju1Uv0f03PtVGfQjr1LUG0NDxj90ZHjHHPSG+ExgjMaBOKf16+lkZ3NU4j8PTTZ9LAwCX52akyAfllyCa9msBN74nmx0zoRsr3OgizptIjLX4zW3YgFlXF0IXPIMy5vc5Ht4Yd9Mb7mLUdN/bFB3SzeN7Ok/D03upYkAXmEs1R9f/mxiKNTAMYc/8b/rgwbt8w7PM5MdhN2MXjei2/Y68BCFy96Dw8NeunVzrM+acUK5OCrBjehogEd4jB+wWf4PQ5NtNQKDTX7te1MfZ8A5buiRUliWHUN9W/mrixefaAdPznRDm5cxI1cz6Acqmvs6O70mXxiHRxTb24K0JpxIfInd0ODB6DWCTJGJ/zw0yYPv8lxiBab7x/u/hhGXRD9dZk17VjYqglPkPIeb2dtlmY0wLKAhq9gNQbTL2L685/aF5KH2jEu4CJ9tpJxtncHG343DcoudvU/3b0OTraSa/LwyiQoIH/d/1uEjg8NwJyS0RpDLv0Ah0nswnhdWhBGmWVep2MJvZa0sqYonqotIJ7q/92Dncv0xzuLa6BWDI5rNvw9NUlOWGt0QE1m6j99/klpCHdBoxHyWeLK3SPNADTbbWXppVx9shHdRE8EMERzhfYJ5cQ8Xc+Ct7LMhYKuzH355I6ItTxjdC9WRqva3oUmiWJX3kG3WyxEUf7z+B/GozHnP8YHR9Z987/wqMG9AooEbXduTiV4oYFAPEcpx7avCg3a2rWVmtwHpz3buJ5pPQT1CgPsejIPdgnDk70OTSiMKvKgQDNaeno+n/3GV5jWxDVLRw+4XuoDrgXdWJu2FKQzUqYPZbkBwb++N57Jd3cx7M6x2tjoL+g4Yx/q1ht7DWZHozWYqYVfv0l+HJicKSmswbqWJoq9EuHjoj/t/C5RcL0iT3MzJRAzhdQPOcQ9allzajEcr5ZW1WAt/7FqlVD56JxE3+VGHgXERm4S5jr65yYztAiNL4lIu8i9Dk7sHVtbcZ8dR18isqOXp4/MfXAviEOxguLc/ZNzbFzF5s5TldU3bNsa1OFpYXTjD+F5whap3UesWRb7nDSYI74yHrTEWZnITUpoDwUtp+/Hn0CQQR6QWzhPT8NTdnJ2P28cB0JUYHoyv8GgzJ4HArsL4lLeTBsd7vBwUAbGaHh47O9Z+RqD2S+4zN9BrmhSWzHU8CHD2tWTKjuXoiCtDqH8ZmqQImQyNUuEPkfdNernGj+e/NxspbgDSgAip5gT21CBsRQMORx0bec1svYc6EsyR/0mN3u2Sbx+xQuw8QVyOjJpcNo9k8Oj9RqbgcR/gz6HJhVGJW+K1MTxrqO7dTsM+3v+XUyV864LO0JXvcwFUdcZsZcH1kmKaQX1BuOvm7RaezbT+MeP9GzDAQXsfyUv5k8qYGxTTurx0atEH8sfQZBZMST1yngkRD6JQUmfz+8fzX0xiuFKzo+kNxZ7rEGw/q+KQlJ4pIbDWW6uJRsLmCG/W5wt3aSYCa16UQ1YodEBw/Fcy0/eyDvN7aNJ4gUiXR1JusgTNiYxlEQRDYvp4BdSJsIGq6TZHwbOp9x2RrI1RhdZkMjdczNirZJxTkRvJPVy7RgKnZiq8MOmRHQPbowDcDk9QA5D6xzUocoRa35kTeFGREFoWPgilfkegQWUeTi314/n/aln03DeX0r5uO/puP9O5IlC3r3jSfRaHt5UaFhAdL+BO5PYYAN5XOt2KJrSX176G2Tp4IgzqraXRgxA7hsRS5xTtjpS5FwyBrmPkm4XRmfWx8dwV/fz9F0VsbUfCp2E9jwsXaAjyFsKoQkdf5nWFs9dZblrsq61GWXMg9FXptSIVek0bJss6y91HbrgBz3XtLvVEWIkag8k1WG4UHJrBofYCmzvefbbUqyVYTz+9fjIm+d3YHO64B0ZyamqiERiiHYU4iJsLeUHKxuQXKrFXEAkRobMTiYCp0hBJkNIRmPcEkzkvuad1gmIp9YFas2wYOusMc+G8DrkgOLIINcDASvWaPn7/abSBnIGQ0POYSTyQa53tDsK2DYjZpONeolPXeJpbi+gHstZzDoCtR0QXuOEWwOMohgAriZciRaO5s0hu1oZBX5vhXEawC1r5vdkZJdLMG4uSxNI/3v80YLUErKx3ndceX3vZN6EcHBK5ECL03TCrWe0G8a5Ak2Z9mKW2yf/nxVBFaq9tyNp2Ou9RyB4diL8E79Leck6+r1t3zPSdeuAq9rGKNRwIi2M/omofn//lGJSslGadN7W1lz9LX9EaUJ3RJywgc1oob1QNfJHqw5NcLSXq6JSS+2iEkux5g8H4xfPKXAljSy8XCcunWUfUu9qQ/oaNEtF6JmMiDCrHKCzf0X/c/7d57UWfcSiaeQeYW/W8shxxYOVhoDdYxLzd4H4Q/8H+pL5SrqXQL+bJe2iSaIXxzCKmZ/jDGhE9dwiYjvfdoPvVl4iKhD/60+n/zLaRdRJOHWh73GcXD/P6P3Rxqp6Ibe0s5aJ1olv3WcLz2m90/wahK/SAFCGraGba5y4yXezduT+HJpWcd0HhUoi0vkbDxL7rtr4RVWWtgqsHJf2dZM/LbAIbs2n4gYva/nH+l01zJuc2mVibdxYtJs4eFlntvoUzKKWtmUc5kax7Y9eBzNasx78PTebdO6Oirekcdt7w+oBugSKXzggB7WK1HbkpBL08g9e+zdzxh2Vf8DG2FR38nHDo6PfnfferMTH03UYjkd9ZWIOBcBWkcRQaXZfcc45/H5osW8IlKiYcoQaxQIMdRLxm88PSuUGH2Zlmc5QMvcssqIPePr/+M1nPHNSVFwg75zojaEVMrNedWwFST2SLyhFeR+maQY3LqWbfflkh/cvQ5EXl6hjxCG4Xtw70/DCvfsXgL6tBDt3ygQqWS+Vt94IBsRA+Xv/dV1micYYitQESE6XiPBgI0YZGirLO6ypjB7m9Ohp423eEfKTNnnetlyX9ZWhSZ7Dl2PoB5tzmZL8557T8zJWqy8N2njPAdg1EZ5mNaOc+Pj//8jPpiWifWURrkGdD4ygDyrkQwoOq1JWN9NdTyQG3hqzUnHzoDREyUcH8OTSpKPG9P09HFJVRMzSFDWbrY2OztlBvcANUgFlhg5ZXKKM+H8f/QK1041g0iGDwTEem2Z5wlQiLyYTjYe/jmsWwbB5cpFs5gmP7Mjbz4lUOfwxNNmYsuoryvMsAJ5sXpBGFBp5D0NbxNPhpPET3bgSy76Ej+Hj8l9CzDUh6Nee+D1uqCrJfqc/Bt+gbtFF0nMFtiXZOy0NfzPFgoId46NH84n4NTWIIDXMAFtcUUEV4u4bH2Ic74sD3Y1fBF4wqblwCmNY/mf+P1792gzpPCPWxM0Bmvh+DwtJSzybGZdvy9fMdFe/HbQWWW23ZnEMHhIfqNWYXKPwMTdbk1tlOaQO/jllY0HjQqBOl5tU9pzQKecRIGE+RPOSeMHyaj+d/HBMz9KXMEAjMW//2Qgk6f2QxkSJa2U8kK0t492nMkj3vc5jlSrj+gNRnpojIDAV+32lbUnonhhi8mgfGRxWeI692kZd92j6lP1d+cB+vc8+gP57/a7PeQffXS8NyxbXExc5rQJZJ8Hw+Xnjwc7g//VzV8GAsRBvo5PXMkgGpjLCO+zWvB+mdVwMXj9v8yV6jE+j453cLgETTGbVNB4jhFvhYZl84PCV8HgATOF/smYlwElDzMYaF4+6EV/7AbG3fg5iTimY/NJ79vLs6vfLMgQ+TX6PUlHYg+48d+03gO2ueOnDN1n+yHw7iHI1f1vnhc2rYjnF3XSRGh6N9HP+iFbt5qw3X1/ssYhgn1eiwTofO/j3Ub7n21vTUMCwK9ajH/7q74n6Wxk2LHoPE+wpZlVK0iaU04jYrIY+UfUB+dYdqsGN0nUPU+uD1UC7FWSj9eP/Xjo+gvdd6tT83EjDGV1hG3KO+bxsDjBu9t6+LM3oOi4GKgDAIf7AWrhDBYzioUqPqR7GiZx+bMOD2EwwCplSXVesa+PKEvbsEi513rSIvNLPe1o+P97++7kO+UWBbBXtPs5MEumPIbq9dlQO2K5V723ut57ze1c4LThEhgTOVgTyu3sdW7YLseXjpLCFDCuaZYrIuoOoIbGbW1+XB+CcOhNLBXCDXn87P7ePrZ3UsEM68t7iady0vFvTfM9ul+brx7U6w7eJYKJtjDYOO0+Jv9U0RRPCRc8oZomG3I/wjMHtjDcHIwPAltXVEV0NCAROlWoBB6c1aNrss2I/n+3j9CyhaJYextdjnd4DRwOGKSGIGaFRiMvn+PCT3xipjwLzmCG5r97OUX/fXkJXwq9D3vyN7RCtCEDyZIeLH/FMvvGf/A8OPYPg5lK0uXgddn4/Dn5nGQ+3MKz6Z7DPvgyuVBf01xutdpAZxnYeExHCmaicKcq85tbxGRMisKX46DOPoE7qflzlHbdzsk3gykqX5LT9zBpZyYUcieXZVs4FwYTtSDw8Cq+fj+PfEg5wXIMxBn1wmF/q5kwr/P40jxAfsbgnb7TDaZWWNvbSTZH5vknHltq2vIQAhx7JQXkgpPr5vtevIkS6uxLwIkdS2PUh5uxk3tFO0LU0CvQrhP97/9Dh5o2O2zhGZ36dxE4R83CMI3jUi+TLQkQuHbLVtI5f9VYnRyg677P1l/M6kzlaGzshiF02QFIOkzZgF92pBzGM3Br5aHwrkXT4LNL1nYvYKxBX98fVzCTJXUnMVS2cD7TbeCObnDSdzOHEfG3rxVFRblFKbW3fEAM0pSYuXOfg1eKWO3Fdq/doNI5Qhbk4relCSxNqUE+IJwUsQZ+Kywd5URYwsB8IBwfnH6z+zpXvpXlJ/qETdpT20BFKldV56w65jr5Kns8wHpSZEDrwEiSdpNzT4UxXLSr0c35SP7SZIpeZVqRtH4LscWxH7guFjcgjDzaaBijz6kouhHte/fh7+iTR92oUYnu1oorDOO6/88mxwQVrwtCWSWNRaFjt0rlE/hBOx9/cdDp7zeZnvazErxrN1NsIdW6upzNbohgzhRPWZYzS/xpza89DdKmSElUIjIX3e/2U+x3NhbWihuf/qRzNjXuce5pc4dTnzvLWVG+K4iN+Cz1XpeYeHQjtmCyJZkGk91kSnCz3K4hyCwTSR7YomoY6S3td8vkP9k9Izu8T3mmdd2H78/ptXZ2oGaFNJWFUOk5EiMUE1Rh5/cjQG1xJ7/OHc60Hkl+lsap93uFTwzuGW3XQ2PB3vL07BoCCNXPuk9fOrUqV0x/sOmGF8DMZpqMzNPolULppXbz4+/3iMlc+vvFm85sh757e3AG0sB0qye2dnfcl2finqXQ8X0eZzIT93+Oj3WJuJgebomB5Hl0awpWwhN46GVZzWfENu4RZm77OFOi5AbXElrsHoh5Sxf9z/01IGF3U/By6Wjzqv6GFC67zWuszMD0UjRxyDZyd5WKtE5f91h1NXuuSZx4pEKYyYMjHX0bUZiVa1iGFnV6zgUI6zsnGNveerz8iSzwsDzRZzlB8/f8K2lUDlZyIpqu2q56lzXNZU8uL0e94B6qtmM2f3iW8C0f7PHV4Qdzpe67wiAJXde7kYqmQjsxUYIc+GdOB9qSxuxnlXRkt2CI/ChFiUEjSWg3w8+41CKwSg6K7COIhpPY8tO7QIs1gJNRxsPS94bOrzjneVluX3HW6zXewgChngK1Pb07wse9WeAK8v0JTiVgCh+7srPDwN2MwIpK7AbyAen+Le5+jUh2VOcPleT//+FrzZ+Y5PdgtxUrYgoxN3SAFGM/vdgd89b/2PO/xgfmuSUs8Dd0Pfz+2ylHXCpuMZa6FqRZgTfPuJcc+pjtQUBIJLVizPC+DPKj/e//54a+HcfVGQeMFVuekTBpwvTdv83gPEwuGBPZ0LpNWwcP2+yuY954qQCB7OXnj6QhbLj/cX3tpLeKun00DwW5DyzkmZvtRZQl0WVKqm4p6QB5mP5//60UtxBckuAuG9gFDW23cb/7zD00FHXPSaV8LPi4HY4jn54w7PMlMes5flQVzok1lcnN95Pceo8Edq977M6cf11aLCTe5AGuKMdNSCtoR2A0R/vvyDDnrOK7LZzEIOxLpct5+s/LzD1ayF99nrNsvba5k2TP64yqbaUt9fcv1unWx8VUHPrxA8EQqiuct8prIhgrg7uhLBOJlfMdxn6XPejfnGQ5+H/7/kIAs+6lZCiX7mLLa5rhmgy5hf/yZmmeTVanDxL1fZ1I3Kd2EA+U8gvJqwSAwSM8nb+/6+AUlgmMjyddj5Fbv1uDHqzaTJ+7cIyM/3/3/lK1/5yle+8pWvfOUrX/nKV77yla985Stf+cpXvvKVr3zlK1/5yle+8pWvfOUrX/nKV77yla985Stf+cpXvvKVr3zlK1/5yle+8pWvfOUrX/nKV77yla985Stf+cpXvvKVr3zlK1/5yle+8pWvfOUrX/nKV77yla985Stf+cpXvvKVr3zlK1/5yle+8pWvfOUrX/nKV77yla985Stf+cpXvvKVr3zlK1/5yle+8hWA/wfdmhmZdymm9wAAEe9JREFUeJzt3WFu8zqWBND0rCn7X0H29M2fNpLxWA4VSrq8qnOARhroVwhJBFS1nmn+59+/fx8AQJb/qR4AAHA9BQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAI7x9d///PWfk5/LAzspAHCsdw+n0Qec/N/zwCAFAI7x+eO/b/0/3Ff/rPwxeWAnBQCOs/UQG314yc/lgR0UADjW59PPvQ8v+bk8MOg///79qx4D3NXsw0t+Lg+84Q0AnKP64ZeeB36hAMDxXj289nyCXX4uDwxQAOBY7x5ee4/Bye/PA4MUADjO1mvr3464yR+TB3ZQAOAYq5+Tv3se2EkBgGONnnOXPycPDHIMEAACeQMAAIEUAAAIpAAAQCAFgLuovo9ePjsP7SgA3M3oOXN5+TPy0IYCwF2sfk5d/t55aEcB4E6q76OXz85DKwoAd1N9H718dh7a8EVA3Nns5i0vP5OHpXkDwF1Vb/7y2XlYngLAHb3avPd8gltefiYPLSgA3M27zXvvMTB5+b15aEMB4E62XtuOXiUrLz+Th1YUAO5i9XPi8vfOQzsKAHczes5bXv6MPLThGCAABPIGAAACKQAAEEgBAIBACgCr+PoYP6e94qewZ8dfna9WPf/qPFxOAWA1o+e0VzU7/up8ter5V+fhMgoAq5g9p11t9XPq1m/tPFxOAWAlW5tol81zdvzV+WrV86/Ow6UUAFbz+fSz2+Y5O/7qfLXq+Vfn4TK+CIiVdd88Z8dfna9WPf/qPJzKGwBW1X3zrH54WL/eeTidAsCKXm2enT5BPTv+6ny16vlX5+ESCgCrebd5dthEZ8dfna9WPf/qPFxGAWAlW69Nu1zFOjv+6ny16vlX5+FSCgCrmD1nXW31c+bWb+08XE4BYDXd72Ovvo/e+vXOw2UcAwSAQN4AAEAgBQAAAikAABBIAeAoXx/j56R9Cvr/m12/7uvfff7dx08gBYCjjZ6T5rXZ9eu+/t3n3338BFEAOIr70OdUn1Ov1n3+3cdPIAWAI7kPfU76ffTd5999/IRRADia+9DnpN9H333+3cdPEF8ExJlsXnNm16/7+neff/fxc3PeAHAWm9ec9IdH9/l3Hz8BFADO8O5KVH43u37d17/7/LuPnxAKAEd7t3nZxH43u37d17/7/LuPnyAKAEfaem3pKtQxs+vXff27z7/7+AmjAHCU2XPO6c4+J776+neff/fxE0gB4GjuQ5+Tfh999/l3Hz9BHAMEgEDeAABAIAUAAAIpAAAQSAHgKKP3lI/+c2lm108+Ow+7KQAcbfScM6/Nrp98dh6GKQAcxX3mc6rvk5fvnYfdFACO5D7zOdX3ycv3zsMuCgBHc5/5nOr75OV752GYLwLiTDavObPrJ5+dh7e8AeAsNq851Q8P+d55+JUCwBlebV4+wTxudv3ks/MwRAHgaO82L5vY72bXTz47D8MUAI609drSVaZjZtdPPjsPuygAHGX2nHO61c+Zy6+dh90UAI42es6Z12bXTz47D8McAwSAQN4AAEAgBQAAAikAABBIAeDh62P8nPLWp5gr89Wq51+d7656/arzBFIAeDZ6TnnVfLXq+Vfnu6tev+o8QRQAHlY/5/xbvlr1/Kvz3VWvX3WeQAoAP21tIqObR3W+WvX8q/PdVa9fdZ4wCgDPPp9+7t08qvPVqudfne+uev2q8wTxRUC8M7t5VOerVc+/Ot9d9fpV57k5bwDYUr35dN+8qudfne+uev2q8wRQAHjl1eax5xPE1flq1fOvzndXvX7VeUIoADx7t3nsPYZUka9WPf/qfHfV61edJ4gCwE9brw1/O2K0Sr5a9fyr891Vr191njAKAA+//TvD6nPKq29i1fOvzndXvX7VeQIpADwbPWe8ar5a9fyr891Vr191niCOAQJAIG8AACCQAgAAgRQAAAikAPDw9TF+znjrU8jydXl68/fD5RQAno2eM5ZfM09v/n64jALAw+rnlOXf5+nN3w+XUwD4aWsTGd085Gvz9Obvh0spADz7fPq5d/OQr83Tm78fLuOLgHhndvOQr83Tm78fTuUNAFuqNx/5uTy9+fvhdAoAr7zaPPZ8gli+Nk9v/n64hALAs3ebx95jSPLX5+nN3w+XUQD4aeu14ehVovK1eXrz98OlFAAeVj/nLv8+T2/+fricAsCz0XPG8mvm6c3fD5dxDBAAAnkDAACBFAAACKQAAEAgBYCHr4/xc8Zbn0KW/3u+mvn3nn/176chBYBno+eM5c/JVzP/v/1vR+VnVf9+GlEAeFj9nPvd89XM/1vH+Vf/fhpSAPhpaxMZ3Tzk5/LVzP9bx/lX/36aUQB49vn0c+/mIT+Xr2b+//dnt/lX/34a8UVAvDO7ecjP5auZ/7eO86/+/SzOGwC2VG9+6flq5v+t4/yrfz8NKAC88mrz2PMJYvm5fDXz/9Zx/tW/nyYUAJ692zz2HoOS35+vZv7fOs6/+vfTiALAT1uvDX87YiR/TL6a+X/rOP/q308zCgAPv/07w+pz0nfPVzP/bx3nX/37aUgB4NnoOWf5c/LVzP9v/9tR+VnVv59GHAMEgEDeAABAIAUAAAIpAAAQSAHg4etj/Jzz1qegZ/LVus+/evzV+Vnp4yeQAsCz0XPOZ+WrdZ9/9fir87PSx08QBYCH6nPy1brPv3r81flZ6eMnkALAT1ubyOjmMZuv1n3+1eOvzs9KHz9hFACefT793Lt5zOardZ9/9fir87PSx08QXwTEO7ObR/fNp/v8q8dfnZ+VPn5uzhsAtnTf/GZ1n3/1+Kvzs9LHTwAFgFdebR57PkE8m6/Wff7V46/Oz0ofPyEUAJ692zz2HoP6S75a9/lXj786Pyt9/ARRAPhp67Xhb0eMjspX6z7/6vFX52elj58wCgAPv/07w7PPSVfrPv/q8VfnZ6WPn0AKAM9Gzzmfla/Wff7V46/Oz0ofP0EcAwSAQN4AAEAgBQAAAikAABBIAeDh62P8nPPWp6Bn8tXSx989D+ykAPBs9JzzWflq6ePvngcGKQA8VJ/zrpY+/u55YCcFgJ+2NuHRzXc2Xy19/N3zwA4KAM8+n37u3Xxn89XSx989DwzyRUC8M7v5dt+808ffPQ+84Q0AW9I37/Txd88Dv1AAeOXV5rvnE9iz+Wrp4++eBwYoADx7t/nuPcb1l3y19PF3zwODFAB+2nrt2uU+9Fnp4++eB3ZQAHioPuddLX383fPATgoAz7rfhz4rffzd88AgxwABIJA3AAAQSAEAgEAKAAAEUgB4GL1nfeufS893Z/0gjALAs9Fz2vL3ZP0ghALAw+rnvFfPd2f9IIwCwE/V97l3z3dn/SCIAsCz6vvcu+e7s34QwhcB8c7s5p2e7876wY15A8CW6s2/e7476wc3pwDwyrsrWeXvz/pBAAWAZ+82773HwBLz3Vk/CKEA8NPWa9su98FX57uzfhBEAeBh9XP2q+e7s34QRgHgWfV97t3z3Vk/COEYIAAE8gYAAAIpAAAQSAEAgEAKAEcZved965/rngdoRQHgaKPnxO+aB2hBAeAoq5/TPzsP0IoCwJGq75OvzgO0oQBwtOr75KvzAC34IiDOVH2lbHUeYFneAHCW6odvdR5gaQoAZ6i+T746D7A8BYCjVd8nX50HaEEB4EjV98lX5wHaUAA4yurn9N1nD/CDAsDRqu+Tr84DtOAYIAAE8gYAAAIpAAAQSAEAgEAKAEf5+hg/Z7/1KfyZ/Czjrx0/cDEFgKONnrM/Kz/L+OfyQBMKAEepPqc/y/jn8kAzCgBH2nqIjD48ZvOzjH8uDzSiAHC0z6efex8es/lZxj+XB5rwRUCcqfuVvMY/lwcW5g0AZ+n+8DH+uTywOAWAM7y7UveK/Czjn8sDDSgAHO3dw2PvMbS/5GcZ/1weaEIB4Ehbr41Hr9Kdzc8y/rk80IgCwFHOPmd+9kPI+OfyQDMKAEcbPWd+Vn6W8c/lgSYcAwSAQN4AAEAgBQAAAikAABBIAWAV1ffZV+dndR8/cDEFgNVU32dfnZ/VffzARRQAVlF9n311flb38QMXUwBYSfV99tX5Wd3HD1xIAWA11ffZV+dndR8/cBFfBMTKqq+0rc7P6j5+4ETeALCq6odXdX5W9/EDJ1MAWFH1ffbV+Vndxw9cQAFgNdX32VfnZ3UfP3ARBYCVVN9nX52f1X38wIUUAFax+jn9s/Ozuo8fuJgCwGqq77Ovzs/qPn7gIo4BAkAgbwAAIJACAACBFAAACKQAcBez99l3zwPsogBwN7P32XfPAwxRALiL1c/5n50H2EUB4E5m77PvngcYpgBwN7P32XfPAwzxRUDcWfWVuNV5gE3eAHBX1Q/f6jzAWwoAdzR7n333PMCvFADuZvY+++55gCEKAHcye5999zzAMAWAu1j9nP7ZeYBdFADuZvY+++55gCGOAQJAIG8AACCQAgAAgRQAAAikAMAxvj7Gz/lvnQLonAeaUQDgWKPn/O+aB5pQAOAYq39PwNl5oBkFAI6z9RAdfXh2zwONKABwrM+nn3sfnt3zQBO+CAjOU30lcHUeWJg3AHCO6odvdR5YnAIAx3t3pW9CHmhAAYBjvXt47j2G1zEPNKEAwHG2XpuPXuXbPQ80ogDAMVY/p392HmhGAYBjjZ6zv2seaMIxQAAI5A0AAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABFIAACCQAgAAgRQAAAikAABAIAUAAAIpAAAQSAEAgEAKAAAEUgAAIJACAACBFAAACKQAAEAgBQAAAikAABBIAQCAQAoAAARSAAAgkAIAAIEUAAAIpAAAQCAFAAACKQAAEEgBAIBACgAABPpfROxSL+da56YAAAAASUVORK5CYII=')`;
		var move = function() {
			if(OWOP.spawnbanner == false) return;
		    var sc = OWOP.camera.zoom / 16;
		    var tx = ((-OWOP.camera.x - 16) * OWOP.camera.zoom);
		    var ty = ((-OWOP.camera.y - 16) * OWOP.camera.zoom);
		    if(tx > -512 * sc && ty > -512 * sc && tx < window.innerWidth && ty < window.innerHeight) {
				if(sc > 1.0 && !ismag) {
					ismag = true;
					elem.style.imageRendering = 'pixelated';
				} else if(sc <= 1.0 && ismag) {
					ismag = false;
					elem.style.imageRendering = 'auto';
				};

			    elem.style.transform = 'matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
			    if(!shown) {
			        OWOP.elements.viewport.appendChild(elem);
			        shown = true;
				};
		    } else {
		        if(shown) {
		            elem.remove();
		            shown = false;
		        };
		    };
		};
		if(_conf.EVENTS.camera.moved) {
			OWOP.on(_conf.EVENTS.camera.moved, move);
			move();
		};
});

_global.eventSys.once(_conf.EVENTS.misc.toolsRendered, function () {
	// Cursor tool
	addTool(new Tool('Cursor', _tool_renderer.cursors.cursor, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1), _conf.RANK.USER, function (tool) {
		var lastX, lastY;
		tool.setEvent('mousedown mousemove', function (mouse, event) {
			var usedButtons = 3; /* Left and right mouse buttons are always used... */
			/* White color if right clicking */
			var color = mouse.buttons === 2 ? [255, 255, 255] : _local_player.player.selectedColor;
			switch (mouse.buttons) {
				case 1:
				case 2:
					if (!lastX || !lastY) {
						lastX = mouse.tileX;
						lastY = mouse.tileY;
					}
					(0, _misc.line)(lastX, lastY, mouse.tileX, mouse.tileY, 1, function (x, y) {
						var pixel = _main.misc.world.getPixel(x, y);
						if (pixel !== null && !(color[0] === pixel[0] && color[1] === pixel[1] && color[2] === pixel[2])) {
							_main.misc.world.setPixel(x, y, color);
						}
					});
					lastX = mouse.tileX;
					lastY = mouse.tileY;
					break;
				case 4:
					if (event.ctrlKey) {
						usedButtons |= 4;
						var color = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
						if (color) {
							_local_player.player.selectedColor = color;
						}
					}
					break;
			}
			return usedButtons;
		});
		tool.setEvent('mouseup', function (mouse) {
			lastX = null;
			lastY = null;
		});
	}));

	// Move tool
	addTool(new Tool('Move', _tool_renderer.cursors.move, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		function move(x, y, startX, startY) {
			(0, _canvas_renderer.moveCameraBy)((startX - x) / 16, (startY - y) / 16);
		}
		tool.setEvent('mousemove', function (mouse, event) {
			if (mouse.buttons !== 0) {
				move(mouse.worldX, mouse.worldY, mouse.mouseDownWorldX, mouse.mouseDownWorldY);
				return mouse.buttons;
			}
		});
		tool.setEvent('scroll', function (mouse, event, rawEvent) {
			if (!rawEvent.ctrlKey) {
				var dx = Math.max(-500, Math.min(event.spinX * 16, 500));
				var dy = Math.max(-500, Math.min(event.spinY * 16, 500));
				var pxAmount = _canvas_renderer.camera.zoom; //Math.max(camera.zoom, 2);
				(0, _canvas_renderer.moveCameraBy)(dx / pxAmount, dy / pxAmount);
				return true;
			}
		});
	}));

	// Pipette tool
	addTool(new Tool('Pipette', _tool_renderer.cursors.pipette, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		tool.setEvent('mousedown mousemove', function (mouse, event) {
			if (mouse.buttons !== 0 && !(mouse.buttons & 4)) {
				var color = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
				if (color) {
					_local_player.player.selectedColor = color;
				}
				return mouse.buttons;
			}
		});
	}));

	// Erase/Fill tool
	addTool(new Tool('Eraser', _tool_renderer.cursors.erase, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(16), _conf.RANK.MODERATOR, function (tool) {
		function fillChunk(chunkX, chunkY, c) {
			var color = c[2] << 16 | c[1] << 8 | c[0];
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			if (chunk) {
				var empty = true;
				firstLoop: for (var y = 0; y < _conf.protocol.chunkSize; y++) {
					for (var x = 0; x < _conf.protocol.chunkSize; x++) {
						if ((chunk.get(x, y) & 0xFFFFFF) != color) {
							empty = false;
							break firstLoop;
						}
					}
				}
				if (!empty) {
					if (_networking.net.protocol.clearChunk(chunkX, chunkY, c)) {
						chunk.set(color);
					}
				}
			}
		}

		tool.setEvent('mousedown mousemove', function (mouse, event) {
			if (mouse.buttons & 1) {
				fillChunk(Math.floor(mouse.tileX / _conf.protocol.chunkSize), Math.floor(mouse.tileY / _conf.protocol.chunkSize), _local_player.player.selectedColor);
				return 1;
			} else if (mouse.buttons & 2) {
				fillChunk(Math.floor(mouse.tileX / _conf.protocol.chunkSize), Math.floor(mouse.tileY / _conf.protocol.chunkSize), [255, 255, 255]);
				return 1;
			}
		});
	}));

	// Zoom tool
	addTool(new Tool('Zoom', _tool_renderer.cursors.zoom, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		function zoom(mouse, type) {
			var lzoom = _canvas_renderer.camera.zoom;
			var nzoom = _canvas_renderer.camera.zoom;
			var offX = 0;
			var offY = 0;
			var w = window.innerWidth;
			var h = window.innerHeight;
			if (type === 1) {
				// Zoom in
				nzoom *= 1 + _conf.options.zoomStrength;
				offX = (mouse.x - w / 2) / nzoom;
				offY = (mouse.y - h / 2) / nzoom;
			} else if (type === 2) {
				// Zoom out
				nzoom /= 1 + _conf.options.zoomStrength;
				offX = (mouse.x - w / 2) * (3 / lzoom - 2 / nzoom);
				offY = (mouse.y - h / 2) * (3 / lzoom - 2 / nzoom);
			} else if (type === 3) {
				// Reset zoom (right + left click)
				nzoom = _conf.options.defaultZoom;
			}
			nzoom = Math.round(nzoom);
			_canvas_renderer.camera.zoom = nzoom;
			if (_canvas_renderer.camera.zoom !== lzoom) {
				(0, _canvas_renderer.moveCameraBy)(offX, offY);
			}
		}

		tool.setEvent("mousedown", function (mouse, event) {
			zoom(mouse, mouse.buttons);
		});
		tool.setEvent("touchstart", function (mouse, event) {
			tool.extra.maxTouches = Math.max(tool.extra.maxTouches || 0, event.touches.length);
		});
		tool.setEvent("touchend", function (mouse, event) {
			if (event.touches.length === 0) {
				if (tool.extra.maxTouches > 1) {
					zoom(mouse, tool.extra.maxTouches);
				}
				tool.extra.maxTouches = 0;
			}
		});
	}));

	// Area to PNG tool
	addTool(new Tool('Export', _tool_renderer.cursors.select, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 16) - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 16) - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				ctx.beginPath();
				ctx.rect(x, y, w * _canvas_renderer.camera.zoom, h * _canvas_renderer.camera.zoom);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (!tool.extra.clicking ? "Right click to screenshot " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w * _canvas_renderer.camera.zoom));
				txty = Math.max(y, Math.min(txty, y + h * _canvas_renderer.camera.zoom));

				(0, _canvas_renderer.drawText)(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		function dlarea(x, y, w, h, onblob) {
			var c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			var ctx = c.getContext('2d');
			var d = ctx.createImageData(w, h);
			for (var i = y; i < y + h; i++) {
				for (var j = x; j < x + w; j++) {
					var pix = _main.misc.world.getPixel(j, i);
					if (!pix) continue;
					d.data[4 * ((i - y) * w + (j - x))] = pix[0];
					d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
					d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
					d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
				}
			}
			ctx.putImageData(d, 0, 0);
			c.toBlob(onblob);
		}

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;

		tool.setEvent('mousedown', function (mouse, event) {
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [mouse.tileX, mouse.tileY];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [mouse.tileX, mouse.tileY];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside()) {
					var offx = mouse.tileX;
					var offy = mouse.tileY;
					tool.setEvent('mousemove', function (mouse, event) {
						var dx = mouse.tileX - offx;
						var dy = mouse.tileY - offy;
						tool.extra.start = [s[0] + dx, s[1] + dy];
						tool.extra.end = [e[0] + dx, e[1] + dy];
					});
					var end = function end() {
						tool.setEvent('mouseup deselect mousemove', null);
					};
					tool.setEvent('deselect', end);
					tool.setEvent('mouseup', function (mouse, event) {
						if (!(mouse.buttons & 1)) {
							end();
						}
					});
				} else {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var cvs = dlarea(s[0], s[1], e[0] - s[0], e[1] - s[1], function (b) {
					var url = URL.createObjectURL(b);
					var img = new Image();
					img.onload = function () {
						_windowsys.windowSys.addWindow(new _windowsys.GUIWindow("Resulting image", {
							centerOnce: true,
							closeable: true
						}, function (win) {
							var props = ['width', 'height'];
							if (img.width > img.height) {
								props.reverse();
							}
							var r = img[props[0]] / img[props[1]];
							var shownSize = img[props[1]] >= 128 ? 256 : 128;
							img[props[0]] = r * shownSize;
							img[props[1]] = shownSize;
							win.container.classList.add('centeredChilds');
							var image = win.addObj(img);
							(0, _misc.setTooltip)(img, "Right click to copy/save!");
							/*var okButton = win.addObj(mkHTML("button", {
       	innerHTML: "OK",
       	style: "display: block; width: 80px; height: 30px; margin: auto;",
       	onclick: function() {
       		img.remove();
       		URL.revokeObjectURL(url);
       		win.getWindow().close();
       	}
       }));*/
						}));
					};
					img.src = url;
				});
			}
		});
	}));

	// Fill tool
	addTool(new Tool('Fill', _tool_renderer.cursors.fill, _Fx.PLAYERFX.NONE, _conf.RANK.USER, function (tool) {
		tool.extra.tickAmount = 9;
		var queue = [];
		var fillingColor = null;
		var defaultFx = _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1);
		tool.setFxRenderer(function (fx, ctx, time) {
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = fx.extra.player.htmlRgb;
			var z = _canvas_renderer.camera.zoom;
			if (!fillingColor || !fx.extra.isLocalPlayer) {
				defaultFx(fx, ctx, time);
			} else {
				ctx.beginPath();
				for (var i = 0; i < queue.length; i++) {
					ctx.rect((queue[i][0] - _canvas_renderer.camera.x) * z, (queue[i][1] - _canvas_renderer.camera.y) * z, z, z);
				}
				ctx.stroke();
			}
		});
		function tick() {
			var eq = function eq(a, b) {
				return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
			};
			var check = function check(x, y) {
				if (eq(_main.misc.world.getPixel(x, y), fillingColor)) {
					queue.unshift([x, y]);
					return true;
				}
				return false;
			};

			if (!queue.length || !fillingColor) {
				return;
			}

			var selClr = _local_player.player.selectedColor;
			var painted = 0;
			var tickAmount = tool.extra.tickAmount;
			if (_main.keysDown[17]) {
				/* Ctrl */
				tickAmount *= 3;
			}

			for (var painted = 0; painted < tickAmount && queue.length; painted++) {
				var current = queue.pop();
				var x = current[0];
				var y = current[1];
				var thisClr = _main.misc.world.getPixel(x, y);
				if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
					if (!_main.misc.world.setPixel(x, y, selClr)) {
						queue.push(current);
						break;
					}

					// diamond check first
					var top = check(x, y - 1);
					var bottom = check(x, y + 1);
					var left = check(x - 1, y);
					var right = check(x + 1, y);

					// if corners are not closed by parts of the diamond, then they can be accessed
					if (top && left) {
						check(x - 1, y - 1);
					}
					if (top && right) {
						check(x + 1, y - 1);
					}
					if (bottom && left) {
						check(x - 1, y + 1);
					}
					if (bottom && right) {
						check(x + 1, y + 1);
					}

					// Shape diamond, infra not like
					/*check(x    , y - 1);
     check(x - 1, y    );
     check(x + 1, y    );
     check(x    , y + 1);*/
				}
			}
		}
		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				fillingColor = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
				if (fillingColor) {
					queue.push([mouse.tileX, mouse.tileY]);
					tool.setEvent('tick', tick);
				}
			}
		});
		tool.setEvent('mouseup deselect', function (mouse) {
			if (!mouse || !(mouse.buttons & 1)) {
				fillingColor = null;
				queue = [];
				tool.setEvent('tick', null);
			}
		});
	}));

	addTool(new Tool('Line', _tool_renderer.cursors.wand, _Fx.PLAYERFX.NONE, _conf.RANK.USER, function (tool) {
		var start = null;
		var end = null;
		var queue = [];
		function line(x1, y1, x2, y2, plot) {
			var dx = Math.abs(x2 - x1),
			    sx = x1 < x2 ? 1 : -1;
			var dy = -Math.abs(y2 - y1),
			    sy = y1 < y2 ? 1 : -1;
			var err = dx + dy,
			    e2;

			while (true) {
				plot(x1, y1);
				if (x1 == x2 && y1 == y2) break;
				e2 = 2 * err;
				if (e2 >= dy) {
					err += dy;x1 += sx;
				}
				if (e2 <= dx) {
					err += dx;y1 += sy;
				}
			}
		}
		var defaultFx = _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1);
		tool.setFxRenderer(function (fx, ctx, time) {
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = fx.extra.player.htmlRgb;
			var z = _canvas_renderer.camera.zoom;
			if (!start || !end || !fx.extra.isLocalPlayer) {
				defaultFx(fx, ctx, time);
			} else {
				ctx.beginPath();
				line(start[0], start[1], end[0], end[1], function (x, y) {
					ctx.rect((x - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom, (y - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom);
				});
				ctx.stroke();
			}
		});
		function tick() {
			for (var painted = 0; painted < 3 && queue.length; painted++) {
				var current = queue.pop();
				var c = _main.misc.world.getPixel(current[0], current[1]);
				var pc = _local_player.player.selectedColor;
				if ((c[0] != pc[0] || c[1] != pc[1] || c[2] != pc[2]) && !_main.misc.world.setPixel(current[0], current[1], _local_player.player.selectedColor)) {
					queue.push(current);
					break;
				}
			}
			if (!queue.length) {
				start = null;
				end = null;
				tool.setEvent('tick', null);
				return;
			}
		}
		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				queue = [];
				tool.setEvent('tick', null);
				start = [mouse.tileX, mouse.tileY];
				end = [mouse.tileX, mouse.tileY];
			}
		});
		tool.setEvent('mousemove', function (mouse) {
			if (!queue.length) {
				end = [mouse.tileX, mouse.tileY];
			}
		});
		tool.setEvent('mouseup', function (mouse) {
			if (!(mouse.buttons & 3) && !queue.length) {
				end = [mouse.tileX, mouse.tileY];
				if (!start) {
					end = null;
					return;
				}
				if (_local_player.player.rank == _conf.RANK.ADMIN) {
					line(start[0], start[1], end[0], end[1], function (x, y) {
						_main.misc.world.setPixel(x, y, _local_player.player.selectedColor);
					});
					start = null;
					end = null;
				} else {
					line(start[0], start[1], end[0], end[1], function (x, y) {
						queue.push([x, y]);
					});
					tool.setEvent('tick', tick);
				}
			}
		});
		tool.setEvent('deselect', function (mouse) {
			queue = [];
			start = null;
			end = null;
			tool.setEvent('tick', null);
		});
	}));

	addTool(new Tool('Protect', _tool_renderer.cursors.shield, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(16, "#000000"), _conf.RANK.MODERATOR, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 256) * 16 - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 256) * 16 - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			ctx.globalAlpha = 0.5;
			var chunkX = Math.floor(fx.extra.player.tileX / _conf.protocol.chunkSize);
			var chunkY = Math.floor(fx.extra.player.tileY / _conf.protocol.chunkSize);
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			if (chunk) {
				ctx.fillStyle = chunk.locked ? "#00FF00" : "#FF0000";
				ctx.fillRect(fxx, fxy, _canvas_renderer.camera.zoom * 16, _canvas_renderer.camera.zoom * 16);
			}
			return 1; /* Rendering finished (won't change on next frame) */
		});
		tool.setEvent('mousedown mousemove', function (mouse) {
			var chunkX = Math.floor(mouse.tileX / _conf.protocol.chunkSize);
			var chunkY = Math.floor(mouse.tileY / _conf.protocol.chunkSize);
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			switch (mouse.buttons) {
				case 1:
					if (!chunk.locked) {
						_networking.net.protocol.protectChunk(chunkX, chunkY, 1);
					}
					break;

				case 2:
					if (chunk.locked) {
						_networking.net.protocol.protectChunk(chunkX, chunkY, 0);
					}
					break;
			}
		});
	}));

	addTool(new Tool('Area Protect', _tool_renderer.cursors.selectprotect, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.round(x / 256) * _conf.protocol.chunkSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.round(y / 256) * _conf.protocol.chunkSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] * _conf.protocol.chunkSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] * _conf.protocol.chunkSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var rw = e[0] - s[0];
				var rh = e[1] - s[1];
				var w = rw * _canvas_renderer.camera.zoom * _conf.protocol.chunkSize;
				var h = rh * _canvas_renderer.camera.zoom * _conf.protocol.chunkSize;
				ctx.beginPath();
				ctx.rect(x, y, w, h);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				if (tool.extra.isSure) {
					ctx.globalAlpha = 0.6;
					ctx.fillStyle = "#00EE00";
					ctx.fill();
				}
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (tool.extra.isSure ? "Click again to confirm. " : !tool.extra.clicking ? "Left/Right click to add/remove protection, respectively. " : "") + '(' + Math.abs(rw) + 'x' + Math.abs(rh) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w));
				txty = Math.max(y, Math.min(txty, y + h));

				(0, _canvas_renderer.drawText)(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;
		tool.extra.isSure = false;

		var timeout = null;

		var sure = function sure() {
			if (tool.extra.isSure) {
				clearTimeout(timeout);
				timeout = null;
				tool.extra.isSure = false;
				return true;
			}
			tool.extra.isSure = true;
			setTimeout(function () {
				tool.extra.isSure = false;
				timeout = null;
			}, 1000);
			return false;
		};

		tool.setEvent('mousedown', function (mouse, event) {
			var get = {
				rx: function rx() {
					return mouse.tileX / _conf.protocol.chunkSize;
				},
				ry: function ry() {
					return mouse.tileY / _conf.protocol.chunkSize;
				},
				x: function x() {
					return Math.round(mouse.tileX / _conf.protocol.chunkSize);
				},
				y: function y() {
					return Math.round(mouse.tileY / _conf.protocol.chunkSize);
				}
			};
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return get.rx() >= s[0] && get.rx() < e[0] && get.ry() >= s[1] && get.ry() < e[1];
			};
			var isChunkSolid = function isChunkSolid(chunk) {
				var lastClr = chunk.get(0, 0);
				return chunk.forEach(function (x, y, clr) {
					return clr === lastClr;
				});
			};

			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [get.x(), get.y()];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [get.x(), get.y()];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside() && sure()) {
					tool.extra.start = null;
					tool.extra.end = null;
					var _ref = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
					    x = _ref[0],
					    y = _ref[1],
					    w = _ref[2],
					    h = _ref[3];

					for (var i = x; i < x + w; i++) {
						for (var j = y; j < y + h; j++) {
							var chunk = _main.misc.world.getChunkAt(i, j);
							if (chunk && !chunk.locked) {
								if (_main.keysDown[17] && isChunkSolid(chunk)) {
									continue;
								}
								_networking.net.protocol.protectChunk(i, j, 1);
							}
						}
					}
				} else if (!isInside()) {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end && isInside() && sure()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var _ref2 = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
				    x = _ref2[0],
				    y = _ref2[1],
				    w = _ref2[2],
				    h = _ref2[3];

				for (var i = x; i < x + w; i++) {
					for (var j = y; j < y + h; j++) {
						var chunk = _main.misc.world.getChunkAt(i, j);
						if (chunk && chunk.locked) {
							if (_main.keysDown[17] && !isChunkSolid(chunk)) {
								continue;
							}
							_networking.net.protocol.protectChunk(i, j, 0);
						}
					}
				}
			}
		});
	}));

	addTool(new Tool('Area Erase', _tool_renderer.cursors.areadelete, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.round(x / 256) * _conf.protocol.chunkSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.round(y / 256) * _conf.protocol.chunkSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] * _conf.protocol.chunkSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] * _conf.protocol.chunkSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var rw = e[0] - s[0];
				var rh = e[1] - s[1];
				var w = rw * _canvas_renderer.camera.zoom * _conf.protocol.chunkSize;
				var h = rh * _canvas_renderer.camera.zoom * _conf.protocol.chunkSize;
				ctx.beginPath();
				ctx.rect(x, y, w, h);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				if (tool.extra.isSure) {
					ctx.globalAlpha = 0.6;
					ctx.fillStyle = "#00EE00";
					ctx.fill();
				}
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (tool.extra.isSure ? "Click again to confirm. " : !tool.extra.clicking ? "Double click to delete. " : "") + '(' + Math.abs(rw) + 'x' + Math.abs(rh) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w));
				txty = Math.max(y, Math.min(txty, y + h));

				(0, _canvas_renderer.drawText)(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;
		tool.extra.isSure = false;

		var timeout = null;

		var sure = function sure() {
			if (tool.extra.isSure) {
				clearTimeout(timeout);
				timeout = null;
				tool.extra.isSure = false;
				return true;
			}
			tool.extra.isSure = true;
			setTimeout(function () {
				tool.extra.isSure = false;
				timeout = null;
			}, 1000);
			return false;
		};

		tool.setEvent('mousedown', function (mouse, event) {
			var get = {
				rx: function rx() {
					return mouse.tileX / _conf.protocol.chunkSize;
				},
				ry: function ry() {
					return mouse.tileY / _conf.protocol.chunkSize;
				},
				x: function x() {
					return Math.round(mouse.tileX / _conf.protocol.chunkSize);
				},
				y: function y() {
					return Math.round(mouse.tileY / _conf.protocol.chunkSize);
				}
			};
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return get.rx() >= s[0] && get.rx() < e[0] && get.ry() >= s[1] && get.ry() < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [get.x(), get.y()];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [get.x(), get.y()];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside() && sure()) {
					tool.extra.start = null;
					tool.extra.end = null;
					var _ref3 = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
					    x = _ref3[0],
					    y = _ref3[1],
					    w = _ref3[2],
					    h = _ref3[3];

					for (var i = x; i < x + w; i++) {
						for (var j = y; j < y + h; j++) {
							var chunk = _main.misc.world.getChunkAt(i, j);
							if (chunk && !chunk.locked) {
								_networking.net.protocol.clearChunk(i, j, _local_player.player.selectedColor);
							}
						}
					}
				} else if (!isInside()) {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end) {
				if (isInside() && sure()) {
					tool.extra.start = null;
					tool.extra.end = null;
					var _ref4 = [s[0], s[1], e[0] - s[0], e[1] - s[1]],
					    x = _ref4[0],
					    y = _ref4[1],
					    w = _ref4[2],
					    h = _ref4[3];

					for (var i = x; i < x + w; i++) {
						for (var j = y; j < y + h; j++) {
							var chunk = _main.misc.world.getChunkAt(i, j);
							if (chunk && !chunk.locked) {
								_networking.net.protocol.clearChunk(i, j, [255, 255, 255]);
							}
						}
					}
				} else if (!isInside()) {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			}
		});
	}));

	addTool(new Tool('Paste', _tool_renderer.cursors.paste, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		tool.extra.sendQueue = [];

		tool.setFxRenderer(function (fx, ctx, time) {
			var z = _canvas_renderer.camera.zoom;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = Math.floor(x / 16) - _canvas_renderer.camera.x;
			var fxy = Math.floor(y / 16) - _canvas_renderer.camera.y;

			var q = tool.extra.sendQueue;
			if (q.length) {
				var cs = _conf.protocol.chunkSize;
				ctx.strokeStyle = "#000000";
				ctx.globalAlpha = 0.8;
				ctx.beginPath();
				for (var i = 0; i < q.length; i++) {
					ctx.rect((q[i].x * cs - _canvas_renderer.camera.x) * z, (q[i].y * cs - _canvas_renderer.camera.y) * z, z * cs, z * cs);
				}
				ctx.stroke();
				return 0;
			}

			if (tool.extra.canvas && fx.extra.isLocalPlayer) {
				ctx.globalAlpha = 0.5 + Math.sin(time / 500) / 4;
				ctx.strokeStyle = "#000000";
				ctx.scale(z, z);
				ctx.drawImage(tool.extra.canvas, fxx, fxy);
				ctx.scale(1 / z, 1 / z);
				ctx.globalAlpha = 0.8;
				ctx.strokeRect(fxx * z, fxy * z, tool.extra.canvas.width * z, tool.extra.canvas.height * z);
				return 0;
			}
		});

		var paint = function paint(tileX, tileY) {
			var tmpBuffer = new Uint32Array(_conf.protocol.chunkSize * _conf.protocol.chunkSize);
			var ctx = tool.extra.canvas.getContext("2d");
			var dat = ctx.getImageData(0, 0, tool.extra.canvas.width, tool.extra.canvas.height);
			var u32dat = new Uint32Array(dat.data.buffer);
			var totalChunksW = Math.ceil(((0, _misc.absMod)(tileX, _conf.protocol.chunkSize) + dat.width) / _conf.protocol.chunkSize);
			var totalChunksH = Math.ceil(((0, _misc.absMod)(tileY, _conf.protocol.chunkSize) + dat.height) / _conf.protocol.chunkSize);
			var getModifiedPixel = function getModifiedPixel(x, y) {
				var imgY = y - tileY;
				var imgX = x - tileX;
				if (imgY < 0 || imgX < 0 || imgY >= dat.height || imgX >= dat.width) {
					var currentPixel = _main.misc.world.getPixel(x, y);
					return currentPixel ? currentPixel[2] << 16 | currentPixel[1] << 8 | currentPixel[0] : null;
				}
				var img = u32dat[imgY * dat.width + imgX];
				var oldPixel = _main.misc.world.getPixel(x, y);
				var alpha = img >> 24 & 0xFF;
				if (!oldPixel) {
					return null;
				}
				var r = (1 - alpha / 255) * oldPixel[0] + alpha / 255 * (img & 0xFF);
				var g = (1 - alpha / 255) * oldPixel[1] + alpha / 255 * (img >> 8 & 0xFF);
				var b = (1 - alpha / 255) * oldPixel[2] + alpha / 255 * (img >> 16 & 0xFF);
				var rgb = b << 16 | g << 8 | r;
				return r == oldPixel[0] && g == oldPixel[1] && b == oldPixel[2] ? rgb : 0xFF000000 | rgb;
			};

			var getModifiedChunk = function getModifiedChunk(chunkX, chunkY) {
				var modified = 0;
				var offX = chunkX * _conf.protocol.chunkSize;
				var offY = chunkY * _conf.protocol.chunkSize;
				for (var y = 0; y < _conf.protocol.chunkSize; y++) {
					for (var x = 0; x < _conf.protocol.chunkSize; x++) {
						var color = getModifiedPixel(x + offX, y + offY);
						if (color !== null) {
							if (color & 0xFF000000) {
								++modified;
							}
							tmpBuffer[y * _conf.protocol.chunkSize + x] = color & 0xFFFFFF;
						} else {
							/* Chunk not loaded... */
							throw new Error('Couldn\'t paste -- chunk (' + chunkX + ', ' + chunkY + ') is unloaded');
						}
					}
				}
				return modified ? tmpBuffer : null;
			};
			if (!_networking.net.protocol.setChunk) {
				throw new Error("Protocol doesn't support pasting");
			}

			for (var y = Math.floor(tileY / _conf.protocol.chunkSize), t = totalChunksH; --t >= 0; y++) {
				for (var x = Math.floor(tileX / _conf.protocol.chunkSize), tw = totalChunksW; --tw >= 0; x++) {
					var newChunk = getModifiedChunk(x, y);
					if (newChunk) {
						if (!_networking.net.protocol.setChunk(x, y, newChunk)) {
							var nbuf = new Uint32Array(newChunk.length);
							nbuf.set(newChunk);
							tool.extra.sendQueue.push({
								x: x,
								y: y,
								buf: nbuf
							});
						}
					}
				}
			}
		};

		tool.setEvent('tick', function () {
			var q = tool.extra.sendQueue;
			if (q.length) {
				if (_networking.net.protocol.setChunk(q[0].x, q[0].y, q[0].buf)) {
					q.shift();
				}
			}
		});

		tool.setEvent('mousedown', function (mouse) {
			if (mouse.buttons & 1) {
				if (tool.extra.canvas) {
					if (tool.extra.sendQueue.length) {
						throw new Error("Wait until pasting finishes, or cancel with right click!");
					}

					paint(mouse.tileX, mouse.tileY);
				}
			} else if (mouse.buttons & 2) {
				tool.extra.sendQueue = [];
			}
		});

		var input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		tool.setEvent('select', function () {
			input.onchange = function (event) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var image = new Image();
						image.onload = function () {
							tool.extra.canvas = document.createElement("canvas");
							tool.extra.canvas.width = image.width;
							tool.extra.canvas.height = image.height;
							var ctx = tool.extra.canvas.getContext("2d");
							ctx.drawImage(image, 0, 0);
						};
						image.src = e.target.result;
					};
					reader.readAsDataURL(input.files[0]);
				}
			};
			input.click();
		});
	}));

	addTool(new Tool('Copy', _tool_renderer.cursors.copy, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		function drawText(ctx, str, x, y, centered) {
			ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
			if (centered) {
				x -= ctx.measureText(str).width >> 1;
			}
			ctx.strokeText(str, x, y);
			ctx.globalAlpha = 1;
			ctx.fillText(str, x, y);
		}

		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 16) - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 16) - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				ctx.beginPath();
				ctx.rect(x, y, w * _canvas_renderer.camera.zoom, h * _canvas_renderer.camera.zoom);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (!tool.extra.clicking ? "Right click to copy " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w * _canvas_renderer.camera.zoom));
				txty = Math.max(y, Math.min(txty, y + h * _canvas_renderer.camera.zoom));

				drawText(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;

		tool.setEvent('mousedown', function (mouse, event) {
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [mouse.tileX, mouse.tileY];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [mouse.tileX, mouse.tileY];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside()) {
					var offx = mouse.tileX;
					var offy = mouse.tileY;
					tool.setEvent('mousemove', function (mouse, event) {
						var dx = mouse.tileX - offx;
						var dy = mouse.tileY - offy;
						tool.extra.start = [s[0] + dx, s[1] + dy];
						tool.extra.end = [e[0] + dx, e[1] + dy];
					});
					var end = function end() {
						tool.setEvent('mouseup deselect mousemove', null);
					};
					tool.setEvent('deselect', end);
					tool.setEvent('mouseup', function (mouse, event) {
						if (!(mouse.buttons & 1)) {
							end();
						}
					});
				} else {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var x = s[0];
				var y = s[1];
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				var c = document.createElement('canvas');
				c.width = w;
				c.height = h;
				var ctx = c.getContext('2d');
				var d = ctx.createImageData(w, h);
				for (var i = y; i < y + h; i++) {
					for (var j = x; j < x + w; j++) {
						var pix = _main.misc.world.getPixel(j, i);
						if (!pix) continue;
						d.data[4 * ((i - y) * w + (j - x))] = pix[0];
						d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
						d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
						d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
					}
				}
				ctx.putImageData(d, 0, 0);
				var paste = tools.paste;
				paste.extra.canvas = c;
				var oldSelect = paste.events.select;
				paste.events.select = function () {
					paste.events.select = oldSelect;
				};
				_local_player.player.tool = "paste";
			}
		});
	}));
        addTool(new Tool("Circle", _tool_renderer.cursors.circle, _Fx.PLAYERFX.NONE, _conf.RANK.USER, function(tool) {
            let start = null;
            let end = null;
            let queue = [];
            function isFilled(x, y, width, height) {
                return Math.sqrt(Math.pow(x / width, 2) + Math.pow(y / height, 2)) <= 1;
            };
            function isStroked(x, y, width, height) {
                return isFilled(x, y, width, height) && (
                    !isFilled(x + 1, y    , width, height) ||
                    !isFilled(x - 1, y    , width, height) ||
                    !isFilled(x    , y + 1, width, height) ||
                    !isFilled(x    , y - 1, width, height)
                );
            }
            function circle(x1, y1, x2, y2, plot) {
                if (x2 < x1) [x1, x2] = [x2, x1];
                if (y2 < y1) [y1, y2] = [y2, y1];
                
                let width = x2 - x1 + 1;
                let height = y2 - y1 + 1;
                
                for (let y=0; y<height; y++) {
                    for (let x=0; x<width; x++) {
                        if (isStroked(
                            x - width / 2 + 0.5,
                            y - height / 2 + 0.5,
                            width / 2,
                            height / 2)
                        ) {
                            plot(x + x1, y + y1);
                        }
                    }
                }
            }
            let defaultFx = _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1);
            tool.setFxRenderer((fx, ctx, time) => {
                ctx.globalAlpha = 0.8;
                ctx.strokeStyle = fx.extra.player.htmlRgb;
                if (!start || !end || !fx.extra.isLocalPlayer) {
                    defaultFx(fx, ctx, time);
                } else {
                    ctx.beginPath();
                    circle(start[0], start[1], end[0], end[1], (x, y) => {
                        ctx.rect((x - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom, (y - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom);
                    });
                    ctx.stroke();
                }
            });
            function tick() {
                for (let i=queue.length - 1; i>=0; i--) {
                    let pixel = queue[i];
                    if (_main.misc.world.setPixel(pixel[0], pixel[1], _local_player.player.selectedColor)) {
                        queue.splice(i, 1);
                    }
                }
                
                if (queue.length === 0) {
                    start = null;
                    end = null;
                    tool.setEvent("tick", null);
                }
            }
            tool.setEvent("mousedown", mouse => {
                if (!(mouse.buttons & 0b100)) {
                    queue = [];
                    tool.setEvent("tick", null);
                    start = [mouse.tileX, mouse.tileY];
                    end = [mouse.tileX, mouse.tileY];
                }
            });
            tool.setEvent("mousemove", mouse => {
                if (!queue.length) {
                    end = [mouse.tileX, mouse.tileY];
                }
            });
            tool.setEvent("mouseup", mouse => {
                if (!(mouse.buttons & 0b11) && !queue.length) {
                    end = [mouse.tileX, mouse.tileY];
                    if (!start) {
                        end = null;
                        return;
                    }
                    circle(start[0], start[1], end[0], end[1], (x, y) => {
                        queue.push([x, y]);
                    });
                    tool.setEvent("tick", tick);
                }
            });
            tool.setEvent("deselect", mouse => {
                queue = [];
                start = null;
                end = null;
                tool.setEvent("tick", null);
            });
        }));
	addTool(new Tool('Pencil', _tool_renderer.cursors.pencil, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1), _conf.RANK.USER, function (tool) {
		var lastX, lastY;
		tool.factor = 0.2;
		tool.setEvent('mousedown mousemove', function (mouse, event) {
			var usedButtons = 3;
			var pixelColor = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
	
			var color;
			if (!pixelColor) {
			  	color = [0, 0, 0];
			} else {
			  	var r = pixelColor[0];
			  	var g = pixelColor[1];
			  	var b = pixelColor[2];
			  	var luminance = 0.2126*r + 0.7152*g + 0.0722*b;
			  	var gray = Math.round(luminance / 255 * 10) / 10;
			  	var darkenFactor = tool.factor;
			  	var newGray = Math.max(gray - darkenFactor, 0);
			  	var newLuminance = Math.round(newGray * 255);
			  	color = [newLuminance, newLuminance, newLuminance];
			}
	
			switch (mouse.buttons) {
				case 1:
				case 2:
				  	if (!lastX || !lastY) {
				  	  	lastX = mouse.tileX;
				  	  	lastY = mouse.tileY;
				  	}
				  	(0, _misc.line)(lastX, lastY, mouse.tileX, mouse.tileY, 1, function (x, y) {
				  	  	var pixel = _main.misc.world.getPixel(x, y);
				  	  	if (pixel !== null && !(color[0] === pixel[0] && color[1] === pixel[1] && color[2] === pixel[2])) {
				  	  	  	_main.misc.world.setPixel(x, y, color);
				  	  	}
				  	});
				  	lastX = mouse.tileX;
				  	lastY = mouse.tileY;
				  	break;
				case 4:
			    	if (event.ctrlKey) {
			    	  	usedButtons |= 4;
			    	  	var color = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
			    	  	if (color) {
			    	  	  	_local_player.player.selectedColor = color;
			    	  	}
			    	}
			    break;
			}
			return usedButtons;
		});
		tool.setEvent('mouseup', function (mouse) {
		  	lastX = null;
		  	lastY = null;
		});
	}));
	addTool(new Tool('Pixel log', _tool_renderer.cursors.pixellog, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		tool.setEvent("mousedown mouvemove", mouse => {
			let x = mouse.tileX;
			let y = mouse.tileY;
			_windowsys.windowSys.addWindow(new _windowsys.GUIWindow(`Pixel ${x}, ${y}`, {
				closeable: true
			}, function (win) {
				function isJsonValid(str) {
    				try {
        				JSON.parse(str);
    				} catch (e) {
    				    return false;
    				};
   				 	return true;
				};
				win.container.style.width = "130px";
				win.container.style.height = "250px";
				let xhttpt = new XMLHttpRequest();
				xhttpt.open("GET", `/pixellog?x=${x}&y=${y}`);
				xhttpt.responseType = "text";
				xhttpt.addEventListener("load", function() {
					let data = xhttpt.response;
					if(isJsonValid(xhttpt.response)) {
						data = JSON.parse(xhttpt.response);
						data.forEach(log => {
							let { timestamp, id, rgb, time, date, ip, nickname } = log;
							let logbtn = document.createElement("button");
							logbtn.innerText = timestamp;
							logbtn.onclick = () => OWOP.chat.send(`/pixellog ${x} ${y} ${timestamp}`);
							win.addObj(logbtn);
						});
					} else {
						console.log(xhttpt.response);
					}
				});
				xhttpt.send();
			}).move(50, 50));
			console.log(x, y);
		});
	}));
	addTool(new Tool('Cut', _tool_renderer.cursors.cut, _Fx.PLAYERFX.NONE, _conf.RANK.MODERATOR, function (tool) {
		function drawText(ctx, str, x, y, centered) {
			ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
			if (centered) {
				x -= ctx.measureText(str).width >> 1;
			}
			ctx.strokeText(str, x, y);
			ctx.globalAlpha = 1;
			ctx.fillText(str, x, y);
		}

		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 16) - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 16) - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				ctx.beginPath();
				ctx.rect(x, y, w * _canvas_renderer.camera.zoom, h * _canvas_renderer.camera.zoom);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (!tool.extra.clicking ? "Right click to cut " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w * _canvas_renderer.camera.zoom));
				txty = Math.max(y, Math.min(txty, y + h * _canvas_renderer.camera.zoom));

				drawText(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;

        tool.setEvent('mousemove', () => {
            _local_player.player.tool = "cut";
        });

		tool.setEvent('mousedown', function (mouse, event) {
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [mouse.tileX, mouse.tileY];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [mouse.tileX, mouse.tileY];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside()) {
					var offx = mouse.tileX;
					var offy = mouse.tileY;
					tool.setEvent('mousemove', function (mouse, event) {
						var dx = mouse.tileX - offx;
						var dy = mouse.tileY - offy;
						tool.extra.start = [s[0] + dx, s[1] + dy];
						tool.extra.end = [e[0] + dx, e[1] + dy];
					});
					var end = function end() {
						tool.setEvent('mouseup deselect mousemove', null);
					};
					tool.setEvent('deselect', end);
					tool.setEvent('mouseup', function (mouse, event) {
						if (!(mouse.buttons & 1)) {
							end();
						}
					});
				} else {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var x = s[0];
				var y = s[1];
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				var c = document.createElement('canvas');
				c.width = w;
				c.height = h;
				var ctx = c.getContext('2d');
				var d = ctx.createImageData(w, h);
				for (var i = y; i < y + h; i++) {
					for (var j = x; j < x + w; j++) {
						var pix = _main.misc.world.getPixel(j, i);
                        _main.misc.world.setPixel(j, i, [255, 255, 255]);
						if (!pix) continue;
						d.data[4 * ((i - y) * w + (j - x))] = pix[0];
						d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
						d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
						d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
					}
				}
				ctx.putImageData(d, 0, 0);
				var paste = tools.paste;
				paste.extra.canvas = c;
				var oldSelect = paste.events.select;
				paste.events.select = function () {
					paste.events.select = oldSelect;
				};
				_local_player.player.tool = "paste";
			}
		});
	}));
    OWOP.tool.addToolObject(new OWOP.tool.class('Brush', OWOP.cursors.brush, OWOP.fx.player.NONE, OWOP.RANK.MODERATOR, function(tool) {
    tool.brDiameter = 5;
    var lastX, lastY;

    tool.setEvent('mousedown mousemove', function(mouse, event) {
        _local_player.player.tool = "brush";
        var usedButtons = 3;
        var color = mouse.buttons === 2 ? [255, 255, 255] : OWOP.player.selectedColor;
        switch(OWOP.mouse.buttons) {
            case 1:
            case 2:
                if(!lastX || !lastY) {
                    lastX = OWOP.mouse.tileX;
                    lastY = OWOP.mouse.tileY;
                }
                (0, OWOP.util.line)(lastX, lastY, OWOP.mouse.tileX, OWOP.mouse.tileY, 1, function(x, y) {
                    var pixel = OWOP.world.getPixel(x, y);
                    var R = Math.floor(tool.brDiameter / 2);
                    if(pixel !== null) {
                        if(mouse.buttons == 1) {
                            for(var ix = 0; ix < tool.brDiameter; ix++) {
                                for(var iy = 0; iy < tool.brDiameter; iy++) {
                                    OWOP.world.setPixel(x + ix - R, y + iy - R, color);
                                }
                            }
                        } else if(mouse.buttons == 2) {
                            for(var ix = 0; ix < tool.brDiameter; ix++) {
                                for(var iy = 0; iy < tool.brDiameter; iy++) {
                                    OWOP.world.setPixel(x + ix - R, y + iy - R, [255, 255, 255]);
                                }
                            }
                        }
                    }
                });
                lastX = OWOP.mouse.tileX;
                lastY = OWOP.mouse.tileY;
                break;
            case 4:
                if(event.ctrlKey) {
                    usedButtons |= 4;
                    var color = _OWOP.world.getPixel(mouse.tileX, mouse.tileY);
                    if(color) {
                        OWOP.player.selectedColor = color;
                    }
                }
                break;
        }
        return usedButtons;
    });
    tool.setEvent('mouseup', function(mouse) {
        lastX = null;
        lastY = null;
    });
    tool.setFxRenderer(function(fx, ctx, time) {
        var x = fx.extra.player.x;
        var y = fx.extra.player.y;
        var diameter = tool.brDiameter
        var fxx = (Math.floor(x / 16) - Math.floor(diameter / 2) - OWOP.camera.x) * OWOP.camera.zoom;
        var fxy = (Math.floor(y / 16) - Math.floor(diameter / 2) - OWOP.camera.y) * OWOP.camera.zoom;
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = fx.extra.player.htmlRgb;
        ctx.strokeRect(fxx, fxy, OWOP.camera.zoom * diameter, OWOP.camera.zoom * diameter);
        return 1;
    });
}));
var brDiamWin = OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Brush diameter', {}, function(win) {
    win.container.title = 'Double-click a seekbar to reset it to 3.';
    win.container.style.height = '16px';
    win.container.style.overflow = 'hidden';
    
    var brDiamElm = OWOP.util.mkHTML('span', {
        innerHTML: OWOP.tool.allTools.brush.brDiameter
    });
    win.addObj(brDiamElm);
    var Rbar = OWOP.util.mkHTML('input', {
        type: 'range',
        style: '-moz-appearance:none;-webkit-appearance:none;appearance:none;height:6px;outline:none;float:right;',
        min: 2,
        max: 8,
        value: OWOP.tool.allTools.brush.brDiameter,
        oninput: function() {
            OWOP.tool.allTools.brush.brDiameter = this.value;
            brDiamElm.innerHTML = this.value;
        },
        ondblclick: function() {
            this.value = 3;
            this.onchange();
        }
    });
    win.addObj(Rbar);
}).move(800, 32));
var dkFctrWin = OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Darker Factor', {}, function(win) {
    win.container.title = 'Double-click a seekbar to reset it to 3.';
    win.container.style.height = '16px';
    win.container.style.overflow = 'hidden';
    
    var dkFctrElm = OWOP.util.mkHTML('span', {
        innerHTML: OWOP.tool.allTools.pencil.factor
    });
    win.addObj(dkFctrElm);
    var Rbar = OWOP.util.mkHTML('input', {
        type: 'range',
        style: '-moz-appearance:none;-webkit-appearance:none;appearance:none;height:6px;outline:none;float:right;',
        min: 0.01,
        max: 1,
		step: 0.01,
        value: OWOP.tool.allTools.pencil.factor,
        oninput: function() {
            OWOP.tool.allTools.pencil.factor = this.value;
            dkFctrElm.innerHTML = this.value;
        },
        ondblclick: function() {
            this.value = 0.2;
            this.onchange();
        }
    });
    win.addObj(Rbar);
}).move(785, 92));
	_global.eventSys.emit(_conf.EVENTS.misc.toolsInitialized);
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	exports.toolsWindow = toolsWindow = new _windowsys.GUIWindow('Tools', {}, function (wdow) {
		wdow.container.id = "toole-container";
		wdow.container.style.cssText = "max-width: 40px";
	}).move(5, 32);
});

_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, function () {
	updateToolbar();
	if (windowShown) {
		_windowsys.windowSys.addWindow(toolsWindow);
	}
});

_global.eventSys.on(_conf.EVENTS.net.disconnected, function () {
	showToolsWindow(false);
});

_global.eventSys.on(_conf.EVENTS.misc.worldInitialized, function () {
	showToolsWindow(true);
});

/***/ }),

/***/ "./src/js/util/Bucket.js":
/*!*******************************!*\
  !*** ./src/js/util/Bucket.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bucket = exports.Bucket = function () {
	function Bucket(rate, time) {
		_classCallCheck(this, Bucket);

		this.lastCheck = Date.now();
		this.allowance = rate;
		this.rate = rate;
		this.time = time;
		this.infinite = false;
	}

	_createClass(Bucket, [{
		key: 'canSpend',
		value: function canSpend(count) {
			if (this.infinite) {
				return true;
			}

			this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
			this.lastCheck = Date.now();
			if (this.allowance > this.rate) {
				this.allowance = this.rate;
			}
			if (this.allowance < count) {
				return false;
			}
			this.allowance -= count;
			return true;
		}
	}]);

	return Bucket;
}();

/***/ }),

/***/ "./src/js/util/Lerp.js":
/*!*****************************!*\
  !*** ./src/js/util/Lerp.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lerp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _misc = __webpack_require__(/*! ./misc.js */ "./src/js/util/misc.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Time function, time will be updated by the renderer */
var time = _misc.getTime /*() => getTime(true)*/;

var Lerp = exports.Lerp = function () {
    function Lerp(start, end, ms) {
        _classCallCheck(this, Lerp);

        this.start = start;
        this.end = end;
        this.ms = ms;
        this.time = time();
    }

    _createClass(Lerp, [{
        key: 'val',
        get: function get() {
            var amt = Math.min((time() - this.time) / this.ms, 1);
            return (1 - amt) * this.start + amt * this.end;
        },
        set: function set(v) {
            this.start = this.val;
            this.end = v;
            this.time = time(true);
        }
    }]);

    return Lerp;
}();

/***/ }),

/***/ "./src/js/util/anchorme.js":
/*!*********************************!*\
  !*** ./src/js/util/anchorme.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, a) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = a() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(undefined, function () {
  "use strict";
  function e(e, a) {
    return a = { exports: {} }, e(a, a.exports), a.exports;
  }var a = e(function (e, a) {
    function n(e) {
      return e || (e = { attributes: [], ips: !0, emails: !0, urls: !0, files: !0, truncate: 1 / 0, defaultProtocol: "http://", list: !1 }), "object" != _typeof(e.attributes) && (e.attributes = []), "boolean" != typeof e.ips && (e.ips = !0), "boolean" != typeof e.emails && (e.emails = !0), "boolean" != typeof e.urls && (e.urls = !0), "boolean" != typeof e.files && (e.files = !0), "boolean" != typeof e.list && (e.list = !1), "string" != typeof e.defaultProtocol && "function" != typeof e.defaultProtocol && (e.defaultProtocol = "http://"), "number" == typeof e.truncate || "object" == _typeof(e.truncate) && null !== e.truncate || (e.truncate = 1 / 0), e;
    }function t(e) {
      return !isNaN(Number(e)) && !(Number(e) > 65535);
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.defaultOptions = n, a.isPort = t;
  }),
      n = e(function (e, a) {
    Object.defineProperty(a, "__esModule", { value: !0 }), a.tlds = ["com", "org", "net", "uk", "gov", "edu", "io", "cc", "co", "aaa", "aarp", "abarth", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "academy", "accenture", "accountant", "accountants", "aco", "active", "actor", "ad", "adac", "ads", "adult", "ae", "aeg", "aero", "aetna", "af", "afamilycompany", "afl", "africa", "ag", "agakhan", "agency", "ai", "aig", "aigo", "airbus", "airforce", "airtel", "akdn", "al", "alfaromeo", "alibaba", "alipay", "allfinanz", "allstate", "ally", "alsace", "alstom", "am", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amsterdam", "analytics", "android", "anquan", "anz", "ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "ar", "aramco", "archi", "army", "arpa", "art", "arte", "as", "asda", "asia", "associates", "at", "athleta", "attorney", "au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autos", "avianca", "aw", "aws", "ax", "axa", "az", "azure", "ba", "baby", "baidu", "banamex", "bananarepublic", "band", "bank", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "bbc", "bbt", "bbva", "bcg", "bcn", "bd", "be", "beats", "beauty", "beer", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "bg", "bh", "bharti", "bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "black", "blackfriday", "blanco", "blockbuster", "blog", "bloomberg", "blue", "bm", "bms", "bmw", "bn", "bnl", "bnpparibas", "bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "boots", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "bt", "budapest", "bugatti", "build", "builders", "business", "buy", "buzz", "bv", "bw", "by", "bz", "bzh", "ca", "cab", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "cancerresearch", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "cars", "cartier", "casa", "case", "caseih", "cash", "casino", "cat", "catering", "catholic", "cba", "cbn", "cbre", "cbs", "cd", "ceb", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "channel", "chase", "chat", "cheap", "chintai", "chloe", "christmas", "chrome", "chrysler", "church", "ci", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "cityeats", "ck", "cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "cn", "coach", "codes", "coffee", "college", "cologne", "comcast", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "construction", "consulting", "contact", "contractors", "cooking", "cookingchannel", "cool", "coop", "corsica", "country", "coupon", "coupons", "courses", "cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "csc", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "dev", "dhl", "diamonds", "diet", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "dnp", "do", "docs", "doctor", "dodge", "dog", "doha", "domains", "dot", "download", "drive", "dtv", "dubai", "duck", "dunlop", "duns", "dupont", "durban", "dvag", "dvr", "dz", "earth", "eat", "ec", "eco", "edeka", "education", "ee", "eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epost", "epson", "equipment", "er", "ericsson", "erni", "es", "esq", "estate", "esurance", "et", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "fiat", "fidelity", "fido", "film", "final", "finance", "financial", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flickr", "flights", "flir", "florist", "flowers", "fly", "fm", "fo", "foo", "food", "foodnetwork", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "free", "fresenius", "frl", "frogans", "frontdoor", "frontier", "ftr", "fujitsu", "fujixerox", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "gb", "gbiz", "gd", "gdn", "ge", "gea", "gent", "genting", "george", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "giving", "gl", "glade", "glass", "gle", "global", "globo", "gm", "gmail", "gmbh", "gmo", "gmx", "gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodhands", "goodyear", "goog", "google", "gop", "got", "gp", "gq", "gr", "grainger", "graphics", "gratis", "green", "gripe", "group", "gs", "gt", "gu", "guardian", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "hair", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "help", "helsinki", "here", "hermes", "hgtv", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "hkt", "hm", "hn", "hockey", "holdings", "holiday", "homedepot", "homegoods", "homes", "homesense", "honda", "honeywell", "horse", "hospital", "host", "hosting", "hot", "hoteles", "hotmail", "house", "how", "hr", "hsbc", "ht", "htc", "hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "ie", "ieee", "ifm", "ikano", "il", "im", "imamat", "imdb", "immo", "immobilien", "in", "industries", "infiniti", "info", "ing", "ink", "institute", "insurance", "insure", "int", "intel", "international", "intuit", "investments", "ipiranga", "iq", "ir", "irish", "is", "iselect", "ismaili", "ist", "istanbul", "it", "itau", "itv", "iveco", "iwc", "jaguar", "java", "jcb", "jcp", "je", "jeep", "jetzt", "jewelry", "jio", "jlc", "jll", "jm", "jmp", "jnj", "jo", "jobs", "joburg", "jot", "joy", "jp", "jpmorgan", "jprs", "juegos", "juniper", "kaufen", "kddi", "ke", "kerryhotels", "kerrylogistics", "kerryproperties", "kfh", "kg", "kh", "ki", "kia", "kim", "kinder", "kindle", "kitchen", "kiwi", "km", "kn", "koeln", "komatsu", "kosher", "kp", "kpmg", "kpn", "kr", "krd", "kred", "kuokgroup", "kw", "ky", "kyoto", "kz", "la", "lacaixa", "ladbrokes", "lamborghini", "lamer", "lancaster", "lancia", "lancome", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "lc", "lds", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "liaison", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "linde", "link", "lipsy", "live", "living", "lixil", "lk", "loan", "loans", "locker", "locus", "loft", "lol", "london", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "ls", "lt", "ltd", "ltda", "lu", "lundbeck", "lupin", "luxe", "luxury", "lv", "ly", "ma", "macys", "madrid", "maif", "maison", "makeup", "man", "management", "mango", "market", "marketing", "markets", "marriott", "marshalls", "maserati", "mattel", "mba", "mc", "mcd", "mcdonalds", "mckinsey", "md", "me", "med", "media", "meet", "melbourne", "meme", "memorial", "men", "menu", "meo", "metlife", "mg", "mh", "miami", "microsoft", "mil", "mini", "mint", "mit", "mitsubishi", "mk", "ml", "mlb", "mls", "mm", "mma", "mn", "mo", "mobi", "mobile", "mobily", "moda", "moe", "moi", "mom", "monash", "money", "monster", "montblanc", "mopar", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "movistar", "mp", "mq", "mr", "ms", "msd", "mt", "mtn", "mtpc", "mtr", "mu", "museum", "mutual", "mv", "mw", "mx", "my", "mz", "na", "nab", "nadex", "nagoya", "name", "nationwide", "natura", "navy", "nba", "nc", "ne", "nec", "netbank", "netflix", "network", "neustar", "new", "newholland", "news", "next", "nextdirect", "nexus", "nf", "nfl", "ng", "ngo", "nhk", "ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "nokia", "northwesternmutual", "norton", "now", "nowruz", "nowtv", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "obi", "observer", "off", "office", "okinawa", "olayan", "olayangroup", "oldnavy", "ollo", "om", "omega", "one", "ong", "onl", "online", "onyourside", "ooo", "open", "oracle", "orange", "organic", "orientexpress", "origins", "osaka", "otsuka", "ott", "ovh", "pa", "page", "pamperedchef", "panasonic", "panerai", "paris", "pars", "partners", "parts", "party", "passagens", "pay", "pccw", "pe", "pet", "pf", "pfizer", "pg", "ph", "pharmacy", "philips", "phone", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "pizza", "pk", "pl", "place", "play", "playstation", "plumbing", "plus", "pm", "pn", "pnc", "pohl", "poker", "politie", "porn", "post", "pr", "pramerica", "praxi", "press", "prime", "pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "pt", "pub", "pw", "pwc", "py", "qa", "qpon", "quebec", "quest", "qvc", "racing", "radio", "raid", "re", "read", "realestate", "realtor", "realty", "recipes", "red", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "rightathome", "ril", "rio", "rip", "rmit", "ro", "rocher", "rocks", "rodeo", "rogers", "room", "rs", "rsvp", "ru", "ruhr", "run", "rw", "rwe", "ryukyu", "sa", "saarland", "safe", "safety", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sapo", "sarl", "sas", "save", "saxo", "sb", "sbi", "sbs", "sc", "sca", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "science", "scjohnson", "scor", "scot", "sd", "se", "seat", "secure", "security", "seek", "select", "sener", "services", "ses", "seven", "sew", "sex", "sexy", "sfr", "sg", "sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shouji", "show", "showtime", "shriram", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "sky", "skype", "sl", "sling", "sm", "smart", "smile", "sn", "sncf", "so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "space", "spiegel", "spot", "spreadbetting", "sr", "srl", "srt", "st", "stada", "staples", "star", "starhub", "statebank", "statefarm", "statoil", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "studio", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "swatch", "swiftcover", "swiss", "sx", "sy", "sydney", "symantec", "systems", "sz", "tab", "taipei", "talk", "taobao", "target", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "telecity", "telefonica", "temasek", "tennis", "teva", "tf", "tg", "th", "thd", "theater", "theatre", "tiaa", "tickets", "tienda", "tiffany", "tips", "tires", "tirol", "tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "tm", "tmall", "tn", "to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tours", "town", "toyota", "toys", "tr", "trade", "trading", "training", "travel", "travelchannel", "travelers", "travelersinsurance", "trust", "trv", "tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "tz", "ua", "ubank", "ubs", "uconnect", "ug", "unicom", "university", "uno", "uol", "ups", "us", "uy", "uz", "va", "vacations", "vana", "vanguard", "vc", "ve", "vegas", "ventures", "verisign", "versicherung", "vet", "vg", "vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "vista", "vistaprint", "viva", "vivo", "vlaanderen", "vn", "vodka", "volkswagen", "volvo", "vote", "voting", "voto", "voyage", "vu", "vuelos", "wales", "walmart", "walter", "wang", "wanggou", "warman", "watch", "watches", "weather", "weatherchannel", "webcam", "weber", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "wtc", "wtf", "xbox", "xerox", "xfinity", "xihuan", "xin", "xn--11b4c3d", "xn--1ck2e1b", "xn--1qqw23a", "xn--30rr7y", "xn--3bst00m", "xn--3ds443g", "xn--3e0b707e", "xn--3oq18vl8pn36a", "xn--3pxu8k", "xn--42c2d9a", "xn--45brj9c", "xn--45q11c", "xn--4gbrim", "xn--54b7fta0cc", "xn--55qw42g", "xn--55qx5d", "xn--5su34j936bgsg", "xn--5tzm5g", "xn--6frz82g", "xn--6qq986b3xl", "xn--80adxhks", "xn--80ao21a", "xn--80aqecdr1a", "xn--80asehdb", "xn--80aswg", "xn--8y0a063a", "xn--90a3ac", "xn--90ae", "xn--90ais", "xn--9dbq2a", "xn--9et52u", "xn--9krt00a", "xn--b4w605ferd", "xn--bck1b9a5dre4c", "xn--c1avg", "xn--c2br7g", "xn--cck2b3b", "xn--cg4bki", "xn--clchc0ea0b2g2a9gcd", "xn--czr694b", "xn--czrs0t", "xn--czru2d", "xn--d1acj3b", "xn--d1alf", "xn--e1a4c", "xn--eckvdtc9d", "xn--efvy88h", "xn--estv75g", "xn--fct429k", "xn--fhbei", "xn--fiq228c5hs", "xn--fiq64b", "xn--fiqs8s", "xn--fiqz9s", "xn--fjq720a", "xn--flw351e", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--fzys8d69uvgm", "xn--g2xx48c", "xn--gckr3f0f", "xn--gecrj9c", "xn--gk3at1e", "xn--h2brj9c", "xn--hxt814e", "xn--i1b6b1a6a2e", "xn--imr513n", "xn--io0a7i", "xn--j1aef", "xn--j1amh", "xn--j6w193g", "xn--jlq61u9w7b", "xn--jvr189m", "xn--kcrx77d1x4a", "xn--kprw13d", "xn--kpry57d", "xn--kpu716f", "xn--kput3i", "xn--l1acc", "xn--lgbbat1ad8j", "xn--mgb9awbf", "xn--mgba3a3ejt", "xn--mgba3a4f16a", "xn--mgba7c0bbn0a", "xn--mgbaam7a8h", "xn--mgbab2bd", "xn--mgbai9azgqp6j", "xn--mgbayh7gpa", "xn--mgbb9fbpob", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgbca7dzdo", "xn--mgberp4a5d4ar", "xn--mgbi4ecexp", "xn--mgbpl2fh", "xn--mgbt3dhd", "xn--mgbtx2b", "xn--mgbx4cd0ab", "xn--mix891f", "xn--mk1bu44c", "xn--mxtq1m", "xn--ngbc5azd", "xn--ngbe9e0a", "xn--node", "xn--nqv7f", "xn--nqv7fs00ema", "xn--nyqy26a", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1acf", "xn--p1ai", "xn--pbt977c", "xn--pgbs0dh", "xn--pssy2u", "xn--q9jyb4c", "xn--qcka1pmc", "xn--qxam", "xn--rhqv96g", "xn--rovu88b", "xn--s9brj9c", "xn--ses554g", "xn--t60b56a", "xn--tckwe", "xn--tiq49xqyj", "xn--unup4y", "xn--vermgensberater-ctb", "xn--vermgensberatung-pwb", "xn--vhquv", "xn--vuq861b", "xn--w4r85el8fhu5dnra", "xn--w4rs40l", "xn--wgbh1c", "xn--wgbl6a", "xn--xhq521b", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--y9a3aq", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zfr164b", "xperia", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "za", "zappos", "zara", "zero", "zip", "zippo", "zm", "zone", "zuerich", "zw"], a.htmlAttrs = ["src=", "data=", "href=", "cite=", "formaction=", "icon=", "manifest=", "poster=", "codebase=", "background=", "profile=", "usemap="];
  }),
      t = e(function (e, a) {
    function t(e) {
      var a = e.match(o);if (null === a) return !1;for (var t = r.length - 1; t >= 0; t--) {
        if (r[t].test(e)) return !1;
      }var i = a[2];return !!i && -1 !== n.tlds.indexOf(i);
    }Object.defineProperty(a, "__esModule", { value: !0 });var o = /^[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?$/i,
        r = [/^[!#$%&'*+\-\/=?^_`{|}~.]/, /[.]{2,}[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@/i, /\.@/];a.default = t;
  }),
      o = e(function (e, n) {
    function t(e) {
      if (!o.test(e)) return !1;var n = e.split("."),
          t = Number(n[0]);if (isNaN(t) || t > 255 || t < 0) return !1;var r = Number(n[1]);if (isNaN(r) || r > 255 || r < 0) return !1;var i = Number(n[2]);if (isNaN(i) || i > 255 || i < 0) return !1;var s = Number((n[3].match(/^\d+/) || [])[0]);if (isNaN(s) || s > 255 || s < 0) return !1;var c = (n[3].match(/(^\d+)(:)(\d+)/) || [])[3];return !(c && !a.isPort(c));
    }Object.defineProperty(n, "__esModule", { value: !0 });var o = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;n.default = t;
  }),
      r = e(function (e, t) {
    function o(e) {
      var t = e.match(r);return null !== t && "string" == typeof t[3] && -1 !== n.tlds.indexOf(t[3].toLowerCase()) && !(t[5] && !a.isPort(t[5]));
    }Object.defineProperty(t, "__esModule", { value: !0 });var r = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;t.default = o;
  }),
      i = e(function (e, a) {
    function n(e, a, t) {
      return e.forEach(function (o, r) {
        !(o.indexOf(".") > -1) || e[r - 1] === a && e[r + 1] === t || e[r + 1] !== a && e[r + 1] !== t || (e[r] = e[r] + e[r + 1], "string" == typeof e[r + 2] && (e[r] = e[r] + e[r + 2]), "string" == typeof e[r + 3] && (e[r] = e[r] + e[r + 3]), "string" == typeof e[r + 4] && (e[r] = e[r] + e[r + 4]), e.splice(r + 1, 4), n(e, a, t));
      }), e;
    }function t(e) {
      return e = n(e, "(", ")"), e = n(e, "[", "]"), e = n(e, '"', '"'), e = n(e, "'", "'");
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.fixSeparators = n, a.default = t;
  }),
      s = e(function (e, a) {
    function n(e) {
      var a = e.replace(/([\s\(\)\[\]<>"'])/g, "\0$1\0").replace(/([?;:,.!]+)(?=(\0|$|\s))/g, "\0$1\0").split("\0");return i.default(a);
    }function t(e) {
      return e.join("");
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.separate = n, a.deSeparate = t;
  }),
      c = e(function (e, a) {
    function n(e) {
      return e = e.toLowerCase(), 0 === e.indexOf("http://") ? "http://" : 0 === e.indexOf("https://") ? "https://" : 0 === e.indexOf("ftp://") ? "ftp://" : 0 === e.indexOf("ftps://") ? "ftps://" : 0 === e.indexOf("file:///") ? "file:///" : 0 === e.indexOf("mailto:") && "mailto:";
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.default = n;
  }),
      l = e(function (e, a) {
    function i(e, a) {
      return e.map(function (i, s) {
        var l = encodeURI(i);if (l.indexOf(".") < 1 && !c.default(l)) return i;var u = null,
            d = c.default(l) || "";return d && (l = l.substr(d.length)), a.files && "file:///" === d && l.split(/\/|\\/).length - 1 && (u = { reason: "file", protocol: d, raw: i, encoded: l }), !u && a.urls && r.default(l) && (u = { reason: "url", protocol: d || ("function" == typeof a.defaultProtocol ? a.defaultProtocol(i) : a.defaultProtocol), raw: i, encoded: l }), !u && a.emails && t.default(l) && (u = { reason: "email", protocol: "mailto:", raw: i, encoded: l }), !u && a.ips && o.default(l) && (u = { reason: "ip", protocol: d || ("function" == typeof a.defaultProtocol ? a.defaultProtocol(i) : a.defaultProtocol), raw: i, encoded: l }), u && ("'" !== e[s - 1] && '"' !== e[s - 1] || !~n.htmlAttrs.indexOf(e[s - 2])) ? u : i;
      });
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.default = i;
  }),
      u = e(function (e, a) {
    function n(e, a) {
      var n = o.separate(e),
          r = l.default(n, a);if (a.exclude) for (var i = 0; i < r.length; i++) {
        var c = r[i];"object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && a.exclude(c) && (r[i] = c.raw);
      }if (a.list) {
        for (var u = [], d = 0; d < r.length; d++) {
          var b = r[d];"string" != typeof b && u.push(b);
        }return u;
      }return r = r.map(function (e) {
        return "string" == typeof e ? e : t(e, a);
      }), s.deSeparate(r);
    }function t(e, a) {
      var n = e.protocol + e.encoded,
          t = e.raw;return "number" == typeof a.truncate && t.length > a.truncate && (t = t.substring(0, a.truncate) + "..."), "object" == _typeof(a.truncate) && t.length > a.truncate[0] + a.truncate[1] && (t = t.substr(0, a.truncate[0]) + "..." + t.substr(t.length - a.truncate[1])), void 0 === a.attributes && (a.attributes = []), '<a href="' + n + '" ' + a.attributes.map(function (a) {
        if ("function" != typeof a) return " " + a.name + '="' + a.value + '" ';var n = (a(e) || {}).name,
            t = (a(e) || {}).value;return n && !t ? " name " : n && t ? " " + n + '="' + t + '" ' : void 0;
      }).join("") + ">" + t + "</a>";
    }Object.defineProperty(a, "__esModule", { value: !0 });var o = s;a.default = n;
  }),
      d = e(function (e, n) {
    Object.defineProperty(n, "__esModule", { value: !0 });var i = function i(e, n) {
      return n = a.defaultOptions(n), u.default(e, n);
    };i.validate = { ip: o.default, url: function url(e) {
        var a = c.default(e) || "";return e = e.substr(a.length), e = encodeURI(e), r.default(e);
      }, email: t.default }, n.default = i;
  });return function (e) {
    return e && e.__esModule ? e.default : e;
  }(d);
});

/***/ }),

/***/ "./src/js/util/color.js":
/*!******************************!*\
  !*** ./src/js/util/color.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var colorUtils = exports.colorUtils = {
	to888: function to888(R, G, B) {
		return [R * 527 + 23 >> 6, G * 259 + 33 >> 6, B * 527 + 23 >> 6];
	},
	to565: function to565(R, G, B) {
		return [R * 249 + 1014 >> 11, G * 253 + 505 >> 10, B * 249 + 1014 >> 11];
	},
	u16_565: function u16_565(R, G, B) {
		return B << 11 | G << 5 | R;
	},
	u24_888: function u24_888(R, G, B) {
		return B << 16 | G << 8 | R;
	},
	u32_888: function u32_888(R, G, B) {
		return colorUtils.u24_888(R, G, B) | 0xFF000000;
	},
	u16_565_to_888: function u16_565_to_888(color) {
		var R = (color & 31) * 527 + 23 >> 6;
		var G = (color >> 5 & 31) * 527 + 23 >> 6;
		var B = (color >> 11 & 31) * 527 + 23 >> 6;
		return B << 16 | G << 8 | R;
	},
	arrFrom565: function arrFrom565(color) {
		return [color & 31, color >> 5 & 63, color >> 11 & 31];
	},
	/* Takes an integer, and gives an html compatible color */
	toHTML: function toHTML(color) {
		color = (color >> 16 & 0xFF | color & 0xFF00 | color << 16 & 0xFF0000).toString(16);
		return '#' + ('000000' + color).substring(color.length);
	}
};

/***/ }),

/***/ "./src/js/util/misc.js":
/*!*****************************!*\
  !*** ./src/js/util/misc.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTime = getTime;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.cookiesEnabled = cookiesEnabled;
exports.storageEnabled = storageEnabled;
exports.propertyDefaults = propertyDefaults;
exports.absMod = absMod;
exports.htmlToElement = htmlToElement;
exports.escapeHTML = escapeHTML;
exports.mkHTML = mkHTML;
exports.loadScript = loadScript;
exports.eventOnce = eventOnce;
exports.setTooltip = setTooltip;
exports.waitFrames = waitFrames;
exports.decompress = decompress;
exports.line = line;

var _color = __webpack_require__(/*! ./color.js */ "./src/js/util/color.js");

var _global = __webpack_require__(/*! ./../global.js */ "./src/js/global.js");

_global.PublicAPI.util = {
	getTime: getTime,
	cookiesEnabled: cookiesEnabled,
	storageEnabled: storageEnabled,
	absMod: absMod,
	escapeHTML: escapeHTML,
	mkHTML: mkHTML,
	setTooltip: setTooltip,
	waitFrames: waitFrames,
	line: line,
	loadScript: loadScript
};

var time = Date.now();
function getTime(update) {
	return update ? time = Date.now() : time;
}

function setCookie(name, value) {
	document.cookie = name + '=' + value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

function getCookie(name) {
	var cookie = document.cookie.split(';');
	for (var i = 0; i < cookie.length; i++) {
		var idx = cookie[i].indexOf(name + '=');
		if (idx === 0 || idx === 1 && cookie[i][0] === ' ') {
			var off = idx + name.length + 1;
			return cookie[i].substring(off, cookie[i].length);
		}
	}
	return null;
}

function cookiesEnabled() {
	return navigator.cookieEnabled;
}

function storageEnabled() {
	try {
		return !!window.localStorage;
	} catch (e) {
		return false;
	}
}

function propertyDefaults(obj, defaults) {
	if (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				defaults[prop] = obj[prop];
			}
		}
	}
	return defaults;
}

// This fixes modulo to work on negative numbers (-1 % 16 = 15)
function absMod(n1, n2) {
	return (n1 % n2 + n2) % n2;
}

function htmlToElement(html) {
	return mkHTML("template", {
		innerHTML: html
	}).content.firstChild;
}

function escapeHTML(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;').replace(/\//g, '&#x2F;');
}

/* Makes an HTML element with the values specified in opts */
function mkHTML(tag, opts) {
	var elm = document.createElement(tag);
	for (var i in opts) {
		elm[i] = opts[i];
	}
	return elm;
}

function loadScript(name, callback) {
	document.getElementsByTagName('head')[0].appendChild(mkHTML("script", {
		type: "text/javascript",
		src: name,
		onload: callback
	}));
}

function eventOnce(element, events, func) {
	var ev = events.split(' ');
	var f = function f(e) {
		for (var i = 0; i < ev.length; i++) {
			element.removeEventListener(ev[i], f);
		}
		return func();
	};

	for (var i = 0; i < ev.length; i++) {
		element.addEventListener(ev[i], f);
	}
}

function setTooltip(element, message) {
    var elementSpacing = 10;
    var intr = 0;
    var tip = null;
    var observer = null; // MutationObserver instance

    function tooltip() {
        var epos = element.getBoundingClientRect();
        var y = epos.top + epos.height / 2;
        tip = mkHTML('span', {
            innerHTML: message,
            className: 'framed tooltip whitetext'
        });
        document.body.appendChild(tip);
        var tpos = tip.getBoundingClientRect();
        y -= tpos.height / 2;
        var x = epos.left - tpos.width - elementSpacing;
        if(x < elementSpacing) {
            x = epos.right + elementSpacing;
        }
        tip.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
        intr = 0;
    }

    var mleave = function mleave(e) {
        clearTimeout(intr);
        intr = 0;
        element.removeEventListener('mouseleave', mleave);
        element.removeEventListener('click', mleave);

        if(observer) {
            observer.disconnect();
            observer = null;
        }

        if(tip !== null) {
            tip.remove();
            tip = null;
        }
    };

    var menter = function menter(e) {
        if(tip === null && intr === 0) {
            intr = setTimeout(tooltip, 500);
            element.addEventListener('click', mleave);
            element.addEventListener('mouseleave', mleave);

            // Create the MutationObserver only if it doesn't exist
            if(!observer) {
                observer = new MutationObserver(function(mutationsList, observer) {
                    mutationsList.forEach(function(mutation) {
                        if(mutation.removedNodes.length > 0 && (tip !== null || intr !== 0)) {
                            mleave();
                        }
                    });
                });

                observer.observe(element, {
                    childList: true,
                    subtree: true
                });
            }
        }
    };

    element.addEventListener('mouseenter', menter);
}

/* Waits n frames */
function waitFrames(n, cb) {
	window.requestAnimationFrame(function () {
		return n > 0 ? waitFrames(--n, cb) : cb();
	});
}

function decompress(u8arr) {
	var originalLength = u8arr[1] << 8 | u8arr[0];
	var u8decompressedarr = new Uint8Array(originalLength);
	var numOfRepeats = u8arr[3] << 8 | u8arr[2];
	var offset = numOfRepeats * 2 + 4;
	var uptr = 0;
	var cptr = offset;
	for (var i = 0; i < numOfRepeats; i++) {
		var currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
		while (cptr < currentRepeatLoc) {
			u8decompressedarr[uptr++] = u8arr[cptr++];
		}
		var repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
		var repeatedColorR = u8arr[cptr + 2];
		var repeatedColorG = u8arr[cptr + 3];
		var repeatedColorB = u8arr[cptr + 4];
		cptr += 5;
		while (repeatedNum--) {
			u8decompressedarr[uptr] = repeatedColorR;
			u8decompressedarr[uptr + 1] = repeatedColorG;
			u8decompressedarr[uptr + 2] = repeatedColorB;
			uptr += 3;
		}
	}
	while (cptr < u8arr.length) {
		u8decompressedarr[uptr++] = u8arr[cptr++];
	}
	return u8decompressedarr;
}

/*function decompressu16(input) {
	var originalLength = (((input[1] & 0xFF) << 8 | (input[0] & 0xFF)) + 1) * 2;
	var output = new Uint8Array(originalLength);
	var numOfRepeats = (input[3] & 0xFF) << 8 | (input[2] & 0xFF);
	var offset = numOfRepeats * 2 + 4;
	var uptr = 0;
	var cptr = offset;
	for (var i = 0; i < numOfRepeats; i++) {
		var currentRepeatLoc = 2 * ((((input[4 + i * 2 + 1] & 0xFF) << 8) | (input[4 + i * 2] & 0xFF)))
				+ offset;
		while (cptr < currentRepeatLoc) {
			output[uptr++] = input[cptr++];
		}
		var repeatedNum = ((input[cptr + 1] & 0xFF) << 8 | (input[cptr] & 0xFF)) + 1;
		var repeatedColorRGB = (input[cptr + 3] & 0xFF) << 8 | (input[cptr + 2] & 0xFF);
		cptr += 4;
		while (repeatedNum-- != 0) {
			output[uptr] = (repeatedColorRGB & 0xFF);
			output[uptr + 1] = ((repeatedColorRGB & 0xFF00) >> 8);
			uptr += 2;
		}
	}
	while (cptr < input.length) {
		output[uptr++] = input[cptr++];
	}
	return output;
}*/

function line(x1, y1, x2, y2, size, plot) {
	var dx = Math.abs(x2 - x1),
	    sx = x1 < x2 ? 1 : -1;
	var dy = -Math.abs(y2 - y1),
	    sy = y1 < y2 ? 1 : -1;
	var err = dx + dy,
	    e2;

	while (true) {
		plot(x1, y1);
		if (x1 == x2 && y1 == y2) break;
		e2 = 2 * err;
		if (e2 >= dy) {
			err += dy;x1 += sx;
		}
		if (e2 <= dx) {
			err += dx;y1 += sy;
		}
	}
}

/***/ }),

/***/ "./src/js/util/normalizeWheel.js":
/*!***************************************!*\
  !*** ./src/js/util/normalizeWheel.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */

/* source: https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js */



// Reasonable defaults

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeWheel = normalizeWheel;
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function normalizeWheel( /*object*/event) /*object*/{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return { spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY };
}

/***/ }),

/***/ "./src/js/windowsys.js":
/*!*****************************!*\
  !*** ./src/js/windowsys.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.windowSys = undefined;
exports.UtilInput = UtilInput;
exports.UtilDialog = UtilDialog;
exports.OWOPDropDown = OWOPDropDown;
exports.GUIWindow = GUIWindow;
exports.addWindow = addWindow;
exports.delWindow = delWindow;
exports.centerWindow = centerWindow;

var _main = __webpack_require__(/*! ./main.js */ "./src/js/main.js");

var _conf = __webpack_require__(/*! ./conf.js */ "./src/js/conf.js");

var _global = __webpack_require__(/*! ./global.js */ "./src/js/global.js");

var _misc = __webpack_require__(/*! ./util/misc.js */ "./src/js/util/misc.js");

var windowSys = exports.windowSys = {
	windows: {},
	class: {
		input: UtilInput,
		dialog: UtilDialog,
		dropDown: OWOPDropDown,
		window: GUIWindow
	},
	addWindow: addWindow,
	delWindow: delWindow,
	centerWindow: centerWindow,
	closeAllWindows: closeAllWindows
};

_global.PublicAPI.windowSys = windowSys;

function closeAllWindows() {
	for (var x in windowSys.windows) {
		windowSys.windows[x].close();
	}
}

function UtilInput(title, message, inputType, cb) {
	this.win = new GUIWindow(title, {
		centerOnce: true,
		closeable: true
	}, function (win) {
		this.inputField = win.addObj((0, _misc.mkHTML)("input", {
			style: "width: 100%; height: 50%;",
			type: inputType,
			placeholder: message,
			onkeyup: function (e) {
				if ((e.which || e.keyCode) == 13) {
					this.okButton.click();
				}
			}.bind(this)
		}));
		this.okButton = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: "OK",
			style: "width: 100%; height: 50%;",
			onclick: function () {
				cb(this.inputField.value);
				this.getWindow().close();
			}.bind(this)
		}));
	}.bind(this)).resize(200, 60);
}

UtilInput.prototype.getWindow = function () {
	return this.win;
};

function UtilDialog(title, message, canClose, cb) {
	this.win = new GUIWindow(title, {
		centered: true,
		closeable: canClose
	}, function (win) {
		this.messageBox = win.addObj((0, _misc.mkHTML)("span", {
			className: "whitetext",
			style: "display: block; padding-bottom: 4px;",
			innerHTML: message
		}));
		this.okButton = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: "OK",
			style: "display: block; width: 80px; height: 30px; margin: auto;",
			onclick: function () {
				cb();
				this.getWindow().close();
			}.bind(this)
		}));
	}.bind(this));
}

UtilDialog.prototype.getWindow = function () {
	return this.win;
};

/* Highly specific purpose, should only be created once */
function OWOPDropDown() {
	this.win = new GUIWindow(null, {
		immobile: true
	}, function (win) {
		win.frame.className = "owopdropdown";
		win.container.style.cssText = "border: none;\
			background-color: initial;\
			pointer-events: none;\
			margin: 0;";
		var hlpdiv = win.addObj((0, _misc.mkHTML)("div", {
			className: "winframe",
			style: "padding: 0;\
				width: 68px; height: 64px;"
		}));
		var hidebtn = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: 'hi'
			/*className: "winframe",
   style: "padding: 0;\
   background-color: #ffd162;\
   left: -6px; top: 70px;\
   width: 38px; height: 36px;"*/
		}));
		/*var rddtbtn = win.addObj(mkHTML("button", {
  	className: "winframe",
  	style: "padding: 0;\
  	right: -6px; top: 70px;\
  	width: 38px; height: 36px;"
  }));*/
		var hlpcontainer = (0, _misc.mkHTML)("div", {
			className: "wincontainer",
			style: "margin-top: -5px;"
		});
		hlpdiv.appendChild(hlpcontainer);
		hlpcontainer.appendChild((0, _misc.mkHTML)("button", {
			style: "background-image: url(img/gui.png);\
				background-position: -64px 4px;\
				background-origin: border-box;\
				background-repeat: no-repeat;\
				width: 100%; height: 100%;",
			onclick: function () {
				console.log("help");
			}.bind(this)
		}));
	}).resize(68, 64);
}

OWOPDropDown.prototype.getWindow = function () {
	return this.win;
};

/* wm = WindowManager object
 * initfunc = function where all the windows objects should be added,
 *            first function argument is the guiwindow object itself
 */
function GUIWindow(title, options, initfunc) {
	var _this = this;

	options = options || {};
	this.wm = WorldOfPixels.windowsys;
	this.opt = options;
	this.title = title;
	this.frame = document.createElement("div");
	this.container = document.createElement("div");
	this.container.className = 'wincontainer';

	if (title) {
		this.titlespan = document.createElement("span");
		this.titlespan.innerHTML = title;

		this.frame.appendChild(this.titlespan);
	}

	this.frame.appendChild(this.container);

	if (options.centered) {
		options.immobile = true;
		this.frame.className = "centered";
	}

	Object.defineProperty(this, "realw", {
		get: function () {
			return this.frame.offsetWidth;
		}.bind(this)
	});
	Object.defineProperty(this, "realh", {
		get: function () {
			return this.frame.offsetHeight;
		}.bind(this)
	});

	this.elements = [];

	this.creationtime = Date.now();
	this.currentaction = null; /* Func to call every mousemove evt */

	if (initfunc) {
		initfunc(this);
	}

	this.mdownfunc = function (e) {
		var offx = e.clientX - this.x;
		var offy = e.clientY - this.y;
		if (e.target === this.frame && !this.opt.immobile) {
			this.currentaction = function (x, y) {
				x = x <= 0 ? 0 : x > window.innerWidth ? window.innerWidth : x;
				y = y <= 0 ? 0 : y > window.innerHeight ? window.innerHeight : y;
				this.move(x - offx, y - offy);
			};
		}
	}.bind(this);

	if (options.centerOnce) {
		/* Ugly solution to wait for offset(Height, Width) values to be available */
		this.move(window.innerWidth, window.innerHeight); /* Hide the window */
		(0, _misc.waitFrames)(2, function () {
			return centerWindow(_this);
		});
	}

	this.frame.addEventListener("mousedown", this.mdownfunc);

	this.mupfunc = function (e) {
		this.currentaction = null;
	}.bind(this);

	window.addEventListener("mouseup", this.mupfunc);

	this.mmovefunc = function (e) {
		if (this.currentaction) {
			this.currentaction(e.clientX, e.clientY);
		}
	}.bind(this);

	window.addEventListener("mousemove", this.mmovefunc);

	this.touchfuncbuilder = function (type) {
		var _this2 = this;

		return function (event) {
			var handlers = {
				start: _this2.mdownfunc,
				move: _this2.mmovefunc,
				end: _this2.mupfunc,
				cancel: _this2.mupfunc
			};
			var handler = handlers[type];
			if (handler) {
				var touches = event.changedTouches;
				if (touches.length > 0) {
					handler(touches[0]);
				}
			}
		};
	}.bind(this);

	this.frame.addEventListener("touchstart", this.touchfuncbuilder("start"));
	this.frame.addEventListener("touchmove", this.touchfuncbuilder("move"));
	this.frame.addEventListener("touchend", this.touchfuncbuilder("end"));
	this.frame.addEventListener("touchcancel", this.touchfuncbuilder("cancel"));

	if (options.closeable) {
		this.frame.appendChild((0, _misc.mkHTML)("button", {
			onclick: function () {
				this.close();
			}.bind(this),
			className: 'windowCloseButton'
		}));
	}
}

GUIWindow.prototype.getWindow = function () {
	return this;
};

GUIWindow.prototype.addObj = function (object) {
	this.elements.push(object);
	this.container.appendChild(object);
	return object;
};

GUIWindow.prototype.delObj = function (object) {
	var i = this.elements.indexOf(object);
	if (i != -1) {
		this.elements.splice(i, 1);
		this.container.removeChild(object);
	}
};

GUIWindow.prototype.move = function (x, y) {
	if (!this.opt.immobile) {
		this.frame.style.transform = "translate(" + x + "px," + y + "px)";
		this.x = x;
		this.y = y;
	}
	return this;
};

GUIWindow.prototype.resize = function (w, h) {
	this.w = w;
	this.h = h;
	this.container.style.width = w + "px";
	this.container.style.height = h + "px";
	return this;
};

GUIWindow.prototype.close = function () {
	delWindow(this);
	window.removeEventListener("mousemove", this.mmovefunc);
	window.removeEventListener("mouseup", this.mupfunc);
	this.frame.removeEventListener("mousedown", this.mdownfunc);
	if (this.onclose) {
		this.onclose();
	}
};

/* Window X/Y is specified on window.x, window.y */
function addWindow(window) {
	if (_conf.options.noUi) {
		return window;
	}

	var realWindow = window.getWindow();
	if (!windowSys.windows[realWindow.title]) {
		_main.elements.windows.appendChild(realWindow.frame);
		windowSys.windows[realWindow.title] = realWindow;
	}
	_global.eventSys.emit(_conf.EVENTS.misc.windowAdded, window);
	return window;
}

function delWindow(window) {
	var realWindow = window.getWindow();
	if (windowSys.windows[realWindow.title]) {
		_main.elements.windows.removeChild(realWindow.frame);
		delete windowSys.windows[realWindow.title];
	}
	return window;
}

function centerWindow(win) {
	win = win.getWindow();
	win.move(window.innerWidth / 2 - win.realw / 2 | 0, window.innerHeight / 2 - win.realh / 2 | 0);
}

/***/ })

/******/ });
//# sourceMappingURL=app.js.map
