export const authLoadingSelector = (state) => state.authReducer.isLoading;
export const userLoadingSelector = (state) => state.authReducer.user || null;
