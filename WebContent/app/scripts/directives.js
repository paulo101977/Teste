app.directive('mainList', function(){
  return {
      templateUrl: "templates/listContent.html"
  }  
})
.directive('blockQuote', function(){
    return{
        restrict: 'E',
        templateUrl: "templates/blockquote.html",
        link: function(scope){
            //scope.$apply();
            //scope.$applyAsync();
        }
    
    }
})
;