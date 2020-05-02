(function(){

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
//.directive(,);



NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
SearchCtrl=this;
SearchCtrl.searchTerm='';

SearchCtrl.Search =function(){
SearchCtrl.search_menu= MenuSearchService.getMatchedMenuItems(SearchCtrl.searchTerm);
//console.log('search_menu : ',SearchCtrl.search_menu);
}

}




MenuSearchService.$inject=['$http'];
function MenuSearchService($http){
service =this;
service.found=[];
service.getMatchedMenuItems = function (searchTerm)
{
  service.found=[];
  $http({
    method : 'GET',
    url : 'https://davids-restaurant.herokuapp.com/menu_items.json',

  }).then(function respone(result){
    var all_found= result.data.menu_items;
  //  console.log('all_found :' , all_found);
    for (var i=0 ;i<all_found.length;i++)
        {
          if((all_found[i].description).toLowerCase().includes(searchTerm.toLowerCase()))
          {
          //  console.log('index : ', i);
          //  console.log('item : ',all_found[i]);
            service.found.push(all_found[i]);
          }

        }
  //  console.log('found : ' ,service.found);
  }, function error(result)
    {
      console.log('error in http : ',result);
    }
);

return service.found;
};

}





















})();