import {Component, OnInit} from '@angular/core';
import {BasePage} from '../../base.page';
import {LiveService} from '../../../viewModel/live/live.service';
import {LiveViewModel} from '../../../viewModel/live/live.view-model';
import {Observable} from 'rxjs';
import {Feedback, TechTackLive} from '../../../model/tech-talk.model';
import {finalize, share} from 'rxjs/operators';
import {DataUtils} from '../../../utils/data.utils';
import {LoadingController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Logger} from '../../../utils/logger.utils';

@Component({
    selector: 'app-tab2',
    templateUrl: 'live.page.html',
    styleUrls: ['live.page.scss']
})
export class LivePage extends BasePage implements OnInit {

    // ViewModel instance
    public viewModel: LiveViewModel;

    // Observable time instance
    public $time: Observable<Date>;

    // Current item object
    public item: TechTackLive;

    constructor(viewModel: LiveService,
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
        this.subscribeToTime();
    }

    /**
     * Function to update time from datepicker
     * @param value current time from datepicker
     */
    updateMyDate(value) {
        const selectedDate = new Date(value.detail.value);
        this.subscribeToTime(DataUtils.convertSelectTimeToEventTime(selectedDate));
    }

    /**
     * Subscrite to time observable
     * @param startDate from datepicker selection
     */
    subscribeToTime(startDate?: Date) {
        this.$time = this.viewModel.getTime(startDate).pipe(share());
        this.viewModel.getLiveItem(startDate).subscribe(
            (item: TechTackLive) => {
                this.item = item;
            }, error => {
                this.item = null;
                Logger.error('getLiveItem', error);
            });
    }

    /**
     * Send feedback to the server
     * @param id of the current item
     */
    sendFeedback(id: string) {
        const feedback: Feedback = {
            _id: id,
            email: 'TechZone@jalasoft.com',
            qualification: DataUtils.getRandomQualificationNumber()
        };

        this.showLoading();
        this.viewModel.sendFeedBack(feedback)
            .pipe(
                finalize(() => this.dismissLoading())
            ).subscribe(
            () => {
                this.showToast(feedback.qualification + this.translate.instant('live.feedback.ok'));
            }, error => {
                Logger.error('sendFeedBack.error', error);
            });
    }
}
