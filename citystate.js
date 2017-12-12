const sheets = new Sheets({
    key: '1ct6USPp-JQQiDQhFlDQYzftwcR9OYNzPiqskQa8v36w',
    query: 'order by A desc'
});

//new map
var map;
function initMap() {

map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 30.9285096, lng: -95.261509},
  // @36.9285096,-115.261509,4z
  zoom: 4
});


// FAKE MARKERS:
// var marker = new google.maps.Marker({
//   position: {lat: 30.9285096, lng: -95.261509},
//   map: map,
//   title: 'Hello World!'
// });
//
//   var laredoMarker = new google.maps.Marker({
//     position: {lat: 27.5306, lng: -99.4803},
//     map: map,
//     title: '446,479 Deportations in Laredo TX'
//   });
//


const geocoder =  new google.maps.Geocoder();

sheets.getData(data => {
    //loop through records and output to the screen:
    console.log(data)
    let num = 1
    const latlngArray = data.records.forEach(record => {
      geocoder.geocode( { 'address': record.city + ', ' + record.state}, (results, status) => {
        record.lat = results[0].geometry.location.lat()
        record.lng = results[0].geometry.location.lng()
        console.log(record)

        const marker = new google.maps.Marker({
          position: {lat: record.lat, lng: record.lng},
          map: map,
          title: `${record.city} , ${record.state}. Total Deported (October 2002 through June 2017) = ${record.departures}`,
          optimized: false
        })
      })
    })

    // new google.maps.Marker({
    //   position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
    //   map: map,
    //   title: record.city + ', ' + record.state  + '. Total Deported (October 2002 through June 2017) = ' + record.departures
    //   })
    data.records.forEach(record => {
        const tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerHTML = num
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.departures
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.state
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.facility_name
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.facility_type
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.per_diem_rate
        tr.appendChild(td)
        //
        document.querySelector('#content tbody').appendChild(tr)
        ++num
    })
});
}
