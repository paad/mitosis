import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  Output,
  EventEmitter,
  Component,
  ViewChild,
  ElementRef,
  Input,
  ViewContainerRef,
  TemplateRef,
  SimpleChanges,
} from "@angular/core";

export type Props = {
  getValues?: (input: string) => Promise<any[]>;
  renderChild?: any;
  transformData?: (item) => string;
};

@Component({
  selector: "auto-complete",
  template: `
    <ng-template #renderchildTemplate></ng-template>
    <div class="div">
      Autocomplete:

      <div class="div-2">
        <input
          placeholder="Search for a U.S. university"
          class="input"
          [attr.value]="inputVal"
          (change)="inputVal = $event.target.value"
          (focus)="showSuggestions = true"
        />
        <button
          class="button"
          (click)="
          inputVal = '';
          showSuggestions = false;
        "
        >
          X
        </button>
      </div>
      <ng-container *ngIf="suggestions.length > 0 && showSuggestions">
        <ul class="ul">
          <ng-container
            *ngFor="let item of suggestions; index as idx; trackBy: trackByItem0"
          >
            <li class="li" (click)="handleClick(item)">
              <ng-container *ngIf="renderChild">
                <ng-container
                  *ngComponentOutlet="
              renderChild;
              inputs: { item: item };
              content: myContent;
              "
                ></ng-container>
              </ng-container>
              <ng-container *ngIf="!(renderChild)">
                <span>{{transform(item)}}</span>
              </ng-container>
            </li>
          </ng-container>
        </ul>
      </ng-container>
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
        position: relative;
        display: flex;
        gap: 16px;
        align-items: stretch;
      }
      .input {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.25rem;
        border-width: 1px;
        border-color: #000000;
        width: 100%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .button {
        cursor: pointer;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.25rem;
        color: #ffffff;
        background-color: #ef4444;
      }
      .ul {
        border-radius: 0.25rem;
        height: 10rem;
        margin: unset;
        padding: unset;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .li {
        display: flex;
        padding: 0.5rem;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #e5e7eb;
        cursor: pointer;
      }
      .li:hover {
        background-color: #f3f4f6;
      }
    `,
  ],
})
export default class AutoComplete {
  @Input() renderChild!: Props["renderChild"];

  @Output() getValues = new EventEmitter();
  @Output() transformData = new EventEmitter();

  @ViewChild("renderchildTemplate", { static: true })
  renderchildTemplateRef!: TemplateRef<any>;

  myContent?: any[][];

  showSuggestions = false;
  suggestions = [];
  inputVal = "";
  setInputValue(value: string) {
    this.inputVal = value;
  }
  handleClick(item) {
    this.setInputValue(this.transform(item));
    this.showSuggestions = false;
  }
  fetchVals(city: string) {
    if (this.getValues) {
      return this.getValues.emit(city);
    }
    return fetch(
      `http://universities.hipolabs.com/search?name=${city}&country=united+states`
    ).then((x) => x.json());
  }
  transform(x) {
    return this.transformData ? this.transformData.emit(x) : x.name;
  }
  trackByItem0(idx, item) {
    return idx;
  }

  constructor(private vcRef: ViewContainerRef) {}

  ngOnInit() {
    this.myContent = [
      this.vcRef.createEmbeddedView(this.renderchildTemplateRef).rootNodes,
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.fetchVals(this.inputVal).then((newVals) => {
        if (!newVals?.filter) {
          console.error("Invalid response from getValues:", newVals);
          return;
        }
        this.suggestions = newVals.filter((data) =>
          this.transform(data)
            .toLowerCase()
            .includes(this.inputVal.toLowerCase())
        );
      });
    }
  }
}

@NgModule({
  declarations: [AutoComplete],
  imports: [CommonModule],
  exports: [AutoComplete],
})
export class AutoCompleteModule {}
