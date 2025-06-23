// Featured properties data
        const featuredProperties = [
            { 
                title: "Διαμέρισμα στο Δημοτικό θέατρο",
                image_link: "https://m3.spitogatos.gr/317741837_300x220.jpg?v=20130730",
                price: "600",
                size: 65,
                year: 2006,
                bedrooms: 2,
                bathrooms: 1
            },
            { 
                title: "Διαμέρισμα στο Μικρολίμανο",
                image_link: "https://m1.spitogatos.gr/318635769_300x220.jpg?v=20130730",
                price: "400",
                size: 45,
                year: 2002,
                bedrooms: 1,
                bathrooms: 1
            },
            { 
                title: "Διαμέρισμα στα Μανιάτικα",
                image_link: "https://m1.spitogatos.gr/294492630_300x220.jpg?v=20130730",
                price: "500",
                size: 55,
                year: 2010,
                bedrooms: 1,
                bathrooms: 1
            }
        ];

        

        // DOM elements
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');
        const resultMessage = document.getElementById('result-message');
        const restartBtn = document.getElementById('restart-btn');
        const viewPropertiesBtn = document.getElementById('view-properties');
        const progressBar = document.getElementById('progress');
        const featuredContainer = document.getElementById('featured-properties-container');

        // State variables
        let currentQuestionIndex = 0;
        let currentFollowUpIndex = 0;
        let answers = [];
        let isInFollowUp = false;
        let followUpQuestions = [];

        // Initialize the page
        function initPage() {
            initQuestionnaire();
            loadFeaturedProperties();
            initMobileMenu();
        }

       

        // Show results
        function showResults() {
            questionContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            
            // Create a summary of answers
            let summary = "<ul>";
            answers.forEach(item => {
                summary += `<li><strong>${item.question}</strong>: ${item.answer}</li>`;
            });
            summary += "</ul>";
            
            resultMessage.innerHTML = `Βάσει των απαντήσεών σας: ${summary}`;
            progressBar.style.width = '100%';
        }

        // Load featured properties
        function loadFeaturedProperties() {
            featuredProperties.forEach(property => {
                const card = document.createElement('article');
                card.className = 'property-card';
                card.innerHTML = `
                    <div class="property-image">
                        <img src="${property.image_link}" alt="${property.title}" loading="lazy">
                        <span class="property-tag">${property.size} τ.μ.</span>
                    </div>
                    <div class="property-details">
                        <h3>${property.title}</h3>
                        <div class="property-price">${property.price} €</div>
                        <div class="property-features">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                            <span><i class="fas fa-calendar-alt"></i> ${property.year}</span>
                        </div>
                        <button class="view-details" onclick="viewDetails('${property.title}', '${property.image_link}', '${property.price}', ${property.size}, ${property.year})">
                            Περισσότερες πληροφορίες
                        </button>
                    </div>
                `;
                featuredContainer.appendChild(card);
            });
        }

        // Initialize mobile menu
        function initMobileMenu() {
            const menuButton = document.querySelector('.mobile-menu-button');
            const navLinks = document.querySelector('.nav-links');
            
            menuButton.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
                navLinks.style.display = expanded ? 'none' : 'flex';
                this.querySelector('i').className = expanded ? 'fas fa-bars' : 'fas fa-times';
            });
        }

        // Restart questionnaire
        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            currentFollowUpIndex = 0;
            answers = [];
            isInFollowUp = false;
            followUpQuestions = [];
            
            questionContainer.classList.remove('hidden');
            resultContainer.classList.add('hidden');
            progressBar.style.width = '0%';
            
            initQuestionnaire();
        });

        // View properties button
        viewPropertiesBtn.addEventListener('click', () => {
            window.location.href = 'properties.html';
        });

        // View property details
        function viewDetails(title, image, price, size, year) {
            const params = new URLSearchParams({
                title: title,
                image: image,
                price: price,
                size: size,
                year: year
            });
            window.location.href = 'seedetails.html?' + params.toString();
        }

        // Start the page
        initPage();