import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  group: {
    _id: null,
    memberInfoChat: [],
  },
  memberGroup: [],
  idGroupDeleted: "",
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
      // state.memberGroup = action.payload;

      state.group.memberInfoChat = action.payload;
      console.log("Set Member to group");
      console.log(state.group);
    },
    addMemberToGroup: (state, action) => {
      console.log("Set list member chat");
      console.log(action.payload);
      let prevMemberInfoChat = state.group.memberInfoChat;
      const listNewMember = action.payload;
      listNewMember.forEach((member) => {
        prevMemberInfoChat.push(member);
      });

      state.group.memberInfoChat = prevMemberInfoChat;
    },
    deleteMemberGroup: (state, action) => {
      const listMember = state.memberGroup;
      const idMemberDelete = action.payload;
      state.memberGroup = listMember.filter(
        (member) => member.id !== idMemberDelete
      );
    },
    setIdGroupDeleted: (state, action) => {
      state.idGroupDeleted = action.payload;
    },
  },
});

export const groupAction = groupSlice.actions;
export default groupSlice;
