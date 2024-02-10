const modeButton = document.querySelector("#mode");
const body = document.body;

modeButton.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        modeButton.textContent = "🕶️";
    } else {
        body.classList.add("dark-mode");
        modeButton.textContent = "💡";
    }
});