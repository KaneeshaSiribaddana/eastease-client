import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client.component';
import { SearchComponent } from './search/search.component';
import { HotelComponent } from './hotel/hotel.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
export const routes: Routes = [
   {
    path: '', 
    component: ClientComponent,
    children: [
        { path: '',component: HomeComponent } ,
         { path: 'search', component: SearchComponent },
         { path: 'hotel', component: HotelComponent },
         { path: 'mybookings', component: MybookingsComponent }
    ]
   }
];
