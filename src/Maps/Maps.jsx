import React, { useState, useCallback, useRef } from "react";
import { GoogleMap,  useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// 地図のデザインを指定することができます。

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
  width: "80vw", 
};
// 地図の大きさを指定します。

const options = {
//   styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

const Maps=({address, lat, lng})=> {
    console.log(address)
    console.log(lng)
    console.log(lat)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAZxfWq048fxMREBEfePIQCFJIbZ0l7N_U",
    // ここにAPIキーを入力します。今回は.envに保存しています。
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。
  // debugger
  const places = [
    { info: {address}, location: { lat: lat, lng: lng } }
  ];

  const [selected, setSelected] = useState(null);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
　　　　　// デフォルトズーム倍率を指定します。
        center={{
          lat: 39.768402,
          lng: -86.158066,
        }}
　　　　　// Indianapolisにデフォルトのセンターを指定しました。
        options={options}
        onLoad={onMapLoad}
      >
          {places.map((marker) => (
          
        <Marker        
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onMouseOver={() => {
            setSelected(marker);
            // マウスオーバーで<InfoWindow>が描画されます。
          }}
        />
      ))}
      {selected ? (
        // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info.address}</div>
        </InfoWindow>
      ) : null}
      </GoogleMap>
  );
}

export default Maps;
