import {Injectable} from '@angular/core';
import {BaseViewModel} from '../base.view-model';
import {Observable, Observer} from 'rxjs';
import {TechTalkModel} from '../../model/tech-talk.model';
import {RepositoryService} from '../../repository/repository.service';
import {switchMap} from 'rxjs/operators';
import {ScheduleItem} from '../../model/api/techzone-api.model';
import {DataUtils} from '../../utils/data.utils';
import {RepositoryI} from '../../repository/repository-i.model';
import {ScheduleViewModel} from './schedule.view-model';

/**
 * Service (single instance) for ScheduleItems viewModel
 */
@Injectable()
export class ScheduleService extends BaseViewModel implements ScheduleViewModel {
    // Repository contract interface
    repository: RepositoryI;

    constructor(repository: RepositoryService) {
        super();
        this.repository = repository;
    }

    /**
     * Get Schedule Items (agenda)
     */
    getScheduleItems(): Observable<Array<TechTalkModel>> {
        return this.repository.getSchedule()
            .pipe(
                switchMap((items: Array<ScheduleItem>): Observable<Array<TechTalkModel>> => {
                    return new Observable((observer: Observer<Array<TechTalkModel>>) => {
                        const data = [];
                        if (items && items.length) {
                            items.map((item) => data.push(DataUtils.mapScheduleItemToTechTalkModel(item)));
                        }
                        observer.next(data);
                    });
                })
            );
    }
}
