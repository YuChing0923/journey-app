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
    renderPolylines()
  });
  return null
}

export { Maker, Polyline };