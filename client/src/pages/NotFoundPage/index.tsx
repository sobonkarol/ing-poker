import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { PageLayout } from 'components';

export function NotFoundPage(): ReactElement {
  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h3">
          Nie znaleziono strony
        </Typography>
        <Link to="/">
          <Typography component="span" variant="body1">
            Wróć
          </Typography>
        </Link>
      </Box>
    </PageLayout>
  );
}
