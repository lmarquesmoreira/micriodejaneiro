var FB = require('fb');

module.exports = function(app){

	// define o controller e suas respectivas chamadas
	var HomeController = {

		// GET
		index: function(req, res){

			/* make the API call */
			FB.api(
			    "/me/feed",
			    function (response) {
			      if (response && !response.error) {
			        /* handle the result */
			      }
			    }
			);

			res.render('home/index', {title: 'Microsoft Inovation Center'});
		}
	};

	return HomeController;
};