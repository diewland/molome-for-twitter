//
// TODO next, multi-sources support
//
var TwitterImagePreview = function(src){

	var self = this; // scope
	var debug = false;

	this.log = function(msg){
		if(debug){
			console.log('EXT: ' + msg);
		}
	}
	this.initial = function(config){
		// check src first
		if(!src){
			console.error('EXT: src not found');
			return;
		}
		// config
		if(config){
			debug = config.debug;
		}
		// binding open tweet
		// mouse
		$(document).click(function(){ self.on_show_tweet(); });
		// keyboard ( enter, l )
		$(document).keyup(function(event){
			if((event.which == 13)||(event.which == 76)){
				self.on_show_tweet();
			}
		});
		this.log('initial complete');
	}
	this.on_show_tweet = function(){
		this.add_photo();
	}
	this.add_photo = function(){
		$('.open .original-tweet').each(function(){
			var text_obj = $(this).find('.js-tweet-text');
			var text = text_obj.html();
			var shortlink = self.get_short_link(text);
			if(shortlink){
				var media_container = $(this).find('.js-tweet-media-container');
				var no_image_found = $(media_container).css('display') == 'none';
				if(no_image_found){
					self.log('add image --> ' + shortlink);
					$(media_container).append(self.gen_preview_img(shortlink));
					$(media_container).css('display', 'block');
				}
				else {
					self.log('image already exist');
				}
			}
		});
	}
	this.get_short_link = function(text){
		var patt = src.pattern;
		return patt.exec(text);
	}
	this.gen_preview_img = function(shortlink){
		shortlink = shortlink[0];
		var preview_url = src.get_img_url(shortlink);
		return '<div class="diewland-img">'
				+ '<br />'
				+ '<a href="'+ shortlink +'" target="_blank">'
				+ '<img src="' + preview_url + '" alt="' + shortlink + '" title="' + shortlink + '" />'
				+ '</a>'
				+ '</div>';
	}
}
