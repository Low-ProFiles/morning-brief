// src/components/BottomBar.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = ["/", "/audio", "/mypage"];

  const activeIndex = paths.findIndex((path) => {
    if (path === "/mypage") {
      return location.pathname.startsWith(path);
    }
    return location.pathname === path;
  });

  const currentValue = activeIndex !== -1 ? activeIndex : 0;

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={currentValue}
        onChange={(event, newValue) => {
          navigate(paths[newValue]);
        }}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="News" icon={<HeadphonesIcon />} />
        <BottomNavigationAction label="My Page" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
