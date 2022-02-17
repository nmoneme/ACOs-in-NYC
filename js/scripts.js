

$.getJSON('/data/acorows.json', function(acoRows){
  console.log(acoRows)

  mapboxgl.accessToken = 'pk.eyJ1Ijoibm1vbmVtZSIsImEiOiJja3pyYnNmdDA2cXE4Mndtejd5MndwZXFyIn0.3B86lPpNNoajWqAGCQyWYw'

  // lmgLat for ...
  var wspCenter = [-73.876877,40.762332]
// 74.0060, 40.7128
  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v9', // style URL
    center: wspCenter, // starting position as [lng, lat]
    zoom: 10
  });

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
