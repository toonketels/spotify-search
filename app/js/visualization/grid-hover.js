define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
    , '../mixins/with-global-config'
  ],
  function(createComponent, d3, countryMapping, withGlobalConfig){


    return createComponent(GridHover, withGlobalConfig);


    function GridHover() {

      /**
       * Initialization. Bind to hover events.
       */
      this.after('initialize', function(){
        this.on(document, 'countryHover', this.hoverAction);
        this.on(document, 'countryHoverStop', this.hoverActionStop);
      });


      /**
       * Helper to get the selector depending 
       * on the type that emitted the event.
       *
       * code: #RU
       * country: #RUS
       */
      this.getSelector = function(data) {
        return (data.type === 'code') ? '#'+data.id : '#'+countryMapping.convertCode(data.id);
      }


      this.hoverAction = function(event, data) {
        d3.select(this.getSelector(data))
          .transition()
          .style('fill', this.colors.highlight.regular);
      }


      this.hoverActionStop = function(event, data) {
        var selector = this.getSelector(data);

        d3.select(selector).transition().style('fill', this.colors.highlight.darker);            
      }
    }
});