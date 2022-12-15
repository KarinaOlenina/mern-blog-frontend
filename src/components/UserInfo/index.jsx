import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  function formatDate(date) {
    let d = new Date(date.slice(0, -1)),
      hours = "" + d.getHours(),
      min = "" + d.getMinutes(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hours.length < 2) hours = "0" + hours;
    if (min.length < 2) min = "0" + min;

    return ` ${[year, month, day].join(".")}, at: ${[hours, min].join(":")}.`;
  }

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{`Published: ${formatDate(
          additionalText
        )}`}</span>
      </div>
    </div>
  );
};
