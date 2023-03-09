import React from "react";
import { useForm } from "react-hook-form";

// tsfrc

type UserFormData = {
  // formda taşınacak tipteki veriler
  username: string;
  password: string;
};

export default function UserFormReactForms() {
  const {
    register, // inputun form elementi olarak tanımlanması sağlınıyor
    handleSubmit, // formun submit işlemlerini handleSubmit ile yapıyoruz
    watch, // form State takip etmemizi sağlar.
    reset, // formu temizle
    setValue, // ts tarafında forma değer set etmek için kullanılır. edit update işlemlerinde veri çekilince çekilen veri inputalara set edilmelidir en çok o gibi durumlarda tercih edilebilir. veya bir değer seçimi yaptıktan sonra otomatik bir hesaplama sonmrasında inputa değeri set etmek gibi 2 * 56 => 112
    getFieldState, // touched,invalid,isdirty,error gibi inputa ait validasyon statelerini getirir.
    getValues, // formdaki inputaların value değerlerini verir. inputtaki değerleri alırız
    formState: { errors, isValid }, // hatalar erors olarak geliyor ön tanımlı değerler. // isValid formdaki tüm alanların valid olup olmamasını kontrol eder
  } = useForm<UserFormData>({
    defaultValues: { username: "ali", password: "test1234" }, // yani form ilk açıldığında bu default değerler ile açılsın tanımlaması
  }); // useFormdan hangi tipte veri ile çalışacağımızı belirttik.

  // const context = useFormContext(); // form nesnesinin instance erişmemize olanak sağlar.

  // form da value değişimini takibe almak için watch kullandık
  console.log("username", watch("username")); // watch input value by passing the name of it
  console.log("password", watch("password"));

  const onSubmit = (data: UserFormData) => {
    console.log("data", data);
    // console.log("form verileri", context.getValues());
    // api ya veri gönderilecek olan kısım
  };

  const OnClearForm = () => {
    reset(
      { username: "", password: "" },
      { keepIsValid: false, keepDirty: true }
    );
  };

  const onSetUsername = () => {
    // formdaki bir alana ts dosyasında value tanımlamak için kullanılabilir.
    setValue("username", "can");
  };

  const onGetValues = () => {
    console.log("values", getValues().username, getValues().password);
  };

  const onGetFieldState = () => {
    console.log(
      "onGetFieldState",
      "isDirty",
      getFieldState("username").isDirty, // inputa bir değer girildimi
      "isTouched",
      getFieldState("username").isTouched, // focus oldumu
      "invalid",
      getFieldState("username").invalid, // validasyondan kaldımı
      "error",
      getFieldState("username").error // bu input ile ilgili bir hata varmı
    );
  };

  return (
    <div>
      {/* Form Hataları : {context.formState.errors.root?.message} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: { value: true, message: "username alanı boş geçilemez" },
            maxLength: {
              value: 20,
              message: "Kullanıcı adı maksimum 20 karakter olabilir",
            }, // inputa aynı zamanda validayon tanımlama işlemi yapılabilir required boş geçilemez olsun hata mesajı su olsun
          })}
        />
        <br></br>
        <span style={{ color: "red" }}>{errors.username?.message}</span>
        {/* username hata mesajlarını gçster */}
        <br></br>
        {/* hata varsa hata mesajını yazdırmak için kullandık */}
        <br></br>
        <input
          {...register("password", {
            required: { value: true, message: "parola boş geçilemez" },
            minLength: {
              value: 8,
              message: "18 karakterden az değer giremezsiniz",
            },
          })}
        />
        <br></br>
        <span style={{ color: "red" }}>{errors.password?.message}</span>
        {/* hangi hataya denk gelirse o hata ile ilgili mesajı çıkarırız */}

        {/* {errors.username?.types?.required && <span>This field is required</span>} */}
        {/* mvc de asp-for ile aynı şeye denk gelir. model property */}
        {/* username field ını bu inputa bind ettik. register bu işi sağlar. */}
        <br></br>
        <input
          disabled={isValid ? false : true} // form valid ise valid değilse kontrolleri yapılabilir
          //disabled={errors.password || errors.username ? true : false} // password veya username hata varsa disable et
          type="submit"
          value="Kaydet"
          // form valida değilse butonun state değiştir demek oluyor
        />
        <button onClick={OnClearForm}>Formu Temizle</button>
        <button onClick={onSetUsername}>Set User Name</button>
        <button onClick={onGetValues}>Get Values</button>
        <button onClick={onGetFieldState}>Get Field State</button>
        {/* bu input state ne dirty mi error var mı valid invalid mi  */}
      </form>
    </div>
  );
}