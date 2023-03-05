import React, { FC } from "react";

interface Props {
    namePages: string
    userName: string
    onLogout?: React.MouseEventHandler
}

const Navbar: FC <Props> = ({ namePages, onLogout, userName }) => {

  return (
    <div className="w-full overflow-hidden ">
      <div className="flex flex-col p-5">
        <p className="text-3xl font-bold text-dark-alta pb-3">
          Immersive Dashboard
        </p>
        <div className="flex justify-between">
          <p className="text-xl font-bold text-orange-alta ">{namePages}</p>
          <div className="flex space-x-4 items-center">
            <p className="text-xl text-dark-alta/50 ">
              Hello, <span className="text-dark-alta font-bold">{userName}</span>
            </p>
            <button className="btn bg-dark-alta border-none mt-2 p-2 mr-5 text-white" onClick={onLogout}>Log out</button>
          </div>
        </div>
      </div>
      <div className="mx-5">
        <hr className="border-dark-alta " />
        <hr className="border-dark-alta my-3" />
      </div>
    </div>
  );
};

export default Navbar;