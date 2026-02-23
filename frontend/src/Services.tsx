import { ALLOWED_SERVICES } from "./constants";
import { BACKEND_URL } from "./constants";

const Services = () => {
    const logout = async () => {
        try {
            await fetch(`${BACKEND_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } finally {
            // Reset app state by navigating back to the login route.
            window.location.assign("/");
        }
    };

    return (
        <div className="services-container">
            <div className="title">MetaKGP Services</div>
            <div className="subtitle">
                Click on any of the links below to visit
            </div>
            {Object.entries(ALLOWED_SERVICES).map(([url, serviceName]) => (
                <a className="service" key={url} href={url}>
                    {serviceName}
                </a>
            ))}
            <a
                className="logout"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    void logout();
                }}
            >
                Logout
            </a>
        </div>
    );
};

export default Services;
