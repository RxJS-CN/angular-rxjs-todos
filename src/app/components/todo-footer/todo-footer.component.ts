import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-footer',
  templateUrl: 'todo-footer.component.html'
})

export class TodoFooterComponent implements OnInit {

  currentStatus = '';
  hasCount: boolean;
  hasCompleted: boolean;
  remainintCount: number;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.route.params
        .map(params => params.status)
        .subscribe(status => this.currentStatus = status || '');

    this.todoService.todos$
        .subscribe(todos => {
          this.hasCount = !!todos.length;
          this.hasCompleted = !!todos.filter(todo => todo.completed).length;
          this.remainintCount = todos.filter(todo => !todo.completed).length;
        });
  }

  removeCompleted(): void {
    this.todoService.removeCompleted();
  }

}
