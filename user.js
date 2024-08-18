window.addEventListener(
  'beforeunload',
  event => {
    event.preventDefault();
    event.returnValue = '';
  }
); 

    let users = localStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }

    function saveUsersToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(users));
    }
    // Storing user data in local storage
function storeUsersInLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Retrieving user data from local storage
function getUsersFromLocalStorage() {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

// Call this function to store user data in local storage
storeUsersInLocalStorage();

// Call this function to retrieve user data from local storage
getUsersFromLocalStorage();

    document.getElementById('reset-button').addEventListener('click', resetForm);
    document.getElementById('user-form').addEventListener('submit', createUser);

    function createUser(event) {
      event.preventDefault();

      const errorMessages = [];

      const username = document.getElementById('username').value;
      if (username.trim() === "") {
        errorMessages.push('Username cannot be empty');
      }

      const email = document.getElementById('email').value;
      if (email.trim() === "") {
        errorMessages.push('Email cannot be empty');
      }

      const password = document.getElementById('password').value;
      if (password.trim() === "") {
        errorMessages.push('Password cannot be empty');
      }

      const confirmPassword = document.getElementById('confirm-password').value;
      if (confirmPassword.trim() === "") {
        errorMessages.push('Confirm Password cannot be empty');
      }

      if (password !== confirmPassword) {
        errorMessages.push('Password and Confirm Password must match');
      }

      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        errorMessages.push('Please select a gender');
      }

      const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(input => input.value);
      if (hobbies.length === 0) {
        errorMessages.push('Please select at least one hobby');
      }

      const bloodGroup = document.getElementById('blood-group').value;
      if (bloodGroup.trim() === "") {
        errorMessages.push('Please select a blood group');
      }

      const birthDate = document.getElementById('birth-date').value;
      if (birthDate.trim() === "") {
        errorMessages.push('Date of Birth cannot be empty');
      } else {
        const currentDate = new Date();
        const selectedDate = new Date(birthDate);

        if (selectedDate > currentDate) {
          errorMessages.push('Date of Birth cannot be a future date');
        }
      }

      if (errorMessages.length > 0) {
        alert(errorMessages.join('\n'));
        return;
      }

      const newUser = {
        username,
        email,
        password,
        gender: gender.value,
        hobbies,
        birthDate,
        bloodGroup
      };
      const updateButton = document.getElementById('update-button');
      updateButton.style.display = 'none';

      const createButton = document.getElementById('create-button');
      createButton.style.display = 'inline-block';

      if (updateButton.style.display === 'inline-block') {
        const index = updateButton.dataset.index;
        users[index] = newUser;
        updateButton.style.display = 'none';
        createButton.style.display = 'inline-block';
        alert('User successfully updated');
      } else {
        users.push(newUser);
        alert('User successfully created');
      }

      displayUsers();
      saveUsersToLocalStorage();
      resetForm();
    }


    function deleteUser(index) {
      users.splice(index, 1);
      displayUsers();
      saveUsersToLocalStorage();
    }

    function editUser(index) {
      if (confirm("Do you want to edit this data?")) {
        const user = users[index];
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        document.getElementById('confirm-password').value = user.password;
        const genderElement = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
        if (genderElement !== null) {
          genderElement.checked = true;
        }

        const hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]');
        hobbyCheckboxes.forEach(checkbox => {
          if (user.hobbies.includes(checkbox.value)) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
        document.getElementById('birth-date').value = user.birthDate;
        document.getElementById('blood-group').value = user.bloodGroup;

        const updateButton = document.getElementById('update-button');
        updateButton.style.display = 'inline-block';

        updateButton.addEventListener('click', () => {
          const username = document.getElementById('username').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirm-password').value;
          const gender = document.querySelector('input[name="gender"]:checked');
          const selectedGender = gender ? gender.value : "";
          const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(input => input.value);
          const birthDate = document.getElementById('birth-date').value;
          const bloodGroup = document.getElementById('blood-group').value;

          const errorMessages = [];

          if (username.trim() === "") {
            errorMessages.push('Username cannot be empty');
          }

          if (email.trim() === "") {
            errorMessages.push('Email cannot be empty');
          }

          if (password.trim() === "") {
            errorMessages.push('Password cannot be empty');
          }

          if (confirmPassword.trim() === "") {
            errorMessages.push('Confirm Password cannot be empty');
          }

          if (password !== confirmPassword) {
            errorMessages.push('Password and Confirm Password must match');
          }

          if (!gender) {
            errorMessages.push('Please select a gender');
          }

          if (hobbies.length === 0) {
            errorMessages.push('Please select at least one hobby');
          }

          if (bloodGroup.trim() === "") {
            errorMessages.push('Please select a blood group');
          }

          if (new Date(birthDate) > new Date()) {
            errorMessages.push('Date of Birth cannot be a future date');
          }

          if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            return;
          }

          const updatedUser = {
            username: username,
            email: email,
            password: password,
            gender: selectedGender,
            hobbies: hobbies,
            birthDate: birthDate,
            bloodGroup: bloodGroup
          };

          users[index] = updatedUser;
          displayUsers();
          saveUsersToLocalStorage();
          resetForm();

          const editButtons = document.querySelectorAll('.edit-button');
          editButtons.forEach(button => {
            button.removeAttribute('disabled');
          });
          const createButton = document.getElementById('create-button');
          createButton.textContent = 'Create';
          createButton.removeEventListener('click', updateButton);
          createButton.addEventListener('click', createUser);
          createButton.style.display = 'inline-block';
          updateButton.style.display = 'none';
        });

        const createButton = document.getElementById('create-button');
        createButton.innerHTML = "Update";
        createButton.removeEventListener("click", createUser);
        createButton.addEventListener("click", () => {
          users[index];
        });
        createButton.style.display = 'none';

        const editButtons = document.querySelectorAll(".edit-button");
        editButtons.forEach((button) => {
          button.setAttribute("disabled", true);
        });

        const updateButtons = document.querySelectorAll(".update-button");
        updateButtons.forEach((button) => {
          button.setAttribute("disabled", false);
        });
      }
    }

    function displayUsers() {
      const tableBody = document.getElementById('user-table-body');
      tableBody.innerHTML = '';

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const row = document.createElement('tr');

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const passwordCell = document.createElement('td');
        passwordCell.textContent = user.password;
        row.appendChild(passwordCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = user.gender;
        row.appendChild(genderCell);

        const hobbiesCell = document.createElement('td');
        hobbiesCell.textContent = user.hobbies.join(', ');
        row.appendChild(hobbiesCell);

        const birthDateCell = document.createElement('td');
        const birthDate = new Date(user.birthDate);
        const formattedBirthDate = `${birthDate.getDate()}-${birthDate.getMonth() + 1}-${birthDate.getFullYear()}`;
        birthDateCell.textContent = formattedBirthDate;
        row.appendChild(birthDateCell);

        const bloodGroupCell = document.createElement('td');
        bloodGroupCell.textContent = user.bloodGroup;
        row.appendChild(bloodGroupCell);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          document.getElementById('create-button').innerHTML = 'Update';
          const editButtons = document.querySelectorAll('.edit-button');
          editButtons.forEach((button) => {
            button.setAttribute('disabled', true);
          });
          const updateButtons = document.querySelectorAll(".update-button");
          updateButtons.forEach((button) => {
            button.setAttribute("disabled", false);
          });
          editUser(i);
        });
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteUser(i);
          displayUsers();
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
      }
    }

    function resetForm() {
      document.getElementById('user-form').reset();
      resetErrorMessages();
    }

    function displayErrorMessage(message) {
      alert(message);
    }

    function resetErrorMessages() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach((errorMessage) => {
        if (errorMessage !== null) {
          errorMessage.textContent = '';
        }
      });
    }
    function displaySuccessMessage(message) {
      const successMessageContainer = document.getElementById('success-message');
      successMessageContainer.textContent = message;
      successMessageContainer.style.display = 'block';
    }

    function resetSuccessMessage() {
      const successMessageContainer = document.getElementById('success-message');
      successMessageContainer.textContent = '';
      successMessageContainer.style.display = 'none';
    }

    displayUsers();

    //dark mode 
    const darkbtn = document.getElementById('darkbtn');
    const body = document.body;

    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkbtn.checked = true;
    }

    darkbtn.addEventListener('change', () => {
        if (darkbtn.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });