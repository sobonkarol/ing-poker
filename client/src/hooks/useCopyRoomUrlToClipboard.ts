import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { generatePath } from 'react-router-dom';

import { Path } from 'settings';
import { copyTextToClipboard } from 'utils';

interface UseCopyRoomUrlReturn {
  copyRoomUrlToClipboard: (roomId: string) => Promise<void>;
}

export function useCopyRoomUrlToClipboard(): UseCopyRoomUrlReturn {
  const copyRoomUrlToClipboard = useCallback(async (roomId: string) => {
    const { origin } = window.location;
    const roomPath = generatePath(Path.Room, { roomId });

    const isCopySuccess = await copyTextToClipboard(`${origin}${roomPath}`);

    if (isCopySuccess) {
      toast.success('Link skopiowany do schowka');
    } else {
      toast.error(
        "Podczas kopiowania linku wystąpił błąd.",
      );
    }
  }, []);

  return useMemo(() => ({ copyRoomUrlToClipboard }), [copyRoomUrlToClipboard]);
}
