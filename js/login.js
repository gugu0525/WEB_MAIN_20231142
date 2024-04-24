
    if (emailValue.length < 5) {
    alert('아이디는최소5글자이상입력해야합니다.');
    return false;
    }

    if (passwordValue.length < 12) {
        alert('비밀번호는반드시12글자이상입력해야합니다.');
        return false;
        }
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는특수문자를1개이상포함해야합니다.');
        return false;
        }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는대소문자를1개이상포함해야합니다.');
        return false;
    }
       
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

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
        loginForm.submit();
    };

    document.getElementById("login_btn").addEventListener('click', check_input);

    
