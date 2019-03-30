import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CODEPEN_API_URL } from '../credentials/githubApi'

// import request from 'request';

export const urlParser = (URL) => {
  var parser = document.createElement('a');
  parser.href = URL;
  
  return {
    protocol: parser.protocol, // => "http:"
    hostname: parser.hostname, // => "example.com"
    port: parser.port,     // => "3000"
    pathname: parser.pathname, // => "/pathname/"
    search: parser.search,   // => "?search=test"
    hash: parser.hash,     // => "#hash"
    host: parser.host    // => "example.com:3000"
  }
}

// export const urlExists = (url, cb) => {
//     request({ url: url, method: 'HEAD' }, function(err, res) {
//       if (err) return cb(null, false);
//       cb(null, /4\d\d/.test(res.statusCode) === false);
//     });
//   }

export const protocolValidator = (expected, given) => {
  if(expected !== given){
    return false
  } else {
    return true
  }
}

export const hostnameValidator = (expected, given) => {
  if(expected !== given){
    return false
  } else {
    return true
  }
}

export const validateGitHubUsername = async (username) => {
  if(username === ''){
    return
  } else {
    const URL_GITHUB_API = `https://api.github.com/users/${username}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`
    const gitHubResponse = await fetch(URL_GITHUB_API)
    const responseObj = await gitHubResponse.json();
    // console.log('responseObj: ', responseObj);
    return responseObj.id ? true : false;
  }
}

export const validateCodePenUsername = async (username) => {
  if(username === ''){
    return
  } else {
    const codePenProfileResponse = await fetch(`${CODEPEN_API_URL}${username}`);
    const codePenProfileData = await codePenProfileResponse.json();
    // console.log('validateCodePenUsername: ', codePenProfileData)
    return codePenProfileData.success ? true : false;
  }
}

export const validateLinkedIn = (url) => {
  const parsedURL = urlParser(url);
  // console.log('parsedURL: ', parsedURL)
  // "/in/sethborne" <-- pathname
  let isPathNameValid = false;
  if(parsedURL.pathname){
    // then we will figure out if we want to change.  only change if there is [ in , <username>]
    const pathNameArr = parsedURL.pathname.split('/').filter(item => item !== '')
    // console.log('pathNameArr: ', pathNameArr)
    if(pathNameArr.length === 2){
      if(pathNameArr[0] === 'in'){
        if(typeof pathNameArr[1] === 'string'){
          isPathNameValid = true
        }
      }
    }
  }
  let obj = {
    protocol: protocolValidator('https:', parsedURL.protocol),
    hostname: hostnameValidator('www.linkedin.com', parsedURL.hostname), 
    pathname: isPathNameValid,
    last: false
  }
  return obj
}

export const validatePortfolioURL = (url) => {
  const parsedURL = urlParser(url);
  let isProtocolValid = false;
  let hasHostName = false;
  // console.log('parsedURL @ portfolioURL: ', parsedURL)  
  if(parsedURL.protocol === 'http:' || parsedURL.protocol === 'https:'){
    isProtocolValid = true;
  }
  if(parsedURL.hostname){
    const hostNameArr = parsedURL.hostname.split('.').filter(item => item !== '')
    // console.log('hostNameArr: ', hostNameArr)
    if(hostNameArr.length === 3){
      hasHostName = true;
    }
  }
  // if(isProtocolValid && parsedURL.hostname){
  //   // then do the request
  //   const protoHostName = `${parsedURL.protocol}//${parsedURL.hostname}`
  //   var isURLValid = urlExists(protoHostName, function(err, exists){
  //     console.log(`does ${protoHostName} exist?: `, exists)
  //     return exists
  //   })
  //   console.log('isURLValid: ', isURLValid);
  // }
  return {
    protocol: isProtocolValid,
    hostname: hasHostName
  }
}

