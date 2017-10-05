(function(){
	'use strict';

	angular.module('app')
	.service('dataService', function($http){

		this.getRecipes = function(){
			return $http.get('/api/recipes');
		};
		this.getCategories = function(callback){
			return $http.get('/api/categories');
		};
		this.getFoodItems = function(){
			return $http.get('/api/fooditems');
		};
		this.getRecipesForCategory = function(data, callback){
			$http.get(`/api/recipes?category=${data}`)
			.then(callback);
		};
		this.getRecipeForId = function(id){
			return $http.get(`/api/recipes/${id}`)	
		};
		this.updateRecipe = function(id, data, callback){
			return $http.put(`/api/recipes/${id}`, data)
			.then(callback)
		};
		this.addRecipe = function(data){
			return $http.post('/api/recipes', data);
		}
		this.deleteRecipe = function(id, callback){
			$http.delete(`/api/recipes/${id}`)
			.then(callback);
		};
	});
}());
