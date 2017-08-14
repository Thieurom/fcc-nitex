import axios from 'axios';


const search = {
    for(query) {
        const url = `/search?query=${query}`;

        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
            });
    }
};


export default search;
