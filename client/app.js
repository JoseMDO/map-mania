let gMap;

async function initMap() {
    // The location of Uluru
    const position1 = { lat: 41.5250, lng: -88.0817 };
    const position2 = { lat: 40.4168, lng: -3.7038 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    // The map, centered at Uluru
    gMap = new Map(document.getElementById("myMapID"), {
      zoom: 4,
      center: position1,
      mapId: "DEMO_MAP_ID",
    });
  
    // The marker, positioned at Uluru
    const marker1 = new google.maps.Marker({
      map: gMap,
      position: position1,
      title: "Joliet",
    });

    const marker2 = new google.maps.Marker({
        map: gMap,
        position: position2,
        title: "Madrid",
        icon: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'
    })

    const infoWindow = new google.maps.InfoWindow({
        content: 'Madrid, Spain',

    });
    marker2.addListener('click', function () {
        infoWindow.open(gMap, marker2);
    });

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
  }
  
  initMap();
  