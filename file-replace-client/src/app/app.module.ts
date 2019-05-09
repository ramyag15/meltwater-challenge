import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RedactModule } from './redact/redact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RedactModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
