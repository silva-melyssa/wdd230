const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

let chaptersArray = getChapterList() || [];

// Populate the displayed list of chapters
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Button click event listener
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value.trim());
        chaptersArray.push(input.value.trim());
        setChapterList();
        input.value = '';
        input.focus();
    }
});

// Function to display a chapter in the list
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });

    li.appendChild(deleteButton);
    list.appendChild(li);
}

// Function to update localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Function to retrieve data from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Function to delete a chapter from the list and update localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, -1); // Remove the ❌ symbol from the chapter name
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}
