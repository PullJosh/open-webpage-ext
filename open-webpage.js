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
        var cssId = 'owext-styles';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = 'http://joshuapullen.com/open-webpage-ext/open-webpage.css';
            link.media = 'all';
            head.appendChild(link);
        }
        close_owext_modal = function() {
            var elem = document.getElementById("owext-modal");
            elem.parentNode.removeChild(elem);
        }
        var popup_html = '<div class=owext-darken id=owext-modal><div class=owext-inner><div class=owext-url><div class=owext-tophalf><h2>Open this Webpage?</h2><div>The project wants to open</div><a style=color:#21b4f0!important;font-weight:700>' + escaped_url + '</a></div><div class=owext-bottomhalf><a style=background:#BBBDC0 onclick=close_owext_modal()>Exit</a> <a style=background:#21b4f0 onclick=\'close_owext_modal(),window.open("' + escaped_url + '","_blank")\'>Open</a></div></div></div></div>';
        console.log(popup_html);
        
        var dummyElem = document.createElement('div');
        dummyElem.innerHTML = popup_html;
        var popup_elem = dummyElem.childNodes;
        
        console.log(pupup_elem);
        document.body.appendChild(popup_elem);
        
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
