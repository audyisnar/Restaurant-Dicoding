import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createLikeRestaurantButtonTemplate, createUnlikedRestaurantButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurantDetail }) {
    console.log(restaurantDetail);
    this._likeButtonContainer = likeButtonContainer;
    this._restaurantDetail = restaurantDetail;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurantDetail;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurantDetail);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikedRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurantDetail.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
