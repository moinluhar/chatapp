import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    useEffect = (e) => {
        sessionStorage.removeItem("userDetails");
        navigate("/");
    }
    return (<>
        <div>
            {/* JSX */}
        </div>
    </>);
}
