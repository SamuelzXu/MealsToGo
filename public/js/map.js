function initialize() {
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(43.485435, -80.540270),
		scrollwheel: false,
		draggable: false
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	setMarkers(map, locations);
}

var picks = [
	['shawermaPlus', 43.474946, -80.524212, 1],
	['chinaLegend', 43.472391, -80.537403, 2],
	['yesBuffet', 43.502025, -80.533804, 3],
	['almadinaJustNPita', 43.472648, -80.536006, 4],
	['williamsFreshCafe', 43.476755, -80.522856, 5],
	['wingsup', 43.476887, -80.520759, 6]
];

var locations = [
	['johnnyFresco', 43.477745, -80.519415, 1],
	['noonMoment', 43.475147, -80.524566, 2],
	['meetPoint', 43.472379, -80.536006, 3],
	['tastyHomeKitchen', 43.476109, -80.525872, 4]
];

function setMarkers(map, locations) {
	var marker = {
        url: 'img/kraken-uzyqfr/pin.png',
        size: new google.maps.Size(38, 35)
	};
	var pickmarker = {
		url: 'img/kraken-uzyqfr/pin2.png',
		size: new google.maps.Size(38, 35)
	};
    var shape = {
		coord: [1, 1, 1, 20, 18, 20, 18 , 1],
		type: 'poly'
	};
	for (var i = 0; i < picks.length; i++) {
		var restaurant = picks[i];
		var myLatLng = new google.maps.LatLng(restaurant[1], restaurant[2]);

		var image = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: pickmarker,
			shape: shape,
			title: restaurant[0],
			zIndex: restaurant[3],
			animation: google.maps.Animation.DROP
		});
	}

	for (var i = 0; i < locations.length; i++) {
		var restaurant = locations[i];
		var myLatLng = new google.maps.LatLng(restaurant[1], restaurant[2]);

		var image = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: marker,
			shape: shape,
			title: restaurant[0],
			zIndex: restaurant[3],
			animation: google.maps.Animation.DROP
		});
	}
}

// google.maps.event.addDomListener(window, 'load', initialize);