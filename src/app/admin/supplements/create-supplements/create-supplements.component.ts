import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SupplementService } from '../../../service/supplement/supplement.service'; 
import { FormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal'

interface ISupplementForm {
  id: number;
  name: string;
  description:string,
  status:boolean
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzSelectModule, FormsModule, NzUploadModule, NzModalModule, NzIconModule],
  templateUrl: './create-supplements.component.html',
  styleUrls: ['./create-supplements.component.css']
})
export class CreateSupplementsComponent {
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  formData: ISupplementForm = {
    id: 0,
    name: '',
    description:'',
    status:true
  };

  constructor(
    private supplementService: SupplementService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router 
  ) {
  }

  async onSubmit() {
    console.log(this.formData);
      this.supplementService.createSupplement(this.formData).subscribe({
        next: () => {
          // Handle success, e.g., show a success message or redirect the user
          console.log('Supplement created successfully!');
          this.message.success('Supplement created successfully!');
          this.router.navigateByUrl('/admin/supplements');
        },
        error: (error) => {
          // Handle error response from the server
          console.error('Error creating Supplement:', error);
          this.message.error('Error creating Supplement. Please try again.');
        }
      });
  }
}
