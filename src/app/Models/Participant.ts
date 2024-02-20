import { Facture } from "./Facture";
import { Quiz } from "./Quiz";
import { Session } from "./Session";

export class Participant {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    email: string;
    telephone: number;
    session: Session;  
    quizs?: Quiz;      
    facture?: Facture;  
  }
  