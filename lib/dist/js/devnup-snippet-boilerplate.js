/**
 * Angular Sample Snippet
 * v =X.X.X
 *
 * @alias com.devnup.snippets.sample
 *
 * @author luis@devnup.com
 * @since 09/04/15.
 */
angular.module('com.devnup.snippets.sample', [])

  .factory('$sample', [

    /**
     * Angular Sample Service
     * v0.0.1
     *
     * @class
     * @type {Function}
     * @alias com.devnup.snippets.sample.$sample
     */
      function () {

      // Dummy public interface
      var pub = {
        hello: function (name) {
          name = name || 'world';
          return 'Hello, ' + name + '!';
        },
        greet: function (name) {
          console.log(pub.hello(name));
        }
      };

      // Return dummy public interface
      return pub;

    }]);