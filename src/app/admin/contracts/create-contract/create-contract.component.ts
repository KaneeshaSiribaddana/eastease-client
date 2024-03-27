import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HotelsService } from '../../../service/hotel/hotels.service';
import { FormControl, FormRecord, NonNullableFormBuilder } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SupplementService } from '../../../service/supplement/supplement.service';

import { ContractService } from '../../../service/contract/contract.service';
import { HotelContract } from '../../../models/HotelContract';
import { ApiResponse } from '../../../models/ApiResponse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

interface SeasonData {
  id: string;
  name: string;
  dateRange: Date[];
  markup: number;
}

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [CommonModule, FormsModule, NzIconModule, NzSelectModule, NzFormModule, NzDatePickerModule, ReactiveFormsModule, NzTableModule,NzInputModule,NzPopconfirmModule],
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  constructor(
    private fbs: FormBuilder,
    private contractService: ContractService,
    private supplementService: SupplementService,
    private message: NzMessageService,
    private router: Router,
    private hotelsService: HotelsService,
    private fb: NonNullableFormBuilder,
  ) {
    this.contractForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      hotelId: [null, [Validators.required]],
      discounts: [[]],
      supplementIds: [[]],
      seasons: [[]],
      roomTypes: [[]],
      roomTypePrices: [[]],
      supplementPrices: [[]],
    });
  }
  trackByFn(index: number, item: { label: string; value: string }) {
    return item.value; // Ensure unique tracking for list items
  }

  listOfSupplements: Array<{ label: string; value: string }> = [];
  supplements:any=[];
  listOfTagSupplements = [];
  supplementPrices: number[] = [];

 hotelId:any;
  i = 0;
  editId: string | null = null;
  listOfSeason: SeasonData[] = [];


  getSupplements() {
    console.log('Fetching supplements...');
    this.supplementService.getSupplements().subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.supplements = response.data;
          console.log('Supplements data:', this.supplements); // Log the actual content of response.data
          const children: Array<{ label: string; value: string }> = [];
          for (let x = 0; x < this.supplements.length; x++) {
            children.push({ label: this.supplements[x].name, value: this.supplements[x].name });
          }
          this.listOfSupplements = children;
        } else {
          console.error('Error fetching supplements:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching supplements:', error);
      }
    );
  }

  supplementsAdded() {
    const tableSeasonElement = document.getElementById('tableSeason');
    if (tableSeasonElement) {
      let tableHTML = '';
  
      this.listOfSeason.forEach(season => {
        let tbodyHTML = '';
  
        this.listOfTagSupplements.forEach(supplement => {
          const price = this.getSupplementPrice(season.name, supplement); // Get the current price
  
          tbodyHTML += `
            <tr>
              <td>${supplement}</td>
              <td><input type="number" class="supplement-price-input" [(ngModel)]="getSupplementPrice(season.name, supplement)" (ngModelChange)="setSupplementPrice($event, season.name, supplement)"></td>
            </tr>
          `;
        });
  
        tableHTML += `
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg t-10 p-5">
            <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplements in ${season.name}</h1>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead>
                <tr>
                  <th>Supplement name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>${tbodyHTML}</tbody>
            </table>
          </div>
        `;
      });
  
      tableSeasonElement.innerHTML = tableHTML;
    }
  }
  
  getSupplementPrice(season: string, supplement: string): number {
    console.log('Supplement Prices:', this.supplementPrices);
  
    const supplementIndex = this.listOfTagSupplements.findIndex(item => item === supplement);
    console.log('Supplement index:', supplementIndex);
  
    if (supplementIndex !== -1) {
      const seasonIndex = this.listOfSeason.findIndex(item => item.name === season);
      console.log('Season index:', seasonIndex);
  
      const arrayIndex = (seasonIndex * this.listOfTagSupplements.length) + supplementIndex;
      console.log('Array index:', arrayIndex);
  
      if (arrayIndex >= 0 && arrayIndex < this.supplementPrices.length) {
        const price = this.supplementPrices[arrayIndex];
        console.log('Price found:', price);
        return price;
      }
    }
  
    console.warn('Price not found. Returning default price.');
    return 0; // Default price if not found
  }
  setSupplementPrice(price: number, season: string, supplement: string): void {
    const supplementIndex = this.listOfTagSupplements.findIndex(item => item === supplement);

    if (supplementIndex !== -1) {
      const seasonIndex = this.listOfSeason.findIndex(item => item.name === season);
      const arrayIndex = (seasonIndex * this.listOfTagSupplements.length) + supplementIndex;

      // Check if the arrayIndex is within the bounds of supplementPrices
      if (arrayIndex < this.supplementPrices.length) {
        this.supplementPrices[arrayIndex] = price;
      } else {
      }
      
      console.log(this.supplementPrices);
    } else {
      console.error('Supplement not found:', supplement);
    }
    this.supplementPrices.push(price);
  }
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    document.getElementById("seasonTable")?.classList.remove("hidden");
    this.listOfSeason = [
      ...this.listOfSeason,
      {
        id: `${this.i}`,
        name: `Enter Season name here`,
        dateRange: [new Date(), new Date()],
        markup: 0
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    console.log(id);
    this.listOfSeason = this.listOfSeason.filter(item => item.id !== id);
    this.supplementsAdded();
  }


  submitForm(): void {

  }
  contractForm: FormGroup;
  isLoading = false;
  hotelDataList: any[] = [];


  supplementsClosed(){
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  ngOnInit(): void {
    this.getHotels();
    this. getSupplements() 

  }
  getHotels() {
    console.log('Fetching hotels...');
    this.hotelsService.getHotels().subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.hotelDataList = response.data;
        } else {
          console.error('Error fetching hotels:', response.message);
        }
      }
    );
  }
  
  onSubmit(): void {
    const formData = this.contractForm.value;

    console.log("suppliment Prices"+this.supplementPrices);
    const seasonsData = this.listOfSeason.map(season => ({
      name: season.name,
      startDate: season.dateRange[0]?.toISOString(),
      endDate: season.dateRange[1]?.toISOString(),
      markup: season.markup
    }));
    const contractData = {
      hotelId: this.hotelId,
      seasons: seasonsData
    };
    console.log(contractData)

  }
}
