import { Component, inject } from '@angular/core';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecipeSimulationIngredients } from './models/recipe-simulation-ingredients';
import { RecipeService } from '../register-recipe/service/recipe-service';
import { RecipeOptionDTO } from '../register-recipe/models/recipe-option-dto';
import { CommonModule } from '@angular/common';
import { OptionList } from '../helpers/option-list/option-list';

@Component({
  selector: 'app-simulate-recipe',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    FinishButtonComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './simulate-recipe.component.html',
  styleUrl: './simulate-recipe.component.scss'
})
export class SimulateRecipeComponent {
  private recipeService = inject(RecipeService)
  private formBuilder = inject(FormBuilder)

  public ingredientList = new MatTableDataSource<RecipeSimulationIngredients>()
  public recipeList = new MatTableDataSource<any>()
  public displayedColumns: string[] = ['ingredient', 'quantity', 'measurementUnit', 'unitCost']
  public recipeOptionList = Array<RecipeOptionDTO>();
  public recipeToSimulationForm!: FormGroup
  public hasSelectedRecipe: boolean = false;
  public simulated: boolean = false;
  public measureUnitTranslateMap: Map<string, string> = new Map<string, string>([])
  public simulationResult: any = {
    costPerRecipe: 0,
    totalCost: 0,
    saleValue: 0,
  }

  ngOnInit(): void {
    this.initializeRecipeToSimulationForm();
    this.getRecipesOptionList()
      this.measureUnitTranslateMap = OptionList.getMeasureUnitMapLabel()
    
  }

  initializeRecipeToSimulationForm() {
    this.recipeToSimulationForm = this.formBuilder.group({
      recipeId: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      profit: [null, [Validators.required, Validators.min(0)]],
    });
  }

  private getRecipesOptionList(): void {
    this.recipeService.getRecipesOptionList().subscribe({
      next: (response) => {
        this.recipeOptionList = response;
      }
    })
  }

  public execute(): void {
    this.simulated = true
    const totalCost = this.ingredientList.data.reduce((acc, ingredient) => {
      return acc + (ingredient.quantity * ingredient.unitCost);
    }, 0);
    this.simulationResult = {
      costPerRecipe: totalCost,
      totalCost: totalCost * this.recipeToSimulationForm.value.quantity,
      saleValue: totalCost * (1 + (this.recipeToSimulationForm.value.profit / 100)),
    }
  }

  public cancel(): void {
    console.log('Simulation generated')
  }

  public addRecipeToSimulation(): void {
    this.ingredientList.data = []
    this.recipeService.getIngredientsByRecipeId(this.recipeToSimulationForm.value.recipeId).subscribe({
      next: (response) => {
        const recipeIngredients = response.map((ingredient: any) => {
          return { 
            ingredient: ingredient.ingredient,
            quantity: ingredient.quantity, 
            measurementUnit: ingredient.measurementUnit,
            unitCost: 0,
          } as RecipeSimulationIngredients;
        })
        this.ingredientList.data = [...this.ingredientList.data, ...recipeIngredients]
        this.hasSelectedRecipe = true
      }})
  }

  public removeRecipeToSimulation(): void {
    this.ingredientList.data = []
    this.recipeToSimulationForm.reset()
    this.simulationResult = {
      costPerRecipe: 0,
      totalCost: 0,
      saleValue: 0,
    }
  }

  public calculeTotalItem(ingredient: RecipeSimulationIngredients): void {
    ingredient.totalCost = ingredient.quantity * ingredient.unitCost   
  }

  public getMeasureUnitLabel(key: string): string {
    console.log(key);
    
    return this.measureUnitTranslateMap.get(key) || 'Unknown Unit'
  }

}
