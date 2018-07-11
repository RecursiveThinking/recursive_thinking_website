import creds from '../secrets/cognitoSecrets.json'
console.log(creds);

export const credentials = creds
console.log(credentials);

// OLD credentials constructor

// export const credentials = {
//     region: "us-west-2",
//     userPoolId: "us-west-2_LeVFVPfxn",
//     userPoolWebClientId: "3art487ptkct3cjuppm2u7bla5",
//     apiUrl: "https://ctrkbe79gj.execute-api.us-west-2.amazonaws.com/Prod"
// }

// console.log('credentials', credentials);