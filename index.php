

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Check List</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="fav.ico">


</head>
<body>
    <div class="container">
        <div class="section" id="add-task-section">
            <h2>Yeni İş Ekle</h2>
            <input type="text" id="new-task" placeholder="Yeni iş...">
            <button id="add-task-btn">Ekle</button>
        </div>
        <div class="section" id="pending-tasks-section">
            <h2>Yapılacaklar</h2>
            <ul id="pending-tasks-list">
                <!-- Yapılacak işler burada listelenecek -->
            </ul>
        </div>
        <div class="section" id="done-tasks-section">
            <h2>Yapılmışlar</h2>
            <ul id="done-tasks-list">
                <!-- Yapılmış işler burada listelenecek -->
            </ul>
        </div>
    </div>

    <script src="script.js"></script>

</body>
</html>
