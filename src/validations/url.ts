
export default {
  validator(url: string) {
    
    if(url.match(/\s/)) {
      return false
    }

    if(!url.match(/^http{1,}/) ) {
      return false
    }

    if (!url || url.trim().length < 2 || url.trim().length > 255) {
      return false
    }

    return true
  },

  create(url: string) {
    
    if(!this.validator(url)) {

      const error = new Error(`The url ${url} is invalid.`);
      error.name = 'InvalidUrlError';

      return error;
    }


    return url;
  }
}
