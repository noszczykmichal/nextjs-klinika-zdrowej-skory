// export const decodeSlug = (slug: string) => {
//   const categoryLabel = slug.split("-");
//   const uppercaseFirstWord =
//     categoryLabel[0].split("")[0].toUpperCase() +
//     categoryLabel[0].split("").slice(1).join("");
//   const restOfCategoryName = categoryLabel.slice(1).join(" ");
//   const updatedCategoryName = uppercaseFirstWord + " " + restOfCategoryName;

//   return updatedCategoryName;
// };

export const formatDate = (isoString: string, locale: string = "pl-PL") => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
