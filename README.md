# Test Interview Dieture
This app is built with nodejs, express and typescript

### To Run the project locally
##### install all the required dependencies

cd into the app root folder 
`npm install`
`npm run dev`

Head to:
http://localhost:5000 to see the web interface

to prepard new build version for production mode you can use `npm run tsc`



# Endpoints
To see test API Data:
- All Data:  
http://localhost:5000/api/alldata

- Filtered Data by ID and confidence:    
http://localhost:5000/api/transactions?transactionId=5c868b224aafffc5fcffd9c3&confidenceLevel=1

- For flat structure, add flat=true to the url params  
http://localhost:5000/api/transactions?transactionId=5c868b224aafffc5fcffd9c3&confidenceLevel=1&flat=true  
_Change the transactionId and/or confidenceLevel to play around with the filters_


### Run the app in production mode
https://ill-lime-spider-sari.cyclic.app/api/alldata

- Filtered Data by ID and confidence:    
https://ill-lime-spider-sari.cyclic.app/api/transactions?transactionId=5c868b224aafffc5fcffd9c3&confidenceLevel=1

- For flat structure, add flat=true to the url params  
https://ill-lime-spider-sari.cyclic.app/api/transactions?transactionId=5c868b224aafffc5fcffd9c3&confidenceLevel=1&flat=true  
