import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { RedactService } from './redact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-redact',
  templateUrl: './redact.component.html',
  styleUrls: ['./redact.component.css']
})
export class RedactComponent {
  constructor(private http: HttpClient, public dialog: MatDialog, public redactService: RedactService) {}

  public openRedactDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '75%', height: '75%' });
  }

  public viewFiles() {
    const url = "http://localhost:3000/download";
    this.http.get(url, {responseType: 'blob'}).subscribe((res : Blob) => {
      console.log(res);
      window.open(window.URL.createObjectURL(res));
    });
  }
}
