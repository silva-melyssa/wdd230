const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#display");

gridButton.addEventListener("click", () => {
    display.classList.remove("list");
    display.classList.add("grid");
    fetchDataAndDisplay();
});

listButton.addEventListener("click", () => {
    display.classList.remove("grid");
    display.classList.add("list");
    fetchDataAndDisplay();
});

function fetchDataAndDisplay() {
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            display.innerHTML = ""; // Clear existing content
            data.forEach(member => {
                const section = document.createElement("section");
                section.innerHTML = `
                    <img src="data/${member.image}" alt="${member.name}" />
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p>Phone: ${member.phone}</p>
                    <p>Membership Level: ${member.membership_level}</p>
                    <p>${member.other_info}</p>
                `;
                display.appendChild(section);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Initialize with grid view
fetchDataAndDisplay();
