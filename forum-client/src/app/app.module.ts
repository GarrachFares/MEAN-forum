import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { GroupComponent } from './components/group/group.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupEditFormComponent } from './components/group-edit-form/group-edit-form.component';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem('Token')
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    GroupComponent,
    ProfileComponent,
    PostComponent,
    ProfileEditFormComponent,
    GroupsComponent,
    GroupEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    JwtModule.forRoot({
      config: {
        //fix this shit
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        //disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
