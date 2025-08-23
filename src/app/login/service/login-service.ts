import { Injectable } from '@angular/core';
import { environment } from '../../helpers/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccountDto as CreateUserDTO } from '../../account-registration/model/create-account-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiHost}/api/user`;

  constructor(private http: HttpClient) { }

  public createUser(userData: CreateUserDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, userData);
  }
}
