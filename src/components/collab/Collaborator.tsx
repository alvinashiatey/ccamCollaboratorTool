import { Component, createEffect, For, createSignal } from "solid-js";
import styles from "./collaborator.module.css";
import { useCollaborator } from "../../stores/useCollaborator";
import type { CollaboratorType } from "../../stores/useCollaborator";
import { useInterest } from "../../stores/useInterest";
import { shuffle, debounce } from "../../utils/utils";

const Collaborator: Component = () => {
  const {
    collaborator,
    isValid,
    resetCollaborator,
    updateField,
    getInterests,
    submitCollaborator,
  } = useCollaborator();
  const { interests, removeInterest } = useInterest();
  let interestTextAreaRef: HTMLTextAreaElement =
    undefined as unknown as HTMLTextAreaElement;

  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [emailError, setEmailError] = createSignal("");

  createEffect(() => {
    if (collaborator.interests && collaborator.interests.length > 0) {
      interestTextAreaRef.scroll({
        top: interestTextAreaRef.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  const validateEmail = debounce((email: string) => {
    if (!email.endsWith("@yale.edu")) {
      setEmailError("Email is not valid.");
    } else {
      setEmailError("");
    }
  }, 1500);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    submitCollaborator();
    setIsSubmitted(true);
  };

  const addToInterests = (interest: string) => {
    const newInterests = Array.from(new Set([getInterests(), interest]));
    updateField("interests", newInterests.join(","));
    removeInterest(interest);
  };

  type InputEvent = Event & {
    currentTarget: HTMLInputElement | HTMLTextAreaElement;
  };

  const handleEvent = (e: InputEvent) => {
    const { name, value } = e?.currentTarget;
    if (name === "email") {
      updateField(name as keyof CollaboratorType, value); // Update the field immediately
      validateEmail(value); // Debounce the validation
    } else {
      updateField(name as keyof CollaboratorType, value);
    }
  };

  return (
    <div class={styles.Collaborator}>
      <div class={styles.about}>
        <p>
          <span class={styles.about__info}>
            This platform was created to facilitate more collaborations between
            students on campus who share similar interests and hobbies. Matched
            individuals will be notified via email. Start making connections
            today!
          </span>
        </p>
        <p hidden={isSubmitted()} class={styles.caption}>
          <br />* In submitting this form, you agree to have your information
          shared and be contacted by other students.
        </p>
      </div>

      <div
        classList={{
          [styles.submitted]: isSubmitted(),
          [styles.form]: true,
        }}
      >
        <form class={styles.container} onSubmit={handleSubmit}>
          <div class={styles.join__section}>
            <input
              required
              onInput={handleEvent}
              value={collaborator.full_name}
              classList={{
                [styles.input]: true,
                [styles.empty]: isValid.full_name,
              }}
              placeholder="I am"
              type="text"
              name="full_name"
            />
            <input
              required
              onInput={handleEvent}
              value={collaborator.email}
              classList={{
                [styles.input]: true,
                [styles.empty]: isValid.full_name,
              }}
              placeholder="and my email is"
              type="email"
              name="email"
            />
            {emailError() && <p class={styles.error}>{emailError()}</p>}
            <textarea
              required
              ref={interestTextAreaRef}
              onInput={handleEvent}
              value={getInterests()}
              classList={{
                [styles.textarea]: true,
                [styles.empty]: isValid.full_name,
              }}
              name="interests"
              cols="30"
              rows="10"
              placeholder="I am interested in ... (separate interests with a comma, there are a few suggestions below)"
            ></textarea>
          </div>
          <div class={styles.interests}>
            <div class={styles.interest__wrapper}>
              <For each={shuffle([...interests])}>
                {(interest) => (
                  <p
                    onClick={() => addToInterests(interest.title)}
                    class={styles.interest}
                  >
                    {interest.title}
                  </p>
                )}
              </For>
            </div>
          </div>
          <textarea
            onInput={handleEvent}
            value={collaborator.extra_info}
            classList={{
              [styles.textarea]: true,
              [styles.empty]: isValid.full_name,
            }}
            name="extra_info"
            cols="30"
            rows="10"
            placeholder="Anything else you'd like to add? Your major, year, or a project you're working on?"
          ></textarea>
          <input class={styles.btn} type="submit" value="submit" />
        </form>
      </div>

      <div
        hidden={!isSubmitted()}
        classList={{
          [styles.thanks]: !isSubmitted(),
        }}
      >
        <p>
          Thank you for submitting, {collaborator.full_name}! We are excited to
          pair you up with another collaborator on campus.
        </p>
      </div>
    </div>
  );
};

export default Collaborator;
