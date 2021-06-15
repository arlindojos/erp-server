
export default {
  validator(phone: string) {
    
    if(!phone || phone.trim().length > 20) {
      return false
    }

    if(phone.match(/[A-Za-z]/g)) {
      return false;
    }

    const regex = /[0-9][-. ]?/g;
    const regexArray = phone.match(regex);

    if(!regexArray) {
      return false
    }

    if(regexArray.length < 6 || regexArray.length > 14) {
      return false
    }
    
    return true
  },

  create(phoneNumber: string) {
    if(!this.validator(phoneNumber)) {
      const error = new Error(`The phone number ${phoneNumber} is invalid.`);
      error.name = 'InvalidPhoneNumberError';

      return error;
    }

    return phoneNumber;
  }
}
