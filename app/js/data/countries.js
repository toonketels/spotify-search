define(
  [
    'components/d3/d3'
  ],
  function(d3) {

    var countryMapping;

    /**
     * Loads the countries mapping.
     *
     * Nota: we do this early an expect the csv to be loaded
     * as soon as we start making call. This is however not guaranteed.
     * ToDo: ensure this is sepup before we make calls.
     */
    d3.csv('app/assets/wikipedia-iso-country-codes.csv', function(er, d) {
      countryMapping = d;
    }); 


    var getAlpha3CodeFor = function(alpha2Code) {
        for (var i = 0, len = countryMapping.length; i < len; i++) {
          if(countryMapping[i]['Alpha-2 code'] === alpha2Code) return countryMapping[i]['Alpha-3 code'];
        }
      }

    var getAlpha2Codefor = function(alpha3Code) {
        for (var i = 0, len = countryMappin.length; i < len; i++) {
          if(countryMapping[i]['Alpha-3 code'] === alpha3Code) return countryMapping[i]['Alpha-2 code'];
        }
      }


    return {
        'getAlpha3CodeFor': getAlpha3CodeFor
      , 'getAlpha2Codefor': getAlpha2Codefor
    }

  });