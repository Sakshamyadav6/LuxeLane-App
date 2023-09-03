import { Icon, IconButton, LightMode } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";

export const FavouriteButton = ({
  isFavorited,
  onClick,
  position,
  top,
  right,
}) => (
  <LightMode>
    <IconButton
      isRound
      bg={isFavorited ? "red.500" : "white"}
      color={isFavorited ? "white" : "gray.900"}
      size="sm"
      _hover={{ transform: "scale(1.1)" }}
      sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
      transition="all 0.15s ease"
      icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
      boxShadow="base"
      onClick={onClick}
      position={position || "absolute"}
      top={top || "4"}
      right={right || "4"}
    />
  </LightMode>
);
