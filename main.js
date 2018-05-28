import { global } from './scripts/global';
import layout from './scripts/layout';
import redirect from './scripts/redirect';
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

import './public/images/avatar1.png'
import './public/images/avatar2.png'
import './public/images/avatar3.png'
import './public/images/avatar4.png'
import './public/images/avatar5.png'
import './public/images/avatar6.png'

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:35b0c13e-47e0-41e4-b5c8-e3924d86d107',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_570GEyJgs',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '1tt5sh3cf3csicaqcpg0a4jiva'
    }
});
