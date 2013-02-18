define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
  ],
  function(createComponent, d3, countryStore) {


    return createComponent(HighlightCountries);


    function HighlightCountries() {

      this.after('initialize', function() {
      	this.on(document, 'searchResultDetailRequestedAugmented', this.highlightCountries);
      });


     /**
       * Will hightlight countries on the map.
       */
      this.highlightCountries = function(ev, d) {

        if(d.type === 'track') {

          // Create selector string from "US RU" => "#USA, #RUS"
          var availability = d.data.album.availability.territories
            .split(' ')
            .map(function(d) {
              return '#'+countryStore.getAlpha3CodeFor(d);
            }, this)
            .join(', ');

          // Reset previous selection...
          d3.selectAll('.country')
            .classed('is-highlighted', false)
            .transition()
              .style('fill', '#333');
          
          // And highlight current selection.
          d3.selectAll(availability)
            .classed('is-highlighted', true)
            .transition()
              .style('fill', 'green');
        }
      }

    }

  });