<?php
declare(strict_types=1);

enum Gender: string {
  case Male = "Male";
  case Female = "Female";
  case Other = "other";
}

enum Hobbies: string {
  case Reading = "Reading";
  case Sports = "Sports";
  case Music = "Music";
}

enum Countries: string {
  case Philippines = "Philippines";
  case USA = "USA";
  case UK = "UK";
}

class User
{
  private string $fullname, $email, $username, $password, $country, $gender;
  private $hobbies = [];

  function __construct(string $fullname, string $email, string $username, string $password)
  {
    $this->fullname = $fullname;
    $this->email = $email;
    $this->username = $username;
    $this->password = $password;
  }
  
  function get_fullname()
  {
    return $this->fullname;
  }

  function get_email()
  {
    return $this->email;
  }

  function get_username()
  {
    return $this->username;
  }

  function get_password()
  {
    return $this->password;
  }

  function get_gender()
  {
    return $this->gender;
  }

  function get_hobbies()
  {
    return $this->hobbies;
  }

  function get_country(){
    return $this->country;
  }

  function set_gender(string $gender)
  {
    $this->gender = $gender;
  }

  function set_hobbies(string|array $hobby)
  {
    $this->hobbies[] = $hobby;
  }

  function set_country(string $country)
  {
    $this->country = $country;
  }
}
?>