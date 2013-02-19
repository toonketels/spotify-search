define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'
    , './grid-hover'
    , '../mixins/with-country-events'
    , '../mixins/with-global-config'
  ], 

  function(createComponent, d3, countryStore, GridHover, withCountryEvents, withGlobalConfig){


    return createComponent(CountriesGrid, withCountryEvents, withGlobalConfig);


    function CountriesGrid() {

      var svg;

  
      /**
       * Initialization, listen for events.
       */
      this.after('initialize', function() {

        // UGLY - we need to wait before csv is loaed.
        // @todo ; fix this
        this.drawChart();

        this.on(document, 'searchResultDetailRequestedAugmented', this._updateChart);
      });


      this.defaultAttrs({
          'width': 185
        , 'height': 1300
      });


      /**
       * Helper to update the chart based on
       * event data.
       */
      this._updateChart = function(ev, d) {
        this.updateChart(d.data.album.availability.territories.split(' '));
      }


      /**
       * Updates the chart data, animated.
       */    
      this.updateChart = function(data) {

        var self = this;

        var text = svg.selectAll('text')
          .data(data, function(d) { return d; });

        // Update...
        text.attr('class', 'update code')
          .style('fill', this.colors.highlight.darker)
          .transition()
            .delay(400)
            .duration(500)
            .attr('x', function(d, i) { return (i % 6) * 30 })
              .attr('y', function(d, i) {
                return Math.floor(i / 6) * 20 
              });

        // Enter
        text.enter().append('text')
              .attr('id', function(d, i) { return d })
              .attr('class', 'enter code')
              .attr('dy', '.15em')
              .attr('y', -20)
              .attr('x', function(d, i) { return (i % 6) * 30 })
              .text(function(d) { return d; })
              .style('fill', self.colors.highlight.regular)
            .transition()
              .delay(800)
              .duration(750)
              .attr('y', function(d, i) {
                return Math.floor(i / 6) * 20 
              })
              .style('fill', self.colors.highlight.darker);

        // Trigger events (via mixin).
        // We expect the data String passed by d3 to be
        // the ID (like US).
        self.emitCustomCountryEvents(text, 'code');

        // Remove...
        text.exit()
            .attr('class', 'exit code')
            .style('fill', '#000')
          .transition()
            .duration(1400)
            .attr('x', 220)
            .remove();
      }

      
      /**
       * Setup chart.
       *
       * Note: 245 countries
       */
      this.drawChart = function() {

        var self = this;

        this.$node.append('<h3>availability</h3>');

        svg = d3.select(this.node).append('svg')
            .attr('width', this.attr.width)
            .attr('height', this.attr.height)
          .append('g')
            .attr('transform', 'translate(10, 15)');

        // Attach behaviors
        GridHover.attachTo(self.$node);

        // For the moment: dont display all countries
        // var countries = countryStore.getAllCodes();
        // this.updateChart(countries);
      };

    }

});