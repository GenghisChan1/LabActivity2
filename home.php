<?php
session_start();
if (!isset($_SESSION["user"])){
  header("Location: login.html");
  exit;
}
$user = $_SESSION["user"];
?>

<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="home">
  <h2>Welcome, <?php echo htmlspecialchars($user['fullname']); ?>!</h2>
  <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>
  <p>Username: <?php echo htmlspecialchars($user['username']); ?></p>
  <p>Gender: <?php echo htmlspecialchars($user['gender']); ?></p>
  <p>Hobbies: <?php echo htmlspecialchars($user['hobbies']); ?></p>
  <p>Country: <?php echo htmlspecialchars($user['country']); ?></p>
  <a href="logout.php">Logout</a>
</body>
</html>

