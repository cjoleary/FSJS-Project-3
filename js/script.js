// ================== //
// BASIC INFO SECTION //
// ================== //

const name = document.querySelector('#name');
// sets focus of first input field on page load
name.focus();

const jobRole = document.querySelector('#title'); // job role select element
const otherJobRole = document.querySelector('#other-job-role'); // other job role text input
// hides otherJobRole by default
otherJobRole.hidden = true;

// job role select element event listener
jobRole.addEventListener( 'change', (e) => {
    // if 'other' is selected, make other job role text input visible
    if ( e.target.value === 'other' ) {
        otherJobRole.hidden = false;
    }
});

// ==================== //
// T-SHIRT INFO SECTION //
// ==================== //

const tshirtDesign = document.querySelector('#design'); // t-shirt design select element
const tshirtColor = document.querySelector('#color'); // t-shirt color select element
const colorOptions = tshirtColor.children; // t-shirt color options

// disables shirt color select element by default until user selects a shirt designxsx
tshirtColor.disabled = true;

// t-shirt design select element event listener
tshirtDesign.addEventListener( 'change', (e) => {
    // enables color select element when user selects a t-shirt design
    tshirtColor.disabled = false;

    for ( let i = 0; i < colorOptions.length; i++ ) {
        const colorDataTheme = colorOptions[i].getAttribute('data-theme');

        // updates color options based on which t-shirt design the user chooses. colors will only be selectable if they are specific to the design chosen
        if ( e.target.value === colorDataTheme ) {
            colorOptions[i].hidden = false;
            colorOptions[i].selected = true;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
        }
    }
});

// =============================== //
// REGISTER FOR ACTIVITIES SECTION //
// =============================== //

const activityRegister = document.querySelector('#activities'); // register for activity fieldset
const activityTotal = document.querySelector('#activities-cost'); // activities cost <p> element
let totalCost = 0; // sets user's cost of attending conference to 0

// event listener for register for activity fieldset
activityRegister.addEventListener( 'change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost')); // the cost of each individual activity as a number
    
    // updates totalCost as user checks or unchecks activities from activity fieldset
    if ( e.target.checked === true ) {
        totalCost += activityCost;
    } else if ( e.target.checked === false ) {
        totalCost -= activityCost;
    }
    
    // updates HTML of activityTotal to reflect the totalCost
    activityTotal.innerHTML = `Total: $${totalCost}`;
});

// ==================== //
// PAYMENT INFO SECTION //
// ==================== //

const payment = document.querySelector('#payment'); // payment select element
const creditCard = document.querySelector('#credit-card'); // credit card div element
const payPal = document.querySelector('#paypal'); // paypal div element
const bitCoin = document.querySelector('#bitcoin'); // bitcoin div element

// hides paypal and bitcoin divs by default
payPal.hidden = true;
bitCoin.hidden = true;

// sets selected attribute of payment select element's 2nd child (credit card)
payment.children[1].selected = true;

// event listener for payment select element
payment.addEventListener( 'change', (e) => {
    // if the select option value matches the id of the payment div elements, show that div element, else hide it
    if ( e.target.value === 'credit-card' ) {
        creditCard.hidden = false;
        payPal.hidden = true;
        bitCoin.hidden = true;  
    } else if ( e.target.value === 'paypal' ) {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitCoin.hidden = true;
    } else if ( e.target.value === 'bitcoin' ) {
        bitCoin.hidden = false;
        creditCard.hidden = true;
        payPal.hidden = true;
    }
});