import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css'],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapZoom') divMapZoom!: ElementRef;
  mapZR!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-109.78281179431224, 29.992887190520808];

  constructor() {}

  ngOnDestroy(): void {
    this.mapZR.off('zoom', () => {});
    this.mapZR.off('zoomend', () => {});
    this.mapZR.off('move', () => {});
  }

  ngAfterViewInit() {
    this.mapZR = new mapboxgl.Map({
      container: this.divMapZoom.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    this.mapZR.on('zoom', (ev) => this.zoomLevel = this.mapZR.getZoom());
    this.mapZR.on('zoomend', (ev) => {
      if (this.mapZR.getZoom() > 18) {
        this.mapZR.zoomTo(18);
      }
    });
    this.mapZR.on('move', (event) => {
      const {lng, lat} = event.target.getCenter();
      this.center = [lng, lat];
    });
  }

  zoomIn() {
    this.mapZR.zoomIn();
  }

  zoomOut() {
    this.mapZR.zoomOut();
  }

  changeZoom(value: string) {
    this.mapZR.zoomTo(Number(value));
  }
}
