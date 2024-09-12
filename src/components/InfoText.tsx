import React from "react"; // we need this to make JSX compile

const InfoText = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="w-1/2">
      <p className="font-bold">{title}</p>
      <p>{value}</p>
    </div>
  );
};
export default InfoText;
