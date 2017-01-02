
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);

var frameSel = document.getElementById("frameSel")
$(frameSel).change(function() {
	if(frameSel.value == "lib/index3.php?uid="){
			$( "#status" ).html("手動填入UID號碼，或是不理會由套件自動偵測")
	}
	else if(frameSel.value == "lib/index.php?fid=2&Custom=true"){
			$("#frameCustomURLdiv").show();
	}
	else {
			$( "#status" ).html("")
			$("#frameCustomURLdiv").hide();
	}
});

$("#LoginCancel").click(function() {
	chrome.storage.local.set({ "LoginName": "", "LoginPass": ""})
	
	$("#LoginName").val("")
	$("#LoginPass").val("")
	
	var LoginStatus = document.getElementById('LoginStatus');
	LoginStatus.innerHTML = '<font color="red">登入已取消</font>';
	setTimeout(function() { LoginStatus.innerHTML = ''; }, 1000 * 1.5);
	$("#LoginCancel").css("color","red").prop('disabled', true);
})

$("#CboxURLGo").click(function() 		{ chrome.tabs.create({ url: $("#CboxURL").val() }) })
$("#ChatAlertPlay").click(function() 	{ chrome.extension.sendMessage({ type:"SoundAlert", out: "Chat" }); })
$("#Lv1AlertPlay").click(function() 	{ chrome.extension.sendMessage({ type:"SoundAlert", out: "Lv1" }); })
$("#ChatAlertBoxPlay").click(function() { chrome.extension.sendMessage({ type:"AlertBoxPlay", out: "CboxMess" , mes:"設定區通知測試" }); })
$("#Lv1AlertBoxPlay").click(function() 	{ chrome.extension.sendMessage({ type:"AlertBoxPlay", out: "Lv1Mess" , mes:"設定區通知測試" }); })
$("#CommandsSet").click(function() 		{ chrome.tabs.create({ url: "chrome://extensions/configureCommands" }) })
$("#default").click(function(){ 
	chrome.storage.sync.clear(function(){
	chrome.storage.local.clear(function(){
		SavingImgN(2)
		setTimeout(WindowClose, 1000 * 1.5);
}); }); })

function save_options() {
	SavingImgN(0)
	chrome.storage.sync.set({
		//"FrameURL": 		$("#frameSel").val(),
		"FrameURL": 		document.getElementById('frameSel').value,
		"UID": 				document.getElementById('frameSelUID').value,
		"ChatInterVal": 	document.getElementById('ChatInterVal').value,
		"MessInterVal":		document.getElementById('MessInterVal').value,
		"CboxID":			document.getElementById('CboxID').value,
		"CboxURL": 			document.getElementById('CboxURL').value,
		"IndexIcon": 		document.getElementById('IndexIcon').checked,
		"Announcement": 	document.getElementById('Announcement').checked,
		"frameCustomURL":	document.getElementById('frameCustomURL').value,
		"IMGLoaderCount":	document.getElementById('IMGLoaderCount').checked,
		"MAXwidth":			document.getElementById('MAXwidth').value,
		"MAXHeight":		document.getElementById('MAXHeight').value,
		"IMGLoaderAuto":	document.getElementById('IMGLoaderAuto').checked,
		"IndexNewBlank":	document.getElementById('IndexNewBlank').checked,
		"ChatAlertSound":	document.getElementById('ChatAlertSound').checked,
		"Lv1AlertSound":	document.getElementById('Lv1AlertSound').checked,
		"ChatAlertBox":		document.getElementById('ChatAlertBox').checked,
		"Lv1AlertBox":		document.getElementById('Lv1AlertBox').checked,
		"TextAreaFontSize":	document.getElementById('TextAreaFontSize').value,
		"IdleNoMessage":	document.getElementById('IdleNoMessage').checked,
		"AutoLikePost":		document.getElementById('AutoLikePost').checked,
		"OutSideCommands":	document.getElementById('OutSideCommands').checked,
		"CboxNewWindow":	document.getElementById('CboxNewWindow').checked,
		"VideoLoadAuto":	document.getElementById('VideoLoadAuto').checked
	},
	function() { SavingLocal() });
}

function SavingLocal(){
	var LoginName = document.getElementById('LoginName').value
	var LoginPass = document.getElementById('LoginPass').value
	
	chrome.storage.local.set({
		"LoginName":	 	LoginName,
		"LoginPass":		LoginPass,
		
		"Popup2Width":		document.getElementById('Popup2Width').value,
		"Popup2Height":		document.getElementById('Popup2Height').value
	}, function() {});
	
	if(LoginName && LoginPass){
		SavingImgN(1)
		chrome.storage.local.set({
			"LoginName": LoginName,
			"LoginPass": LoginPass
		}, function() {
			setTimeout(WindowClose, 1000 * 0.6);
		});
	}
	else setTimeout(WindowClose, 1000 * 0.6);
}

