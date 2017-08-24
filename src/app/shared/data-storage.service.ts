/**
 * Created by Josh on 8/9/2017.
 */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://recipewebsite-6785e.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    console.log('getting recipes');
    const token = this.authService.getToken();
    // this.httpClient.get<Recipe[]>('https://recipewebsite-6785e.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get('https://recipewebsite-6785e.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'response',
      responseType: 'text'
    })
      .map(
        (recipes) => {
          console.log('inside map');
          console.log(recipes);
          // for (const recipe of recipes) {
          //   if (!recipe['ingredients']) {
          //     console.log('fixed');
          //     recipe['ingredients'] = [];
          //   }
          // }
          // return recipes;
          return [];
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        }
        ,
        (error) => console.log(error)
      );
  }
}
