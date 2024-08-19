export const checkLogin = (navigate) => {
    if (sessionStorage.getItem("userDetails") == null) {
        navigate("/login");
    }
}