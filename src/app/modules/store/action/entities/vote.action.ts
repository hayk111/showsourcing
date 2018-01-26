import { AppComment } from '../../model/entities/comment.model';
import { EntityTarget } from '../../utils/entities.utils';
import { Vote } from '../../model/entities/vote.model';



export enum ActionType {
	LOAD = '[Vote] loading',
	SET = '[Vote] setting (keeping pendings)',
	ADD_NEW = '[Vote] Adding new',
	ADD_PENDING = '[Vote] Adding pending',
	CLEAR = '[Vote] clearing'
}


export class VoteActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}

	static setVote(votes: Array<Vote>) {
		return {
			type: ActionType.SET,
			payload: votes
		};
	}

	static clear() {
		return {
			type: ActionType.CLEAR
		};
	}

	static addNew(vote: Vote) {
		return {
			type: ActionType.ADD_NEW,
			payload: vote
		};
	}

	static addPending(vote: Vote) {
		return {
			type: ActionType.ADD_PENDING,
			payload: vote
		};
	}

}
