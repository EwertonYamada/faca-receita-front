import { Component } from '@angular/core';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ingredient } from '../register-recipe/models/ingredient.model';
import { RecipeSimulationIngredients } from './models/recipe-simulation-ingredients';

@Component({
  selector: 'app-simulate-recipe',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    FinishButtonComponent,
    FormsModule
  ],
  templateUrl: './simulate-recipe.component.html',
  styleUrl: './simulate-recipe.component.scss'
})
export class SimulateRecipeComponent {
  public ingredientList = new MatTableDataSource<RecipeSimulationIngredients>()
  public displayedColumns: string[] = ['ingredient', 'quantity', 'measurementUnit', 'unitCost', 'totalCost']

  public generateSimulation(): void {
    console.log('Simulation generated')
  }

  public cancel(): void {
    console.log('Simulation generated')
  }

}
