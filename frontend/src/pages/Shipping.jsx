import { React, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form } from "react-bootstrap";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../slice/cartSlice";
const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SubmitHandle = (e) => {
    e.preventDefault();
    const data = { address, city, postalcode, country };
    dispatch(addShippingAddress(data));

    navigate("/payment");
  };
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 />
        <Form onSubmit={SubmitHandle}>
          <TextField
            variant="outlined"
            label="Enter Address"
            fullWidth
            margin="normal"
            id="address"
            name="address"
            autoFocus
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Enter City"
            fullWidth
            margin="normal"
            id="city"
            name="city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Enter Postal Code"
            fullWidth
            margin="normal"
            id="postalcode"
            name="postalcode"
            value={postalcode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Enter Country"
            fullWidth
            margin="normal"
            id="country"
            name="country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className="mb-4"
          >
            Next
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
