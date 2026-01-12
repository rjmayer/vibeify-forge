// Background service worker for Vibeify Forge
console.log('Vibeify Forge background service worker loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Vibeify Forge extension installed');
});
