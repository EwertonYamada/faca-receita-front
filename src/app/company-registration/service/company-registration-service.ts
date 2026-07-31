import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../helpers/environment/environment';
import { CompanyForm } from '../models/company-form';

@Injectable({ providedIn: 'root' })
export class CompanyRegistrationService {
  private apiUrl = `${environment.apiHost}/api/company`

  constructor(private http: HttpClient) { }

  public save(company: CompanyForm): Observable<any> {
    return this.http.post(this.apiUrl, company)
  }
}
