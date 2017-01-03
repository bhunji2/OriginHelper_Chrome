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
function OriginAPI(type,dataIn,callback){
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
		}
	});
}