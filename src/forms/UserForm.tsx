import { useState } from "react";

export type UserFormState = {
  username: string;
  password: string;
};

export default function UserForm() {
  const [userFormData, setuserFormData] = useState<UserFormState>({
    username: "",
    password: "",
  });

  const onSubmit = (event: any) => {
    console.log("form-data", userFormData);
    event.preventDefault();
    // react da o anki state değerini kaybetmemek için event.preventDefault yaparız.

    // formun input değerlerinin validasyon kontrolü de olmalı

    if (userFormData.username == "") {
      alert("username giriniz"); // validasyon kontrolü
    }

    if (userFormData.password.length < 8) {
      alert("parola 8 karakterden küçük girilemez");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={userFormData?.username}
        type="text"
        placeholder="username"
        onChange={(event) => {
          setuserFormData({ ...userFormData, username: event.target.value });
          // username alanı güncelle
        }}
      />
      <br></br>
      <input
        value={userFormData.password} // state deki değerleri yansıt
        type="password"
        placeholder="password"
        onChange={(event) => {
          setuserFormData({ ...userFormData, password: event.target.value });
        }}
      />
      <br></br>
      <input type="submit" value="Oturum Aç" />

      <br></br>
      <span>
        username: {userFormData.username}
        <br></br>
        password: {userFormData.password}
      </span>
    </form>
  );
}
