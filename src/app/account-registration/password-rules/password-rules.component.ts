import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-rules',
  standalone: true,
  imports: [],
  templateUrl: './password-rules.component.html',
  styleUrl: './password-rules.component.scss'
})
export class PasswordRulesComponent {
   @Input() rules: {
    upper: boolean;
    lower: boolean;
    number: boolean;
    special: boolean;
    length: boolean;
  } = {
    upper: false,
    lower: false,
    number: false,
    special: false,
    length: false
  }

  public checkPasswordRules(password: string): boolean {
    this.rules.upper = /[A-Z]/.test(password);
    this.rules.lower = /[a-z]/.test(password);
    this.rules.number = /\d/.test(password);
    this.rules.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.rules.length = password.length >= 8;

    return Object.values(this.rules).every(rule => rule);
  }
}
