class DataService {

    getCountryData(countryName) {

        return fetch(`/api/countryinfo/pageinfo/${countryName}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return result;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getHotels(countryCode, center) {

        return fetch(`/api/hotels?countryCode=${countryCode}&lat=${center.lat}&lng=${center.lng}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return result;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}

export default DataService;