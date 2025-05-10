import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ingredient } from './models/ingredient.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinishButtonComponent } from '../components/finish-button/finish-button.component';

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
  styleUrl: './register-recipe.component.scss'
})
export class RegisterRecipeComponent {
  public ingredientList = new MatTableDataSource<Ingredient>()
  public ingredientForm!: FormGroup<any>
  public displayedColumns: string[] = ['ingredient', 'quantity', 'measurementUnit', 'actions']
  public editingIndex: number | null = null
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
    if (this.ingredientForm.invalid) {throw new Error('Form is invalid')}

    const formValue = this.ingredientForm.value
    const list = [...this.ingredientList.data]

    if (this.editingIndex !== null) {
      list[this.editingIndex] = formValue
      this.editingIndex = null
    } else {
      list.push(formValue)
    }
    this.ingredientList.data = list
    this.ingredientForm.reset()
  }

  public editIngredient(element: Ingredient): void {
    this.editingIndex = this.ingredientList.data.indexOf(element)
    this.ingredientForm.setValue({
      ingredient: element.ingredient,
      quantity: element.quantity,
      measurementUnit: element.measurementUnit
    });
  }
  
  public removeIngredient(element: any) {
    this.ingredientList.data = this.ingredientList.data.filter(item => item !== element);
  }

  public finish(): void {
    console.log(12345);
  }

  public cancel(): void {
    console.log(5678);
  }
}
