/* eslint-disable no-undef */
export const addButton = () => {
  // Place a refer button in video player
  $('.ytp-right-controls').prepend(`
    <button title="Take Notes" class="ytp-button ytp-refer-button">
      <svg height="80%" version="1.1" viewBox="0 0 26 86" width="80%"><use class="ytp-svg-shadow"></use><path d="M46 14h8v48H18a8 8 0 0 1-8-8V8 M46 34l-7.9-6-8.1 6V10h16v24z M30 14H16a6 6 0 0 1 0-12h34" fill="transparent" stroke="#fff" stroke-width="5" id="ytp-id-16"></path></svg>
    </button>
  `);

  // On click of button fetch details from page
  $(document).on('click', '.ytp-refer-button', () => {
    const videoTitle = $('h1.title.ytd-video-primary-info-renderer').text();
    const videoUrl = '';
    const videoCurrentTime =  $('.ytp-time-current')[0].innerText;
    const videoScreenshot = '';
    console.log('Title: ', videoTitle)
    console.log('CurrentTime: ', videoCurrentTime)
    alert(videoTitle)
  });
};
