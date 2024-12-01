const accessKey = "BnrZrdV81vpN7YiW7aDKrItRO2oLYbYB3moHACXDAHM";

const formE1 = document.querySelector("form");
const searchInputE1 = document.getElementById("search-input");
const searchResultsE1 = document.querySelector(".search-results");
const showMoreButtonE1 = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        
        // Check for a successful response
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        
        // Clear previous results if this is the first page
        if (page === 1) {
            searchResultsE1.innerHTML = "";
        }

        const results = data.results;
        
        // Check if results exist before mapping
        if (results && results.length > 0) {
            results.map((result) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("search-result");
                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description || "Image"; // Fallback for alt text
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.textContent = result.alt_description || "View Image"; // Fallback text

                imageWrapper.appendChild(image);
                imageWrapper.appendChild(imageLink);
                searchResultsE1.appendChild(imageWrapper);
            });

            page++; // Increment page for the next set of results
            showMoreButtonE1.style.display = "block"; // Show button only when there's more to show
        } else {
            showMoreButtonE1.style.display = "none"; // Hide button if no results
        }

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset page to 1 for new searches
    searchImages();
});

showMoreButtonE1.addEventListener("click", () => {
    searchImages();
});
