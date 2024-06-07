import { useEffect, useRef, useState } from "react";
import { immerable, produce } from "immer";
import { useImmer } from "use-immer";
class Animal {
  name: string;
  age: number = 0;

  static [immerable] = true; // This is required for immer to work with class instances
  constructor(name: string) {
    this.name = name;
  }

  public setAge(age: number) {
    this.age = age;
  }
}
const Test = () => {
  const [animal, setAnimal] = useImmer(new Animal("dog"));

  useEffect(() => {
    console.log("animal", animal);
  }, [animal]);

  return (
    <div>
      <button
        onClick={() => {
          // Update the age of the animal
          // const newState
          // setAnimal(newState)

          setAnimal((draft) => {
            draft.setAge(10);
          });

          console.log("animal", animal);

          // setAnimal(newState);
        }}
      >
        Change animal age
      </button>
    </div>
  );
};

export default Test;
