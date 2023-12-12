import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import "./Home.css";

interface User {
  name: { title: string; first: string; last: string };
  picture: { thumbnail: string };
  email: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  }, []);

  const handleDelete = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          {users.map((user) => (
            <IonItemSliding key={user.email}>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src={user.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>
                  <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
                  <p>{user.email}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  onClick={() => handleDelete(user.email)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>{" "}
    </IonPage>
  );
};

export default Home;
