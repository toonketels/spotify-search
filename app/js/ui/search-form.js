define(
  [
    'flight/component'
  ], 

  function(createComponent){
    
    return createComponent(SearchForm);

    function SearchForm() {

      this.after('initialize', function() {
        $(this.attr.searchFormButton).unbind('click');
        this.on('click', {
          searchFormButton: this.search
        });
      });

      this.defaultAttrs({
      	searchFormInput: '.search-form-input',
      	searchFormButton: '.search-form-btn'
      });

      this.search = function() {
      	var searchPhrase = this.select('searchFormInput').val();

      	this.trigger('performSearch', {
      	  searchPhrase: searchPhrase
      	});

      }

    }
});