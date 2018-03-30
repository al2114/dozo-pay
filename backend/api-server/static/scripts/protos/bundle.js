(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}

},{}],2:[function(require,module,exports){
"use strict";

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};

},{}],3:[function(require,module,exports){
"use strict";
module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}

},{}],5:[function(require,module,exports){
"use strict";
module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

},{}],6:[function(require,module,exports){
"use strict";
module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

},{}],7:[function(require,module,exports){
"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};

},{}],8:[function(require,module,exports){
// minimal library entry point.

"use strict";
module.exports = require("./src/index-minimal");

},{"./src/index-minimal":9}],9:[function(require,module,exports){
"use strict";
var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = require("./writer");
protobuf.BufferWriter = require("./writer_buffer");
protobuf.Reader       = require("./reader");
protobuf.BufferReader = require("./reader_buffer");

// Utility
protobuf.util         = require("./util/minimal");
protobuf.rpc          = require("./rpc");
protobuf.roots        = require("./roots");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Configure serialization
protobuf.Writer._configure(protobuf.BufferWriter);
configure();

},{"./reader":10,"./reader_buffer":11,"./roots":12,"./rpc":13,"./util/minimal":16,"./writer":17,"./writer_buffer":18}],10:[function(require,module,exports){
"use strict";
module.exports = Reader;

var util      = require("./util/minimal");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                if ((wireType = this.uint32() & 7) === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};

},{"./util/minimal":16}],11:[function(require,module,exports){
"use strict";
module.exports = BufferReader;

// extends Reader
var Reader = require("./reader");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = require("./util/minimal");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

},{"./reader":10,"./util/minimal":16}],12:[function(require,module,exports){
"use strict";
module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */

},{}],13:[function(require,module,exports){
"use strict";

/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = require("./rpc/service");

},{"./rpc/service":14}],14:[function(require,module,exports){
"use strict";
module.exports = Service;

var util = require("../util/minimal");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};

},{"../util/minimal":16}],15:[function(require,module,exports){
"use strict";
module.exports = LongBits;

var util = require("../util/minimal");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};

},{"../util/minimal":16}],16:[function(require,module,exports){
(function (global){
"use strict";
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = require("@protobufjs/aspromise");

// converts to / from base64 encoded strings
util.base64 = require("@protobufjs/base64");

// base class of rpc.Service
util.EventEmitter = require("@protobufjs/eventemitter");

// float handling accross browsers
util.float = require("@protobufjs/float");

// requires modules optionally and hides the call from bundlers
util.inquire = require("@protobufjs/inquire");

// converts to / from utf8 encoded strings
util.utf8 = require("@protobufjs/utf8");

// provides a node-like buffer pool in the browser
util.pool = require("@protobufjs/pool");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = require("./longbits");

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ global.dcodeIO && /* istanbul ignore next */ global.dcodeIO.Long || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./longbits":15,"@protobufjs/aspromise":1,"@protobufjs/base64":2,"@protobufjs/eventemitter":3,"@protobufjs/float":4,"@protobufjs/inquire":5,"@protobufjs/pool":6,"@protobufjs/utf8":7}],17:[function(require,module,exports){
"use strict";
module.exports = Writer;

var util      = require("./util/minimal");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};

},{"./util/minimal":16}],18:[function(require,module,exports){
"use strict";
module.exports = BufferWriter;

// extends Writer
var Writer = require("./writer");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = require("./util/minimal");

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

},{"./util/minimal":16,"./writer":17}],19:[function(require,module,exports){
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pesto = (function() {

    /**
     * Namespace pesto.
     * @exports pesto
     * @namespace
     */
    var pesto = {};

    pesto.models = (function() {

        /**
         * Namespace models.
         * @memberof pesto
         * @namespace
         */
        var models = {};

        models.Claim = (function() {

            /**
             * Properties of a Claim.
             * @memberof pesto.models
             * @interface IClaim
             * @property {string|null} [identifier] Claim identifier
             * @property {string|null} [name] Claim name
             * @property {pesto.models.IUser|null} [owner] Claim owner
             */

            /**
             * Constructs a new Claim.
             * @memberof pesto.models
             * @classdesc Represents a Claim.
             * @implements IClaim
             * @constructor
             * @param {pesto.models.IClaim=} [properties] Properties to set
             */
            function Claim(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Claim identifier.
             * @member {string} identifier
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.identifier = "";

            /**
             * Claim name.
             * @member {string} name
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.name = "";

            /**
             * Claim owner.
             * @member {pesto.models.IUser|null|undefined} owner
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.owner = null;

            /**
             * Creates a new Claim instance using the specified properties.
             * @function create
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim=} [properties] Properties to set
             * @returns {pesto.models.Claim} Claim instance
             */
            Claim.create = function create(properties) {
                return new Claim(properties);
            };

            /**
             * Encodes the specified Claim message. Does not implicitly {@link pesto.models.Claim.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim} message Claim message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Claim.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.identifier);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.owner != null && message.hasOwnProperty("owner"))
                    $root.pesto.models.User.encode(message.owner, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Claim message, length delimited. Does not implicitly {@link pesto.models.Claim.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim} message Claim message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Claim.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Claim message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Claim
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Claim} Claim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Claim.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Claim();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.identifier = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.owner = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Claim message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Claim
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Claim} Claim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Claim.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Claim message.
             * @function verify
             * @memberof pesto.models.Claim
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Claim.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    if (!$util.isString(message.identifier))
                        return "identifier: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.owner != null && message.hasOwnProperty("owner")) {
                    var error = $root.pesto.models.User.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                return null;
            };

            /**
             * Creates a Claim message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Claim
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Claim} Claim
             */
            Claim.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Claim)
                    return object;
                var message = new $root.pesto.models.Claim();
                if (object.identifier != null)
                    message.identifier = String(object.identifier);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".pesto.models.Claim.owner: object expected");
                    message.owner = $root.pesto.models.User.fromObject(object.owner);
                }
                return message;
            };

            /**
             * Creates a plain object from a Claim message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.Claim} message Claim
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Claim.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.identifier = "";
                    object.name = "";
                    object.owner = null;
                }
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    object.identifier = message.identifier;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.owner != null && message.hasOwnProperty("owner"))
                    object.owner = $root.pesto.models.User.toObject(message.owner, options);
                return object;
            };

            /**
             * Converts this Claim to JSON.
             * @function toJSON
             * @memberof pesto.models.Claim
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Claim.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Claim;
        })();

        models.User = (function() {

            /**
             * Properties of a User.
             * @memberof pesto.models
             * @interface IUser
             * @property {number|null} [uid] User uid
             * @property {string|null} [phoneNo] User phoneNo
             * @property {string|null} [pictureUrl] User pictureUrl
             * @property {number|null} [balance] User balance
             * @property {string|null} [username] User username
             */

            /**
             * Constructs a new User.
             * @memberof pesto.models
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {pesto.models.IUser=} [properties] Properties to set
             */
            function User(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * User uid.
             * @member {number} uid
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.uid = 0;

            /**
             * User phoneNo.
             * @member {string} phoneNo
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.phoneNo = "";

            /**
             * User pictureUrl.
             * @member {string} pictureUrl
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.pictureUrl = "";

            /**
             * User balance.
             * @member {number} balance
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.balance = 0;

            /**
             * User username.
             * @member {string} username
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.username = "";

            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser=} [properties] Properties to set
             * @returns {pesto.models.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };

            /**
             * Encodes the specified User message. Does not implicitly {@link pesto.models.User.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.phoneNo);
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.pictureUrl);
                if (message.balance != null && message.hasOwnProperty("balance"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.balance);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.username);
                return writer;
            };

            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link pesto.models.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.User();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.phoneNo = reader.string();
                        break;
                    case 3:
                        message.pictureUrl = reader.string();
                        break;
                    case 4:
                        message.balance = reader.int32();
                        break;
                    case 5:
                        message.username = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a User message.
             * @function verify
             * @memberof pesto.models.User
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            User.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    if (!$util.isString(message.phoneNo))
                        return "phoneNo: string expected";
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    if (!$util.isString(message.pictureUrl))
                        return "pictureUrl: string expected";
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (!$util.isInteger(message.balance))
                        return "balance: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };

            /**
             * Creates a User message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.User)
                    return object;
                var message = new $root.pesto.models.User();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.phoneNo != null)
                    message.phoneNo = String(object.phoneNo);
                if (object.pictureUrl != null)
                    message.pictureUrl = String(object.pictureUrl);
                if (object.balance != null)
                    message.balance = object.balance | 0;
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };

            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.User} message User
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            User.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.phoneNo = "";
                    object.pictureUrl = "";
                    object.balance = 0;
                    object.username = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    object.phoneNo = message.phoneNo;
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    object.pictureUrl = message.pictureUrl;
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = message.balance;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };

            /**
             * Converts this User to JSON.
             * @function toJSON
             * @memberof pesto.models.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return User;
        })();

        models.Room = (function() {

            /**
             * Properties of a Room.
             * @memberof pesto.models
             * @interface IRoom
             * @property {number|null} [uid] Room uid
             * @property {pesto.models.IUser|null} [owner] Room owner
             * @property {string|null} [name] Room name
             * @property {Array.<pesto.models.IRoomItem>|null} [item] Room item
             * @property {Array.<pesto.models.IUser>|null} [invited] Room invited
             */

            /**
             * Constructs a new Room.
             * @memberof pesto.models
             * @classdesc Represents a Room.
             * @implements IRoom
             * @constructor
             * @param {pesto.models.IRoom=} [properties] Properties to set
             */
            function Room(properties) {
                this.item = [];
                this.invited = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Room uid.
             * @member {number} uid
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.uid = 0;

            /**
             * Room owner.
             * @member {pesto.models.IUser|null|undefined} owner
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.owner = null;

            /**
             * Room name.
             * @member {string} name
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.name = "";

            /**
             * Room item.
             * @member {Array.<pesto.models.IRoomItem>} item
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.item = $util.emptyArray;

            /**
             * Room invited.
             * @member {Array.<pesto.models.IUser>} invited
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.invited = $util.emptyArray;

            /**
             * Creates a new Room instance using the specified properties.
             * @function create
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom=} [properties] Properties to set
             * @returns {pesto.models.Room} Room instance
             */
            Room.create = function create(properties) {
                return new Room(properties);
            };

            /**
             * Encodes the specified Room message. Does not implicitly {@link pesto.models.Room.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom} message Room message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Room.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.owner != null && message.hasOwnProperty("owner"))
                    $root.pesto.models.User.encode(message.owner, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.item != null && message.item.length)
                    for (var i = 0; i < message.item.length; ++i)
                        $root.pesto.models.RoomItem.encode(message.item[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.invited != null && message.invited.length)
                    for (var i = 0; i < message.invited.length; ++i)
                        $root.pesto.models.User.encode(message.invited[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Room message, length delimited. Does not implicitly {@link pesto.models.Room.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom} message Room message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Room.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Room message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Room
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Room} Room
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Room.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Room();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.owner = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        if (!(message.item && message.item.length))
                            message.item = [];
                        message.item.push($root.pesto.models.RoomItem.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        if (!(message.invited && message.invited.length))
                            message.invited = [];
                        message.invited.push($root.pesto.models.User.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Room message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Room
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Room} Room
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Room.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Room message.
             * @function verify
             * @memberof pesto.models.Room
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Room.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.owner != null && message.hasOwnProperty("owner")) {
                    var error = $root.pesto.models.User.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    if (!Array.isArray(message.item))
                        return "item: array expected";
                    for (var i = 0; i < message.item.length; ++i) {
                        var error = $root.pesto.models.RoomItem.verify(message.item[i]);
                        if (error)
                            return "item." + error;
                    }
                }
                if (message.invited != null && message.hasOwnProperty("invited")) {
                    if (!Array.isArray(message.invited))
                        return "invited: array expected";
                    for (var i = 0; i < message.invited.length; ++i) {
                        var error = $root.pesto.models.User.verify(message.invited[i]);
                        if (error)
                            return "invited." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Room message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Room
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Room} Room
             */
            Room.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Room)
                    return object;
                var message = new $root.pesto.models.Room();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".pesto.models.Room.owner: object expected");
                    message.owner = $root.pesto.models.User.fromObject(object.owner);
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.item) {
                    if (!Array.isArray(object.item))
                        throw TypeError(".pesto.models.Room.item: array expected");
                    message.item = [];
                    for (var i = 0; i < object.item.length; ++i) {
                        if (typeof object.item[i] !== "object")
                            throw TypeError(".pesto.models.Room.item: object expected");
                        message.item[i] = $root.pesto.models.RoomItem.fromObject(object.item[i]);
                    }
                }
                if (object.invited) {
                    if (!Array.isArray(object.invited))
                        throw TypeError(".pesto.models.Room.invited: array expected");
                    message.invited = [];
                    for (var i = 0; i < object.invited.length; ++i) {
                        if (typeof object.invited[i] !== "object")
                            throw TypeError(".pesto.models.Room.invited: object expected");
                        message.invited[i] = $root.pesto.models.User.fromObject(object.invited[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Room message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.Room} message Room
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Room.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.item = [];
                    object.invited = [];
                }
                if (options.defaults) {
                    object.uid = 0;
                    object.owner = null;
                    object.name = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.owner != null && message.hasOwnProperty("owner"))
                    object.owner = $root.pesto.models.User.toObject(message.owner, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.item && message.item.length) {
                    object.item = [];
                    for (var j = 0; j < message.item.length; ++j)
                        object.item[j] = $root.pesto.models.RoomItem.toObject(message.item[j], options);
                }
                if (message.invited && message.invited.length) {
                    object.invited = [];
                    for (var j = 0; j < message.invited.length; ++j)
                        object.invited[j] = $root.pesto.models.User.toObject(message.invited[j], options);
                }
                return object;
            };

            /**
             * Converts this Room to JSON.
             * @function toJSON
             * @memberof pesto.models.Room
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Room.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Room;
        })();

        models.RoomItem = (function() {

            /**
             * Properties of a RoomItem.
             * @memberof pesto.models
             * @interface IRoomItem
             * @property {number|null} [uid] RoomItem uid
             * @property {string|null} [name] RoomItem name
             * @property {number|null} [value] RoomItem value
             * @property {pesto.models.IUser|null} [lockedBy] RoomItem lockedBy
             */

            /**
             * Constructs a new RoomItem.
             * @memberof pesto.models
             * @classdesc Represents a RoomItem.
             * @implements IRoomItem
             * @constructor
             * @param {pesto.models.IRoomItem=} [properties] Properties to set
             */
            function RoomItem(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RoomItem uid.
             * @member {number} uid
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.uid = 0;

            /**
             * RoomItem name.
             * @member {string} name
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.name = "";

            /**
             * RoomItem value.
             * @member {number} value
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.value = 0;

            /**
             * RoomItem lockedBy.
             * @member {pesto.models.IUser|null|undefined} lockedBy
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.lockedBy = null;

            /**
             * Creates a new RoomItem instance using the specified properties.
             * @function create
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem=} [properties] Properties to set
             * @returns {pesto.models.RoomItem} RoomItem instance
             */
            RoomItem.create = function create(properties) {
                return new RoomItem(properties);
            };

            /**
             * Encodes the specified RoomItem message. Does not implicitly {@link pesto.models.RoomItem.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem} message RoomItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoomItem.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.value);
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy"))
                    $root.pesto.models.User.encode(message.lockedBy, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RoomItem message, length delimited. Does not implicitly {@link pesto.models.RoomItem.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem} message RoomItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoomItem.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RoomItem message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.RoomItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.RoomItem} RoomItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoomItem.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.RoomItem();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.value = reader.int32();
                        break;
                    case 4:
                        message.lockedBy = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RoomItem message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.RoomItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.RoomItem} RoomItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoomItem.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RoomItem message.
             * @function verify
             * @memberof pesto.models.RoomItem
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RoomItem.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy")) {
                    var error = $root.pesto.models.User.verify(message.lockedBy);
                    if (error)
                        return "lockedBy." + error;
                }
                return null;
            };

            /**
             * Creates a RoomItem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.RoomItem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.RoomItem} RoomItem
             */
            RoomItem.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.RoomItem)
                    return object;
                var message = new $root.pesto.models.RoomItem();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.value != null)
                    message.value = object.value | 0;
                if (object.lockedBy != null) {
                    if (typeof object.lockedBy !== "object")
                        throw TypeError(".pesto.models.RoomItem.lockedBy: object expected");
                    message.lockedBy = $root.pesto.models.User.fromObject(object.lockedBy);
                }
                return message;
            };

            /**
             * Creates a plain object from a RoomItem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.RoomItem} message RoomItem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RoomItem.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.name = "";
                    object.value = 0;
                    object.lockedBy = null;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy"))
                    object.lockedBy = $root.pesto.models.User.toObject(message.lockedBy, options);
                return object;
            };

            /**
             * Converts this RoomItem to JSON.
             * @function toJSON
             * @memberof pesto.models.RoomItem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RoomItem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RoomItem;
        })();

        models.Contact = (function() {

            /**
             * Properties of a Contact.
             * @memberof pesto.models
             * @interface IContact
             * @property {number|null} [uid] Contact uid
             * @property {string|null} [username] Contact username
             * @property {boolean|null} [trusted] Contact trusted
             */

            /**
             * Constructs a new Contact.
             * @memberof pesto.models
             * @classdesc Represents a Contact.
             * @implements IContact
             * @constructor
             * @param {pesto.models.IContact=} [properties] Properties to set
             */
            function Contact(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Contact uid.
             * @member {number} uid
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.uid = 0;

            /**
             * Contact username.
             * @member {string} username
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.username = "";

            /**
             * Contact trusted.
             * @member {boolean} trusted
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.trusted = false;

            /**
             * Creates a new Contact instance using the specified properties.
             * @function create
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact=} [properties] Properties to set
             * @returns {pesto.models.Contact} Contact instance
             */
            Contact.create = function create(properties) {
                return new Contact(properties);
            };

            /**
             * Encodes the specified Contact message. Does not implicitly {@link pesto.models.Contact.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.trusted);
                return writer;
            };

            /**
             * Encodes the specified Contact message, length delimited. Does not implicitly {@link pesto.models.Contact.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Contact message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Contact();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.trusted = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Contact message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Contact message.
             * @function verify
             * @memberof pesto.models.Contact
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Contact.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    if (typeof message.trusted !== "boolean")
                        return "trusted: boolean expected";
                return null;
            };

            /**
             * Creates a Contact message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Contact
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Contact} Contact
             */
            Contact.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Contact)
                    return object;
                var message = new $root.pesto.models.Contact();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.username != null)
                    message.username = String(object.username);
                if (object.trusted != null)
                    message.trusted = Boolean(object.trusted);
                return message;
            };

            /**
             * Creates a plain object from a Contact message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.Contact} message Contact
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Contact.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.username = "";
                    object.trusted = false;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    object.trusted = message.trusted;
                return object;
            };

            /**
             * Converts this Contact to JSON.
             * @function toJSON
             * @memberof pesto.models.Contact
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Contact.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Contact;
        })();

        return models;
    })();

    pesto.user_messages = (function() {

        /**
         * Namespace user_messages.
         * @memberof pesto
         * @namespace
         */
        var user_messages = {};

        user_messages.RegisterRequest = (function() {

            /**
             * Properties of a RegisterRequest.
             * @memberof pesto.user_messages
             * @interface IRegisterRequest
             * @property {string|null} [phoneNo] RegisterRequest phoneNo
             * @property {string|null} [username] RegisterRequest username
             * @property {string|null} [password] RegisterRequest password
             */

            /**
             * Constructs a new RegisterRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a RegisterRequest.
             * @implements IRegisterRequest
             * @constructor
             * @param {pesto.user_messages.IRegisterRequest=} [properties] Properties to set
             */
            function RegisterRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegisterRequest phoneNo.
             * @member {string} phoneNo
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.phoneNo = "";

            /**
             * RegisterRequest username.
             * @member {string} username
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.username = "";

            /**
             * RegisterRequest password.
             * @member {string} password
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.password = "";

            /**
             * Creates a new RegisterRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest instance
             */
            RegisterRequest.create = function create(properties) {
                return new RegisterRequest(properties);
            };

            /**
             * Encodes the specified RegisterRequest message. Does not implicitly {@link pesto.user_messages.RegisterRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest} message RegisterRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.phoneNo);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
                return writer;
            };

            /**
             * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link pesto.user_messages.RegisterRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest} message RegisterRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RegisterRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RegisterRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.phoneNo = reader.string();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegisterRequest message.
             * @function verify
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegisterRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    if (!$util.isString(message.phoneNo))
                        return "phoneNo: string expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                return null;
            };

            /**
             * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             */
            RegisterRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RegisterRequest)
                    return object;
                var message = new $root.pesto.user_messages.RegisterRequest();
                if (object.phoneNo != null)
                    message.phoneNo = String(object.phoneNo);
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };

            /**
             * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.RegisterRequest} message RegisterRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegisterRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.phoneNo = "";
                    object.username = "";
                    object.password = "";
                }
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    object.phoneNo = message.phoneNo;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };

            /**
             * Converts this RegisterRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegisterRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RegisterRequest;
        })();

        user_messages.RegisterResponse = (function() {

            /**
             * Properties of a RegisterResponse.
             * @memberof pesto.user_messages
             * @interface IRegisterResponse
             * @property {pesto.models.IUser|null} [user] RegisterResponse user
             * @property {boolean|null} [successful] RegisterResponse successful
             */

            /**
             * Constructs a new RegisterResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a RegisterResponse.
             * @implements IRegisterResponse
             * @constructor
             * @param {pesto.user_messages.IRegisterResponse=} [properties] Properties to set
             */
            function RegisterResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegisterResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             */
            RegisterResponse.prototype.user = null;

            /**
             * RegisterResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             */
            RegisterResponse.prototype.successful = false;

            /**
             * Creates a new RegisterResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse instance
             */
            RegisterResponse.create = function create(properties) {
                return new RegisterResponse(properties);
            };

            /**
             * Encodes the specified RegisterResponse message. Does not implicitly {@link pesto.user_messages.RegisterResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse} message RegisterResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link pesto.user_messages.RegisterResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse} message RegisterResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RegisterResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RegisterResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegisterResponse message.
             * @function verify
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegisterResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             */
            RegisterResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RegisterResponse)
                    return object;
                var message = new $root.pesto.user_messages.RegisterResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.RegisterResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.RegisterResponse} message RegisterResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegisterResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this RegisterResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegisterResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RegisterResponse;
        })();

        user_messages.LoginRequest = (function() {

            /**
             * Properties of a LoginRequest.
             * @memberof pesto.user_messages
             * @interface ILoginRequest
             * @property {string|null} [username] LoginRequest username
             * @property {string|null} [password] LoginRequest password
             */

            /**
             * Constructs a new LoginRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a LoginRequest.
             * @implements ILoginRequest
             * @constructor
             * @param {pesto.user_messages.ILoginRequest=} [properties] Properties to set
             */
            function LoginRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginRequest username.
             * @member {string} username
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             */
            LoginRequest.prototype.username = "";

            /**
             * LoginRequest password.
             * @member {string} password
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             */
            LoginRequest.prototype.password = "";

            /**
             * Creates a new LoginRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.LoginRequest} LoginRequest instance
             */
            LoginRequest.create = function create(properties) {
                return new LoginRequest(properties);
            };

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link pesto.user_messages.LoginRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                return writer;
            };

            /**
             * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link pesto.user_messages.LoginRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.LoginRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.username = reader.string();
                        break;
                    case 2:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginRequest message.
             * @function verify
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                return null;
            };

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             */
            LoginRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.LoginRequest)
                    return object;
                var message = new $root.pesto.user_messages.LoginRequest();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.LoginRequest} message LoginRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };

            /**
             * Converts this LoginRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginRequest;
        })();

        user_messages.LoginResponse = (function() {

            /**
             * Properties of a LoginResponse.
             * @memberof pesto.user_messages
             * @interface ILoginResponse
             * @property {pesto.models.IUser|null} [user] LoginResponse user
             * @property {boolean|null} [successful] LoginResponse successful
             */

            /**
             * Constructs a new LoginResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a LoginResponse.
             * @implements ILoginResponse
             * @constructor
             * @param {pesto.user_messages.ILoginResponse=} [properties] Properties to set
             */
            function LoginResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             */
            LoginResponse.prototype.user = null;

            /**
             * LoginResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             */
            LoginResponse.prototype.successful = false;

            /**
             * Creates a new LoginResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.LoginResponse} LoginResponse instance
             */
            LoginResponse.create = function create(properties) {
                return new LoginResponse(properties);
            };

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link pesto.user_messages.LoginResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link pesto.user_messages.LoginResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.LoginResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginResponse message.
             * @function verify
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             */
            LoginResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.LoginResponse)
                    return object;
                var message = new $root.pesto.user_messages.LoginResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.LoginResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.LoginResponse} message LoginResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this LoginResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginResponse;
        })();

        user_messages.TopupRequest = (function() {

            /**
             * Properties of a TopupRequest.
             * @memberof pesto.user_messages
             * @interface ITopupRequest
             * @property {number|null} [uid] TopupRequest uid
             * @property {number|null} [amount] TopupRequest amount
             */

            /**
             * Constructs a new TopupRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a TopupRequest.
             * @implements ITopupRequest
             * @constructor
             * @param {pesto.user_messages.ITopupRequest=} [properties] Properties to set
             */
            function TopupRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TopupRequest uid.
             * @member {number} uid
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             */
            TopupRequest.prototype.uid = 0;

            /**
             * TopupRequest amount.
             * @member {number} amount
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             */
            TopupRequest.prototype.amount = 0;

            /**
             * Creates a new TopupRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.TopupRequest} TopupRequest instance
             */
            TopupRequest.create = function create(properties) {
                return new TopupRequest(properties);
            };

            /**
             * Encodes the specified TopupRequest message. Does not implicitly {@link pesto.user_messages.TopupRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest} message TopupRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
                return writer;
            };

            /**
             * Encodes the specified TopupRequest message, length delimited. Does not implicitly {@link pesto.user_messages.TopupRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest} message TopupRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TopupRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TopupRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TopupRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TopupRequest message.
             * @function verify
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TopupRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                return null;
            };

            /**
             * Creates a TopupRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             */
            TopupRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TopupRequest)
                    return object;
                var message = new $root.pesto.user_messages.TopupRequest();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.amount != null)
                    message.amount = object.amount | 0;
                return message;
            };

            /**
             * Creates a plain object from a TopupRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.TopupRequest} message TopupRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TopupRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.amount = 0;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                return object;
            };

            /**
             * Converts this TopupRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TopupRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TopupRequest;
        })();

        user_messages.TopupResponse = (function() {

            /**
             * Properties of a TopupResponse.
             * @memberof pesto.user_messages
             * @interface ITopupResponse
             * @property {pesto.models.IUser|null} [user] TopupResponse user
             * @property {boolean|null} [successful] TopupResponse successful
             */

            /**
             * Constructs a new TopupResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a TopupResponse.
             * @implements ITopupResponse
             * @constructor
             * @param {pesto.user_messages.ITopupResponse=} [properties] Properties to set
             */
            function TopupResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TopupResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             */
            TopupResponse.prototype.user = null;

            /**
             * TopupResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             */
            TopupResponse.prototype.successful = false;

            /**
             * Creates a new TopupResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.TopupResponse} TopupResponse instance
             */
            TopupResponse.create = function create(properties) {
                return new TopupResponse(properties);
            };

            /**
             * Encodes the specified TopupResponse message. Does not implicitly {@link pesto.user_messages.TopupResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse} message TopupResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified TopupResponse message, length delimited. Does not implicitly {@link pesto.user_messages.TopupResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse} message TopupResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TopupResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TopupResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TopupResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TopupResponse message.
             * @function verify
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TopupResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a TopupResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             */
            TopupResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TopupResponse)
                    return object;
                var message = new $root.pesto.user_messages.TopupResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.TopupResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a TopupResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.TopupResponse} message TopupResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TopupResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this TopupResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TopupResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TopupResponse;
        })();

        user_messages.TransactionRequest = (function() {

            /**
             * Properties of a TransactionRequest.
             * @memberof pesto.user_messages
             * @interface ITransactionRequest
             * @property {number|null} [payerId] TransactionRequest payerId
             * @property {number|null} [payeeId] TransactionRequest payeeId
             * @property {number|null} [amount] TransactionRequest amount
             */

            /**
             * Constructs a new TransactionRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a TransactionRequest.
             * @implements ITransactionRequest
             * @constructor
             * @param {pesto.user_messages.ITransactionRequest=} [properties] Properties to set
             */
            function TransactionRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransactionRequest payerId.
             * @member {number} payerId
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.payerId = 0;

            /**
             * TransactionRequest payeeId.
             * @member {number} payeeId
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.payeeId = 0;

            /**
             * TransactionRequest amount.
             * @member {number} amount
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.amount = 0;

            /**
             * Creates a new TransactionRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest instance
             */
            TransactionRequest.create = function create(properties) {
                return new TransactionRequest(properties);
            };

            /**
             * Encodes the specified TransactionRequest message. Does not implicitly {@link pesto.user_messages.TransactionRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest} message TransactionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.payerId);
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.payeeId);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.amount);
                return writer;
            };

            /**
             * Encodes the specified TransactionRequest message, length delimited. Does not implicitly {@link pesto.user_messages.TransactionRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest} message TransactionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransactionRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TransactionRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.payerId = reader.int32();
                        break;
                    case 2:
                        message.payeeId = reader.int32();
                        break;
                    case 3:
                        message.amount = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransactionRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransactionRequest message.
             * @function verify
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransactionRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    if (!$util.isInteger(message.payerId))
                        return "payerId: integer expected";
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    if (!$util.isInteger(message.payeeId))
                        return "payeeId: integer expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                return null;
            };

            /**
             * Creates a TransactionRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             */
            TransactionRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TransactionRequest)
                    return object;
                var message = new $root.pesto.user_messages.TransactionRequest();
                if (object.payerId != null)
                    message.payerId = object.payerId | 0;
                if (object.payeeId != null)
                    message.payeeId = object.payeeId | 0;
                if (object.amount != null)
                    message.amount = object.amount | 0;
                return message;
            };

            /**
             * Creates a plain object from a TransactionRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.TransactionRequest} message TransactionRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransactionRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.payerId = 0;
                    object.payeeId = 0;
                    object.amount = 0;
                }
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    object.payerId = message.payerId;
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    object.payeeId = message.payeeId;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                return object;
            };

            /**
             * Converts this TransactionRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransactionRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransactionRequest;
        })();

        user_messages.TransactionResponse = (function() {

            /**
             * Properties of a TransactionResponse.
             * @memberof pesto.user_messages
             * @interface ITransactionResponse
             * @property {pesto.models.IUser|null} [user] TransactionResponse user
             * @property {number|null} [transactionId] TransactionResponse transactionId
             * @property {boolean|null} [successful] TransactionResponse successful
             */

            /**
             * Constructs a new TransactionResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a TransactionResponse.
             * @implements ITransactionResponse
             * @constructor
             * @param {pesto.user_messages.ITransactionResponse=} [properties] Properties to set
             */
            function TransactionResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransactionResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.user = null;

            /**
             * TransactionResponse transactionId.
             * @member {number} transactionId
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.transactionId = 0;

            /**
             * TransactionResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.successful = false;

            /**
             * Creates a new TransactionResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse instance
             */
            TransactionResponse.create = function create(properties) {
                return new TransactionResponse(properties);
            };

            /**
             * Encodes the specified TransactionResponse message. Does not implicitly {@link pesto.user_messages.TransactionResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse} message TransactionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.transactionId);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified TransactionResponse message, length delimited. Does not implicitly {@link pesto.user_messages.TransactionResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse} message TransactionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransactionResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TransactionResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.transactionId = reader.int32();
                        break;
                    case 3:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransactionResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransactionResponse message.
             * @function verify
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransactionResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    if (!$util.isInteger(message.transactionId))
                        return "transactionId: integer expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a TransactionResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             */
            TransactionResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TransactionResponse)
                    return object;
                var message = new $root.pesto.user_messages.TransactionResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.TransactionResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.transactionId != null)
                    message.transactionId = object.transactionId | 0;
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a TransactionResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.TransactionResponse} message TransactionResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransactionResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.transactionId = 0;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    object.transactionId = message.transactionId;
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this TransactionResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransactionResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransactionResponse;
        })();

        user_messages.AddContactRequest = (function() {

            /**
             * Properties of an AddContactRequest.
             * @memberof pesto.user_messages
             * @interface IAddContactRequest
             * @property {number|null} [userId] AddContactRequest userId
             * @property {string|null} [contactUsername] AddContactRequest contactUsername
             */

            /**
             * Constructs a new AddContactRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents an AddContactRequest.
             * @implements IAddContactRequest
             * @constructor
             * @param {pesto.user_messages.IAddContactRequest=} [properties] Properties to set
             */
            function AddContactRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AddContactRequest userId.
             * @member {number} userId
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             */
            AddContactRequest.prototype.userId = 0;

            /**
             * AddContactRequest contactUsername.
             * @member {string} contactUsername
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             */
            AddContactRequest.prototype.contactUsername = "";

            /**
             * Creates a new AddContactRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest instance
             */
            AddContactRequest.create = function create(properties) {
                return new AddContactRequest(properties);
            };

            /**
             * Encodes the specified AddContactRequest message. Does not implicitly {@link pesto.user_messages.AddContactRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest} message AddContactRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && message.hasOwnProperty("userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contactUsername);
                return writer;
            };

            /**
             * Encodes the specified AddContactRequest message, length delimited. Does not implicitly {@link pesto.user_messages.AddContactRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest} message AddContactRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddContactRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AddContactRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int32();
                        break;
                    case 2:
                        message.contactUsername = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AddContactRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AddContactRequest message.
             * @function verify
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddContactRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    if (!$util.isString(message.contactUsername))
                        return "contactUsername: string expected";
                return null;
            };

            /**
             * Creates an AddContactRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             */
            AddContactRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AddContactRequest)
                    return object;
                var message = new $root.pesto.user_messages.AddContactRequest();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.contactUsername != null)
                    message.contactUsername = String(object.contactUsername);
                return message;
            };

            /**
             * Creates a plain object from an AddContactRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.AddContactRequest} message AddContactRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddContactRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userId = 0;
                    object.contactUsername = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    object.contactUsername = message.contactUsername;
                return object;
            };

            /**
             * Converts this AddContactRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddContactRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddContactRequest;
        })();

        user_messages.AddContactResponse = (function() {

            /**
             * Properties of an AddContactResponse.
             * @memberof pesto.user_messages
             * @interface IAddContactResponse
             * @property {boolean|null} [successful] AddContactResponse successful
             */

            /**
             * Constructs a new AddContactResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents an AddContactResponse.
             * @implements IAddContactResponse
             * @constructor
             * @param {pesto.user_messages.IAddContactResponse=} [properties] Properties to set
             */
            function AddContactResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AddContactResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.AddContactResponse
             * @instance
             */
            AddContactResponse.prototype.successful = false;

            /**
             * Creates a new AddContactResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse instance
             */
            AddContactResponse.create = function create(properties) {
                return new AddContactResponse(properties);
            };

            /**
             * Encodes the specified AddContactResponse message. Does not implicitly {@link pesto.user_messages.AddContactResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse} message AddContactResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified AddContactResponse message, length delimited. Does not implicitly {@link pesto.user_messages.AddContactResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse} message AddContactResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddContactResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AddContactResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AddContactResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AddContactResponse message.
             * @function verify
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddContactResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates an AddContactResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             */
            AddContactResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AddContactResponse)
                    return object;
                var message = new $root.pesto.user_messages.AddContactResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from an AddContactResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.AddContactResponse} message AddContactResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddContactResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.successful = false;
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this AddContactResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AddContactResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddContactResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddContactResponse;
        })();

        user_messages.GetContactsResponse = (function() {

            /**
             * Properties of a GetContactsResponse.
             * @memberof pesto.user_messages
             * @interface IGetContactsResponse
             * @property {Array.<pesto.models.IContact>|null} [contacts] GetContactsResponse contacts
             */

            /**
             * Constructs a new GetContactsResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a GetContactsResponse.
             * @implements IGetContactsResponse
             * @constructor
             * @param {pesto.user_messages.IGetContactsResponse=} [properties] Properties to set
             */
            function GetContactsResponse(properties) {
                this.contacts = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetContactsResponse contacts.
             * @member {Array.<pesto.models.IContact>} contacts
             * @memberof pesto.user_messages.GetContactsResponse
             * @instance
             */
            GetContactsResponse.prototype.contacts = $util.emptyArray;

            /**
             * Creates a new GetContactsResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse instance
             */
            GetContactsResponse.create = function create(properties) {
                return new GetContactsResponse(properties);
            };

            /**
             * Encodes the specified GetContactsResponse message. Does not implicitly {@link pesto.user_messages.GetContactsResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse} message GetContactsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetContactsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.contacts != null && message.contacts.length)
                    for (var i = 0; i < message.contacts.length; ++i)
                        $root.pesto.models.Contact.encode(message.contacts[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetContactsResponse message, length delimited. Does not implicitly {@link pesto.user_messages.GetContactsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse} message GetContactsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetContactsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetContactsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetContactsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.GetContactsResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.contacts && message.contacts.length))
                            message.contacts = [];
                        message.contacts.push($root.pesto.models.Contact.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetContactsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetContactsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetContactsResponse message.
             * @function verify
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetContactsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.contacts != null && message.hasOwnProperty("contacts")) {
                    if (!Array.isArray(message.contacts))
                        return "contacts: array expected";
                    for (var i = 0; i < message.contacts.length; ++i) {
                        var error = $root.pesto.models.Contact.verify(message.contacts[i]);
                        if (error)
                            return "contacts." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetContactsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             */
            GetContactsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.GetContactsResponse)
                    return object;
                var message = new $root.pesto.user_messages.GetContactsResponse();
                if (object.contacts) {
                    if (!Array.isArray(object.contacts))
                        throw TypeError(".pesto.user_messages.GetContactsResponse.contacts: array expected");
                    message.contacts = [];
                    for (var i = 0; i < object.contacts.length; ++i) {
                        if (typeof object.contacts[i] !== "object")
                            throw TypeError(".pesto.user_messages.GetContactsResponse.contacts: object expected");
                        message.contacts[i] = $root.pesto.models.Contact.fromObject(object.contacts[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetContactsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.GetContactsResponse} message GetContactsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetContactsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.contacts = [];
                if (message.contacts && message.contacts.length) {
                    object.contacts = [];
                    for (var j = 0; j < message.contacts.length; ++j)
                        object.contacts[j] = $root.pesto.models.Contact.toObject(message.contacts[j], options);
                }
                return object;
            };

            /**
             * Converts this GetContactsResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.GetContactsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetContactsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetContactsResponse;
        })();

        return user_messages;
    })();

    return pesto;
})();

module.exports = $root;

},{"protobufjs/minimal":8}]},{},[19]);
