<!DOCTYPE html>
<html>

<head>
    <title>Pre-Validate your email - JASForm</title>
</head>

<body>
    <h1 style="color: #00519E; "">Hello, {{ $email }}</h1>
    <p>We need to validate your email.</p>
    <p>Use this code to add it in the creation form's new input field 'Email validation code':
        <strong>{{ $token }}</strong></p>
    <p>If you did not try to create a user, please ignore this email or reply to let us know.<br>
        This code is only valid for the next 30 minutes.</p>
    <p>Thanks,<br> JASForm Team</p>
    <img src="https://jasform-pub.s3.us-west-2.amazonaws.com/JASForm_Isologo_big_transp_1.png" alt="JASForm Logo"
        style="width: 100%; max-width: 200px; display: block;">
</body>

</html>
