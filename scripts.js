document.addEventListener('DOMContentLoaded', function () {
    // prosthiki manual enan xristi 
    const manualUser = {
        firstName: 'Δημητράκης',
        lastName: 'Αδαμόπουλος',
        email: 'dimitris@email.com',
        password: 'melenedimitri',
        phone: '0123456789',
        address: 'kolasi',
        gender: 'Male',
        photo: 'path/to/photo.jpg'  
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.some(u => u.email === manualUser.email);
    if (!userExists) {
        users.push(manualUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'profile.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newUser = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                gender: document.getElementById('gender').value,
                photo: URL.createObjectURL(document.getElementById('photo').files[0])
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            window.location.href = 'profile.html';
        });
    }

    const profileDetails = document.getElementById('profileDetails');
    if (profileDetails && currentUser) {
        profileDetails.innerHTML = `
            <p><strong>First Name:</strong> ${currentUser.firstName}</p>
            <p><strong>Last Name:</strong> ${currentUser.lastName}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Phone:</strong> ${currentUser.phone}</p>
            <p><strong>Address:</strong> ${currentUser.address}</p>
            <p><strong>Gender:</strong> ${currentUser.gender}</p>
            <img src="${currentUser.photo}" alt="Profile Photo">
        `;
    }

    const editProfileButton = document.getElementById('editProfile');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function () {
            window.location.href = 'edit-profile.html';
        });
    }

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm && currentUser) {
        document.getElementById('editFirstName').value = currentUser.firstName;
        document.getElementById('editLastName').value = currentUser.lastName;
        document.getElementById('editEmail').value = currentUser.email;
        document.getElementById('editPhone').value = currentUser.phone;
        document.getElementById('editAddress').value = currentUser.address;
        document.getElementById('editGender').value = currentUser.gender;

        editProfileForm.addEventListener('submit', function (event) {
            event.preventDefault();
            currentUser.firstName = document.getElementById('editFirstName').value;
            currentUser.lastName = document.getElementById('editLastName').value;
            currentUser.email = document.getElementById('editEmail').value;
            currentUser.phone = document.getElementById('editPhone').value;
            currentUser.address = document.getElementById('editAddress').value;
            currentUser.gender = document.getElementById('editGender').value;

            const photoFile = document.getElementById('editPhoto').files[0];
            if (photoFile) {
                currentUser.photo = URL.createObjectURL(photoFile);
            }

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            window.location.href = 'profile.html';
        });
    }

    const changePasswordButton = document.getElementById('changePassword');
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', function () {
            const newPassword = prompt('Enter new password:');
            if (newPassword) {
                currentUser.password = newPassword;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                alert('Password changed successfully');
            }
        });
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

