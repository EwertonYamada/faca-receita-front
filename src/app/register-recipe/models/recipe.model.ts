import { Ingredient } from "./ingredient.model";

export interface Recipe {
  id?: number | null;
  name: string;
  category: string;
  yieldType: string;
  recipeYield: string;
  description: string;
  ingredients: Ingredient[];
  preparationTime: string;
  preparationInstructions: string;
}