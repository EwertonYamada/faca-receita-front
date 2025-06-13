import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../helpers/environment/environment';
import { Recipe } from '../models/recipe.model';
import { searchRecipeDTO } from '../../recipe-list/interfaces/search-recipe-dto';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private apiUrl = `${environment.apiHost}/api/recipe`;

  constructor(private http: HttpClient) { }

  public saveRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }

  public searchRecipes(searchDTO: searchRecipeDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, searchDTO);
  }
}
