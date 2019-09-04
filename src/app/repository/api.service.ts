import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RepositoryI} from './repository-i.model';
import {FeedbackEntry, LiveScheduleItem, ScheduleItem} from '../model/api/techzone-api.model';
import {API, FIREBASE} from '../app.constants';
import {Observable, Observer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DataUtils} from '../utils/data.utils';
import {AngularFireDatabase} from '@angular/fire/database';
import {concatMap} from 'rxjs/internal/operators/concatMap';

/**
 * Used in Repository Layer with external calls: WebService & Firebase
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService implements RepositoryI {


    constructor(private httpClient: HttpClient, private firebase: AngularFireDatabase) {
    }

    /**
     * Function to get all the Schedule Items sorted by date ASC
     */
    getSchedule(): Observable<Array<ScheduleItem>> {
        const url = API.BASE_URL + API.METHOD.PRESENTATIONS;
        return this.httpClient.get<Array<ScheduleItem>>(url, {headers: this.getHeaders(), params: this.getParams()})
            .pipe(
                // Sort by time
                map((items) => DataUtils.sortScheduleByInitialHour(items))
            );
    }

    /**
     * Function to get a single Schedule Item with Feedback list.
     * Will send error if no item in the current date
     * @param date Current date from UI
     */
    getLiveSchedule(date: Date): Observable<LiveScheduleItem> {
        return this.getSchedule()
            .pipe(
                // Filter the first one with the schedule
                switchMap((items: Array<ScheduleItem>): Observable<ScheduleItem> => {
                    return new Observable((observer: Observer<ScheduleItem>) => {
                        if (items && items.length) {
                            const currentItem = items.find((item: ScheduleItem) => {
                                return DataUtils.betweenDate(date, item.initialHour, item.finalHour);
                            });

                            if (currentItem) {
                                observer.next(currentItem);
                                observer.complete();
                            } else {
                                observer.error('API: No items for now');
                            }
                        }
                    });
                }),
                // Concat with feedback entries if available
                concatMap((item: ScheduleItem): Observable<LiveScheduleItem> => {
                    return this.getFeedback(item._id)
                        .pipe(
                            map((data: Array<FeedbackEntry>): LiveScheduleItem => {
                                // Map to LiveScheduleItem
                                const newItem: LiveScheduleItem = item;
                                newItem.feedback = [];
                                if (data && data.length) {
                                    newItem.feedback = data;
                                    newItem.feedbackum = newItem.feedback.length;
                                }
                                return newItem;
                            }),
                            map((data: LiveScheduleItem): LiveScheduleItem => {
                                // Get average data and add that into the obj
                                const sum = data.feedback.length ? data.feedback.map((ab) => ab.qualification)
                                    .reduce((a, b) => a + b) : 0;
                                const avg = data.feedback ? sum / data.feedback.length : 0;
                                data.feedbackAvg = avg;
                                data.feedbackum = sum;
                                return data;
                            })
                        );
                })
            );
    }

    /**
     * Function to send the feedback entry to the server
     * @param feedback Object with feedback only data (no audit into)
     */
    sendFeedBack(feedback: FeedbackEntry): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.firebase.list(FIREBASE.BASE_PATH + FIREBASE.KEY_FEEDBACK + '/' + feedback._id).push(feedback)
                .then(() => {
                    observer.next(true);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });
    }

    /**
     * Function to subscribe to Firebase Realtime database
     * @param id Id of the Live Schedule Item
     */
    getFeedback(id: string): Observable<Array<FeedbackEntry>> {
        return this.firebase.list<FeedbackEntry>(
            FIREBASE.BASE_PATH + FIREBASE.KEY_FEEDBACK + '/' + id,
            ref => ref.orderByChild('mobileDate')).valueChanges();
    }

    /**
     * Get headers for all API calls
     */
    public getHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Content-Type', API.CONTENT_TYPE);
        return headers;
    }

    /**
     * Get params for all API calls
     */
    public getParams(): HttpParams {
        let params: HttpParams = new HttpParams();
        if (API.PARAMS) {
            API.PARAMS.forEach((param) => {
                params = params.set(param.KEY, param.VALUE);
            });
        }
        return params;
    }
}
