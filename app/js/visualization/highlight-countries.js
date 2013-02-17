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
      	this.on(document, 'searchResultDetailRequestedAugmented', this.highLightCountries);
      });


     /**
       * Will hightlight countries on the map.
       */
      this.highLightCountries = function(ev, d) {

        if(d.type === 'track') {

          // Create selector string from "US RU" => "#USA, #RUS"
          var availability = d.data.album.availability.territories
            .split(' ')
            .map(function(d) {
              return '#'+countryStore.getAlpha3CodeFor(d);
            }, this)
            .join(', ');

          // Reset previous selection and hightlight current...
          d3.selectAll('.country')
            .classed('is-hightlighed', false)
            .transition()
              .style('fill', '#333');
          
          d3.selectAll(availability)
            .classed('is-hightlighed', true)
            .transition()
              .style('fill', 'green');
        }
      }

    }

  });