import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {LocalService} from './local.service';
import {Observable} from 'rxjs';
import {RepositoryI} from './repository-i.model';
import {FeedbackEntry, LiveScheduleItem, ScheduleItem} from '../model/api/techzone-api.model';
import {concat} from 'rxjs/internal/observable/concat';
import {concatMap, tap} from 'rxjs/operators';

@Injectable()
export class RepositoryService implements RepositoryI {

    constructor(private api: ApiService, private local: LocalService) {
    }

    /**
     * Function to getSchedule from local and API call
     * When the API call is successfully update the local results
     */
    getSchedule(): Observable<Array<ScheduleItem>> {
        return concat(
            this.local.getSchedule(), // First local
            this.api.getSchedule() // Then via API
                .pipe(
                    // If results save that locally
                    tap((items: Array<ScheduleItem>) => this.local.saveSchedule(items).subscribe())
                ));
    }

    /**
     * Function to getLiveSchedule from local and API call
     * @param date current date From UI
     */
    getLiveSchedule(date: Date): Observable<LiveScheduleItem> {
        return concat(
            this.local.getLiveSchedule(date), // First local
            this.api.getLiveSchedule(date) // Then via API
        );
    }

    /**
     * Function to send the feedback to local and server
     * Step 1: Save locally
     * Step 2: Send to server (Firebase)
     * Step 3: Update locally with Audit info
     * @param feedback Obj with feedback info
     */
    sendFeedBack(feedback: FeedbackEntry): Observable<boolean> {
        const localFeedback = {...feedback};
        localFeedback.synced = false;

        // Save locally
        return this.local.sendFeedBack(localFeedback)
            .pipe(
                // Then send to the server
                concatMap(() =>
                    this.api.sendFeedBack(feedback)
                        .pipe(
                            // Then update locally
                            tap(() => {
                                // Update the localStorage with audit data
                                feedback.synced = true;
                                feedback.syncTime = new Date();
                                this.local.updateFeedbackSent(feedback).subscribe();
                            })
                        ))
            );
    }
}
