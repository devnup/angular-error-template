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

    }])