import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  Avatar,
} from "@material-tailwind/react";
import { Library } from "lucide-react";
import avatar from "../Assets/Avatar.jpeg";

const ProfileMenu = () => {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <a
          href="https://www.linkedin.com/in/sushant-p-kadam/"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            variant="circular"
            size="xl"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={avatar}
          />
        </a>
      </MenuHandler>
    </Menu>
  );
};

const NavBar = () => {
  return (
    <Navbar className=" my-16  p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-800">
        <Typography
          as="a"
          href="/"
          className="ml-2 mr-4 flex cursor-pointer items-center py-1.5 text-8xl font-medium"
        >
          <Library size={80} /> bookstore
        </Typography>

        <ProfileMenu />
      </div>
    </Navbar>
  );
};

export default NavBar;
