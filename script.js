// ========================================
// Interactive Web Page - JavaScript Events and Validation
// ========================================

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Interactive Web Page Loaded Successfully!');
    
    // Initialize all interactive features
    initializeThemeToggle();
    initializeEventDemo();
    initializeCounter();
    initializeFAQ();
    initializeTabs();
    initializeFormValidation();
});

// ========================================
// PART 1: THEME TOGGLE (Dark/Light Mode)
// ========================================

/**
 * Initialize the dark/light theme toggle functionality
 * Allows users to switch between light and dark modes
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Add click event listener to theme toggle button
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add bounce animation to button
        themeToggle.classList.add('bounce');
        setTimeout(() => themeToggle.classList.remove('bounce'), 500);
    });
    
    /**
     * Set the theme and update UI accordingly
     * @param {string} theme - 'light' or 'dark'
     */
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button text and icon
        if (theme === 'dark') {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    }
}

// ========================================
// PART 2: EVENT HANDLING DEMONSTRATION
// ========================================

/**
 * Initialize event handling demonstrations
 * Shows different types of events: click, mouseover, keyup
 */
function initializeEventDemo() {
    const clickBtn = document.getElementById('click-btn');
    const hoverBtn = document.getElementById('hover-btn');
    const keyInput = document.getElementById('key-input');
    const output = document.getElementById('event-output');
    
    let clickCount = 0;
    
    // Click Event Handler
    clickBtn.addEventListener('click', function(event) {
        clickCount++;
        addEventMessage(`🖱️ Button clicked ${clickCount} time(s)! Event type: ${event.type}`);
        
        // Add visual feedback
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Mouse Events (hover in and out)
    hoverBtn.addEventListener('mouseenter', function(event) {
        addEventMessage(`🐭 Mouse entered the hover button! Coordinates: (${event.clientX}, ${event.clientY})`);
        hoverBtn.style.backgroundColor = '#e74c3c';
    });
    
    hoverBtn.addEventListener('mouseleave', function() {
        addEventMessage('👋 Mouse left the hover button!');
        hoverBtn.style.backgroundColor = '#3498db';
    });
    
    // Keyboard Event Handler
    keyInput.addEventListener('keyup', function(event) {
        const value = event.target.value;
        const key = event.key;
        addEventMessage(`⌨️ Key pressed: "${key}" | Current text: "${value}" | Text length: ${value.length}`);
        
        // Special key detection
        if (key === 'Enter') {
            addEventMessage('🎯 Enter key detected! Form submission simulation.');
        }
    });
    
    // Focus and Blur events for input
    keyInput.addEventListener('focus', function() {
        addEventMessage('🎯 Input field focused - ready for typing!');
    });
    
    keyInput.addEventListener('blur', function() {
        addEventMessage('😴 Input field lost focus.');
    });
    
    /**
     * Add a message to the event output area
     * @param {string} message - The message to display
     */
    function addEventMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
        messageElement.style.margin = '0.5rem 0';
        messageElement.style.padding = '0.5rem';
        messageElement.style.backgroundColor = 'var(--primary-color)';
        messageElement.style.color = 'white';
        messageElement.style.borderRadius = '5px';
        messageElement.style.animation = 'fadeIn 0.3s ease';
        
        output.appendChild(messageElement);
        
        // Keep only the last 10 messages
        while (output.children.length > 11) { // +1 for the initial message
            output.removeChild(output.children[1]);
        }
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
}

// ========================================
// PART 3: INTERACTIVE COUNTER GAME
// ========================================

/**
 * Initialize the counter game functionality
 * Allows users to increment, decrement, and reset a counter
 */
function initializeCounter() {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    let count = 0;
    
    // Increment counter
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        animateCounter('increment');
    });
    
    // Decrement counter
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        animateCounter('decrement');
    });
    
    // Reset counter
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        animateCounter('reset');
    });
    
    /**
     * Update the counter display and apply color coding
     */
    function updateCounter() {
        counterValue.textContent = count;
        
        // Color coding based on value
        if (count > 0) {
            counterValue.style.color = '#27ae60'; // Green for positive
        } else if (count < 0) {
            counterValue.style.color = '#e74c3c'; // Red for negative
        } else {
            counterValue.style.color = '#3498db'; // Blue for zero
        }
    }
    
    /**
     * Add animation effects to counter based on action
     * @param {string} action - 'increment', 'decrement', or 'reset'
     */
    function animateCounter(action) {
        const display = counterValue.parentElement;
        
        switch(action) {
            case 'increment':
                display.classList.add('bounce');
                break;
            case 'decrement':
                display.classList.add('shake');
                break;
            case 'reset':
                display.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    display.style.transform = 'scale(1)';
                }, 200);
                break;
        }
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            display.classList.remove('bounce', 'shake');
        }, 500);
    }
}

// ========================================
// PART 4: COLLAPSIBLE FAQ SECTION
// ========================================

/**
 * Initialize the FAQ accordion functionality
 * Allows users to expand/collapse FAQ items
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            // Toggle active state
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items (accordion behavior)
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                answer.classList.add('active');
                icon.textContent = '−';
            } else {
                faqItem.classList.remove('active');
                answer.classList.remove('active');
                icon.textContent = '+';
            }
        });
    });
}

// ========================================
// PART 5: TABBED INTERFACE
// ========================================

/**
 * Initialize the tabbed interface functionality
 * Allows users to switch between different content panels
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ========================================
// PART 6: COMPREHENSIVE FORM VALIDATION
// ========================================

/**
 * Initialize comprehensive form validation
 * Validates all form fields with custom rules and real-time feedback
 */
