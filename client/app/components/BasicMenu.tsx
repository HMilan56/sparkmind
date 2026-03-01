import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type MenuOption = {
  desc: string,
  icon?: React.ReactNode,
  onClick?: () => {}
};

export type BasicMenuProps = {
  menuIcon?: React.ReactNode,
  options: MenuOption[]
}

export default function BasicMenu({ options, menuIcon }: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClick}>
        {menuIcon ? menuIcon : <MenuIcon/>}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {options.map(opt =>
          <MenuItem onClick={opt.onClick}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', minWidth: '80px'}}
            >
              <Typography component="div">{opt.desc}</Typography>
              {opt.icon && <Box sx={{ display: 'flex' }}>{opt.icon}</Box>}
            </Stack>
          </MenuItem>)
        }
      </Menu>
    </div>
  );
}
