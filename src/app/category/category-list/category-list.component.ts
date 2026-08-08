import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WindowTitleComponent } from '../../components/window-title/window-title.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FinishButtonComponent } from '../../components/finish-button/finish-button.component';
import { SearchCategoryResponse } from './models/search-category-response';
import { NotificationService } from '../../services/notification.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category-service';
import { StatusTranslator } from '../../helpers/enums/active-status';

@Component({
  selector: 'app-category',
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
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  private formBuilder = inject(FormBuilder)
  private categoryService = inject(CategoryService)
  private notificationService = inject(NotificationService)
  public searchForm!: FormGroup
  public categoryList = new MatTableDataSource<SearchCategoryResponse>()
  public displayedColumns: string[] = ['category', 'status', 'actions']

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSearchForm()
    this.searchCategory()
  }

  private initSearchForm() {
    this.searchForm = this.formBuilder.group({
      category: ['']
    })
  }

  public searchCategory(): void {
    this.categoryService.search(this.searchForm.getRawValue()).subscribe({
      next: (categories: SearchCategoryResponse[]) => {
        this.categoryList.data = categories
      },
      error: (error) => {
        this.notificationService.error(error.error)
      }
    })
  }

  public editCategory(id: number): void {
    this.router.navigate(['/category-form/edit', id]);
  }

  public newCategory(): void {
    this.router.navigate(['/category-form']);
  }

  public translateStatus(status: boolean): string {
    console.log(status);
    
  return status
    ? StatusTranslator.ACTIVE
    : StatusTranslator.INACTIVE;
}

}
