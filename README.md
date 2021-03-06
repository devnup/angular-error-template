angular-error-template
======================

### Installation

Using Bower: ```bower install --save angular-error-template```

### Browser Usage

Include the library in your HTML file:
```markup
<!-- Angular Error Template (Minified) -->
<script type="text/javascript" src="bower_components/angular-error-template/lib/dist/js/angular-error-template.min.js"></script>

<!-- Angular Error Template (Full) -->
<script type="text/javascript" src="bower_components/angular-colors-util/lib/dist/js/angular-error-template.js"></script>
```

Include the module in your Angular app:
```javascript
angular
  .module('myApp', ['com.devnup.error'])
  .controller('BodyCtrl', ['$scope', '$error', function($scope, $error) {

    $scope.signup = function(input) {

      var hasErrors = !input || !input.email || !input.password;

      if(hasErrors) {

        // Check and handle errors
        $error.throw('MISSING_PARAMS');

      } else {

        // Continue request
        // Ex: $rest.post('users/signup').success(console.log);
        return;

      }
    }
  }
]);
```

### Documentation

- [API Reference (JSDoc)](http://angular-error-template.snippets.devnup.com/docs)

### Authors
- [André Seiji](https://github.com/seijitamanaha) - [seiji@devnup.com](mailto:seiji@devnup.com)
- [Luís Eduardo Brito](https://github.com/luiseduardobrito) - [luis@devnup.com](mailto:luis@devnup.com)

### License

The MIT License (MIT)

Copyright (c) 2015 - Devnup Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.