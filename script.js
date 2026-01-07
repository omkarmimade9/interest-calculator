// Get DOM elements
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const timeInput = document.getElementById('time');
const typeSelect = document.getElementById('type');
const resultDiv = document.getElementById('result');
const interestAmountSpan = document.getElementById('interestAmount');
const totalAmountSpan = document.getElementById('totalAmount');

// Function to calculate interest
function calculateInterest() {
    // Get input values
    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);
    const type = typeSelect.value;
    
    // Validate inputs
    if (!principal || !rate || !time) {
        alert('Please fill in all fields!');
        return;
    }
    
    if (principal <= 0 || rate < 0 || time <= 0) {
        alert('Please enter valid positive numbers!');
        return;
    }
    
    let interest;
    let totalAmount;
    
    if (type === 'simple') {
        // Simple Interest Formula: SI = (P * R * T) / 100
        interest = (principal * rate * time) / 100;
        totalAmount = principal + interest;
    } else {
        // Compound Interest Formula: A = P(1 + R/100)^T
        totalAmount = principal * Math.pow(1 + rate / 100, time);
        interest = totalAmount - principal;
    }
    
    // Display results
    interestAmountSpan.textContent = interest.toFixed(2);
    totalAmountSpan.textContent = totalAmount.toFixed(2);
    
    // Show result section
    resultDiv.classList.remove('hidden');
}

// Function to reset form
function resetForm() {
    principalInput.value = '';
    rateInput.value = '';
    timeInput.value = '';
    typeSelect.value = 'simple';
    resultDiv.classList.add('hidden');
    interestAmountSpan.textContent = '0.00';
    totalAmountSpan.textContent = '0.00';
}

// Allow Enter key to calculate
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateInterest();
    }
});

// Prevent negative values in inputs
princpalInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});

rateInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});

timeInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});
