import React, { useEffect} from 'react';

const Maker = (props) => {
  return (
    <div className="pin">{props.landmark}</div>
  );
}

const Polyline = (props) => {

  const renderPolylines = () => {
    const { markers, map, maps } = props;

    let geodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: true,
      strokeColor: '#187afb',
      strokeWeight: 3
    })
    geodesicPolyline.setMap(map)
  }


  useEffect(() => {
    const { maps, data } = props;
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
          // renderPolylines()
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  });
  return null
}

export { Maker, Polyline };