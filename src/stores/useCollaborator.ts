import { createStore } from "solid-js/store";
import { InterestType } from "./useInterest";
import { removeEmpty } from "../utils/utils";

export type CollaboratorType = {
  full_name: string;
  email: string;
  interests: Array<InterestType>;
  extra_info?: string;
};

const useCollaborator = () => {
  const [collaborator, setCollaborator] = createStore<CollaboratorType>({
    full_name: "",
    email: "",
    interests: [],
    extra_info: "",
  });

  const [isValid, isNotValid] = createStore({
    full_name: false,
    email: false,
    interests: false,
    extra_info: false,
  });

  const updateField = (field: string, value: string | undefined) => {
    if (!value || value.length === 0) {
      isNotValid({ [field]: true });
      return;
    }
    if (field === "interests") {
      let interestsVal = value.split(",").map((interest) => interest.trim());
      let interestsArray = Array.from(new Set(removeEmpty(interestsVal))).map(
        (interest) => ({ title: interest })
      );
      setCollaborator({ interests: interestsArray });
    } else {
      setCollaborator({ [field]: value });
    }
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as
      | HTMLInputElement
      | HTMLTextAreaElement;
    updateField(fieldName, inputElement.value);
  };

  const getInterests = () => {
    return collaborator.interests
      .map((interest) => {
        return interest.title;
      })
      .join(", ");
  };

  const resetCollaborator = () => {
    setCollaborator({
      full_name: "",
      email: "",
      interests: [],
    });
  };

  const submitCollaborator = () => {
    let dataToSend = JSON.stringify(collaborator);
    console.log(dataToSend);
  };

  return {
    collaborator,
    isValid,
    resetCollaborator,
    getInterests,
    updateField,
    updateFormField,
    submitCollaborator,
  };
};

export { useCollaborator };
