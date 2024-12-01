const accessKey = "BnrZrdV81vpN7YiW7aDKrItRO2oLYbYB3moHACXDAHM";
//  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;


const formE1 = document.querySelector("form");
const searchInputE1 = document.getElementById("search-input");
const searchResultsE1 = document.querySelector(".search-results");
const showMoreButtonE1 = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&
   query=${inputData}&client_id=${accessKey}`;

   const response = await fetch(url);
   const data =  await response.json();
   if(page ===  1) {
    searchResultsE1.innerHTML = "";
  
  }
  const results = data.results;
  results.map((result)=>{
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsE1.appendChild(imageWrapper);


  });

  page++;
  

  if(page > 1){
    showMoreButtonE1.style.display = "block";
  }

}
formE1.addEventListener("submit",(event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})


showMoreButtonE1.addEventListener("click", ()=>{
    searchImages();
})