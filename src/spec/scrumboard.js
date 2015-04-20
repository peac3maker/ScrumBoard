// Model
(function() { 

  window.Todo = Backbone.Model.extend({
    defaults: {
      id: 0,
      title: '',
      state: "ToDo",
      cost: 0,
      responsible: ""
    },

    setState: function(newState){
      this.set({state: newState});
    }        

  });

  window.TodosCollection = Backbone.Collection.extend({
    model: Todo,
    url: '/todos'
  });

  window.todos = new TodosCollection();  

  window.TodoView = Backbone.View.extend({

    //tagName: 'li',

    template: _.template($('#item-template').html()),

    initialize: function(){      
    },

    destroy: function(){
      this.remove();
      this.unbind();
    },

    render: function () {        
      this.$el.html(this.template(this.model.toJSON())).draggable({    
    helper: "clone",
    cursor: "move",
    containment: "#content"
    });
      return this;
    }
  });

  window.TodoList = Backbone.View.extend({
    el: $('#ToDo'),
    views: [],

    render: function () {

    },

    initialize: function () {
      //this.listenTo(todos, 'reset', this.addAll);
      //todos.bind('sync', this.addAll, this);
      $("#content").show();         
      todos.fetch({reset: true});   
      this.listenTo( todos, 'reset', this.addAll);      
      //todos.fetch({data:{fetch:true, type:"get", page:1}});
    },

    addItem: function (item) {
      var todoView = new TodoView({ model: item });
      this.views.push(todoView);
      //this.$el.append(todoView.render().el);  
      console.log(item.get("state"));    
      $('#'+item.get("state")).append(todoView.render().el);
    },

    remove: function(){
      for(var i = 0; i< this.views.length; i++){
        this.views[i].destroy();
      }
      this.views = []; 
    },

    addAll: function() { 
      for(var i = 0; i< this.views.length; i++){
        this.views[i].destroy();
      }
      $("#ToDo").empty();
      $("#InProc").empty();
      $("#Done").empty();
      this.views = [];             
      todos.each(this.addItem, this);
    }
  });

  //var todoList = new TodoList;

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
      var todo = todos.get(todoid);
      console.log(todo);
      todo.setState(newState);
      todo.save({}, {url:'/todos/'+todo.get('id'), type: 'PUT'});
      todos.set({todo},{remove: false})
      todos.fetch({reset: true});  
      $(event.target).append(ui.draggable);
    }
    $("div").disableSelection();
  });

  window.CreateView = Backbone.View.extend({

    //tagName: 'li',

    template: _.template($('#create-template').html()),

    className: 'edit',

    events:{
     "click #add-todo":"addToDo"
    },

    initialize: function(){
      $("#content").hide();
    },

    addToDo:function(e){
        e.preventDefault();

        var newtitle = this.$el.find("#title").val();
        var newstate = this.$el.find("#state").val();
        var newcost = this.$el.find("#cost").val();
        var newresponsible = this.$el.find("#responsible").val();
        var todoModel = new Todo({title:newtitle,state:newstate, cost: newcost, responsible: newresponsible}); 
        todoModel.save({}, {url:'/todos/', type: 'POST'});                 
        app.navigate("", {trigger: true});
    },      

    render: function () { 
      this.$el.html(this.template());
      return this;
    }
  });

  window.Router = Backbone.Router.extend({
    routes : {
      "" : "scrumboard",
      "create" : "create"
    },
    scrumboard : function() {
      this.loadView(new TodoList());
    },
    create : function() {
      this.loadView(new CreateView());
      $("#create").html(this.view.render().el);
    },

    loadView : function(view) {
      this.view && this.view.remove();
      this.view = view;
    }
  }); 

  var app = new Router();
  Backbone.history.start();
}());

