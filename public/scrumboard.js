var app = app || {}


// Model

  app.todos = new app.TodosCollection();  

  var Router = Backbone.Router.extend({
    routes : {
      "" : "scrumboard",
      "create" : "create"
    },
    scrumboard : function() {
      this.loadView(new app.TodoList());
    },
    create : function() {
      this.loadView(new app.CreateView());
      $("#create").html(this.view.render().el);
    },

    loadView : function(view) {
      this.view && this.view.remove();
      this.view = view;
    }
  }); 

  $(function() {    
    $(".droppable").droppable( {      
      hoverClass: 'hovered',
      drop: handleCardDrop
    });

    function handleCardDrop( event, ui ) {
      console.log('yay');
      console.log($(event.target));
      var newState = $(event.target).attr('id');      
      console.log(newState);
      var todoid = $(ui.draggable).find(".id").val();
      console.log(todoid);
      var todo = app.todos.get(todoid);
      console.log(todo);
      todo.setState(newState);
      todo.save({}, {url:'/todos/'+todo.get('id'), type: 'PUT'});
      app.todos.set({todo},{remove: false})
      app.todos.fetch({reset: true});  
      $(event.target).append(ui.draggable);
    }
    $("div").disableSelection();
  });

  app.router = new Router();
  Backbone.history.start();


