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
