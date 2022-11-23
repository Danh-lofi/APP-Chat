import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  group: {},
  memberGroup: [],
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action) => {
      if (!action.payload) {
        return;
      }
      state.group = action.payload;
    },
    setMemberGroup: (state, action) => {
      state.memberGroup = action.payload;
    },
    deleteMemberGroup: (state, action) => {
      const listMember = state.memberGroup;
      const idMemberDelete = action.payload;
      state.memberGroup = listMember.filter(
        (member) => member.id !== idMemberDelete
      );
    },
  },
});

export const groupAction = groupSlice.actions;
export default groupSlice;
