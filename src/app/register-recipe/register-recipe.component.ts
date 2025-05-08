import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ingredient } from './models/ingredient.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-recipe',
  standalone: true,
  imports: [MatIconModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './register-recipe.component.html',
  styleUrl: './register-recipe.component.scss'
})
export class RegisterRecipeComponent {
  public ingredientList = new MatTableDataSource<Ingredient>();
  public ingredientForm!: FormGroup<any>
  public displayedColumns: string[] = ['ingredient', 'quantity', 'measurementUnit'];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      ingredient: ['', Validators.required],
      quantity: ['', Validators.required],
      measurementUnit: ['', Validators.required]
     })
  }

  public addIngredient(): void {
    console.log(this.ingredientForm.value);
    
    if (this.ingredientForm && this.ingredientForm.valid) {

      const newIngredient = this.ingredientForm.value;
      const updatedList = [...this.ingredientList.data, newIngredient];
      this.ingredientList.data = updatedList;
      this.ingredientForm.reset();
    }
  }
}
