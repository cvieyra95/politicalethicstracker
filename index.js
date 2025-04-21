const zipcode = document.getElementById('zipcode');
zipcode.addEventListener('click', async () => {
    await chrome.action.setPopup({popup: "../profile/profile.html"});
    window.location.assign('../profile/profile.html')
});