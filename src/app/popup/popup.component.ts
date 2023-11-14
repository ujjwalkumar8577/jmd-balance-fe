import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  password: string = '';
  selectedFile: File | null = null;

  constructor(private recordService: RecordService, public dialogRef: MatDialogRef<PopupComponent>) {}

  onSubmit() {
    if (this.selectedFile) {
      this.recordService.postFormData(this.password, this.selectedFile).subscribe(
        (response: any) => {
          alert(JSON.stringify(response.mesage));
          this.closeDialog();
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      console.warn('No file selected.');
    }
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
