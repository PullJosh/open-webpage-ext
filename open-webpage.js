(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
        owext_finished = undefined;
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    owext_finished = true; // Global var so fancy buttons can modify it

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.open_page = function(url, callback) {
        console.log("v6"); // To make sure caching isn't causing an issue
        if (owext_finished === false) callback(); // Don't attempt to open another page if there is already a dialog open
        
        url = String(url);
        var escaped_url = url.replace(/&/g, "&amp;")
                             .replace(/</g, "&lt;")
                             .replace(/>/g, "&gt;")
                             .replace(/"/g, "&quot;")
                             .replace(/'/g, "&#039;");
        var cssId = 'owext-styles';
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
            owext_finished = true;
            var elem = document.getElementById("owext-modal");
            elem.parentNode.removeChild(elem);
        }
        owext_finished = false;
        var popup_html = '<div class=owext-darken id=owext-modal><div class=owext-inner><div class=owext-url><div class=owext-tophalf><h2>Open this Webpage?</h2><div>This project wants to open</div><a style=color:#21b4f0!important;font-weight:700>' + escaped_url + '</a></div><div class=owext-bottomhalf><a style=background:#BBBDC0 onclick=close_owext_modal()>Exit</a> <a style=background:#21b4f0 onclick=\'close_owext_modal(),window.open("' + escaped_url + '","_blank")\'>Open</a></div></div></div></div>';
        $("body").append(popup_html); // Is jquery safe to use?
        
        var checkLoop = function() {
            window.setTimeout(function() {
                if(owext_finished) {
                    callback();
                } else {
                    checkLoop();
                }
            }, 60);
        }
        checkLoop();
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
