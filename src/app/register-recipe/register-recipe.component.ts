import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ingredient } from './models/ingredient.model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';
import { RecipeService } from './service/recipe-service';

@Component({
  selector: 'app-register-recipe',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    FinishButtonComponent,
  ],
  templateUrl: './register-recipe.component.html',
  styleUrl: './register-recipe.component.scss',
})

export class RegisterRecipeComponent {
  public ingredientList = new MatTableDataSource<Ingredient>()
  public recipeForm!: FormGroup<any>
  public ingredientForm!: FormGroup<any>
  public displayedColumns: string[] = ['ingredient', 'quantity', 'measurementUnit', 'actions']
  public editingIndex: number | null = null
  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.initRecipeForm()
    this.initIngredientForm()
  }

  private initRecipeForm(): void {
    this.recipeForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      yieldType: ['', Validators.required],
      recipeYield: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      preparationTime: ['', Validators.required],
      preparationInstructions: ['', Validators.required],
    })
  }

  private initIngredientForm(): void {
    this.ingredientForm = this.formBuilder.group({
      ingredient: ['', Validators.required],
      quantity: [0, Validators.required],
      measurementUnit: ['', Validators.required]
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  public addIngredient(): void {
    const newIngredient: Ingredient = this.ingredientForm.value
    const list = [...this.ingredientList.data]

    if (this.editingIndex !== null) {
      list[this.editingIndex] = newIngredient
      this.editingIndex = null
    } else {
      list.push(newIngredient)
    }
    this.ingredientList.data = list
    this.ingredients.push(this.formBuilder.group(newIngredient))
    this.initIngredientForm()
  }

  public editIngredient(element: Ingredient): void {
    this.editingIndex = this.ingredientList.data.indexOf(element)
    this.ingredientForm.setValue({
      ingredient: element.ingredient,
      quantity: element.quantity,
      measurementUnit: element.measurementUnit
    })
  }

  public removeIngredient(element: any) {
    this.ingredientList.data = this.ingredientList.data.filter(item => item !== element);
    this.ingredients.removeAt(this.ingredientList.data.indexOf(element))
  }

  public finish(): void {
    this.recipeService.saveRecipe(this.recipeForm.value).subscribe({
      next: (response) => {
        console.log('Receita salva com sucesso', response)
        this.recipeForm.reset()
        this.ingredientList.data = []
      },
      error: (error) => {
        console.error('Erro ao salvar receita', error)
      }
    })  
  }

  public cancel(): void {
    console.log(5678);
  }
}
