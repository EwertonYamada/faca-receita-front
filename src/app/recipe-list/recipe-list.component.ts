import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RecipeService } from '../register-recipe/service/recipe-service';
import { searchRecipeDTO } from './interfaces/search-recipe-dto';
import { RecipeListResponseDTO } from './interfaces/recipe-list-response-dto';
import { MatButtonModule } from '@angular/material/button';
import { OptionList } from '../helpers/option-list/option-list';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  public searchForm!: FormGroup<any>
  public recipeList = new MatTableDataSource<RecipeListResponseDTO>()
  public displayedColumns: string[] = ['name', 'category', 'recipeYield', 'preparationTime', 'actions']
  public recipeCategoryTranslateMap: Map<string, string> = new Map<string, string>([])
  public measureUnitTranslateMap: Map<string, string> = new Map<string, string>([])

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm()
    this.initializeRecipeCategoryTranslateMap()
    this.initializeMeasureUnitOptions()
    this.searchRecipes()
  }

  public searchRecipes(): void {
    this.recipeService.searchRecipes(this.buildSearchDTO()).subscribe(
      (recipes: RecipeListResponseDTO[]) => {
        this.recipeList.data = recipes
      },
      error => {
        console.error('Erro ao buscar receitas:', error)
      }
    )
  }

  private initializeRecipeCategoryTranslateMap(): void {
    this.recipeCategoryTranslateMap = OptionList.getProductCategoryMapLabel()
  }

  private initializeMeasureUnitOptions() {
    this.measureUnitTranslateMap = OptionList.getMeasureUnitMapLabel()
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
    this.router.navigate(['/recipe'])
  }

  public editRecipe(recipe: any) {
    this.router.navigate(['/recipe/edit', recipe.id])
  }

  public getRecipeCategoryLabel(category: string): string {
    return this.recipeCategoryTranslateMap.get(category) || 'Não definido'
  }

  public getMeasureUnitLabel(key: string): string {
    return this.measureUnitTranslateMap.get(key) || 'Unknown Unit'
  }
}
