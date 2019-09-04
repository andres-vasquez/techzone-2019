import {Injectable} from '@angular/core';
import {BaseViewModel} from '../base.view-model';
import {interval, Observable} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {LiveViewModel} from './live.view-model';
import {Feedback, TechTackLive} from '../../model/tech-talk.model';
import {RepositoryService} from '../../repository/repository.service';
import {RepositoryI} from '../../repository/repository-i.model';
import {FeedbackEntry, LiveScheduleItem} from '../../model/api/techzone-api.model';
import {DataUtils} from '../../utils/data.utils';
import {filter} from 'rxjs/internal/operators/filter';

/**
 * Service (single instance) for Live viewModel
 */
@Injectable()
export class LiveService extends BaseViewModel implements LiveViewModel {
    // Repository contract interface
    repository: RepositoryI;

    constructor(repository: RepositoryService) {
        super();
        this.repository = repository;
    }

    /**
     * Get time observable
     * @param startTime Starting time/current from UI
     */
    getTime(startTime?: Date): Observable<Date> {
        return interval(1000)
            .pipe(
                map((tick: number): Date => {
                    // Convert tick to Date
                    if (startTime) {
                        const newTime = startTime.getTime() + (tick * 1000);
                        return new Date(newTime);
                    } else {
                        return new Date();
                    }
                })
            );
    }

    /**
     * Get Live TechTalk item ready to display
     * @param startTime Starting time/current from UI
     */
    getLiveItem(startTime?: Date): Observable<TechTackLive> {
        return this.getTime(startTime)
            .pipe(
                filter(newDate => newDate.getSeconds() === 0), // Dates with 00 seconds (every minute)
                concatMap((date: Date): Observable<TechTackLive> => {
                    // Concat with liveScheduleItem
                    return this.repository.getLiveSchedule(date)
                        .pipe(
                            // Convert LiveScheduleItem to TechTackLive obj
                            map((item: LiveScheduleItem) => DataUtils.mapLiveSheduleItemToLiveTechTalk(item))
                        );
                })
            );
    }

    /**
     * Function to send feedback obj across layers
     * @param feedback Obk with feedback info
     */
    sendFeedBack(feedback: Feedback): Observable<boolean> {
        const feedbackEntry: FeedbackEntry = {
            _id: feedback._id,
            email: feedback.email,
            qualification: feedback.qualification,
            mobileDate: new Date()
        };

        return this.repository.sendFeedBack(feedbackEntry);
    }
}
