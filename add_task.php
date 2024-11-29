<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $description = $_POST['description'];
    DB::insert("INSERT INTO tasks (description) VALUES (?)", [$description]);
}