function initializeFormValidation() {
    const form = document.getElementById('user-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    
    // Form field elements
    const fields = {
        fullname: document.getElementById('fullname'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirm-password'),
        age: document.getElementById('age'),
        phone: document.getElementById('phone')
    };
    
    // Validation state
    const validationState = {
        fullname: false,
        email: false,
        password: false,
        confirmPassword: false,
        age: false,
        phone: true // Phone is optional, so default to true
    };
    
    // Add real-time validation to each field
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        
        // Validate on input (real-time)
        field.addEventListener('input', function() {
            validateField(fieldName, field.value);
            updateSubmitButton();
        });
        
        // Validate on blur (when user leaves field)
        field.addEventListener('blur', function() {
            validateField(fieldName, field.value);
            updateSubmitButton();
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        let allValid = true;
        Object.keys(fields).forEach(fieldName => {
            const isValid = validateField(fieldName, fields[fieldName].value);
            if (!isValid) allValid = false;
        });
        
        if (allValid) {
            showSuccessMessage();
        } else {
            // Shake the form to indicate errors
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });
    
    /**
     * Validate individual form field
     * @param {string} fieldName - Name of the field to validate
     * @param {string} value - Value to validate
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(fieldName, value) {
        const field = fields[fieldName];
        // Handle the confirmPassword field name mismatch
        const errorElementId = fieldName === 'confirmPassword' ? 'confirm-password-error' : `${fieldName}-error`;
        const errorElement = document.getElementById(errorElementId);
        let isValid = false;
        let errorMessage = '';
        
        switch(fieldName) {
            case 'fullname':
                if (value.trim().length < 2) {
                    errorMessage = 'Full name must be at least 2 characters long.';
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    errorMessage = 'Full name can only contain letters and spaces.';
                } else {
                    isValid = true;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    errorMessage = 'Email address is required.';
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address.';
                } else {
                    isValid = true;
                }
                break;
                
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters long.';
                } else if (!passwordRegex.test(value)) {
                    errorMessage = 'Password must contain uppercase, lowercase, number, and special character.';
                } else {
                    isValid = true;
                }
                break;
                
            case 'confirmPassword':
                const passwordValue = fields.password.value;
                if (!value) {
                    errorMessage = 'Please confirm your password.';
                } else if (value !== passwordValue) {
                    errorMessage = 'Passwords do not match.';
                } else {
                    isValid = true;
                }
                break;
                
            case 'age':
                const ageNum = parseInt(value);
                if (!value) {
                    errorMessage = 'Age is required.';
                } else if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
                    errorMessage = 'Age must be between 13 and 120.';
                } else {
                    isValid = true;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (value.trim() === '') {
                    isValid = true; // Phone is optional, empty is valid
                } else if (!phoneRegex.test(value)) {
                    errorMessage = 'Please enter a valid phone number (e.g., (123) 456-7890).';
                } else {
                    isValid = true; // Phone format is valid
                }
                break;
        }
        
        // Update field appearance and error message
        updateFieldAppearance(field, errorElement, isValid, errorMessage);
        validationState[fieldName] = isValid;
        
        return isValid;
    }
    
    /**
     * Update field appearance based on validation result
     * @param {HTMLElement} field - The input field
     * @param {HTMLElement} errorElement - The error message element
     * @param {boolean} isValid - Whether the field is valid
     * @param {string} errorMessage - Error message to display
     */
    function updateFieldAppearance(field, errorElement, isValid, errorMessage) {
        field.classList.remove('valid', 'invalid');
        
        if (field.value.trim()) { // Only show validation state if field has content
            if (isValid) {
                field.classList.add('valid');
                errorElement.textContent = '';
            } else {
                field.classList.add('invalid');
                errorElement.textContent = errorMessage;
            }
        } else {
            errorElement.textContent = '';
        }
    }
    
    /**
     * Update submit button state based on overall form validity
     */
    function updateSubmitButton() {
        const requiredFields = ['fullname', 'email', 'password', 'confirmPassword', 'age'];
        const allRequiredValid = requiredFields.every(field => validationState[field]);
        
        submitBtn.disabled = !allRequiredValid;
        
        if (allRequiredValid) {
            submitBtn.textContent = '✅ Submit Form';
        } else {
            submitBtn.textContent = '📋 Complete Required Fields';
        }
    }
    
    /**
     * Show success message and reset form
     */
    function showSuccessMessage() {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Reset validation state
            Object.keys(validationState).forEach(field => {
                validationState[field] = false;
                fields[field].classList.remove('valid', 'invalid');
                document.getElementById(`${field}-error`).textContent = '';
            });
            
            updateSubmitButton();
        }, 5000);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Utility function to add event listener with error handling
 * @param {HTMLElement} element - Element to add listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 */
function addEventListenerSafe(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    } else {
        console.warn(`Element not found for event: ${event}`);
    }
}

/**
 * Utility function to log events for debugging
 * @param {string} eventType - Type of event
 * @param {string} details - Event details
 */
function logEvent(eventType, details) {
    console.log(`🎯 Event: ${eventType} | Details: ${details}`);
}

// ========================================
// INITIALIZATION COMPLETE
// ========================================

console.log('✅ All interactive features initialized successfully!');
console.log('📋 Features available:');
console.log('   • Theme Toggle (Dark/Light Mode)');
console.log('   • Event Handling Demo');
console.log('   • Interactive Counter');
console.log('   • Collapsible FAQ');
console.log('   • Tabbed Interface');
console.log('   • Comprehensive Form Validation');