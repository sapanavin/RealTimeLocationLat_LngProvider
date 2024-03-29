*************************  Real Time GPS Tracker Data Generator ********************************************

# Frontend is Index.html with Javascript which uses Browser's Geolocation API.
    which uses fetch request to make POST method to Backend with 
    
            fetch('http://localhost:3000/save-data', {   
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(location)
                    });
      -----------------------------------------------------------------
                    where POST body has :  
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        timestamp: position.timestamp, 
                    };


# Backed Is Node Js code having folowing post HTTP method
    app.post('/save-data', (req, res));
    here Node js receives the loction and save it to Excel Sheet.
    For every Entry it saves a row in Excel sheet.
-----------------------------------------------------------------------------------------------------------------------
    *Limitations 
    Here per second we are fetching data from geolocation and them make post request.
    because of this sometime there is loading issue and we miss some data .
    but still it is just for testing purpose so hope it will work.