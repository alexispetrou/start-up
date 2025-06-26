document.addEventListener('DOMContentLoaded', function() {
            // Get property details from URL parameters
            const params = new URLSearchParams(window.location.search);
            
            // Set property details
            if (params.get('title')) {
                document.getElementById('property-title').textContent = params.get('title');
                document.title = `Prime Properties | ${params.get('title')}`;
            }
            
            if (params.get('image')) {
                document.getElementById('main-image').src = params.get('image');
            }
            
            if (params.get('price')) {
                document.getElementById('property-price').textContent = `${params.get('price')} €/μήνα`;
            }
            
            if (params.get('size')) {
                document.getElementById('property-size').textContent = `${params.get('size')} τ.μ.`;
            }
            
            if (params.get('year')) {
                document.getElementById('property-year').textContent = params.get('year');
            }
            
            if (params.get('location')) {
                document.getElementById('property-address').textContent = params.get('location');
            }
            
            if (params.get('bedrooms')) {
                document.getElementById('property-bedrooms').textContent = params.get('bedrooms');
            }
            
            if (params.get('bathrooms')) {
                document.getElementById('property-bathrooms').textContent = params.get('bathrooms');
            }
            
            if (params.get('type')) {
                document.getElementById('property-type').textContent = params.get('type');
            }
            
            // Set features
            const features = [
                'Κλιματισμός', 'Θέρμανση', 'Ασανσέρ', 'Μπαλκόνι', 
                'Πάρκινγκ', 'Όπλισμένη πόρτα', 'Δορυφορική Τηλεόραση',
                'Internet', 'Εντοιχισμένα ντουλάπια', 'Πλήρως εξοπλισμένη κουζίνα'
            ];
            
            const featuresContainer = document.getElementById('property-features');
            features.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <i class="fas fa-check"></i>
                    <span>${feature}</span>
                `;
                featuresContainer.appendChild(featureItem);
            });
            
            // Initialize chart
            const ctx = document.getElementById('scoreChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Περπατήματος', 'Μεταφορών', 'Ποδηλάτου'],
                    datasets: [{
                        data: [97, 79, 88],
                        backgroundColor: [
                            '#2ecc71',
                            '#3498db',
                            '#9b59b6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    cutout: '70%'
                }
            });
            
            // Mobile menu toggle
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
            
            // Favorite button functionality
            const favoriteBtn = document.getElementById('favorite-btn');
            favoriteBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                
                if (this.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-heart"></i> Στα Αγαπημένα';
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i> Προσθήκη στα Αγαπημένα';
                }
            });
            
            // Gallery thumbnail click functionality
            const thumbnails = document.querySelectorAll('.gallery-thumbnail');
            const mainImage = document.getElementById('main-image');
            
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    mainImage.src = imgSrc;
                    
                    // Remove active class from all thumbnails
                    thumbnails.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                });
            });
            
            // Set first thumbnail as active
            if (thumbnails.length > 0) {
                thumbnails[0].classList.add('active');
            }
            
            // Contact button functionality
            const contactBtn = document.querySelector('.contact-button');
            contactBtn.addEventListener('click', function() {
                const propertyTitle = document.getElementById('property-title').textContent;
                window.location.href = `contact.html?property=${encodeURIComponent(propertyTitle)}`;
            });
            
            // Initialize lightgallery
            lightGallery(document.querySelector('.property-gallery'), {
                selector: '.gallery-thumbnail',
                download: false,
                counter: false
            });
            
            // Animate elements when they come into view
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.fade-in');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Initialize animations
            window.addEventListener('load', () => {
                // Set initial state for animated elements
                document.querySelectorAll('.fade-in').forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                });
                
                // Trigger first animation check
                animateOnScroll();
            });
            
            // Check for animations on scroll
            window.addEventListener('scroll', animateOnScroll);
        });
        document.addEventListener('DOMContentLoaded', function() {
            // Get property details from URL parameters
            const params = new URLSearchParams(window.location.search);
            
            // Set property details
            document.getElementById('title').textContent = params.get('title') || 'Δεν βρέθηκε τίτλος';
            document.getElementById('image').src = params.get('image') || 'default-property.jpg';
            document.getElementById('image').alt = params.get('title') || 'Εικόνα ακινήτου';
            document.getElementById('price').textContent = 'Τιμή: ' + (params.get('price') ? `${params.get('price')} €` : 'Κατόπιν συνεννόησης');
            document.getElementById('size').textContent = 'Μέγεθος: ' + (params.get('size') || '') + ' τ.μ.';
            document.getElementById('year').textContent = 'Έτος κατασκευής: ' + (params.get('year') || '-');
            document.getElementById('location').textContent = 'Τοποθεσία: ' + (params.get('location') || 'Πειραιάς');
            document.getElementById('description').textContent = params.get('description') || 'Δεν υπάρχει διαθέσιμη περιγραφή για αυτό το ακίνητο.';
            
            // Set features
            const features = params.get('features') ? params.get('features').split(',') : ['3 Κρεβατοκάμαρες', '2 Μπάνια', 'Κουζίνα', 'Πάρκινγκ'];
            const featuresList = document.getElementById('features');
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.trim();
                featuresList.appendChild(li);
            });
            
            // Initialize chart
            const ctx = document.getElementById('scoreChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Περπατήματος', 'Μεταφορών', 'Ποδηλάτου'],
                    datasets: [{
                        data: [97, 79, 88],
                        backgroundColor: [
                            '#2ecc71',
                            '#3498db',
                            '#9b59b6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            // Mobile menu toggle
            const menuButton = document.querySelector('.mobile-menu-button');
            const navLinks = document.querySelector('.nav-links');
            
            menuButton.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
                navLinks.style.display = expanded ? 'none' : 'flex';
                this.querySelector('i').className = expanded ? 'fas fa-bars' : 'fas fa-times';
            });
            
            // Load similar properties (mock data)
            const similarContainer = document.getElementById('similar-properties-container');
            const similarProperties = [
                {title: 'Παρόμοιο Διαμέρισμα', price: '180,000', size: '85', image: 'https://m1.spitogatos.gr/318635769_300x220.jpg?v=20130730'},
                {title: 'Οικογενειακή Κατοικία', price: '250,000', size: '120', image: 'https://m2.spitogatos.gr/311467849_300x220.jpg?v=20130730'},
                {title: 'Μοντέρνο Στούντιο', price: '120,000', size: '45', image: 'https://m1.spitogatos.gr/294492630_300x220.jpg?v=20130730'}
            ];
            
            similarProperties.forEach(property => {
                const propertyCard = document.createElement('div');
                propertyCard.className = 'property-card';
                propertyCard.innerHTML = `
                    <img src="${property.image}" alt="${property.title}">
                    <h3>${property.title}</h3>
                    <p>Τιμή: ${property.price} €</p>
                    <p>Μέγεθος: ${property.size} τ.μ.</p>
                    <a href="properties.html?title=${encodeURIComponent(property.title)}&price=${property.price}&size=${property.size}" class="info-btn">Περισσότερα</a>
                `;
                similarContainer.appendChild(propertyCard);
            });
        });