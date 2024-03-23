import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HotelsService } from '../../../service/hotel/hotels.service';
import { FormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal'

interface IHotelForm {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  manager: string;
  status:boolean;
 // images: File[]; // Change to File[] to store File objects directly
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzSelectModule, FormsModule, NzUploadModule, NzModalModule, NzIconModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  formData: IHotelForm = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    street: '',
    city: '',
    manager: '',
    status:true
  //  images: [] // Initialize images array
  };
  imageFiles="";
  form: FormGroup;

  constructor(
    private hotelService: HotelsService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      street: [null, [Validators.required]],
      city: [null, [Validators.required]],
      manager: [null, [Validators.required]]
    });
  }

  async onSubmit() {
   // this.formData.images = this.fileList.map(file => file.originFileObj!); // Store File objects directly

    // this.hotelService.createHotel(this.formData).pipe(
    //   finalize(() => {
    //     this.form.reset();
    //     this.fileList = [];
    //   })
    // ).subscribe({
    //   next: () => {
    //     console.log("Created Successfully");
    //   },
    //   error: (error) => {
    //     // Handle error
    //     console.error('Error creating hotel:', error);
    //   }
    // });
      this.hotelService.createHotel(this.formData).subscribe({
        next: () => {
          // Handle success, e.g., show a success message or redirect the user
          console.log('Hotel created successfully!');
          this.message.success('Hotel created successfully!');
          this.router.navigateByUrl('/admin/hotels');
        },
        error: (error) => {
          // Handle error response from the server
          console.error('Error creating hotel:', error);
          this.message.error('Error creating hotel. Please try again.');
        }
      });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file['preview']) { // Access 'preview' with bracket notation
      file['preview'] = file.url || file.thumbUrl; // Set preview from URL if available
    }
    this.previewImage = file['preview'];
    this.previewVisible = true;
  };

  handleChange(info: { fileList: NzUploadFile[] }): void {
    // Update fileList when files are uploaded or removed
    this.fileList = [...info.fileList];
  }
}
