let gMap;
let locationsArray;

async function initMap() {
    try{
        const response = await fetch('https://map-mania-json.azurewebsites.net/api/favorite-places');
        const result  = await response.json();
        locationsArray = result;
    } catch(err) {
        console.log(err)
    }

    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    gMap = new Map(document.getElementById("myMapID"), {
      zoom: 4,
      center: {lat: 41.5250, lng: -88.0817},
      mapId: "DEMO_MAP_ID",
    });
  
    function mapLocations(locationsArray) {
        locationsArray.forEach((location) => {
            const marker = new google.maps.Marker({
                position: {lat:location.location.lat, lng:location.location.lng},
                map: gMap,
                title: location.title,
                icon: location.iconImage,
                content: location.content
            })
            const infoWindow = new google.maps.InfoWindow({
                content: marker.content
            });
            marker.addListener('click', () => {
                infoWindow.open({
                    anchor: marker,
                    map: gMap
                })
            })
        });
    }
  

    // const marker2 = new google.maps.Marker({
    //     map: gMap,
    //     position: position2,
    //     title: "Madrid",
    //     icon: "https://img.icons8.com/cotton/40/parthenon--v1.png"
    // })

    // const infoWindow = new google.maps.InfoWindow({
    //     content: 'This is my hometown! I currently live here and have lived here for the last 20 years!',

    // });
    // marker2.addListener('click', function () {
    //     infoWindow.open(gMap, marker2);
    // });

    google.maps.event.addListener(gMap, 'bounds_changed', function () {
        updateGame();
    });

    function updateGame() {
        console.log('Function updateGame() google-maps-step-03!');
        const zoomLevel = gMap.getZoom();
        var inBounds = false;

        if(gMap.getBounds().contains({lat: 41.5250, lng:-88.0817})) {
            inBounds = true;
        }
        console.log("inbounds:" + inBounds + " xoomLevel: "+zoomLevel);
    }
    mapLocations(locationsArray);
  }
  
initMap();
  