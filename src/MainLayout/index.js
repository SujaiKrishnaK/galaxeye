import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import PolygonData from "./polygon";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const MainLayout = () => {
  const [drawnCords, setDrawnCords] = useState(null);
  const position = [15.317277, 75.71389];
  const polygonOptions = {
    shapeOptions: {
      color: "green",
      fillColor: "green",
      fillOpacity: 0.2,
    },
  };

  const _onCreate = (e) => {
    const layer = e.layer;
    const newLatLngs = layer
      .getLatLngs()[0]
      .map(({ lat, lng }) => ({ lat, lng }));
    console.log(newLatLngs, "created");
    setDrawnCords(newLatLngs);
  };
  const _onEdited = (e) => {
    const layers = e.layers;
    layers.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        const updatedLatLngs = layer
          .getLatLngs()[0]
          .map(({ lat, lng }) => ({ lat, lng }));
        setDrawnCords(updatedLatLngs);
      }
    });
  };
  const _onDelete = (e) => {
    setDrawnCords([]);
  };
  return (
    <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
      <PolygonData coords={drawnCords} />
      <TileLayer
        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDelete}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polygon: polygonOptions,
          }}
        ></EditControl>
      </FeatureGroup>
    </MapContainer>
  );
};
export default MainLayout;
