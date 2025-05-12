import MainBanner from "@/components/HomePage/MainBanner/MainBanner";

import icoone from "@/assets/icoone.jpg";

export default function AllTreatments() {
  return (
    <>
      {/* <BreadcrumbBlog className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto" /> */}
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <MainBanner
            headerText="Wszystkie zabiegi"
            customImage={icoone}
            customAlt="Zabieg antycellulitowy urządzeniem Icoone wykonywany na udach pacjentki."
          />
          {/* <PostsList postsDetails={posts} /> */}
        </section>
      </main>
    </>
  );
}
