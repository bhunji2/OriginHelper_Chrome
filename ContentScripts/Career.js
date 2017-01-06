
var Functions = [
	 {"selector":"#OBL_UserAvatar"	,"func":UserAvatar}
]

$(window).load(function(){
	setInterval(InvervalCheckRun, 2 * 1000);
})

function InvervalCheckRun(){
	for(var i = 0;i < Functions.length;i++){
		if(!$(Functions[i].selector).length) Functions[i].func()
	}
}

function UserAvatar(){
	var userAvatarIMG 	= $("#desktop-root div[class='image-container avatar'] img.visible")
	var playerWidget 	= $("bf-player-widget:eq(0)")
	if(!$(userAvatarIMG).length) return
	if(!$(playerWidget) .length) return
	$(userAvatarIMG)
		.attr("id","OBL_UserAvatar")
		.css("height","auto")
		//.css("border","5px solid red")
		
	
	console.info(Object.keys(localStorage))
	var personaID = new RegExp("^.+:\/\/.+\/career\/(.+)?\/.+$",'gmi').exec(window.location.href)
	if(personaID.length == 1) return
	/*
	$(userAvatarIMG).attr("src",
		"https://secure.download.dm.origin.com/production/avatar/prod/userAvatar/" + personaID + "/416x416.PNG")
	*/
	/*
	OriginAPI("avatar2",{url:userID},function(data){
		
		var AvatarSRC = $(data.dataOut).find("link").html()
		$(userAvatarIMG).attr("src",AvatarSRC)
	})
	*/
	/*
	if($(userAvatarIMG).attr("src") == "https://stage.download.dm.origin.com/integration/avatar/int/1/1/40x40.JPEG"){
		OriginAPI("avatar2",{url:userID},function(){
			
		})
	}
	*/
	
}











