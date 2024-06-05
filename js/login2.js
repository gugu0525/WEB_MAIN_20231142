
function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수





const check_input = () => {

    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
        }
    
        if (passwordValue.length < 12) {
            alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
            return false;
            }
        const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
        if (!hasSpecialChar) {
            alert('패스워드는 특수 문자를 1개 이상 포함해야 합니다.');
            return false;
            }
        const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
        const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
        if (!hasUpperCase || !hasLowerCase) {
            alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
            return false;

            const sanitizedPassword = 
            check_xss(passwordValue);
             // check_xss 함수로 비밀번호 Sanitize
             const sanitizedEmail = check_xss(emailValue);
             // check_xss 함수로 비밀번호 Sanitize

             if (!sanitizedEmail) {
                // Sanitize된 비밀번호 사용
               return false;
                }

            if (!sanitizedPassword) {
                // Sanitize된 비밀번호 사용
                return false;
                }
    }
       
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);


    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
        }
    
    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
        }

        console.log('이메일:', emailValue);
        console.log('비밀번호:', passwordValue);


    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
	if(idsave_check.checked == true) { // 아이디 체크 o
		alert("쿠키를 저장합니다.", emailValue);
		setCookie("id", emailValue, 1); // 1일 저장 
        alert("쿠키 값 :" + emailValue);
    } 
    else
    { // 아이디 체크 x 
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제 
    }

    session_set(); // 세션 생성
        loginForm.submit();
    };

    document.getElementById("logout_btn").addEventListener('click', logout);


function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
        
    if(get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
    }

    if(get_id) { 
        id.value = get_id; 
        check.checked = true; 
        }
         session_check(); // 세션 유무 검사
    }
        


function session_set() { //세션 저장 
    let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
    if (sessionStorage) {
    let en_text = encrypt_text(session_pass.value);
    sessionStorage.setItem("Session_Storage_id", session_id.value);
    sessionStorage.setItem("Session_Storage_pass", en_text);;

    } else {
        alert("로컬 스토리지 지원 x");
        }
        }
    

function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
        } else {
        alert("세션 스토리지 지원 x");
    }
}

    function session_check() { //세션 검사
        if (sessionStorage.getItem("Session_Storage_id")) {
         alert("이미 로그인 되었습니다.");
         location.href="..login/index_login.html"; // 로그인된 페이지로 이동
        }
         }



    function session_del() {//세션 삭제
            if (sessionStorage) {
             sessionStorage.removeItem("Session_Storage_test");
             alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
             } else {
             alert("세션 스토리지 지원 x ");
             }
        }
    

    function logout(){
    session_del(); // 세션 삭제
    location.href='../index.html';
    }


function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
    }



function encrypt_text(password){
    const k = "key"; // 클라이언트 키
   const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}



function decrypt_text(){
    const k = "key"; // 서버의 키
   const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); 
}


