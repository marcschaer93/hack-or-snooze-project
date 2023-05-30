"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
// function navSubmit(evt) {
//   // evt.preventDefault();
//   console.debug("navSubmit", evt);
//   $submitForm.show();
//   // evt.target.$submitForm.removeClass("hidden");
//   // $(evt.target).find("#submitForm").removeClass("hidden");
// }

// $navSubmit.on("click", navSubmit);

function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $submitForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show My Stories on clicking "my stories" */

function navMyStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putMyStoriesOnPage();

  $myStories.show();
}

$navMyStories.on("click", navMyStories);

function navMyFavorites(evt) {
  console.debug("navMyFavorites", evt);
  hidePageComponents();
  putMyFavoritesStoriesOnPage();

  $myFavoriteStories.show();
}

$navMyFavorites.on("click", navMyFavorites);
/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  // $(".main-nav-links").show();
  $(".main-nav-links").css("display", "flex");

  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
