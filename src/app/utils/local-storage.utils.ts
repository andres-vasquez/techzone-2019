import {Observable, Observer} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Logger} from './logger.utils';

/**
 * Helper class to manage localStorage functions
 */
export class LocalStorageUtils {
    constructor(private storage: Storage) {

    }

    /**
     * Given a key return data saved in localStorage
     * @param key from constants
     */
    getItem(key: string): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            this.storage.get(key).then(
                (value) => {
                    observer.next(value);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });
    }

    /**
     * Given a key save the value in localStorage. If push value is marked consider the save action over an array
     * @param key from constans
     * @param value obj to save in localStorage
     * @param push True: Save and push in array, False: Save the original value
     */
    saveItem(key: string, value: any, push?: boolean): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            // Function
            const save = (valueToSave: any) => {
                this.storage.set(key, valueToSave).then(
                    () => {
                        observer.next(true);
                        observer.complete();
                    }, error => {
                        observer.error(error);
                    });
            };

            if (push) {
                this.getItem(key).subscribe(
                    (data) => {
                        if (data && Array.isArray(data)) {
                            data.push(value);
                            save(data);
                        } else {
                            save([value]);
                        }
                    }, error => {
                        Logger.error('saveItem.getItem', error);
                        save([value]);
                    });
            } else {
                save(value);
            }
        });
    }

    /**
     * Given a key remove the data from localStorage
     * @param key from constants
     */
    removeItem(key: string): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.storage.remove(key).then(
                (result) => {
                    observer.next(true);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });
    }
}
