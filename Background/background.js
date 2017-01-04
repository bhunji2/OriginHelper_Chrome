chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	//console.log('Page uses History API and we heard a pushSate/replaceState.');
	// do your thing
	//console.error(details)
	
	if(details.url.match("/\*://myaccount.ea.com/cp-ui/privacy\*/"))
		chrome.tabs.sendMessage(details.tabId, { data: "privacyRun" });
	/*
	if(details.url.match(".+:\/\/www\.origin\.com\/.+\/profile\/user\/.+")){
		console.error("profile")
		chrome.tabs.executeScript(details.tabId, {file: "Library/jquery.min.js"});
		chrome.tabs.executeScript(details.tabId, {file: "Library/jquery-ui-1.11.4.custom/jquery-ui.min.js"});
		chrome.tabs.executeScript(details.tabId, {file: "Library/Common.js"});
		chrome.tabs.executeScript(details.tabId, {file: "ContentScripts/Profile.js"});
	}
	*/
});


