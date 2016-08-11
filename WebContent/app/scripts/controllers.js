app
 
//main page content controller
.controller('MainController', ['$scope' , 'MainService' , 'ItemService' , function($scope , MainService , ItemService){
    
    //active link
    $scope.active = "";
    
    //get promise
    var promise = MainService.getRequest();
    
    //load main content
    promise.then(function(request){
        $scope.repos = request.data;
        
        console.dir(request.data);
    });
    
    
    //set active table
    $scope.setActive = function(name , data){
        console.log("set" + name);
        $scope.active = name;
        
        ItemService.set(data);
    }
}])

//controller for items
.controller("ItemController", ['$scope' , 'ItemService' , '$routeParams' , '$timeout' , function($scope , ItemService , $routeParams , $timeout){
    //console.log($routeParams);
    
    //commiters info
    //$scope.commits = [{2:3},{2:3},{2:3},{2:3},{2:3}];
    
    //
    $scope.commits = [];
    
    //current page
    $scope.name = "";
    
    //max number of commits on screen
    $scope.limit = 20;
    
    $scope.showButton = true;
    
    //repository info
    $scope.repo = {};
    $scope.repo = ItemService.get();
    
    
    
    
    $scope.$watch('commits' , function(){
        //console.log('commit changed');
        console.dir($scope.commits);
        if($scope.commits.length < 20)
            $scope.showButton = false; 
        else
            $scope.showButton = true;
    })
    
    $scope.increaseLimit = function(){
        if($scope.limit < $scope.commits.length){
            $scope.limit += 20;
        } 
        
        //disable button
        if($scope.limit > $scope.commits.length){
            $scope.showButton = false;
        }
    }
    
    $scope.ramdom = function(){       
        return 0.5 - Math.random();
    }
    
    //console.log($scope.repo);
    
    //watch route changed
    $scope.$on('$routeChangeStart', function(next, current) { 
        console.log("route changed");
        console.dir(current);
        
        console.dir(next);
        
        var scope = current.scope;
        var promise;
        
        if(scope){
            //name of repository
            scope.name = current.params.name;
            
            //reset commits
            scope.commits = [];
            
            scope.$apply();

            //reset limit
            scope.limit = 20;

            //show increase button
            scope.showButton = true;
            
            scope.repo = ItemService.get();
            
        }
        
        //get promise to commit request
        if(scope){
            console.log();
            promise = ItemService.getCommits(scope.repo.url);
        }
        else
            promise = ItemService.getCommits('https://api.github.com/repos/globocom/' + current.params.name);


        //get commiters and commit data
        promise.then(function(response){

            if(current && current.scope){
                current.scope.commits = response.data;
                //console.dir(response.data);
            }

            //data
            //author.avatar_url
            //commit.message
            //commit.author.name
        } 
        , function(error){
            console.log(error);
       });
        
        
        
    });
    
    $scope.getImg = function(img){
        return img || 'https://avatars3.githubusercontent.com/u/83798?v=3&s=200';
    }
}])
;