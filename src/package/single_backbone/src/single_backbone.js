/**
 * Created by 迟猛 on 2017/11/8.
 */
define( [ "jquery", 'underscore', "backbone" ], function ($, _, Backbone) {

    var single_backbone = ( function (  ) {
        var viewMap = {}
        function single( args,View ) {
            var view
            var $el = $( args.el )
            var tempID = $el.data( "viewID" )
            var ID = tempID === undefined ?  _.uniqueId() : tempID
            var lastView =  viewMap[ ID ]

            if ( lastView !== undefined ) {
                $el.off()
                lastView.stopListening();
                view = viewMap[ ID ] = new View( args )
            } else {
                $el.data( "viewID", ID )
                view = viewMap [ ID ] = new View( args )
            }

            var dfd = $.Deferred();
            $el.fadeOut( function () {
                view.render()
                $el.fadeIn( function () {
                    view.initModule && view.initModule()
                    view.a = 123
                    dfd.resolve( viewMap [ ID ] )
                } )
            } )
            return dfd
        }

        return function ( params ) {
            var View = Backbone.View.extend( params )
            return single( params, View )
        }
    } )()

    return single_backbone
} )
