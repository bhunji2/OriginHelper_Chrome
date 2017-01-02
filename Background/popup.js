document.addEventListener('DOMContentLoaded',DOMContentLoaded)
function DOMContentLoaded(){
	Lv1Img()
	$("#LineQR").click(function(){ LineLoginCheck() })
	$("#LineDiv").center({ vertical: true, horizontal: true })
	$("#LineDiv").click(function(){ $("#LineDiv").hide() })
}

function Lv1Img(){
	var Lv1IMGTo = document.createElement("img");
	Lv1IMGTo.style.position = "fixed";
	Lv1IMGTo.style.cursor = "help";
	Lv1IMGTo.src = chrome.extension.getURL('res/lv1.png')
	Lv1IMGTo.style.top = "8px";
	Lv1IMGTo.style.right = '8px';
	Lv1IMGTo.title = '點我到小站';
	document.body.insertBefore(Lv1IMGTo,document.body.firstChild);
	$(Lv1IMGTo).click(function(){ chrome.tabs.create({ url: "http://www.lv1.in" }); })
	
	var CboxIMGTo = document.createElement("img");
	CboxIMGTo.style.position = "fixed";
	CboxIMGTo.style.cursor = "help";
	CboxIMGTo.src = chrome.extension.getURL('res/Message2.gif')
	CboxIMGTo.style.top = "8px";
	CboxIMGTo.style.left = '9px';
	CboxIMGTo.height = '16'
	CboxIMGTo.width = '16'
	CboxIMGTo.title = '點我開啟浮動式聊天視窗';
	document.body.insertBefore(CboxIMGTo,document.body.firstChild);
	$(CboxIMGTo).click(function(){ 
		chrome.runtime.sendMessage({type : "CboxPopup" }) 
		WindowClose()
	})
}

function WindowClose(){
	window.opener=null;
	window.close();
}

function LineLoginCheck(){
	$("#LineDiv").show()
	chrome.runtime.sendMessage({type : "IndexReloadRequest"}, function(response) {
		if(response) 
				$("#LineQRimg").attr("src",chrome.extension.getURL("res/LineQR.jpg"));
		else 	LineLogin();
	});
}

function LineLogin(){
	$.get( "http://www.lv1.in/menu.php").done(function( data ) {
		if(!data.match("歡迎回來"))
				$("body").html( "請先登入小站" + '<a class="unselectable">testtesttestte</a>')
		else 	{
				$("#LineQRimg").attr("src",chrome.extension.getURL("res/LineQR.jpg"));
				chrome.extension.sendMessage({ type: "MenuToIndexReload" });
		}
	}).fail( function(xhr, textStatus, errorThrown) { 
		$("body").html("小站連線錯誤") 
	});
}





