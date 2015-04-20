var app = app || {}
app.TodoList = Backbone.View.extend({
  el: $('#ToDo'),
  views: [],

  render: function () {

  },

  initialize: function () {
    //this.listenTo(todos, 'reset', this.addAll);
    //todos.bind('sync', this.addAll, this);
    $("#content").show();         
    app.todos.fetch({reset: true});   
    this.listenTo( app.todos, 'reset', this.addAll);      
    //todos.fetch({data:{fetch:true, type:"get", page:1}});
  },

  addItem: function (item) {
    var todoView = new app.TodoView({ model: item });
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
    app.todos.each(this.addItem, this);
  }
});