export const updateObject = (oldObject,updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidation  = (value,rules) =>{
    let isValid = true;
    //this is AND operation. if any one of them false the final result of isValid will be false. this is what we required.
    if (rules.required){
        isValid = value.trim() !=='' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.required){
        isValid = value !== 'select' && isValid;
    }
    if(rules.isEmail){
        const emailPattern=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        isValid = emailPattern.test(value) && isValid;
    }
    if(rules.isNumeric){
        const pattern=/^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}