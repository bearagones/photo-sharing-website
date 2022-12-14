function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 3000);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `<div id="post-${postData.id}" class="card">
        <img class="card-image" src="${postData.thumbnail}" alt="Missing image">
            <div class="card-body">
                <p class="card-title">${postData.title}</p>
                <p class="card-text">${postData.description}</p>
                <button id="post-details" onClick="location.href='/post/${postData.id}'" type="button">Post Details</button>
            </div>
    </div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById("search-text").value;
    document.getElementById("search-text").value = "";
    if (!searchTerm) {
        location.replace('/');
        return;
    }
    let gridContainer = document.getElementById("grid-container");
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newGridContainerHTML = '';
            data_json.results.forEach((row) => {
                newGridContainerHTML += createCard(row);
            })
            gridContainer.innerHTML = newGridContainerHTML;
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

function postComment() {
    let commentText = document.getElementById("comment-text").value;
    let postId = document.location.pathname.match(/\d+/g).map(Number)[0];
    if (!commentText) {
        return;
    }
    let fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            comment: commentText, postId: postId
        })
    };
    fetch('/comments/create', fetchOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 1) {
                addMessage(data);
            } else {
                addFlashFromFrontEnd(data.message, data.status);
            }
        })
        .catch((err) => console.log(err));
}

function addMessage(data) {
    let template = document.createElement("template");
    template.innerHTML =
        `<div id="message-${data.id}}">
            <strong class="author-text">@${data.username}</strong>
            <span class="date-posted">${new Date().toLocaleString()}</span>
            <div class="comment">${data.comment}</div>
        </div>`
    document.getElementById("comment-section").firstChild.before(template.content.firstChild);
    document.getElementById("comment-text").value = "";
}

let flashMessageElement = document.getElementById("flash-message");
if (flashMessageElement) {
    setFlashMessageFadeOut(flashMessageElement);
}

let searchButton = document.getElementById("search-button");
if (searchButton) {
    searchButton.onclick = executeSearch;
}

let searchText = document.getElementById("search-text");
searchText.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchButton.click();
    }
});

let commentButton = document.getElementById("comment-button");
if (commentButton) {
    commentButton.onclick = postComment;
}

let commentText = document.getElementById("comment-text");
commentText.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        commentButton.click();
    }
})