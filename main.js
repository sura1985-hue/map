var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        var marker = L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('A sample marker!')
            .openPopup();

        document.getElementById('search-btn').addEventListener('click', function() {
            var query = document.getElementById('search-input').value;
            if (!query) return;
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        var lat = data[0].lat;
                        var lon = data[0].lon;
                        map.setView([lat, lon], 13);
                        marker.setLatLng([lat, lon])
                            .setPopupContent(query)
                            .openPopup();
                    } else {
                        alert('Location not found!');
                    }
                });
        });