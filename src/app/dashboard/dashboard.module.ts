import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard.routes";
import {DashboardComponent} from "./dashboard.component";
import {HeaderComponent} from "./header/header.component";
import {UserService} from "../user/login/service/user.service";
import {RegionPanelComponent} from "./region-panel/region-panel.component";
import {AlarmPanelComponent} from "./alarm-panel/alarm-panel.component";
import {HistoryPanelComponent} from "./history-panel/history-panel.component";
import {MainPanelModule} from "./main-panel/main-panel.module";
import {MainPanelComponent} from "./main-panel/main-panel.component";
import {WebsocketService} from "./websocket.service";
import {TabControlComponent} from "./tab-control/tab-control.component";
import { EchartsNg2Module } from 'echarts-ng2';
import {NgZorroAntdModule } from 'ng-zorro-antd';
import {AlarmService} from "./alarm-panel/alarm.service";
import { TimePipePipe } from './time-pipe.pipe';
import { GpsPanelComponent } from './gps-panel/gps-panel.component';
import { BaiduMapModule } from "angular2-baidu-map";
import { GpsService } from "./gps-panel/gps.service";
import { GpsCoordService } from "./gps-panel/gps-coord.service"; 

@NgModule({
  imports: [
    CommonModule,
    MainPanelModule,
    RouterModule,
    EchartsNg2Module,
    RouterModule.forChild(dashboardRoutes),
    NgZorroAntdModule,
    BaiduMapModule.forRoot({ak:'MPQTQajDSoeC6VAfkE1ksgPePtPQ3C5v'})
    
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    RegionPanelComponent,
    AlarmPanelComponent,
    HistoryPanelComponent,
    TabControlComponent,
    TimePipePipe,
    GpsPanelComponent,
  ],
  providers: [UserService, WebsocketService, AlarmService,GpsService,GpsCoordService],
  entryComponents: [MainPanelComponent],
})
export class DashboardModule {
}
