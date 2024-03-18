import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HotelsService } from '../../../service/hotels.service';
import { ApiResponse, IHotel } from '../../../models/Hotel';

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
  imports: [NzTableModule, NzDropDownModule, CommonModule, FormsModule, NzIconModule],
  templateUrl: './view-all-hotels.component.html',
  styleUrls: ['./view-all-hotels.component.css']
})
export class ViewAllHotelsComponent implements OnInit {
  listOfData: IHotel[] = [];
  listOfDisplayData: IHotel[] = []; // Initialize listOfDisplayData

  constructor(private hotelsService: HotelsService) {}

  ngOnInit(): void {
    console.log('Trigger Fetching hotels...');
    this.getHotels();
  }

  getHotels() {
    console.log('Fetching hotels...');
    this.hotelsService.getHotels().subscribe({
      next: (response: IHotel[]) => {
        console.log('Response received:', response);
        this.listOfData = response;
        this.listOfDisplayData=response;
        console.log('sdsd'+this.listOfDisplayData);
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      }
    });
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
