document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'dcd19176f68887d2d08be944e03421d5';
    
    const city = 'New York'; 
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const currentTemp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const high = Math.round(data.main.temp_max);
            const low = Math.round(data.main.temp_min);
            
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            document.querySelector('.weather-icon').src = iconUrl;
            document.querySelector('.weather-icon').alt = description;
            document.querySelector('.temp').textContent = `${currentTemp}° F`;
            document.querySelector('.weather-data p:nth-child(2)').textContent = description;
            document.querySelector('.weather-data p:nth-child(3)').textContent = `High: ${high}°`;
            document.querySelector('.weather-data p:nth-child(4)').textContent = `Low: ${low}°`;
            document.querySelector('.weather-data p:nth-child(5)').textContent = `Humidity: ${humidity}%`;
            document.querySelector('.weather-data p:nth-child(6)').textContent = `Sunrise: ${sunrise}`;
            document.querySelector('.weather-data p:nth-child(7)').textContent = `Sunset: ${sunset}`;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            document.querySelector('.current-weather').innerHTML = '<p>Weather data currently unavailable</p>';
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const today = new Date().getDate();
            
            const dailyTemps = {};
            
            data.list.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                const forecastDay = forecastDate.getDate();
                
                const hour = forecastDate.getHours();
                
                if (forecastDay === today) {
                    return;
                }
                
                if (hour >= 11 && hour <= 13) {
                    dailyTemps[forecastDay] = Math.round(forecast.main.temp);
                }
            });
            
            const nextThreeDays = Object.keys(dailyTemps).slice(0, 3);
            
            const forecastContainer = document.querySelector('.forecast-data');
            forecastContainer.innerHTML = ''; 
            
            const todayTemp = Math.round(data.list[0].main.temp);
            forecastContainer.innerHTML += `<p>Today: <span>${todayTemp}°F</span></p>`;
            
            let dayCount = 0;
            nextThreeDays.forEach(day => {
                dayCount++;
                if (dayCount <= 2) { 
                    const date = new Date();
                    date.setDate(parseInt(day));
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    forecastContainer.innerHTML += `<p>${dayName}: <span>${dailyTemps[day]}°F</span></p>`;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            document.querySelector('.weather-forecast').innerHTML = '<p>Forecast data currently unavailable</p>';
        });
});