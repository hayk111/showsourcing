import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '~global-services';
import { User } from '~models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-summary-app',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {
  user$: Observable<User>;
  tasks = [

  ]
  constructor(private userSrv: UserService) { }

  ngOnInit() {
    this.user$ = this.userSrv.selectUser();
  }

}
