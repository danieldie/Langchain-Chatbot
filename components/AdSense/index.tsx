import Router from "next/router";
import { useEffect } from "react";

declare global {
 interface Window {
  adsbygoogle: unknown[];
 }
}

interface AdsBannerProps {
 "data-ad-slot": string;
 "data-ad-format": string;
 "data-full-width-responsive": string;
}

const AdSense = (props: AdsBannerProps) => {
 useEffect(() => {
  const handleRouteChange = () => {
   const intervalId = setInterval(() => {
    try {
     // Check if the 'ins' element already has an ad in it
     if (window.adsbygoogle) {
      window.adsbygoogle.push({});
      clearInterval(intervalId);
     }
    } catch (err) {
     console.error("Error pushing ads: ", err);
     clearInterval(intervalId); // Ensure we clear interval on errors too
    }
   }, 100);
   return () => clearInterval(intervalId); // Clear interval on component unmount
  };

  // Run the function when the component mounts
  handleRouteChange();

  // Subscribe to route changes
  if (typeof window !== "undefined") {
   Router.events.on("routeChangeComplete", handleRouteChange);

   // Unsubscribe from route changes when the component unmounts
   return () => {
    Router.events.off("routeChangeComplete", handleRouteChange);
   };
  }
 }, []);

 return (
    <ins
     className="adsbygoogle adbanner-customize mt-2"
     style={{
      display: "block",
      overflow: "hidden",
      width: '100%',        // Full width of the parent container
        height: '250px',      // Set a default height
        minWidth: '300px',    // Ensure there's a minimum width
      border: process.env.NODE_ENV === "development" ? "1px solid red" : "none",
     }}
    //  data-adtest="on"
     data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
     {...props}
    />
 );
};
export default AdSense;