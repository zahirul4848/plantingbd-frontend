export const baseUrl = 'https://api.plantingbd.com';

export const slugify = (text)=> {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") //replace spaces with -
    .replace(/[^\w-]+/g, "") //remove all non-word chars    
    .replace(/^-+/, "") //trim start of text
    .replace(/-+$/, "") //trim end of text
}