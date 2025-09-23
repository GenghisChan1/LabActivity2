<?php
include 'db.php';
include 'user.php';

if ($_SERVER["REQUEST_METHOD"] == "POST"){
  $fullname = $_POST["fullname"];
  $email = $_POST["email"];
  $username = $_POST["username"];
  $password = $_POST["password"];
  $confirm = $_POST["confirm"];
  $gender = $_POST["gender"];
  $country = $_POST["country"];
  $hobbies = isset($_POST["hobbies"]) ? implode(",", $_POST["hobbies"]) : [];

  if ($password !== $confirm) die("Passwords do not match.");
  
  $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  if ($stmt->get_result()->num_rows > 0) 
    die ("User name already exist");

  $hpass = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $conn->prepare("INSERT INTO users (fullname,email,username,password,gender,hobbies,country) VALUES(?,?,?,?,?,?,?)");
  $stmt->bind_param("sssssss", $fullname, $email, $username, $hpass, $gender, $hobbies, $country);
  
  if ($stmt->execute()) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $_SESSION["user"] = $row;

    header("Location: home.php");
    exit;

  } else {
    echo "Error: ". $stmt->error;
  }
}
?>