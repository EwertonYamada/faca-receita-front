import { Ingredient } from "./ingredient.model";

export interface Recipe {
  id?: number | null;
  name: string;
  description: string;
  yieldType: string;
  recipeYield: string;
  preparationInstructions: string;
  preparationTime: string;
  ingredients: Ingredient[];
}