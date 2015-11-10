
$(document).ready(function(){

	$("#check").change(function(event){
		var check = event.target.checked;

		if(check){
            
            $("#watchBtn").css({"background": "url(../img/play.png) center no-repeat", 
            	                "background-size":"contain",
            	                 "cursor":"pointer"});

		}

		else {
			$("#watchBtn").css({"background":"url(../img/play-blackwhite.png) center no-repeat",
				                "background-size":"contain",
				                 "cursor":"default"});
		}
		
	});


});