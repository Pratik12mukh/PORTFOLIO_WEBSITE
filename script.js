class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = this.isDeleting ? 100 : 150;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

window.onload = () => {
    const elements = document.getElementsByClassName('typewrite');
    for (let element of elements) {
        const toRotate = JSON.parse(element.getAttribute('data-type'));
        const period = element.getAttribute('data-period');
        new TxtType(element, toRotate, period);
    }

    // Add active state management for navbar links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove the 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add the 'active' class to the clicked link
            this.classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark mode toggle
    const checkbox = document.getElementById("checkbox");
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
    });

    // Real-time form validation
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value === "") {
                this.style.borderColor = "red";
            } else {
                this.style.borderColor = "";
            }
        });
    });

    // Responsive navigation toggle
    document.querySelector('.nav-toggle').addEventListener('click', function() {
        document.querySelector('.navbar').classList.toggle('active');
    });
};

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === "" || email === "" || message === "") {
        alert("All fields are required!");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    return true;
}
