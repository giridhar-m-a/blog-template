import slugify from "slugify";

const getSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    trim: true,
    strict: true,
  });
};
export default getSlug;
