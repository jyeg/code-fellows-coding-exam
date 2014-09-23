/*
 Generate a Backbone.js, Ember.js, AND/or Spine.js app that allows a user to create, edit, update, and destroy (delete) users. *
 Users should have first name, last name, and email address fields. First name is required. Email should be a valid email.
 If you breezed through this challenge, add extra features to this app (be creative) and tell us what you did so we don’t miss it.
 Please deploy this app live somewhere (e.g. a free Heroku account) so we can interact with it (be sure to enter the URL here).
 */
var Contact = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'email'
  }, 
  validate: function(attributes){
    if(attributes.firstName === undefined){
        return "Remember to set a first name for your contact.";
    }
    if(attributes.email.match(/@/)){

    }
  }
});

var ContactsCollection = Backbone.Collection.extend({
  model: Contact
});

var ContactView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
    }});


// renders the full list of  items calling TodoView for each one.
var AppView = Backbone.View.extend({
    el: '#todoapp',
    initialize: function () {
        this.input = this.$('#new-todo');
        // when new elements are added to the collection render then with addOne
        app.todoList.on('add', this.addOne, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
    },
    events: {
        'keypress #new-todo': 'createTodoOnEnter'
    },
    createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
            return;
        }
        app.todoList.create(this.newAttributes());
        this.input.val(''); // clean input box
    },
    addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
    },
    addAll: function(){
        this.$('#todo-list').html(''); // clean the list
        app.todoList.each(this.addOne, this);
    },
    newAttributes: function(){
        return {
            title: this.input.val().trim(),
            completed: false
        }
    },
    // Cache the template function for a single item.
    todoTpl: _.template( "<h3>Hello <%= who %><h3>" ),

    events: {
        'dblclick label': 'edit',
        'click .delete': 'destroy',
        'click .add':   'add'
    },

    edit: function() {
        // executed when todo label is double clicked
    },

    destroy: function() {
        // executed when todo loses focus
    },

    add: function( ) {

    }
});

//--------------
// Initializers
//--------------

var aappView = new AppView();

