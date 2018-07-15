import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ApprovePostsComponent } from './approve-posts/approve-posts.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'admin', component: AdminNavigationComponent },
      { path: 'users', component: UsersComponent },
      { path: 'approvePosts', component: ApprovePostsComponent }
    ])
  ],
  declarations: [UsersComponent, ApprovePostsComponent, AdminNavigationComponent],
  bootstrap: [AdminNavigationComponent]
})
export class AdminModuleModule { }
