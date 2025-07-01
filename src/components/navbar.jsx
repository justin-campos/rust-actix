import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#005da6" }}>
            <Toolbar sx={{ minHeight: 28, height: 28, paddingLeft: 1, paddingRight: 1 }}>
                <Box
                    component="img"
                    src="/fleming-horizontal-copy.png"
                    alt="Logo"
                    sx={{
                        height: 28,
                        display: "block",
                        userSelect: "none",
                    }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
