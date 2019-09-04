import {Observable} from 'rxjs';
import {FeedbackEntry, LiveScheduleItem, ScheduleItem} from '../model/api/techzone-api.model';

/**
 * Contract for Repository layer components
 */
export interface RepositoryI {

    /**
     * Get agenda
     */
    getSchedule(): Observable<Array<ScheduleItem>>;

    /**
     * Get Live agenda item
     * @param date Current date from UI
     */
    getLiveSchedule(date: Date): Observable<LiveScheduleItem>;

    /**
     * Send feedback method
     * @param feedback Obj with feedback information
     */
    sendFeedBack(feedback: FeedbackEntry): Observable<boolean>;
}
