import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SupplementService } from '../../../service/supplement/supplement.service';
import { ISupplement } from '../../../models/Supplement';
import { ApiResponse } from '../../../models/ApiResponse';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ISupplement> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ISupplement> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-view-all-supplements',
  standalone: true,
  imports: [NzTableModule, NzDropDownModule, CommonModule, FormsModule, NzIconModule,NzModalModule,NzTagModule],
  templateUrl: './view-all-supplements.component.html',
  styleUrls: ['./view-all-supplements.component.css']
})
export class ViewAllSupplementsComponent implements OnInit {
  confirmModal?: NzModalRef;
  listOfData: ISupplement[] = [];
  listOfDisplayData: ISupplement[] = [];
  selectedId: number = 0;
  status: boolean = true;

  constructor(
    private supplementService: SupplementService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log('Trigger Fetching supplements...');
    this.getSupplements();
  }

  selectedData(id: number) {
    this.selectedId = id;
    const selectedItem = this.listOfData.find(item => item.id === id);
    if (selectedItem) {
      this.status = selectedItem.status; // Update the status based on the selected item's status
    }
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
          this.supplementService.deactivateSupplement(this.selectedId).subscribe({
            next: () => {
              console.log(`Response ${successMessage}:`);
              this.message.success(`Supplement ${successMessage} successfully!`);
              this.getSupplements(); // Refresh supplements after status change
            },
            error: (error) => {
              console.error('Error changing supplement status:', error);
              this.message.error('Error changing status. Please try again.');
            }
          });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((error) => console.log('Oops errors!' + error))
    });
  }

  getSupplements() {
    console.log('Fetching supplements...');
    this.supplementService.getSupplements().subscribe(
      (response: ApiResponse<ISupplement[]>) => {
        console.log('Response received:', response);
        if (response.status === 200) {
          this.listOfData = response.data;
          this.listOfDisplayData = response.data;
        } else {
          console.error('Error fetching supplements:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching supplements:', error);
      }
    );
  }

  searchValue = '';
  visible = false;
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: ISupplement, b: ISupplement) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: ISupplement, b: ISupplement) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ISupplement) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Description',
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
    this.listOfDisplayData = this.listOfData.filter((item: ISupplement) => item.name.includes(this.searchValue));
  }
}
