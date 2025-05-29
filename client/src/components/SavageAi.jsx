// components/TixaeWidget.tsx
import { useEffect } from "react";

const TixaeWidget = () => {
    useEffect(() => {
        // Avoid multiple initializations
        if (document.getElementById("VG_SCRIPT")) return;

        window.VG_CONFIG = {
            ID: "VrrJwLSMVOoJT76B7Sfu",
            region: "eu",
            render: "full-width",
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
            ],
            // Optional: user info if available
            // user: {
            //   name: "John Doe",
            //   email: "johndoe@gmail.com",
            //   phone: "+1234567890",
            // },
            // userID: "USER_ID",
            // autostart: true,
        };

        const script = document.createElement("script");
        script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        script.defer = true;
        script.id = "VG_SCRIPT"; // Prevent duplicate inserts
        document.body.appendChild(script);
    }, []);

    return (
        <div
            id="VG_OVERLAY_CONTAINER"
            style={{ width: "500px", height: "500px" }}
        >
            {/* TIXAE Agent will render here */}
        </div>
    );
};

export default TixaeWidget;
