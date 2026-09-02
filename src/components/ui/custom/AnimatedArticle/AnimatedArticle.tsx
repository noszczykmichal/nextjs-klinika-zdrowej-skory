"use client";

import { useState } from "react";
import { PortableText, PortableTextBlock } from "next-sanity";
import { RevealWrapper } from "next-reveal";

import CategoryResourceList from "@/components/ui/custom/AnimatedArticle/CategoryResourceList/CategoryResourceList";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";
import {
  BasicEntityReference,
  ListItemData,
  ResourceType,
} from "@/types/types";
import AppDialog from "@/components/ui/custom/AppDialog/AppDialog";
import CourseEnrollmentForm from "@/components/ui/custom/CourseEnrollmentForm/CourseEnrollmentForm";

interface AnimatedArticleProps {
  articleContent: PortableTextBlock[];
  categoryResources?: ListItemData[];
  resourceType?: ResourceType;
  isDetailPage?: boolean;
  availableTrainings?: BasicEntityReference[];
}

export default function AnimatedArticle({
  articleContent,
  categoryResources,
  resourceType,
  isDetailPage = false,
  availableTrainings = [],
}: AnimatedArticleProps) {
  const isResourceListVisible = categoryResources && resourceType;
  const isActionButtonVisible = isDetailPage && resourceType === "training";
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function dialogCloseHandler() {
    setIsDialogOpen(false);
  }

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

        <AppDialog
          isTriggerVisible={isActionButtonVisible}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <CourseEnrollmentForm
            availableTrainings={availableTrainings}
            onSubmit={dialogCloseHandler}
          />
        </AppDialog>

        {isResourceListVisible && (
          <CategoryResourceList
            resources={categoryResources}
            resourceType={resourceType}
          />
        )}
      </article>
    </RevealWrapper>
  );
}
