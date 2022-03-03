

$.getJSON('./data/acorows.json', function(acoRows){
  console.log(acoRows)

  mapboxgl.accessToken = 'pk.eyJ1Ijoibm1vbmVtZSIsImEiOiJja3pyYnNmdDA2cXE4Mndtejd5MndwZXFyIn0.3B86lPpNNoajWqAGCQyWYw'

  // lngLat for ...
  var wspCenter = [-73.905774,40.772324]
// -73.876877,40.762332



  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v9', // style URL
    center: wspCenter, // starting position as [lng, lat]
    zoom: 10
  });


// locations of departments using nyc-doh.geojson
  map.on('load', function()  {
    map.addSource('nyc-doh', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: './data/nyc-doh.geojson'
  });


map.addLayer({
    'id': 'nyc-doh-fill',
    'type': 'fill',
    'source': 'nyc-doh',
    'paint': {
      'fill-color': '#ed7272',
      'fill-outline-color': '#db1212'
    }
  });

//   map.addSource('nyc-doh-locations', {
//   type: 'geojson',
//   // Use a URL for the value for the `data` property.
//   data: './data/nyc-doh-locations.geojson'
//   });
//
//
//   map.addLayer({
//       'id': 'nyc-doh-shape',
//       'type': 'fill',
//       'source': 'nyc-doh-locations',
//       'paint': {
//         'fill-color': '#ed7272',
//         'fill-outline-color': '#db1212'
//       }
//     });
//   })
//
})

// create pop up for doh
    map.on('click', 'nyc-doh-fill', function(e) {

      const coordinates = e.lngLat;
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address;
      const phone = e.features[0].properties.phone;

      const popupText=`
        <p> <strong>${name}</strong> is located at <strong>${address} </strong> and can be reached by phone at <strong>${phone} </strong>.</p>
      `;

      new mapboxgl.Popup({ offset: 10 })
        .setLngLat(coordinates)
        .setHTML(popupText)
        .addTo(map);

    });

    // locate the NYC DOH with a click on the button
    // https://docs.mapbox.com/mapbox-gl-js/example/flyto/
    $('#find-doh').on('click', function() {
        map.flyTo({
          center: [
            -73.938973,
            40.749424
          ],
          zoom: 17,
        })

      })


// // create legend
// const layers = [
//
// 'Bronx Accountable Healthcare Network IPA, Inc.',
// 'Mount Sinai',
// 'CAIPA Care, LLC',
// 'NYC Health + Hospitals'
// ];
// const colors = [
// 'brown',
// 'pink',
// 'orange',
// 'blue'
// ];
//
// // create legend. Source: https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/#add-a-legend
// const legend = document.getElementById('legend');
//
// layers.forEach((layer, i) => {
//
//   const color = colors[i];
//  const item = document.createElement('div');
//  const key = document.createElement('span');
//  key.className = 'legend-key';
//  key.style.backgroundColor = color;
//
//  const value = document.createElement('span');
//  value.innerHTML = `${layer}`;
//  item.appendChild(key);
//  item.appendChild(value);
//  legend.appendChild(item);
// });

    var popup = new mapboxgl.Popup({
      offset: 40,
    })


  // marker for the wsp function
  var marker = new mapboxgl.Marker()
    .setLngLat(wspCenter)
    .setPopup(popup)
    .addTo(map);

  var pointsOfInterest = [
    {

      lngLat: [-73.941142,40.6855193],
      popupHtml: 'Gotham Health, Bedford'

    },
    {

      lngLat: [-73.9852141,40.5759476],
      popupHtml: 'Ida G Israel'

    },
    {

      lngLat: [-73.9427675,40.6995249],
      popupHtml: 'Woodhull'

    }
  ]

  pointsOfInterest.forEach(function(pointsOfInterest) {
    var popup = new mapboxgl.Popup({ offset: 40})
     .setHTML(`
       <h3>${pointsOfInterest.popupHtml}</h3>
       <p>${pointsOfInterest.subText}</p>
       `);


    new mapboxgl.Marker()
      .setLngLat(pointsOfInterest.lngLat)
      .setPopup(popup)
      .addTo(map);
  })


  //add markers for accountable care Morningside
  acoRows.forEach(function(acoRow){
    var popup = new mapboxgl.Popup({ offset: 40})
     .setHTML(`
       <p><strong>${acoRow.OrgName}</strong> is an Accountable Care Organization in <strong>${acoRow.Company}</strong></p>
       `);

//defualt is blue for NYC H+H
  var color = 'blue'

  if (acoRow.Company === 'Bronx Accountable Healthcare Network IPA, Inc.') {
    color = 'brown'
  }

  if (acoRow.Company === 'Mount Sinai') {
    color = 'pink'
  }

  if (acoRow.Company === 'CAIPA Care, LLC') {
    color = 'orange'
  }

    new mapboxgl.Marker({
      color: color
    })
    .setLngLat([acoRow.longitude, acoRow.latitude])
    .setPopup(popup)
    .addTo(map);
  })
})
