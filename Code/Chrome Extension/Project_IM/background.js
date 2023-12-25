// Function to organize tabs
function organizeTabs() {
    chrome.tabs.query({}, function(tabs) {
      var titles = tabs.map(function(tab) { return tab.title; });
  
      // Prepare the data to send to the OpenAI server
    var titles = tabs.map(function(tab) { return tab.title + (tab.active ? ' (active)' : ''); });

    var data = {
        'prompt': 'Your-Prompt ' + titles.join(', '),
        'max_tokens': 60
    };
  
      // Send the data to the OpenAI server
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Your-OpenAI-API-Key'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        // Organize tabs based on response
        console.log(data);
        chrome.runtime.sendMessage({action: 'updateTabs', data: data.choices[0].text});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }
  
  // Listen for a message from the popup script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'organizeTabs') {
      organizeTabs();
    }
  });
  
  // Listen for tabs being created or removed
  chrome.tabs.onCreated.addListener(organizeTabs);
  chrome.tabs.onRemoved.addListener(organizeTabs);