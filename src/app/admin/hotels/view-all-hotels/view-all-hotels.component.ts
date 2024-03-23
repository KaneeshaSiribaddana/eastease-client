import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HotelsService } from '../../../service/hotel/hotels.service';
import { IHotel } from '../../../models/Hotel';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ApiResponse } from '../../../models/ApiResponse';
import { NzMessageService } from 'ng-zorro-antd/message';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IHotel> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IHotel> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-view-all-hotels',
  standalone: true,
  imports: [NzTableModule, NzDropDownModule, CommonModule, FormsModule, NzIconModule,NzModalModule,NzTagModule],
  templateUrl: './view-all-hotels.component.html',
  styleUrls: ['./view-all-hotels.component.css']
})
export class ViewAllHotelsComponent implements OnInit {
  confirmModal?: NzModalRef;
  listOfData: IHotel[] = [];
  listOfDisplayData: IHotel[] = []; // Initialize listOfDisplayData
  selectedId:number=0;
  status: boolean = true;

  constructor(
    private hotelsService: HotelsService,
    private modal: NzModalService,
    private message: NzMessageService
    ) {}

  ngOnInit(): void {
    console.log('Trigger Fetching hotels...');
    this.getHotels();
  }
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to deactivate this Hotel?',
      nzContent: 'All the Contracts status  will be set as Deactivated!',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.hotelsService.deactivateHotel(this.selectedId).subscribe({
            next: () => {
              console.log('Response Deactivated:');
            },
            error: (error) => {
              console.error('Error fetching hotels:', error);
            }
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((error) => console.log('Oops errors!'+error))
    });
  }
  checkStatus(): void {
    const action = this.status ? 'Deactivate' : 'Activate';
    const confirmMessage = this.status ? 'Deactivate this Supplement?' : 'Activate this Supplement?';
    const successMessage = this.status ? 'Deactivated' : 'Activated';

    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you want to ${action} this Supplement?`,
      nzContent: `All the Contracts status will be set as ${successMessage}!`,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.hotelsService.deactivateHotel(this.selectedId).subscribe({
            next: () => {
              console.log(`Response ${successMessage}:`);
              this.message.success(`Hotel ${successMessage} successfully!`);
              this.getHotels();
            },
            error: (error) => {
              console.error('Error changing hotel status:', error);
              this.message.error('Error changing status. Please try again.');
            }
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((error) => console.log('Oops errors!' + error))
    });
  }
  selectedData(id:number){
    this.selectedId=id;
    const selectedItem = this.listOfData.find(item => item.id === id);
    if (selectedItem) {
      this.status = selectedItem.status;
    }
  }
  getHotels() {
    console.log('Fetching hotels...');
    this.hotelsService.getHotels().subscribe(
      (response: ApiResponse<IHotel[]>) => {
        console.log('Response received:', response);
        console.log(response.status);
        if (response.status === 200) {
          this.listOfData = response.data;
          this.listOfDisplayData = response.data;
        } else {
          console.error('Error fetching hotels:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  searchValue = '';
  visible = false;
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IHotel) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Status',
      sortOrder: null,
      sortFn: null,
      sortDirections:[],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Manager',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.manager.localeCompare(b.manager),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Phone Number',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'City',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.city.localeCompare(b.city),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Street',
      sortOrder: null,
      sortFn: (a: IHotel, b: IHotel) => a.street.localeCompare(b.street),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: IHotel) => item.name.includes(this.searchValue));
  }
}
