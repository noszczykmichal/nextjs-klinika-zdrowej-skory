import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import { PostDetails } from "@/types/types";
import Post from "@/components/BlogPage/Category/PostPage/Post/Post";

const POST_QUERY = `*[_type == "post" && slug.current == $slug]{altForMainImage, publishedAt, mainImage, title, summary, postContent, category->{title, categorySlug}, treatment->{treatmentSlug, treatmentGroup->{groupSlug}}, treatmentGroup->{groupSlug}}[0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const post = await client.fetch<PostDetails>(
    POST_QUERY,
    await params,
    options,
  );

  const { title: postTitle, category } = post;
  const { title: categoryTitle } = category;
  // const publishAt = new Date(post.publishedAt).toLocaleDateString();
  const routeParams = await params;
  const routesData = [
    {
      routeName: "Blog",
      url: "/blog",
    },
    { routeName: `${categoryTitle}`, url: `/blog/${routeParams.category}` },
    {
      routeName: `${postTitle}`,
    },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <Post postData={post} />
    </LayoutWrapper>
  );
}
