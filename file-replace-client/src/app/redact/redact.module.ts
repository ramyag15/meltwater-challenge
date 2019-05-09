import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedactComponent } from './redact.component';
import { MatButtonModule, MatToolbarModule, MatDialogModule, MatListModule, MatProgressBarModule, MatInputModule, MatFormFieldModule, MatMenuModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RedactService } from './redact.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, MatToolbarModule, CommonModule, MatButtonModule, MatDialogModule, MatListModule, FlexLayoutModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule, MatInputModule, MatFormFieldModule],
  declarations: [RedactComponent, DialogComponent],
  exports: [RedactComponent],
  entryComponents: [DialogComponent],
  providers: [RedactService]
})
export class RedactModule {}
