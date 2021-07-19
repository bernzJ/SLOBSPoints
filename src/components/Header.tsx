import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { useToggle } from "react-use";

import routes from "../routes";
import { Link as DomLink, useLocation } from "react-router-dom";

const NavLink = ({
  children,
  to,
  selected,
}: {
  children: React.ReactNode;
  to: string;
  selected: boolean;
}) => (
  <Link
    as={DomLink}
    to={to}
    mx={{ base: "32px", sm: "12px" }}
    my="12px"
    display={{
      base: "block",
      sm: "inline-block",
    }}
    _hover={{ textDecoration: "none", borderBottom: "solid 2px #9147ff" }}
    textDecoration="none"
    fontWeight="semibold"
    fontSize="medium"
    textTransform="uppercase"
    borderBottom={selected && "solid 2px #9147ff"}
  >
    {children}
  </Link>
);

const Header = (): JSX.Element => {
  const [on, toggle] = useToggle(false);
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems="center" justify="flex-end" flexWrap="wrap" p="20px">
      <IconButton
        size="md"
        icon={
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </Box>
        }
        aria-label="Open Menu"
        display={{ base: "inherit", sm: "none" }}
        onClick={toggle}
      />

      <HStack
        as="nav"
        w={{ base: "100%", sm: "inherit" }}
        display={{ base: on ? "flex" : "none", sm: "flex" }}
        flexDir={{ base: "column", sm: "row" }}
        shouldWrapChildren
      >
        {Object.entries(routes).map(([k, { path }]) => (
          <NavLink key={k} to={path} selected={path === pathname}>
            {k}
          </NavLink>
        ))}
        <Button size="sm" onClick={toggleColorMode}>
          {colorMode === "dark" ? (
            <Box
              as="svg"
              xmlns="http://www.w3.org/2000/svg"
              h="20px"
              w="20px"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </Box>
          ) : (
            <Box
              as="svg"
              xmlns="http://www.w3.org/2000/svg"
              h="20px"
              w="20px"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </Box>
          )}
        </Button>
      </HStack>
    </Flex>
  );
};

export default Header;
