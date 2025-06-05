import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  Container,
  Button,
  Typography,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import theme from '../theme';
import '../login.css';

const googleButtonStyle = {
  height: 56,
  borderRadius: 0.5,
  color: '#000',
  borderColor: '#E1E1E1',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': { borderColor: '#BDBDBD' },
  '&.Mui-focused': { borderColor: '#E1E1E1' },
  '&:focus': { borderColor: '#E1E1E1', boxShadow: 'none' },
};

const loginButtonStyle = {
  ...googleButtonStyle,
  backgroundColor: '#FFC107',
  color: '#fff',
  '&:hover': { backgroundColor: '#e6b306' },
};

interface LoginProps {
  auth: {
    login: (providerName: string) => Promise<{ user: { uid: string } }>;
    onAuthChange: (callback: (user: { uid: string } | null) => void) => void;
  };
}

const Login: React.FC<LoginProps> = ({ auth }) => {
  const navigate = useNavigate();

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    const providerName = e.currentTarget.textContent || '';
    auth.login(providerName).then((data) => {
      console.log('Login success:', data.user.uid);
    });
  };

  const goToContact = useCallback(
    (userId: string) => {
      navigate('/contact', { state: { id: userId } });
    },
    [navigate]
  );

  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        console.log('User ID:', user.uid);
      }
    });
  }, [auth, goToContact]);

  return (
    <Container sx={{ pt: theme.customSpacing.pagePaddingTop, pb: theme.customSpacing.pagePaddingBottom }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, position: 'relative' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ position: 'absolute', left: 0, pl: 0 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" align="center">로그인</Typography>
      </Box>

      {/* 입력 필드 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Typography fontWeight="bold">Your Email</Typography>
        <TextField placeholder="이메일 입력" fullWidth variant="outlined" />

        <Typography fontWeight="bold">Password</Typography>
        <TextField placeholder="비밀번호 입력" fullWidth type="password" variant="outlined" />
      </Box>

      {/* 비밀번호 찾기 */}
      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <Typography component="a" href="#" fontSize={14} color="black">
          Forgot Password?
        </Typography>
      </Box>

      {/* 로그인 버튼 */}
      <Box sx={{ mt: 3 }}>
        <Button fullWidth sx={loginButtonStyle}>Login</Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3 }}>Or</Divider>

      {/* Google 버튼 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth onClick={onLogin} variant="outlined" sx={googleButtonStyle}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width={20} style={{ marginRight: 8 }} />
          Login with Google
        </Button>

        <Button fullWidth onClick={onLogin} variant="outlined" sx={googleButtonStyle}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width={20} style={{ marginRight: 8 }} />
          Sign up with Google
        </Button>
      </Box>

      {/* 회원가입입 */}
      <Typography align="center" color="#E1E1E1" mt={3}>
        Don't have an account?{' '}
        <Typography component="a" href="#" sx={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>
          Sign up
        </Typography>
      </Typography>
    </Container>
  );
};

export default Login;
