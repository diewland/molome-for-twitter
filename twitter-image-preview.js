var TwitterImagePreview = function(){

	var self = this;
	var debug = false;

	this.log = function(msg){
		if(debug){
			console.log('MOLOME EXT : ' + msg);
		}
	}
	this.initial = function(config){
		// config
		if(config){
			debug = config.debug;
		}
		// binding open tweet
		// mouse
		$(document).click(function(){ self.onShowTweet(); });
		// keyboard ( enter, l )
		$(document).keyup(function(event){
			if((event.which == 13)||(event.which == 76)){
				self.onShowTweet();
			}
		});
		this.log('initial complete');
	}
	this.onShowTweet = function(){
		this.addPhoto();
	}
	this.addPhoto = function(){
		$('.open .original-tweet').each(function(){
			var text_obj = $(this).find('.js-tweet-text');
			var text = text_obj.html();
			var shortlink = self.getShortLink(text);
			if(shortlink){
				var media_container = $(this).find('.js-tweet-media-container');
				var no_image_found = $(media_container).css('display') == 'none';
				if(no_image_found){
					self.log('add image --> ' + shortlink);
					$(media_container).append(self.genPreviewImg(shortlink));
					$(media_container).css('display', 'block');
				}
				else {
					self.log('image already exist');
				}
			}
		});
	}
	// MOLOME FUNCTION # TODO break apart later
	this.getShortLink = function(text){
		var patt = /http:\/\/molo.me\/p\/[^"]*/; // --- http://molome/p/xxxx
		return patt.exec(text);
	}
	this.getMoloUrl = function(short_url){
		var code = short_url.replace('http://molo.me/p/', '');
		return 'http://s3.amazonaws.com/molome_picture_210x210/' + code + '_210x210';
	}
	this.genPreviewImg = function(shortlink){
		shortlink = shortlink[0];
		var preview_url = this.getMoloUrl(shortlink);
		return '<div class="molome-img">'
				+ '<br />'
				+ '<a href="'+ shortlink +'" target="_blank">'
				+ '<img src="' + preview_url + '" alt="' + shortlink + '" title="' + shortlink + '" />'
				+ '</a>'
				+ '</div>';
	}
}
