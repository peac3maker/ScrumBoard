var app = app || {}
app.CreateView = Backbone.View.extend({

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
        var todoModel = new app.Todo({title:newtitle,state:newstate, cost: newcost, responsible: newresponsible}); 
        todoModel.save({}, {url:'/todos/', type: 'POST'});                 
        app.router.navigate("", {trigger: true});
    },      

    render: function () { 
      this.$el.html(this.template());
      return this;
    }
  });