export class Recipe {
  id !: number;
  Title : String | undefined;
  Description : String | undefined;
  Ingredients : String | undefined;
  image : String | undefined;
  commentCount: number | undefined;
  ratingCount : number | undefined;
}
