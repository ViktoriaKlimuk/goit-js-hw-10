import axios from "axios";

const catUrl = 'https://api.thecatapi.com/v1';

export function fetchBreeds(select, loader, error) {
    return axios
    .get(`${catUrl}/breeds`)
    .then(response => response.data)
    .catch(error => {
        console.log(error);
        throw error
    });
}

export function fetchCatByBreed(breedId){
    return axios
    .get(`${catUrl}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
        console.log(error);
        throw error
    });
}