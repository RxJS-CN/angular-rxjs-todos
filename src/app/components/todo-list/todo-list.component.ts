import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: 'todo-list.component.html'
})

export class TodoListComponent implements OnInit, OnDestroy {

  currentStatus = '';
  isAllCompleted: boolean;
  visibleTodos: Todo[] = [];
  todosSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit() {

    this.todosSubscription = this.todoService.todos$
        .combineLatest(this.route.params.map(params => params.status))
        .subscribe(([todos, status]) => {
          this.currentStatus = status;
          this.isAllCompleted = todos.length === todos.filter(todo => todo.completed).length;
          switch (this.currentStatus) {
            case 'active':
              this.visibleTodos = todos.filter(todo => !todo.completed);
              break;
            case 'completed':
              this.visibleTodos = todos.filter(todo => todo.completed);
              break;
            default:
              this.visibleTodos = todos;
              break;
          }
        });

    // this.todoService.loadPersistTodos();
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
  }

  remove(uuid: string): void {
    this.todoService.remove(uuid);
  }

  toggle(uuid: string): void {
    this.todoService.toggle(uuid);
  }

  toggleAll(completed: boolean): void {
    this.todoService.toggleAll(completed);
  }

  update(todo: Todo): void {
    this.todoService.modify(todo);
  }

}
