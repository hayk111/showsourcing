import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-merge-dialog',
  templateUrl: './merge-dialog.component.html',
  styleUrls: ['./merge-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
