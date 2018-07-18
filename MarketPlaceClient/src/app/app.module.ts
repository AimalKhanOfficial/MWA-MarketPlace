import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Required for Angular Material 
added by jawad*/

/*------------------------------------ */
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*------------------------------------ */
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

//Highcharts - Aimal
import { ChartModule } from 'angular-highcharts';

/* Required for Angular Material 
added by jawad*/
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule
} from '@angular/material';
import { PostcreateComponent } from './postcreate/postcreate.component';
import { UserModuleModule } from './user-module/user-module.module';
import { PostsComponent } from './posts/posts.component';
import { ForgetPasswordComponent } from './user-module/forget-password/forget-password.component';
import { PostsDetailComponent } from './posts/posts.details.component';
import { PostupdateComponent } from './postupdate/postupdate.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const My_Routes = [
  // { path: 'admin', loadChildren: './admin-module/admin-module.module' },
  // { path: 'user', loadChildren: './user-module/user-module.module' },
  { path: '', component: LandingPageComponent }

]

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: [PostsComponent, PostsDetailComponent, LandingPageComponent],
  imports: [BrowserAnimationsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule.forRoot(My_Routes), MatPaginatorModule, MatCardModule]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    PostcreateComponent,
    PostupdateComponent,
    ProfileupdateComponent
  ],
  imports: [
    ChartModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModuleModule,
    RouterModule.forRoot(My_Routes),
    NoopAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    UserModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
