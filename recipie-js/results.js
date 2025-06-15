
    const API_key = '19902b0343cb4380afcd0ca442ec29dd';
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const resultsContainer = document.querySelector('.search-container');

    if (query) {
        searchRecipes(query);
    }

    async function searchRecipes(query) {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=5&apiKey=${API_key}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            displayResults(data.results);
            console.log( displayResults(data.results));
            
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayResults(recipes) {
        resultsContainer.innerHTML = '';

        if (recipes.length === 0) {
            resultsContainer.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.innerHTML = `
                <div class="recipie-cont" data-id="${recipe.id}">
                    <p class="recipie-name">${recipe.title}</p>
                    <div class="recipie-image">
                        <img src="${recipe.image}" alt="${recipe.title}">
                    </div>
                    <div class="full-recipie">
                        <a href="recipe.html?id=${recipe.id}"><button>See complete recipe</button></a>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

