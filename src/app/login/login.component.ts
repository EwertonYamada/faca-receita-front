import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountRegistrationComponent } from '../account-registration/account-registration.component';
import { AuthService } from './service/auth-service';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from '../account-registration/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatIconModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            CommonModule,
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup<any>;
  loginError: boolean = false;
  loginMessageError!: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private loginService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onLogin(): void {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    this.loginError = false;
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/homepage']);
        }
      },
      error: (error) => {
        this.loginError = true;
        console.log(error.error);
        
        this.loginMessageError = error.error.message || 'Error during login. Please try again.';
        console.error('Erro no login:', error);
      }
    });
  }

  public onRegister(): void {
    this.dialog.open(AccountRegistrationComponent, {
      minWidth: '90%',
      minHeight: '70%',
      disableClose: false,
      position: { top: '5%', left: '13%' },
    })
  }

  public fotgotPassword(): void {
     this.dialog.open(ForgotPasswordComponent, {
      minWidth: '90%',
      minHeight: '70%',
      disableClose: false,
      position: { top: '5%', left: '13%' },
      data: {
        email: this.loginForm.get('email')?.value || '',
        showPasswordFields: false
      }
    })

  }

}
