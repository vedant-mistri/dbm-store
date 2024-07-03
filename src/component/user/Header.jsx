import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Box,
  Container,
  FormControl,
  Select,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  changeCurrency,
  setExchangeRates,
} from "../../redux/currency/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../util/axiosInstance";
import { CURRENCIES } from "../currency/currency";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currency.currency);
  const exchangeRates = useSelector((state) => state.currency.exchangeRates);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [currency, setCurrency] = useState(currencies);
  const [exchangeRate, setExchangeRate] = useState(exchangeRates);
  const [isAddIcon, setIsAddIcon] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axiosInstance.get("/app");
        const data = response?.data?.data?.currencyRates;
        setExchangeRate(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCurrencies();
  }, [dispatch]);

  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    const eRate = exchangeRate[selectedCurrency];
    setCurrency(selectedCurrency);
    dispatch(changeCurrency(selectedCurrency));
    dispatch(setExchangeRates(eRate));
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@digibulkmarketing.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:18008898358";
  };

  const socialMediaIcons = [
    { icon: <XIcon fontSize="small" />, link: "https://www.twitter.com" },
    {
      icon: <FacebookIcon fontSize="small" />,
      link: "https://www.facebook.com",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://www.instagram.com",
    },
  ];

  const toggleIcon = () => {
    setIsAddIcon((prevState) => !prevState);
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div style={{ backgroundColor: "#000" }}>
      <Container
        sx={{
          height:
            isSmallScreen || isXSmallScreen
              ? isExpanded
                ? "80px" // Height when expanded
                : "50px" // Height when collapsed
              : "auto",
          transition: "height 0.3s ease-in-out", // Add transition for height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden", // Ensure overflow is hidden for better scroll behavior
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Box for Email and Phone */}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {/* Email */}
            <Typography
              component="a"
              href="mailto:info@digibulkmarketing.com"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                textDecoration: "none",
                marginRight: "10px",
              }}
              onClick={handleEmailClick}
            >
              <EmailIcon
                sx={{ fontSize: "medium", color: "#fff", marginLeft: "4px" }}
              />
              <span style={{ marginLeft: "5px" }}>
                info@digibulkmarketing.com
              </span>
            </Typography>
            {/* Phone */}
            <Typography
              component="a"
              href="tel:18008898358"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                textDecoration: "none",
                marginLeft: "20px",
              }}
              onClick={handlePhoneClick}
            >
              <CallIcon
                sx={{ fontSize: "medium", color: "#fff", marginLeft: "-17px" }}
              />
              <span style={{ marginLeft: "5px" }}>1800-889-8358</span>
            </Typography>
          </Box>

          {(isExpanded || (!isSmallScreen && !isXSmallScreen)) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
                // mt: isSmallScreen ? 1 : 0, // Add margin-top for small screens
              }}
            >
              <FormControl variant="standard" sx={{ color: "#fff" }}>
                <Select
                  labelId="currency-select-label"
                  id="currency-select"
                  value={currency}
                  onChange={handleChange}
                  label="Currency"
                  MenuProps={MenuProps}
                  sx={{
                    ".MuiSelect-icon": { color: "#fff" },
                    ".MuiInputBase-input": { color: "#fff", cursor: "pointer" },
                    cursor: "pointer",
                    marginLeft: "4px",
                  }}
                >
                  {CURRENCIES?.map((currency, index) => (
                    <MenuItem key={index} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {socialMediaIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    cursor: "pointer",
                    color: "#fff",
                    textDecoration: "none",
                    marginRight: "5px",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </Box>
          )}
        </Box>
        {isSmallScreen || isXSmallScreen ? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={toggleIcon}
          >
            {isAddIcon ? <AddRoundedIcon /> : <RemoveRoundedIcon />}
          </Box>
        ) : null}
      </Container>
    </div>
  );
};

export default Header;
