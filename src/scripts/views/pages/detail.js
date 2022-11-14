/* eslint-disable no-unused-vars */
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../../data/restaurants-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import {
  menuItemTemplate, detailRestaurant, reviewItemTemplate,
} from '../templates/template-creator';
import '../../../styles/detail.css';

const Detail = {
  async render() {
    return `
            <div class="headerDetail"></div>
            <h3 class="ourMenu">OUR MENU</h3>
            <div class="menu">
                <div class="menuContainer">
                    <h4>FOODS</h4>
                    <div class="containerItemMenu" id="foods"></div>
                </div>
                <div class="menuContainer">
                    <h4>DRINKS</h4>
                    <div class="containerItemMenu" id="drinks"></div>
                </div>
            </div>
            <h3 class="review">Customers Review</h3>
            <div class="containerReviews"></div>
            <h3 class="review" tabindex="0">Write a Review</h3>
            <form class="containerAddReview" id="form">
                <div class="containerInput">
                    <label for="fname">Name</label><br>
                    <input type="text" id="fname" name="inputName">
                    <p><label for="inputReview">Review of This Restaurant</label></p>
                    <textarea id="inputReview" name="textareaReview" rows="4"></textarea>
                    <div class="containerButton">
                        <input type="submit" value="Submit">
                    </div>
                </div>
            </form>
            <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    console.log(restaurant);

    const restaurantDetail = restaurant.restaurant;
    console.log(restaurantDetail);

    const headDetailContainer = document.querySelector('.headerDetail');
    headDetailContainer.innerHTML = detailRestaurant(restaurant.restaurant);

    const foodsContainer = document.querySelector('#foods');
    restaurant.restaurant.menus.foods.forEach((menu) => {
      foodsContainer.innerHTML += menuItemTemplate(menu);
    });

    const drinksContainer = document.querySelector('#drinks');
    restaurant.restaurant.menus.drinks.forEach((menu) => {
      drinksContainer.innerHTML += menuItemTemplate(menu);
    });

    const reviewContainer = document.querySelector('.containerReviews');
    restaurant.restaurant.customerReviews.forEach((review) => {
      reviewContainer.innerHTML += reviewItemTemplate(review);
    });

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurantDetail,
    });

    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', async (event) => {
      const reviewer = document.getElementById('fname').value;
      const contentReview = document.getElementById('inputReview').value;

      const data = { id: restaurantDetail.id, name: reviewer, review: contentReview };
      const resultReview = await RestaurantSource.addReview(data);
      console.log(resultReview.status);
    });
  },
};

export default Detail;
