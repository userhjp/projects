angular.module('app',[]).controller('indexController',function($scope,$http,$q){ 
    $scope.Go = function(id){
        location.href='/pages/addnews.html?id='+id;
    }
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
    getList();
    function getList(){
        http('/news/newsList',{"beginindex":0,"endindex":8}).then(function(data){
            $scope.list = data.data;
        },function(err){
            console.error(err);
        })
    }


    $scope.delete = function(id){
        if(confirm('确定纪录吗?'+id)){
        http('/news/deleteNews',{"id":id}).then(function(data){
            console.log(data);
            alert(data.message);
            getList();
        },function(err){
            console.error(err);
        })
    }}

    })  

angular.bootstrap(document,['app']);  