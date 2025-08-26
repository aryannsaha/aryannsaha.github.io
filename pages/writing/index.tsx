import {
  Heading,
  Link,
  Flex,
  Text,
  Stack,
  HStack,
  Divider,
  VStack,
  Box,
} from "@chakra-ui/react";
import { getAllPostData, Post } from "../../lib/writing";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { NextSeo } from "next-seo";

interface WritingProps {
  posts: Post[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  return (
    <>
      <NextSeo title="Writing" />
      <Box height="100vh" bg="white" />
    </>
  );
};

export default Writing;

Writing.getLayout = (page) => (
  <Layout>
    <Box position="relative">
      <Box
        width="250px"
        position="absolute"
        right="calc(100% + 15px)"
        top="0"
        height="calc(100vh - 200px)"
        overflowY="auto"
        display={{ base: "none", lg: "block" }}
        zIndex={5}
      >
        <VStack align="flex-start" spacing={3}>
          <Heading size="sm" color="gray.700">Essays</Heading>
          {page.props.posts
            .filter((post: Post) => post.category === "essays" || !post.category)
            .map((post: Post) => (
            <Stack key={post.title} width="100%" align="flex-start" spacing={1}>
              <Link
                href={post.url}
                target={post.external ? "_blank" : "_self"}
                color="blue.600"
              >
                <Text fontSize="sm">{post.title}</Text>
              </Link>
              <Text fontSize="xs" color="gray.500">
                {post.date}
              </Text>
            </Stack>
          ))}
          <Heading size="sm" color="gray.700" mt={4}>More</Heading>
          {page.props.posts
            .filter((post: Post) => post.category === "more")
            .map((post: Post) => (
            <Stack key={post.title} width="100%" align="flex-start" spacing={1}>
              <Link
                href={post.url}
                target={post.external ? "_blank" : "_self"}
                color="blue.600"
              >
                <Text fontSize="sm">{post.title}</Text>
              </Link>
              <Text fontSize="xs" color="gray.500">
                {post.date}
              </Text>
            </Stack>
          ))}
        </VStack>
      </Box>
      <Box maxWidth="70ch" mx="auto">
        {page}
      </Box>
    </Box>
  </Layout>
);

export async function getStaticProps() {
  const posts = getAllPostData();
  return { props: { posts } };
}
