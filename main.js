import { global } from './scripts/global';
import layout from './scripts/layout';
import redirect from './scripts/redirect';
import Amplify from 'aws-amplify';

import './index.html'
import './templates/upcomingLessons.html'
import './templates/editProfile.html'
import './templates/interviewPrep.html'
import './templates/signOut.html'
import './templates/voteForLesson.html'
import './templates/recursiveDirectory.html'
import './templates/homeScreen.html'

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
import './css/responsive.css'

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
