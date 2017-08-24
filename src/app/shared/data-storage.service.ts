/**
 * Created by Josh on 8/9/2017.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
    // const headers = new HttpHeaders().set('Authorization', 'Bearere afdklasflaldf')

    // return this.httpClient.put('https://recipewebsite-6785e.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    //   });

    const req = new HttpRequest('PUT', 'https://recipewebsite-6785e.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://recipewebsite-6785e.firebaseio.com/recipes.json?auth=' + token, {
    this.httpClient.get<Recipe[]>('https://recipewebsite-6785e.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
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
