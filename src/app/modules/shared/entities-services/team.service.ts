import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUserTeamId } from '../../store/selectors/user.selector';
import { distinct } from 'rxjs/operators/distinct';
import { switchMap } from 'rxjs/operators/switchMap';
import { TeamActions } from '../../store/action/team.action';
import { concat } from 'rxjs/operators/concat';
import { merge, zip, filter } from 'rxjs/operators';

@Injectable()
export class TeamService {


}
