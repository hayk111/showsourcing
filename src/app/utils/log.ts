import { log } from '~utils';
import { environment } from 'environments/environment.prod';

// using an instance so the logger can be used in other projects
export const log = new Log(environment.LOG_LEVEL);