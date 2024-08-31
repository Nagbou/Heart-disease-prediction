document.querySelectorAll('.img-c').forEach(img => {
    img.addEventListener('click', function () {
        document.getElementById('popupImage').src = this.src;
        document.getElementById('imagePopup').style.display = 'block';
    });
});

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
}