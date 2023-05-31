"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  // if a user is logged in, show favorite/not-favorite star
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        <div>
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getHeartHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function getDeleteBtnHTML() {
  return `
  <button id="deleteBtn">delete</button>
  `;
}
function getHeartHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const heartType = isFavorite ? "active" : "not-active";
  return `
  <div><button id="favoriteIcon" class=${heartType}>♥</button></div>
  `;
}

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $myStories.empty();

  if (currentUser.ownStories.length === 0) {
    $myStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $myStories.append($story);
    }
  }

  $myStories.show();
}
function putMyFavoritesStoriesOnPage() {
  console.debug("putMyFavoritesStoriesOnPage");
  $myFavoriteStories.empty();
  console.log("$myFavoriteStories, hide", $myFavoriteStories);

  // check and update "my-favorite-stories-list" changes
  if (currentUser.favorites.length === 0) {
    $myFavoriteStories.append(
      "<h5>No Favorite stories added by user yet!</h5>"
    );
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $myFavoriteStories.append($story);
    }
  }

  $myFavoriteStories.show();
  console.log("$myFavoriteStories, show", $myFavoriteStories);
}

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  // await storyList.removeStory(currentUser, storyId);
  await storyList.removeStory(currentUser, storyId);
  putMyStoriesOnPage();
}

$myStories.on("click", "#deleteBtn", deleteStory);

async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();
  // get data

  const author = $("#newAuthor").val();
  const title = $("#newTitle").val();
  const url = $("#newUrl").val();

  const username = currentUser.username;

  const storyData = { author, title, url, username };
  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  // hide the form and reset it
  $submitForm.slideUp("slow");
  // $submitForm.hide();
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

// async function addOrRemoveFavorite(evt) {
//   console.debug("addOrRemoveFavorite");
//   evt.target.classList.toggle("not-active");
// }

// $favoriteBtn.on("click", addOrRemoveFavorite);
// $myStories.on("click", "#favoriteBtn", addOrRemoveFavorite);

async function toggleFavoriteStatus(evt) {
  console.debug("toggleFavoriteStatus");

  const $closestLi = $(evt.target).closest("li");
  const $favoriteIcon = $closestLi.find("#favoriteIcon");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find((s) => s.storyId === storyId);
  const $target = $(evt.target);

  if ($target.hasClass("active")) {
    $target.closest("button").toggleClass("active not-active");
    await currentUser.deleteFavorite(story);
    putMyFavoritesStoriesOnPage();

    // notFavoriteAnymore(evt, $closestLi);
  } else {
    $target.closest("button").toggleClass("active not-active");
    await currentUser.addFavorite(story);
  }
}

$allStoryLists.on("click", "#favoriteIcon", toggleFavoriteStatus);

// function notFavoriteAnymore(evt, $closestLi) {
//   $myFavoriteStories.on("click", function (evt) {
//     $closestLi.remove();
//   });
// }
