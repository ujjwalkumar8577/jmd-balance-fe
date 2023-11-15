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
          this.closeDialog();
          alert(response.message);
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
    const fileInput: HTMLInputElement = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const validFileTypeConditions = [
        this.selectedFile.type === 'application/vnd.ms-excel',
        this.selectedFile.name.endsWith('.xls'),
        this.selectedFile.name.endsWith('.xlsx'),
      ];
      if (!validFileTypeConditions.some((condition) => condition)) {
        this.selectedFile = null;
        alert('Please select a valid excel file.');
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
