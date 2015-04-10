/**
 * Angular Error Template
 * v0.0.1
 *
 * @alias com.devnup.error
 *
 * @author luis@devnup.com
 * @since 09/04/15.
 */
angular.module('com.devnup.error', [])

  .factory('$errorEntry', [

    function () {

      /**
       * Angular Error Entry Factory
       * v0.0.1
       *
       * @class
       * @type {Function}
       * @alias com.devnup.error.$errorEntry
       *
       * @param {Object} input The input error object.
       * @param {String} input.message The error message.
       * @param {String} [input.code] The error identifier code.
       * @param {String} [input.timestamp] The error timestamp. Default: now.
       * @param {String} [input.data] The error data. Default: {}.
       * @param {String} [input.stack] The error stack. Default: current stack.
       */
      return function ErrorEntry (input) {

        return angular.copy({
          message: input.message,
          timestamp: input.timestamp || Date.now(),
          data: input.data || {},
          stack: input.stack || new Error().stack
        });
      };

    }])

  .factory('$error', [

    '$errorEntry',

    /**
     * Angular Error Service
     * v0.0.1
     *
     * @class
     * @type {Function}
     * @alias com.devnup.error.$error
     */
      function ($Entry) {

      var custom = [];

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
        throw: function Throw(condition, error) {

          if (typeof condition === typeof true) {

            return condition ? handler(error) : void(0);

          } else if (typeof condition === typeof {}) {

            return handler(condition);

          } else if (typeof condition === typeof 'string') {

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