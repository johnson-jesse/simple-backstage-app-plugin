```tsx
import React, { FC } from 'react';
import { useAsync } from 'react-use';
import Alert from '@material-ui/lab/Alert';
import {
  Table,
  TableColumn,
  Progress,
  githubAuthApiRef,
} from '@backstage/core';
import { useApi } from '@backstage/core-api';
import { graphql } from '@octokit/graphql';

const query = `{
  viewer {
    repositories(first: 100) {
      totalCount
      nodes {
        name
        createdAt
        description
        diskUsage
        isFork
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

type Node = {
  name: string;
  createdAt: string;
  description: string;
  diskUsage: number;
  isFork: boolean;
};

type Viewer = {
  repositories: {
    totalCount: number;
    nodes: Node[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
};

type DenseTableProps = {
  viewer: Viewer;
};

export const DenseTable: FC<DenseTableProps> = ({ viewer }) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Created', field: 'createdAt' },
    { title: 'Description', field: 'description' },
    { title: 'Disk Usage', field: 'diskUsage' },
    { title: 'Fork', field: 'isFork' },
  ];

  return (
    <Table
      title="List Of User's Repositories"
      options={{ search: false, paging: false }}
      columns={columns}
      data={viewer.repositories.nodes}
    />
  );
};

const ExampleFetchComponent: FC<{}> = () => {
  const auth = useApi(githubAuthApiRef);

  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const token = await auth.getAccessToken();

    const gqlEndpoint = graphql.defaults({
      // Uncomment baseUrl if using enterprise
      // baseUrl: 'https://github.MY-BIZ.com/api',
      headers: {
        authorization: `token ${token}`,
      },
    });
    const { viewer } = await gqlEndpoint(query);
    return viewer;
  }, []);

  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (value && value.repositories) return <DenseTable viewer={value} />;

  return (
    <Table
      title="List Of User's Repositories"
      options={{ search: false, paging: false }}
      columns={[]}
      data={[]}
    />
  );
};

export default ExampleFetchComponent;
```
