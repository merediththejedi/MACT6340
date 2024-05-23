document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const dingDongButton = document.getElementById('dingDongButton');
    const footer = document.getElementById('footer');
    let lastScrollTop = 0;


    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

       
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
        
        
        let currentScrollTop = window.scrollY;
        if (currentScrollTop < lastScrollTop) {
        
            footer.style.display = 'none';
        } else {
            
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                footer.style.display = 'block';
            }
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

   
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (window.innerHeight / 2) + (targetElement.clientHeight / 2),
                    behavior: 'smooth'
                });
            }
        });
    });

   
    dingDongButton.addEventListener('click', function() {
        alert('Ding Dong!');
    });
});

