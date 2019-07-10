import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_FILE_ICON } from '~shared/image/img.const';

@Component({
  selector: 'no-file-placeholder-app',
  templateUrl: './no-file-placeholder.component.html',
  styleUrls: ['./no-file-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoFilePlaceholderComponent implements OnInit {
  defaultImg = DEFAULT_FILE_ICON;

  constructor() { }

  ngOnInit() {
  }

}
