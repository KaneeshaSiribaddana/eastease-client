import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAllHotelsComponent } from './hotels/view-all-hotels/view-all-hotels.component';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
    { 
        path: '', 
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'hotels', component: ViewAllHotelsComponent }
        ]
    }
];
