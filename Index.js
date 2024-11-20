// Switch Counter
let switchCounter = 0;
const switchElement = document.getElementById('toggle');
const switchDisplay = document.getElementById('switchCounter');

// Ensure the switch is responding to clicks
if (switchElement) {
  // Use 'click' event to ensure it detects user interaction
  switchElement.addEventListener('click', () => {
    // Increment the counter every time the switch is flipped
    switchCounter++;
    switchDisplay.textContent = switchCounter;
    console.log('Switch toggled'); // Debugging: Check if the switch event is triggered
  });
} else {
  console.error('Switch element not found');
}
// Button Click Counter
let clickCounter = 0;
const button = document.getElementById('clickButton');
const clickDisplay = document.getElementById('clickCounter');

// Ensure the button is responding to clicks
if (button) {
  button.addEventListener('click', () => {
    clickCounter++;
    clickDisplay.textContent = clickCounter;
    console.log('Button clicked'); // Debugging: Check if the button event is triggered
  });
} else {
  console.error('Button element not found');
}

// Range Slider Functionality
const rangeSlider = document.getElementById('rangeSlider');
const sliderValueDisplay = document.getElementById('slider-value');

// Ensure the slider is responding to changes
if (rangeSlider) {
  rangeSlider.addEventListener('input', () => {
    const value = rangeSlider.value;
    sliderValueDisplay.textContent = `${value}%`;  // Update the percentage display
    console.log(`Slider value: ${value}%`); // Debugging: Check if the slider value is updated
  });

  // Initialize the slider display with the current value
  sliderValueDisplay.textContent = `${rangeSlider.value}%`;
} else {
  console.error('Range slider element not found');
}

// Rotating Wheel with Pegs
const wheel = document.getElementById('wheel');
const numPegs = 12;
const radius = 140;  // Half the size of the wheel container
const angleStep = 360 / numPegs;

// Create pegs dynamically
for (let i = 0; i < numPegs; i++) {
  const peg = document.createElement('div');
  peg.classList.add('peg');
  const angle = angleStep * i;
  
  // Calculate peg position relative to the center of the wheel
  const x = radius + radius * Math.cos((angle * Math.PI) / 180);
  const y = radius + radius * Math.sin((angle * Math.PI) / 180);
  
  // Position the pegs around the center of the wheel
  peg.style.left = `${x - 5}px`;  // Adjust for the width of the peg (half of 10px)
  peg.style.top = `${y - 15}px`;  // Adjust for the height of the peg (half of 30px)

  // Set transform-origin to the center of the wheel
  peg.style.transform = `rotate(${angle}deg)`;

  wheel.appendChild(peg);
}

let isDragging = false;
let startAngle = 0;
let currentAngle = 0;

wheel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startAngle = getAngle(e);
  wheel.style.cursor = 'grabbing';
});

wheel.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const newAngle = getAngle(e);
    const deltaAngle = newAngle - startAngle; // Change the calculation here
    wheel.style.transform = `rotate(${deltaAngle}deg)`;  // Apply the corrected angle
  }
});

wheel.addEventListener('mouseup', () => {
  isDragging = false;
  wheel.style.cursor = 'grab';
});

wheel.addEventListener('mouseleave', () => {
  isDragging = false;
  wheel.style.cursor = 'grab';
});

function getAngle(e) {
  const wheelRect = wheel.getBoundingClientRect();
  const wheelCenterX = wheelRect.left + wheelRect.width / 2;
  const wheelCenterY = wheelRect.top + wheelRect.height / 2;
  const deltaX = e.clientX - wheelCenterX;
  const deltaY = e.clientY - wheelCenterY;
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

// Platformer Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1200;
canvas.height = 400;

let player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  gravity: 0.8,
  jumpPower: -12,
  grounded: false
};

let keys = {
  right: false,
  left: false,
  up: false
};

let platforms = [
  { x: 0, y: 350, width: 1200, height: 50 }, // Ground platform
  { x: 50, y: 250, width: 100, height: 20 },
  { x: 250, y: 150, width: 100, height: 20 },
  { x: 450, y: 250, width: 100, height: 20 },
  { x: 650, y: 150, width: 100, height: 20 },
  { x: 850, y: 100, width: 100, height: 20 },
  { x: 1050, y: 50, width: 100, height: 20 }
];

function drawPlayer() {
  ctx.fillStyle = '#ff1900'; // Player color
  ctx.fillRect(player.x, player.y, player.width, player.height); // Draw player as a red square
}

function drawPlatforms() {
  ctx.fillStyle = '#2ecc71'; // Platform color
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height); // Draw each platform
  });
}

function movePlayer() {
  // Move player left or right
  if (keys.right && player.x + player.width < canvas.width) {
    player.dx = player.speed;
  } else if (keys.left && player.x > 0) {
    player.dx = -player.speed;
  } else {
    player.dx = 0;
  }

  // Apply gravity (falling down)
  player.dy += player.gravity;

  // Jumping mechanism
  if (keys.up && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  // Update player position
  player.x += player.dx;
  player.y += player.dy;
}

function detectCollision() {
  player.grounded = false;

  platforms.forEach((platform) => {
    // Check if player is falling and collides with the platform
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height + player.dy >= platform.y &&
      player.y <= platform.y 
    ) {
      // Stop downward velocity when colliding with the platform
      player.dy = 0;

      // Make sure player is placed exactly on top of the platform, avoiding overlap
      player.y = platform.y - player.height; 

      // Mark player as grounded
      player.grounded = true;
    }
  });

  // Prevent the player from falling through the floor (reset if below the screen)
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height; // Reset position to the floor
    player.dy = 0;
    player.grounded = true; // Ensure the player is grounded at the floor level
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawPlatforms();
  drawPlayer();
  movePlayer();
  detectCollision();
  requestAnimationFrame(update); // Continue updating the game
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowUp' || e.key === ' ') keys.up = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowUp' || e.key === ' ') keys.up = false;
});

update(); // Start the game loop
