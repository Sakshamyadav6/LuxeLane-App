import React from "react";
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
import { Link, useParams } from "react-router-dom";
import { PriceTag } from "./PriceTag";
import { FavouriteButton } from "./FavouriteButton";
import Rating from "./Rating";

const product = ({ product }) => {
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
             />
           </Box>
           <Stack>
             <Stack spacing="1">
               <Text
                 fontWeight="medium"
                 isTruncated
                 color={useColorModeValue("gray.700", "gray.400")}
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
                 text={`${
                   product.Reviews ? product.Reviews.length : 0
                 } reviews`}
               />
             </HStack>
           </Stack>
           <Stack align="center">
             <Button colorScheme="yellow" width="full">
               Add to cart
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
     </>
   );
};

export default product;
