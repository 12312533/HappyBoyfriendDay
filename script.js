/* ========================================================
   SCRIPT UTAMA — LOGIKA TEKA-TEKI PIN, AUDIO & ANIMASI
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. LOGIKA PASSCODE / TEKA-TEKI PIN
       ========================================== */
    // SET TANGGAL JADIAN / PERNIKAHAN ANDA DI SINI (CONTOH: '1202')
    const CORRECT_PIN = "1706"; 
    
    let enteredPin = "";
    const pinDots = document.querySelectorAll('#pin-dots .dot');
    const pinCard = document.querySelector('.pin-card');
    const lockscreen = document.getElementById('pin-lockscreen');
    const mainContent = document.getElementById('main-content');
    
    // List Pesan Lucu Jika PIN Salah
    const errorQuotes = [
        "U really don't know, bae? 🥺",
        "You wrong babe! 😜",
        "Try again, sayang! 💔",
        "Masa lupa tanggal kita sih? 🥺"
    ];

    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    const closePopupBtn = document.getElementById('close-popup-btn');

    // Numpad Button Handler
    document.querySelectorAll('.num-btn[data-val]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (enteredPin.length < 4) {
                enteredPin += btn.getAttribute('data-val');
                updatePinDots();
            }
        });
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
        enteredPin = "";
        updatePinDots();
    });

    document.getElementById('btn-submit').addEventListener('click', verifyPin);

    function updatePinDots() {
        pinDots.forEach((dot, idx) => {
            if (idx < enteredPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function verifyPin() {
        if (enteredPin === CORRECT_PIN) {
            // PIN BENAR
            lockscreen.style.opacity = '0';
            lockscreen.style.transform = 'scale(1.1)';
            setTimeout(() => {
                lockscreen.style.display = 'none';
                mainContent.classList.remove('locked');
                mainContent.classList.add('unlocked');
                window.scrollTo(0, 0);
            }, 1000);
        } else {
            // PIN SALAH
            pinCard.classList.add('shake-anim');
            setTimeout(() => pinCard.classList.remove('shake-anim'), 400);

            // Pop-up Eror Random Quote
            const randomQuote = errorQuotes[Math.floor(Math.random() * errorQuotes.length)];
            errorMessage.innerText = randomQuote;
            errorPopup.classList.add('active');

            enteredPin = "";
            updatePinDots();
        }
    }

    closePopupBtn.addEventListener('click', () => {
        errorPopup.classList.remove('active');
    });


    /* ==========================================
       2. EFEK PARALLAX & GERAKAN DYNAMIC MOUSE
       ========================================== */
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;

        document.querySelectorAll('.float-element').forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });


    /* ==========================================
       3. INTERAKSI PIRINGAN HITAM & MUSIC PLAYER
       ========================================== */
    const audioPlayer = document.getElementById('global-audio');
    const musicCards = document.querySelectorAll('.music-card');
    const vinylDisc = document.getElementById('vinyl-disc');
    const tonearm = document.getElementById('tonearm');
    let currentlyPlaying = null;

    musicCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            const icon = card.querySelector('.play-btn-icon');

            musicCards.forEach(c => c.querySelector('.play-btn-icon').innerHTML = '▶');

            if (currentlyPlaying === src && !audioPlayer.paused) {
                audioPlayer.pause();
                icon.innerHTML = '▶';
                vinylDisc.classList.remove('spinning');
                tonearm.classList.remove('active');
            } else {
                audioPlayer.src = src;
                audioPlayer.play().catch(e => console.log("File musik belum dimasukkan."));
                icon.innerHTML = '⏸';
                vinylDisc.classList.add('spinning');
                tonearm.classList.add('active');
                currentlyPlaying = src;
            }
        });
    });

    audioPlayer.addEventListener('ended', () => {
        vinylDisc.classList.remove('spinning');
        tonearm.classList.remove('active');
        musicCards.forEach(c => c.querySelector('.play-btn-icon').innerHTML = '▶');
    });


    /* ==========================================
       4. ANIMASI SCROLL & MESIN TIK SURAT CINTA
       ========================================== */
    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if(entry.target.classList.contains('letter-paper') && !isTypingStarted) {
                    startTypewriter();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-anim').forEach(el => animObserver.observe(el));

    const suratTeks = 
    `Happy Boyfriend Day, sayang. 🤍

Terima kasih sudah jadi rumah di antara hari-hari yang kadang nggak baik-baik saja. Terima kasih sudah hadir, bukan cuma di saat semuanya mudah, tapi juga ketika aku sedang banyak cerita, banyak maunya, atau bahkan nggak tahu harus cerita apa.

Aku mungkin nggak selalu pandai menunjukkan rasa sayangku, tapi aku harap kamu tahu kalau kehadiranmu berarti lebih dari yang bisa aku jelaskan lewat kata-kata.

Semoga, di antara banyak hal yang berubah dalam hidup kita, kita tetap jadi dua orang yang saling memilih untuk tinggal. Nggak harus selalu menjadi sempurna, nggak harus selalu romantis, cukup tetap saling menggenggam, saling mengerti, dan saling pulang.

Happy Boyfriend Day to my favorite person.
I’m really, really glad it’s you. ♡.`;

    const typeTarget = document.getElementById('typewriter-text');
    const signature = document.getElementById('signature');
    let i = 0;
    let isTypingStarted = false;

    function startTypewriter() {
        isTypingStarted = true;
        typeTarget.innerHTML = "";
        function typeWriter() {
            if (i < suratTeks.length) {
                typeTarget.innerHTML += suratTeks.charAt(i);
                i++;
                setTimeout(typeWriter, 35);
            } else {
                signature.classList.remove('hidden-sign');
            }
        }
        typeWriter();
    }
/* ==========================================
       5. LOGIKA CLOSE-UP FOTO & PESAN TERSEMBUNYI
       ========================================== */
    const photoModal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo-img');
    const modalMessage = document.getElementById('modal-photo-message');
    const closePhotoModalBtn = document.getElementById('close-photo-modal');

    // Klik pada salah satu foto di roll film
    document.querySelectorAll('.film-photo').forEach(photo => {
        photo.addEventListener('click', () => {
            const imgTag = photo.querySelector('img');
            const message = photo.getAttribute('data-message') || "Pesan rahasia untukmu ♡";
            
            modalImg.src = imgTag.src;
            modalMessage.innerText = message;
            
            photoModal.classList.add('active');
        });
    });

    // Tutup Modal ketika tombol (X) diklik
    closePhotoModalBtn.addEventListener('click', () => {
        photoModal.classList.remove('active');
    });

    // Tutup Modal jika diklik di area luar gambar
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.remove('active');
        }
    });
});