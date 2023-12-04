<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>JASForm</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" sizes="32x32">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.webmanifest">
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap");
    </style>
</head>

<body class="antialiased">
    <div id="app"></div>

    @viteReactRefresh @vite('resources/js/App.tsx')
</body>

</html>
