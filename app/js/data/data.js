define(
  [
    'flight/component'
  ],
  function(createComponent){

    return createComponent(DataStore);


    function DataStore() {

      var store = {};

      /**
       * Initialization, start listening for events.
       */
      this.after('initialize', function() {
        this.on('searchResultsFound', this.storeSearchResults);
        this.on('searchResultDetailRequested', this.getData);
      });

      /**
       * Replaces existing data with new searched data.
       */
      this.storeSearchResults = function(event, data) {
        // Reset store
        store[data.type] = {};

      	data.results.forEach(function(value, index, results){
          store[data.type][value.href] = value;
      	});;

      }

      this.getData = function(event, data) {

        // @todo: make sure we have a result.
        data.data = store[data.type][data.spotifyUri];

        this.trigger('searchResultDetailRequestedAugmented', data);
      }
    }

});