import React from 'react';
import { Box, Layout, BaseHeaderLayout, Button, EmptyStateLayout, Table, Thead, Tbody, Tr, Td, Th, Typography, IconButton, Flex } from '@strapi/design-system';
import { Plus, Hashtag, Pencil, Trash } from '@strapi/icons';
import Modal from '../../components/Modal';
import SimpleTagApiHandler from '../../api/simpletag';

const HomePage = () => {
  const [tags, setTags] = React.useState<Array<any>>([]);
  const [currentItem, setCurrentItem] = React.useState<any>();
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const loadTags = async () => {
    const allTags = await SimpleTagApiHandler.list();
    setTags(allTags);
  };

  React.useEffect(() => {
    loadTags();
  }, []);

  const hideForm = async () => {
    await loadTags();
    setShowForm(false);
    setCurrentItem(undefined);
  };

  const onEdit = (item: any) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const onDelete = async (item: any) => {
    await SimpleTagApiHandler.delete(item.id);
    hideForm();
  };

  return (
    <Box background="neutral100">
      <Layout>
        <Box background="neutral100">
          <BaseHeaderLayout
            primaryAction={<Button startIcon={<Plus />} onClick={() => setShowForm(true)}>Create new entry</Button>}
            title="Simple Tags Configuration"
            subtitle={`${tags.length} tags found`} as="h2"
          />
        </Box>
        {tags.length == 0 ?
          <Box padding={8} background="neutral100">
            <EmptyStateLayout icon={<Hashtag style={{ mixBlendMode: "plus-lighter", width: "3rem" }} />} content="There is no tags yet..." />
          </Box> :
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Key</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Value</Typography>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tags.map((tag, index) => (
                <Tr key={`row_${index}`}>
                  <Td>
                    <Typography textColor="neutral800">{tag.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{tag.key}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800" ellipsis={1000}>{tag.value.replaceAll('\n', ', ')}</Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton onClick={() => onEdit(tag)} label="Edit" noBorder icon={<Pencil />} />
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => onDelete(tag)} label="Delete" noBorder icon={<Trash />} />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              )
              )}
            </Tbody>
          </Table>}
      </Layout>
      {showForm && <Modal data={currentItem} onClose={hideForm} />}
    </Box>
  )
};

export default HomePage;
