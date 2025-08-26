import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../login/service/auth-service';
import { CreateAccountDto } from './model/create-account-dto';

@Component({
  selector: 'app-account-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './account-registration.component.html',
  styleUrl: './account-registration.component.scss'
})
export class AccountRegistrationComponent {
  requestSent: boolean = false;
  invalidPassword: boolean = false;
  form: FormGroup;
  rules = {
    upper: false,
    lower: false,
    number: false,
    special: false,
    length: false
  };

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

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(value => {
      const password = value || '';      
      this.rules.upper = /[A-Z]/.test(password);
      this.rules.lower = /[a-z]/.test(password);
      this.rules.number = /\d/.test(password);
      this.rules.special = /[^A-Za-z0-9]/.test(password);
      this.rules.length = /.{8,}/.test(password);
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('passwordConfirmation')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  allFieldsFilled(group: AbstractControl): ValidationErrors | null {
    const hasEmpty = Object.values(group.value).some(v => v === null || v === '');
    return hasEmpty ? { emptyFields: true } : null;
  }

  createAccount() {
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
        this.invalidPassword = false;
      },
      error: (error) => {
        console.error('Error creating account:', error);
      },
      complete: () => {
        this.dialogRef.close(this.form.value);
      },
    })
  }
}
