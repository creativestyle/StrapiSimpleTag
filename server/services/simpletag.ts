import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(id: number) {
    return strapi.entityService.findOne("plugin::simple-tag.simpletag", id);
  },
  async list() {
    return strapi.entityService.findMany("plugin::simple-tag.simpletag");
  },
  async create(data: any) {
    return await strapi.entityService.create("plugin::simple-tag.simpletag", data);
  },
  async update(id: number, data: any) {
    return await strapi.entityService.update("plugin::simple-tag.simpletag", id, data);
  },
  async delete(id: number) {
    return await strapi.entityService.delete("plugin::simple-tag.simpletag", id);
  },
});