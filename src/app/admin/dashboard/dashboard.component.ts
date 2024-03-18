import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createPieChart();
    }, 0);
  }

  createPieChart() {
    if (!this.pieChart || !this.pieChart.nativeElement) {
      console.error('Canvas element not found!');
      return;
    }

    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available!');
      return;
    }

    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Nuwara Eliya', 'Colombo', 'Kandy', 'Jaffna', 'Galle'],
        datasets: [{
          label: '# of Votes',
          data: [300, 500, 100,400,320],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 86, 86)',
            'rgb(255, 255, 86)',
          ],
          borderWidth: 1
        }]
      },
    });
  }
}
