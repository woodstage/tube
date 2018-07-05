// chrome.browserAction.onClicked.addListener(function(){
// 	//发送消息到content script
// 		chrome.tabs.getSelected(null,function(tab){
// 			//tab是用户当前停留的标签
// 			//下面的脚本发送消息到指定标签的content script
// 			chrome.tabs.sendMessage(tab.id, {cmd: 'init'}, function(response) {
// 		    	console.log(response && response.status);
// 		  	});
// 		})
// })

chrome.contextMenus.create({
	title: "Tube",
	contexts: ['image'],
	onclick: function (event, tab) {
	  chrome.tabs.sendMessage(tab.id, "tube_message:" + JSON.stringify({url: event.srcUrl}));
	}
});