# gist-loader

#### A microformat where bolded text prefixed by `gist:` will be parsed as a gist and its contents will be embedded.

`gist-loader.js` detects GitHub gists described in HTML content and display them as embedded gists. Why? To be able to...

* See where gists are placed when editing in through a rich text HTML editor.
* Embed gists without going to HTML source code to paste script tag.

### Usage

Add these to your HTML page's head tag:

    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"></script>
    <script type="text/javascript" src="http://rawgithub.com/kctang/gist-loader/master/gist-loader.js"></script>

The idea is to specify these only once - in your blog/site's template. Once this is done, you can embed gists using the examples below as a guide.

### Examples
To see these examples in action, see the [demo page](http://rawgithub.com/kctang/gist-loader/master/demo.html).

#### Example 1: Typical usage.
HTML code:

    <b>gist:{gistId}</b>

#### Example 2: Specify maximum number of lines to display.

HTML code:

    <b>gist:{gistId}:maxLines={maxLines}</b>

### Dependencies

* jQuery or Zepto

### Develop
Download required dependencies after forking this project:

    # Download Grunt related dependencies via NPM
    npm install
    # Download dependencies via Bower
    bower install

Since this project uses grunt, a built in web server with live reload capability has been configure for convenient development.

    # Start the development web server
    grunt connect

    # To enable livereload, execute this in a separate shell
    grunt watch

    # To open a browser to point to the demo page
    grunt open

With the development environment setup, it is basically about editing `gist-loader.js` and `demo.html`.