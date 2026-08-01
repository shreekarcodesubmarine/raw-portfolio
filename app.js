// 1. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Slight delay for the outline for a smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Expand cursor when hovering over links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// 2. Typewriter Effect for Hero
const textArray = ["Capturing reality, one frame at a time.", "Professional color grading.", "Cinematic storytelling."];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById('typewriter');

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 30);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// 3. Generate Video Cards (from data.js)
// 3. Generate Dynamic Content Sections
// A function to generate Video Cards (Reels & Shorts)
function populateVideos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    dataArray.forEach(project => {
        grid.innerHTML += `
            <a href="${project.videoLink}" target="_blank" class="reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-80 object-cover opacity-80">
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-8 text-left">
                    <div class="overlay-text">
                        <h3 class="font-syne text-2xl font-bold text-white mb-2 uppercase tracking-wide">${project.title}</h3>
                        <p class="text-red-500 font-bold mb-6 tracking-widest text-xs uppercase">${project.description}</p>
                    </div>
                </div>
            </a>
        `;
    });
}

// A function to generate Photo Cards (No clickable video links)
function populatePhotos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    dataArray.forEach(photo => {
        grid.innerHTML += `
            <div class="reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${photo.image}" alt="${photo.title}" class="w-full h-72 object-cover opacity-80">
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-6 text-left">
                    <div class="overlay-text">
                        <h3 class="font-syne text-xl font-bold text-white mb-1 uppercase tracking-wide">${photo.title}</h3>
                        <p class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">${photo.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

// Execute the functions using our data.js arrays
// 3. Generate Dynamic Content Sections

// Generate Video Cards (Now uses GLightbox and a Play Icon)
function populateVideos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    dataArray.forEach(project => {
        grid.innerHTML += `
            <a href="${project.videoLink}" class="glightbox reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-80 object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-30">
                
                <!-- Play Icon on Hover -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-20">
                    <svg class="w-16 h-16 text-red-600 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-8 text-left z-10 group-hover:opacity-100">
                    <div class="overlay-text">
                        <h3 class="font-syne text-2xl font-bold text-white mb-2 uppercase tracking-wide">${project.title}</h3>
                        <p class="text-red-500 font-bold mb-6 tracking-widest text-xs uppercase">${project.description}</p>
                    </div>
                </div>
            </a>
        `;
    });
}

// Generate Photo Cards (Now clickable to enlarge with Zoom Icon)
function populatePhotos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    dataArray.forEach(photo => {
        grid.innerHTML += `
            <a href="${photo.image}" class="glightbox reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${photo.image}" alt="${photo.title}" class="w-full h-72 object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-30">
                
                <!-- Zoom Icon on Hover -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-20">
                    <svg class="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-6 text-left z-10 group-hover:opacity-100">
                    <div class="overlay-text">
                        <h3 class="font-syne text-xl font-bold text-white mb-1 uppercase tracking-wide">${photo.title}</h3>
                        <p class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">${photo.description}</p>
                    </div>
                </div>
            </a>
        `;
    });
}

// Execute the functions using our data.js arrays
// 3. Generate Dynamic Content Sections

// Generate Video Cards (Now uses GLightbox and a Play Icon)
function populateVideos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    dataArray.forEach(project => {
        grid.innerHTML += `
            <a href="${project.videoLink}" class="glightbox reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-80 object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-30">
                
                <!-- Play Icon on Hover -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-20">
                    <svg class="w-16 h-16 text-red-600 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-8 text-left z-10 group-hover:opacity-100">
                    <div class="overlay-text">
                        <h3 class="font-syne text-2xl font-bold text-white mb-2 uppercase tracking-wide">${project.title}</h3>
                        <p class="text-red-500 font-bold mb-6 tracking-widest text-xs uppercase">${project.description}</p>
                    </div>
                </div>
            </a>
        `;
    });
}

// Generate Photo Cards (Now clickable to enlarge with Zoom Icon)
function populatePhotos(dataArray, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    dataArray.forEach(photo => {
        grid.innerHTML += `
            <a href="${photo.image}" class="glightbox reveal relative rounded-none overflow-hidden video-card cursor-none group bg-black block shadow-2xl border border-white/5">
                <img src="${photo.image}" alt="${photo.title}" class="w-full h-72 object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-30">
                
                <!-- Zoom Icon on Hover -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-20">
                    <svg class="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 overlay transition duration-500 flex flex-col justify-end p-6 text-left z-10 group-hover:opacity-100">
                    <div class="overlay-text">
                        <h3 class="font-syne text-xl font-bold text-white mb-1 uppercase tracking-wide">${photo.title}</h3>
                        <p class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">${photo.description}</p>
                    </div>
                </div>
            </a>
        `;
    });
}

// Execute the functions using our data.js arrays
populateVideos(reelsData, 'reels-grid');
populateVideos(shortsData, 'shorts-grid');
populatePhotos(photosData, 'photos-grid');

// 4. Initialize the Media Player
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    zoomable: true
});
// 4. Scroll Reveal Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
