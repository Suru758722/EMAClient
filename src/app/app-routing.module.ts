import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
    // canActivate: [AuthGuard]    
  }
  // {
  //   path: "404",
  //   //component: NotFoundComponent,
  // },
  //{ path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
