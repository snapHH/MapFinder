// Initialize the map and set view
var map = L.map('map').setView([51.505, -0.09], 2);  // Initial coordinates (can be any default location)

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Handle search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    var location = document.getElementById('locationInput').value;

    if (location.trim() === "") {
        alert("Please enter a location.");
        return;
    }

    // Make a request to the backend with the location input
    fetch(`/search?location=${location}`)
        .then(response => response.json())
        .then(data => {
            // Check if the response contains any results
            if (data.results && data.results.length > 0) {
                var result = data.results[0];  // Assuming this is the first result
                var lat = result.geometry.lat;
                var lng = result.geometry.lng;

                // Update the map with a marker at the searched location
                map.setView([lat, lng], 13);  // Move the map to the searched location
                L.marker([lat, lng]).addTo(map).bindPopup(`<b>${location}</b><br>Latitude: ${lat}, Longitude: ${lng}`).openPopup();
            } else {
                alert("No location found.");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            alert("Error finding location. Please try again.");
        });
});
