import { Pagination } from "../../helpers/interfaces/pagination";

export interface searchRecipeDTO extends Pagination {
  recipeName?: string;
  recipeDateStart?: Date;
  recipeDateEnd?: Date;
}
