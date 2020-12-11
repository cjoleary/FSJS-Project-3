// ================== //
// BASIC INFO SECTION //
// ================== //

const name = document.querySelector('#name');
// sets focus of first input field on page load
name.focus();

const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
// hides other job role text input by default
otherJobRole.style.display = 'none';

// job role select element event listener
jobRole.addEventListener( 'change', (e) => {
    // if 'other' is selected, make other job role text input visible
    if ( e.target.value === 'other' ) {
        otherJobRole.style.display = 'block';
    }
})

// ==================== //
// T-SHIRT INFO SECTION //
// ==================== //

const tshirtDesign = document.querySelector('#design');
const tshirtColor = document.querySelector('#color');
const colorOptions = tshirtColor.children;

// disables shirt color select element by default until user selects a shirt designxsx
tshirtColor.disabled = true;