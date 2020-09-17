import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAP } from '../../assets/key'

function TimeTable() {
  return (
    <div className="timetable">
      <nav>
        <ul>
          <li>nav</li>
          <li>nav</li>
          <li>nav</li>
        </ul>
      </nav>
      <div className="timetable_list">
        <div className="schedule">123</div>
        <div className="schedule">123</div>
        <div className="schedule">123</div>
      </div>
    </div>
  );
}

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 20.6778226,
      lng: 116.7253489,
    },
    zoom: 11
  };

  render() {
    return (
      <div className="map_page">
        <TimeTable />
        <div className="google-map-section">
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAP.KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {/* 標記地點用 */}
            <Pin
              lat={20.6778226}
              lng={116.7253489}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

function Pin() {
  return (
    <div className="pin">雨晴推薦的點</div>
  );
}

export default SimpleMap;