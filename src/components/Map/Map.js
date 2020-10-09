import React, { useState } from 'react';
import '../../assets/scss/main.scss';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import { GOOGLE_MAP } from '../../assets/key';

let data = [
  {
    id: 1,
    date: '2020/09/28 10:00:00',
    landmark: '崎頂隧道文化公園',
    lat: 24.7295481,
    lng: 120.8764177,
    content: '第一站！',
  },
  {
    id: 2,
    date: '2020/09/28 12:00:00',
    landmark: '建中國小3D彩繪階梯',
    lat: 24.4138864,
    lng: 120.7683948,
    content: '',
  },
  {
    id: 3,
    date: '2020/09/28 14:00:00',
    landmark: '龍騰斷橋(魚藤坪斷橋)',
    lat: 24.3584335,
    lng: 120.7716469,
    content: '',
  },
  {
    id: 4,
    date: '2020/09/28 15:00:00',
    landmark: '路思義教堂',
    lat: 24.1788952,
    lng: 120.5983652,
    content: '',
  },
  {
    id: 5,
    date: '2020/09/28 20:00:00',
    landmark: '望高寮夜景公園',
    lat: 24.1435843,
    lng: 120.5791395,
    content: '',
  },
]


const SimpleMap = ({zoom}) => {
  const [center, setCenter] = useState({
        lat: 23.546162,
        lng: 120.6402133,
      });
  const [currentlat, setCurrentlat] = useState(24.7295481);
  const [currentlng, setCurrentlng] = useState(120.8764177);
  const [currentMark, setCurrentMark] = useState('崎頂隧道文化公園');

  return (
    <div className="map_page">
      <TimeTable {...{
        moveMark: data => {
          setCenter({
            lat: data.lat,
            lng: data.lng,
          });
          setCurrentlat(data.lat);
          setCurrentlng(data.lng);
          setCurrentMark(data.landmark);
        },
      }}/>
      <div className="google-map-section">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP.KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, data)}
        >
        {/* data.map(d => <Pin
            {...{
              lat: d.lat,
              lng: d.lng,
              landmark: d.landmark,
            }}
          />) */}
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
            <div key={d.id} className="schedule" onClick={() => {
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

// google api
const handleApiLoaded = (map, maps, data) => {
  if (map) {
    // 景點繪製
    for (let d of data) {
      let marker = new maps.Marker({
        position: { lat: d.lat, lng: d.lng},
        map,
        title: d.landmark,
      });
    }

    // 路徑繪製
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
          path: response.routes[0].overview_path
        });
        routePolyline.setMap(map);
      } else {
        window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
};

const Pin = (props) => {
  return (
    <div className="pin">{props.landmark}</div>
  );
}

export default SimpleMap;