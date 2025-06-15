const API_key = '19902b0343cb4380afcd0ca442ec29dd'

const params = new URLSearchParams(window.location.search);


const recipeId = params.get('id')


async function getFullRecipie(id) {

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_key}`

    try {

        const Response = await fetch(url)
        const data = await Response.json()
        console.log(data);
        

        document.querySelector('.full-recipie-container').innerHTML = 
        `<div class="recipie">
            <p class="full-name">${data.title}
            </p>
            <div class="full-image">
                <img src="${data.image}" alt="">
            </div>
        </div>
        

        <div class="ingredients-time-cont">
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    ${
                        data.extendedIngredients.map(ing => 
                            `<li>${ing.original}</li>`
                        ).join('')
                    }
                </ul>
            </div>
            <div class="cooking-time">
                <div class="time">
                    <h3>Cooking time</h3>
                    <p>${data.readyInMinutes} Minutes</p>
                </div>
                <div class="dificulty">
                    <h3>Difficulty</h3>
                    <p>Hard</p>
                </div>
            </div>
        </div>

        <div class="instructions-container">
            <h3>Instructions</h3>
            <div class="instructions">
                ${
                    data.analyzedInstructions.length > 0 ? `${data.analyzedInstructions[0].steps.map(step => `<p>
                        ${step.number}. ${step.step}</p>`).join('')}`: '<p>No instructions available</p>'
                }
            </div>
        </div>`



    }catch (error){
        console.error('failed to load recipie',error)

    }
    
}

getFullRecipie(recipeId)