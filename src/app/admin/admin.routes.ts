import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAllHotelsComponent } from './hotels/view-all-hotels/view-all-hotels.component';
import { AdminComponent } from './admin.component';
import { CreateComponent } from './hotels/create/create.component';
import { ViewAllSupplementsComponent } from './supplements/view-all-supplements/view-all-supplements.component';
import { CreateSupplementsComponent } from './supplements/create-supplements/create-supplements.component';
import { ViewAllContractsComponent } from './contracts/view-all-contracts/view-all-contracts.component';
import { CreateContractComponent } from './contracts/create-contract/create-contract.component';

export const routes: Routes = [
    { 
        path: '', 
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'hotels', component: ViewAllHotelsComponent },
            { path: 'hotels/create', component: CreateComponent },
            { path: 'supplements', component: ViewAllSupplementsComponent },
            { path: 'supplements/create', component: CreateSupplementsComponent },
            { path: 'contracts', component: ViewAllContractsComponent },
            { path: 'contracts/create', component: CreateContractComponent }
        ]
    }
];
