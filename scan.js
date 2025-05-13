// === List of names and their profile links ===
const politicians = {
    "Derek Tran": {
      url: "https://tran.house.gov/",
      bio: "Congressman Derek Tran represents California’s 45th District and serves on the House Armed Services and Small Business Committees. A U.S. Army Reserve veteran," +
       "he was born in Los Angeles to Vietnamese refugees and later earned degrees in Economics and Law. Before Congress, he worked as an attorney, served in civic roles, and co-owns a pharmacy with his wife. He lives in Orange County with his wife Michelle and their three children.",
      votes: [
        "5-8-2025 Voted No on bill H.R.276(Gulf of America Act)",
        "5-7-2025 Voted Yes on bill H.R.881(DHS Restrictions on Confucius Institutes and Chinese Entities of Concern Act)",
        "4-29-2025 Voted Yes on bill H.R.859(Informing Consumers about Smart Devices Act)"
       ],
      trades: [
        "BUY      AMZN       $200,000",
        "BUY      TSLA       $50,000",
        "BUY      NVDA       $500,000",
      ]
    },
    "Adam Schiff": {
      url: "https://schiff.house.gov",
      bio: "Senator Adam Schiff was born in Massachusetts and raised in California. He earned degrees from Stanford (B.A.) and Harvard Law (J.D.) before serving as a federal prosecutor." 
      + "He joined the California State Senate in 1996 and was elected to Congress in 2000, serving until 2024."
      +"He was elected to the U.S. Senate in 2024 and sworn in on December 9.",
      votes:  [
      "5-8-2025 Voted No on resolution H.J.res.60(Providing for congressional disapproval under chapter 8 of title 5)",
      "5-8-2025 Voted No on resolution H.J.res.60(Providing for congressional disapproval under chapter 8 of title 5)"
      ],
      trades: [
        "BUY      AMZN       $200,000",
        "BUY      TSLA       $50,000",
        "BUY      NVDA       $500,000",
      ]
    },
    "Alex Padilla": {
      url: "https://www.padilla.senate.gov/",
      bio: "Senator Alex Padilla began his political career on the Los Angeles City Council, " + 
      "becoming the youngest Council President and serving as acting Mayor during 9/11. Elected" + 
      " to the state senate in 2006, he passed over 70 bills, including key climate legislation. Padilla later became California's first Latino Secretary of State. In 2020, he was appointed to the U.S Senate to fill Kamala Harris's seat.",
      votes:  [
      "5-8-2025 Voted No on resolution H.J.res.60(Providing for congressional disapproval under chapter 8 of title 5)",
      "5-8-2025 Voted No on resolution H.J.res.60(Providing for congressional disapproval under chapter 8 of title 5)."
      ],
      trades: [
        "BUY      AMZN       $200,000",
        "BUY      TSLA       $50,000",
        "BUY      NVDA       $500,000",
      ]
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
            const tabKey = tabName.toLowerCase();
            const tabData = data[tabKey];

            if (Array.isArray(tabData)) {
              if (tabData.length === 0) {
                content.textContent = 'No information available.';
              } else {
                const list = document.createElement('ul');
                tabData.forEach(item => {
                  const li = document.createElement('li');
                  li.textContent = item;
                  list.appendChild(li);
                });
                content.appendChild(list);
              }
            } else {
              content.textContent = tabData || 'No information available.';
            }
              


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
  
