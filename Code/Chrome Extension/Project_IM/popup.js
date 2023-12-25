// Function to update the organized tabs
function updateTabs(message) {
    if (message.action === 'updateTabs') {
      document.getElementById('organizedTabs').innerText = message.data;
    }
  }
  
  // Listen for a message from the background script
  chrome.runtime.onMessage.addListener(updateTabs);
  
  // Send a message to the background script when the "Organize!" button is clicked
  document.getElementById('organize').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'organizeTabs'});
  });