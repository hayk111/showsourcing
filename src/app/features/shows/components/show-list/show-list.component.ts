import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'show-list-app',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent implements OnInit {
  @Input() items = [];
  @Input() pending: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }


  goToDetail(item: any) {
    this.router.navigate([item.id], { relativeTo: this.route })
  }
}
