window.addEventListener("resize", WinResize);
function WinResize(){
	chrome.runtime.sendMessage({type : "ChatResize"}, function(response) { });
}



