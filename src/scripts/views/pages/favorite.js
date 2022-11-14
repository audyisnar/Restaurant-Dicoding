import FavoriteRestaurantIdb from '../../../data/favorite-restaurant-idb';
import { restaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <h2 class="favorite" tabindex="0">Your Favorite Restaurant</h2>
        <article id="listRestaurant"></article>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#listRestaurant');

    restaurantContainer.innerHTML = '';
    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = '<div class="favorite-restaurant__not__found">Belum ada restaurant yang disukai.</div>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += restaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
