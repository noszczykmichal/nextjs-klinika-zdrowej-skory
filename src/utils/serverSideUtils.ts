import { getPlaiceholder } from "plaiceholder";

export const getImage = async (src: string) => {
  try {
    const response = await fetch(src);

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  } catch (err) {
    console.error("Failed to get image placeholder:", err);
    return null;
  }
};
