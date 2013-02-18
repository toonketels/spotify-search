define(
  [
      'flight/component'
    , 'components/d3/d3'
    , '../data/countries'  
  ], 

  function(createComponent, d3, countryStore){


    return createComponent(CountriesGrid);


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

        var text = svg.selectAll('text')
          .data(data, function(d) { return d; });

        // Update...
        text.attr('class', 'update')
          .transition()
            .delay(400)
            .duration(500)
            .attr('x', function(d, i) { return (i % 6) * 30 })
              .attr('y', function(d, i) {
                return Math.floor(i / 6) * 20 
              });

        // Enter
        text.enter().append('text')
              .attr('class', 'enter')
              .attr('dy', '.15em')
              .attr('y', -20)
              .attr('x', function(d, i) { return (i % 6) * 30 })
              .text(function(d) { return d; })
            .transition()
              .delay(800)
              .duration(750)
              .attr('y', function(d, i) {
                return Math.floor(i / 6) * 20 
              });

        // Remove...
        text.exit()
            .attr('class', 'exit')
          .transition()
            .duration(500)
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

        svg = d3.select(this.node).append('svg')
            .attr('width', this.attr.width)
            .attr('height', this.attr.height)
          .append('g')
            .attr('transform', 'translate(10, 15)');

        // For the moment: dont display all countries
        // var countries = countryStore.getAllCodes();
        // this.updateChart(countries);
      };

    }

});