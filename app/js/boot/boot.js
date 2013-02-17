define(
  [
      'flight/component'
    , '../ui/search-form'
    , '../data/search-spotify'
    , '../ui/display-tracks-results'
  ], 

  function(
      createComponent
    , SearchForm
    , SearchSpotify
    , DisplayTracksResults
  ) {
    
    return createComponent(Boot);

    function Boot() {
      
      this.after('initialize', function(){
        
        SearchForm.attachTo('.search-form');
        SearchSpotify.attachTo(document);
        DisplayTracksResults.attachTo('.search-results');

      });




    }
    

});