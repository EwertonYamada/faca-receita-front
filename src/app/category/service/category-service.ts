import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../helpers/environment/environment';
import { SearchCategoryForm } from '../category-list/models/search-category-form';
import { SearchCategoryResponse } from '../category-list/models/search-category-response';
import { CategoryForm } from '../models/category-form';
import { CategoryResponse } from '../models/category-response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiHost}/api/category`

  constructor(private http: HttpClient) { }

  public search(category: SearchCategoryForm): Observable<any> {
    return this.http.get<SearchCategoryResponse[]>(this.apiUrl, {
      params: {
        search: category.category,
      }
    })
  }

  public save(category: CategoryForm): Observable<any> {
    return this.http.post<CategoryResponse>(this.apiUrl, category)
  }

  public findById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/${id}`);
  }
}
