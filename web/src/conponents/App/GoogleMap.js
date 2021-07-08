
import React from "react";
 
import { useGoogleMaps } from "react-hook-google-maps";
import './App.css';

// const Map = "AIzaSyDL_o6yW-LTS4gvNjff4gpeYjJX2viojnM" //Google map api key for this project. (.env)
// console.log(Map)

 
const GoogleMap = ({dev}) => {

  // const { ref, map, google } = useGoogleMaps(
  //   // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
  //   Map,
  //   // NOTE: even if you change options later
  //   {
  //     center: { lat: 0, lng: 0 },
  //     zoom: 3,
  //   },
  // );
  // console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  // console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
  return (
    <>
    {/* <div ref={ref} style={{ width: 200, height: 100 }} />; */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1919.1068580410877!2d-48.630455487126305!3d-26.994026035752007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1591308615528!5m2!1spt-BR!2sbr" ></iframe>

    </>
  )
};
 
export default GoogleMap;

// const GoogleMap = () => {

//   return (
//   <>
//   <div>
//     <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1919.1068580410877!2d-48.630455487126305!3d-26.994026035752007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1591308615528!5m2!1spt-BR!2sbr" ></iframe>
//   </div>
//   </>
//   )
// }

// export default GoogleMap();