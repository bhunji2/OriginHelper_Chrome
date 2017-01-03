//==========================================================================================================
var OriBaseURL	= 
	"https://www.origin.com/twn/zh-tw/"
//==========================================================================================================
$(window).load(MainStart)
//==========================================================================================================
chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if(request.data == "privacyRun"){ 
		window.stop();
		window.location.href = window.location.href 
	}
	//console.error([request , sender])
});
//==========================================================================================================
function MainStart(){
	if(!$("#blockedUsers").length) return
	SetCSS()
	GetToken()
	BoxSearchUserID()
	SetNewNvigate()
}

function SetNewNvigate(){
	var cloneNvigate = $("#NavLink dd[class!='select']:eq(0)").clone()
	$(cloneNvigate).find("a")
		.attr("id","nav_privacy_tracker_click")
		.attr("href","javascript:void()")
		.removeAttr("partial")
		
	$(cloneNvigate).find("div.navigate outer").attr("id","nav_privacy_tracker")
	$(cloneNvigate).find("div.inner").html("特殊名單追蹤")
	$(cloneNvigate).appendTo("#NavLink")
	
	$("#nav_privacy_tracker_click").click(function(){
		$("#NavLink dd.select").removeClass("select")
		$(cloneNvigate).addClass("select")
		$("#ContextContainer").html("")
		//history.pushState(null, null, "https://myaccount.ea.com/cp-ui/privacy/index");
	})
}

function SetCSS(){
	//設定可複製文字
	//http://stackoverflow.com/questions/16600479/how-do-you-override-moz-user-select-none-on-a-child-element
	//https://developer.mozilla.org/zh-TW/docs/Web/CSS/user-select
	$("body").css("-webkit-user-select","text")
	//設定黑名單列表高度使用
	$("#blockedUsers dl")
		.css("height","auto")
		.css("line-height","25px")
}

function GetToken(){
	//http://stackoverflow.com/questions/3258645/pass-request-headers-in-a-jquery-ajax-get-call
	$.get( TokenURL ).done(function( data ) {
		//console.error(data)
		var json = $.parseJSON(data)
		//console.error(json.code)
		if(json.access_token){
			access_token = json.access_token
			BlockListRun()
		}
	}).fail( function(xhr, textStatus, errorThrown) {
		console.error("失敗：" + xhr.responseText)
    });
}

function BlockListRun(){
	var BlockList = {}
	$("#blockedUsers dl").each(function(){
		var playerName 	= $(this).find("dd.fleft  span:eq(0)")	.html()
		var playerNID	= $(this).find("dd.fright a:eq(0)")		.attr("id")
		BlockList[playerNID] = null
		//console.error([playerName,playerNID])
		GetPlayerData(playerName,playerNID,PrintPlayerData)
	})
	
	if(!BlockList.length) return
	GetSync(BlockList,function(objs){
		
	})
}

function PrintPlayerData(playerName,playerNID,Data){
	//console.error(Data)
	var EAID		= $(Data).find("EAID")		.html()
	var userId 		= $(Data).find("userId")	.html()
	var personaId	= $(Data).find("personaId")	.html()
	var firstName	= $(Data).find("firstName")	.html()
	var lastName	= $(Data).find("lastName")	.html()
	var RemoveHref 	= $("#blockedUsers #" + userId)
	var elementDL	= $(RemoveHref).parent().parent()
	var elementDD 	= $(elementDL).find("dd.fleft:eq(0)")
	var elementSpan = $(elementDD).find("span:eq(0)")
	
	//設定移除按鈕的顏色
	$(RemoveHref).css("color","green")
	//設定項目指標
	$(elementDL)	.attr("id","OBL_dl_" 	+ userId)
	$(elementSpan)	.attr("id","OBL_name_" 	+ userId)
	
	//插入玩家資訊
	$(elementDD).html( $(elementDD).html() + 
		"<br>userId：<a>" 		+ userId 	+ "</a>" +
		"<br>personaId：<a>" 	+ personaId + "</a>"
	)
	if(firstName === undefined || firstName == " "){}else{
		$(elementDD).html( $(elementDD).html() + "<br>firstName：<a>" 	+ firstName + "</a>")
	}
	if(lastName === undefined || lastName == " "){}else{
		$(elementDD).html( $(elementDD).html() + "<br>lastName：<a>" 	+ lastName + "</a>")
	}
	//取得對象的個人檔案暫時密鑰
	OriginAPI("encodePair",{url:userId},function(data){
		var ProfileID 	= data.dataOut.id
		var UserID 		= data.dataIn.url
		$("#OBL_name_" + UserID)
			.html("<a target='_blank' href='" + OriBaseURL + "profile/user/" + ProfileID + "'>" + EAID + "</a>")
	})
	//取得頭像
	OriginAPI("avatar2",{url:userId , userId:userId},function(data){
		var AvatarIMG		= $(data.dataOut).find("link").html()
		$("<br><a target='_blank' href='" + AvatarIMG + "' id='OBL_imgA_" + userId + "'><img src='" + AvatarIMG + "' width='45' height='45'></a>").insertAfter(
			$("#OBL_dl_" + data.dataIn.userId).find("dd.fright a:eq(0)")
		)
	})
}

