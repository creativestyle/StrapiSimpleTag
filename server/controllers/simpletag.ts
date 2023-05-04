export default ({ strapi }) => ({
  async get(ctx) {
    try {
      ctx.body = await strapi
        .plugin("simple-tag")
        .service("simpletag")
        .get(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async list(ctx) {
    try {
      ctx.body = await strapi
        .plugin("simple-tag")
        .service("simpletag")
        .list();
    }
    catch (err) {
      ctx.throw(500, err);
    }
  },
  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("simple-tag")
        .service("simpletag")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("simple-tag")
        .service("simpletag")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("simple-tag")
        .service("simpletag")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
