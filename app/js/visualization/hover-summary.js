define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
  ],
  function(createComponent, d3, countryMapping){


    return createComponent(HoverSummary);


    function HoverSummary() {

      /**
       * Initialization. Bind to hover events.
       */
      this.after('initialize', function(){
        this.on(document, 'countryHover', this.hoverAction);
        this.on(document, 'countryHoverStop', this.hoverActionStop);
      });


      this.hoverAction = function(event, data) {
        var output = '<p>'+ countryMapping.getName(data.id) +'</p>';
        this.$node.html(output);
      }


      this.hoverActionStop = function(event, data) {
        this.$node.html('');
      }
    }
});