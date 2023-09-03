import React, { useState, useEffect } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PriceTag } from "./PriceTag";
import { FavouriteButton } from "./FavouriteButton";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";

const product = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (quantity) => {
    if (isFavorited) {
      navigate("/cart");
      toast.warning("Product Already in Cart");
    } else {
      const data = payloadForCartItem(product.data, quantity);
      dispatch(addToCart(data));
      console.log(data);
      setIsFavorited(true);
      toast.success("Product Added To Cart");
      navigate("/cart");
    }
  };
  useEffect(() => {
    const existItem = cartItems.find((item) => item.productId === product._id);
    setIsFavorited(!!existItem);
  }, [cartItems, product._id]);

  const handleFavourite = (quantity) => {
    if (isFavorited) {
      dispatch(removeFromCart(product._id));
      toast.success("Product Removed From Cart");
    } else {
      const data = payloadForCartItem(product.data, quantity);
      dispatch(addToCart(data));
      setIsFavorited(true);
      toast.success("Product Added To Cart");
    }
    setIsFavorited(!isFavorited);
  };
  const payloadForCartItem = (data, qty) => {
    return {
      productId: product._id,
      productName: product.name,
      productImage: product.productImage,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1,
    };
  };
  return (
    <>
      <Container>
        <Stack spacing={{ base: "4", md: "5" }}>
          <Box position="relative">
            <AspectRatio ratio={5 / 3}>
              <Image
                src={product.productImage}
                alt={product.name}
                draggable="false"
                fallback={<Skeleton />}
                borderRadius={{ base: "md", md: "xl" }}
              />
            </AspectRatio>
            <FavouriteButton
              position="absolute"
              top="4"
              right="4"
              aria-label={`Add ${product.name} to your favourites`}
              isFavorited={isFavorited}
              onClick={handleFavourite}
            />
          </Box>
          <Stack>
            <Stack spacing="1">
              <Text
                fontWeight="medium"
                isTruncated
                color={useColorModeValue("gray.700", "gray.400")}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.name}
              </Text>
              <PriceTag
                price={product.price}
                salePrice={product.price}
                currency="USD"
              />
            </Stack>
            <HStack>
              <Rating
                value={product.averageRating}
                text={`${product.Reviews ? product.Reviews.length : 0} reviews`}
              />
            </HStack>
          </Stack>
          <Stack align="center">
            <Button
              colorScheme={isFavorited ? "purple" : "yellow"}
              width="full"
              disabled={isFavorited}
              onClick={() => handleAddToCart(qty)}
            >
              {isFavorited ? "Already in Cart" : "Add to Cart"}{" "}
            </Button>
            <Link
              to={`/product/${product.id}`}
              style={{
                textDecoration: "underline",
                marginBottom: "4px",
                color: "blue",
              }}
            >
              View Details
            </Link>
          </Stack>
        </Stack>
      </Container>
      <ToastContainer />
    </>
  );
};

export default product;
