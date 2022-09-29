import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { MarkersComponent } from './pages/markers/markers.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    FullScreenComponent,
    ZoomRangeComponent,
    PropertiesComponent,
    MarkersComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
