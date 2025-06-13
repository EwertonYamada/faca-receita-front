import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RecipeService } from '../register-recipe/service/recipe-service';
import { searchRecipeDTO } from './interfaces/search-recipe-dto';

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
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm()
    this.searchRecipes()
  }

  private searchRecipes(): void {
    this.recipeService.searchRecipes(this.buildSearchDTO()).subscribe((recipes: any[]) => {
      console.log(recipes);
    }, error => {
      console.error('Error fetching recipes:', error);
    })
  }

  private buildSearchDTO(): searchRecipeDTO {
    const searchDTO: searchRecipeDTO = {
      page: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      recipeName: this.searchForm.value.recipeName || undefined,
      recipeDateStart: this.searchForm.value.recipeDateStart ? new Date(this.searchForm.value.recipeDateStart) : undefined,
      recipeDateEnd: this.searchForm.value.recipeDateEnd ? new Date(this.searchForm.value.recipeDateEnd) : undefined
    }
    return searchDTO
  }

  private initializeSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      recipeName: [''],
      recipeDateStart: [''],
      recipeDateEnd: ['']
    });
  }

  public newRecipe(): void {
    this.router.navigate(['/new-recipe'])
  }

  public editRecipe(recipe: any) {
    console.log('Edit recipe', recipe)
  }
}
