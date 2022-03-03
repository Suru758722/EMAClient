import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FarmerComponent } from './farmer/farmer.component';
import { MachineComponent } from './machine/machine.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from '../services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeedbeedComponent } from './seedbeed/seedbeed.component';
import { SowingComponent } from './sowing/sowing.component';
import { FertilizerComponent } from './fertilizer/fertilizer.component';
import { IntercultureComponent } from './interculture/interculture.component';
import { PlantprotectionComponent } from './plantprotection/plantprotection.component';
import { IrrigationComponent } from './irrigation/irrigation.component';
import { HarvestComponent } from './harvest/harvest.component';
import { ProductionComponent } from './production/production.component';
import { UserComponent } from './user/user.component';
import { FarmerDetailComponent } from './farmer-detail/farmer-detail.component';
import { ExcelService } from '../services/excel.service';

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, FarmerComponent, MachineComponent, EquipmentComponent, SeedbeedComponent, SowingComponent, FertilizerComponent, IntercultureComponent, PlantprotectionComponent, IrrigationComponent, HarvestComponent, ProductionComponent, UserComponent, FarmerDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminService,
    ExcelService
  ]
})
export class AdminModule { }
