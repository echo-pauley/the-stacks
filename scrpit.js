document.addEventListener("DOMContentLoaded", loadPosts);

function addPost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (title && content) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push({ title, content });
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <h3 contenteditable="true" onblur="editPost(${index}, this, 'title')">${post.title}</h3>
            <p contenteditable="true" onblur="editPost(${index}, this, 'content')">${post.content}</p>
            <div class="actions">
                <button class="delete" onclick="deletePost(${index})">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function editPost(index, element, field) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index][field] = element.innerText;
    localStorage.setItem("posts", JSON.stringify(posts));
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}