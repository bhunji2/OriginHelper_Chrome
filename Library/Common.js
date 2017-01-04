var access_token = -1
var TokenURL	= 
	"https://accounts.ea.com/connect/auth?client_id=ORIGIN_JS_SDK&response_type=token&redirect_uri=nucleus:rest&prompt=none"
	//"https://accounts.ea.com/connect/auth?client_id=ORIGIN_SPA_ID&response_type=code&redirect_uri=nucleus:rest&prompt=none"

function GetURL(file){ 
	if(!file) 	file = ""
	if(chrome.extension == undefined) {
			if(!ExtURL){
				alert('ExtURL is not found - GetURL error.');
				throw new Error('ExtURL is not found - GetURL error.');
			}
			return ExtURL + file; 
	}
	else 	return chrome.extension.getURL(file); 
}

//https://developer.chrome.com/extensions/storage#property-sync
function GetSync(prefixData,callback){ chrome.storage.sync.get(prefixData,callback); }
function SetSync(prefixData,callback){ chrome.storage.sync.set(prefixData,callback); }
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

OriginAPI("auth",null,function(data){ access_token = $.parseJSON(data.dataOut).access_token })
function OriginAPI(type,dataIn,callback,ErrorCallback){
	var randAPI = getRandomInt(1,4)
	var apiURL	= ""
	var BaseURL = "https://api" + randAPI + ".origin.com/"
	
	if(type == "userIds")		apiURL = BaseURL + "atom/users?userIds=" + dataIn.url
	if(type == "encodePair") 	apiURL = BaseURL + "gifting/idobfuscate/users/" + dataIn.url + "/encodePair"
	if(type == "decodePair") 	apiURL = BaseURL + "gifting/idobfuscate/users/" + dataIn.url + "/decodePair"
	if(type == "avatar1")		apiURL = BaseURL + "avatar/user/" + dataIn.url + "/avatars?size=1"
	if(type == "avatar2")		apiURL = BaseURL + "avatar/user/" + dataIn.url + "/avatars?size=2"
	if(type == "auth")			apiURL = TokenURL
	
	$.ajax({
		url: apiURL,
		//data: { signature: authHeader },
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader('authToken', access_token)
			xhr.setRequestHeader('authority', 'api' + randAPI + '.origin.com')
		},
		success: function(dataOut) { 
			//console.error(dataOut)
			callback({type:type , dataIn:dataIn , dataOut:dataOut})
		},
		error: function(event, jqxhr, settings, errorThrown ){
			console.error([event, jqxhr, settings, errorThrown])
			/*
			ErrorCallback()
			callback(playerName,playerNID,null)
			*/
		}
	});
}

/*
curl "https://api4.origin.com/atom/users/1000539918459/reportUser/1004345032558" -X OPTIONS -H "origin: https://www.origin.com" -H "access-control-request-method: POST" -H "dnt: 1" -H "accept-encoding: gzip, deflate, sdch, br" -H "accept-language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4" -H "user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" -H "accept: *\/*" -H "referer: https://www.origin.com/twn/zh-tw/profile/user/y7JGX6e.9XCyquwb3KxroQ--/achievements" -H "authority: api4.origin.com" -H "access-control-request-headers: authtoken, x-origin-platform" --compressed
*/
/*
curl "https://api4.origin.com/atom/users/1000539918459/reportUser/1004345032558" -H "origin: https://www.origin.com" -H "dnt: 1" -H "accept-encoding: gzip, deflate, br" -H "x-origin-platform: PCWIN" -H "accept-language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4" -H "user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" -H "authtoken: QVQxOjEuMDozLjA6NjA6OUJETmlGZHB5QVdZVE5NQ0lWcjVSZDRoU2pQdzdDeUZ2UXU6MTg0NTk6bmlpN2w" -H "accept: *\/*" -H "referer: https://www.origin.com/twn/zh-tw/profile/user/y7JGX6e.9XCyquwb3KxroQ--/achievements" -H "authority: api4.origin.com" -H "content-type: text/plain;charset=UTF-8" --data-binary ^"^<reportUser^>^

 ^<contentType^>In Game^</contentType^>^

 ^<reportReason^>Cheating^</reportReason^>^

^</reportUser^>^" --compressed

*/

function isNotUndefined(obj){
	if(obj === undefined || obj == " " || obj == "") return false
	return true
}