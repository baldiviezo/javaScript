const selectInput = document.getElementById('select-input');
const selectOptions = document.getElementById('select-options');

selectInput.addEventListener('input', () => {
    const inputValue = selectInput.value.toLowerCase();
    const options = selectOptions.children;

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const optionText = option.textContent.toLowerCase();

        if (optionText.includes(inputValue)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    }
});

selectInput.addEventListener('focus', () => {
    selectOptions.style.display = 'block';
});

selectInput.addEventListener('blur', () => {
    selectOptions.style.display = 'none';
});