(function(){
'use strict';

angular.module('app')
.controller('RecipesController', function($scope, dataService, $location){
	
	dataService.getRecipes(function(response){
		$scope.getRecipes = response.data;	
	});

	dataService.getCategories(function(response){
		$scope.getCategories = response.data;
		$scope.category = $scope.getCategories[0].name;
	});

	$scope.addRecipe = function(){
		$location.path('/add')
	}
	
	//Anything wrong here?
	$scope.deleteRecipe = function(recipe, index){
		if( confirm(`Are you sure you want to delete ${recipe.name}?`) == true ){
			dataService.deleteRecipe(recipe._id, res => {
				$scope.getRecipes.splice(index, 1)	
			});
		}
		else return false;
	};
			
})
.controller('RecipeDetailController', function($scope, dataService, $location, $routeParams){

	dataService.getCategories(function(response){
		$scope.getCategories = response.data;
	});

	dataService.getFoodItems(function(response){
		$scope.getFoodItems = response.data;
	});

	//create data for new recipe to be saved
	const addNewRecipe = {
		"name": "",
        "desciption": "",
        "category": "",
        "prepTime": "",
        "cookTime": "",
        "ingredients": [],
        "steps": []
	};

	//Dynamic url routing
	$scope.routeId = $location.url() === `/edit/${$routeParams.id}`;

	//Set placeholder for select element for foodItems when adding a new recipe
	$scope.addNewFoodItem = $location.url() === "/add" ? "Choose Food Item" : "";

	//Dynamically get recipe data based on recipe's id: /edit/${id}
	dataService.getRecipes(function(response){
		const recipes = response.data;	
		$scope.recipeData = recipes.filter(function(recipe){
			return recipe._id === $routeParams.id; 
		})[0] || addNewRecipe;
		//console.log($scope.recipeData);

		if($location.url() === "/add"){
			$scope.addNew = "Add New Recipe";	
		}
	});

	$scope.addRecipe = function(data){
		dataService.addRecipe(data);
		$location.path('/');
	}

	//Anything wrong here?
	$scope.updateRecipe = function(id, data){
		dataService.updateRecipe(id, data);
		$location.path('/');
	}

	$scope.cancel = function(){
		$location.path('/');
	}

	$scope.addIngredient = function(recipe){
		recipe.ingredients.push({
			foodtItem: "",
			condition: "",
			amount: "",
		});
	}

	$scope.addStep = function(recipe){
		recipe.steps.push({
			description: ""
		});
	}

	$scope.deleteIngredient = function(recipe, index) {
		recipe.ingredients.splice(index, 1)
	}

	$scope.deleteStep = function(recipe, index){
		recipe.steps.splice(index, 1)	
	}
});
}());