function GetPlayerData(playerName,playerNID,callback){
	$.ajax({
		url: "https://api" + getRandomInt(1,4) + ".origin.com/atom/users?userIds=" + playerNID,
		//data: { signature: authHeader },
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader('authToken', access_token)
			xhr.setRequestHeader('authority', 'api' + getRandomInt(1,4) + '.origin.com')
		},
		success: function(Data) { 
			//alert('Success!' + authHeader); 
			//console.error(data)
			callback(playerName,playerNID,Data)
		}
	});
}


function BoxSearchUserID(){
	$("#privacy_reset_form div.block_user").html( $("#privacy_reset_form div.block_user").html() + 
		'<div class="row">' +
		"<dl>" +
			"<dt>透過 UserID 查詢玩家名稱：( 逗號或分行可查詢多個玩家 )</dt>" +
			"<dd>" +
				'<textarea id="OBL_blockSearch_Text">' +
				'</textarea>' +
			"</dd>" +
			"<dd>" +
				'<a href="javascript:void(0);" class="buttonstyle_3" id="OBL_blockSearch_Button" draggable="false">' +
					"<span>查詢</span>" +
				"</a>" +
			"</dd>" +
		"</dl>" +
		'<div id="OBL_blockSearch_Result"></div>' +
	"</div>" +
	"")
	
	$("#OBL_blockSearch_Text").css("width","310.996").css("height","19.504")
	
	$("#OBL_blockSearch_Button").click(function(){
		$("#OBL_blockSearch_Text").val( 
			$("#OBL_blockSearch_Text").val()
			.replace(new RegExp("\n","gmi"),",") 
			.replace(new RegExp(" ","gmi"),"") 
		)
		var UserID = $("#OBL_blockSearch_Text").val()
		$("#OBL_blockSearch_Result").html("<br>")
		GetPlayerData(UserID,UserID,function(playerName,playerNID,Data){
			//console.error(Data)
			$(Data).find("user").each(function(){
				$("#OBL_blockSearch_Result").append( "<br>" + $(this).find("userId").html() + "：" + $(this).find("EAID").html())
			})
		})
	})
}


/*
https://api2.origin.com/xsearch/users?userId=1000539918459&searchTerm=974256834&start=0
https://www.origin.com/twn/zh-tw/search?userId=1000539918459&searchTerm=974256834&

https://api2.origin.com/xsearch/users?userId=974256834&searchTerm=974256834&start=0


curl "https://api1.origin.com/gifting/idobfuscate/users/2399521364/encodePair" -H "origin: https://www.origin.com" -H "dnt: 1" -H "accept-encoding: gzip, deflate, sdch, br" -H "accept-language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4" -H "user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" -H "authtoken: QVQxOjEuMDozLjA6NjA6QmMzYXlVTmg3WFBsNmVTV3Y4c2VzNzZVODdFYzVzcVM0SjE6MTg0NTk6bmlmYzk" -H "accept: *\/*" -H "referer: https://www.origin.com/twn/zh-tw/profile/user/DrmOdaOY1Dqx_T9HksV5_A--/achievements" -H "authority: api1.origin.com" --compressed

curl "https://api4.origin.com/atom/users?userIds=1000154161151" -H "origin: https://www.origin.com" -H "dnt: 1" -H "accept-encoding: gzip, deflate, sdch, br" -H "accept-language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4" -H "user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" -H "authtoken: QVQxOjEuMDozLjA6NjA6bTY3dmlvVkJ6QlFGUTVibWx4ellsNkp3aVc3a3dWTDVIYTQ6MTg0NTk6bmlmaGY" -H "accept: x-cache/force-write" -H "referer: https://www.origin.com/twn/zh-tw/search?searchString=vanquish_KR" -H "authority: api4.origin.com" -H "x-origin-platform: PCWIN" --compressed
*/





















