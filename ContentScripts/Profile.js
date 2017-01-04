
var Functions = [
	//{"selector":"#OptionsMenuPlayerData","func":function(){ OptionsMenuPlayerData(); }}
	 {"selector":"#OptionsMenuPlayerData"	,"func":OptionsMenuPlayerData}
	,{"selector":"#avatarIMG"				,"func":AvatarIMG}
]

$(window).click(ExecuteFunc)
function ExecuteFunc(){
	for(var i = 0;i < Functions.length;i++){
		if(!$(Functions[i].selector).length) Functions[i].func()
	}
}

function OptionsMenuPlayerData(){
	if(!$("#origin-profile-header-controls-options-menu").length) return
	$("#OptionsMenuPlayerDataDialog").dialog( "destroy" )
	var UserName		= $("div.origin-profile-header-username[ng-bind='user.EAID']").html()
	var OptionsMenuUL 	= $("#origin-profile-header-controls-options-menu ul")
	
	$("#content").append("<div id='OptionsMenuPlayerDataDialog' style='display:none;' title='" + UserName + "'>"+
		"<div style='text-align:center'><img style='vertical-align:middle;' src='" + GetURL("Res/LoadingRipple.gif") + "'></div>"+
	"</div>")
	
	$(OptionsMenuUL).append(
		'<li id="OptionsMenuPlayerData" role="playerData"><a role="menuitem" tabindex="-1" href="javascript:void(0)">檢視玩家資訊</a></li>'
	)
	
	$("#OptionsMenuPlayerData").click(function(){ 
		var userID = $("#content origin-profile-header").attr("nucleusid")
		OriginAPI("userIds",{url:userID},PrintPlayerData)
		$("#OptionsMenuPlayerDataDialog").dialog({
			modal		 : true,
			closeOnEscape: true,
			hide: 		{ effect: "explode", duration	: 500 						  },
			position: 	{ my	: "center" , at			: "center", of: $("#content") }
		})
	})
}

function PrintPlayerData(data){
	//console.error(data.dataOut)
	$("#OptionsMenuPlayerDataDialog").html("玩家資訊："
		+"<br>userID：	 	" + $(data.dataOut).find("userId")		.html()
		+"<br>personaID：	" + $(data.dataOut).find("personaId")	.html()
	)
	
	var firstName 	= $(data.dataOut).find("firstName")	.html()
	var lastName	= $(data.dataOut).find("lastName")	.html()
	
	if(firstName) $("#OptionsMenuPlayerDataDialog")	.append("<br>firstName：" + firstName)
	if(lastName)  $("#OptionsMenuPlayerDataDialog")	.append("<br>lastName："  + lastName)
}

function AvatarIMG(){
	console.info("AvatarIMG")
	var elem_AvatarIMG = $("#content img.otkavatar-img[draggable='false']")
	$(elem_AvatarIMG).css("border-radius","0%")
}










