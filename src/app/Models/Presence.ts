import { Session } from "./Session";
import { User } from "./User";

export class Presence {
    id: number;
  user: User; // Assurez-vous d'importer le modèle User s'il existe
  session: Session; // Assurez-vous d'importer le modèle Session s'il existe
  present: boolean;
    
    }
  