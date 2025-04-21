const zipcode = document.getElementById('clear');
zipcode.addEventListener('click', async () => {
    await chrome.action.setPopup({popup: "../index.html"});
    window.location.assign('../index.html')
});