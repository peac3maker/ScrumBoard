describe("Todo", function() {
  it("is defined in app namespace", function() {
    expect(app.Todo).toBeDefined();
  });

  describe("default attributes", function() {
    it("has an empty title attribute", function() {
      todo = new app.Todo();
      expect(todo.get('title')).toBe('');
    });
    it("has a false completed attribute", function() {
      todo = new app.Todo();
      expect(todo.get('completed')).toBe(false);
    });
  });

  describe("business logic", function() {
    it("toggle() inverts the 'completed' value", function() {
      todos = new app.TodoList();
      todo = todos.create({});
      expect(todo.get('completed')).toBe(false);
      todo.toggle();
      expect(todo.get('completed')).toBe(true);
      todo.toggle();
      expect(todo.get('completed')).toBe(false);
    });
  });
});
