import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';
import SimpleTagApiHandler from './api/simpletag';

const name = pluginPkg.strapi.name;

/**
 * https://strapi.io/blog/making-a-simple-strapi-plugin
 * https://strapi.io/blog/how-to-create-a-strapi-v4-plugin-server-customization-4-6
 * https://design-system-git-main-strapijs.vercel.app/?path=/docs/design-system-components-iconbutton--base
 */
const loadSimpleTags = async () => {
  const items = await SimpleTagApiHandler.list();
  return items.map((tag: any) => ({
    value: tag.id,
    metadatas: {
      intlLabel: {
        id: `simple-tag.tag.${tag.key}`,
        defaultMessage: tag.key,
      },
    },
  }));
}

export default {
  async register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);

    app.customFields.register({
      name: "choice",
      pluginId: pluginId,
      type: "string",
      intlLabel: {
        id: getTrad('choice.name'),
        defaultMessage: "Simple tag"
      },
      intlDescription: {
        id: getTrad('choice.description'),
        defaultMessage: "Simple tag description"
      },
      components: {
        Input: async () => import(/* webpackChunkName: "simple-tag-choice-input" */ "./components/Choice"),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: getTrad('choice.section.tagId'),
              defaultMessage: 'Configuration',
            },
            items: [
              {
                intlLabel: {
                  id: getTrad('choice.section.tagId.label'),
                  defaultMessage: 'Tag',
                },
                name: 'options.tagId',
                type: 'select',
                options: await loadSimpleTags(),
              },
              {
                intlLabel: {
                  id: getTrad('choice.section.multiple.label'),
                  defaultMessage: 'Multiple',
                },
                name: 'options.multiple',
                type: 'select-default-boolean',
                options: [
                  {
                    value: 'true',
                    key: 'true',
                    metadatas: { intlLabel: { id: 'true', defaultMessage: 'true' } },
                  },
                  {
                    value: 'false',
                    key: 'false',
                    metadatas: { intlLabel: { id: 'false', defaultMessage: 'false' } },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
