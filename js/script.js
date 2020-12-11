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

const activityRegister = document.querySelector('#activities'); // register for activities fieldset
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

// =============== //
// FORM VALIDATION //
// =============== //

const form = document.querySelector('form'); // form element
const email = document.querySelector('#email'); // email input element
const ccNum = document.querySelector('#cc-num'); // credit card number input element
const zipCode = document.querySelector('#zip'); // zip code input element
const cvv = document.querySelector('#cvv'); // CVV input element

// validation helper functions
const nameValidator = () => {
    const nameValue = name.value; // value of name field
    const nameIsValid = /^[a-zA-z.]+ ?[a-zA-z']* ?[a-zA-z']*?$/.test(nameValue); // validates name field
    return nameIsValid;
}

const emailValidator = () => {
    const emailValue = email.value; // value of email field
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue); // validates email field
    return emailIsValid;
}

const ccNumValidator = () => {
    const ccNumValue = ccNum.value; // value of card number field
    const ccNumIsValid = /^\b\d{13,16}\b$/.test(ccNumValue);// validates card number field
    return ccNumIsValid;
}

const zipCodeValidator = () => {
    const zipCodeValue = zipCode.value; // value of zip code field
    const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue); // validates zip code field
    return zipCodeIsValid;
}

const cvvValidator = () => {
    const cvvValue = cvv.value; // value of cvv field
    const cvvIsValid = /^\d{3}$/.test(cvvValue); // validates cvv field
    return cvvIsValid;
}


// form submission event listener
form.addEventListener( 'submit', (e) => {
    
    // if any of the validation helper functions return false, alert the user of their error
    if ( !nameValidator() ) {
        e.preventDefault();
        alert('Please enter a valid name');
    }
      
    if ( !emailValidator() ) {
        e.preventDefault();
        alert('Please enter a valid email');
    }

    // only validate credit card info if credit card is selected in the payment select element
    if ( payment.children[1].selected = true ) {
        
        if ( !ccNumValidator() ) {
            e.preventDefault();
            alert('Please enter a valid credit card number');
        }
        
        if ( !zipCodeValidator() ) {
            e.preventDefault();
            alert('Please enter a valid zip code');
        }

        if ( !cvvValidator() ) {
            e.preventDefault();
            alert('Please enter a valid cvv number');
        }
    }
});

// ================================= //
// ACCESSIBILITY -- ERROR INDICATION //
// ================================= //

const activities = document.querySelectorAll('[type=checkbox]'); // activity check boxes in register for activities fieldset

// loop through activities
for ( let i = 0; i < activities.length; i++ ) {
    // add focus class to check box if user clicks on it
    activities[i].addEventListener( 'focus', (e) => {
        activities[i].parentElement.classList.add('focus');
    });
    // remove focus class from check box if user clicks off of it
    activities[i].addEventListener( 'blur', (e) => {
        activities[i].parentElement.classList.remove('focus');
    });
}

