export class User {
  id : number | undefined;
  username : String | undefined;
  email : String | undefined;
  password : String | undefined;
  password_confirm : String | undefined;
  date_joined : Date | undefined;
  oldPassword !: string;
  newPassword !: string;
}
