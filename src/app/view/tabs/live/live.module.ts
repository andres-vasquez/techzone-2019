import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LivePage} from './live.page';
import {TranslateModule} from '@ngx-translate/core';
import {IonicRatingModule} from 'ionic-rating';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: LivePage}]),
        IonicRatingModule,
        TranslateModule
    ],
    declarations: [LivePage]
})
export class LivePageModule {
}
