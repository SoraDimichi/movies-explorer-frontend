import React from 'react';
import './InfoTooltip.css';
import successIcon from '../../images/success-icon.svg';
import failIcon from '../../images/fail-icon.svg';
import closeIcon from '../../images/close-icon.svg';

const InfoTooltip = ({
  message, onClose, isOpen,
}) => (
  <div className={`infoTooltip ${isOpen ? ' infoTooltip_opened' : ''}`}>
    <div className="infoTooltip__container">
      <button type="button" className="infoTooltip__close-button hover-effect" onClick={onClose}>
        <img
          className="infoTooltip__close-button-image"
          src={closeIcon}
          alt="закрыть"
        />
      </button>
      <img
        className="infoTooltip__image"
        alt="успех или провал"
        src={message && message.includes('успешно') ? successIcon : failIcon}
      />
      <h2 className="infoTooltip__message">{message}</h2>
    </div>
    <div aria-hidden="true" className="infoTooltip__overlay" onClick={onClose} />
  </div>
);

export default InfoTooltip;
