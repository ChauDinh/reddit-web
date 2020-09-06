import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface Props {}

const EditPost: React.FC<Props> = () => {
  return <div>lo</div>;
};

export default withUrqlClient(createUrqlClient)(EditPost);
