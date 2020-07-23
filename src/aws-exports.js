export default {
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'us-east-2:b6d9d7ea-b5f7-48ac-a4ef-3cf1c4127d9b',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'us-east-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_5npjYAwHf',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'u9s664jhcf66ts3msgj634n3s',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        //cookieStorage: {
        //// REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //    domain: '.yourdomain.com',
        //// OPTIONAL - Cookie path
        //    path: '/',
        //// OPTIONAL - Cookie expiration in days
        //    expires: 365,
        //// OPTIONAL - Cookie secure flag
        //// Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //    secure: false
        //},

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'your_cognito_domain',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'http://localhost:3000/',
        //     redirectSignOut: 'http://localhost:3000/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
};
