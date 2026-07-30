import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function urlWebsiteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);

      console.log('URL válida:', url);

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { invalidWebsite: true };
      }

      return null;

    } catch (e) {
      console.log('URL inválida', e);
      return { invalidWebsite: true };
    }
  };
}