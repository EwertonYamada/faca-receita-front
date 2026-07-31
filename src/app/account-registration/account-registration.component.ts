import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../login/service/auth-service';
import { CreateAccountDto } from './model/create-account-dto';
import { PasswordRulesComponent } from './password-rules/password-rules.component';

@Component({
  selector: 'app-account-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    PasswordRulesComponent,
  ],
  templateUrl: './account-registration.component.html',
  styleUrl: './account-registration.component.scss'
})
export class AccountRegistrationComponent {
  @ViewChild(PasswordRulesComponent) rules!: PasswordRulesComponent

  requestSent: boolean = false;
  form: FormGroup;
  isValidPass: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private dialogRef: MatDialogRef<AccountRegistrationComponent>
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        doc: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: ['', [Validators.required]],
        passwordConfirmation: ['', [Validators.required]],
      },
      {
        validators: [this.passwordMatchValidator, this.allFieldsFilled]
      }
    )
  }

  ngOnInit(): void { }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('passwordConfirmation')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  private allFieldsFilled(group: AbstractControl): ValidationErrors | null {
    const hasEmpty = Object.values(group.value).some(v => v === null || v === '');
    return hasEmpty ? { emptyFields: true } : null;
  }

  public createAccount(): void {
    this.requestSent = true;
    if (!this.form.valid) {
      return
    }
    const createAccountDTO: CreateAccountDto = {
      name: this.form.value.name.trim(),
      doc: this.form.value.doc.trim(),
      email: this.form.value.email.trim(),
      phone: this.form.value.phone.trim(),
      password: this.form.value.password,
      passwordConfirmation: this.form.value.passwordConfirmation
    } 
    this.loginService.registerUser(createAccountDTO).subscribe({
      next: () => {
        this.requestSent = false;
      },
      error: (error) => {
        console.error('Error creating account:', error);
      },
      complete: () => {
        this.dialogRef.close(this.form.value);
      },
    })
  }

  onPasswordInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;      
    if (this.rules) {
      this.isValidPass = this.rules.checkPasswordRules(value);
    }
  }
}
