# Gulp Lib Generator

### A gulp task that creates a mass exports file from directory that contain exported vars, functions, etc. Great for use with frameworks!
---
<br>

#### Install
```bash
npm install --save-dev gulp-lib-generator
# or
npx install --save-dev gulp-lib-generator
```
---
<br>

#### Setup
```javascript
const gulp = require('gulp');
const libGenerator = require('gulp-lib-generator');


const libOptions = [
  {
    type: 'REQUIRE',
    libFile: 'index.js',
    ignore: ['^_', '^(.(?!\.js$))+$'],
    src: './_dev/gulp_tasks/lib',
    dest: './_dev/gulp_tasks/',
  },
  {
    type: 'IMPORT',
    libFile: 'index.js',
    ascending: false,
    src: './src/views/templates',
  },
  {
    type: 'SASS',
    libFile: 'main.sass',
    ignore: ['^_demo']
    src: './dev/sass/styles/lib',
    dest: './dev/sass/styles/',
  }
];

gulp.task('lib', gulp.series( libGenerator(libOptions) ));

// # command in terminal:
// $ gulp lib

```

---
<br>

#### Use
<p>
A directory with a JavaScript files that could be considered a library like a directory of React.js or Vue.js components can be exported through a single file.
</p>

<i><strong>Required</strong></i>
```javascript

type: // REQUIRED
  'REQUIRE' // for module.exports files
  'IMPORT'  // for exports files
  'SASS'    // for SASS || SCSS files

libFile: // REQUIRED
  'index.js' // custom name of library file

src: // REQUIRED
  '/path/to/library/directory/' // Fully qualified paths are auto generated

```

<i><strong>Optional</strong></i>

```javascript

dest: // OPTIONAL
  '/path/to/library/directory/' // Fully qualified paths are auto generated
                                // if none provided the `src` path will be used

ascending: // OPTIONAL
  true      // export files in ascending order: [_, 0 -> 99999 , A -> Z]
  false     // export files in descending order: [Z -> A, 9999 -> 0, _]

ignore: // OPTIONAL
  []        // array of string values to not include in library. Regex strings are accepted

```

##### **Old way of importing components**

```bash
├── components_dir/
    ├── component_1.js
    ├── component_2.js
    ├── component_3.js
    └── component_4.js
```
<i>using <code>require();</code></i>
```javascript
const component_1 = require('./components_dir/component_1');
const component_2 = require('./components_dir/component_2');
const component_3 = require('./components_dir/component_3');
const component_4 = require('./components_dir/component_4');
```
<br>

<i>using <code>import</code></i>
```javascript
import component_1 from './components_dir/component_1';
import component_2 from './components_dir/component_2';
import component_3 from './components_dir/component_3';
import component_4 from './components_dir/component_4';
```

##### **Newer way of importing components**
<p>
When importing or requiring in files from directories, <code> index.js </code> is not required to be specifically defined in the path because it is implicitly imported if present in the directory.
</p>

<p>
external files can now be pulled in using the newly generated library
</p>

```bash
├── components_dir/
    ├── component_1.js
    ├── component_2.js
    ├── component_3.js
    ├── component_4.js
    └── index.js  # <--- new component library for directory
```

<i>using <code>require();</code></i>
```javascript
const {
  component_1,
  component_2,
  component_3,
  component_4,
} = require('./path/to/components_dir');
```

<br>
<i>using <code>import</code></i>

```javascript
import {
  component_1,
  component_2,
  component_3,
  component_4
} from './path/to/components_dir';
```

#### Notice
<p>
When using <code>import</code>, functions, vars, classes, etc. must be exported in an object literal:
</p>


```javascript
// component_1.js

const foo = () {
  console.log('bar');
}

export { foo };
// Using `export default` could cause errors.
```
