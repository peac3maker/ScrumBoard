describe('About Backbone.View', function() {
    var todoView;

    beforeEach(function() {
        $('body').append('<div id="ToDo"></div>');
        $('body').append('<div id="InProc"></div>');
        $('body').append('<div id="Done"></div>');
        todoView = new TodoView({ model: new Todo({ id:1, title: 'test',
      state: "ToDo",
      cost: 1,
      responsible: "Luca Selinger" })}); 
    });

    afterEach(function() {
        todoView.remove();
        $('#ToDo').remove();
        $('#InProc').remove();
        $('#Done').remove();
    });

    it('Should be tied to a DOM element when created, based off the property provided.', function() {
        expect(todoView.el.tagName.toLowerCase()).toBe('div');
    });

    it('Is backed by a model instance, which provides the data.', function() {
        expect(todoView.model).toBeDefined();
        expect(todoView.model.get('done')).toBe(false);
    });
});