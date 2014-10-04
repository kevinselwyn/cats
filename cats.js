/*globals document, window*/

(function (document, window) {
	'use strict';

	var Cats = {
		images: document.images,
		hash: 'cats',
		prev_hash: '',
		url: 'placekitten.com',
		cutoff: 100,
		url_generate: function (width, height) {
			return ['http:/', this.url, width, height].join('/');
		},
		hash_check: function () {
			if (window.location.hash !== ['#', this.hash].join('')) {
				this.reset();
				return this;
			}

			this.replace();

			return this;
		},
		replace: function () {
			var cutoff = this.cutoff,
				images = this.images,
				width = 0,
				height = 0,
				i = 0,
				l = 0;

			for (i = 0, l = images.length; i < l; i += 1) {
				width = images[i].width;
				height = images[i].height;

				if (width >= cutoff && height >= cutoff) {
					images[i].setAttribute('data-src', images[i].src);
					images[i].src = this.url_generate(width, height);
				}
			}

			return true;
		},
		reset: function () {
			var images = this.images,
				src = '',
				i = 0,
				l = 0;

			for (i = 0, l = images.length; i < l; i += 1) {
				src = images[i].getAttribute('data-src');

				if (src) {
					images[i].removeAttribute('data-src');
					images[i].src = src;
				}
			}
		},
		events: function () {
			if ('onhashchange' in window) {
				window.onhashchange = function () {
					Cats.hash_check();
				};
			} else {
				this.prev_hash = window.location.hash;

				window.setInterval(function () {
					if (window.location.hash !== Cats.prev_hash) {
						Cats.hash_check();
					}
				});
			}

			return this;
		},
		init: function () {
			this.hash_check().events();

			return true;
		}
	};

	window.Cats = Cats;
}(document, window));