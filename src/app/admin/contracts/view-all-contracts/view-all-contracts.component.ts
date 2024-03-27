import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ContractService } from '../../../service/contract/contract.service'; // Update to ContractsService
import { HotelContract } from '../../../models/HotelContract'; // Update to IContract
import { ApiResponse } from '../../../models/ApiResponse';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<HotelContract> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<HotelContract> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-view-all-contracts', // Update selector
  standalone: true,
  imports: [NzTableModule, NzDropDownModule, CommonModule, FormsModule, NzIconModule, NzModalModule, NzTagModule],
  templateUrl: './view-all-contracts.component.html', // Update template URL
  styleUrls: ['./view-all-contracts.component.css'] // Update style URLs
})
export class ViewAllContractsComponent implements OnInit {
  confirmModal?: NzModalRef;
  listOfData: HotelContract[] = [];
  listOfDisplayData: HotelContract[] = [];
  selectedId: number = 0;
  status: boolean = true;

  constructor(
    private contractService: ContractService, // Update to ContractsService
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log('Trigger Fetching contracts...'); // Update log message
    this.getContracts(); // Update method call
  }

  selectedData(id: number) {
    this.selectedId = id;
    const selectedItem = this.listOfDisplayData.find(item => item.id === id);
    if (selectedItem) {
      // Example: Update the status based on the selected item's status
      this.status = selectedItem.status;
    }
  }
  
  checkStatus(): void {
    const action = this.status ? 'Deactivate' : 'Activate';
    const confirmMessage = this.status ? 'Deactivate this Contract?' : 'Activate this Contract?';
    const successMessage = this.status ? 'Deactivated' : 'Activated';
  
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you want to ${action} this Contract?`,
      nzContent: `All related actions will be set as ${successMessage}!`,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          // Example: Call the API to update contract status
          this.contractService. deactivateContract(this.selectedId).subscribe({
            next: () => {
              console.log(`Contract ${successMessage}:`);
              this.message.success(`Contract ${successMessage} successfully!`);
              this.getContracts(); // Refresh contracts after status change
            },
            error: (error) => {
              console.error('Error changing contract status:', error);
              this.message.error('Error changing status. Please try again.');
            }
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((error) => console.log('Oops errors!' + error))
    });
  }

  getContracts() {
    console.log('Fetching contracts...'); // Update log message
    this.contractService.getContracts().subscribe( // Update API call to get contracts
      (response: ApiResponse<HotelContract[]>) => {
        console.log('Response received:', response);
        if (response.status === 200) {
          this.listOfData = response.data;
          this.listOfDisplayData = response.data;
          this.listOfDisplayData.sort((a, b) => b.id - a.id);
          this.listOfData.sort((a, b) => b.id - a.id);
        } else {
          console.error('Error fetching contracts:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching contracts:', error);
      }
    );
  }

  searchValue = '';
  visible = false;
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: HotelContract, b: HotelContract) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Hotel Name',
      sortOrder: null,
      sortFn: null,
      //(a: HotelContract, b: HotelContract) => a.localeCompare(b.hotelName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
      //(list: string[], item: HotelContract) => list.some(name => item.hotelName.indexOf(name) !== -1)
    },
    {
      name: 'Start Date',
      sortOrder: null,
      sortFn: (a: HotelContract, b: HotelContract) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'End Date',
      sortOrder: null,
      sortFn: (a: HotelContract, b: HotelContract) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Status',
      sortOrder: null,
      sortFn: null,
      sortDirections:[],
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
    // Update search logic for contracts
  }
}
