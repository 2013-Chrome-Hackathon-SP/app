/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    minWidth: 320, minHeight: 475,
    maxWidth: 320, maxHeight: 475
  });
});
