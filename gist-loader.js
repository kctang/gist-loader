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