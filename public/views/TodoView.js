var app = app || {}
app.TodoView = Backbone.View.extend({

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