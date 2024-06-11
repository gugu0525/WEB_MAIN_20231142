

function init_logined(){
    if(sessionStorage){
    decrypt_text(); // 복호화 함수
   }
    else{
    alert("세션 스토리지 지원 x");
    }
    }



    function encodeByAES256(key, data)
    {const cipher= CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}


function decodeByAES256(key, data)
    {const cipher= CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
    }


    function encrypt_text(password){
        const k = "key"; // 클라이언트 키
        const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
        const b = password;
        const eb = this.encodeByAES256(rk, b);
        
        if (eb) {
            console.log(eb);
            return eb; // 올바른 암호화된 데이터가 생성되었을 때만 반환
        } else {
            console.error("암호화된 데이터 생성에 실패했습니다.");
            return null;
        }
    }


session_set(); // 세션 생성
loginForm.submit();


function decrypt_text(){
    const k = "key"; // 서버의 키
   const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); }