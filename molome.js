var molome = {
	// check photo url in tweet text
	pattern: /http:\/\/molo.me\/p\/[^"]*/, // --- http://molome/p/xxxx

	// get img src from short url
	get_img_url: function(short_url){
		var code = short_url.replace('http://molo.me/p/', '');
		return 'http://s3.amazonaws.com/molome_picture_210x210/' + code + '_210x210';
	}
}
