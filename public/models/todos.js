var app = app || {}
app.TodosCollection = Backbone.Collection.extend({
    model: app.Todo,
    url: '/todos'
  });