define(
  [
    'flight/component'
  ], 

  function(createComponent){
    
    return createComponent(SearchSpotify);

    function SearchSpotify() {

      /**
       * Initiazition.
       *
       * Listen for performSearch event.
       */
      this.after('initialize', function() {
        this.on('performSearch', this.searchSpotify);
      })

      /**
       * Searches spotify for artists, tracks and albums.
       */
      this.searchSpotify = function(event, data) {
        $.ajax('http://ws.spotify.com/search/1/track.json?q='+data.searchPhrase, {context: this})
          .done(function(data) {
            this.evaluateTrackResults(data);
          });        
      }

      /**
       * Emit search results event for tracks.
       */
      this.evaluateTrackResults = function(data) {
        var result;

        if(data.info.num_results === 0) {
          this.trigger('noSearchResultsFound', { type: 'track', query: data.info.query });
        } else {
          result = { type: 'track', query: data.info.query, results: data.tracks };
          this.trigger('searchResultsFound', result);
          this.trigger('searchTrackResultsFound', result);
        }        
      }
    }
});