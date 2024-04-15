<!DOCTYPE html>
<html>

<head>
    <title>Login with Two Factor Authentication - JASForm</title>
</head>

<body>
    <h1 style="color: #00519E; "">Hello, {{ $userFullName }}</h1>
    <p>Use this code to add it in the login form's new input field 'Two factor code':
        <strong>{{ $token }}</strong>
    </p>
    <p>If you did not try to login, please ignore this email or reply to let us know.<br>
        This code is only valid for the next 15 minutes.</p>
    <p>Thanks,<br> JASForm Team</p>
    <img src="https://jasform-pub.s3.us-west-2.amazonaws.com/JASForm_Isologo_big_transp_1.png" alt="JASForm Logo"
        style="width: 100%; max-width: 200px; display: block;">
</body>

</html>
