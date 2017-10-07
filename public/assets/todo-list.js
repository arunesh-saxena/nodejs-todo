$(document).ready(function(){

  $('form').on('submit', function(e){
    e.preventDefault();
      var item = $('form input');
      var todo = {
        id:4,
        isCompleted: false,
        isDeleted: false,
        name: item.val()
      };

      $.ajax({
        type: 'POST',
        url: '/api/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text();
      $.ajax({
        type: 'DELETE',
        url: '/api/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          // location.reload();
        }
      });
  });

});
