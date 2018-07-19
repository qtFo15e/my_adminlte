define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'slimscroll',
    ], function ($, _, backbone, bootstrap, slimscroll) {
    var configView = Backbone.View.extend({
        el: '#js-index',
        initialize: function () {

              $('body').slimscroll({
                  height: '100%',
                  color: '#3c8dbc'
              })


        }
    });
    return configView;
});