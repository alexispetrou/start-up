 // Mobile Menu Toggle
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Tab switching functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all forms
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show the selected form
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Form validation
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                if (this.id === 'login') {
                    const email = this.querySelector('#login-email').value;
                    const password = this.querySelector('#login-password').value;
                    
                    if (!email || !password) {
                        alert('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία');
                        return;
                    }
                    
                    // In a real implementation, this would submit to a server
                    alert('Σύνδεση επιτυχής! Ανακατεύθυνση...');
                    window.location.href = 'profile.html';
                } 
                else if (this.id === 'signup') {
                    const name = this.querySelector('#signup-name').value;
                    const email = this.querySelector('#signup-email').value;
                    const password = this.querySelector('#signup-password').value;
                    const confirm = this.querySelector('#signup-confirm').value;
                    const terms = this.querySelector('input[type="checkbox"]').checked;
                    
                    if (!name || !email || !password || !confirm) {
                        alert('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία');
                        return;
                    }
                    
                    if (password !== confirm) {
                        alert('Οι κωδικοί πρόσβασης δεν ταιριάζουν');
                        return;
                    }
                    
                    if (!terms) {
                        alert('Πρέπει να αποδεχτείτε τους Όρους και Προϋποθέσεις');
                                                return;
                    }
                    
                    // In a real implementation, this would submit to a server
                    alert('Εγγραφή επιτυχής! Μπορείτε τώρα να συνδεθείτε.');
                    document.querySelector('.tab-button[data-tab="login"]').click();
                }
            });
        });

        // Password strength indicator (could be enhanced)
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                // This is a basic implementation - you could add more sophisticated checks
                const password = this.value;
                const strengthIndicator = document.getElementById('password-strength');
                
                if (password.length === 0) {
                    if (strengthIndicator) strengthIndicator.textContent = '';
                } else if (password.length < 6) {
                    if (strengthIndicator) strengthIndicator.textContent = 'Αδύναμος';
                } else if (password.length < 10) {
                    if (strengthIndicator) strengthIndicator.textContent = 'Μέτριος';
                } else {
                    if (strengthIndicator) strengthIndicator.textContent = 'Δυνατός';
                }
            });
        }