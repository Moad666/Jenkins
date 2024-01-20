import { Recipe } from "./recipe";
import { User } from "./user";

export class Rating {
  id !: number;
  rate !: number;
  user !: User;
  recipe !: Recipe;
}
