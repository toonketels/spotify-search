define(
  [
      'flight/component'
    , '../ui/search-form'
    , '../data/search-spotify'
  ], 

  function(
      createComponent
    , SearchForm
    , SearchSpotify
  ) {
    
    return createComponent(Boot);

    function Boot() {
      
      this.after('initialize', function(){
        
        SearchForm.attachTo('.search-form');
        SearchSpotify.attachTo(document);
        
      });




    }
    

});