import RestaurantSource from '../../../data/restaurants-source';
import { restaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
            <div class="jumbotron">
              <picture>
                <source media="(max-width: 1199px)" type="image/webp" srcset="./images/heros/hero-image_2-small.webp">
                <source media="(max-width: 1199px)" type="image/jpeg" srcset="./images/heros/hero-image_2-small.jpg">
                <source media="(min-width: 1200px)" type="image/webp" srcset="./images/heros/hero-image_2-large.webp">
                <img src="./images/heros/hero-image_2-large.jpg" class="heroElement" alt="Jumbotron">
              </picture>
            </div>
            <h2 id="content" tabindex="0">Explore Restaurant</h2>
            <article id="listRestaurant"></article>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    console.log(restaurants);
    const restaurantsContainer = document.querySelector('#listRestaurant');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
