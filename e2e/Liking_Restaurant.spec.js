Feature('Liking Restaurant');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const likeOneRestaurant = async ({ I }) => {
  I.see('Belum ada restaurant yang disukai.', '.favorite-restaurant__not__found');

  I.amOnPage('/');

  I.seeElement('.description-itemlist a');

  const firstFilm = locate('.description-itemlist a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilmTitle);

  I.waitForElement('#likeButton', 30);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.container-itemlist');

  const likedFilmTitle = await I.grabTextFrom('.description-itemlist a');
  assert.strictEqual(firstFilmTitle, likedFilmTitle);
};

Scenario('liking one restaurant', async ({ I }) => {
  await likeOneRestaurant({ I });
});

Scenario('unliking one restaurant', async ({ I }) => {
  await likeOneRestaurant({ I });
  I.seeElement('.container-itemlist');
  I.click(locate('.description-itemlist a').first());

  I.waitForElement('#likeButton', 30);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Belum ada restaurant yang disukai.', '.favorite-restaurant__not__found');
});
