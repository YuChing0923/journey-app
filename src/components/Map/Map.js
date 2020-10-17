import React, { useState } from 'react';
import '../../assets/scss/main.scss';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import { GOOGLE_MAP } from '../../assets/key';
import MapMaker from './mapMaker.js';
import data from './temp_data.js';

const SimpleMap = ({zoom}) => {
  const [center, setCenter] = useState({
        lat: 23.546162,
        lng: 120.6402133,
      });
  const [currentId, setCurrentId] = useState(false);
  const [hoverDom, setHoverDom] = useState(false);

  // google api 路徑繪製
  const handleApiLoaded = (map, maps, data) => {
    if (map) {
      const directionsService = new maps.DirectionsService();
      const directionsDisplay = new maps.DirectionsRenderer();
      let waypoints = [];
      if (data.length > 2) {
        for (let i = 1; i < data.length - 1; i++) {
          waypoints.push({location: data[i].landmark})
        }
      }

      directionsService.route({
        origin: data[0].landmark,
        destination: data[data.length - 1].landmark,
        waypoints: waypoints,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
            strokeColor: "#187afb",
            strokeWeight: 3,
            geodesic: true,
          });
          routePolyline.setMap(map);
        } else {
          window.alert('Directions request failed due to ' + status);
          }
        }
      );
    }
  };

  const onChildClick = () => {
    console.log('onChildClick')
  }
  const onChildMouseEnter = (index, childProps) => {
    setCurrentId(childProps.id);
    console.log('onChildMouseEnter');
  }
  const onChildMouseLeave = () => {
    setCurrentId(false);
    console.log('onChildMouseLeave')
  }

  return (
    <div className="map_page">
      <TimeTable {...{
        moveMark: data => {
          setCenter({
            lat: data.lat,
            lng: data.lng,
          });
        },
        currentId: currentId,
      }}/>
      <div className="google-map-section">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP.KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onChildClick={onChildClick}
          onChildMouseEnter={onChildMouseEnter}
          onChildMouseLeave={onChildMouseLeave}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, data)}
        >
        { data.map(d => <MapMaker
            {...{
              id: d.id,
              lat: d.lat,
              lng: d.lng,
              landmark: d.landmark[0],
              hoverDom: hoverDom,
            }}
          />)}
        </GoogleMapReact>
      </div>
    </div>
  );
}
SimpleMap.defaultProps = {
    zoom: 8
}



// 時間軸
const TimeTable = (props) => {
  return (
    <div className="timetable">
      <nav>
        <ul>
          <li className="active">Day1</li>
          <li>Day2</li>
          <li>Day3</li>
        </ul>
      </nav>
      <div className="timetable_list">
        { data.map(d =>
            <div key={d.id} className={`schedule ${props.currentId === d.id ? 'maker_hover' : ''}`} onClick={() => {
              props.moveMark({
                lat: d.lat,
                lng: d.lng,
                landmark: d.landmark,
              })
            }}>
              <div>
                <div className="time">{moment(d.date).format('HH:mm')}</div>
              </div>
              <div>
                <div className="title">{d.landmark}</div>
                <p className="content">{d.content}</p>
              </div>
            </div>
          ) }
      </div>
    </div>
  );
}
const handleMarkerClick = (maps, marker) => {
  console.log('click', marker);
}

export default SimpleMap;