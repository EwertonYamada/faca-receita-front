import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../helpers/environment/environment';
import { CompanyForm } from '../models/company-form';
import { CompanyResponse } from '../models/company-response';

@Injectable({ providedIn: 'root' })
export class CompanyRegistrationService {
  private apiUrl = `${environment.apiHost}/api/company`

  constructor(private http: HttpClient) { }

  public create(company: CompanyForm): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(this.apiUrl, company)
  }

  public update(id: number, company: CompanyForm): Observable<CompanyResponse> {
    return this.http.put<CompanyResponse>(`${this.apiUrl}/${id}`, company)
  }

  public findCompany(): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(this.apiUrl)
  }
}
