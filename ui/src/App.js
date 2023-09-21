// React imports
import React, { useEffect, useState } from "react";

// Component imports
import { constants } from "./constants/constants";
import {
  Heading,
  Quantity,
  FeatureImage,
  SubImage,
} from "./constants/theme-constants";
import "./App.css";
import { getProductByProductID } from "./services/product";
import MenuBar from "./components/menu_bar.js";

// MUI imports
import {
  Grid,
  Card,
  Toolbar,
  Breadcrumbs,
  Link,
  Box,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function App() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(constants.productID);
  }, []);

  /**
   * Function to get the product
   */
  const getProduct = (productID) => {
    getProductByProductID(productID).then((response) => {
      console.log("response", response.data.description);
      setProduct(response.data);
    });
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "3rem" }}>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Home
          </Link>
          <Typography color="text.primary">Chair</Typography>
        </Breadcrumbs>
        <Heading variant="h5">{product?.name}</Heading>
        <Heading variant="h5">${product?.price}</Heading>
        <div style={{ marginBottom: "2rem" }}>
          <Quantity />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "#f0a822",
              },
            }}
          >
            add to cart
          </Button>
        </div>
        <Heading variant="h5">Product Details</Heading>
        <Typography sx={{ maxWidth: "30rem" }}>
          {product?.description}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  return (
    <div className="App">
      <MenuBar />
      <Toolbar />
      <Grid container>
        <Grid
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
          sx={{ marginTop: "3rem", maxHeight: "30rem" }}
        >
          <FeatureImage src={product.image}></FeatureImage>
          <Grid container>
            {product?.subImages &&
              product?.subImages.map((image) => {
                return (
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <SubImage src={image}></SubImage>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          sm={6}
          xs={12}
          sx={{ textAlign: "start", marginTop: "3rem" }}
        >
          <Box style={{ border: "none", boxShadow: "none" }}>
            <Card style={{ border: "none", boxShadow: "none" }}>{card}</Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
