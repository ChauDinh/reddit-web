import { Box } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { useGetPostsFromPubUrl } from "../../utils/useGetPostsFromPubUrl";

import { createWithApollo } from "../../utils/withApollo";

interface Props {}

const Publication: React.FC<Props> = () => {
  const { data, loading, error } = useGetPostsFromPubUrl();
  if (loading)
    return (
      <Layout direction="column" variant="regular">
        loading...
      </Layout>
    );
  if (error) return null;
  console.log(data);
  return <Box>1</Box>;
};

export default createWithApollo({ ssr: true })(Publication);
