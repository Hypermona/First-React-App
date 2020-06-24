import { COMMENTS } from "../shared/comments";
import * as ActionTyps from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTyps.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment);
      return state.concat(comment);
    default:
      return state;
  }
};
