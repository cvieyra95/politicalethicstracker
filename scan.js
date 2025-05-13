// === List of names and their profile links ===
const politicians = {
    "Derek Tran": {
      url: "https://tran.house.gov/",
      bio: "U.S. Representative for California's 45th district. Focuses on veterans' affairs and education.",
      votes: "Voted in favor of the Veterans' Benefits Enhancement Act.",
      trades: "No reported stock trades."
    },
    "Adam Schiff": {
      url: "https://schiff.house.gov",
      bio: "Senator from California, known for national security and intelligence leadership.",
      votes: "Voted in favor of the Intelligence Authorization Act.",
      trades: "Reported trades in technology sector stocks."
    },
    "Alex Padilla": {
      url: "https://www.padilla.senate.gov/",
      bio: "California’s junior senator, focuses on voting rights and immigration reform.",
      votes: "Voted in favor of the Voting Rights Advancement Act.",
      trades: "No reported stock trades."
    }
  };
  
  // === Create floating popup element ===
  const popup = document.createElement('div');
  popup.className = 'popup-tab';
  popup.style.display = 'none';
  document.body.appendChild(popup);
  
  // === Track the current profile link ===
  let currentProfileURL = null;
  
  // === Handle click on popup ===
  popup.addEventListener('click', (e) => {
    // Only open the link if the popup itself is clicked directly (not the buttons inside it)
    if (e.target === popup && currentProfileURL) {
      window.open(currentProfileURL, '_blank');
    }
  });
  
// === Main function: scan and replace names ===
  function scanAndAttachHover() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
  
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      if (!text || !node.parentNode || node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE') continue;
  
      Object.entries(politicians).forEach(([name, data]) => {
        const idx = text.indexOf(name);
        if (idx !== -1) {
          const before = document.createTextNode(text.slice(0, idx));
          const after = document.createTextNode(text.slice(idx + name.length));
  
          const span = document.createElement('span');
          span.className = 'hover-target';
          span.textContent = name;
  
          // === Mouse enter: show popup with bio ===
          span.addEventListener('mouseenter', () => {
            const rect = span.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.display = 'block';
            currentProfileURL = data.url;
          
            // Clear previous content
            popup.innerHTML = '';
          
            // Create tab headers
            const tabHeader = document.createElement('div');
            tabHeader.className = 'tab-header';
          
            const tabs = ['Bio', 'Votes', 'Trades'];
            const tabButtons = {};
          
            tabs.forEach((tabName, index) => {
              const button = document.createElement('button');
              button.textContent = tabName;
              if (index === 0) button.classList.add('active');
              tabHeader.appendChild(button);
              tabButtons[tabName] = button;
            });
          
            popup.appendChild(tabHeader);
          
            // Create tab contents
            const tabContents = {};
          
            tabs.forEach((tabName, index) => {
              const content = document.createElement('div');
              content.className = 'tab-content';
              if (index === 0) content.classList.add('active');
              content.textContent = data[tabName.toLowerCase()] || 'No information available.';
              popup.appendChild(content);
              tabContents[tabName] = content;
            });
          
            // Add event listeners to tabs
            tabs.forEach((tabName) => {
              tabButtons[tabName].addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach((name) => {
                  tabButtons[name].classList.remove('active');
                  tabContents[name].classList.remove('active');
                });
                // Add active class to selected tab and content
                tabButtons[tabName].classList.add('active');
                tabContents[tabName].classList.add('active');
              });
            });
          });
          
          // Replace the text node with spans
          const parent = node.parentNode;
          parent.insertBefore(before, node);
          parent.insertBefore(span, node);
          parent.insertBefore(after, node);
          parent.removeChild(node);
        }
      });
    }
  }
  
  // === Run the hover setup ===
  scanAndAttachHover();
  
  // Close popup when clicking anywhere outside of it
document.addEventListener('click', (e) => {
    if (!popup.contains(e.target)) {
      popup.style.display = 'none';
      currentProfileURL = null;
    }
  });
  
