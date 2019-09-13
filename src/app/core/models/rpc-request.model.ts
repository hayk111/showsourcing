import { ID } from '~utils';

export enum RPCRequestStatus {
	PENDING = 'pending',
	PROCESSING = 'processing',
	READY = 'ready',
	ERROR = 'error'
}

export enum RPCActionTypes {
	MERGE_CATEGORY = 'MERGE_CATEGORY',
	MERGE_TAG = 'MERGE_TAG',
	MERGE_EVENT = 'MERGE_EVENT',
	MERGE_SUPPLIER = 'MERGE_SUPPLIER',
	GET_TEAM_STATS = 'GET_TEAM_STATS'
}

export interface IRPCRequest {
	id: ID;
	action: RPCActionTypes;
	reply?: string;
	status: RPCRequestStatus;
}

export class RPCRequest implements IRPCRequest {
	public id: ID;
	public action: RPCActionTypes;
	public reply?: string;
	public status: RPCRequestStatus;

	constructor(req: IRPCRequest) {
		this.id = req.id;
		this.action = req.action;
		this.reply = req.reply;
		this.status = req.status;
	}

	get isReady() {
		return this.status === RPCRequestStatus.READY;
	}
}


