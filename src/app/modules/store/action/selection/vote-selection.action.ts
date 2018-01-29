import { Vote } from '../../model/entities/vote.model';

export enum ActionType {
	LOAD = '[VoteSelection] loading',
	ADD = '[VoteSelection] adding',
	CREATE = '[VoteSelection] creating',
	RESET = '[VoteSelection] resetting'
}

export class VoteSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static create(vote: Vote) {
		return {
			type: ActionType.CREATE,
			payload: vote
		};
	}

	static add(votes: Array<Vote>) {
		return {
			type: ActionType.ADD,
			payload: votes
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}
}
