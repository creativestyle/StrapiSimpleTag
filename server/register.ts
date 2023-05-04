import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "choice",
    plugin: "simple-tag",
    type: "string",
  });
};
