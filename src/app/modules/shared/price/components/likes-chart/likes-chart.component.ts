// import { Component, OnInit } from '@angular/core';
// import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
// import { Store } from '@ngrx/store';
// import { selectVotesArrayForSelection, selectVotesForCurrentTarget } from '../../../../store/selectors/target/target.selector';
// import { Vote } from '../../../../store/model/entities/vote.model';
// import { entityStateToArray, EntityState } from '../../../../store/utils/entities.utils';
// import { User } from '../../../../store/model/entities/user.model';
// import { selectTeamMembers } from '../../../../store/selectors/entities/team-members.selector';
// import { tap } from 'rxjs/operators';

// @Component({
// 	selector: 'likes-chart-app',
// 	templateUrl: './likes-chart.component.html',
// 	styleUrls: ['./likes-chart.component.scss'],
// })
// export class LikesChartComponent implements OnInit {
// 	view: any[] = [150, 150];
// 	votes = [];
// 	positiveVotes = [];
// 	negativeVotes = [];
// 	neutralVotes = [];
// 	detailsShown = false;
// 	pending = true;
// 	teamMembers: EntityState<User>;

// 	result = [
// 		{
// 			'name': 'like',
// 			'value': 0
// 		},
// 		{
// 			'name': 'neutral',
// 			'value': 0
// 		},
// 		{
// 			'name': 'Despise',
// 			'value': 0
// 		}
// 	];


// 	constructor(private store: Store<any>) {

// 	}

// 	ngOnInit() {
// 		this.store.select(selectTeamMembers).subscribe(users => this.teamMembers = users);
// 		// votes are value 100 for positive 0 for negative and no value for neutral
// 		this.store.select(selectVotesForCurrentTarget).subscribe( (voteState: any) => {
// 			this.pending = voteState.pending;
// 			const votes = entityStateToArray(voteState);
// 			this.votes = [];
// 			this.reset();
// 			votes.forEach((v: Vote) => {
// 				this.votes.push(v);
// 				switch (v.value) {
// 					case 100 :
// 						this.result[0].value++;
// 						this.positiveVotes.push(v);
// 						break;
// 					case 0:
// 						this.result[2].value++;
// 						this.negativeVotes.push(v);
// 						break;
// 					default:
// 						this.result[1].value++;
// 						this.neutralVotes.push(v);
// 						break;
// 				}
// 			});
// 		});
// 	}

// 	reset() {
// 		this.result.forEach(r => r.value = 0);
// 		this.positiveVotes = [];
// 		this.negativeVotes = [];
// 		this.neutralVotes = [];
// 	}

// 	get positivePercentage() {
// 		return this.result[0].value / this.votes.length;
// 	}

// 	showDetails() {
// 		this.detailsShown = true;
// 	}

// }
