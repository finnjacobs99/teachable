/*
    Learning Javascript
*/
var canvas = document.querySelector('canvas');
var gc = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
    down: false
}

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("mousedown", event => {
    mouse.down = true;
    burst();
})

addEventListener("mouseup", event => {
    mouse.down = false;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// Objects
function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.lifeSpan = 1000;
}

Particle.prototype.draw = function() {
    gc.beginPath();
    gc.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    gc.fillStyle = this.color;
    gc.fill();
    gc.closePath();
}

Particle.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.lifeSpan--;
    this.draw();
}

var burstDensity = 60
var density = 30;
var speed = 2;
let particles;

function burst() {
    
    for (let i = 0; i < burstDensity; i++) {
        
        const radian = Math.PI * 2 / burstDensity;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        particles.push(new Particle(x, y, 5, "hsl(0, 100%, 100%)", {
            x: Math.cos(radian * i) * speed * 2,
            y: Math.sin(radian * i) * speed * 2
        }));
        particles.push(new Particle(x, y, 5, "hsl(0, 100%, 100%)", {
            x: Math.cos(radian * i) * speed * 2,
            y: Math.sin(radian * i) * speed / 3
        }));
        particles.push(new Particle(x, y, 5, "hsl(0, 100%, 100%)", {
            x: Math.cos(radian * i) * speed / 2,
            y: Math.sin(radian * i) * speed * 3
        }));
    }
    
}

 // Implementation
function init() {
    particles = [];
    burst();
    
}

let hue = 0;
let hueRadians = 0;
var xpos = 0;
var ypos = 0;
var moveRadians = 0;
var wavesize = 8;
var wavegrowth = 1;
//var waveRadians = 0;

function generateRing() { 
    
    for (let i = 0; i < density; i++) {
        
        hue = Math.abs(Math.cos(hueRadians)) * 360;
        xpos = Math.cos(moveRadians) * (canvas.width / 4) + (canvas.width / 2);
        ypos = Math.sin(moveRadians) * (canvas.height / wavesize) + (canvas.height / 2);
        console.log(ypos);
        const radian = Math.PI * 2 / density;
        const x = mouse.x
        const y = mouse.y
        
        particles.push(new Particle(canvas.width / 2, ypos, 5, "hsl("+hue+", 50%, 50%)", {
            x: Math.cos(radian * i) * speed,
            y: Math.sin(radian * i) * speed / 3
        }));

    }

    if (wavesize > 20 || wavesize < 5) {
        wavegrowth *= -1;
    }

    wavesize += 0.3 * wavegrowth;

    //waveRadians += 0.2;
    moveRadians += 0.25;
    hueRadians += 0.1;
    setTimeout(generateRing, 100)
}

// Animation Loop
function animate() {
    
    requestAnimationFrame(animate);
    gc.fillStyle = 'rgba(0, 0, 0, 0.05)';
    gc.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
        if (particle.lifeSpan < 0) {
            particles.splice(i, 1);
        }
        else {
            particle.update();
        }
    });
}

init();
animate();
generateRing();