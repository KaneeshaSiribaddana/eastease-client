import { Routes } from '@angular/router';
import { ViewAllHotelsComponent } from './admin/hotels/view-all-hotels/view-all-hotels.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./client/client.routes').then(m => m.routes)},
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.routes)},
  
  { path: 'hotels', component: ViewAllHotelsComponent }
 // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
