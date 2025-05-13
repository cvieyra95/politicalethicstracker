// === List of names and their profile links ===
const politicians = {
    "Derek Tran": {
      url: "https://tran.house.gov/",
      bio: "U.S. Representative for California's 45th district. Focuses on veterans' affairs and education."
    },
    "Adam Schiff": {
      url: "https://schiff.house.gov",
      bio: "Senator from California, known for national security and intelligence leadership."
    },
    "Alex Padilla": {
      url: "https://www.padilla.senate.gov/",
      bio: "California’s junior senator, focuses on voting rights and immigration reform."
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
  popup.addEventListener('click', () => {
    if (currentProfileURL) {
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
  
            // Fill popup content
            popup.innerHTML = '';
            const nameEl = document.createElement('div');
            nameEl.style.fontWeight = 'bold';
            nameEl.style.marginBottom = '4px';
            nameEl.textContent = name;
  
            const bioEl = document.createElement('div');
            bioEl.style.fontSize = '13px';
            bioEl.style.maxWidth = '200px';
            bioEl.style.lineHeight = '1.4';
            bioEl.textContent = data.bio || "Biography not available.";
  
            popup.appendChild(nameEl);
            popup.appendChild(bioEl);
          });
  
          span.addEventListener('mouseleave', () => {
            popup.style.display = 'none';
            currentProfileURL = null;
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
  
