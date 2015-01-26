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
            '' : 'home'
        },

        home: function(){
            console.log('home!');
            // Call render
            eventsView.render();
        }
    });

    // Event Model
    var Event = Parse.Object.extend({
        className: 'Evento',
    });

    // Event Collection
    var Events = Parse.Collection.extend({
        model: Event,
        query: (new Parse.Query(Event))
    });

    // Event View
    var EventsView = Parse.View.extend({
        // Container element
        el: '#event-app',

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
        }
    });

    // Instances
    var router = new Router();
    var eventsView = new EventsView();

    // Start Backbone
    Backbone.history.start();
});
