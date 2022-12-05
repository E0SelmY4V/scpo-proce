testWebsite = "https://api.lovelive.tools/api/SweetNothings";
function webReq(url, callback) {
	var xh = new ActiveXObject("Microsoft.XMLHTTP");
	xh.onreadystatechange = function () {
		if (xh.readyState == 4 && xh.status == 200) callback(xh.responseText, 123, 234);
	};
	xh.open("GET", url);
	xh.send();
}