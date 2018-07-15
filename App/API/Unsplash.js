
import Unsplash, { toJson } from 'unsplash-js/native';
import AppConfig from '../Config/AppConfig';

const unsplash = new Unsplash({
  applicationId: AppConfig.unsplashAlt.appId,
  secret: AppConfig.unsplashAlt.secretKey,
  callbackUrl: AppConfig.unsplashAlt.callbackUrl,
  bearerToken: '350fa1d9840a02f35517bdeab8ba8a52da5885d944ef33dc852293bf658ccec9'
});

export function getPopularPhotos(callback) {
  console.log(AppConfig.unsplashAlt);
  unsplash.photos.listPhotos(1, 10, "popular")
  .then(toJson)
  .then(json => {
    // console.log(json);
    callback(json);
  });
}

export function getPhotosForUser(callback, username = "vorosbenisop") {
  unsplash.users.photos(username, 1, 10, "popular", false)
  .then(toJson)
  .then(json => {
    callback(json);
  });
}
