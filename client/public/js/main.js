( function ( $ ) {
	"use strict";
	console.clear();
	let onClickBiz = {
		init: function () {
			onClickBiz.popOver();
		},
		popOver: function () {
			new WOW().init();
			$("[data-toggle=popover]").popover();
		}
	};
	onClickBiz.init();

} )( jQuery );