/**
 * The MIT License (MIT)
 * Copyright (c) 2013 Tang Kin Chuen - http://github.com/kctang/gist-loader
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 (function() {
	$(function() {
		// on load, init
		var gists = detectGists();
		for(var idx in gists) {
			new GistLoader(gists[idx]).load();
		}
	});

	function detectGists() {
		var gists = [];

		$('b').each(function(idx, el) {
			var $el = $(el);
			if($el.text().indexOf('gist:') == 0) {
				// gist detected
				gists.push(el);
				// we don't need to see the <b>gist:{gistId}</b> text
				$el.hide();
			}
		});

		return gists;
	}

	var GistLoader = function(el) {
		var $gist = $(el);
		
		this.load = function() {
			var params = $gist.text().split(':');
			var gistId = params[1];
			var maxLines = undefined;

			// scan for additional parameters
			for(var paramIdx in params) {
				var p = params[paramIdx];

				// maxLines specified
				var PARAM_MAX_LINES = 'maxLines=';
				if(p.indexOf(PARAM_MAX_LINES)==0) {
					maxLines = p.substring(PARAM_MAX_LINES.length);
				}
			}

			$.ajax({
				url: 'https://gist.github.com/' + gistId + '.json',
				dataType: 'jsonp',
				success: function(data) {
					// add gist's stylesheet & div data
					$('<link>').attr('rel','stylesheet').attr('type','text/css')
						.attr('href','https://gist.github.com' + data.stylesheet)
						.appendTo('head');
					$gist.after(data.div);

					if(maxLines !== undefined) {
						// http://stackoverflow.com/questions/3614323/jquery-css-line-height-of-normal-px
						maxLines = parseInt(maxLines) * 1.14;
						$gist.next().find('.file-data').css('height', maxLines + 'em');
					}

					$gist.remove();
				},
				error: function() {
					console.error('Error loading gist');
				}
			});
		}
	}

})();
