import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../helpers/environment/environment';
import { Recipe } from '../models/recipe.model';
import { searchRecipeDTO } from '../../recipe-list/interfaces/search-recipe-dto';
import { RecipeListResponseDTO } from '../../recipe-list/interfaces/recipe-list-response-dto';
import { RecipeOptionDTO } from '../models/recipe-option-dto';
import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private apiUrl = `${environment.apiHost}/api/recipe`;

  constructor(private http: HttpClient) { }

  public saveRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }

  public searchRecipes(searchDTO: searchRecipeDTO): Observable<RecipeListResponseDTO[]> {
    return this.http.post<RecipeListResponseDTO[]>(`${this.apiUrl}/search`, searchDTO);
  }

  public getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  public getRecipesOptionList(): Observable<RecipeOptionDTO[]> {
    return this.http.get<RecipeOptionDTO[]>(`${this.apiUrl}/option-list`)
  }

  public getIngredientsByRecipeId(recipeId: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/get-ingredients-by-recipe-id/${recipeId}`)
  }
}
