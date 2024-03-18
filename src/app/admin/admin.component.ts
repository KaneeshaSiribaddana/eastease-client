import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,RouterModule } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule,RouterLink,RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent{
  isCollapsed = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
  log(): void {
    console.log('click dropdown button');
  }
}  