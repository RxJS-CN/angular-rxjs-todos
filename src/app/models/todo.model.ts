import * as uuid from 'node-uuid';

export class Todo {
  id: string;
  title: string;
  completed: boolean;

  constructor(title: string) {
    this.id = uuid.v4();
    this.title = title;
    this.completed = false;
  }
}
