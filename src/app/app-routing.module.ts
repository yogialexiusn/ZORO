import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:LoginComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  },
  // {
  //   path:'admin',
  //   loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
