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
const activities = document.querySelectorAll('[type=checkbox]'); // activity check boxes in register for activities fieldset
const activityTotal = document.querySelector('#activities-cost'); // activities cost <p> element
let totalCost = 0; // sets user's cost of attending conference to 0
let totalActivities = 0 // sets number of activities registered to 0

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

// event listener for register for activity fieldset
activityRegister.addEventListener( 'change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost')); // the cost of each individual activity as a number
    
    // updates totalCost and totalActivities as user checks or unchecks activities from activity fieldset
    if ( e.target.checked === true ) {
        totalCost += activityCost;
        totalActivities++;
    } else if ( e.target.checked === false ) {
        totalCost -= activityCost;
        totalActivities--;
    }
    console.log(totalActivities);
    // updates HTML of activityTotal to reflect the totalCost
    activityTotal.innerHTML = `Total: $${totalCost}`;

    // if user selects an activity, other activities with a conflicting times are disabled
    if ( activities[1].checked === true ) {
        activities[3].disabled = true;
        activities[3].parentElement.style.opacity = '.5';
    } else {
        activities[3].disabled = false;
        activities[3].parentElement.style.opacity = '1';
    }
    
    if ( activities[3].checked === true ) {
        activities[1].disabled = true;
        activities[1].parentElement.style.opacity = '.5';
    } else {
        activities[1].disabled = false;
        activities[1].parentElement.style.opacity = '1';
    }
    
    if ( activities[2].checked === true ) {
        activities[4].disabled = true;
        activities[4].parentElement.style.opacity = '.5';
    } else {
        activities[4].disabled = false;
        activities[4].parentElement.style.opacity = '1';
    }
    
    if ( activities[4].checked === true ) {
        activities[2].disabled = true;
        activities[2].parentElement.style.opacity = '.5';
    } else {
        activities[2].disabled = false;
        activities[2].parentElement.style.opacity = '1';
    }
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
    const nameIsValid = /^[a-zA-z.]+ ?[a-zA-z']* ?[a-zA-z']*?$/.test(name.value); // validates name field
    return nameIsValid;
}

const emailValidator = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value); // validates email field
    return emailIsValid;
}

const activityValidator = () => {
    const activityIsValid = totalActivities > 0;
    return activityIsValid;
}

const ccNumValidator = () => {
    const ccNumIsValid = /^\b\d{13,16}\b$/.test(ccNum.value);// validates card number field
    return ccNumIsValid;
}

const zipCodeValidator = () => {
    const zipCodeIsValid = /^\d{5}$/.test(zipCode.value); // validates zip code field
    return zipCodeIsValid;
}

const cvvValidator = () => {
    const cvvIsValid = /^\d{3}$/.test(cvv.value); // validates cvv field
    return cvvIsValid;
}

// validates form fields as user types
name.addEventListener( 'keyup', nameValidator );
email.addEventListener( 'keyup', emailValidator );
ccNum.addEventListener( 'keyup', ccNumValidator );
zipCode.addEventListener( 'keyup', zipCodeValidator );
cvv.addEventListener( 'keyup', cvvValidator );

// form submission event listener -- checks form validation when user clicks 'register' button
form.addEventListener( 'submit', (e) => {
    e.preventDefault();
    // if any of the validation helper functions return false, alert the user of their error
    if ( !nameValidator() ) {
        e.preventDefault();
        name.parentElement.classList = 'not-valid'; // add error indicator if not valid

        if ( name.value === '' ) {
            name.parentElement.lastElementChild.style.display = 'block'; // show error hint if field left blank
            name.parentElement.children[2].style.display = 'none'; // hide other error hint
        } else {
            name.parentElement.children[2].style.display = 'block'; // show error hint if field contains numbers or invalid symbols
            name.parentElement.lastElementChild.style.display = 'none'; // hide other error hint
        }
    } else {
        name.parentElement.classList = 'valid'; // add valid indicator if valid
        name.parentElement.lastElementChild.style.display = 'none'; // hide error hint if valid
        name.parentElement.children[2].style.display = 'none'; // hide other error hint if valid
    }
      
    if ( !emailValidator() ) {
        e.preventDefault();
        email.parentElement.classList = 'not-valid';; // add error indicator if not valid

        if ( email.value === '' ) {
            email.parentElement.lastElementChild.style.display = 'block'; // show error hint if field left blank
            email.parentElement.children[2].style.display = 'none'; // hide other error hint
        } else {
            email.parentElement.children[2].style.display = 'block'; // show error hint if field contains numbers or invalid symbols
            email.parentElement.lastElementChild.style.display = 'none'; // hide other error hint
        }
    } else {
        email.parentElement.classList = 'valid';; // add valid indicator if valid
        email.parentElement.lastElementChild.style.display = 'none'; // hide error hint if valid
        email.parentElement.children[2].style.display = 'none'; // hide other error hint if valid
    }

    if ( !activityValidator() ) {
        e.preventDefault();
        activityRegister.classList.add('not-valid'); // add error indicator if not valid
        activityRegister.lastElementChild.style.display = 'block' // show error hint if no activities are checked
    } else {
        activityRegister.classList.remove('not-valid'); // // add valid indicator if valid
        activityRegister.classList.add('valid'); // // add valid indicator if valid
        activityRegister.lastElementChild.style.display = 'none' // hide error hint if valid
    }
  
    // only validate credit card info if credit card is selected in the payment select element
    if ( payment.children[1].selected = true ) {
        
        if ( !ccNumValidator() ) {
            e.preventDefault();
            ccNum.parentElement.classList = 'not-valid';; // add error indicator if not valid
            ccNum.parentElement.lastElementChild.style.display = 'block'; // show error hint if not valid
        } else {
            ccNum.parentElement.classList = 'valid';; // add error indicator if not valid
            ccNum.parentElement.lastElementChild.style.display = 'none'; // hide error hint if valid
        }
        
        if ( !zipCodeValidator() ) {
            e.preventDefault();
            zipCode.parentElement.classList = 'not-valid';; // add error indicator if not valid
            zipCode.parentElement.lastElementChild.style.display = 'block'; // show error hint if not valid
        } else {
            zipCode.parentElement.classList = 'valid';; // add error indicator if not valid
            zipCode.parentElement.lastElementChild.style.display = 'none'; // hide error hint if valid
        }

        if ( !cvvValidator() ) {
            e.preventDefault();
            cvv.parentElement.classList = 'not-valid'; // add error indicator if not valid
            cvv.parentElement.lastElementChild.style.display = 'block'; // show error hint if not valid
        } else {
            cvv.parentElement.classList = 'valid';; // add error indicator if not valid
            cvv.parentElement.lastElementChild.style.display = 'none'; // hide error hint if valid
        }
    }
});


// ================================= //
// ACCESSIBILITY -- ERROR INDICATION //
// ================================= //



