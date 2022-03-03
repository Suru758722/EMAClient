import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { FarmerDetailComponent } from './farmer-detail/farmer-detail.component';
import { FarmerComponent } from './farmer/farmer.component';
import { FertilizerComponent } from './fertilizer/fertilizer.component';
import { HarvestComponent } from './harvest/harvest.component';
import { IntercultureComponent } from './interculture/interculture.component';
import { IrrigationComponent } from './irrigation/irrigation.component';
import { MachineComponent } from './machine/machine.component';
import { PlantprotectionComponent } from './plantprotection/plantprotection.component';
import { ProductionComponent } from './production/production.component';
import { SeedbeedComponent } from './seedbeed/seedbeed.component';
import { SowingComponent } from './sowing/sowing.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "farmer",
    component: FarmerComponent,
  },
  {
    path: "machine",
    component: MachineComponent,
    canActivate: [AuthGuard]    

  },
  {
    path: "equipment",
    component: EquipmentComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "seedbeed",
    component: SeedbeedComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "sowing",
    component: SowingComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "fertilizer",
    component: FertilizerComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "interculture",
    component: IntercultureComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "plantprotection",
    component: PlantprotectionComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "irrigation",
    component: IrrigationComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "harvest",
    component: HarvestComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: "production",
    component: ProductionComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"farmer-detail",
    component: FarmerDetailComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

