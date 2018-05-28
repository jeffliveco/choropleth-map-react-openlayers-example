import React from "react";
import * as ol from 'openlayers';
import axios from 'axios';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

class ChoroplethMap extends React.Component {
    constructor(props){
      super(props);
    }
  
    componentDidMount() {
      var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8080/cmae-services-gis/v1/country',
      });

      var buildingStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(240, 240, 240, 1)'
        }),
        stroke: new ol.style.Stroke({
          color: '#444',
          width: 1
        }),
        text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: '#000'
          }),
          /*stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
          })*/
        })
      });

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature, zoom) {
          let textValue = '';
          if(zoom <= 5000){
            textValue = feature.get('iso');
          }

          buildingStyle.getText().setText(textValue);
          return buildingStyle;
        }
      });

      var map = new ol.Map({
        layers: [
          vectorLayer
        ],
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 3,
          minZoom: 3,
          maxZoom: 19,
        })
      });
    }

    render() {
        return (<div id="map"></div>);
    }
}

export default ChoroplethMap;
