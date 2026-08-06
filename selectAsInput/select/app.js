const selectInput = document.getElementById('select-input');
const selectOptions = document.getElementById('select-options');
const selectOptionsContainer = document.getElementById('select-options-container');

selectInput.addEventListener('click', () => {
    selectOptionsContainer.style.display = 'block';
});

selectInput.addEventListener('input', () => {
    const inputValue = selectInput.value.toLowerCase();
    const options = selectOptions.options;
    const optionsList = [];

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const optionText = option.textContent.toLowerCase();

        if (optionText.includes(inputValue)) {
            optionsList.push(`<li>${option.textContent}</li>`);
        }
    }

    selectOptionsContainer.innerHTML = `<ul>${optionsList.join('')}</ul>`;
});