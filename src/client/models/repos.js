import fetch from 'isomorphic-fetch';

export default {
    state: [],
    reducers: {
        list: (state, payload) => payload
    },
    effects: {
        async fetchData() {
            // must be absolute url
            const response = await fetch('http://localhost:8080/api/repos');
            const data = await response.json();
            this.list(data);
        }
    }
};