import axios from "axios";
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import '../node_modules/slim-select/dist/slimselect.css'

//
// export async function fetchBreeds(select, loader, error) {
//     try {
//         const res = await axios.get(' https://api.thecatapi.com/v1/breeds');
//         loader.style.display = "none";
//         res.data.forEach(element => {
//             const option = document.createElement("option");
//             option.value = element.id;
//             option.textContent = element.name;
//             select.append(option);
//         });
//         new SlimSelect({
//             select: '#selectElement'
//         })

//     } catch (error) {
//         loader.style.display ="none";
//         select.style.display = "none";

//         Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
//         throw new Error(error);
//     }    
// }

// export async function fetchCatByBreed(selectedBreedId, loader, select, error) {
//     try {
//       const response = await axios.get(
//         `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
//       );
  
//       const item = response.data[0];
//       const breedData = item.breeds[0];
  
//       return {
//         name: breedData.name,
//         description: breedData.description,
//         temperament: breedData.temperament,
//         imageUrl: item.url,
//       };
      
//     } catch (error) {
//       loader.style.display = 'none';
//       select.style.display = 'none';
  
//       Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
//         throw new Error(error);
//     }
//   }

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