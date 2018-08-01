import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'show-list-app',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent implements OnInit {
  @Input() items = [];
  constructor() { }

  ngOnInit() {
  }


  getGradient(item: any) {
    return `linear-gradient(${item.description.secondaryColor}, ${item.description.primaryColor})`;
  }
}
