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
        // THIS IS ACTUALLY OPTIONAL (OR MAYBE REQUIRED IF IT ACTUALLY IS CONFIGURED CORRECTLY) - Amazon Cognito Identity Pool ID -- as of 2018 05 31 this does nothing...not configured
        // identityPoolId: 'us-west-2:35b0c13e-47e0-41e4-b5c8-e3924d86d107',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // THIS IS REQUIRED - Amazon Cognito User Pool ID
        // \/-- below is for old user pool - recursivethinking
        // userPoolId: 'us-west-2_570GEyJgs',
        // \/-- this if from new user pool
        // userPoolId: 'us-west-2_wlW7N1Kcp',
        // 20180601 - 12:30
        userPoolId: 'us-west-2_gXoTkHIJA',
        // THIS IS REQUIRED - Amazon Cognito Web Client ID
        // \/-- below is for old user pool - recursivethinking
        // userPoolWebClientId: '1tt5sh3cf3csicaqcpg0a4jiva'
        // \/-- this if from new user pool
        // userPoolWebClientId: '57te4kfc511ietb5dpe3tkkm3e'
        // 20180601 - 12:30
        userPoolWebClientId: '2t68u41p8q84e9u7ejnmvg67g7'
    }
});

// OLD
////////
// Pool Id us-west-2_570GEyJgs
// Pool ARN arn:aws:cognito-idp:us-west-2:131603044023:userpool/us-west-2_570GEyJgs

// App Clients
// recursivethinkingwebsite
// App Client Id:  1tt5sh3cf3csicaqcpg0a4jiva


// NEW

// Pool Id us-west-2_wlW7N1Kcp
// Pool ARN arn:aws:cognito-idp:us-west-2:131603044023:userpool/us-west-2_wlW7N1Kcp

// App Clients
// RTW
// App Client Id:  57te4kfc511ietb5dpe3tkkm3e

// Federated Entities - recursivethinkingindentity - edit -

//  category authentication providers - cognito tab

// changed user pool id from us-west-2_570GEyJgs -to- us-west-2_wlW7N1Kcp
