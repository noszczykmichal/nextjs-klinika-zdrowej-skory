"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { PortableText, PortableTextBlock } from "next-sanity";
import { RevealWrapper } from "next-reveal";

import CategoryResourceList from "@/components/ui/custom/AnimatedArticle/CategoryResourceList/CategoryResourceList";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";
import { ListItemData, ResourceType } from "@/types/types";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import { Form } from "react-final-form";
import CourseEnrollmentForm from "@/components/ui/custom/CourseEnrollmentForm/CourseEnrollmentForm";

interface AnimatedArticleProps {
  articleContent: PortableTextBlock[];
  categoryResources?: ListItemData[];
  resourceType?: ResourceType;
  isDetailPage?: boolean;
}

export default function AnimatedArticle({
  articleContent,
  categoryResources,
  resourceType,
  isDetailPage = false,
}: AnimatedArticleProps) {
  const isResourceListVisible = categoryResources && resourceType;
  const isActionButtonVisible = isDetailPage && resourceType === "training";
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formOpenHander = () => {
    setIsFormOpen(true);
    const body = document.body;
    body.classList.toggle("overflow-hidden");
  };

  const formCloseHandler = () => {
    setIsFormOpen(false);
    const body = document.body;
    body.classList.toggle("overflow-hidden");
  };

  const submitHandler = () => {};

  return (
    <RevealWrapper
      origin="bottom"
      distance="20px"
      duration={500}
      delay={200}
      viewFactor={0.1}
      easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
      className="md:order-2"
    >
      <article>
        <PortableText
          value={articleContent}
          components={portableTextComponentConfig}
        />
        {isFormOpen &&
          createPortal(
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="fixed top-0 left-0 z-10 flex h-[100vh] w-[100vw] justify-center backdrop-blur-sm"
              onClick={formCloseHandler}
            >
              <Form
                onSubmit={submitHandler}
                render={({
                  handleSubmit,
                  submitting,
                  submitSucceeded,
                  form,
                }) => (
                  <CourseEnrollmentForm
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                    submitSucceeded={submitSucceeded}
                    formRestartHandler={() => form.restart()}
                    errorData={{ errorMessage: "", hasError: false }}
                    setErrorHandler={null}
                  />
                )}
              />
            </div>,
            document.getElementById("overlay-root") as HTMLDivElement,
          )}

        {isResourceListVisible && (
          <CategoryResourceList
            resources={categoryResources}
            resourceType={resourceType}
          />
        )}
        {isActionButtonVisible && (
          <OutlineButton onClick={formOpenHander}>
            Zapisz się na szkolenie
          </OutlineButton>
        )}
      </article>
    </RevealWrapper>
  );
}
