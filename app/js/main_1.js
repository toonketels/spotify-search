require.config({
    urlArgs: "bust=" + (new Date()).getTime()
  , baseUrl: './'
  , paths: {
        'jquery': 'components/jquery/jquery'
      , 'es5shim': 'components/es5-shim/es5-shim'
      , 'es5sham': 'components/es5-shim/es5-sham'
    }
  , shim: {
        'components/flight/lib/index': {
            deps: ['jquery', 'es5shim', 'es5sham']
        }
      , 'app/js/boot/boot': {
            deps: ['components/flight/lib/index']
        }
      , 'components/d3/d3': {
            exports: 'd3'
        }
    }
  , map: {
        '*': {
            'flight/component': 'components/flight/lib/component'
        }
   }
});

require(
  [
    "components/flight/tools/debug/debug",
    "app/js/boot/boot"
  ],

  function(debug, Boot){
	
  	debug.enable(true);
    // Do booting in boot, so if we change
    // something, the bust will make the cache break.
  	Boot.attachTo(document);
});