
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 80
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbz-bLScG9ZwZi3uU2uPge8OkxyfrrsuXuSSgE-WYupYzRP4cqAw3nJ81cO_a-KDeGfPeA/exec';
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitSpinner = document.getElementById('submitSpinner');
const submitText = document.getElementById('submitText');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // cegah reload
    // validasi sederhana
    if (form.name.value.trim() === "") {
        alert("Name is required.");
        return;
    }

    if (form.email.value.trim() === "") {
        alert("Email is required.");
        return;
    }

    // tampilkan loading di button
    submitBtn.disabled = true;
    submitSpinner.classList.remove('d-none');
    submitText.textContent = 'Mengirim...';
    const formData = new FormData(form);

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })

    .then(() => {
        // reset button
        submitBtn.disabled = false;
        submitSpinner.classList.add('d-none');
        submitText.textContent = 'Kirim';
        // reset form
        form.reset();
        // tampilkan modal sukses
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    })
    
    .catch((error) => {
        console.error('Error!', error);
        // reset button
        submitBtn.disabled = false;
        submitSpinner.classList.add('d-none');
        submitText.textContent = 'Kirim';
        alert('❌ Terjadi kesalahan, silakan coba lagi.');
    });
});
