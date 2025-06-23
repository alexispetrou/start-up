function handleSearch(event) {
            event.preventDefault(); 

            const location = document.getElementById('location').value;
            const type = document.getElementById('type').value;
            const priceMin = document.getElementById('price-min').value;
            const priceMax = document.getElementById('price-max').value;

            const params = new URLSearchParams({
                location,
                type,
                priceMin,
                priceMax
            });

            window.location.href = `properties.html?${params.toString()}`;
}

viewPropertiesBtn.addEventListener('click', () => {
            window.location.href = 'properties.html';
});