import {BaseViewModel} from '../viewModel/base.view-model';
import {Subscription} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {TechTalkCategory, TechTalkType} from '../model/tech-talk.model';

export class BasePage {
    viewModel: BaseViewModel;
    subscriptions: Array<Subscription> = [];
    loading: HTMLIonLoadingElement;

    constructor(viewModel: BaseViewModel,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public translate: TranslateService) {
        this.viewModel = viewModel;
    }

    ionViewWillEnter() {
        this.subscriptions = [];
    }

    ionViewWillLeave() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
        this.dismissLoading();
    }

    /**
     * Show loading dialog
     */
    async showLoading() {
        this.loading = await this.loadingController.create({
            message: this.translate.instant('global.loading'),
            animated: true,
            backdropDismiss: false,
            showBackdrop: true,
            spinner: 'circles'
        });
        this.loading.onWillDismiss().then(() => {
            this.loading = null;
        });
        await this.loading.present();
    }

    /**
     * Dismiss loading dialog if exists
     */
    async dismissLoading() {
        if (this.loading) {
            await this.loading.dismiss();
        }
    }

    /**
     * Show toast message
     * @param message Message to display
     */
    async showToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    /**
     * Get category text to display from Enum
     * @param category enum
     */
    public getCategory(category?: TechTalkCategory): string {
        switch (+category) {
            case TechTalkCategory.BASIC:
                return this.translate.instant('schedule.type.basic');
            case TechTalkCategory.INTERMEDIATE:
                return this.translate.instant('schedule.type.intermediate');
            case TechTalkCategory.UPPER_INTERMEDIATE:
                return this.translate.instant('schedule.type.upper_intermediate');
            case TechTalkCategory.ADVANCED:
                return this.translate.instant('schedule.type.advanced');
            default:
                return '';
        }
    }

    /**
     * Get icon by type from enum
     * @param type enum
     */
    public getIconByType(type?: TechTalkType): string {
        switch (+type) {
            case TechTalkType.TECH_TALK:
                return 'megaphone';
            case TechTalkType.BREAK:
                return 'cafe';
            case TechTalkType.SPECIAL_GUEST:
                return 'quote';
            default:
                return '';
        }
    }
}
