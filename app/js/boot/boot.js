define(
  [
      'flight/component'
  ], 

  function(
      createComponent
  ) {
    
    return createComponent(Boot);

    function Boot() {
      this.after('initialize', function(){
        console.log('booted');
      });
    }
    

});