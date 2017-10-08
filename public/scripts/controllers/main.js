(function(){
	'use strict';
	var myApp = angular.module('app');

	myApp.controller('RecipesController', function(dataService, $location, $scope){
		var vm = this;

		dataService.getRecipes(function(){})
			.then(function(response){
				vm.getRecipes = response.data;
				console.log(vm.getRecipes)
			});

		dataService.getCategories(function(){})
			.then(function(response){
				vm.getCategories = response.data;
			});

		vm.getRecipesForCategory = function(data){
			dataService.getRecipesForCategory(data, res => {
				vm.recipesForCategory = res.data;
			});
		};

		vm.addRecipe = function(){
			$location.path('/add');
		};

		vm.deleteRecipe = function(recipe, index){
			if( confirm(`Are you sure you want to delete ${recipe.name}?`) == true ){
				dataService.deleteRecipe(recipe._id, res => {		
					vm.recipesForCategory.splice(index, 1);
					console.log(vm.results);	
				});
			};
		};	
	});
	

	myApp.controller('RecipeDetailController', function(dataService, $location, $routeParams, $scope){
		var vm = this;

		dataService.getCategories(function(){})
			.then(function(response){
				vm.getCategories = response.data;
			});

		dataService.getRecipes(function(){})
			.then(function(response){
				vm.getRecipes = response.data
			});

		dataService.getFoodItems(function(){})
			.then(function(response){
				vm.getFoodItems = response.data;
			});

		//----------DYNAMIC URL ROUTING----------//
		vm.routeId = $location.url() === `/edit/${$routeParams.id}`;
		
		//This serves as the data-binding model 
		if($location.url() === `/edit/${$routeParams.id}`){
			dataService.getRecipeForId($routeParams.id)
		 	 .then(function(res){
		 		vm.data = res.data;
		 		
				vm.dataObj = {
					"name": vm.name = res.data.name,
					"description": vm.description = res.data.description,
					"category": vm.category = res.data.category,
					"prepTime": vm.prepTime = res.data.prepTime,
					"cookTime": vm.cookTime = res.data.cookTime,
					"ingredients": vm.ingredients = res.data.ingredients,
					"steps": vm.steps = res.data.steps,
					"id": vm.id = res.data._id,
				};	
		 	});
		 } else if($location.url() === '/add'){
		 	vm.dataObj = {
		 		"name": "",
		        "desciption": "",
		        "category": "",
		        "prepTime": "",
		        "cookTime": "",
		        "ingredients": [],
		        "steps": []
		 	};
		 };
		
		vm.addRecipe = function(data){
			vm.getRecipes.push(data);
			dataService.addRecipe(data);
			$location.path('/');
		};

		vm.updateRecipe = function(id, data){
			dataService.updateRecipe(id, data, res => {});	
			$location.path('/');
		};

		vm.cancel = function(){
			$location.path('/');
		};

		vm.addIngredient = function(data){
			data.ingredients.push({
				foodItem: "",
				condition: "",
				amount: ""
			});
		};

		vm.addStep = function(data){
			data.steps.push({
				description: ""
			});
		};

		vm.deleteIngredient = function(data, index) {
			data.ingredients.splice(index, 1);			
		};

		vm.deleteStep = function(data, index){
			data.steps.splice(index, 1);	
		};
	});
}());



