import { Vote } from '../../model/entities/vote.model';

export enum ActionType {
	LOAD = '[VoteSelection] loading',
	SET = '[VoteSelection] setting',
	ADD = '[VoteSelection] adding',
	RESET = '[VoteSelection] resetting',
}

// TODO: Cedric supprimer le flux des VOTES

export class VoteSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD,
		};
	}

	static set(vote: Vote) {
		return {
			type: ActionType.SET,
			payload: vote,
		};
	}

	static add(vote: Vote) {
		return {
			type: ActionType.ADD,
			payload: vote,
		};
	}

	static reset() {
		return {
			type: ActionType.RESET,
		};
	}
}
