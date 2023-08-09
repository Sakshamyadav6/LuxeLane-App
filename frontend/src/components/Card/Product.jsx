import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { FavouriteButton } from "./FavouriteButton";

const product = ({ product }) => {
  return (
    <>
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
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              12 Reviews
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full">
            Add to cart
          </Button>
          <Link
            textDecoration="underline"
            fontWeight="medium"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Quick shop
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default product;
