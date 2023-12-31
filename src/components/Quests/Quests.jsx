// Quests.jsx
import React from "react";
import {
  LocationButton,
  SubLocationButton,
  QuestList,
  QuestListItem,
} from "./Quests.styled";
import { useView } from "../../contexts/ViewContext";

const Quests = () => {
  const {
    quests,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    setSelectedQuest,
    setIsPopupVisible,
    setViewport,
    defaultViewPort,
  } = useView();

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
    setIsPopupVisible(true);
  };

  const toggleCategory = (category) => {
    setViewport(defaultViewPort);
    setSelectedCategory(selectedCategory === category ? null : category);
    // Reset selectedLocation when switching categories or re-toggling the same category
    setSelectedLocation(null);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(selectedLocation === location ? null : location);
  };

  return (
    <div className="quest-container">
      <LocationButton
        onClick={() => toggleCategory("locationFree")}
        className={selectedCategory === "locationFree" ? "active" : ""}
      >
        &#x2693; Location-free Quests
      </LocationButton>
      {selectedCategory === "locationFree" && (
        <QuestList>
          {quests.locationFreeQuests.map((quest, index) => (
            <QuestListItem
              key={quest.id}
              onClick={() => handleQuestClick(quest)}
              className={
                quest.completed === 1 ? "completed" : quest.type.toLowerCase()
              }
            >
              {index + 1}. {quest.title}
            </QuestListItem>
          ))}
        </QuestList>
      )}

      <LocationButton
        onClick={() => toggleCategory("locationBound")}
        className={selectedCategory === "locationBound" ? "active" : ""}
      >
        &#x1F30D; Location-bound Quests
      </LocationButton>
      {selectedCategory === "locationBound" && (
        <>
          {Object.entries(quests.locationBoundQuests).map(
            ([location, locationData], index) => (
              <div key={index}>
                <SubLocationButton
                  onClick={() => handleLocationClick(location)}
                  className={selectedLocation === location ? "active" : ""}
                >
                  {index + 1}. {location}
                </SubLocationButton>
                {selectedLocation === location && (
                  <QuestList>
                    {locationData.quests.map((quest, questIndex) => (
                      <QuestListItem
                        key={questIndex}
                        onClick={() => handleQuestClick(quest)}
                        className={
                          quest.completed === 1
                            ? "completed"
                            : quest.type.toLowerCase()
                        }
                      >
                        {questIndex + 1}. {quest.title}
                      </QuestListItem>
                    ))}
                  </QuestList>
                )}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Quests;
