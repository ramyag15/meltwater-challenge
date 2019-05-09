import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RedactService } from '../redact.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @ViewChild('file') file;

  public files: Set<File> = new Set();
  replaceString : string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public redactService: RedactService) {}

  ngOnInit() {}

  progress;
  canBeClosed = true;
  primaryButtonText = 'Start Redaction';
  showCancelButton = true;
  redacting = false;
  redactSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was redacted already, just close the dialog
    if (this.redactSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "redacting"
    this.redacting = true;

    // start the redact and save the progress map
    this.progress = this.redactService.redact(this.files, this.replaceString);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while redacting
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the redact was successful...
      this.redactSuccessful = true;

      // ... and the component is no longer redacting
      this.redacting = false;
    });
  }
}
