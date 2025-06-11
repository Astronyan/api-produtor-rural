import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('pizzas/estados')
  getFazendasPorEstado() {
    return this.dashboardService.getFazendasPorEstado();
  }

  @Get('pizzas/culturas')
  getCulturasPlantadasPorTipo() {
    return this.dashboardService.getCulturasPlantadasPorTipo();
  }

  @Get('pizzas/uso-solo')
  getUsoDeSolo() {
    return this.dashboardService.getUsoDeSolo();
  }
}
