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