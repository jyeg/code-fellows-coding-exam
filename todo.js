/*
Make a simple html page that uses jQuery to 
manage Todos * It should have an input field. 
When the user enters text in the input field,
 show that input in the page. When an existing 
 item is clicked, it should disappear from the 
 page. In addition to pushing the answer to 
 your Github account, please also setup a 
 http://jsfiddle.net/ with the solution and 
 enter the saved URL here so we can take a look.
*/

$(document).ready(function() {
  $('#todoList li').click(function(event) {
    event.preventDefault();
    $(this).hide("slow");
    $(this).remove();
  });

  $('#inputBox').keyup(function(event) {
    event.preventDefault();
    if (e.which == 13) {
	    var task = $(this).val();
	    $('#todoList').append('<li>'+task+'</li>');
	    $(this).val('');
	}
  });
});