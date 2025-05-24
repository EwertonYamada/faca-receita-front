import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatIcon],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  public searchForm!: FormGroup<any>
  public recipeList = []
  public displayedColumns: string[] = ['recipeName', 'category', 'actions']

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
    ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      recipeName: [''],
      recipeDateStart: [''],
      recipeDateEnd: ['']
    })
  }

  public newRecipe(): void {
    this.router.navigate(['/new-recipe'])
  }

  public editRecipe(recipe: any) {
    console.log('Edit recipe', recipe)
  }
}
