/* Select the elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]"); // any DOM element with the data-skip attribute
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fullscreen_button");

/* Build the functions */

// play or pause the video
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  // shorter alternative using ternary operator:
  // const method = video.paused ? "play" : "pause";
  // video[method]();
}

// update the play button when video is paused/played
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚"; // "this" is bound to the video
  toggle.textContent = icon; // toggle is the play/pause button
  // console.log("update the button");
}

// function to skip the video
function skip() {
  //console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// funtion to update video range
function handleRangeUpdate() {
  video[this.name] = this.value; // the properties we want to update on the video are "volume" or "playbackRate" (this.name), and we set them to the value
  //console.log(this.name);
  //console.log(this.value);
}

// function to update the progress bar
function handleProgressUpdate() {
  const percent = (video.currentTime / video.duration) * 100; // calculate how many percent of the video have elapsed
  progressBar.style.flexBasis = `${percent}%`; // apply that percentage to the flexBasis property of the element
}

// function to scrub the video
function scrub(e) {
  // take the offsetX value which is a property of the click event,
  // divide it by the full width of the progress bar and
  // multiply it with the full duration of the video
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  // update the current time with the scrub time so the video jumps to that time
  video.currentTime = scrubTime;
  //console.log(e);
}

// function to go fullscreen
function toggleFullscreen() {
  //console.log("BEFORE click:", player.classList);
  player.classList.toggle("fullscreen"); // this adds and removes the fullscreen class to the player when clicked
  //console.log("AFTER click:", player.classList);

  //   let fullScreenMode = false;
  //   if (e && !fullScreenMode) {
  //     // fullScreen.style.fullScreen
  //     fullScreenMode = true;
  //   }
  //   if (e && fullScreenMode) {
  //     fullScreenMode = false;
  //   }
  //   console.log("clicked on fullscreen", e, fullScreenMode);
  //   console.log("this:", this);
}

/* Add the event listeners */
video.addEventListener("click", togglePlay); // listens to click event on video player and runs togglePlay
video.addEventListener("play", updateButton); // listens to play event and runs updateButton
video.addEventListener("pause", updateButton); // listens to pause event and runs updateButton
video.addEventListener("timeupdate", handleProgressUpdate); // listens to the timeupdate event (the current time code) and runs handleProgressUpdate

toggle.addEventListener("click", togglePlay); // listens to click event on toggle and runs togglePlay
skipButtons.forEach((button) => button.addEventListener("click", skip)); // listens to click event  on the skip buttons and runs skip function
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate)); // listens to change event on ranges and runs handleRangeUpdate

let mousedown = false; // use variable for mousedown
progress.addEventListener("click", scrub); // listens to click event on progress and runs scrub function
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)); // when mouse is moved, check if mousedown is true; if it's true, run scrub function; if not, return false
progress.addEventListener("mousedown", () => (mousedown = true)); // when mouse is pressed, mousedown is true
progress.addEventListener("mouseup", () => (mousedown = false)); // when mouse is released, mousedown is false

fullScreen.addEventListener("click", toggleFullscreen); // listens for click event on fullscreen button and runs toggleFullscreen function
