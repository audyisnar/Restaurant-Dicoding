import CONFIG from '../globals/config';

class RestaurantSource {
  static async listRestaurants() {
    const response = await fetch(`${CONFIG.BASE_URL_RESTAURANTS}/list`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(`${CONFIG.BASE_URL_RESTAURANTS}/detail/${id}`);
    return response.json();
  }

  static async addReview(data) {
    const response = await fetch(`${CONFIG.BASE_URL_RESTAURANTS}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

export default RestaurantSource;
