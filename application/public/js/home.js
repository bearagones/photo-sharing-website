function fade(event) {
    console.info(event.target);

    let fadeEffect = setInterval(function() {
        if (!event.target.style.opacity) {
            event.target.style.opacity = 1;
        }
        if (event.target.style.opacity > 0) {
            event.target.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            document.getElementById("photo-div").remove();
            document.getElementById("length").innerText--;
        }
    }, 50);
}

function createPhoto(data, containerDiv) {
    let img = document.createElement('img');
    let photoTitle = document.createElement('p');
    let photoDiv = document.createElement('div');
    photoDiv.id = "photo-div";

    photoTitle.innerText = data.title;
    img.src = data.url;
    img.height = 200;
    img.width = 200;
    photoDiv.appendChild(img);
    photoDiv.appendChild(photoTitle);
    containerDiv.appendChild(photoDiv);

    photoDiv.addEventListener('click', fade);
}

let mainDiv = document.getElementById("container");
if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhoto(photo, mainDiv);
        });
        document.getElementById('item-counter').innerHTML = `There are <span id="length">${photos.length}</span> photo(s)`;
    })
}

