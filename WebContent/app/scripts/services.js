app.service('MainService' , [ '$http' , function($http){  
    //request all globo.com repo 
    this.getRequest = function(){
        return $http.get('https://api.github.com/users/globocom/repos');
    }
}])

.service('ItemService' , ['$http' , function($http){
    
    //var savedData = {};
    this.savedData = {};
    
    this.set = function(data){
        this.savedData = data;
    }
    
    this.get = function(){
        return this.savedData;
    }
    
    //get commiters example: https://api.github.com/repos/globocom/megadraft-related-articles-plugin/commits
    // ACL-API-client-java https://api.github.com/repos/globocom/ACL-API-client-java/commits
    this.getCommits = function(url){
        //scope.repo.url
        //return $http.get('https://api.github.com/repos/globocom/ACL-API-client-java/commits');
        console.dir('url: ' + url + '/commits');
        return $http.get(url + '/commits');
    }
    
    
}]);