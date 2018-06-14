const BTN_INDEX = 1002;
const MASK_INDEX = 1001;
const MASK_HIDE_INDEX = -1;
const SHELL_INDEX = 1000;
const ID = chrome.runtime.id;

const cmd = Object.freeze({
	OPEN_TOOLS: 'OPEN_TOOLS',
	CLOSE_TOOLS: 'CLOSE_TOOLS'
})

var toolBoxLoaded = false;


function makeBtn(text, opt, clickHandler){
	var btn = document.createElement('button');
	btn.innerText =  text;

	opt['font-size'] = opt['font-size'] || '25px';
	opt['padding'] = opt['padding'] || '5px 20px';
	opt['border-radius'] = opt['border-radius'] || '5px';
	opt['font-weight'] = opt['font-weight'] || 'normal';

	for(var k in opt){
		var val = opt[k];
		btn.style[k] = val;
	}

	if(arguments.length>1){
		btn.addEventListener('click', function(e){
			if(e.target !== btn) return;
			clickHandler(e);
		});
	}

	return btn;
}


function loadToolBox(){
	if(toolBoxLoaded){
		document.getElementById('more-photo').style.display = 'block';
	}

	var style = document.createElement('link');
	style.href = 'chrome-extension://' + ID + '/content.css';
	style.rel = 'stylesheet';
	style.type = 'text/css';
	document.head.appendChild(style);


	var toolBox = document.createElement('iframe');
	toolBox.src = 'chrome-extension://'+ ID +'/toolbox/index.html';
	toolBox.setAttribute('id', 'more-photo');
	toolBox.style.height = '442px !import';
	document.body.appendChild(toolBox);

	toolBoxLoaded = true;
}

function closeToolBox(){
	document.getElementById('more-photo').style.display = 'none';
}



var nPages = (function(){

	var paper;
	var imgs;
	var shells = [];
	var selectedImg;

	return {
		on: function() {

			chrome.runtime.onMessage.addListener(function(msg){

				switch(msg.cmd){
					case cmd.OPEN_TOOLS: loadToolBox();	break;
					case cmd.CLOSE_TOOLS: closeToolBox(); break;
					default: loadToolBox();	
				}

			})
		},
		start: function() {
			imgs = document.getElementsByTagName('img');
			var length = imgs.length;

			var set = document.createElement('div');
			document.body.appendChild(set);

			var mask = document.createElement('div');
			mask.style['z-index'] = MASK_HIDE_INDEX;
			mask.style.position = 'absolute';
			mask.style.top = 0;
			mask.style.left = 0;
			mask.style.background = '#fffffe';
			mask.style.opacity = 0.5;
			mask.style.width = document.body.clientWidth + 'px';
			mask.style.height = document.body.clientHeight + 'px';
			document.body.appendChild(mask);

			var okBtn = makeBtn('确定', {
					display: 'none',
					position: 'fixed',
					left: '10%',
					bottom: '10%',
					'z-index': BTN_INDEX
				}, function(e){
					alert(selectedImg.getAttribute('src'))
				})

			var cancelBtn = makeBtn('取消', {
				    display: 'none',
				    position: 'fixed',
					right: '10%',
					bottom: '10%',
					'z-index': BTN_INDEX
				}, function(e){
					selectedImg = null;
				    okBtn.style.display = 'none';
				    cancelBtn.style.display = 'none';
					mask.style['z-index'] = MASK_HIDE_INDEX;

					shells.forEach(function(shell){
						shell.style.outline = '#00ff00 dotted thick';
	 			    })

				})

			set.appendChild(okBtn);
			set.appendChild(cancelBtn);

			var scrollTop = document.body.scrollTop;
			var scrollLeft = document.body.scrollLeft;

 			for(var i = 0; i < length; i++){
 				var img = imgs[i];
 				var rect = img.getBoundingClientRect();

 				var shell = document.createElement('div');
 				shell.setAttribute('data-imgIndex', i);
 				shell.img = img;
 				shell.style['z-index'] = SHELL_INDEX;
 				shell.style.position = 'absolute';
 				shell.style.top = rect.top + scrollTop + 'px';
 				shell.style.left = rect.left + scrollLeft + 'px';
 				shell.style.width = rect.width + 'px';
 				shell.style.height = rect.height + 'px';
 				shell.style.outline = '#00ff00 dotted thick';
 				shell.addEventListener('click', function(e){
 					var self = e.target;
 					selectedImg = imgs[parseInt(self.getAttribute('data-imgIndex'))];
 					okBtn.style.display = 'inline-block';
 					cancelBtn.style.display = 'inline-block';
 					self.style['outline-style'] = 'solid';
 					mask.style['z-index'] = MASK_INDEX;

 					shells.forEach(function(shell){
 						if(shell === self) return;
 						shell.style.outline = 'none';
 					})
 				})

 				set.appendChild(shell);
 				shells.push(shell);
 			}

 			document.onscroll = function(){
 				var scrollTop = document.body.scrollTop;
				var scrollLeft = document.body.scrollLeft;
 				
 				shells.forEach(function(shell){
 					var img = shell.img;
 					var rect = img.getBoundingClientRect();
 					shell.style.top = rect.top + scrollTop + 'px';
 					shell.style.left = rect.left + scrollLeft + 'px';
 				})
 			}
		}
	}
})()


window.onload = function(){
	nPages.on();
}
