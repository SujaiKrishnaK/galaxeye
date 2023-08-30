import React, { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import jsonData from "./data.json";
import L from "leaflet";
import * as turf from "@turf/turf";

const PolygonData = ({ coords }) => {
  const [data, setData] = React.useState();
  const [intersectedPolygons, setIntersectedPolygons] = React.useState([]);
  const polygonStyle = {
    fillColor: "blue",     
    color: "blue",        
    weight: 1,             
    fillOpacity: 0.2,      
  };

  useEffect(() => {
    const getData = async () => {
      setData(jsonData);
    };
    getData();
  }, []);

  useEffect(() => {
    let intersected = [];
    if (data && coords?.length > 0) {
      let formattedDrawnCoords = formatDrawn(coords);
      //   console.log(formattedDrawnCoords,"formattedDrawnCoords")
      let drawnCoords = turf.polygon([formattedDrawnCoords]);

      data.features.forEach((obj) => {
        let currPoly = turf.polygon(obj.geometry.coordinates);
        let isIntersected = turf.booleanOverlap(drawnCoords, currPoly);

        if (isIntersected) {
          intersected.push(currPoly);
        }
      });
      console.log(intersected, "OOOOO");
      setIntersectedPolygons(intersected);
    } else {
      setIntersectedPolygons([]);
    }
  }, [coords]);

  const formatDrawn = (pos) => {
    let formatted = [];
    pos.forEach((po) => {
      formatted.push([po.lng, po.lat]);
    });
    // console.log(formatted, "Formatted");
    formatted.push([pos[0].lng, pos[0].lat]);
    return formatted;
  };
  if (intersectedPolygons?.length > 0) {
    return (
      <GeoJSON
        key={JSON.stringify(intersectedPolygons)}
        data={intersectedPolygons}
        style={polygonStyle}
      />
    );
  } else {
    return null;
  }
};

export default PolygonData;
