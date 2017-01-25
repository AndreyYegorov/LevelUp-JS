;(function() {
    "use strict";

    const ws = io("http://178.62.203.188:8888");
    let $messagesContainer = document.getElementById("messages-container"),
        $chatForm = document.getElementById("chat-form"),
        $loginForm = document.getElementById("login-form"),
        $chatMessageInput = document.getElementById("chat-message"),
        $userName = document.getElementById("login"),
        $gifsContainer = document.getElementById("gifs-container");

    let loginName = "",
        urlMediaGify = 'http://media3.giphy.com/media/';

    ws.on("chat message", data => {
        console.log(data);

        if (data.name) {
            if (data.type === "TEXT") {
                let $p = document.createElement("p");

                $p.textContent = data.message;
                $p.setAttribute("data-name", data.name);
                $messagesContainer.appendChild($p);
            }

            if (data.type === "IMAGE") {
                let $p = document.createElement("p"),
                    $img = document.createElement("img");

                $img.src = `${urlMediaGify}${data.message}/200.gif`;
                $p.setAttribute("data-name", data.name);
                $p.appendChild($img);
                $messagesContainer.appendChild($p);
            }
        }
    });


    $chatForm.addEventListener("submit", onSendMessage);
    $loginForm.addEventListener("submit", onLogin);
    $gifsContainer.addEventListener("click", onSendImage);

    function onSendImage(ev) {
        if (ev.target.nodeName !== "IMG") return;

        let imageId = ev.target.dataset.imageId;

        ws.emit("chat message", { message: imageId, name: loginName, type: "IMAGE" });
    }

    function onLogin(ev) {
        ev.preventDefault();

        let name = $userName.value.trim();

        if (!name || name.length > 30) return;

        loginName = name;
        $userName.value = "";
        $loginForm.hidden = true;
        $chatForm.hidden = false;
        $chatMessageInput.disabled = false;
        document.querySelector(".chat-container").style = "justify-content: space-between";
    }

    function onSendMessage(ev) {
        ev.preventDefault();

        let message = $chatMessageInput.value.trim();

        if (!message) return;

        ws.emit("chat message", { message, name: loginName, type: "TEXT" });
        $chatMessageInput.value = "";
    }

    fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC").
    then(res => res.json()).
    then(res => {
        let result = res.data.map(image => ({
            id: image.id,
            url: image.images.fixed_height.url
        }));

        renderImages(result);
    });

    function renderImages(images) {
        let $container = document.getElementById("gifs-container"),
            fragment = document.createDocumentFragment();

        images.forEach(image => {
            let $img = document.createElement("img");

            $img.src = image.url;
            $img.setAttribute("data-image-id", image.id);
            fragment.appendChild($img);
        });

        $container.appendChild(fragment);
    }
})();
