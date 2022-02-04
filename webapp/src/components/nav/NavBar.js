import { AppBar, Container, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Logo Goes Here
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Typography>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/login">
                            Login
                        </Button>
                    </Typography>

                    <Typography>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </Typography>

                </Toolbar>
            </Container>

        </AppBar>
    )
}

