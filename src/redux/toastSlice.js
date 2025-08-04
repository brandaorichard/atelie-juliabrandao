const initialState = {
  visible: false,
  data: null,
};

export default function toastReducer(state = initialState, action) {
  switch (action.type) {
    case "toast/showToast":
      return { visible: true, data: action.payload };
    case "toast/hideToast":
      return { visible: false, data: null };
    default:
      return state;
  }
}

export const showToast = (payload) => ({
  type: "toast/showToast",
  payload,
});

export const hideToast = () => ({
  type: "toast/hideToast",
});