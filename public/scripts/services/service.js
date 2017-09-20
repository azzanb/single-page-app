'use strict';

angular.module('app')
.service('dataService', function($http){

	this.getRecipes = function(callback){
		$http.get('/api/recipes')
		.then(callback)
	};
	this.getCategories = function(callback){
		$http.get('/api/categories')
		.then(callback);
	};
	this.getFoodItems = function(callback){
		$http.get('/api/fooditems')
		.then(callback);
	};
	this.getRecipesForCategory = function(category, callback){
		$http.get('/api/recipes?category={category}')
		.then(callback);
	};
	this.getRecipesId = function(callback, id){
		$http.get('/api/recipes/{id}')
		.then(callback);	
	};
	this.updateRecipe = function(data, callback){
		$http.put("/api/recipes/{id}", data)
		.then(callback);
	};
	this.addRecipe = function(data, callback){
		$http.post('/api/recipes/', data)
		.then(callback);	
	}
	this.deleteRecipe = function(callback, id){
		$http.delete('/api/recipes/{id}')
		.then(callback);
	};
});
