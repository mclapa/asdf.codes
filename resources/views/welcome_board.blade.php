<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="fragment" content="!">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <title>{{ $slug }} | asdf.codes</title>
    <meta name="keywords" content="New homes in southern ontario by thomasfield homes" />
    <link rel="Shortcut Icon" href="/images/favicon.ico" type="image/x-icon" />

    <meta name="description" content="ASDF and el is a douche" />

    <link rel="stylesheet" href="{{ mix('/css/main.css') }}">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <script>
        window.CONSTS = {
            board_id: {{ $id }},
            slug: '{{ $slug }}',
        };
    </script>
</head>
<body class="react">

<!-- JavaScripts
<script src="js/libs.js"></script> -->
<script src="{{ mix('/js/manifest.js') }}"></script>
<script src="{{ mix('/js/vendor.js') }}"></script>
<script src="{{ mix('/js/board.js') }}"></script>

</body>
</html>
