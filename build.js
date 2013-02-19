({
    baseUrl: ".",
    paths: {
        'jquery': 'components/jquery/jquery'
      , 'es5shim': 'components/es5-shim/es5-shim'
      , 'es5sham': 'components/es5-shim/es5-sham'
    },
    shim: {
        'components/flight/lib/index': {
            deps: ['jquery', 'es5shim', 'es5sham']
        }
      , 'app/js/boot/boot': {
            deps: ['components/flight/lib/index']
        }
      , 'components/d3/d3': {
            exports: 'd3'
        }
    },
    map: {
        '*': {
            'flight/component': 'components/flight/lib/component'
        }
    },
    name: "app/js/main_2",
    out: "app/js/build/main-build.js",
    optimize: "uglify2",
    generateSourceMaps: false,
    preserveLicenseComments: true
})