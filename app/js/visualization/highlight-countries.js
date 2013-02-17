define(
  [
      'flight/component'
    , 'components/d3/d3'
  ],
  function(createComponent, d3) {

    return createComponent(HighlightCountries);

    function HighlightCountries() {

      var countryMapping;

      this.after('initialize', function() {
        this.setUpCountries();
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
              return '#'+this.getAlpha3CodeFor(d);
            }, this)
            .join(', ');

          // Reset previous selection and hightlight current...
          d3.selectAll('.country').transition().style('fill', '#333');
          d3.selectAll(availability).transition().style('fill', 'green');
        }
      }


      /**
       * Loads the countries mapping.
       *
       * Nota: we do this early an expect the csv to be loaded
       * as soon as we start making call. This is however not guaranteed.
       * ToDo: ensure this is sepup before we make calls.
       */
      this.setUpCountries = function() {
        d3.csv('app/assets/wikipedia-iso-country-codes.csv', function(er, d) {
          countryMapping = d;
        }); 
      }

      this.getAlpha3CodeFor = function(alpha2Code) {
        for (var i = 0, len = countryMapping.length; i < len; i++) {
          if(countryMapping[i]['Alpha-2 code'] === alpha2Code) return countryMapping[i]['Alpha-3 code'];
        }
      }

      this.getAlpha2Codefor = function(alpha3Code) {
        for (var i = 0, len = countryMappin.length; i < len; i++) {
          if(countryMapping[i]['Alpha-3 code'] === alpha3Code) return countryMapping[i]['Alpha-2 code'];
        }
      }


    }

  });