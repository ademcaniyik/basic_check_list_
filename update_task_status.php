<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $status = $_POST['status'];
    if (isset($id) && isset($status)) {
        $result = DB::exec("UPDATE tasks SET status = ? WHERE id = ?", [$status, $id]);
        echo json_encode(['success' => $result]);
    } else {
        echo json_encode(['error' => 'ID or status not provided']);
    }
}

