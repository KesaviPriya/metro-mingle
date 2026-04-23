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
        let response = await fetch(simpleAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        // If simple API not found, try regular API
        if (!response.ok && response.status === 404) {
          response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
        
        const result = await response.json();
        
        if (result.success) {
          alert(result.message || 'Success!');
          
          // Redirect based on form type
          if (form.action.includes('/api/event-booking')) {
            window.location.href = 'regform.html';
          } else if (form.action.includes('/api/payment')) {
            window.location.href = 'main1.html';
          } else if (form.action.includes('/api/contact')) {
            window.location.href = 'main1.html';
          } else if (form.action.includes('/api/signup')) {
            window.location.href = 'log.html';
          } else if (form.action.includes('/api/login')) {
            // Store session
            if (result.session) {
              localStorage.setItem('session', JSON.stringify(result.session));
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
