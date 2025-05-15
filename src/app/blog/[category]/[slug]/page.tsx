import { client } from "@/sanity/client";

import { BreadcrumbWrapper } from "@/components/ui/custom/BreadcrumbWrapper/BreadcrumbWrapper";
import { PostDetails } from "@/types/types";
import PostContentWrapper from "@/components/BlogPage/Category/PostPage/PostContentWrapper/PostContentWrapper";

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
    options
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
    <>
      <BreadcrumbWrapper routesData={routesData} />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <PostContentWrapper postData={post} />
        </section>
      </main>
    </>
  );
}
