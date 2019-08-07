# Gulp Lib Exporter

## A gulp task that creates a mass exports file from directory that contain exported vars, functions, etc. Great for use with frameworks!
---
<br>

#### Install
```bash
npm install --save-dev gulp-lib-exporter
# or
npx install --save-dev gulp-lib-exporter
```
---
<br>

#### Use
<!-- <p></p> -->
<p>
A directory with a JavaScript files that could be considered a library like a directory of React.js or Vue.js components can be exported through a single file.
</p>

##### **Old way of importing components**

<p>

</p>

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
---
##### **Newer way of importing components**
<p>
When importing or requiring in files from directories, <code> index.js </code> is not required to be specifically defined in the path because it is implicitly imported if present in the directory.
</p>

```bash
├── components_dir/
    ├── component_1.js
    ├── component_2.js
    ├── component_3.js
    ├── component_4.js
    └── index.js
```

<i>using <code>require();</code></i>
```javascript
const {
  component_1,
  component_2,
  component_3,
  component_4,
} = require('./components_dir');
```

<br>
<i>using <code>import</code></i>

```javascript
import {
  component_1,
  component_2,
  component_3,
  component_4
} from './components_dir';
```
