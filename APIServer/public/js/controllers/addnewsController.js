angular.module('app',[]).controller('addnewsController',function($scope,$location,$http,$q){  
    var id =$location.search().id

    var http = function(method,params){
        var req = {
            method: 'post',
            url: "http://127.0.0.1:3100"+method,
            data:params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function(obj) {    //转换请求数据的格式 否则服务器获取不到数据json => {"beginindex":0,"endindex":8}:""
                var str = [];    
                for (var p in obj) {    
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));    
                }    
                return str.join("&");    
            } 
        }; 
        var deferred = $q.defer();
        $http(req).then(function(msg){
            deferred.resolve(msg.data)
        },function(err){
            deferred.resolve(err);
        })
        return deferred.promise;
    }
    if(id){
        http('/news/getnewsDetail',{"id":id}).then(function(data){
            console.log(data);
            $scope.title = data.data.title;
            $scope.content = data.data.content;
        },function(err){
            console.error(err);
        })
    }
    //提交新闻
    $scope.submit = function(){
        var local = location.origin + "/images/img_icon.png";
        if(!$scope.title || !$scope.content){
            return alert("标题内容不能为空")
        }
        if(id){
            http('/news/updatanews',{"content":$scope.content,"title":$scope.title,"id":id}).then(function(data){
                console.log(data);
                alert(data.message)
            },function(err){
                console.error(err);
            })
        }else{
            http('/news/addnews',{"content":$scope.content,"title":$scope.title,"img":local}).then(function(data){
                console.log(data);
                alert(data.message)
            },function(err){
                console.error(err);
            })
        }

    }

    }).config(['$locationProvider', '$compileProvider', function ($locationProvider, $compileProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    }]);
angular.bootstrap(document,['app']); 
