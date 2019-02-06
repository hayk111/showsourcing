import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment, EntityMetadata, Product, Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { FormControl } from '@angular/forms';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from '~core/entity-services';

@Component({
	selector: 'activity-list-app',
	templateUrl: './activity-list.component.html',
	styleUrls: ['./activity-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent extends TrackingComponent implements OnInit {

	@Input() entity: Product | Supplier;
	@Input() activities: Comment[];
	@Input() typeEntity: EntityMetadata;
	commentCtrl = new FormControl();

	constructor(
		private commentSrv: CommentService,
		private ermSrv: ERMService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
	}

	send() {
		const comment = new Comment({ text: this.commentCtrl.value });
		const commentUser = { ...comment, createdBy: { id: this.userSrv.userSync.id } };
		const comments = [...(this.entity.comments || [])];
		comments.push(commentUser);
		this.commentCtrl.reset();
		const entitySrv = this.ermSrv.getGlobalServiceForEntity(this.entity);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => entitySrv.update({ id: this.entity.id, comments }))
		).subscribe();
	}

}

