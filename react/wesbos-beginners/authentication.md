# Authentication with Firebase

Firstly, visit the Auth tab in your Firebase project. You can then click on 'Set up Sign up Method' for various sign-up methods. 

**Auth with Facebook**
Visit developers.facebook.com/apps. Then 'Create a New App ID', and fill out the form. Then click on Facebook Login, 

Grab the url from the Facebook sign-in provider on Firebase, and paste it into the 'Valid OAuth redirect URIs' under **Client OAuth Settings**.

These need to be checked:
* Client OAuth Login
* Web OAuth Login
* Embedded Browser OAuth Login

Go to the dashboard of your project on Facebook and grab your **App ID** & **App Secret**. Paste those into your Facebook sign-in provider info on Firebase. 

**How to Repeat the process with other Platforms**
Firebase will provide you with info you need to provide to Twitter, and vice-versa. Start with Firebase with the data they have provided. 