define(
  [
      'flight/component'
    , 'components/d3/d3'
  ],
  function(createComponent, d3){


    return createComponent(MapHover);


    function MapHover() {

      var countries;

      this.after('initialize', function(){
        this.setUp();
      });


      this.setUp = function(){

        countries = d3.selectAll('.country')
          .on('mouseover', this.hoverAction)
          .on('mouseout', this.stopHoverAction);
      }


      this.hoverAction = function(data, index) {
         d3.select(countries[0][index])
           .transition()
           .style('fill', 'red');
      }


      this.stopHoverAction = function(data, index) {
        d3.select(countries[0][index]).filter('.is-highlighted').transition().style('fill', 'green');            
        d3.select(countries[0][index]).filter(':not(.is-highlighted)').transition().style('fill', '#333'); 
      }
    }
});