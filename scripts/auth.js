document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {
        google.accounts.id.initialize({
            client_id: '49950093491-lt0v8bjoabp76usmik27uimiephjpt2f.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('g_id_signin'),
            { theme: 'outline', size: 'large' }
        );
        google.accounts.id.prompt(); 
    };
});

function handleCredentialResponse(response) {
    const token = response.credential;

    // Send the token to your backend server
    fetch('https://your-backend-url.com/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the teacher dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Authentication failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}