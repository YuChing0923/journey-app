import React, { useState, useEffect } from 'react';
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
  const handleApiLoaded = (map, maps) => {
    console.log('handleApiLoaded', data);
    let allData = [];
    for (let dailyData of data) {
      allData.push(...dailyData)
    }

    if (map) {
      setMap(map);
      const directionsService = new maps.DirectionsService();
      const directionsDisplay = new maps.DirectionsRenderer();
      let waypoints = [];
      if (allData.length > 2) {
        for (let i = 1; i < allData.length - 1; i++) {
          waypoints.push({location: allData[i].landmark})
        }
      }

      directionsService.route({
        origin: allData[0].landmark,
        destination: allData[allData.length - 1].landmark,
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

  // code to run after currentDay render goes here
  useEffect(() => {
    onCenterChange({lat: data[currentDay][0].lat, lng: data[currentDay][0].lng})
  }, [currentDay]);


  // 重新定位中心
  // position = { lat: 0, lng: 0 }
  const onCenterChange = (position, id) => {
    if (map && position) map.setCenter(position);
    setCurrentId(id);
  }

  const onChildMouseEnter = (index, childProps) => {
    setCurrentId(childProps.id);
    // console.log('onChildMouseEnter');
  }
  const onChildMouseLeave = () => {
    setCurrentId(false);
    // console.log('onChildMouseLeave')
  }

  // 載入地圖
  const onMapLoaded = (map, maps) => {
    const initMakers = [];
    setMap(map);
    setMaps(maps);
    setMapLoaded(true);
  }

  // 路徑圖繪製
  const afterMapLoadChanges = () => {
    return (
      <div style={{display: 'none'}}>
        <Polyline
          data={data[currentDay]}
          map={map}
          maps={maps}
          markers={data[currentDay]} />
      </div>
    )
  }

  return (
    <div className="map_page">
      <TimeTable {...{
        moveMark: (data, id) => {
          onCenterChange({
            lat: data.lat,
            lng: data.lng,
          }, id)
        },
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
          onChildClick={(key, childProps) => onCenterChange({lat: childProps.lat, lng: childProps.lng})}
          onChildMouseEnter={onChildMouseEnter}
          onChildMouseLeave={onChildMouseLeave}
          // onGoogleApiLoaded={({ map, maps }) => onMapLoaded(map, maps)}
          // Todo: travelMode
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        { data[currentDay].map(d => <Maker
            {...{
              key: d.id,
              id: d.id,
              lat: d.lat,
              lng: d.lng,
              landmark: d.landmark[0],
              currentId: currentId,
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
              }, d.id)
            }}>
              <div>
                <div className="time">{moment(d.date, 'HH:mm').format('HH:mm')}</div>
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