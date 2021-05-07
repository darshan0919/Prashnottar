import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ITEM_HEIGHT = 48;

interface MenuOption {
    show: boolean;
    name: string;
    func: () => void;
}

type Options = Array<MenuOption>;

export default function MoreMenu({ actions }: { actions: Options }) {
    //TODO
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [options] = useState<Options>(
        actions.filter((option) => option.show)
    );
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return options.length ? (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.name}
                        onClick={() => {
                            handleClose();
                            option.func();
                        }}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    ) : (
        <></>
    );
}