function SavingImgN(type){
	var Loading2L = document.createElement("img");
	//Loading2L.style.position = "absolute";
	Loading2L.style.position = "fixed";
	Loading2L.style.cursor = "help";
	switch(type){
		case 0:
		{
			Loading2L.src = chrome.extension.getURL('res/Loading2.gif')
			Loading2L.style.bottom = "4px";
			//Loading2L.style.top = "2px";
			Loading2L.style.right = '4px';
			break;
		}
		case 1:
		{
			Loading2L.src = chrome.extension.getURL('res/Loading.gif')
			//Loading2L.style.top = "2px";
			Loading2L.style.bottom = "4px";
			Loading2L.style.left = '4px';
			break;
		}
		case 2:
		{
			Loading2L.src = chrome.extension.getURL('res/Loading3.gif')
			Loading2L.style.bottom = "4px";
			Loading2L.style.left = '4px';
			break;
		}
	}
	document.body.insertBefore(Loading2L,document.body.lastChild);
}

function WindowClose(){
	window.opener=null;
	window.close();
	chrome.extension.sendMessage({ type: "ExtensionReload" });
}

function restore_options() {
	chrome.storage.sync.get({
		"FrameURL": 		'lib/index.php?fid=2',
		"UID":				'1054',
		"ChatInterVal":		'10',
		"MessInterVal":		"15",
		"CboxID":			'無名氏',
		"CboxURL":			'',
		"IndexIcon":		true,
		"Announcement":		true,
		"frameCustomURL":	'lib/index.php?fid=2',
		"IMGLoaderCount":	true,
		"MAXwidth":			"800",
		"MAXHeight":		"700",
		"IMGLoaderAuto":	false,
		"IndexNewBlank":	false,
		"ChatAlertSound":	true,
		"Lv1AlertSound":	true,
		"ChatAlertBox":		true,
		"Lv1AlertBox":		true,
		"TextAreaFontSize":	"12",
		"IdleNoMessage":	false,
		"AutoLikePost":		false,
		"OutSideCommands":	true,
		"CboxNewWindow":	true,
		"VideoLoadAuto":	true
	}, function(items) {
		document.getElementById('frameSel').value 			= items["FrameURL"];
		document.getElementById('frameSelUID').value 		= items["UID"];
		document.getElementById('ChatInterVal').value 		= items["ChatInterVal"];
		document.getElementById('MessInterVal').value 		= items["MessInterVal"];
		document.getElementById('CboxID').value 			= items["CboxID"];
		document.getElementById('CboxURL').value 			= items["CboxURL"];
		document.getElementById('IndexIcon').checked 		= items["IndexIcon"];
		document.getElementById('Announcement').checked 	= items["Announcement"];
		document.getElementById('frameCustomURL').value 	= items["frameCustomURL"];
		document.getElementById('IMGLoaderCount').checked 	= items["IMGLoaderCount"];
		document.getElementById('MAXwidth').value 			= items["MAXwidth"];
		document.getElementById('MAXHeight').value 			= items["MAXHeight"];
		document.getElementById('IMGLoaderAuto').checked 	= items["IMGLoaderAuto"];
		document.getElementById('IndexNewBlank').checked 	= items["IndexNewBlank"];
		document.getElementById('ChatAlertSound').checked 	= items["ChatAlertSound"];
		document.getElementById('Lv1AlertSound').checked 	= items["Lv1AlertSound"];
		document.getElementById('ChatAlertBox').checked 	= items["ChatAlertBox"];
		document.getElementById('Lv1AlertBox').checked 		= items["Lv1AlertBox"];
		document.getElementById('TextAreaFontSize').value 	= items["TextAreaFontSize"];
		document.getElementById('IdleNoMessage').checked 	= items["IdleNoMessage"];
		document.getElementById('AutoLikePost').checked 	= items["AutoLikePost"];
		document.getElementById('OutSideCommands').checked 	= items["OutSideCommands"];
		document.getElementById('CboxNewWindow').checked 	= items["CboxNewWindow"];
		document.getElementById('VideoLoadAuto').checked 	= items["VideoLoadAuto"];
		
		$( "#frameSel" ).trigger( "change" );
		
		LocalGet()
		jToolTip()
	});
}

function jToolTip(){
	$(".tooltip").tooltip({ content: function () { return $(this).attr('title'); }});
}

function LocalGet(){
	chrome.storage.local.get({
			"LoginName": 			"",
			"LoginPass": 			"",
			"Popup2Width":			550,
			"Popup2Height":			570
		},
		function(objects) {
			document.getElementById('Popup2Width').value 			= objects["Popup2Width"];
			document.getElementById('Popup2Height').value 			= objects["Popup2Height"];
			
			if(objects["LoginName"] && objects["LoginPass"])
					$("#LoginCancel").css("color","green")
			else 	$("#LoginCancel").css("color","red").prop('disabled', true);
		}
	);
}









