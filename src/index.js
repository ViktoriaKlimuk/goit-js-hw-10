import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css'
import { TheCatAPI } from "@thatapicompany/thecatapi";
import {fetchBreeds, fetchCatByBreed} from "./cat-api";
import axios from "axios";

new TheCatAPI("live_1rbJSpt9mEzTy3IJP1qhnhX0KMFpyFYoh61AwKuu4IkvYEUkCOv9AmKCpt4WOneS");

axios.defaults.headers.common["x-api-key"] = "live_1rbJSpt9mEzTy3IJP1qhnhX0KMFpyFYoh61AwKuu4IkvYEUkCOv9AmKCpt4WOneS";

//
const select = document.querySelector(".breed-select");
select.style.fontSize = "18px";
select.style.fontWeight ="700";
select.style.lineHeight = "1.3";
select.style.padding = ".6em 1.4em .5em .8em";
select.style.width = "30%";
select.style.margin ="20px 0 0 20px";


//
const loader = document.querySelector(".loader");
loader.style.margin ="20px 0 0 20px";


const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
//



select.style.visibility = 'hidden';
error.style.display = 'none';

fetchBreeds()
    .then(breeds => {
        select.style.visibility = 'visible';
        loader.style.display = 'none';
        const cats = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
        select.insertAdjacentHTML('beforeend', cats);
        new SlimSelect({
            select: select,
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        Notiflix.Notify.failure(
            `Oops! Something went wrong! Try reloading the page!`
        )
    });
select.addEventListener('change', handleChange);

function handleChange(e) {
    const selectedBreedId = this.value;
    catInfo.innerHTML = '';
    loader.style.display = 'block';
    fetchCatByBreed(selectedBreedId)
    .then(breeds => {
        loader.style.display = 'none';
        const catData = breeds[0];
        catInfo.innerHTML = `
            <img src="${catData.url}"  width="500" height="400" style="object-fit: cover; border-radius: 16px;">
            <div style="width: 600px;">
              <h2>${catData.breeds[0].name}</h2>
              <p>${catData.breeds[0].description}</p>
              <h3>Temperament</h3>
              <p>${catData.breeds[0].temperament}</p>
            </div>
        `;
        catInfo.style.display = 'flex';
        catInfo.style.gap = '20px';
        catInfo.style.margin = '20px';
    })
    .catch(error => {
        loader.style.display = 'none';
        Notiflix.Notify.failure(
            `Oops! Something went wrong! Try reloading the page!`
        )
    })
}