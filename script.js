// Get DOM elements
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const timeInput = document.getElementById('time');
const typeSelect = document.getElementById('type');
const resultDiv = document.getElementById('result');
const interestAmountSpan = document.getElementById('interestAmount');
const totalAmountSpan = document.getElementById('totalAmount');
const historyDiv = document.getElementById('history');

// LocalStorage key
const HISTORY_KEY = 'calculationHistory';

// Initialize calculation history from localStorage
let calculationHistory = [];

// Function to load history from localStorage
function loadHistoryFromStorage() {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            calculationHistory = JSON.parse(stored);
            console.log('Loaded', calculationHistory.length, 'calculations from storage');
        } else {
            calculationHistory = [];
        }
    } catch (error) {
        console.error('Error loading history from localStorage:', error);
        calculationHistory = [];
    }
}

// Function to save history to localStorage
function saveHistoryToStorage() {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(calculationHistory));
        console.log('Saved', calculationHistory.length, 'calculations to storage');
    } catch (error) {
        console.error('Error saving history to localStorage:', error);
        alert('Could not save history. Storage might be full.');
    }
}

// Function to save calculation to history
function saveToHistory(calculation) {
    const timestamp = new Date().toLocaleString();
    const historyEntry = {
        ...calculation,
        timestamp: timestamp,
        id: Date.now()
    };
    calculationHistory.unshift(historyEntry);
    // Keep only last 20 calculations
    if (calculationHistory.length > 20) {
        calculationHistory.pop();
    }
    saveHistoryToStorage();
    displayHistory();
}

// Function to display calculation history
function displayHistory() {
    if (!historyDiv) {
        console.warn('History div not found');
        return;
    }
    
    if (calculationHistory.length === 0) {
        historyDiv.innerHTML = '<p class="no-history">No calculation history yet</p>';
        return;
    }
    
    let historyHTML = '<div class="history-list"><h3>Calculation History</h3>';
    calculationHistory.forEach((entry) => {
        historyHTML += `
            <div class="history-item" onclick="loadFromHistory(${entry.id})">
                <div class="history-details">
                    <p><strong>P: $${entry.principal}</strong> | R: ${entry.rate}% | T: ${entry.time} yrs</p>
                    <p class="history-type">${entry.type === 'simple' ? 'Simple' : 'Compound'} Interest</p>
                    <p class="history-result">Interest: $${parseFloat(entry.interest).toFixed(2)} | Total: $${parseFloat(entry.total).toFixed(2)}</p>
                    <p class="history-time">${entry.timestamp}</p>
                </div>
                <button class="delete-btn" onclick="deleteHistory(${entry.id}, event)">×</button>
            </div>
        `;
    });
    historyHTML += '<button class="clear-history-btn" onclick="clearAllHistory()">Clear All History</button></div>';
    historyDiv.innerHTML = historyHTML;
}

// Function to load calculation from history
function loadFromHistory(id) {
    const entry = calculationHistory.find(e => e.id === id);
    if (entry) {
        principalInput.value = entry.principal;
        rateInput.value = entry.rate;
        timeInput.value = entry.time;
        typeSelect.value = entry.type;
        interestAmountSpan.textContent = parseFloat(entry.interest).toFixed(2);
        totalAmountSpan.textContent = parseFloat(entry.total).toFixed(2);
        resultDiv.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

// Function to delete history entry
function deleteHistory(id, event) {
    event.stopPropagation();
    calculationHistory = calculationHistory.filter(e => e.id !== id);
    saveHistoryToStorage();
    displayHistory();
}

// Function to clear all history
function clearAllHistory() {
    if (confirm('Are you sure you want to clear all calculation history? This action cannot be undone.')) {
        calculationHistory = [];
        saveHistoryToStorage();
        displayHistory();
    }
}

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
    
    // Save to history
    saveToHistory({
        principal: principal,
        rate: rate,
        time: time,
        type: type,
        interest: interest,
        total: totalAmount
    });
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
principalInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});

rateInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});

timeInput.addEventListener('input', function() {
    if (this.value < 0) this.value = '';
});

// Initialize history - Run on multiple events for maximum compatibility
function initializeHistory() {
    loadHistoryFromStorage();
    displayHistory();
    console.log('History initialized - Total entries:', calculationHistory.length);
}

if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', initializeHistory);
} else {
    // DOM is already loaded
    initializeHistory();
}

// Also initialize on window load event
window.addEventListener('load', initializeHistory);

// Save history before unload (when closing tab/browser)
window.addEventListener('beforeunload', function() {
    saveHistoryToStorage();
    console.log('History saved before unload');
});

// Additional safety: Save every 30 seconds
setInterval(function() {
    if (calculationHistory.length > 0) {
        saveHistoryToStorage();
    }
}, 30000);

console.log('Script loaded successfully');
console.log('LocalStorage available:', typeof(Storage) !== 'undefined');
console.log('LocalStorage size:', JSON.stringify(localStorage).length, 'bytes');
