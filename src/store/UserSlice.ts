import { createSlice } from "@reduxjs/toolkit";

let data = JSON.parse(localStorage.getItem("user"));
console.log(data.isAuth);

let initialState = {
  id: null,
  avatar: null,
  username: null,
  role: null,
  isAuth: data.isAuth,
};
// if (!localStorage.getItem("user")) {
//   initialState = JSON.parse(localStorage.get("user"));
// }

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state: any, action: any) {
      state.id = action.payload?.steamUser?.id || action.payload.id;
      state.avatar =
        action.payload?.steamUser?.avatar || action.payload.avatar || null;
      state.username =
        action.payload?.steamUser?.personaName || action.payload.username;
      state.role = action.payload.role;
      state.isAuth = !!action.payload.id;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: action.payload?.steamUser?.id || action.payload.id,
          avatar:
            action.payload?.steamUser?.avatar || action.payload.avatar || null,
          username:
            action.payload?.steamUser?.personaName || action.payload?.username,

          role: action.payload.role,
          isAuth: !!action.payload.id,
        })
      );
    },
    removeUser(state: any) {
      state.id = null;
      state.avatar = null;
      state.personaName = null;
      state.role = null;
      state.isAuth = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
