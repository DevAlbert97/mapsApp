import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarker {
  color   : string;
  marker  ?: mapboxgl.Marker;
  center  ?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css'],
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('mapMarkers') mapMarkers!: ElementRef;

  mapMrks!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-109.78281179431224, 29.992887190520808];
  markers: ColorMarker[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.mapMrks = new mapboxgl.Map({
      container: this.mapMarkers.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    // const maker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapMrks);

    this.readSavedMarkers();
  }

  addNewMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat(this.center).addTo(this.mapMrks);

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkers();

    newMarker.on('dragend', () => {
      this.saveMarkers();
    });
  }

  goTo(marker: mapboxgl.Marker) {
    this.mapMrks.flyTo({center: marker?.getLngLat()})
  }

  //* Guardar marcadores en Local Storage
  saveMarkers() {
    const lngLatArr: ColorMarker[] = []
    this.markers.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat()
      lngLatArr.push({
        color: color,
        center: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  //* Leer marcadores del Local Storage
  readSavedMarkers() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: ColorMarker[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.center!)
      .addTo(this.mapMrks);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkers();
      });
    });
  }

  deleteMarker(i: number) {
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.saveMarkers();
  }
}
