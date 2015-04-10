/**
 * Angular Error Codes
 *
 * @alias com.devnup.error
 *
 * @author luis@devnup.com
 * @since 09/04/15.
 */
angular.module('com.devnup.error.code', [])

  .factory('$errorCode', [

    function () {

      /**
       * Angular Error Code Factory
       *
       * @class
       * @type {Function}
       * @alias com.devnup.error.$errorCode
       *
       * @param {Object} config The config object.
       */
      return function ErrorCode(config) {

        // Improve using ngStorage
        config = config || {};
        var cache = angular.copy(config);

        return {

          /**
           * Configure the error codes map
           *
           * @param {Object} codes The key/value object with the error and its messages
           * @returns {Object}
           */
          config: function (codes) {
            if (codes) {
              cache = angular.copy(codes);
            }
            return cache;
          },

          /**
           * Find an error by its code
           *
           * @param key
           * @returns {*}
           */
          find: function (key) {
            if (key) {
              return cache[key.toUpperCase()];
            }
          },

          /**
           * Put an error in the error codes map or update the existing one
           * @param {String} key The key to the error
           * @param val The value for the error
           * @returns {*} The value for the error after the insert/update
           */
          put: function (key, val) {
            if (key && val) {
              cache[key] = val;
            }
            return val;
          }
        }
      };

    }]);
/**
 * Angular Error Entry Factory
 * v0.0.1
 *
 * @alias com.devnup.error
 *
 * @author luis@devnup.com
 * @since 09/04/15.
 */
angular.module('com.devnup.error.entry', [])

  .factory('$errorEntry', [

    function () {

      /**
       * Angular Error Entry Factory
       *
       * @class
       * @type {Function}
       * @alias com.devnup.error.entry.$errorEntry
       *
       * @param {Object} input The input error object.
       * @param {String} input.message The error message.
       * @param {String} [input.code] The error identifier code.
       * @param {String} [input.timestamp] The error timestamp. Default: now.
       * @param {String} [input.data] The error data. Default: {}.
       * @param {String} [input.stack] The error stack. Default: current stack.
       */
      return function ErrorEntry(input) {

        return angular.copy({
          message: input.message,
          timestamp: input.timestamp || Date.now(),
          data: input.data || {},
          stack: input.stack || new Error().stack
        });
      };

    }]);
/**
 * Angular Error Template
 * v0.0.1
 *
 * @alias com.devnup.error
 *
 * @author luis@devnup.com
 * @since 09/04/15.
 */
angular.module('com.devnup.error', [
  'com.devnup.error.entry',
  'com.devnup.error.code'
])

  .factory('$error', [

    '$errorEntry',

    /**
     * Angular Error Service
     *
     * @class
     * @type {Function}
     * @alias com.devnup.error.$error
     */
      function ($Entry) {

      Array.prototype.first = function (predicateCallback) {

        if (typeof predicateCallback !== 'function') {
          return undefined;
        }

        for (var i = 0; i < this.length; i++) {
          if (i in this && predicateCallback(this[i])) return this[i];
        }

        return undefined;
      };

      var custom = [];

      /**
       * The code error handler, that dispatches all custom handlers
       *
       * @alias com.devnup.error.$error~handler
       * @param {Object|String} [input] The input object or a string for the error message
       */
      var handler = function ErrorHandler(input) {

        var entry = null;

        if (typeof input === typeof {}) {

          entry = new $Entry(input);

        } else if (typeof input === typeof 'string') {

          entry = new $Entry({
            message: input
          });

        }

        // Default error handler
        if (!custom || !custom.length) {

          // Remove the title from the stack
          var stack = entry.stack.slice(5, entry.stack.length);

          // Send to console
          console.error('Error: ' + entry.message, stack);

        }

        else {

          // Custom error handlers
          custom.length ? custom.map(function (h) {
            return h(entry)
          }) : void(0);

        }
      };

      // Dummy public interface
      var pub = {

        /**
         * Register a new error handler
         *
         * @alias com.devnup.error.$error#register
         * @param {Function} handler The error handler
         */
        register: function (handler) {
          custom.push(handler);
        },

        /**
         * Throw a new error
         *
         * @alias com.devnup.error.$error#throw
         *
         * @param {Boolean} [condition] The condition to check before throwing the error
         * @param {String} [error] The error message as a string
         * @param {Object} [error] The error as an object
         * @param {String} [error.message] The error message
         * @param {Date} [error.timestamp] The error timestamp. Default: now.
         * @param {Object} [error.data] The error data. Default: {}.
         * @param {Object} [error.stack] The error stack. Default: {}.
         */
        throw: function Throw() {

          var args = Array.prototype.slice.call(arguments);

          var condition = args.first(function(a) {
            return (!!a === a);
          });

          var error = args.first(function(a) {
            return (!!a !== a);
          });

          if (typeof condition === typeof true) {

            // Condition is a boolean (happy case, wow)
            return condition ? handler(error) : void(0);

          } else if (typeof condition === typeof {}) {

            // Condition is actually the input
            return handler(condition);

          } else if (typeof condition === typeof 'string') {

            // Condition is actually error message
            // Let's create a new object for this shitty error
            return handler({
              message: error
            });

          }
        },

        /**
         * Throw an error message
         *
         * @alias com.devnup.error.$error#throwMessage
         * @param {String} message The error message
         */
        throwMessage: function ThrowMessage(message) {
          pub.throw(true, message);
        },

        /**
         * Throw an error
         *
         * @alias com.devnup.error.$error#throwError
         * @param {Error} error The error
         */
        throwError: function ThrowError(error) {
          pub.throw(true, error);
        }

      };

      // Return dummy public interface
      return pub;

    }]);

