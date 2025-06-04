import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useHistory' 대신 'useNavigate'
import Header from './header.tsx';
import "../login.css"

interface LoginProps {
    auth: {
        login: (providerName: string) => Promise<{ user: { uid: string } }>;
        onAuthChange: (callback: (user: { uid: string } | null) => void) => void;
    };
}

const Login: React.FC<LoginProps> = ({ auth }) => {
    const navigate = useNavigate(); // useNavigate 사용

    const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        const providerName = e.currentTarget.textContent || "";
        auth.login(providerName)
            .then((data: { user: { uid: string } }) => goToContact(data.user.uid));
    };

    const goToContact = useCallback((userId: string) => {
        navigate('/contact', { state: { id: userId } }); // useNavigate 적용
    }, [navigate]);

    useEffect(() => {
        auth.onAuthChange(user => { 
            if (user) {
                console.log("User ID:", user.uid);
                goToContact(user.uid);
            }
        });
    }, [auth, goToContact]);

    return (
        <section>
            <Header />
            <div className='home'>
                <div className='login-header'>
                    <button className='backbutton'>&lt;</button>
                    <h1 className='login-title'>로그인</h1>
                </div>
                <div className='center'>
                    <p style={{fontWeight:'bold'}}>Your Email</p>
                    <input
                        type='email'
                        placeholder='이메일 입력'
                    />
                    <p style={{fontWeight:'bold'}}>Password</p>
                    <input
                        type='password'
                        placeholder='비밀번호 입력'
                    />
                </div>
                <div style={{textAlign:'right'}}>
                    <a href="#">Forgot Password?</a>
                </div>
                <div className='login-buttons'>
                    <button className='normalLogin'>Login</button>
                </div>
                <div className="divider">
                    <span>Or</span>
                </div>

                <div className="login-buttons">
                    <button className='googleLogin' onClick={onLogin}>
                        <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
                        />Login with Google</button>
                    <button className='googleLogin' onClick={onLogin}>
                        <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
                        />Sign up with Google</button>
                </div>
                <div>
                    <p style={{textAlign: 'center', color:'#E1E1E1'}}>Don't have an acount? <a href="#">Sign up</a></p>
                </div>
            </div>
        </section>
    );
};

export default Login;