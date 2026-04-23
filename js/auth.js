// Authentication handler for login and signup

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  
  const form = event.target;
  const EMAIL = form.querySelector('input[name="EMAIL"]').value;
  const PASSWORD = form.querySelector('input[name="PASSWORD"]').value;

  if (!EMAIL || !PASSWORD) {
    alert('Please enter valid information');
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ EMAIL, PASSWORD })
    });

    const data = await response.json();

    if (response.ok) {
      // Store session info
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('session', JSON.stringify(data.session));
      
      // Redirect to main page
      window.location.href = 'main1.html';
    } else {
      alert(data.error || 'Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Handle signup form submission
async function handleSignup(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value;
  const EMAIL = form.querySelector('input[name="EMAIL"]').value;
  const PASSWORD = form.querySelector('input[name="PASSWORD"]').value;
  const phoneno = form.querySelector('input[name="phoneno"]').value;

  if (!name || !EMAIL || !PASSWORD || !phoneno) {
    alert('Please enter valid information');
    return;
  }

  if (!isNaN(EMAIL)) {
    alert('Please enter a valid email address');
    return;
  }

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, EMAIL, PASSWORD, phoneno })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Account created successfully!');
      // Redirect to main page
      window.location.href = 'main1.html';
    } else {
      alert(data.error || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on login page
  const loginForm = document.querySelector('form[action=""]');
  if (loginForm && loginForm.querySelector('input[name="EMAIL"]')) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Check if we're on signup page
  const signupForm = document.querySelector('form[action=""]');
  if (signupForm && signupForm.querySelector('input[name="name"]')) {
    signupForm.addEventListener('submit', handleSignup);
  }
});
