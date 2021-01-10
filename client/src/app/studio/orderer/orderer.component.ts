import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { GenericControlProvider, GenericControlValueAccessor } from './DefaultControlValueAccessor';


interface OrderErElement {
  img: string;
  text: string;
  hover?: string;
  value: any;
}

@Component({
  selector: 'app-orderer',
  templateUrl: './orderer.component.html',
  styleUrls: ['./orderer.component.scss'],
  providers: [GenericControlProvider(OrdererComponent)]
})
export class OrdererComponent<T> extends GenericControlValueAccessor<T[]> implements OnInit {
  // @Input()
  // initial: string[];
  @Input()
  list: T[] = [];
  @Input()
  getImg: (v: T) => string = (v: T) => '';
  @Input()
  getText: (v: T) => string = (v: T) => '';

  constructor() { super() }

  get value(): T[] {
    return this.val;
  }

  get isLandscape() {
    return window.innerHeight < window.innerWidth
  }

  set value(v: T[]) {
    // TODO: any logic for setting the value
    this.val = v;
    this._changeHandler(v);

    // TODO: any conditional or transform logic
    // this.list = v.map(s => ({img: s, value: s, text: s.substring(s.lastIndexOf('/')+1)}));
  }

  _setDisabledState(isDisabled) {
    // TODO: disable the drag-drop thing
  }

  ngOnInit(): void {
  }

  deleteAt(i: number) {
    this.val.splice(i, 1);
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.val, event.previousIndex, event.currentIndex);

    console.log(this.val);
  }
}
