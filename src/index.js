import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { TheCatAPI } from "@thatapicompany/thecatapi";
import {fetchBreeds, fetchCatByBreed} from "./cat-api";
import axios from "axios";

new TheCatAPI("live_1rbJSpt9mEzTy3IJP1qhnhX0KMFpyFYoh61AwKuu4IkvYEUkCOv9AmKCpt4WOneS");

axios.defaults.headers.common["x-api-key"] = "live_1rbJSpt9mEzTy3IJP1qhnhX0KMFpyFYoh61AwKuu4IkvYEUkCOv9AmKCpt4WOneS";

//
const select = document.querySelector(".breed-select");
select.style.display = "block";
select.style.fontSize = "18px";
select.style.fontWeight ="700";
select.style.lineHeight = "1.3";
select.style.padding = ".6em 1.4em .5em .8em";
select.style.width = "25%";
select.style.margin ="0";

//
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
//

loader.style.display = 'block';
error.style.display = 'none';

fetchBreeds(select, loader, error);

select.addEventListener("change", handleSelect);

function handleSelect(event) {
    const selectedBreedId = select.target;
    console.log(selectedBreedId);

    catInfo.style.display = 'none';
    loader.style.display = 'none';

    const catData = fetchCatByBreed( selectedBreedId, loader, select, error); //!!!!

    createMarkup(catData);
    
    loader.style.display = 'none';
    catInfo.style.display = 'flex';
};

function createMarkup({ name, description, temperament, imageUrl }) {
    const optionItem = `
    <img src="${imageUrl}"  width="500" height="400" style="object-fit: cover; border-radius: 16px;">
    <div style="width: 600px;">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament</h3>
      <p>${temperament}</p>
    </div>
    `;
    catInfo.insertAdjacentHTML('beforeend', optionItem);

    catInfo.style.boxShadow = '7px 7px 53px 17px rgba(0,0,0,0.75)';
}
