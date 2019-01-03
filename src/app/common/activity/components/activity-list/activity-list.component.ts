import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment, EntityMetadata, Product, Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { FormControl } from '@angular/forms';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { switchMap } from 'rxjs/operators';

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
		private ermSrv: ERMService
	) {
		super();
	}

	ngOnInit() {
	}

	send() {
		const comment = new Comment({ text: this.commentCtrl.value });

		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.addToEntity(comment))
		).subscribe(_ => this.commentCtrl.reset());
	}

	addToEntity(comment: Comment) {
		// getting the correct srv for that entity
		const entitySrv = this.ermSrv.getGlobalServiceForEntity(this.entity);
		// adding the comment to its list of comments
		const comments = [...this.entity.comments, comment].map(c => ({ id: c.id }));
		// updating it
		return entitySrv.update({ id: this.entity.id, comments });
	}

}

