// Define the function that appends the form
function addOrderForm() {
    // Select the container element
    const container = document.querySelector('.container');

    // Check if the container exists in the DOM
    if (!container) {
        console.error('Container element not found');
        return;
    }

    // Create the form element and add inner HTML
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="mb-3">
            <label for="where" class="form-label">Откуда-Куда</label>
            <input autocomplete="off" type="text" class="form-control" id="where" placeholder="Введите город">
            <p id="where-notification"></p>
        </div>
        <div class="mb-3">
            <label for="when" class="form-label">Когда</label>
            <input autocomplete="off" type="text" class="form-control" id="when" placeholder="Введите число и месяц">
            <p id="when-notification"></p>
        </div>
        <button type="submit" class="btn btn-primary" id="submit-btn">Найти билеты</button>
    `;

    // Locate the h2 element within the container
    const h2 = container.querySelector('h2');

    // Check if the h2 exists within the container
    if (h2) {
        // Insert the form after the h2 element
        h2.insertAdjacentElement('afterend', form);
    } else {
        // If no h2 found, append the form as the first child of the container
        container.appendChild(form);
    }
}

// Export the function as the default export
export default addOrderForm;
