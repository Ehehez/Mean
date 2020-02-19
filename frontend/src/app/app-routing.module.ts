import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MuroComponent } from './components/muro/muro.component';
import { SearchComponent } from './components/search/search.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { WarningComponent } from './components/warning/warning.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "muro",
    component: MuroComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "users/:field/:value",
    component: SearchComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "cookies",
    component: CookiesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "warning",
    component: WarningComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "signup",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
