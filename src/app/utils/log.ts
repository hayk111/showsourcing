import { environment } from 'environments/environment';
import { Log } from '~utils/logger/log.class';

// using an instance so the logger can be used in other projects
export const log = new Log(environment.LOG_LEVEL);