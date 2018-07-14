import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
const My_Routes = [
  { path: 'admin', module: AdminModuleModule }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(My_Routes),
    AdminModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
