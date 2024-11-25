// Initialize the map
const map = L.map('map').setView([56.95, 24.11], 8); // Rīgas koordinātas kā sākuma punkts

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load geoJSON data and plot markers
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const coords = feature.geometry.coordinates;
            const latLng = LKS92WGS84.convertXYToLatLon(coords); // EPSG:3059 -> WGS84
            const placeName = feature.properties.PLACENAME;

            // Create a marker
            const marker = L.marker([latLng[0], latLng[1]]).addTo(map);
            marker.bindPopup(`<b>${placeName}</b>`); // Add place name as popup
        });
    })
    .catch(error => console.error('Error loading geoJSON data:', error));
