


export const generateErrorMessageContent = (apiTextThatFailed, errors) => {
  let title = `Error occured at: ${apiTextThatFailed}`
  let body = ``
  for(let key in errors){
    
    body += `${key}: ${errors[key]}`
  }
  return {
    heading: title,
    paragraph: body
  }
}