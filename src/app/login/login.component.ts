import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router
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

  public onCancel(): void {
    this.loginForm.reset();
    console.log('Login cancelado');
  }
}
