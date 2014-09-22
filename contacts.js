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
    if(attributes.email.match(/@/))
  }
});

var ContactsCollection = Backbone.Collection.extend({
  model: Contact
});


var ContactView = Backbone.View.extend({

  tagName:  'li',

  // Cache the template function for a single item.
  todoTpl: _.template( "An example template" ),

  events: {
    'dblclick label': 'edit',
    'click .delete': 'destroy',
    'click .add':   'add'
  },

  initialize: function (options) {
    // In Backbone 1.1.0, if you want to access passed options in
    // your view, you will need to save them as follows:
    this.options = options || {};
  },

  // Re-render the title of the todo item.
  render: function() {
    this.$el.html( this.todoTpl( this.model.attributes ) );
    this.input = this.$('.edit');
    return this;
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

var contactsView = new ContactView();