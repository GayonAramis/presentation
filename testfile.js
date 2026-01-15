const nameInput = document.getElementById("input-name");
const displayName = document.getElementById("display-name");

nameInput.addEventListener('input', function() {
    if (nameInput.value === "") {
        displayName.textContent = "";
    } else {
        displayName.textContent = nameInput.value;
    }

});