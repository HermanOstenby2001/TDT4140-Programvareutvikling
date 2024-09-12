import React from "react"; // we need this to make JSX compile

const Review = ({
  title,
  author,
  reviewtext,
}: {
  title: string;
  author: string;
  reviewtext: string;
}) => {
  return (
    <div className="w-full rounded-lg border border-solid p-3">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm">{author}</p>
      <br></br>
      {reviewtext}
    </div>
  );
};
export default Review;
