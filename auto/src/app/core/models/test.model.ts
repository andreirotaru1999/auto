import { Question } from "./question.model";

export interface Test {
  id?: string;
  startedOn?: Date;
  score?: number;
  answers?: string;
  questions?:Question[];
}
