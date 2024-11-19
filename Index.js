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
