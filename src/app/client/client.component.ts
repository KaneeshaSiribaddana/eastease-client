import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink, RouterOutlet,RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { getISOWeek } from 'date-fns';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule,NzDropDownModule,NzIconModule,RouterLink, RouterOutlet,RouterModule,NzModalModule,NzDatePickerModule,NzFormModule,NzInputNumberModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  isVisible = false;
  userMenuOpen: boolean = false;
  mainMenuOpen: boolean = false;

  date = null;
  dateRange="";
  location="";
  adults="";
  
  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleMainMenu() {
    this.mainMenuOpen = !this.mainMenuOpen;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  formChange(){
    console.log("selected"+this.dateRange)
  }
}
