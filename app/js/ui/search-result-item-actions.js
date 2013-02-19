define(
  [
    'flight/component'
  ], 

  function(createComponent){


    return createComponent(SearchResultItemAction);


    function SearchResultItemAction() {

      /**
       * Initialization, listen for events.
       */
      this.after('initialize', function() {
        this.on('click', this.clickAction);
      });


      /**
       * Display the artists results.
       */
      this.clickAction = function(event, data) {
        console.log(event);
        console.log();

        $('.search-result-item').removeClass('selected');
        $('[data-spotifyuri="'+event.target.attributes['data-spotifyuri'].value+'"]').addClass('selected');

      	this.trigger('searchResultDetailRequested', {
          type: event.target.attributes['data-type'].value,
          spotifyUri: event.target.attributes['data-spotifyuri'].value
        });
      }
    }

});