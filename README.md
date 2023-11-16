<img src="https://user-images.githubusercontent.com/28607713/212879228-3ca54e74-ee8f-485c-a5d2-e54758b471dc.png"
     alt="planet-logo-white-no-bg"
     width="240">


# Planet fullstack-assignment
## Tasks
### 1. Forex data retrieval
#### Considerations
- An API key should be provided in the Dockerfile to enable API calls. Although I have provided mine, I cannot guarantee its functionality as I could have reach usage limit (Alphavantage).
- Please subscribe to a currency supported by the forex API.

#### Implementation choices
Nestpaths are not considered due to the potential for excessive data in documents, depending on timeserie granularity and the application's age. Once a significant number of time series points are reached, considering pagination for historical points will be necessary. Modeling time series points as a relation to currencies simplifies this process.

#### Caveats
Deleting a time series point will not remove the relation from a currency because it is expected that they will be updated rather than removed, but it can be implemented.

### 2. API endpoint for retrieving the fetched forex data
#### Implementation choices
Time series points are modeled as a relation of currencies. Given the requirement to return only subscribed currencies, I chose to use the existing endpoint `[GET] /api/currencies` with an additional `history` query parameter to include or exclude historical points of subscribed currencies.
To provide immediate access to data upon subscription, I modified the `[PUT] /api/currency/:code` endpoint to also return data points.

### 3. Interface to list followed currencies
#### Implementation choices
Even though currency data is only relevant to a single component and does not need to be persisted after the component is destroyed, I chose to centralize all data in a service. This data could have easily been kept in the currency-list component.

### 4. Caveats and possible improvements
#### Caveats
- The FOREX API does not have an endpoint to return supported currencies, which means you might subscribe to a currency that will never have data.
- The FOREX API has a call rate limit, so a lower frequency for the cron job should be considered.

#### Improvements
- To prevent the user from subscribing to unsupported currencies we could:
1. Allow the user to subscribe only to currencies that are in database. 
2. Use a queue to reschedule events. 
3. Choose a better API than forex.
- Improve responsiveness
