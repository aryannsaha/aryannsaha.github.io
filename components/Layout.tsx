import {
  Container,
  VStack,
  Text,
  Flex,
  Box,
  HStack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { FiMenu } from "react-icons/fi";

function Navigation({
  link,
  children,
  isExternal,
}: {
  link: string;
  children: string;
  isExternal?: boolean;
}) {
  const router = useRouter();
  const isActive =
    link === "/" ? router.asPath === link : router.asPath.includes(link);

  return (
    <Link
      href={link}
      target={isExternal ? "_blank" : "_self"}
      color={isActive ? "black" : "gray.500"}
      _hover={{ color: "black" }}
    >
      <Text fontSize="xl">{children}</Text>
    </Link>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container
      position="relative"
      mt={{ base: 16, lg: 32 }}
      pb={{ base: 8, md: "10em" }}
      px={{ base: 8, md: 16 }}
      maxW="container.xl"
    >
      <Flex
        position="fixed"
        top={0}
        left={0}
        width="100%"
        bg="white"
        zIndex={100}
        display={{ base: "none", lg: "flex" }}
        justify="center"
        py={8}
      >
        <Flex justify="center" align="center" width="50%" px={0}>
          <HStack spacing={6}>
            <Navigation link="/">Home</Navigation>
            <Navigation link="/writing">Writing</Navigation>
            <Navigation link="/reading">Reading</Navigation>
          </HStack>
        </Flex>
      </Flex>
      <Container width="60%" maxW="60%" position="relative">
        <Flex
          justify="space-between"
          position="fixed"
          top={0}
          display={{ base: "flex", lg: "none" }}
          height={12}
          zIndex={50}
          left={0}
          width="100%"
          align="center"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          bg="white"
        >
          <Container px={8}>
            <Flex justify="space-between" width="100%">
              <HStack spacing={8}>
                <Navigation link="/">Home</Navigation>
                <Navigation link="/writing">Writing</Navigation>
                <Navigation link="/reading">Reading</Navigation>
              </HStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={FiMenu} boxSize={4} />}
                  variant="outline"
                  size="sm"
                />
                <MenuList>
                  <MenuGroup title="NAVIGATION">
                    <VStack align="flex-start" px={4} spacing={3} mb={4}>
                      <Navigation link="/">Home</Navigation>
                      <Navigation link="/writing">Writing</Navigation>
                      <Navigation link="/reading">Reading</Navigation>
                    </VStack>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Container>
        </Flex>
        {children}
      </Container>
    </Container>
  );
}

export default Layout;
