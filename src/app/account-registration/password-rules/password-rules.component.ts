import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-rules',
  standalone: true,
  imports: [],
  templateUrl: './password-rules.component.html',
  styleUrl: './password-rules.component.scss'
})
export class PasswordRulesComponent {

  @Input() rules = {
    upper: false,
    lower: false,
    number: false,
    special: false,
    length: false
  };

}