define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    // 'slimscroll',
    'select2',
    'icheck',
    'flatpickr',
    'flatpickrRange'
], function ($, _, backbone, bootstrap,select2,icheck,flatpickr,rangePlugin) {
    var configView = Backbone.View.extend({
        el: '#js-form',
        initialize: function () {
            // $('body').slimscroll({
            //     height: '100%',
            //     color: '#3c8dbc'
            // });
            $('.select2').select2();
            $('#js-date-picker').flatpickr({
                // 是否显示时间
                enableTime: true,
                // 是否是24小时制
                time_24hr: true
            });
            $('.js-range').flatpickr({
                mode: 'range'
            });
            $('.js-sort-date').flatpickr({
                // 是否显示时间
                enableTime: false
            });
            $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass   : 'iradio_minimal-blue'
            })
        }
    });
    return configView;
});