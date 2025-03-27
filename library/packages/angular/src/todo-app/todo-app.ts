import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";

@Component({
  selector: "todo-app",
  template: `
    <div class="div">
      <span>TO-DO list:</span>
      <div class="div-2">
        <input
          placeholder="Add a new item"
          class="input"
          [attr.value]="newItemName"
          (change)="newItemName = $event.target.value"
        />
        <button class="button" (click)="addItem()">Add</button>
      </div>
      <div class="div-3">
        <ul class="ul">
          <ng-container
            *ngFor="let item of list; index as idx; trackBy: trackByItem0"
          >
            <li class="li">
              <span>{{item}}</span>
              <button
                class="button-2"
                (click)="
          deleteItem(idx);
        "
              >
                Delete
              </button>
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .div {
        padding: 10px;
        max-width: 700px;
      }
      .div-2 {
        display: flex;
        width: 100%;
        gap: 16px;
        align-items: stretch;
      }
      .input {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.25rem;
        flex-grow: 1;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .button {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.25rem;
        font-weight: 700;
        color: #ffffff;
        background-color: #3b82f6;
        cursor: pointer;
      }
      .div-3 {
        margin-top: 1rem;
      }
      .ul {
        border-radius: 0.25rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin: unset;
        padding: unset;
      }
      .li {
        display: flex;
        padding: 0.625rem;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #e5e7eb;
        gap: 16px;
      }
      .button-2 {
        cursor: pointer;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.25rem;
        color: #ffffff;
        background-color: #ef4444;
      }
    `,
  ],
})
export default class TodoApp {
  list = ["hello", "world"];
  newItemName = "";
  addItem() {
    if (!this.newItemName) {
      return;
    }
    this.list = [...this.list, this.newItemName];
  }
  deleteItem(idx: number) {
    this.list = this.list.filter((x, i) => i !== idx);
  }
  trackByItem0(idx, item) {
    return idx;
  }
}

@NgModule({
  declarations: [TodoApp],
  imports: [CommonModule],
  exports: [TodoApp],
})
export class TodoAppModule {}
