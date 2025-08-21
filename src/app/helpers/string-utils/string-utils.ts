import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uppercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return /[A-Z]/.test(value) ? null : { uppercase: true };
  };
}

export function lowercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return /[a-z]/.test(value) ? null : { lowercase: true };
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return /\d/.test(value) ? null : { number: true };
  };
}

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return /[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : { specialCharacter: true };
  };
}

export function passwordComplexityValidator(password: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const value = formGroup.get(password)?.value;
    const errors: ValidationErrors = {};

    const checks: { key: string; pattern: RegExp }[] = [
      { key: 'uppercase', pattern: /[A-Z]/ },
      { key: 'lowercase', pattern: /[a-z]/ },
      { key: 'number', pattern: /\d/ },
      { key: 'specialCharacter', pattern: /[!@#$%^&*(),.?":{}|<>]/ }
    ];

    if (value.length < 6) errors['minLength'] = true;

    for (const { key, pattern } of checks) {
      if (!pattern.test(value)) errors[key] = true;
    }

    return Object.keys(errors).length ? {passwordComplexity: true} : null;
  };
}

export function passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPassword = formGroup.get(confirmPasswordField)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

