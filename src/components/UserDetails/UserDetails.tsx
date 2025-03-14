import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserDetails.module.scss";
import arrow from './../../assets/arrow.svg'
import star from "./../../assets/star.svg"
import phone from "./../../assets/phone.svg"
import {formatDate ,formatPhoneNumber } from "../../utils/utils"


interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userTag: string;
  department: string;
  position: string;
  birthday?: string;
  phone?: string;
}

interface UserDetailsProps {
  users: User[]; // Список пользователей из Redux
}


export const UserDetails: React.FC<UserDetailsProps> = ({ users }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>(); // Получаем ID пользователя из URL




  // Находим пользователя по ID
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div>AAAA</div>;
  }

  // Обработчик для звонка
  const handleCall = () => {
    if (user.phone) {
      window.open(`tel:${user.phone}`, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.button_out}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={arrow} alt="" />
          </button>
        </div>
        <img src={user.avatarUrl} alt="User Avatar" className={styles.avatar} />
        <div className={styles.userIdentity}>
          <h2
            className={styles.name}
          >{`${user.firstName} ${user.lastName}`}</h2>
          <p className={styles.userTag}>{user.userTag}</p>
        </div>
        
        <p className={styles.department}>{user.department}</p>
      </div>

      {/* Детали пользователя */}
      <div className={styles.details}>
        {user.birthday && (
          <div className={styles.detailItem}>
            <img className={styles.label} src={star}></img>
            <span className={styles.value}>{formatDate(user.birthday)}</span>
          </div>
        )}
        {user.phone && (
          <div className={styles.detailItem}>
            <img className={styles.img_phone} src={phone}></img>
            <span
              className={styles.value}
              onClick={handleCall}
            >
              {formatPhoneNumber(user.phone)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
