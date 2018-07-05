;
(function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.startsWith("tube_message:")) {
            var data = JSON.parse(request.substring("tube_message:".length));
            var root = document.createElement('div');
            document.body.appendChild(root);
            root.classList.add("tube-qrcode-dialog-wrapper");
            root.innerHTML = `<div class='tube-qrcode-dialog'>
                                <div class='tube-qrcode-dialog-title'>Scan using Wechat</div>
                                <div id='tube-qrcode'></div>
                              </div>`;
            document.querySelector(".tube-qrcode-dialog").addEventListener("click", function (event) {
                event.stopPropagation();
            });
            var preventContextMenu = function (event) {
                event.preventDefault();
            }
            document.addEventListener('contextmenu', preventContextMenu);
            root.addEventListener("click", function (event) {
                document.body.removeChild(root);
                document.removeEventListener('contextmenu', preventContextMenu, false);
            }, false);
            if (data.url.startsWith("http")) {
                var qrcode = new QRCode(document.getElementById("tube-qrcode"), {
                    text: data.url,
                    width: 300,
                    height: 300,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                });
            } else {
                document.getElementById("tube-qrcode").innerHTML = "<div class='tube-qrcode-error'>This image type is not supported yet</div>";
            }
        }
    });
})();