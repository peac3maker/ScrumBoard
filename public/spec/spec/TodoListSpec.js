describe('About Backbone.View', function() {
    var todoView;

    it("todo is defined in app namespace", function() {
        expect(app.Todo).toBeDefined();
    });

    it("todos is defined in app namespace", function() {
        expect(app.TodosCollection).toBeDefined();
    });

    it("is a collection of TodosCollection, save called", function() {
        var spy = spyOn(Backbone.Model.prototype, 'save');
        expect(new app.TodosCollection().create({}) instanceof app.Todo).toBe(true)
        expect(spy).toHaveBeenCalled();
    });
    it("new Todo creates a POST REST API call", function() {
        var spy = spyOn(Backbone.Model.prototype, 'save');
        new app.TodosCollection().create({});
        expect(spy).toHaveBeenCalled();

    });

    it("delete-Method makes a Delete REST API call", function() {        
        var spy = spyOn(Backbone.Model.prototype, 'destroy');
        var todo=  new app.Todo();
        var todoview=new app.TodoView({model:todo});
        todoview.parent={};
        todoview.parent.initialize=function(){};
        todoview.deleteSelf();
        expect(spy).toHaveBeenCalled();    
    });
});