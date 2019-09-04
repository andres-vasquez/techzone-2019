import {Observable} from 'rxjs';
import {TechTalkModel} from '../../model/tech-talk.model';

/**
 * Interface to encapsulate the Schedule viewModel
 */
export interface ScheduleViewModel {

    /**
     * Get Schedule Items (agenda)
     */
    getScheduleItems(): Observable<Array<TechTalkModel>>;
}
