var pageViewer = (function(){

  const ID = chrome.runtime.id; //Extension id

  var initalized = false;

  var imageViewer = document.createElement('div');
  imageViewer.setAttribute('id', (Math.random() + '').substr(2));
  imageViewer.setAttribute('class', 'image-viewer');
  var imageBox = document.createElement('div');
  imageBox.setAttribute('class', 'images');
  imageViewer.appendChild(imageBox);
  var style = document.createElement('link');
  style.href = 'chrome-extension://' + ID + '/content.css';
  style.rel = 'stylesheet';
  style.type = 'text/css';

  var images = [];

  var addViewer = function(){
    document.head.appendChild(style);
    document.body.appendChild(imageViewer);
  }

  var addImages = function(){
    var imageElements = document.querySelectorAll('img');
    Array.prototype.map.call(imageElements, function(element){
      return element.src || element.getAttribute('src');
    }).forEach(function(src){
      if(!images.includes(src)){
        images.push(src);
        var image = new Image();
        image.src = src;
        imageBox.appendChild(image);
      }
    })
  }

  var addImagesWatch = function(){
    setInterval(function(){
      addImages();
    }, 500);
  }

  var init = function(){
    if(initalized) return;
    initalized = true;
    addViewer();
    addImagesWatch();
  }

  var hide = function(){
    imageViewer.style.display = 'none';
  }

  var show = function(){
    imageViewer.style.display = 'block';
  }

  return {
    init: function(){
      addViewer();
    },
    listen: function(){
      chrome.runtime.onMessage.addListener(function(msg){
				switch(msg.cmd){
					case 'init': init();	break;
					default: init();
				}
			})
    }
  }
})()


document.addEventListener('DOMContentLoaded', function(){
  pageViewer.listen();
});
