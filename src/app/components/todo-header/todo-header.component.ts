import { Component } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-header',
  templateUrl: 'todo-header.component.html'
})

export class TodoHeaderComponent {

  newTodoText = '';

  constructor(private todoService: TodoService) { }

  addTodo(title: string): void {
    this.todoService.addTodo(title);
    this.newTodoText = '';
  }
}
