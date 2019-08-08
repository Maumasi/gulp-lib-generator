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
  },
  {
    src: './src/api/routes/',
    customFormat(fileInDir, fileIndex, isLastFile, fullOptions) {
      let customLibFormat = '';
      // ... custom library formatting ...
      customLibFormat += 'formatting logic';
      return customLibFormat; // must return a string
    }
  },
];

gulp.task('lib', gulp.series( libGenerator(libOptions) ));

// # command in terminal:
// $ gulp lib

```

---
<br>

#### Use
<p>
A directory with a JavaScript files that could be considered a library like a directory of React.js or Vue.js components can be exported through a single file, named from the <code> libFile </code> option, that is generated based off of the option rules provided.
</p>

<i><strong>Required</strong></i>
```javascript

src: // REQUIRED
  './path/to/library/directory/' // Fully qualified paths are auto generated

```

<i><strong>Optional</strong></i>

```javascript

type: // OPTIONAL
  'CUSTOM'  // user provided `customFormat` function will be used
  'REQUIRE' // for module.exports files
  'IMPORT'  // for exports files
  'SASS'    // for SASS || SCSS files

libFile: // OPTIONAL
  'index.js' // custom name of library file

ascending: // OPTIONAL
  true      // export files in ascending order: [_, 0 -> 99999 , A -> Z]
  false     // export files in descending order: [Z -> A, 9999 -> 0, _]

ignore: // OPTIONAL
  []        // array of string values of file names to not include in library. Regex strings are accepted

dest: // OPTIONAL
  './path/to/library/directory/' // Fully qualified paths are auto generated
                                // if none provided the `src` path will be used

customFormat: // OPTIONAL
  function(fileName, index, isLastFile, self) { return null }
  // passed arguments are:
  //  - fileName: current file name from iterated files in directory
  //  - index: index of file position of directory files array
  //  - isLastFile: true if is the last file in directory, else false
  //  - self: the full object of library options, including defaults if applicable

```

<i><strong>Defaults</strong></i>
```javascript

{
  type: 'REQUIRE',
  libFile: 'index.js',
  ignore: [],
  ascending: true,
  src: null,
  dest: null,
  customFormat(fileName, index, isLastFile, self) { return null },
}

```

<p><i><strong>Example use of <code> customFormat() </code></strong></i></p>
<p><i><strong>Note:</strong> Must set <code> { type: 'CUSTOM' } </code> for custom formatting function to be used.</i></p>

```javascript
const gulp = require('gulp');
const path = require('path');
const libGenerator = require('gulp-lib-generator');

const { PWD: ROOT_DIR } = process.env;

const libOptions = [{
    type: 'CUSTOM',
    src: './_dev/gulp_tasks/lib/',
    // custom formatting function
    customFormat(fileName, index, isLastFile, self) {
      let tempLibContent = '';
      const [ file ] = fileName.split('.');
      // start library file line
      if(index === 0) {
        tempLibContent += 'module.exports = {';
      }
      // format for files to be exported as an object
      tempLibContent += `\n\t${file}: require('${path.resolve(ROOT_DIR, self.dest, './'+file)}'),`;
      // final library file line
      if(isLastFile) {
        tempLibContent += '\n};';
      }
      return tempLibContent;
    }
  }];

  gulp.task('lib', gulp.series( libGenerator(libOptions) ));


  // ** generated in './_dev/gulp_tasks/lib/index.js' **
  //
  // module.exports = {
  // 	  component_1: require('fully/qualified/path/to/component_1'),
  // 	  component_2: require('fully/qualified/path/to/component_1'),
  // };

```


#### **Old way of importing components**

```bash
├── components_dir/
    ├── component_1.js
    ├── component_2.js
    ├── component_3.js
    └── component_4.js
```
<i>using <code>require();</code></i>
```javascript
const component_1 = require('./path/to/components_dir/component_1');
const component_2 = require('./path/to/components_dir/component_2');
const component_3 = require('./path/to/components_dir/component_3');
const component_4 = require('./path/to/components_dir/component_4');
```
<br>

<i>using <code>import</code></i>
```javascript
import component_1 from './path/to/components_dir/component_1';
import component_2 from './path/to/components_dir/component_2';
import component_3 from './path/to/components_dir/component_3';
import component_4 from './path/to/components_dir/component_4';
```

<br>

#### **Importing components as a library**
<p>
When importing or requiring in files from directories, <code> index.js </code> is not required to be specifically defined in the path because it is implicitly imported if present in the directory.
</p>

<p>
If using a custom name with the <code> libFile </code> option, the file name will need to be included in the import route being required from.
</p>

<p>
In this example, <code> index.js </code> is being used. External files can now be pulled in using the newly generated library.
</p>

```bash
├── components_dir/
    ├── component_1.js
    ├── component_2.js
    ├── component_3.js
    ├── component_4.js
    └── index.js  # <--- new generated component library for this directory
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
  component_4,
} from './path/to/components_dir';
```

#### Notice
<p>
When using <code>import</code>, functions, vars, classes, etc. must be exported as an object literal:
</p>


```javascript
// ./path/to/components_dir/component_1.js

const foo = () {
  console.log('bar');
}

export { foo };
```
