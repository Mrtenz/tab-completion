# tab-completion
A simple to use utility for tab completion. It will match the user input with a list of possible values, based on the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance). It is made for usage in a browser or with Node.js.

## Installation
It is recommended to use yarn or npm to install the library.
```bash
$ yarn add tab-completion
```
It is also possible to copy the `lib/tabCompletion.js` file and include it in your project.

## Usage
If you use a module bundler such as Webpack you can simply use ES6 imports to load the module. If you load the JS file directly in the browser, you can use `window.TabCompletion` instead.

### Example
```javascript
import { tabComplete } from 'tab-completion';

const values = ['foo bar', 'baz qux'];

const match = tabComplete(values, 'foo');
console.log(match); // foo bar
```

## API
```javascript
tabComplete(values, input, options);
```

* `values` is a string array containing the possible values.
* `input` is the user input to tab complete.
* `options` (optional) is an object containing the options.
  * `minLength` the minimum length for the user input to match a value. Defaults to 3.
