import { Component, inject } from '@angular/core';
import { WindowTitleComponent } from '../components/window-title/window-title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';
import { CompanyRegistrationService } from './service/company-registration-service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

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
  private notificationService = inject(NotificationService)
  public companyForm!: FormGroup

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCompanyForm()
    this.loadCompany()
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

  private loadCompany(): void {
    this.companyRegistrationService.findCompany().subscribe({
    next: (company) => {
      this.companyForm.patchValue(company);
    },
    error: (error) => {
      // Se retornar 404 significa que ainda não existe empresa.
      // Apenas mantém o formulário vazio.
    }
  });
  }

  public save(): void {
    if (this.companyForm.invalid) {
      return this.notificationService.error('Existem ados inválidos ou não preenchidos')
    }
    try {
      if (this.companyForm.value.id) {
        this.update()
      } else {
        this. create()
      }
    } finally {
      this.router.navigate(['/homepage'])
    }
    
  }

  private update(): void {
    this.companyRegistrationService.update(this.companyForm.value.id!, this.companyForm.getRawValue()).subscribe({
      next: (company) => {
      },
      error: (error) => {
        console.error('Erro ao salvar empresa', error)
      }
    })
  }

  private create(): void {
    this.companyRegistrationService.create(this.companyForm.getRawValue()).subscribe({
      next: (company) => {
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
