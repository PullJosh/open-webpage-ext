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
        window.open(url,'_blank');
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
