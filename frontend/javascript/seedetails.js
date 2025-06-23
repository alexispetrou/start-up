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