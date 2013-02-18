/**
 * @file
 *
 * Specifies settings easily passed to multiple modules.
 * Require's config.config need to be passed to each module
 * individually...
 */
define(
  [], 
  
  function(){

    return function withGlobalConfig() {
      this.colors = {
        'highlight': {
            'lightest': '#5DC8CD'
          , 'lighter': '#34C6CD'
          , 'regular': '#01939A'
          , 'darker': '#1D7074'
          , 'darkest': '#006064' 
        }
      }
    }

  });