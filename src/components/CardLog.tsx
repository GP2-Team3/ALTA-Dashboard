import React, { FC } from "react";

interface Props {
  title: string;
  feedback: string;
  status: string;
  fullName?: string;
  date?: string;
}

const CardNewLog: FC<Props> = ({ title, fullName, date, feedback, status }) => {
  return (
    <div className="flex flex-row border-2 justify-between border-dark-alta rounded-md p-5 mx-20 mt-5">
      <div className="w-1/4">
        <p>{title}</p>
        <p>{fullName}</p>
        <p>{date}</p>
      </div>
      <div className="w-3/4">
        <p>{feedback}</p>
        <p className="text-xl py-5">Changed Status : {status}</p>
      </div>
    </div>
  );
};

export default CardNewLog;
