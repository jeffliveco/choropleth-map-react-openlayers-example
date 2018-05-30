import React from "react";
import * as ol from 'openlayers';
import StyleOpenLayers from "./ol.scss"
import Style from "./choropleth-map.scss"

import LoaderIndicator from "./../LoaderIndicator"
import Legend from "./../Legend"

class ChoroplethMap extends React.Component {
    constructor(props){
      super(props);

      this.state = {}; 
    }
  
    componentDidMount() {
      this.setState({ showLoading: true });

      var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8080/cmae-services-gis/v1/country/geojson'
      });

      vectorSource.on('change', () => {
        this.setState({ showLoading:false });
      });

      var buildingStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(240, 240, 240, 1)'
        }),
        stroke: new ol.style.Stroke({
          color: '#444',
          width: 1
        })
      });

      var colors = ["#FFFFFF","#DDD5A6","#E98B2C","#CE4B31","#2C675D"];

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature, zoom) {
          /*let textValue = '';
          if(zoom <= 5000){
            textValue = feature.get('iso') + " - " + feature.get('count');
          }

          buildingStyle.getText().setText(textValue);*/

          if(feature.get('count') === 0){
            buildingStyle.getFill().setColor(colors[0]);
          } else if(feature.get('count') >=1 && feature.get('count') < 100){
            buildingStyle.getFill().setColor(colors[1]);
          } else if(feature.get('count') >=100 && feature.get('count') < 250){
            buildingStyle.getFill().setColor(colors[2]);
          } else if(feature.get('count') >=250 && feature.get('count') < 500){
            buildingStyle.getFill().setColor(colors[3]);
          } else if(feature.get('count') >=500){
            buildingStyle.getFill().setColor(colors[4]);
          }

          return buildingStyle;
        }
      });

      vectorLayer.setOpacity(0.6);

      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          vectorLayer
        ],
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 3,
          minZoom: 3,
          maxZoom: 19,
        }),
        controls: ol.control.defaults({ attribution: false }),
      });
    }

    render() {
        return (
          <div className="wrapper">
            { this.state.showLoading ? <LoaderIndicator /> : null }
            <div id="map" className="map"></div>
            <Legend />
          </div>
        );
    }
}

export default ChoroplethMap;
