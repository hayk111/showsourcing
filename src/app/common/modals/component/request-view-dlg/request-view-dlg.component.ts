import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'request-view-dlg-app',
  templateUrl: './request-view-dlg.component.html',
  styleUrls: ['./request-view-dlg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestViewDlgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
