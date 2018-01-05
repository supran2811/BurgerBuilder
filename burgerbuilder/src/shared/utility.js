export const updateObject = (oldObject , updatedProperties) => (
    {
        ...oldObject,
        ...updatedProperties
    }
);

export const checkValidity = (rules,value) => {
    let isValid = true;
    if(rules.required){
        isValid = isValid && value.trim() !== "";
    }

    if(rules.maxlength){
        isValid = isValid && value.trim().length <= rules.maxlength;
    }

    if(rules.minlength){
        isValid = isValid && value.trim().length >= rules.minlength;
    }

    return isValid;
}
