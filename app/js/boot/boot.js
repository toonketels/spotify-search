define(
  [
      'flight/component'
    , '../ui/search-form'
    , '../data/search-spotify'
    , '../data/data'
    , '../ui/display-tracks-results'
    , '../ui/display-detail'
    , '../visualization/geo'
    , '../visualization/countries-grid'
  ], 

  function(
      createComponent
    , SearchForm
    , SearchSpotify
    , DataStore
    , DisplayTracksResults
    , DisplayDetail
    , Geo
    , CountriesGrid
  ) {
    
    return createComponent(Boot);

    function Boot() {
      
      this.after('initialize', function(){
        
        SearchForm.attachTo('.search-form');
        SearchSpotify.attachTo(document);
        DataStore.attachTo(document);
        DisplayTracksResults.attachTo('.search-results');
        DisplayDetail.attachTo('.data-summary');
        Geo.attachTo('.visualization');
        CountriesGrid.attachTo('.data-summary-countries-grid');


      });




    }
    

});