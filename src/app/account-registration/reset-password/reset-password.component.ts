import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordRulesComponent } from "../password-rules/password-rules.component";
import { AuthService } from '../../login/service/auth-service';
import { ForgotPasswordDto } from '../model/forgot-password-dto';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    PasswordRulesComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild(PasswordRulesComponent) rules!: PasswordRulesComponent;

  form: FormGroup;
  email: string | null = null;
  token: string | null = null;
  isValidPass: boolean = false;
  requestSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    
  ) {
    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]]
      },
      {
        validators: [this.passwordMatchValidator]
      }
    );
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  get newPasswordControl(): AbstractControl | null {
    return this.form.get('newPassword');
  }

  get confirmPasswordControl(): AbstractControl | null {
    return this.form.get('confirmNewPassword');
  }

  public createNewPassword(): void {
    if (!this.email || !this.token) {
      alert('Link inválido. Verifique o e-mail enviado.');
      return;
    }

    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente e verifique as regras da senha.');
      return;
    }

    this.requestSent = true;
    const { newPassword, confirmNewPassword } = this.form.value;

    this.authService.createNewPassword(this.buildForgotPasswordDto(newPassword, confirmNewPassword))
      .subscribe({
        next: () => alert('Senha redefinida com sucesso!'),
        error: err => {
          this.router.navigate(['/login']);
          alert('Erro ao redefinir a senha. Tente novamente.');
          console.error(err);
        },
        complete: () => {
          this.requestSent = false
          this.router.navigate(['/login']);
        }
      });
  }

  private buildForgotPasswordDto(newPassword: string, confirmNewPassword: string): ForgotPasswordDto {
    return {
      email: this.email!,
      password: newPassword,
      passwordConfirmation: confirmNewPassword,
      token: this.token!
    };
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmNewPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  public onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.rules) {
      this.isValidPass = this.rules.checkPasswordRules(value);
    }
  }
}
