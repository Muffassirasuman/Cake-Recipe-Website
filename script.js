// Toggle functionality for Ingredients and Steps
const ingredientsToggle = document.getElementById('ingredientsToggle');
const ingredientsContent = document.getElementById('ingredientsContent');
const stepsToggle = document.getElementById('stepsToggle');
const stepsContent = document.getElementById('stepsContent');

ingredientsToggle.addEventListener('click', function() {
    ingredientsContent.classList.toggle('collapsed');
    ingredientsToggle.classList.toggle('active');
    
    const span = ingredientsToggle.querySelector('span');
    if (ingredientsContent.classList.contains('collapsed')) {
        span.textContent = 'Show Ingredients';
    } else {
        span.textContent = 'Hide Ingredients';
    }
});

stepsToggle.addEventListener('click', function() {
    stepsContent.classList.toggle('collapsed');
    stepsToggle.classList.toggle('active');
    
    const span = stepsToggle.querySelector('span');
    if (stepsContent.classList.contains('collapsed')) {
        span.textContent = 'Show Steps';
    } else {
        span.textContent = 'Hide Steps';
    }
});

// Cooking functionality
const startCookingBtn = document.getElementById('startCookingBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progressBar');
const stepItems = document.querySelectorAll('.step-item');
const timerElement = document.getElementById('timer');
const timerDisplay = document.getElementById('timerDisplay');

let currentStep = 0;
let timerInterval = null;
let timeRemaining = 1800; // 30 minutes in seconds

function updateProgress() {
    const progress = ((currentStep + 1) / stepItems.length) * 100;
    progressBar.style.width = progress + '%';
}

function highlightStep(stepIndex) {
    stepItems.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            step.classList.remove('active');
        }
    });
}

function startTimer() {
    timerElement.classList.remove('hidden');
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            alert("Time's up! Your chocolate cake should be ready!");
            return;
        }
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
    }, 1000);
}

function resetCooking() {
    currentStep = 0;
    stepItems.forEach(step => step.classList.remove('active'));
    progressBar.style.width = '0%';
    
    startCookingBtn.classList.remove('hidden');
    nextStepBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    timerElement.classList.add('hidden');
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timeRemaining = 1800;
    timerDisplay.textContent = "30:00";
}

startCookingBtn.addEventListener('click', function() {
    // Ensure steps are visible
    if (stepsContent.classList.contains('collapsed')) {
        stepsContent.classList.remove('collapsed');
        stepsToggle.classList.add('active');
        stepsToggle.querySelector('span').textContent = 'Hide Steps';
    }
    
    // Highlight first step
    highlightStep(currentStep);
    updateProgress();
    
    // Show/hide buttons
    startCookingBtn.classList.add('hidden');
    nextStepBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    
    // Start timer (bonus feature)
    startTimer();
});

nextStepBtn.addEventListener('click', function() {
    if (currentStep < stepItems.length - 1) {
        currentStep++;
        highlightStep(currentStep);
        updateProgress();
        
        if (currentStep === stepItems.length - 1) {
            nextStepBtn.textContent = 'Finish';
        }
    } else {
        alert('Congratulations! You\'ve completed all the steps. Enjoy your chocolate cake!');
        resetCooking();
    }
});

resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset? This will clear your progress.')) {
        resetCooking();
    }
});

// Print functionality (bonus)
function setupPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-secondary';
    printBtn.textContent = 'Print Recipe';
    printBtn.style.marginLeft = 'auto';
    
    printBtn.addEventListener('click', function() {
        // Expand all sections before printing
        ingredientsContent.classList.remove('collapsed');
        stepsContent.classList.remove('collapsed');
        
        window.print();
    });
    
    document.querySelector('.cooking-controls').appendChild(printBtn);
}

// Initialize print button
setupPrintButton();

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});