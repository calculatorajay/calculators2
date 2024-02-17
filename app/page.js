"use client";

import Image from "next/image";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"

const drawerWidth = 240;

export default function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [calStatus, setCalStatus] = React.useState("factor");
  const [factorInput, setFactorInput] = React.useState();
  const [factorOutput, setFactorOutput] = React.useState("");
  const [rowOutput, setRowOutput] = React.useState(4);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerData = (DrawerCalculator) => {
    setCalStatus(DrawerCalculator);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Factors"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Factors"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"HCF"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"HCF"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"LCM"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"LCM"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Power"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Power"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Square Root"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Square Root"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Roots of quardic equation"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Roots of quardic equation"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getFactor = () => {
    const primes = findPrimes(Math.floor(factorInput / 2));
    let ouputCreate = "";
    const factors = findPrimeFactors(factorInput, primes);
    for (let i = 0; i < factors[0].length; i++) {
      if (factors[1].length == 0) {
        ouputCreate =
          ouputCreate + " " + factors[0][i] + " | " + factors[0][i] + "\n";
        setRowOutput(2);
      } else {
        ouputCreate =
          ouputCreate + " " + factors[0][i] + " | " + factors[1][i] + "\n";
        setRowOutput(factors[0].length + 1);
      }
    }
    ouputCreate += "    | 1";
    setFactorOutput(ouputCreate);
  };

  function findPrimes(n) {
    if (n <= 1) {
      return [];
    }
    if (n <= 3) {
      return [2, 3];
    }
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }

    return primes;
  }

  function findPrimeFactors(number, primes) {
    if (number <= 1 || !primes || !primes.length) {
      return [];
    }
    const primeFactors = [];
    const divideResult = [];
    for (const prime of primes) {
      while (number % prime === 0) {
        primeFactors.push(prime);
        divideResult.push(number);
        number /= prime;
      }
    }
    if (number > 1) {
      primeFactors.push(number);
    }
    return [primeFactors, divideResult];
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 bg-slate-100">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {calStatus == "factor" ? <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            m: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            borderRadius: 3,
          }}
          bgcolor={"white"}
        >
          <Box
            id="factor"
            sx={{
              width: "100%",
            }}
          >
            <div>
            <TextField
              id="outlined-number"
              label="Enter Number"
              type="number"
              inputProps={{maxLength : 8}}
              display="block"
              onChange={(e) => setFactorInput(e.target.value)}
              sx={{
                width: "90%",
                mx: 2,
                my: 2,
              }}
            />
            <Alert severity="info" sx={{width: "90%", m: 2,}}>Number should not be more than 8 characters long.</Alert>
            </div>
            <Button
              variant="contained"
              sx={{ width: "90%", mx: 2, my: 2 }}
              onClick={() => getFactor()}
            >
              Calculate
            </Button>
            <TextField
              id="outlined-multiline-static"
              label="Factors"
              disabled={true}
              multiline
              rows={rowOutput}
              value={factorOutput}
              sx={{
                width: "90%",
                mx: 2,
                my: 2,
              }}
            />
          </Box>
        </Box> : (calStatus == "HCF" ? <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            m: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            borderRadius: 3,
          }}
          bgcolor={"white"}
        >
          <Box
            id="factor"
            sx={{
              width: "100%",
            }}
          >
            <TextField
              id="outlined-number"
              label="Enter Number"
              type="number"
              display="block"
              inputProps={{ maxLength: 8}}
              onChange={(e) => setFactorInput(e.target.value)}
              sx={{
                width: 250,
                mx: 2,
                my: 2,
              }}
            />
            <Button
              variant="contained"
              sx={{ width: 250, mx: 2, my: 2 }}
              onClick={() => getFactor()}
            >
              Calculate
            </Button>
            <TextField
              id="outlined-multiline-static"
              label="Factors"
              disabled={true}
              multiline
              rows={rowOutput}
              value={factorOutput}
              display="block"
              sx={{
                width: 250,
                mx: 2,
                my: 2,
              }}
            />
          </Box>
        </Box> : "")}
      </Box>
    </main>
  );
}
