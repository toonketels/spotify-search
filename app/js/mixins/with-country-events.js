/**
 * @file
 *
 * Mixin to trigger custom events on default d3 events.
 */
define(
  [], 
  
  function(){


      return withCountryEvents;


      function withCountryEvents() {


        /**
         * Start triggering custom events.
         *
         * @params
         *    svgElementCollection     - d3js selection of svg elements
         *                               to listen on events to trigger
         *                               our own.
         *    type (String)            - type of svgElement is triggered upon:
         *                               `code` or `country`.
         *    elementIdKey (String)    - Optional.
         *                               The key on the data object triggered by
         *                               default d3 data object representing the
         *                               elementID. If no key is provided, the data
         *                               "object" will be considered a string representing
         *                               the ID.
         *                               Summary: data "object" can be `{key: ID}` or `ID`.
         */
      	this.emitCustomCountryEvents = function(svgElementCollection, type, elementIdKey) {
      	 
      	  var self = this;

    	  // Start triggering custom events on
    	  // default d3 events.
          svgElementCollection
            .on('click', function(data, i) {
              self.trigger('countryClicked', {
                  'type': type
                , 'id': (elementIdKey) ? data[elementIdKey] : data
                , 'index': i
              });
            })
            .on('mouseover', function(data, i) {
              self.trigger('countryHover', {
                  'type': type
                , 'id': (elementIdKey) ? data[elementIdKey] : data
                , 'index': i
              })
            })
            .on('mouseout', function(data, i){
              self.trigger('countryHoverStop', {
                  'type': type
                , 'id': (elementIdKey) ? data[elementIdKey] : data
                , 'index': i
              })            
            });
      	}
      }


  });