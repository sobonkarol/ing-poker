import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { ReactElement, useState, MouseEvent } from 'react';
import { toast } from 'react-hot-toast';

import { useLogoutMutation } from 'api';
import { EditUserDialog } from 'components/EditUserDialog';
import { useAuth } from 'contexts';
import { avatarNameToColor } from 'utils';

export function AccountMenu(): ReactElement {
  const { user, logout } = useAuth();
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutMutation] = useLogoutMutation({
    onCompleted() {
      logout?.();
    },
    onError: (error) => {
      toast.error(`Wyloguj: ${error.message}`);
    },
  });

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    if (user) {
      logoutMutation({
        variables: {
          userId: user.id,
        },
      });
    }
  }

  function handleOpenEditUserDialog() {
    setOpenEditUserDialog(true);
  }

  return (
    <>
      {user && (
        <Tooltip title="Ustawienia konta">
          <IconButton onClick={handleClick} size="small">
            <Avatar {...avatarNameToColor(user.username)} />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '150px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disableRipple>
          <Avatar /> {user?.username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenEditUserDialog}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Zmień nazwę
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Wyloguj się
        </MenuItem>
      </Menu>
      <EditUserDialog
        open={openEditUserDialog}
        setOpen={setOpenEditUserDialog}
      />
    </>
  );
}
