import { global } from './global';
import layout from './layout';
import redirect from './redirect';
import { credentials } from '../secrets/cognitoCreds.js';
import Amplify from 'aws-amplify';

import './index.html'

import './css/main.css'
import './css/header.css'
import './css/footer.css'
import './css/sidebar.css'
import './css/homeScreen.css'
import './css/dashboard.css'
import './css/upcomingLessons.css'
import './css/voteForLesson.css'
import './css/interviewPrep.css'
import './css/recursiveDirectory.css'
import './css/editProfile.css'
import './css/viewProfile.css'
import './css/responsive.css'

import './images/avatar1.png'
import './images/avatar2.png'
import './images/avatar3.png'
import './images/avatar4.png'
import './images/avatar5.png'
import './images/avatar6.png'

import './images/favicon/favicon_16x16.ico'
import './images/favicon/favicon_32x32.ico'


// Austin's Cognito pool
// Amplify.configure({
//     Auth: {
//         // THIS IS ACTUALLY OPTIONAL (OR MAYBE REQUIRED IF IT ACTUALLY IS CONFIGURED CORRECTLY) - Amazon Cognito Identity Pool ID -- as of 2018 05 31 this does nothing...not configured
//         // identityPoolId: 'us-west-2:35b0c13e-47e0-41e4-b5c8-e3924d86d107',
//         region: 'us-east-1', // REQUIRED - Amazon Cognito Region
//         userPoolId: 'us-east-1_3Ry3Pde7v', // REQUIRED - Amazon Cognito User Pool ID
//         userPoolWebClientId: '41djjc21o3d48vlm2d4nea8cjv' // REQUIRED - Amazon Cognito Web Client ID
//     }
// });

// Avsean's Cognito pool
Amplify.configure({
    Auth: {
        region: credentials.region,
        userPoolId: credentials.userPoolId,
        userPoolWebClientId: credentials.userPoolWebClientId
    }
});