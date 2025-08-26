import { MDXRemote } from "next-mdx-remote";
import { GetStaticPropsContext, NextPageWithLayout } from "next";
import { Heading, Flex, VStack, Text, Link, Box, Stack } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../../components/Layout";
import { getAllSlugs, getPost, getAllPostData, Post as PostMetadata } from "../../lib/writing";
import { Content } from "../../lib/mdx";
import { NextSeo } from "next-seo";

interface PostProps {
  post: Content<PostMetadata>;
  posts: PostMetadata[];
}

const Post: NextPageWithLayout<PostProps> = ({ post, posts }) => {
  return (
    <>
      <NextSeo
        title={post.metadata.title}
        description={post.metadata.description}
        openGraph={{
          title: post.metadata.title,
          description: post.metadata.description,
          images: post.metadata.image ? [
            {
              url: post.metadata.image,
            },
          ] : undefined,
        }}
      />
      <Flex direction="column" gap={2}>
        <Heading size="lg">{post.metadata.title}</Heading>
        <Prose>
          <MDXRemote compiledSource={post.source} />
        </Prose>
      </Flex>
    </>
  );
};

export default Post;

Post.getLayout = (page) => (
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
            .filter((post: PostMetadata) => post.category === "essays" || !post.category)
            .map((post: PostMetadata) => (
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
            .filter((post: PostMetadata) => post.category === "more")
            .map((post: PostMetadata) => (
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

export async function getStaticPaths() {
  const paths = getAllSlugs();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.slug || typeof params.slug !== "string") {
    return { redirect: { destination: "/" } };
  }

  const post = await getPost(params.slug as string);
  if (!post) {
    return { redirect: { destination: "/" } };
  }

  const posts = getAllPostData();
  return { props: { post, posts } };
}
