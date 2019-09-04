import {Injectable} from '@angular/core';
import {RepositoryI} from './repository-i.model';
import {Observable, Observer} from 'rxjs';
import {FeedbackEntry, LiveScheduleItem, ScheduleItem} from '../model/api/techzone-api.model';
import {LOCAL_STORAGE} from '../app.constants';
import {finalize, switchMap} from 'rxjs/operators';
import {DataUtils} from '../utils/data.utils';
import {LocalStorageUtils} from '../utils/local-storage.utils';
import {Storage} from '@ionic/storage';

/**
 * Used in Repository Layer with local data --> Cache/localStorage
 */
@Injectable()
export class LocalService implements RepositoryI {

    // storageUtils helper
    private storageUtils: LocalStorageUtils;

    constructor(public storage: Storage) {
        this.storageUtils = new LocalStorageUtils(storage);
    }

    /**
     * Function to get all the Schedule Items sorted from previous network call
     */
    getSchedule(): Observable<Array<ScheduleItem>> {
        return this.storageUtils.getItem(LOCAL_STORAGE.KEY_SCHEDULE);
    }

    /**
     * Function to get a single Schedule Item without Feedback list --> Local only
     * Will send error if no item in the current date
     * @param date Current date from UI
     */
    getLiveSchedule(date: Date): Observable<LiveScheduleItem> {
        return this.getSchedule()
            .pipe(
                switchMap((items: Array<ScheduleItem>): Observable<ScheduleItem> => {
                    // Convert Array<ScheduleItem> --> LiveScheduleItem
                    return new Observable((observer: Observer<ScheduleItem>) => {
                        if (items && items.length) {
                            const currentItem = items.find((item: ScheduleItem) => {
                                return DataUtils.betweenDate(date, item.initialHour, item.finalHour);
                            });

                            if (currentItem) {
                                observer.next(currentItem);
                                observer.complete();
                            } else {
                                observer.error('Local: No items for now');
                            }
                        }
                    });
                }));
    }

    saveSchedule(items: Array<ScheduleItem>): Observable<boolean> {
        return this.storageUtils.saveItem(LOCAL_STORAGE.KEY_SCHEDULE, items);
    }

    sendFeedBack(feedback: FeedbackEntry): Observable<boolean> {
        return this.storageUtils.saveItem(LOCAL_STORAGE.KEY_FEEDBACK, feedback, true);
    }

    updateFeedbackSent(feedback: FeedbackEntry): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.storageUtils.getItem(LOCAL_STORAGE.KEY_FEEDBACK).subscribe((items: Array<FeedbackEntry>) => {
                if (items && items.length) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i]._id === feedback._id) {
                            items[i] = {...feedback};
                        }
                    }
                    this.storageUtils.saveItem(LOCAL_STORAGE.KEY_FEEDBACK, items)
                        .pipe(
                            finalize(() => {
                                observer.next(true);
                                observer.complete();
                            })
                        ).subscribe();
                } else {
                    observer.next(false);
                    observer.complete();
                }
            });
        });
    }
}
