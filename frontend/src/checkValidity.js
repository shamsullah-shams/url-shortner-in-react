// checks validity of data and returns true or false

const checkValidity = (value, rules) => {
    let isValid = true;
    const doMatchValue = value;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minlength) {
        isValid = doMatchValue.length >= rules.minlength && isValid;
    }

    if (rules.startWith) {
        isValid = (doMatchValue.startsWith('http') || doMatchValue.startsWith('www')) && isValid;
    }

    return isValid;
}


export default checkValidity;