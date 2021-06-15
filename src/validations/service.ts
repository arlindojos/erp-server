
export default {
  validator(service: string) {
    if (!service || service.trim().length < 2 || service.trim().length > 100) {
      return false
    }

    if(
      service.match(/Criar software/i) ||
      service.match(/Otimizar software/i) ||
      service.match(/Adicionar novas funcionalidades software/i)
    ) {
      return true
    }

    return false;
  },

  create(service: string) {
    if(!this.validator(service)) {
      const error = new Error(`The service ${service} is invalid.`);
      error.name = 'InvalidServiceError';

      return error;
    }


    return service;
  }
}
