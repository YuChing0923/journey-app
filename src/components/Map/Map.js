import React, { useState } from 'react';
import '../../assets/scss/main.scss';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import { GOOGLE_MAP } from '../../assets/key';
import { Maker, Polyline } from './apiUtils.js';
import data from './temp_data.js';

const SimpleMap = ({zoom}) => {
  const [center, setCenter] = useState({
        lat: 23.546162,
        lng: 120.6402133,
      });
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [currentDay, setCurrentDay] = useState(0); // index from 0
  const [currentId, setCurrentId] = useState(false);

  // google api 路徑繪製
  const handleApiLoaded = (map, maps, data) => {
    console.log('handleApiLoaded', data)
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
  const onMapLoaded = (map, maps) => {
    const initMakers = [];
    for (let i = 0; i < data[currentDay].length; i++) {
      initMakers.push({lat: data[currentDay][i].lat, lng: data[currentDay][i].lng})
    }
    // setMarkers(data[currentDay]);
    setMap(map);
    setMaps(maps);
    setMapLoaded(true);
  }

  const afterMapLoadChanges = () => {
    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={map}
          maps={maps}
          markers={data[currentDay]} />
      </div>
    )
  }

  return (
    <div className="map_page">
      <TimeTable {...{
        moveMark: () => {},
        data: data,
        currentDay: currentDay,
        currentId: currentId,
        setCurrentDay: (i) => setCurrentDay(i),
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
          // onGoogleApiLoaded={({ map, maps }) => onMapLoaded(map, maps)}
          // Todo: travelMode
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, data[currentDay])}
        >
        { data[currentDay].map(d => <Maker
            {...{
              key: d.id,
              id: d.id,
              lat: d.lat,
              lng: d.lng,
              landmark: d.landmark[0],
            }}
          />)}
        { mapLoaded ? afterMapLoadChanges() : null}
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
        { props.data.map((d, i) =>
          <li {...{
            key: i,
            className: i === props.currentDay ? 'active' : '',
            onClick: () => props.setCurrentDay(i)
          }}>
            Day{i + 1}
          </li>)}
        </ul>
      </nav>
      <div className="timetable_list">
        { props.data[props.currentDay].map(d =>
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

export default SimpleMap;