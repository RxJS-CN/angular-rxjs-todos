import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.component.html'
})

export class TodoItemComponent {

  editing = false;

  @Input() todo: Todo;

  @Output() handleToggle = new EventEmitter();

  @Output() handleRemove = new EventEmitter();

  @Output() handleModify = new EventEmitter();

  constructor() { }

  cancelEditing(): void {
    this.editing = false;
  }

  edit(): void {
    this.editing = true;
  }

  remove(): void {
    this.handleRemove.next(this.todo.id);
  }

  stopEditing(newTitle: string): void {
    this.todo.title = newTitle;
    this.editing = false;

    if (this.todo.title.length) {
      this.update();
    } else {
      this.remove();
    }
  }

  toggle(): void {
    this.handleToggle.next(this.todo.id);
  }

  update(): void {
    this.handleModify.next(this.todo);
  }

}
