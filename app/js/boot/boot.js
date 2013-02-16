define(
  [
      'flight/component'
    , '../ui/search-form'
  ], 

  function(
      createComponent
    , SearchForm
  ) {
    
    return createComponent(Boot);

    function Boot() {
      
      this.after('initialize', function(){
        
        SearchForm.attachTo('.search-form');

      });




    }
    

});