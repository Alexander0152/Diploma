class DataService {

    getCountryData() {

        return fetch('/api/countryinfo/pageinfo/USA', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return result.country[0];
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}

export default DataService;