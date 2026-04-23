// Client-side form handler for API integration with rate limit bypass
document.addEventListener('DOMContentLoaded', function() {
  // Handle all forms with API endpoints
  document.querySelectorAll('form[action^="/api/"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
      const originalText = submitBtn.value || submitBtn.textContent;
      
      // Show loading state
      if (submitBtn.tagName === 'INPUT') {
        submitBtn.value = 'Processing...';
      } else {
        submitBtn.textContent = 'Processing...';
      }
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Try simple API first (no rate limits), then fallback to regular API
        const simpleAction = form.action.replace('/api/', '/api/') + '-simple';
        
        console.log('Submitting to:', simpleAction);
        console.log('Form data:', data);
        
        let response = await fetch(simpleAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        // If simple API not found, try regular API
        if (!response.ok && response.status === 404) {
          console.log('Simple API not found, trying regular API:', form.action);
          response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (response.ok && result.success) {
          alert(result.message || 'Success!');
          
          // Redirect based on form type
          if (form.action.includes('/api/event-booking')) {
            window.location.href = 'regform.html';
          } else if (form.action.includes('/api/payment')) {
            alert('Payment successful! Thank you for your booking.');
            window.location.href = 'main1.html';
          } else if (form.action.includes('/api/contact')) {
            alert('Message sent successfully! We will get back to you soon.');
            form.reset();
          } else if (form.action.includes('/api/signup')) {
            window.location.href = 'login-new.html';
          } else if (form.action.includes('/api/login')) {
            // Store session
            if (result.session) {
              localStorage.setItem('session', JSON.stringify(result.session));
            }
            if (result.user) {
              localStorage.setItem('user', JSON.stringify(result.user));
            }
            window.location.href = 'main1.html';
          }
        } else {
          alert(result.error || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Network error. Please check your connection and try again.');
      } finally {
        // Restore button state
        if (submitBtn.tagName === 'INPUT') {
          submitBtn.value = originalText;
        } else {
          submitBtn.textContent = originalText;
        }
        submitBtn.disabled = false;
      }
    });
  });
});
