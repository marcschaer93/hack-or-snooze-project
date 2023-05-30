const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

async function getData() {
  // Note presence of `static` keyword: this indicates that getStories is
  //  **not** an instance method. Rather, it is a method that is called on the
  //  class directly. Why doesn't it make sense for getStories to be an
  //  instance method?

  // query the /stories endpoint (no auth required)
  const response = await axios({
    url: `${BASE_URL}/stories/`,
    method: "GET",
  });

  console.log("response", response);
  // turn plain old story objects from API into instances of Story class
  // const stories = response.data.stories.map((story) => new Story(story));

  // build an instance of our own class using the new array of stories
  // return new StoryList(stories);
}

getData();

//
{
  /* <span><i id='favoriteBtn' class="not-active">♥</i></span>
<div><p id="favoriteIcon" class="not-active">♥</p></div> */
}
