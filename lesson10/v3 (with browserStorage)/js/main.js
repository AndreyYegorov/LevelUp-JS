;(function() {
    "use strict";

    const ws = io("http://178.62.203.188:8888");
    let $messagesContainer = document.getElementById("messages-container"),
        $chatForm = document.getElementById("chat-form"),
        $loginForm = document.getElementById("login-form"),
        $chatMessageInput = document.getElementById("chat-message"),
        $userName = document.getElementById("login"),
        $gifsContainer = document.getElementById("gifs-container");

    let chatData = JSON.parse(window.localStorage.getItem('chatData')) || [],
        loginName = sessionStorage.getItem('loginName') || '',
        urlBase = 'http://api.giphy.com/v1/gifs',
        apiKey = 'dc6zaTOxFJmzC';

    if(chatData.length) window.addEventListener("load", () => renderMessage(chatData, false));
    ws.on("chat message", data => renderMessage(data, true));

    $chatForm.addEventListener("submit", onSendMessage);
    if(loginName) window.addEventListener("load", onLogin);
    $loginForm.addEventListener("submit", onLogin);
    $gifsContainer.addEventListener("click", onSendImage);

    fetch(`${urlBase}/trending?api_key=${apiKey}`)
        .then(res => res.json())
        .then(res => {
            let result = res.data.map(image => ({
                id: image.id,
                url: image.images.fixed_height.url
            }));

            renderImages(result);
        });

    function onSendImage(ev) {
        if(ev.target.nodeName !== "IMG") return;

        let imageId = ev.target.dataset.imageId;

        ws.emit("chat message", { imageId, name: loginName, date: getCurrentDate(), type: "IMAGE" });
    }

    function onSendMessage(ev) {
        ev.preventDefault();

        let message = $chatMessageInput.value.trim();

        if(!message) return;

        ws.emit("chat message", { message, name: loginName, date: getCurrentDate(), type: "TEXT" });
        $chatMessageInput.value = "";
    }

    function onLogin(ev) {
        ev.preventDefault();

        let name = loginName || $userName.value.trim();

        if(!loginName) sessionStorage.setItem('loginName', name);

        if(!name || name.length > 30) return;

        loginName = name;
        $userName.value = "";
        $loginForm.hidden = true;
        $chatForm.hidden = false;
        $chatMessageInput.disabled = false;
        document.querySelector(".chat-container").style = "justify-content: space-between";
    }

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

    function renderMessage(data, saveInHistory) {
        if(!Array.isArray(data)) data = [data];

        let fragment = document.createDocumentFragment();

        data.forEach(dataItem => {
            if(!dataItem.name) return;

            let $p = document.createElement("p");

            $p.setAttribute("data-name", dataItem.name);
            $p.setAttribute("data-date", dataItem.date);

            if(dataItem.type === "TEXT") {
                $p.textContent = dataItem.message;
            }

            if(dataItem.type === "IMAGE") {
                let $img = document.createElement("img");

                let imageId = dataItem.imageId;

                fetch(`${urlBase}/${imageId}?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(res => {
                        let url = res.data.images.fixed_height.url;

                        $img.src = url;
                        $p.appendChild($img);
                    });
            }

            fragment.appendChild($p);

            if(saveInHistory) {
                chatData.push(dataItem);

                window.localStorage.setItem('chatData', JSON.stringify(chatData));
            }    
        });
        
        $messagesContainer.appendChild(fragment);
    }

    function getCurrentDate() {
        let dayCurrent = new Date().getDate(),
            monthCurrent = new Date().getMonth() + 1,
            yearCurrent = new Date().getFullYear(),
            hoursCurrent = new Date().getHours(),
            minutesCurrent = new Date().getMinutes(),
            dateCurrent = `${hoursCurrent}:${minutesCurrent}, ${yearCurrent}.${monthCurrent}.${dayCurrent}`;

        return dateCurrent;
    }
})();