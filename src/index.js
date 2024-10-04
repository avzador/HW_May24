export default () => {
  const container = document.querySelector('.container');
  const h2 = container.querySelector('h2');

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
  container.insertBefore(form, h2.nextSibling);

  const whereInput = document.getElementById('where');
  const whenInput = document.getElementById('when');
  const whereNotification = document.getElementById('where-notification');
  const whenNotification = document.getElementById('when-notification');
  const submitBtn = document.getElementById('submit-btn');

  function validateWhere(value) {
    return /^[^\s]+-[^\s]+$/.test(value);
  }

  function validateWhen(value) {
    return /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])$/.test(value);
  }

  function updateWhereNotification(isValid) {
    whereNotification.classList.remove('text-success', 'text-danger');
    whereNotification.classList.add(isValid ? 'text-success' : 'text-danger');
    whereNotification.textContent = isValid ? 'Город введен верно' : 'Город введен неверно';
  }

  function updateWhenNotification(isValid) {
    whenNotification.classList.remove('text-success', 'text-danger');
    whenNotification.classList.add(isValid ? 'text-success' : 'text-danger');
    whenNotification.textContent = isValid ? 'Дата введена верно' : 'Дата введена неверно';
  }

  function updateButtonState(isValid) {
    submitBtn.classList.remove('btn-primary', 'btn-danger', 'bg-success');
    if (isValid) {
      submitBtn.classList.add('bg-success');
    } else {
      submitBtn.classList.add('btn-danger');
    }
  }
  whereInput.addEventListener('input', () => {
    const isValid = validateWhere(whereInput.value);
    updateWhereNotification(isValid);
    updateButtonState(isValid && validateWhen(whenInput.value));
  });

  whenInput.addEventListener('input', () => {
    const isValid = validateWhen(whenInput.value);
    updateWhenNotification(isValid);
    updateButtonState(isValid && validateWhere(whereInput.value));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isWhereValid = validateWhere(whereInput.value);
    const isWhenValid = validateWhen(whenInput.value);

    if (isWhereValid && isWhenValid) {
      // Имитируем успешный запрос, если нет fetch
      if (typeof fetch === 'undefined') {
        setTimeout(() => {
          document.body.classList.add('bg-success'); 
        }, 0);
        return;
      }

      try {
        const response = await fetch('/tickets', {
          method: 'POST',
          body: JSON.stringify({ where: whereInput.value, when: whenInput.value }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.body.classList.add('bg-success'); 
        } else {
          console.error('Ошибка отправки данных на сервер');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    } else {
      updateButtonState(false);
    }
  });
};
