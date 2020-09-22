import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAP } from '../../assets/key'

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
        <div className="schedule" onClick={() => {
          props.moveMark({
            lat: 24.7295481,
            lng: 120.8764177,
            landmark: '崎頂隧道文化公園',
          })
        }}>
          <div><div className="time">10:00</div></div>
          <div>
            <div className="title">崎頂隧道文化公園</div>
            <p className="content">第一站！</p>
          </div>
        </div>
        <div className="schedule" onClick={() => {
          props.moveMark({
            lat: 24.4138864,
            lng: 120.7683948,
            landmark: '建中國小3D彩繪階梯',
          })
        }}>
          <div><div className="time">12:00</div></div>
          <div>
            <div className="title">建中國小3D彩繪階梯</div>
            <p className="content">順便吃飯吃飯吃飯</p>
          </div>
        </div>
        <div className="schedule" onClick={() => {
          props.moveMark({
            lat: 24.3584335,
            lng: 120.7716469,
            landmark: '龍騰斷橋(魚藤坪斷橋)',
          })
        }}>
          <div><div className="time">14:00</div></div>
          <div>
            <div className="title">龍騰斷橋(魚藤坪斷橋)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 17
  };
  
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 24.7295481,
        lng: 120.8764177,
      },
      currentlat: 24.7295481,
      currentlng: 120.8764177,
      currentMark: '崎頂隧道文化公園',
    }
  }
  
  moveMark = (data) => {
    this.setState({
      currentlat: data.lat,
      currentlng: data.lng,
      currentMark: data.landmark,
      center: {
        lat: data.lat,
        lng: data.lng,
      },
    })
  }

  render() {
    const { currentlat, currentlng, currentMark } = this.state;
    return (
      <div className="map_page">
        <TimeTable {...{
          moveMark: data => this.moveMark(data),
        }}/>
        <div className="google-map-section">
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAP.KEY }}
            defaultCenter={this.state.center}
            defaultZoom={this.props.zoom}
          >
            <Pin
              {...{
                lat: currentlat,
                lng: currentlng,
                landmark: currentMark,
              }}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const Pin = (props) => {
  return (
    <div className="pin">{props.landmark}</div>
  );
}

export default SimpleMap;