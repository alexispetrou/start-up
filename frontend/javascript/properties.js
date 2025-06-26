 // Initialize Leaflet map
        const map = L.map('property-map').setView([37.9420, 23.6462], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Property data
        const properties = [
            { 
                title: "Διαμέρισμα στο Δημοτικό θέατρο",
                image_link: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "600",
                size: 65,
                year: 2006,
                location: "dimitriou",
                type: "apartment",
                bedrooms: 2,
                bathrooms: 1,
                lat: 37.9450,
                lng: 23.6430
            },
            { 
                title: "Διαμέρισμα στο Μικρολίμανο",
                image_link: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "400",
                size: 45,
                year: 2002,
                location: "mikrolimano",
                type: "apartment",
                bedrooms: 1,
                bathrooms: 1,
                lat: 37.9405,
                lng: 23.6550
            },
            { 
                title: "Διαμέρισμα στα Μανιάτικα",
                image_link: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "500",
                size: 55,
                year: 2010,
                location: "maniatika",
                type: "apartment",
                bedrooms: 1,
                bathrooms: 1,
                lat: 37.9380,
                lng: 23.6350
            },
            { 
                title: "Διαμέρισμα στο Δημοτικό θέατρο",
                image_link: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "700",
                size: 62,
                year: 2016,
                location: "dimitriou",
                type: "apartment",
                bedrooms: 2,
                bathrooms: 1,
                lat: 37.9450,
                lng: 23.6430
            },
            { 
                title: "Στούντιο στο Δημοτικό θέατρο",
                image_link: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "360",
                size: 35,
                year: 1997,
                location: "dimitriou",
                type: "studio",
                bedrooms: 0,
                bathrooms: 1,
                lat: 37.9450,
                lng: 23.6430
            },
            { 
                title: "Διαμέρισμα στο Δημοτικό θέατρο",
                image_link: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                price: "900",
                size: 75,
                year: 2017,
                location: "dimitriou",
                type: "apartment",
                bedrooms: 3,
                bathrooms: 2,
                lat: 37.9450,
                lng: 23.6430
            }
        ];

        // Add markers to map
        function addMarkers(propertiesToShow) {
            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add new markers
            propertiesToShow.forEach(property => {
                const marker = L.marker([property.lat, property.lng])
                    .addTo(map)
                    .bindPopup(`<b>${property.title}</b><br>Τιμή: ${property.price}€`);
                
                marker.on('click', function() {
                    // Scroll to property card when marker is clicked
                    const propertyCard = document.querySelector(`[data-property-id="${property.title}"]`);
                    if (propertyCard) {
                        propertyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        propertyCard.classList.add('highlight');
                        setTimeout(() => {
                            propertyCard.classList.remove('highlight');
                        }, 2000);
                    }
                });
            });

            // Adjust map view to show all markers if there are properties
            if (propertiesToShow.length > 0) {
                const group = new L.featureGroup(propertiesToShow.map(p => L.marker([p.lat, p.lng])));
                map.fitBounds(group.getBounds().pad(0.1));
            }
        }

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
        
        // Sticky navigation on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.main-nav');
            nav.classList.toggle('sticky', window.scrollY > 50);
        });
        
        // Favorite button functionality
        document.addEventListener('click', function(e) {
            if (e.target.closest('.favorite-button')) {
                const button = e.target.closest('.favorite-button');
                button.querySelector('i').classList.toggle('far');
                button.querySelector('i').classList.toggle('fas');
            }
        });

        // View details button functionality
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.property-card');
                const title = card.querySelector('h3').textContent;
                const price = card.querySelector('.property-price').textContent;
                const address = card.querySelector('.property-address').textContent.trim();
                const features = card.querySelectorAll('.property-features span');
                
                viewPropertyDetails(
                    title,
                    card.querySelector('img').src,
                    price,
                    features[0].textContent.replace(' τ.μ.', ''),
                    features[1].textContent,
                    features[2].textContent,
                    features[3].textContent,
                    address
                );
            });
        });

        // View property details function
        function viewPropertyDetails(title, image, price, size, bedrooms, bathrooms, year, address) {
            // In a real implementation, this would redirect to a property details page
            // For demo purposes, we'll show an alert
            alert(`Λεπτομέρειες Ακινήτου:\n\n${title}\n\nΤιμή: ${price}\nΔιεύθυνση: ${address}\nΜέγεθος: ${size} τ.μ.\nΥπνοδωμάτια: ${bedrooms}\nΜπάνια: ${bathrooms}\nΈτος κατασκευής: ${year}`);
        }

        // Search form functionality
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const location = document.getElementById('location').value;
                const type = document.getElementById('type').value;
                const priceMin = document.getElementById('price-min').value;
                const priceMax = document.getElementById('price-max').value;
                
                const filtered = properties.filter(property => {
                    return (!location || property.location === location) &&
                           (!type || property.type === type) &&
                           (!priceMin || parseInt(property.price) >= parseInt(priceMin)) &&
                           (!priceMax || parseInt(property.price) <= parseInt(priceMax));
                });
                
                // Update property count
                document.getElementById('properties-count').textContent = filtered.length;
                
                // Update map markers
                addMarkers(filtered);
                
                // Show filtered properties (in a real implementation, this would update the DOM)
                alert(`Βρέθηκαν ${filtered.length} ακίνητα με τα επιλεγμένα κριτήρια.`);
            });
        }

        // Initialize map with all properties
        addMarkers(properties);

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