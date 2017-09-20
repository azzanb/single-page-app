'use strict';

/* 

!!!!!-----TODO-----!!!!!

1)Filter list of recipes based on selected category (main page)
2)Delete Recipe
3)Save Recipe
4)Create Recipe
5)When adding another ingredient, each new select box under 'Item' should be an 
	input

*/

angular.module('app')
.controller('RecipesController', function($scope, dataService, $location){

	dataService.getCategories(function(response){
		$scope.getCategories = response.data;
		$scope.category = $scope.getCategories[0].name;
	});

	//hide "No recipes found" if recipes are present
	$scope.hideDiv = false;

	$scope.deleteRecipe = function(){
		//console.log(this.recipe)
	};

	$scope.addRecipe = function(){
		$location.path('/add')
	}

	dataService.getRecipes(function(response){
		$scope.getRecipes = response.data;	
	});

	// dataService.getRecipesId(function(id){
	// 	$scope.getRecipes = response.data;	
	// });
	
	
})
.controller('RecipeDetailController', function($scope, dataService, $location){

	dataService.getCategories(function(response){
		$scope.getCategories = response.data;
	});

	//Display recipe's data
	dataService.getRecipes(function(response){
		$scope.getRecipes = response.data;	
		$scope.categories = response.data.category;	
		for(let i = 0; i < $scope.getRecipes.length; i++){
			if($location.url() === ('/edit/' + $scope.getRecipes[i]._id)){
				$scope.recipeName = $scope.getRecipes[i].name;
				$scope.description = $scope.getRecipes[i].description; 
				$scope.selected = $scope.getRecipes[i].category;
				$scope.prepTime = $scope.getRecipes[i].prepTime;
				$scope.id = $scope.getRecipes[i]._id;
				$scope.cookTime = $scope.getRecipes[i].cookTime;
				$scope.ingredients = $scope.getRecipes[i].ingredients;
				$scope.steps = $scope.getRecipes[i].steps;
				
				$scope.postRecipe = function(data){
					console.log(dataService.addRecipe({data:$scope.id}))
				}
			}
		}
		if($location.url() === "/add"){
			$scope.addNew = "Add New Recipe";
			$scope.recipeName = '';
			
		}
	});

	$scope.cancel = function(){
		$location.path('/');
	}

	$scope.updateRecipe = function(data){
		dataService.updateRecipe({data: $scope.id})
	}

	$scope.addIngredient = function(){
		$scope.ingredients.push({
			foodtItem: "",
			condition: "",
			amount: "",
			$$hashKey: ""
		});
	}

	$scope.addStep = function(){
		if($location.url() !== "/add"){
			$scope.steps.push({
				description: "",
				$$hashKey: ""
			});
		}
		else{
			$scope.step = {
				description: ""
			};
			$scope.steps.push($scope.step)
			console.log(this.step)
		}
		
	}

	$scope.deleteStep = function(){
		const index = this.steps.indexOf(this.step);
		if(index > -1){
			this.steps.splice(index, 1);
		}
	}

	$scope.deleteIngredient = function() {
		const index = this.ingredients.indexOf(this.ingredient);
		if(index > -1){
			this.ingredients.splice(index, 1);
		}
	}

});






