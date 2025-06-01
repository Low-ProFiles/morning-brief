import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

export default function BottomBar() {
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={(event, newValue) => setValue(newValue)} showLabels>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Podcasts" icon={<HeadphonesIcon />} />
                <BottomNavigationAction label="User" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
