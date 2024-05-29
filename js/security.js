

function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수


function init_logined(){
    if(sessionStorage){
    decrypt_text(); // 복호화 함수
   }
    else{
    alert("세션 스토리지 지원 x");
    }
    }
