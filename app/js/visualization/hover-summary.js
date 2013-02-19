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
        var output = '<h3>Country</h3>';
        output += '<p><span class"secondary label">'+ countryMapping.getName(data.id) +'</span></p>';
        this.$node.html(output);
      }


      this.hoverActionStop = function(event, data) {
        var output = '<h3>Country</h3>';
        this.$node.html(output);
      }
    }
});