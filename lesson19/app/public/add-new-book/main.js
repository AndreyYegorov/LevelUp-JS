;(function() {
    'use strict';

    const $form_addNewBook = document.querySelector('.form_addNewBook');

    $form_addNewBook.addEventListener('submit', e => {
        e.preventDefault();

        let title = $form_addNewBook.querySelector("#title").value,
            description = $form_addNewBook.querySelector("#description").value,
            author = $form_addNewBook.querySelector("#author").value,
            published = $form_addNewBook.querySelector("#published").value;

        fetch('/api/add-new-book', {
            method: 'POST',
            body: JSON.stringify({ title, description, author, published }),
            headers: {
                'content-type': 'application/json'
            }
        }).
        then(res => res.json()).
        then(res => {
            console.log(res);

            location.href = '/add-new-book';
        }).
        catch(e => console.error(e));
    });
})();
