const API_key = '19902b0343cb4380afcd0ca442ec29dd'

async function loadFoods() {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_key}&number=6`

    try{
        const response = await fetch(url)
        const data = await response.json()
        

        const foodItems = data.recipes;
         let html = '';

         foodItems.forEach((food) => {
            html += `
            <div class="recipie-cont" data-id="${food.id}">
             <p class="recipie-name">
                ${food.title}
             </p>
             <div class="recipie-image">
                <button>120+</button>
                <img src="${food.image}" alt="" srcset="">
             </div>
             <div class="full-recipie">
                <button>See complete recipie</button>
             </div>
           </div>
            `
         })

         document.querySelector('.recipie-container').innerHTML = html
    } catch (error){
        console.error('error fethich foods:', error)

    }
    
    
} 

async function loadSpecificFoods(tag) {
   const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_key}&number=10&tags=${tag}`

   try{
      const response = await fetch(url);
      const data = await response.json();
      
      const foodItems = data.recipes;
      let html = '';

      foodItems.forEach((food) => {
         html +=  `
               <div class="recipie-cont" data-id="${food.id}">
               <p class="recipie-name">
                  ${food.title}
               </p>
               <div class="recipie-image">
                  <button>120+</button>
                  <img src="${food.image}" alt="" srcset="">
               </div>
               <div class="full-recipie">
                  <button>See complete recipie</button>
               </div>
            </div>`
      })

      document.querySelector('.recipie-container').innerHTML = html;
   } catch (error){
      console.error('failed to load specific food', error)
   }
   
}




let isListenerAttached = false;

function getRecipiedId(){
   const container = document.querySelector('.recipie-container');
   if (!isListenerAttached) {
      container.addEventListener('click', (event) => {
         if (event.target.closest('.full-recipie')){
            const card = event.target.closest('.recipie-cont');
            const recipieId = card.getAttribute('data-id');
            window.location.href = `../recipie-html/full-recipie.html?id=${recipieId}`;
         }
      });
      isListenerAttached = true;
   }
}






const searchInput = document.querySelector('.searchInput'); 
const searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', () => {
   const query = searchInput.value.trim();
   if (query) {
      // Navigate to results.html with query in URL
      window.location.href = `results.html?query=${encodeURIComponent(query)}`;
   }
});

searchInput.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
            window.location.href = `results.html?query=${encodeURIComponent(query)}`;
      }
   }
});

loadFoods()
getRecipiedId()

