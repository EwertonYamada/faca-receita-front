export interface RecipeListResponseDTO {
  id: number,
  name: string,
  category: string,
  yieldType: string,
  recipeYield: number,
  preparationTime: number,
  createdAt: Date,
}