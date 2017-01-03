$(window).click(ExecuteFunc)

var Functions = [
	{"selector":"#OptionsMenuPlayerData","func":function(){ OptionsMenuPlayerData(); }}
]

function ExecuteFunc(){
	for(var i = 0;i < Functions.length;i++){
		if(!$(Functions[i].selector).length) Functions[i].func()
	}
}

function OptionsMenuPlayerData(){
	if(!$("#origin-profile-header-controls-options-menu").length) return
	var UserName		= $("div.origin-profile-header-username[ng-bind='user.EAID']").html()
	var OptionsMenuUL 	= $("#origin-profile-header-controls-options-menu ul")
	
	
	$("body").append("<div id='OptionsMenuPlayerDataDialog' style='display:none;' title='" + UserName + "'>"+
		"<img src='" + GetURL("Res/LoadingRipple.gif") + "'>"+
	"</div>")
	
	
	$(OptionsMenuUL).append(
		'<li id="OptionsMenuPlayerData" role="playerData"><a role="menuitem" tabindex="-1" href="javascript:void(0)">檢視玩家資訊</a></li>'
	)
	
	$("#OptionsMenuPlayerData").click(function(){ 
		$("#OptionsMenuPlayerDataDialog").dialog()
		var userID = $("#content origin-profile-header").attr("nucleusid")
		OriginAPI("userIds",{url:userID},PrintPlayerData)
	})
	
}

function PrintPlayerData(data){
	//console.error(data.dataOut)
	$("#OptionsMenuPlayerDataDialog").html("玩家資訊："
		+"<br>userID：	 	" + $(data.dataOut).find("userId")		.html()
		+"<br>personaID：	" + $(data.dataOut).find("personaId")	.html()
		+"<br>firstName：	" + $(data.dataOut).find("firstName")	.html()
		+"<br>lastName：	" + $(data.dataOut).find("lastName")	.html()
	)
}












