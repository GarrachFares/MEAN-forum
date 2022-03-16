import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { GroupEditFormComponent } from './components/group-edit-form/group-edit-form.component';


const routes: Routes = [
  {path: '',component:HomeComponent} ,
  {path: 'profile/edit',component:ProfileEditFormComponent,canActivate:[AuthGuard]} ,
  {path: 'profile/:id',component:ProfileComponent,canActivate:[AuthGuard]} ,
  {path: 'profile',component:ProfileComponent,canActivate:[AuthGuard]} ,
  {path: 'login',component:LoginFormComponent} ,
  {path: 'register',component:RegisterFormComponent} ,
  {path: 'group/add',component:GroupEditFormComponent,canActivate:[AuthGuard]} ,
  {path: 'group/:id',component:GroupComponent,canActivate:[AuthGuard]} ,
  {path: 'group/:id/edit',component:GroupEditFormComponent,canActivate:[AuthGuard]} ,
  {path: 'groups',component:GroupsComponent,canActivate:[AuthGuard]} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
