import React from "react";

const CommentList = ({ comments }) => {
  console.log(comments);
  const renderComment = (comment) => (
    <div key={comment.id}>
      <p>{comment.comment}</p>
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {comment.replies.map((reply) => renderComment(reply))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) =>
        comment.parentId === null ? renderComment(comment) : ""
      )}
    </div>
  );
};

export default CommentList;
