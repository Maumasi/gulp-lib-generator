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

<p>
When importing or requiring in files from directories, <code> index.js </code> is not required to be specifically defined in the path because it is implicitly imported if present in the directory.
</p>


<p>📁 <i>DIR "components"</i></p>
<p>⌙ 📄 <i>FILE "component_1.js"</i></p>
<p>⌙ 📄 <i>FILE "component_2.js"</i></p>
<p>⌙ 📄 <i>FILE "component_3.js"</i></p>


<p>📁 <i>DIR "components"</i></p>
<p>⌙ 📄 <i>FILE "component_1.js"</i></p>
<p>⌙ 📄 <i>FILE "component_2.js"</i></p>
<p>⌙ 📄 <i>FILE "component_3.js"</i></p>
<p>⌙ 📑 <i>FILE "index.js"</i></p>
