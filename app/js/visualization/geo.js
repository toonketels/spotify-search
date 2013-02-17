/**
 * @see: https://github.com/mbostock/d3/wiki/Geo-Paths
 */
define(
  [
      'flight/component'
    , 'components/d3/d3'
  ],
  function(createComponent, d3){


    return createComponent(Geo);


    function Geo() {

      var svg, drag, projection, countryMapping, countries;


      /**
       * Perform setup:
       *
       * Load data, display initial map and
       * update map when searchResultDetailRequestedAugmented is triggered.
       */
      this.after('initialize', function(){
        this.setUpCountries();
        this.setUpMap();
        this.setUpDrag();
        this.displayMap();

        this.on(document, 'searchResultDetailRequestedAugmented', this.highLightCountries);
      });


      /**
       * Default attributes.
       */
      this.defaultAttrs({
          'width': 600
        , 'height': 600
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


      /**
       * Set up map.
       */
      this.setUpMap = function(){

        // Our canvas...
        svg = d3.select('.visualization').append('svg')
             .attr('width', this.attr.width)
             .attr('height', this.attr.height);

        // Set projection.
        projection = d3.geo.orthographic()
          .scale(290)
          .translate([this.attr.width/2,this.attr.height/2])
          .clipAngle(90);

        // New geographic path generator.
        // Path defaults to albersUsa but we need the orthographic.
        path = d3.geo.path()
          .projection(projection);
      }


      /**
       * Sets map dragbehavior.
       */
      this.setUpDrag = function() {

        // Define drag behavior...
        drag = d3.behavior.drag()
          .origin(Object)
          .on('drag', dragMove);

        // Rotate the sphere while dragging...
        function dragMove() {
          rotation = projection.rotate();
          projection.rotate([rotation[0] + d3.event.dx, rotation[1] - d3.event.dy]);
          svg.selectAll("path").attr("d", path);
        }

        // A background element to catch the drag behavior...
        var rect = svg.selectAll('.drag-surface')
            .data([{x: 0, y:0}])
          .enter().append('rect')
            .attr('class', 'drag-surface')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.attr.width)
            .attr('height', this.attr.height)
            .call(drag);
      }


      /**
       * Actually display map.
       */
      this.displayMap = function() {
        
        var self = this;

         d3.json('app/assets/countries.json', function(error, data){
            console.log(data);
  
            // Position globe...
            projection.rotate([0, -50]);
  
            // Draw the countries
            countries = svg.selectAll('.country')
                .data(data.features)
              .enter()
                .append('path')
                .attr('class', function(data, index) { 
                  return 'country '+data.id+' '+data.properties.name; 
                })
                .attr('id', function(d, i) { return d.id })
                .attr('d', path)
                .style('fill', '#333')
                .call(drag);
  
            // Add behavior
            countries
              .on('mouseover', hoverAction)
              .on('mouseout', stopHoverAction)
              .on('click', function(event, data) {
                  // Trigger a custom event.
                  self.trigger('countryClicked', {obj: event});
              });

            function hoverAction(data, index) {
              d3.select(countries[0][index])
                .transition()
                .style('fill', 'red');
            }
  
            function stopHoverAction(data, index) {
              d3.select(countries[0][index]).transition().style('fill', '#333');            
            }
          });
      } 
    }
});