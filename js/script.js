// Inicializa o mapa com o Leaflet
var map = L.map('map').setView([-23.5505, -46.6333], 13);

// Adiciona um tile layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

window.onload = function () {
    getCurrentLocation();
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            map.setView([lat, lng], 13);
        }, function () {
            alert("Não foi possível obter a sua localização.");
        });
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
}

// Adicione esta função para remover todas as marcações do mapa
function clearMarkers() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

// Adicione esta função após inicializar o mapa
function addMarkerOnClick(e) {
    var marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup("<b>Informações sobre o local.</b><br>Clique para obter mais informações.").openPopup();
}

// Adicione um evento de clique no mapa para chamar a função addMarkerOnClick()
map.on('click', addMarkerOnClick);

// Adicione esta função após inicializar o mapa
function addMarker(lat, lng, popupContent) {
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(popupContent);

    marker.on('click', function () {
        $('#markerModal').modal('show');
    });
}