/*global SharePic, $*/


window.SharePic = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        Parse.initialize('ZYLdENOHmd9dQ3xSTPekEfsYID5u7sAuskGoqpiU', 'c8DO80VS0d5qjFd5N644eb9TaW5pTAu11ko411di');
    }
};

$(document).ready(function () {
    'use strict';
    SharePic.init();

    // Routes
    var Router = Backbone.Router.extend({
        routes: {
            '' : 'home',
            'event/:id' : 'event'
        },

        home: function(){
            console.log('home!');
            // Call render
            eventsView.render();
        },

        event: function(id){
            console.log('events! ' + id);
            photosView.render({id: id});
        }
    });

    // ---- MODELS ---- //

    // Event Model
    var Event = Parse.Object.extend({
        className: 'Evento'
    });

    // Photo Model
    var Photo = Parse.Object.extend({
        className: 'Photo'
    });

    // ---- COLLECTIONS ---- //

    // Event Collection
    var Events = Parse.Collection.extend({
        model: Event,
        query: (new Parse.Query(Event))
    });

    var Photos = Parse.Collection.extend({
        model: Photo,
        query: (new Parse.Query(Photo))
    });

    // ---- VIEWS ---- //

    // Event View
    var EventsView = Parse.View.extend({
        // Container element
        el: '#event-app',

        className: 'event',

        // Render function
        render: function(){
            var events = new Events(); // new object from collection
            var that = this; // to avoid scoping issues
            events.fetch({

                success: function(events){
                    console.log('got events!');
                    // Create underscore template and pass template jquery id, scope the object to only pass models
                    var template = _.template( $('#event-list').html(), { events : events.models } );
                    that.$el.html(template);
                },

                error: function(){
                    alert('Unable to retrieve data.');
                }

            });
        },

        events: {
            'click .event' : 'eventSelect'
        },

        eventSelect: function(){
            console.log('selected event!');
            var eventId = this.$('.event-id').val();
            this.showPhotos(eventId);
        },

        showPhotos: function(eventId){
            console.log(eventId)
        }

    });

    // Photo View
    var PhotosView = Parse.View.extend({
        // Container element
        el: '#event-app',

        className: 'event',

        // Render function
        render: function(options){
            var events = new Events(); // new object from collection
            var that = this; // to avoid scoping issues
            events.fetch({

                success: function(events){
                    console.log('got events!');

                    var query = new Parse.Query(Photo);
                    query.equalTo('eventId', options.id);
                    var collection = query.collection();
                    collection.fetch({

                        success: function(photos){
                            console.log('got photos!');
                            // Create underscore template and pass template jquery id, scope the object to only pass models
                            var template = _.template( $('#photo-event-list').html(), { photos : photos.models, events : events.models } );
                            that.$el.html(template);
                        },

                        error: function(){
                            alert('Unable to retrieve data.');
                        }

                    });
                },

                error: function(){
                    alert('Unable to retrieve data.');
                }

            });
        },

        events: {
            'click .event' : 'eventSelect'
        },

        eventSelect: function(){
            console.log('selected event!');
            var eventId = this.$('.event-id').val();
            this.showPhotos(eventId);
        },

        showPhotos: function(eventId){
            console.log(eventId)
        }

    });

    // Instances
    var router = new Router();
    var eventsView = new EventsView();
    var photosView = new PhotosView();

    // Start Backbone
    Backbone.history.start();
});
