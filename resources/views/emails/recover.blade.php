<!DOCTYPE html>
<html>

<head>
    <title>Recover your Account - JASForm</title>
</head>

<body>
    <h1 style="color: #00519E; "">Hello, {{ $userFullName }}</h1>
    <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
    <a href="{{ url('recover-password?token=' . $token) }}"
        style="background-color: #00519E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset
        your
        password</a>

    <p>If you can not click the button, copy and paste the following link into your browser:
        {{ url('recover-password?token=' . $token) }}</p>
    <p>If you did not request a password reset, please ignore this email or reply to let us know.<br>
        This password reset is only valid for the next 30 minutes.</p>
    <p>Thanks,<br> JASForm Team</p>

    <img src="https://jasform-pub.s3.us-west-2.amazonaws.com/JASForm_Isologo_big_transp_1.png" alt="JASForm Logo"
        style="width: 100%; max-width: 200px; display: block;">
</body>

</html>
