/*
 * Cats
 *
 *
 * Cats is a Javascript plugin that will replace all <img>s on a page with
 * pictures of cats when a certain URL hash criteria is met.
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals document, window*/

(function (document, window, undefined) {
	"use strict";

	var Cats = {
		images: document.images,
		hash: "cats",
		prev_hash: "",
		url: "placekitten.com",
		cutoff: 100,
		url_generate: function (width, height) {
			return ["http:/", this.url, width, height].join("/");
		},
		hash_check: function () {
			if (window.location.hash !== ["#", this.hash].join("")) {
				this.reset();
				return this;
			}

			this.replace();
			return this;
		},
		replace: function () {
			var i = 0, cutoff = this.cutoff, images = this.images, length = 0,
				width = 0, height = 0;

			for (i = 0, length = images.length; i < length; i += 1) {
				width = images[i].width;
				height = images[i].height;

				if (width >= cutoff && height >= cutoff) {
					images[i].setAttribute("data-src", images[i].src);
					images[i].src = this.url_generate(width, height);
				}
			}

			return true;
		},
		reset: function () {
			var i = 0, images = this.images, length = 0, src = "";

			for (i = 0, length = images.length; i < length; i += 1) {
				src = images[i].getAttribute("data-src");

				if (src) {
					images[i].removeAttribute("data-src");
					images[i].src = src;
				}
			}
		},
		events: function () {
			if ("onhashchange" in window) {
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