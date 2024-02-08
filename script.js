function start(){
    document.getElementById('test-button').style.display = 'block';
};

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
    console.log("Done")
});