
export const canLog = true;

export class LogServices {
  static log(info){
    if(canLog){
      console.log(info)
    }
    else {
      console.log('Can not log info, please set correct ENV variable')
    }
  }
}

// LoggingServices.log(PHASE_DEVELOPMENT)