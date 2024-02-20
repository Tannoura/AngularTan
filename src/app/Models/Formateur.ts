import { Formation } from "./Formation";

export class Formateur {
        id: number;
        nom: string;
        prenom: string;
        specialite: string;
        formation?: Formation;  // Assuming Formation is another TypeScript model
      }
  