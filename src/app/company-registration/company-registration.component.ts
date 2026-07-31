import { Component, inject } from '@angular/core';
import { WindowTitleComponent } from '../components/window-title/window-title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';
import { CompanyRegistrationService } from './service/company-registration-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [
    WindowTitleComponent,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FinishButtonComponent,
  ],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss'
})
export class CompanyRegistrationComponent {
  private formBuilder = inject(FormBuilder)
  private companyRegistrationService = inject(CompanyRegistrationService)
  public companyForm!: FormGroup

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCompanyForm()
  }

  private initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      id: [null],
      legalName: ['', [Validators.required]],
      description: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tradeName: [''],
      cnpj: [''],
      stateTaxRegistration: [''],
      municipalTaxRegistration: [''],
      whatsapp: [''],
      instagram: [''],
      facebook: [''],
      website: [''],
      primaryColor: ['#00000000']
    })
  }

  public save(): void {
    if (this.companyForm.invalid) {
      return
    }
    this.companyRegistrationService.save(this.companyForm.getRawValue()).subscribe({
      next: (response) => {
        this.companyForm.reset()
        this.router.navigate(['/homepage'])
      },
      error: (error) => {
        console.error('Erro ao salvar empresa', error)
      }
    })
  }

  public cancel(): void {
    this.router.navigate(['/homepage'])
  }

  public onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.companyForm.patchValue({
      primaryColor: color.toLocaleUpperCase()
    })
  }
}
