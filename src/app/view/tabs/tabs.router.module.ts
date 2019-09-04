import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./schedule/schedule.module').then(m => m.SchedulePageModule)
                    }
                ]
            },
            {
                path: 'live',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./live/live.module').then(m => m.LivePageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/schedule',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/schedule',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
