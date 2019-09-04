import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../viewModel/schedule/schedule.service';
import {BasePage} from '../../base.page';
import {merge, Observable, Observer} from 'rxjs';
import {TechTalkModel} from '../../../model/tech-talk.model';
import {LoadingController, ToastController} from '@ionic/angular';
import {debounceTime, share, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ScheduleViewModel} from '../../../viewModel/schedule/schedule.view-model';
import {Logger} from '../../../utils/logger.utils';

@Component({
    selector: 'app-tab1',
    templateUrl: 'schedule.page.html',
    styleUrls: ['schedule.page.scss']
})
export class SchedulePage extends BasePage implements OnInit {

    // View model instance
    public viewModel: ScheduleViewModel;

    // List of items from Agenda as observable to display in UI
    public $items: Observable<Array<TechTalkModel>>;

    // List of all items from repository
    public $allItems: Observable<Array<TechTalkModel>>;

    // Variable to store all Items in the scope
    private allItems: Array<TechTalkModel> = [];

    // Search items as observable
    public $searchItems: Observable<Array<TechTalkModel>>;

    // Search items observer used to post search values
    public $searchItemsObserver: Observer<Array<TechTalkModel>>;

    constructor(viewModel: ScheduleService,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public translate: TranslateService) {
        super(viewModel, toastController, loadingController, translate);
        this.viewModel = viewModel;
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }


    ngOnInit(): void {
        this.showLoading();

        // All items
        this.$allItems = this.viewModel.getScheduleItems()
            .pipe(
                share(),
                tap((items) => {
                    this.allItems = items;
                    this.dismissLoading();
                })
            );

        // Search items
        this.$searchItems = new Observable((observer: Observer<Array<TechTalkModel>>) => {
            this.$searchItemsObserver = observer;
        });

        // List observe the merge
        this.$items = merge(
            this.$allItems,
            this.$searchItems.pipe(
                debounceTime(500) // Wait xxx milliseconds before deliver onNext
            ));
    }

    /**
     * Filter items from searchbar
     * @param ev Search event
     */
    filterItems(ev: any) {
        const search = ev.target.value.toLowerCase().trim();
        Logger.info('Search', search);

        if (this.$searchItemsObserver) {
            this.$searchItemsObserver.next(this.allItems.filter((item) => item.title.toLowerCase().indexOf(search) > -1));
        }
    }
}
