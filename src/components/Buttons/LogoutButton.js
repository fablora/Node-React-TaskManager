import React from "react";
import { logoutUser } from "../../services/auth";
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
    return (
        <button className = {styles.LogoutButton} onClick = {logoutUser}>
            Logout
        </button>
    );
};

export default LogoutButton;