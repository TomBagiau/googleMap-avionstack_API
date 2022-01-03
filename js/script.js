
var MAP_API = {

	AVIATION_API_URL: "http://api.aviationstack.com/v1/airports?access_key=994c175cb82e1feb3e67101dc6c208ed",

	map : null,
	airports: null,

	initMap : function () {

		this.buildMap();
		this.fetchData();
	},

	buildMap : function () {
		
		// The location of Paris
		const paris = { lat: 48.8534, lng: 2.3488  };

		// The map, centered at Paris
		this.map = new google.maps.Map(document.getElementById("map"), {
  			zoom: 5,
  			center: paris,
		});

		// The marker, positioned at Paris
		const marker = new google.maps.Marker({
  			position: paris,
  			map: map,
	});
	},

	fetchData : function () {
		fetch(this.AVIATION_API_URL)
			.then((response) => {
				return response.json()
					.then((json) => {
						this.appendElementToList(json.data)
						this.addMarkerToMap(json.data)
					})
			})
		},

	//Afficher les noms des aéroports dans des li
	appendElementToList : function ( airports ) {

		let list = document.getElementById('airports-list')
		for(let i=0; i<airports.length; i++) {
			let airport = document.createElement('li')
			airport.innerHTML = airports[i].airport_name
			list.appendChild(airport)

			airport.addEventListener('click', () => {
				this.clickAndZoom(parseFloat(airports[i].latitude), parseFloat(airports[i].longitude))
			})

			
		}
	},


	//Ajout des marker sur les aéroports
	addMarkerToMap : function( airports ) {
		

		for (let i = 0; i < airports.length; i++) {
			let airportPosition = {
				lat: parseFloat(airports[i].latitude),
				lng: parseFloat(airports[i].longitude)
			}

			let plane = new google.maps.Marker({
				position: airportPosition,
				map: this.map,
				icon: this.icon = {
					url: "./img/plane.svg",
					anchor: new google.maps.Point(10,20),
					scaledSize: new google.maps.Size(20,20)
				}
			})
		}
	},

	//click sur un nom zoom sur la map
	clickAndZoom : function ( lat, long ) {
		this.map.setCenter({lat:lat, lng:long})
		this.map.setZoom(12)
	},


}
