export const setUserSession = userId => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLoggedIn", true);
};

export const getUserSessionDetails = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    return {
        isLoggedIn,
        userId,
    }
}

export const removeUserSessionDetails = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
}