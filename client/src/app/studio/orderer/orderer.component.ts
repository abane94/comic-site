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
export class OrdererComponent extends GenericControlValueAccessor<string[]> implements OnInit {
  // @Input()
  // initial: string[];
  @Input()
  list: {
    img: string;
    text: string;
    hover?: string;
    value: any;
  }[];
  constructor() { super() }

  get value(): string[] {
    return this.val;
  }

  get isLandscape() {
    return window.innerHeight < window.innerWidth
  }

  set value(v: string[]) {
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

  // tslint:disable:max-line-length
  // movies = [
  //   {
  //     title: 'Episode I - The Phantom Menace',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
  //   },
  //   {
  //     title: 'Episode II - Attack of the Clones',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg'
  //   },
  //   {
  //     title: 'Episode III - Revenge of the Sith',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
  //   },
  //   {
  //     title: 'Episode IV - A New Hope',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
  //   },
  //   {
  //     title: 'Episode V - The Empire Strikes Back',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
  //   },
  //   {
  //     title: 'Episode VI - Return of the Jedi',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
  //   },
  //   {
  //     title: 'Episode VII - The Force Awakens',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
  //   },
  //   {
  //     title: 'Episode VIII - The Last Jedi',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
  //   },
  //   {
  //     title: 'Episode IX – The Rise of Skywalker',
  //     poster: 'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg'
  //   }
  // ];
  // tslint:enable:max-line-length

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.val, event.previousIndex, event.currentIndex);

    console.log(this.val);
  }
}
