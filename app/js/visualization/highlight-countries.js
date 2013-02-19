define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
    , '../mixins/with-global-config'
  ],
  function(createComponent, d3, countryStore, withGlobalConfig) {


    return createComponent(HighlightCountries, withGlobalConfig);


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
            //.filter(':not('+availability+')')
            //filter(':not(.is-highlighted)
            .classed('is-highlighted', false)
            .transition()
              .style('fill', '#000');
          
          // And highlight current selection.
          d3.selectAll(availability)
            .classed('is-highlighted', true)
            .transition()
              .duration(50)
              .style('fill', this.colors.highlight.regular)
            .transition()
              .duration(500)
              .style('fill', this.colors.highlight.darker);
        }
      }

    }

  });