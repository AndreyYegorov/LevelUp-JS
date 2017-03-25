;(function() {
    'use strict';

    let $book = document.querySelector('.book'),
        $button = document.querySelector('button');
    
    let id = +location.search.match(/id=\d+/g)[0].slice(3);

    fetch(`/api/book/get/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);

            let $docFragment = document.createDocumentFragment();

            let $bookTitle = document.createElement('h2'),
                $bookDescription = document.createElement('p'),
                $bookAuthor = document.createElement('div'),
                $bookPublished = document.createElement('div');

                $bookTitle.className = 'book-title';
                $bookDescription.className = 'book-description';
                $bookAuthor.className = 'book-author';
                $bookPublished.className = 'book-published';

                $bookTitle.textContent = res.title;
                $bookDescription.textContent = res.description;
                $bookAuthor.textContent = res.author;
                $bookPublished.textContent = res.published;

                $docFragment.appendChild($bookTitle);
                $docFragment.appendChild($bookDescription);
                $docFragment.appendChild($bookAuthor);
                $docFragment.appendChild($bookPublished);

                $book.appendChild($docFragment);
        })
        .catch(e => console.error(e));

    $button.addEventListener('click', e => {
        fetch(`/api/book/delete/${id}`, {
            method: "DELETE"
        }).
        then(res => res.json()).
        then(res => {
            console.log(res);

            location.href = '/';
        }).
        catch(e => console.error(e));
    }); 
})();