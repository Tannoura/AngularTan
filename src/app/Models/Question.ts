// question.model.ts

import { Response } from "./Response";

export class Question {
    id: number;
    questionTitle: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: Response ;
    difficultylevel: string;
    category: string;

  }
  