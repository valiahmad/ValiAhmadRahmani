document.addEventListener('DOMContentLoaded', (event) => {
    let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('scroll-image-visible');
        }
    });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    // Target elements with the 'scroll-image' class
    document.querySelectorAll('.scroll-image').forEach(img => {
    observer.observe(img);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('#scrollButton');

    scrollButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button action
        smoothScrollTo(document.querySelector('#home').offsetTop, 1000); // Scroll to #home section over 1000ms
    });

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
});