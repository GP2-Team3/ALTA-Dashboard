import React, { FC } from "react";

interface Props {
    namePages: string
    userName: string | any
    onLogout?: React.MouseEventHandler
}

const Navbar: FC <Props> = ({ namePages, userName,onLogout }) => {

  return (

    <>
    <div className="w-full overflow-hidden p-7">
      <div className="flex flex-col ">
        <p className="text-4xl font-bold text-primary pb-3 ml-5">
          Immersive Dashboard
        </p>
        <div className="flex justify-between mx-10">
          <h3 className="text-3xl font-bold text-primary ">{namePages}</h3>
          <div className="flex space-x-4 items-center">
            <p className={`text-3xl text-primary/50 hover:`} >
              Hello, <span className="text-primary font-bold">{userName}</span>
            </p>
            <button onClick={onLogout} className="btn btn-xs">logout</button>
          </div>
        </div>
      </div>
      <div className="">
        <hr className="border-primary my-3" />
      </div>
    </div>
    
    </>



  );
};

export default Navbar;