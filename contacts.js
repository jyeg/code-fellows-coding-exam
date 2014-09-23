/*
 Generate a Backbone.js, Ember.js, AND/or Spine.js app that allows a user to create, edit, update, and destroy (delete) users. *
 Users should have first name, last name, and email address fields. First name is required. Email should be a valid email.
 If you breezed through this challenge, add extra features to this app (be creative) and tell us what you did so we don’t miss it.
 Please deploy this app live somewhere (e.g. a free Heroku account) so we can interact with it (be sure to enter the URL here).
 */
'use strict';

(function ($) {

    var contacts = [
        { firstName: "Test", lastName: "User", email: "sample@gmail.com" }
    ];



var app = {}; // create namespace for our app

app.Contact = Backbone.Model.extend({
  // Default attribute values
  defaults: {
    firstName: '',
    lastName: '',
    email: ''
  },
  validate: function(attributes){
    var errors = [];
    if(!attributes.firstName){
        //errors.push({name: 'firstName', message: 'Remember to set a first name for your contact.'});
        errors.push('Remember to set a first name for your contact.');
    }
     var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;

      if(!re.test(attributes.email)){
        errors.push("Email format invalid.");
    }
    return errors.length > 0 ? errors : false;
  }
});

app.ContactsCollection = Backbone.Collection.extend({
  model: app.Contact,
  localStorage: new Store("backbone-todo")
});

app.contactsList = new app.ContactsCollection();


app.ContactView = Backbone.View.extend({
    tagName: 'li',
    template: $('#item-template').html(),
    render: function(){
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },
    initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
    },
    events: {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'click .save': 'close',
        'click .destroy': 'destroy'

    },
    edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
    },
    close: function(){
        //e.preventDefault();
        var first = this.input[0].value.trim();
        var last = this.input[1].value.trim();
        var emailVal = this.input[2].value.trim();
//
//
        var formData =  {firstName: first, lastName: last, email:emailVal },
            prev = this.model.previousAttributes();
        var one = new app.Contact(formData);
        if(one.isValid()) {
            this.model.set(formData);
            this.render();
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, prev)) {
                    contacts.splice(_.indexOf(contacts, contact), 1, formData);
                }
            });
            this.$el.removeClass('editing');
        }
        else
        {
            alert(one.validationError);
        }
    },
    updateOnEnter: function(e){
        if(e.which == 13){
            this.close();
        }
    },
    destroy: function(){
        this.model.destroy();
    }
});


// renders the full list of  items calling TodoView for each one.
app.AppView = Backbone.View.extend({
    el: '#todoapp',
    initialize: function () {
        this.collection = new app.ContactsCollection(contacts);
        this.render();
        this.collection.on("add", this.renderContact, this);
    },

    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },

    renderContact: function (item) {
        var contactView = new app.ContactView({
            model: item
        });
        $('#todo-list').append(contactView.render().el);
    },
    events: {
        "click #add": "addContact"

    },
    //add a new contact
    addContact: function (e) {
        e.preventDefault();


        var formData = {};
        $("#header").children("input").each(function (i, el) {
            if ($(el).val() !== "") {
                formData[el.id] = $(el).val();
                $(el).val('');
            }
        });

        //update data store
        contacts.push(formData);

        //re-render select if new type is unknown
        this.collection.add(new app.Contact(formData));
    }
});

//--------------
// Initializers
//--------------
app.appView = new app.AppView();

} (jQuery));