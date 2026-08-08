import { Component } from '@angular/core';
import { WindowTitleComponent } from '../../components/window-title/window-title.component';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinishButtonComponent } from '../../components/finish-button/finish-button.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../service/category-service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    WindowTitleComponent,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FinishButtonComponent,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})

export class CategoryFormComponent {
  public categoryForm!: FormGroup<any>

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initializeCategoryForm()
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return
    this.loadCategory(Number(id));
  }

  private loadCategory(id: number): void {
    this.categoryService.findById(id)
      .subscribe(category => {
        this.categoryForm.patchValue(category);
      })
  }

  private initializeCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      category: [''],
      description: [''],
      active: [true]
    })
  }

  public cancel(): void {
    this.router.navigate(['/category-list'])
  }

  public save(): void {
    this.categoryService.save(this.categoryForm.getRawValue()).subscribe({
      next: (category) => {
        this.notificationService.success('Categoria salva com sucesso')
        this.router.navigate(['/category-list'])
      },
      error: (error) => {
        this.notificationService.error(error.error)
      }
    })
  }
}
