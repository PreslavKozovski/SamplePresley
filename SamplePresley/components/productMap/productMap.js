'use strict';

app.productMap = kendo.observable({
    onShow: function () {
        var location = window.location.toString();
        var barcode = location.substring(location.lastIndexOf('?') + 4);
        alert(barcode);
        Mapbox.show(
  {
      style: 'streets', // light|dark|emerald|satellite|hybrid|streets
      margins: {
          top: 50,
          bottom: 0,
          left: 0,
          right: 0,
          //  top: navigator.userAgent.indexOf("Android") == -1 ? 316 : 150, 
          //  bottom: navigator.userAgent.indexOf("Android") == -1 ? 50 : 0 
      },
      center: {
          lat: 52.3702160,
          lng: 4.8951680
      },
      zoomLevel: 12,
      showUserLocation: true,
      hideAttribution: false,
      hideLogo: false,
      hideCompass: false,
      disableRotation: false,
      disableScroll: false,
      disableZoom: false,
      disablePitch: false
  },
  function () {
      Mapbox.addMarkerCallback(function (selectedMarker) {
          alert("Marker selected: " + JSON.stringify(selectedMarker));
      });
  },
  this.onError
)
    },
    afterShow: function () {
        for (var i = 0; i < product.Latitudes.length; i++)
        {
            Mapbox.addMarkers(
	            [
                    {
                        'lat': product.Latitudes[i],
                        'lng': product.Longitudes[i],

                    }
	            ],
            this.onSuccess,
            this.onError
            );
        }        
    },
    onSuccess: function (msg) {
        console.log('Mapbox success: ' + msg);
    },

    onSuccessWithAlert: function (msg) {
        alert(JSON.stringify(msg));
    },

    onError: function (msg) {
        alert('Mapbox error: ' + msg);
    },
    onHide: function () {
        Mapbox.hide(
            {},
            this.onSuccess,
            this.onError
        );
    }
});

