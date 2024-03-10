const baseURL = "https://silva-melyssa.github.io/wdd230/";

// Define the URL to the JSON data file
const linksURL = baseURL + "data/links.json";

// Fetch the links data from the JSON file
async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayLinks(data);
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}


// Function to display the links dynamically
function displayLinks(weeks) {
    const lessonsList = document.querySelector('.card ul');

    // Clear existing content
    lessonsList.innerHTML = '';

    // Loop through each week in the data
    weeks.lessons.forEach(week => {
        const weekHeader = document.createElement('h3');
        weekHeader.textContent = `Week ${week.lesson}:`;

        const linksList = document.createElement('ul');

        // Loop through each link in the week
        week.links.forEach(link => {
            const linkItem = document.createElement('li');
            const linkAnchor = document.createElement('a');
            linkAnchor.textContent = link.title;
            linkAnchor.href = baseURL + link.url;
            linkItem.appendChild(linkAnchor);
            linksList.appendChild(linkItem);
        });

        const weekItem = document.createElement('li');
        weekItem.appendChild(weekHeader);
        weekItem.appendChild(linksList);
        lessonsList.appendChild(weekItem);
    });
}

// Call the getLinks function to fetch and display the links
getLinks();
