#	Development Starter Kit

### Includes the following tools, tasks and workflows:

- [Bower](http://bower.io/) (A package manager for the web)
- [Gulp](http://gulpjs.com/) (Build system)
- [browser-sync](https://www.npmjs.com/package/browser-sync) (Live CSS Reload & Browser Syncing)
- [del](https://www.npmjs.com/package/del) (Delete files/folders using globs)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) (Prefix CSS)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) (Prevent pipe breaking caused by errors from gulp plugins)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename) (Rename files)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) (Gulp plugin for sass)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) (Minify files with UglifyJS)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) (Minify PNG, JPEG, GIF and SVG images)
- [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) (pngquant imagemin plugin)

**Bower requires Node and npm. Follow directions below if you don’t have Node installed on your system**.
*To install using homebrew*:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).


**Install Bower**
```
npm install -g bower
```

**Install Gulp**
```
npm install -g gulp
```

## How to use the DevStarterKit

**Clone starterkit repository**

*Rename myproject to whatever you wish your folder to be called*
```
git clone https://github.com/devoidofgenius/DevStarterKit.git myproject
```
**Install Bower Components**

*Inside project directory*
```
bower install
```
**Install Node Modules**

*Inside project directory*
```
npm install
```
**Gulp**

*Running the default gulp task starts development mode*
```
gulp
```
*To run the complete production build of your site*
```
gulp production
```
