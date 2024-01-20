import { Recipe } from "./recipe";
import { User } from "./user";

export class Commentaire {
  id : number | undefined;
  text : String | undefined;
  user : User | undefined;
  recipe : Recipe | undefined
}
