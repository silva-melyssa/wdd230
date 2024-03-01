function check(input) {
    if (input.value !== document.getElementById('password').value) {
        input.setCustomValidity('Passwords must match');
    } else {
        input.setCustomValidity('');
    }
}

function updateRangeValue() {
    document.getElementById('rangeValue').textContent = document.getElementById('pageRating').value;
}