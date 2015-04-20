var app = app || {}
app.Todo = Backbone.Model.extend({
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