import {Observable} from 'rxjs';
import {Feedback, TechTackLive} from '../../model/tech-talk.model';

/**
 * Interface to encapsulate the LiveSchedule viewModel
 */
export interface LiveViewModel {

    /**
     * Get time observable
     * @param startTime Starting time/current from UI
     */
    getTime(startTime?: Date): Observable<Date>;

    /**
     * Get Live TechTalk item ready to display
     * @param startTime Starting time/current from UI
     */
    getLiveItem(startTime?: Date): Observable<TechTackLive>;

    /**
     * Function to send feedback obj across layers
     * @param feedback Obk with feedback info
     */
    sendFeedBack(feedback: Feedback): Observable<boolean>;
}
