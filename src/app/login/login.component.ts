import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountRegistrationComponent } from '../account-registration/account-registration.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatIconModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onLogin(): void {
    this.router.navigate(['/homepage']);

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login com email:', email, 'e senha:', password);
    } else {
      console.log('Formulário inválido!');
    }
  }

  public onRegister(): void {
    this.dialog.open(AccountRegistrationComponent, {
      width: '90%',
      height: '90%',
      disableClose: false,
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados do registro:', result);
        // Aqui você pode enviar os dados para o backend
      } else {
        console.log('Registro cancelado');
      }
    });
  }
}
