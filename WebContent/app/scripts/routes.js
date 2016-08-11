app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        template : ""
    })
    .when("/repository/:name", {
        templateUrl : "templates/item.html",
        controller: 'ItemController'
    })
    .otherwise({
        redirectTo: '/'
    });
});