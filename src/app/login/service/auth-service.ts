import { Injectable } from '@angular/core';
import { environment } from '../../helpers/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccountDto as RegisterUserDTO } from '../../account-registration/model/create-account-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiHost}/api/auth`;

  constructor(private http: HttpClient) { }

  public registerUser(userData: RegisterUserDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
