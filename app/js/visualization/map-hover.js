define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
    , '../mixins/with-global-config'
  ],
  function(createComponent, d3, countryMapping, withGlobalConfig){


    return createComponent(MapHover, withGlobalConfig);


    function MapHover() {

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
        return (data.type === 'country') ? '#'+data.id : '#'+countryMapping.convertCode(data.id);
      }


      this.hoverAction = function(event, data) {
//         d3.select(this.getSelector(data))
//           .transition()
//           .style('fill', this.colors.highlight.lightest);

        d3.select(this.getSelector(data)).filter('.is-highlighted')
          .transition()
          .style('fill', this.colors.highlight.regular);            
        
        d3.select(this.getSelector(data)).filter(':not(.is-highlighted)')
          .transition()
          .style('fill', '#444'); 
      }


      this.hoverActionStop = function(event, data) {
        var selector = this.getSelector(data);

        d3.select(selector).filter('.is-highlighted').transition().style('fill', this.colors.highlight.darker);            
        d3.select(selector).filter(':not(.is-highlighted)').transition().style('fill', '#000'); 
      }
    }
});