import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { Todo } from '../models/todo.model';

const initialTodos: Todo[] = JSON.parse(localStorage.getItem('angular-rxjs-todos')) || [];

type TodosOperation = (todos: Todo[]) => Todo[];

@Injectable()
export class TodoService {

  todos$: Observable<Todo[]>;

  update$: BehaviorSubject<TodosOperation> = new BehaviorSubject<TodosOperation>((todos: Todo[]) => todos);

  createTodo$: Subject<Todo> = new Subject<Todo>();

  modifyTodo$: Subject<Todo> = new Subject<Todo>();

  removeCompletedTodo$: Subject<null> = new Subject<null>();

  removeTodo$: Subject<string> = new Subject<string>();

  toggleTodo$: Subject<string> = new Subject<string>();

  toggleAllTodos$: Subject<boolean> = new Subject<boolean>();

  create$: Subject<Todo> = new Subject<Todo>();

  modify$: Subject<Todo> = new Subject<Todo>();

  removeCompleted$: Subject<null> = new Subject<null>();

  remove$: Subject<string> = new Subject<string>();

  toggle$: Subject<string> = new Subject<string>();

  toggleAll$: Subject<boolean> = new Subject<boolean>();

  immortalSubscriber: Subscription;

  constructor() {

    this.todos$ = this.update$
        .scan((todos: Todo[], operation: TodosOperation) => operation(todos), initialTodos)
        .publishReplay(1)
        .refCount();

    this.todos$.forEach(todos => localStorage.setItem('angular-rxjs-todos', JSON.stringify(todos)));

    this.create$
        .map((todo: Todo): TodosOperation => {
          return (todos: Todo[]) => todos.concat(todo);
        })
        .subscribe(this.update$);

    this.modify$
        .map((todo: Todo): TodosOperation => {
          return (todos: Todo[]) => {
            const modifyTodo = todos.find(t => t.id === todo.id);
            modifyTodo.title = todo.title;
            return todos;
          };
        })
        .subscribe(this.update$);

    this.removeCompleted$
        .map((): TodosOperation => (todos: Todo[]) => todos.filter(todo => !todo.completed))
        .subscribe(this.update$);

    this.remove$
        .map((uuid: string): TodosOperation => (todos: Todo[]) => todos.filter(todo => todo.id !== uuid))
        .subscribe(this.update$);

    this.toggle$
        .map((uuid: string): TodosOperation => {
          return (todos: Todo[]) => {
            const todo = todos.find(t => t.id === uuid);
            todo.completed = !todo.completed;
            return todos;
          };
        })
        .subscribe(this.update$);

    this.toggleAll$
        .map((completed: boolean): TodosOperation => {
          return (todos: Todo[]) => {
            todos.forEach(todo => todo.completed = completed);
            return todos;
          };
        })
        .subscribe(this.update$);

    this.createTodo$
        .subscribe(this.create$);

    this.modifyTodo$
        .subscribe(this.modify$);

    this.removeCompletedTodo$
        .subscribe(this.removeCompleted$);

    this.removeTodo$
        .subscribe(this.remove$);

    this.toggleTodo$
        .subscribe(this.toggle$);

    this.toggleAllTodos$
        .subscribe(this.toggleAll$);

  }

  addTodo(title: string): void {
    this.createTodo$.next(new Todo(title));
  }

  modify(todo: Todo): void {
    this.modifyTodo$.next(todo);
  }

  remove(uuid: string): void {
    this.removeTodo$.next(uuid);
  }

  removeCompleted(): void {
    this.removeCompletedTodo$.next();
  }

  toggle(uuid: string): void {
    this.toggleTodo$.next(uuid);
  }

  toggleAll(completed: boolean): void {
    this.toggleAllTodos$.next(completed);
  }

}
