import { CronJob } from 'cron';
import { job } from './job';

//get closing time from schedule.json

export const cronJob = new CronJob('30 18 * * *', job());
