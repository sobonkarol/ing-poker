import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { toast } from 'react-hot-toast';

import { useResetGameMutation, useShowCardsMutation } from 'api';
import { useModal } from 'components';

interface TableProps {
  roomId: string;
  isCardsPicked: boolean;
  isGameOver: boolean;
}

export function Table({
  roomId,
  isCardsPicked,
  isGameOver,
}: TableProps): ReactElement {
  const startNewGame = useModal({
    title: 'Na pewno chcesz rozpocząć nowego pokera?',
    description: 'To zresetuje aktualne planowanie.',
    confirmationText: 'Zacznij nowego pokera',
    cancellationText: 'Anuluj',
  });
  const [showCardsMutation, { loading: showCardLoading }] =
    useShowCardsMutation({
      onError: (error) => {
        toast.error(`Show cards: ${error.message}`);
      },
    });

  const [resetGameMutation, { loading: resetGameLoading }] =
    useResetGameMutation({
      onError: (error) => {
        toast.error(`Reset game: ${error.message}`);
      },
    });

  function handleShowCards() {
    showCardsMutation({
      variables: {
        roomId,
      },
    });
  }

  function handleResetGame() {
    startNewGame().then(() => {
      resetGameMutation({
        variables: {
          roomId,
        },
      });
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '150px',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 8,
      }}
    >
      {isCardsPicked ? (
        isGameOver ? (
          <LoadingButton
            onClick={handleResetGame}
            loading={resetGameLoading}
            variant="contained"
            size="large"
            disableElevation
          >
            Zacznij nowego pokera
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={handleShowCards}
            loading={showCardLoading}
            variant="contained"
            size="large"
            disableElevation
          >
            Sprawdź 
          </LoadingButton>
        )
      ) : (
        <Typography>Po prostu wybierz liczbę!</Typography>
      )}
    </Box>
  );
}
