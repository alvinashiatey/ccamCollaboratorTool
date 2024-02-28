import {createStore} from "solid-js/store";

// '{"title":"Play"}'
export type InterestType = {
    title: string;
}

const submitInterest = (interest: InterestType) => {
    // submit to server
    let dataToSend = JSON.stringify(interest);
    console.log(dataToSend);
}

const useInterest = () => {
    const [interests, setInterests] = createStore<InterestType[]>([
        {
            title: "Sustainability"
        }, {
            title: "Diversity"
        }, {
            title: "Neurotechnology"
        }, {
            title: "Biotechnology"
        }, {
            title: "Cryptocurrency"
        }, {
            title: "Artificial Intelligence"
        },{
            title: "Social media"
        },{
            title: "Human-computer interaction"
        },{
            title: "Robotics"
        }, {
            title: "Virtual reality"
        }, {
            title: "Augmented reality"
        }, {
            title: "Privacy"
        }, {
            title: "Education"
        }, {
            title: "Architecture"
        }, {
            title: "Landscape"
        }, {
            title: "Climate change"
        }, {
            title: "Ecological modeling"
        }
    ]);

    const addInterest = (title: string) => {
        setInterests([...interests, {title}]);
    }

    const removeInterest = (title: string) => {
        setInterests(interests.filter((interest) => interest.title !== title));
    }


    return {interests, removeInterest, addInterest, submitInterest};
}

export {useInterest}