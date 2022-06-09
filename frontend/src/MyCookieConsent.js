import React from 'react';
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";

import { initGA } from './analytics';

import './MyCookieConsent.css';

const handleAcceptCookie = () => initGA('UA-153113284-1');

const handleDeclineCookie = () => {
  Cookies.remove("_ga");
  Cookies.remove("_gat");
  Cookies.remove("_gid");
};

const MyCookieConsent = () => {
    const cookieConsentValue = getCookieConsentValue();
    
    if (cookieConsentValue) {
        return null;
    }
    
    return (
        <CookieConsent 
          disableButtonStyles
          enableDeclineButton
          onAccept={handleAcceptCookie}
          onDecline={handleDeclineCookie}
          buttonText="Přijmout"
          declineButtonText='Zamítnout'
          contentClasses='content'
          buttonWrapperClasses='buttons'
          buttonClasses='consent-btn confirm-btn'
          declineButtonClasses='consent-btn decline-btn'
        >
          Tato stránka používá cookies pro analýzu dat pomocí google analytics.
        </CookieConsent>
    );
};

export default MyCookieConsent;