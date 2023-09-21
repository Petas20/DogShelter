import React, { useState, useEffect, useRef } from "react";
import {
  PageContainer,
  DogList,
  DogItem,
  DogForm,
  Input,
  Button,
  Buttons,
  TabButtons,
  ShelterForm,
  Title,
  SubTitle,
} from "./HomeStyle";
import dogs from "../dogsData";

export default function Home() {
  const dogsCount = useRef(dogs.length);

  const [listOfDogs, setListOfDogs] = useState(dogs);
  const [newDog, setNewDog] = useState({
    id: dogsCount.current + 1,
    name: "",
    race: "",
    age: "",
  });
  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState("list-of-dogs");
  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });
  const [tempStorage, setTempStorage] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });
  
  const dogsRequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  };

  const maxDogsInShelter = Math.min(
    Math.floor(shelterStorage.food / dogsRequirements.food),
    Math.floor(shelterStorage.vaccine / dogsRequirements.vaccine),
    Math.floor(shelterStorage.pills / dogsRequirements.pills)
  );

  const handleDelete = (idToDel) => {
    setListOfDogs(listOfDogs.filter((dog) => dog.id !== idToDel));
  };

  const handleChange = (e) => {
    const updateDog = { ...newDog, [e.target.name]: e.target.value };
    setNewDog(updateDog);
    validateData(updateDog);
  };

  const validateData = (dog) => {
    if (dog.age === "" || parseInt(dog.age) < 0 || parseInt(dog.age) > 24) {
      return setValid(false);
    } else if (dog.name.trim().length === 0) {
      return setValid(false);
    } else if (dog.race.trim().length === 0) {
      return setValid(false);
    }
    setValid(true);
  };

  const handleAdd = () => {
    let pushDog = false;
    const totalRequirements = {
      food: dogsRequirements.food * (listOfDogs.length + 1),
      vaccine: dogsRequirements.vaccine * (listOfDogs.length + 1),
      pills: dogsRequirements.pills * (listOfDogs.length + 1),
    };
    if (
      totalRequirements.food <= shelterStorage.food &&
      totalRequirements.vaccine <= shelterStorage.vaccine &&
      totalRequirements.pills <= shelterStorage.pills
    ) {
      pushDog = true;
    }
    if (pushDog) {
      setListOfDogs((listOfDogs) => {
        return [...listOfDogs, newDog];
      });
      dogsCount.current++;
      const updateDog = {
        id: dogsCount.current + 1,
        name: "",
        race: "",
        age: "",
      };
      setNewDog(updateDog);
      setValid(false);
    } else {
      const missingFood = Math.max(
        0,
        totalRequirements.food - shelterStorage.food
      );
      const missingVaccine = Math.max(
        0,
        totalRequirements.vaccine - shelterStorage.vaccine
      );
      const missingPills = Math.max(
        0,
        totalRequirements.pills - shelterStorage.pills
      );
      alert(
        `Nedostatek zásob pro přidání psa. Chybí: 
        Granule: ${missingFood} kg, 
        Vakcíny: ${missingVaccine} ks, 
        Léky: ${missingPills} ks`
      );
    }
  };

  const handleStorage = (e) => {
    const updateStorage = { ...tempStorage, [e.target.name]: e.target.value };
    setTempStorage(updateStorage);
  };

  const updateStorage = () => {
    const storageValue = tempStorage;
    let newStorageValue = {};
    const keys = Object.keys(storageValue);
    keys.map((key) => {
      if (parseInt(storageValue[key])) {
        return (newStorageValue[key] =
          parseInt(shelterStorage[key]) + parseInt(storageValue[key]));
      } else {
        return (newStorageValue[key] = parseInt(shelterStorage[key]));
      }
    });
    setShelterStorage(newStorageValue);
    setTempStorage({ food: "", vaccine: "", pills: "" });
  };

  return (
    <PageContainer>
      <Title>
      <h3>Dog SPA resort</h3>
      </Title>
      <SubTitle>
      <h1>U sundaného obojku</h1>
      </SubTitle>
      <Buttons>
        <TabButtons
          name="list-of-dogs"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("list-of-dogs");
          }}
        >
          Seznam psů
        </TabButtons>
        <TabButtons
          name="shelter-storage"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("shelter-storage");
          }}
        >
          Sklad zásob
        </TabButtons>
      </Buttons>
      {activeTab === "list-of-dogs" && (
        <>
          <DogList name="dogList">
            {listOfDogs.map((dog, index) => {
              return (
                <DogItem key={dog.id}>
                  <span>{index + 1}. </span>
                  {dog.name} / {dog.race} / věk : {dog.age}
                  <button
                    style={{
                      color: "#64766a",
                      fontWeight: "bolder",
                      border: 2 + "px solid #64766a",
                      borderRadius: 50 + "%",
                      height: 25 + "px",
                      width: 25 + "px",
                    }}
                    onClick={() => {
                      handleDelete(dog.id);
                    }}
                  >
                    X
                  </button>
                </DogItem>
              );
            })}
          </DogList>
          <br/>
          <br/>
          <p><strong>Kapacita resortu :</strong> {maxDogsInShelter} psů</p>
          <p>Pro zvýšení kapacity doplňte zásoby ve skladu</p>
          <br /><br /><br />
          <h2>Přidat psa</h2>
          <DogForm>
            <Input
              type="text"
              placeholder="jméno psa"
              name="name"
              value={newDog.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="rasa psa"
              name="race"
              value={newDog.race}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="věk psa"
              name="age"
              min="0"
              max="24"
              value={newDog.age}
              onChange={handleChange}
            />
            <Button disabled={!valid} onClick={handleAdd}>
              Přidat
            </Button>
          </DogForm>
        </>
      )}
      {activeTab === "shelter-storage" && (
        <>
          <h3>Zásoby</h3>
          <br/>
          <p><strong>granule:</strong> {shelterStorage.food} kg (spotřeba : 5 kg/pes)</p>
          <p>Dostatek pro {(shelterStorage.food/5)} psů</p><br/>
          <p><strong>vakcíny:</strong> {shelterStorage.vaccine} ks (spotřeba : 1 ks/pes)</p>
          <p>Dostatek pro {shelterStorage.vaccine} psů </p><br/>
          <p><strong>léky:</strong> {shelterStorage.pills} ks (spotřeba : 2 ks/pes)</p>
          <p>Dostatek pro {(shelterStorage.pills)/2} psů </p><br/>
          <br/>
          <p>Aktuální počet psů v útulku: {listOfDogs.length} / {maxDogsInShelter}</p>
          <ShelterForm>
            <Input
              type="number"
              min="0"
              placeholder="granule (kg)"
              name="food"
              value={tempStorage.food}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="vakcíny (ks)"
              name="vaccine"
              value={tempStorage.vaccine}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="léky (ks)"
              name="pills"
              value={tempStorage.pills}
              onChange={handleStorage}
            />
            <Button onClick={updateStorage}>Doplnit zásoby</Button>
          </ShelterForm>
        </>
      )}
    </PageContainer>
  );
}
