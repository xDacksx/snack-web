export const useWebToken = () => {
    function getToken() {
        const authorization =
            localStorage.getItem("authorization") ||
            sessionStorage.getItem("authorization");

        return authorization;
    }

    function getHeader() {
        return `Bearer ${getToken()}`;
    }

    return {
        getToken,
        getHeader,
    };
};
