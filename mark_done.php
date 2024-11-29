<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    if (isset($id)) {
        $result = DB::exec("UPDATE tasks SET status = 'done' WHERE id = ?", [$id]);
        echo json_encode(['success' => $result]);
    } else {
        echo json_encode(['error' => 'ID not provided']);
    }
}
