import { notFound } from "next/navigation";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import Post from "@/components/BlogPage/Category/PostPage/Post/Post";
import { getSinglePostData } from "@/utils/sanityPageData";
import { createPostMetaData } from "@/utils/metadata";
import { categoryGuard } from "@/utils/clientSideUtils";

export const generateMetadata = createPostMetaData();

export default async function PostPage({
  params,
}: {
  params: Promise<{ postCategory: string; post: string }>;
}) {
  const { postCategory: categoryFromParams, post } = await params;
  const fetchedData = await getSinglePostData({ post });

  if (!fetchedData) {
    return notFound();
  }

  const { postData, imageData } = fetchedData;
  const { title: postTitle, category } = postData;
  const { title: categoryTitle } = category;

  const categorySlugFromSanity = category?.categorySlug?.current;

  categoryGuard({
    categoryFromParams,
    categorySlugFromSanity,
    resourceSlugFromParams: post,
    mainRoute: "blog",
  });

  const postDetails = { ...postData, imageData };

  const routeParams = await params;
  const routesData = [
    {
      routeName: "Blog",
      url: "/blog",
    },
    { routeName: `${categoryTitle}`, url: `/blog/${routeParams.postCategory}` },
    {
      routeName: `${postTitle}`,
    },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <Post postData={postDetails} />
    </LayoutWrapper>
  );
}
