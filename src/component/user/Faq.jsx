import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, Controller } from "react-hook-form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import contactFormImg from "../image/ContactForm.png";
import { makeStyles } from "@mui/styles";

const SITE_KEY = "6LcNLbMpAAAAAHT-3b_fICQjCcUEivSg53-srBQn";

const faqData = [
  {
    title: "What WhatsApp tool do you provide?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "What WhatsApp tool do you provide?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "What WhatsApp tool do you provide?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "What WhatsApp tool do you provide?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "What WhatsApp tool do you provide?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

const CustomLeftArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      backgroundColor: "#0084FE",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: "30px",
      zIndex: 1,
    }}
  >
    <KeyboardArrowLeftRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  </Box>
);

const CustomRightArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      backgroundColor: "#0084FE",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: "30px",
      zIndex: 1,
    }}
  >
    <KeyboardArrowRightRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  </Box>
);

const useStyles = makeStyles({
  dotList: {
    margin: "20px 0",
  },
});

const Faq = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(0);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.digibulkmarketing.com/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const carouselResponsive = {
    all: { breakpoint: { max: 4000, min: 0 }, items: 1 },
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!products) {
    return null;
  }

  return (
    <Box sx={{ background: "#f4f4f4" }}>
      <Container>
        <Box pb={8} textAlign="center">
          <Typography
            fontWeight={600}
            sx={{
              background: "#f4f4f4",
              fontSize: { xs: "20px", sm: "30px", md: "45px" },
            }}
          >
            Frequently
            <Box
              component="span"
              sx={{
                color: "primary.main",
                mx: 1,
              }}
            >
              Asked
            </Box>
            Questions
          </Typography>
          <Typography variant="h6" color="khaki">
            Getting more information about our platform that will help you get
            all benefits from us.
          </Typography>
          <Typography variant="h6" color="khaki">
            These all questions are asked for the first time
          </Typography>
        </Box>
        <Grid container spacing={5} pb={5}>
          <Grid item xs={12} md={6}>
            {faqData.map((item, index) => (
              <Accordion
                sx={{ my: 2, py: 1 }}
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ background: "#1783FE", p: 3, color: "#fff" }}
                >
                  <Typography>{item.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            <Typography mt={3} variant="h5">
              Can't find an answer to your question?
            </Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: "10px", py: 1, my: 1 }}
            >
              Submit a request
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography mb={5} variant="h6" align="left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </Typography>

            <Carousel
              showDots
              responsive={carouselResponsive}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              dotListClass={classes.dotList}
            >
              {products.products.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    textAlign: "center",
                    borderRadius: "15px",
                    py: { xs: 5, md: 10 },
                  }}
                >
                  <img
                    width={250}
                    height={250}
                    src={item.image}
                    alt={item.name}
                  />
                </Card>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>

      <section id="contact">
        <Container>
          <Card
            style={{
              clipPath: "polygon(50% 0%, 35% 100%, 65% 100%)",
              transform: "translate(50%, 2%)",
              backgroundColor: "white",
              boxShadow: "none",
            }}
            sx={{ maxWidth: "50%", width: "100%", justifyContent: "center" }}
          >
            gh
          </Card>

          <Box
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "center" },
              backgroundColor: "#FFF",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "45%" },
                // marginBottom: { xs: 2, md: 0 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
              <img
                src={contactFormImg}
                alt="Working Professional"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: { xs: "100%", md: "55%" },
                paddingLeft: { xs: 0, md: 7 },
                paddingRight: { xs: 0, md: 5 },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="Name"
                        variant="standard"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Phone is required",
                      pattern: {
                        value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                        message: "Invalid Phone Number",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Phone"
                        variant="standard"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ""}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="email"
                        label="Email"
                        variant="standard"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="feedback"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Feedback is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="Feedback"
                        variant="standard"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.feedback}
                        helperText={
                          errors.feedback ? errors.feedback.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "space-between" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: { xs: 2, md: 0 },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <ReCAPTCHA
                      sitekey={SITE_KEY}
                      onChange={() => {}}
                      ref={React.createRef()}
                    />
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "100px", height: "40px" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </section>
    </Box>
  );
};

export default Faq;
