import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../helpers/environment/environment';

@Injectable({ providedIn: 'root' })
export class SimulateRecipeService {
  private apiUrl = `${environment.apiHost}/api/recipe`;

  constructor(private http: HttpClient) { }

}
