import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../login/service/auth-service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  requestSent: boolean = false;
  form: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: [  this.allFieldsFilled]
      }
    )
  }

  ngOnInit(): void { }

    allFieldsFilled(group: AbstractControl): ValidationErrors | null {
      const hasEmpty = Object.values(group.value).some(v => v === null || v === '');
      return hasEmpty ? { emptyFields: true } : null;
    }

  public sendPasswordResetEmail(): void {
    this.requestSent = true;
    if (!this.form.get('email')?.valid) {
      return
    }
    this.authService.sendPasswordResetEmail(this.form.value.email.trim()).subscribe({
      next: () => {
        this.requestSent = false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.errorMessage = error.error.text || 'Ocorreu algum erro ao enviar e-mail.';
        console.error('Error sending e-mail:', error.error.text || error);
      },
    })
  }
}
