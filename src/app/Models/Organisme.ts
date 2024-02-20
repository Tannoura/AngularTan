import { Formation } from "./Formation";

export class Organisme {
  id: number;
  nom: string;
  adresse: string;
  telephone: number;
  description: string;
  email: string;
  formations?: Formation; 

  
}
  