// DEBUG
var DEBUG = true;
function log(msg){ if(DEBUG){ console.log('MOLOME EXT : ' + msg); } }

// GLOBAL VARIABLE
var THREAD = undefined; // use only single thread

// MOLOME FUNCTION
function getShortLink(text){
	var patt = /http:\/\/molo.me\/p\/[^"]*/; // --- http://molome/p/xxxx
	return patt.exec(text);
}
function getMoloUrl(short_url){
	var code = short_url.replace('http://molo.me/p/', '');
	return 'http://s3.amazonaws.com/molome_picture_210x210/' + code + '_210x210';
}
function genPreviewImg(shortlink){
	shortlink = shortlink[0];
	var preview_url = getMoloUrl(shortlink);
	return '<div class="molome-img">'
			+ '<br />'
			+ '<a href="'+ shortlink +'" target="_blank">'
			+ '<img src="' + preview_url + '" alt="' + shortlink + '" title="' + shortlink + '" />'
			+ '</a>'
			+ '</div>';
}

// INITIAL FUNCTION
function initial(){

	// add photo icon to molome tweets
	addIcon();

	// binding open tweet
	$(document).click(function(){ onShowTweet(); }); // mouse
	$(document).keyup(function(event){ // keyboard ( enter, l )
		if((event.which == 13)||(event.which == 76)){ onShowTweet(); }
	});

	/*
	// TODO TODO
	// bind event to add photo icon when timeline load
	// how to check when change to new page ( height will reduce )
	var TRIGGER = 1500; // trigger
	Y = TRIGGER;
	$(document).bind('DOMSubtreeModified', function() {
		var current_height = $(this).height(); // trigger logic
		if(current_height > Y + TRIGGER){
			log(Y + ' -> ' + current_height);
			addIcon();
			Y = current_height;
		}
	});
	*/

	log('initial complete');
}

// EVENT FUNCTION
function onShowTweet(){
	addPhoto();
}

// CORE FUNCTION
function addIcon(round){
	var DELAY = 3; // sec
	var MAX_ROUND = 3;
	var tweet_items = $('.stream-items .stream-item .original-tweet');
	var sm_icon_html = '<i class="js-sm-icon sm-image" data-media-class="photo" data-media-type="molome"></i>';

	if(round == undefined){ round = 1; }
	log('addIcon : ' + round);
	if(tweet_items.length > 0){
		$(tweet_items).each(function(){
			var text = $(this).find('.js-tweet-text').html();
			if(getShortLink(text)){
				// brute-force add
				$(this).find('.js-icon-container').html(sm_icon_html);
				$(this).find('.view-open').html('View photo');
				$(this).find('.hide-open').html('Hide photo');
			}
		});
		clearTimeout(THREAD);
		log('addIcon : complete');
	}
	else {
		if(round > MAX_ROUND){
			clearTimeout(THREAD);
			log('addIcon : timeout');
		}
		else {
			THREAD = setTimeout("addIcon(" + (round+1) + ")", DELAY * 1000);
		}
	}
}
function addPhoto(){
	$('.open .original-tweet').each(function(){
		var jo_text = $(this).find('.js-tweet-text');
		var text = jo_text.html();
		var shortlink = getShortLink(text);
		if(shortlink){
			var media_container = $(this).find('.js-tweet-media-container');
			var no_image_found = $(media_container).css('display') == 'none';
			if(no_image_found){
				log('add image --> ' + shortlink);
				$(media_container).append(genPreviewImg(shortlink));
				$(media_container).css('display', 'block');
			}
			else {
				log('image already exist');
			}
		}
	});
}

// EXECUTE
initial();
