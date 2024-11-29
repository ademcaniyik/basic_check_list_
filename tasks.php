<?php
include 'config.php';

$tasks = DB::get("SELECT * FROM tasks ORDER BY id DESC");
header('Content-Type: application/json');
echo json_encode(['tasks' => $tasks]);
