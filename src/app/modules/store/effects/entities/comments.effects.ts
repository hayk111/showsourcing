import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityTarget } from '../../utils/entities.utils';
import { CommentService } from '../../services/comment.service';
import { withLatestFrom } from 'rxjs/operators';
import { ActionType, CommentActions } from '../../action/entities/comment.action';
import { AppComment } from '../../model/entities/comment.model';
import { TargetService } from '../../services/target.service';
import { startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AddTarget } from '../../utils/target.utils';



@Injectable()
export class CommentEffects {

	constructor(private actions$: Actions, private srv: CommentService,
		 private targetSrv: TargetService, private store: Store<any>) {}
}
