const counter = document.querySelector("#counter");
const startButton = document.querySelector("#start-counter");

const duration = 2000;
const targetValue = 1000;

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function animateCounter() {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easeOutCubic(progress);

    const currentValue = Math.round(easedProgress * targetValue);

    counter.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

startButton.addEventListener("click", animateCounter);

const canvas = document.querySelector("#particle-canvas");
const context = canvas.getContext("2d");

const particleCount = 200;

let particles = [];
let animationFrameId = null;
let isRunning = false;

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  };
}

function createParticles() {
  particles = Array.from({ length: particleCount }, createParticle);
}

function updateParticles() {
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1;
    }

    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1;
    }
  });
}

function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    context.beginPath();

    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

    context.fillStyle = particle.color;
    context.fill();
  });
}

function animateParticles() {
  if (!isRunning) {
    return;
  }

  updateParticles();
  drawParticles();

  animationFrameId = requestAnimationFrame(animateParticles);
}

function startParticles() {
  if (isRunning) {
    return;
  }

  isRunning = true;

  animateParticles();
}

function pauseParticles() {
  isRunning = false;

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

createParticles();
startParticles();

const pauseButton = document.querySelector("#pause-particles");

const resumeButton = document.querySelector("#resume-particles");

pauseButton.addEventListener("click", pauseParticles);

resumeButton.addEventListener("click", startParticles);
