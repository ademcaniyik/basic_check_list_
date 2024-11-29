<?php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $taskId = $_POST['id'];
    $description = $_POST['description'];

    $sql = "UPDATE tasks SET description = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $description, $taskId);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['status' => 'success']);
}
?>
