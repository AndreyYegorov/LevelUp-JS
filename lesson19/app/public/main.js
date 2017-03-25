;(function() {
    'use strict';

    let $booklist = document.querySelector('.booklist');

    fetch('/api/books')
        .then(res => res.json())
        .then(res => {
            console.log(res);

            let $docFragment = document.createDocumentFragment();

            res.forEach((el) => {
                let $booklistLink = document.createElement('a'),
                    $booklistItem = document.createElement('li'),
                    $booklistTitle = document.createElement('h2'),
                    $booklistDescription = document.createElement('p'),
                    $booklistAuthor = document.createElement('div'),
                    $booklistPublished = document.createElement('div');

                $booklistLink.href = `/book?id=${el.id}`;
                $booklistItem.className = 'booklist-item';
                $booklistTitle.className = 'booklist-title';
                $booklistDescription.className = 'booklist-description';
                $booklistAuthor.className = 'booklist-author';
                $booklistPublished.className = 'booklist-published';

                $booklistTitle.textContent = el.title;
                $booklistDescription.textContent = el.description;
                $booklistAuthor.textContent = el.author;
                $booklistPublished.textContent = el.published;

                $docFragment.appendChild($booklistTitle);
                $docFragment.appendChild($booklistDescription);
                $docFragment.appendChild($booklistAuthor);
                $docFragment.appendChild($booklistPublished);

                $booklistLink.appendChild($docFragment);
                $booklistItem.appendChild($booklistLink);
                $booklist.appendChild($booklistItem);
            });
        })
        .catch(e => console.error(e));
})();