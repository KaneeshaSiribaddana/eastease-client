import { Component } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'app-mybookings',
  standalone: true,
  imports: [ NzCollapseModule],
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      name: 'This is panel header 3'
    }
  ];
}
