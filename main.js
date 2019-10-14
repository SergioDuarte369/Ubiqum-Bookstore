
    
var arrayBooks = [];
// quick search regex
var qsRegex;
var buttonFilter;
var $grid;


$(document).ready(function () {
	callApiBooks();

});

$('.masonry-button').on('click', function () {
	$('.grid').empty();
	$grid.isotope('destroy');
	createGridElements(arrayBooks);
});

$('.list-button').on('click', function () {
	$('.grid').empty();
	$grid.isotope('destroy');
	createGridElementsList(arrayBooks);
});

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
	var timeout;
	return function debounced() {
		if (timeout) {
			clearTimeout(timeout);
		}

		function delayed() {
			fn();
			timeout = null;
		}
		setTimeout(delayed, threshold || 100);
	};
}


function callApiBooks() {
	var url = 'https://api.myjson.com/bins/1h3vb3';
	$.ajax({ // OUR AJAX CALL and LOADING PROGRESS BAR
		type: 'GET',
		url: url,
		success: function (data) {
			arrayBooks = data.books;
			createGridElements(arrayBooks);
		}
	});
}

function createGridElements(arrayBooks) {

	var bookHtml;

	for (var i = 0; i < arrayBooks.length; i++) {

		bookHtml = "<div class='grid-item card " + arrayBooks[i].idioma + "' data-category='" + arrayBooks[i].idioma + "'><div class='content'><div class='front'><img src='" + arrayBooks[i].portada + "'></div><div class='back'><h5 class='bookTags'>Title:</h5><h2 class='booktitle'>" + arrayBooks[i].titulo + "</h2><hr><h5 class='bookTags'>Description:</h5><h4 class='bookDesc'>" + arrayBooks[i].descripcion + "</h4><h4 class='bookLink'><a href='" + arrayBooks[i].detalle + "' data-fancybox='images' data-caption='" + arrayBooks[i].titulo + "'>Detalle</a></h4></div></div></div>";

		$('.grid').append(bookHtml);
	}

	$("[data-fancybox]").fancybox({
		// Options will go here
	});

	// init Isotope
	//	var $grid = $('.grid').isotope({
	//		itemSelector: '.grid-item',
	//		
	//	});




	// init Isotope
	$grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		masonry: {
			columnWidth: 280,
			fitWidth: true
		},

		filter: function () {
			var $this = $(this);
			var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
			var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
			return searchResult && buttonResult;
		}
	});
	// layout Isotope after each image loads
	//$grid.imagesLoaded().progress( function() {
	//  $grid.isotope('layout');
	//});  


	$('#filters').on('click', 'button', function () {
		buttonFilter = $(this).attr('data-filter');
		$grid.isotope();
	});



	// use value of search field to filter
	var $quicksearch = $('#quicksearch').keyup(debounce(function () {
		qsRegex = new RegExp($quicksearch.val(), 'gi');
		$grid.isotope();
		if (!$grid.data('isotope').filteredItems.length) {
			$("#msg-box").show(400);
		} else {
			$("#msg-box").hide(400);
		}
	}));


	// change is-checked class on buttons
	$('.button-group').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});

	$('.shuffle-button').on('click', function () {
		$grid.isotope('shuffle');
	});
}

function createGridElementsList(arrayBooks) {

	var bookHtml;

	for (var i = 0; i < arrayBooks.length; i++) {

		bookHtml = "<div class='grid-itemList well " + arrayBooks[i].idioma + "' data-category='" + arrayBooks[i].idioma + "'><div class='bookListItem row'><div class='bookCover col-sm-3'><img src='" + arrayBooks[i].portada + "'></div><div class='col-sm-9 bookData'><h5 class='bookTagsList'>Title:</h5><h2 class='booktitleList'>" + arrayBooks[i].titulo + "</h2><h5 class='bookTagsList'>Description:</h5><h4 class='bookDescList'>" + arrayBooks[i].descripcion + "</h4><div class='bookDataLink'><a href='" + arrayBooks[i].detalle + "' data-fancybox='images' data-caption='" + arrayBooks[i].titulo + "'><img class='thumbnail' src='" + arrayBooks[i].detalle + "' alt=''/>Show image</a></div></div></div></div>";

		$('.grid').append(bookHtml);
	}

	$("[data-fancybox]").fancybox({
		// Options will go here
	});

	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.grid-itemList',
		layoutMode: 'vertical',
		vertical: {
			horizontalAlignment: 0.5
		},

		filter: function () {
			var $this = $(this);
			var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
			var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
			return searchResult && buttonResult;
		}
	});


	$('#filters').on('click', 'button', function () {
		buttonFilter = $(this).attr('data-filter');
		$grid.isotope();
	});

	// use value of search field to filter
	var $quicksearch = $('#quicksearch').keyup(debounce(function () {
		qsRegex = new RegExp($quicksearch.val(), 'gi');
		$grid.isotope();
		if (!$grid.data('isotope').filteredItems.length) {
			$("#msg-box").show(400);
		} else {
			$("#msg-box").hide(400);
		}
	}));


	// change is-checked class on buttons
	$('.button-group').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});

	$('.shuffle-button').on('click', function () {
		$grid.isotope('shuffle');
	});

}
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
