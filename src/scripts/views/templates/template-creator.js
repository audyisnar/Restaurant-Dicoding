import CONFIG from '../../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const restaurantItemTemplate = (restaurant) => `
    <section class="container-itemlist">
        <div class="header-itemlist">
            <img class="lazyload" data-src="${`${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}`}" alt="Restaurant ${restaurant.name}">
            <div class="top-left">${restaurant.city}</div>
        </div>
        <div class="description-itemlist">
            <p class="rate">Rating : <span>${restaurant.rating}</span></p>
            <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
            <p class="description">${(restaurant.description).slice(0, 145)}...</p>
        </div>
    </section>
`;

const detailRestaurant = (restaurant) => `
    <div class="left"><img src="${`${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}`}" class="imageRestaurant" alt="Gambar Restaurant ${restaurant.name}"></div>
    <div class="right">
        <h2 class="titleRestaurant">${restaurant.name}</h2>
        <p class="location">${`${restaurant.address}, ${restaurant.city}`}</p>
        <p class="description">${restaurant.description}</p>
    </div>
`;

const menuItemTemplate = (menu) => `
    <p>${menu.name}</p>
`;

const reviewItemTemplate = (review) => `
    <div class="containerItemReview">
        <p class="reviewer">${review.name} <span>- ${review.date}</span><p>
        <p>${review.review}</p>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikedRestaurantButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  restaurantItemTemplate,
  menuItemTemplate,
  detailRestaurant,
  reviewItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikedRestaurantButtonTemplate,
};
