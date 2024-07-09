const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numStars = 1000;
const stars = [];
let mouseX = 0;
let mouseY = 0;
let speed = 5;

class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    project() {
        const scale = 1000 / this.z;
        return {
            x: this.x * scale + canvas.width / 2,
            y: this.y * scale + canvas.height / 2,
            size: (1 - this.z / 1000) * 3
        };
    }

    update() {
        this.z -= speed;
        if (this.z <= 0) {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
            this.z = 1000;
        }
        
        this.x += (mouseX - canvas.width / 2) / 1000;
        this.y += (mouseY - canvas.height / 2) / 1000;
    }
}

for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width - canvas.width / 2;
    const y = Math.random() * canvas.height - canvas.height / 2;
    const z = Math.random() * 1000;
    stars.push(new Star(x, y, z));
}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    speed = speed === 5 ? 50 : 5;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
        star.update();
        const {x, y, size} = star.project();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();
