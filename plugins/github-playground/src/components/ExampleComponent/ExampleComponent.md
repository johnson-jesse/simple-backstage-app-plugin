```tsx
import React, { FC } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  pageTheme,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  identityApiRef
} from '@backstage/core';
import { useApi } from '@backstage/core-api';
import ExampleFetchComponent from '../ExampleFetchComponent';

const ExampleComponent: FC<{}> = () => {
  const identityApi = useApi(identityApiRef);
  const userId = identityApi.getUserId();
  const profile = identityApi.getProfile();

  return (
    <Page theme={pageTheme.tool}>
      <Header title="Welcome to github-playground!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title={userId}>
              <Typography variant="body1">
                {`${profile.displayName} | ${profile.email}`}
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export default ExampleComponent;
```
