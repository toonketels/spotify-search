define(
  [
    'flight/component',
    './search-result-item-actions'
  ], 

  function(createComponent, SearchResultItemActions){


    return createComponent(DisplayTracksResults);


    function DisplayTracksResults() {

      /**
       * Initialization, listen for events.
       */
      this.after('initialize', function() {
        this.on(document, 'searchTrackResultsFound', this.displayTracksResults);
      });


      /**
       * Display the artists results.
       */
      this.displayTracksResults = function(event, data) {
      	var result = data.results.map(function(track) {
      	  return '<li class="search-result-item track" data-spotifyuri="'+track.href+'" data-type="track">'+track.name+'</li>';
      	});
        
      	this.$node.html(result);

        // Attach behaviors to it.
        SearchResultItemActions.attachTo('.search-result-item.track');
      }
    }

});