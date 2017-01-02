chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	//console.log('Page uses History API and we heard a pushSate/replaceState.');
	// do your thing
	console.error(details)
	
	if(details.url.match("/\*://myaccount.ea.com/cp-ui/privacy\*/")){
		/*
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
			chrome.tabs.sendMessage(tabs[0].id, {data:"privacyRun"});
		});
		*/
		chrome.tabs.sendMessage(details.tabId, { data: "privacyRun" });
	}
});