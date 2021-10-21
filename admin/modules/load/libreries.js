
var loadScripts = array => array.forEach(script => document.write('<script src='+ script +'></script>'));

const libreries = [
    
    /** Jquery */
    'dist/js/jquery-3.2.1.min.js',
    'dist/js/jquery-ui.min.js',
    
     /** Angularjs tools */
     'dist/js/angular/angular.min.js',
     'dist/js/angular/angular-route.min.js',
     'dist/js/angular/angular-sanitize.min.js',
     'dist/js/angular/angular-animate.min.js',
     'dist/js/angular/angular-base64.min.js',
     'dist/js/angular/ngStorage.min.js',
     'dist/js/angular/ngMask.min.js',
     'dist/js/firebase.js',
     'dist/js/angular/angularfire.min.js',
     'dist/js/angular/ng-pattern-strict.js',
     'dist/js/angular/angular-css.js',
     'dist/js/angular/angular-wizard.js',
     'dist/js/angular/angular-dragdrop.min.js',
    
    /** Utils */
    'dist/js/popper.min.js',
    'dist/js/bootstrap.min.js',
    'dist/js/mdb.min.js',
    'dist/js/material-select.js',
    'dist/js/dirPagination.js',
    'dist/js/fontawesome.js',
    'dist/js/modernizr-2.8.3.js',
    'dist/js/infragistics.core.js',
    'dist/js/infragistics.lob.js',
    'dist/js/infragistics.util.js',
    'dist/js/infragistics.util.jquery.js',
    'dist/js/infragistics.util.jquerydeferred.js',
    'dist/js/infragistics.ui.widget.js',
    'dist/js/infragistics.ui.shared.js',
    'dist/js/infragistics.ui.videoplayer.js',

    'dist/js/angular/igniteui-angularjs.js',
    'dist/js/videogular.js',
    'dist/js/quill.min.js',
    'modules/app/components/html-compile/html-compile.js',
    'dist/js/dropzone.js',
    'dist/js/ng-dropzone.js',

];

loadScripts(libreries);

