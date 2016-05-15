(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.open_page = function(url, callback) {
        url = String(url);
        var escaped_url = url.replace(/&/g, "&amp;")
                             .replace(/</g, "&lt;")
                             .replace(/>/g, "&gt;")
                             .replace(/"/g, "&quot;")
                             .replace(/'/g, "&#039;");
        console.log(url + " :: " + escaped_url);
        var hide_dialog_script = "document.getElementById('modal-template-warning').parentNode.removeChild(document.getElementById('modal-template-warning'));";
        var popup_html = '<dialog id="modal-template-warning" class="modal"><div class="modal-fade-screen visible"><div class="modal-inner"><dialog class="extension-url with-icon"><section><h2>Open this Webpage?</h2><p>The project wants to open</p><p><a style="color:#21b4f0 !important;">' + escaped_url + '</a></p></section><section><form class="input-plus-button url-load-form" style="text-align:center;"><a style="background-color:#BBBDC0;border-color:#BBBDC0;border-radius:5px!important;margin-right:5px;display: inline-block;float: none;cursor:pointer;color:white;padding:0.375em 1.5em;" onclick="' + hide_dialog_script + '">Exit</a><a style="border-radius:5px!important;margin-left:5px;display: inline-block;float: none;cursor:pointer;background:#21b4f0;color:white;padding:0.375em 1.5em;" onclick="' + hide_dialog_script + 'window.open(\'' + escaped_url + '\',\'_blank\');">Open</a></form></section></dialog></div></div></dialog>';
        document.body.innerHTML += popup_html;
        window.setTimeout(function() { // 10 second delay for testing only
            callback();
        }, 10000);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'open page at url %s', 'open_page', 'http://scratch.mit.edu/'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Open Webpage', descriptor, ext);
})({});
