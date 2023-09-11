import top from "../../assets/top.png";
import bottom from "../../assets/bottom.png";

import "./Main.css";

export const Main = ({ enable }) => {
  function getDivColor(ingredient) {
    switch (ingredient) {
      case "lettuce":
        return "green";
      case "bacon":
        return "red";
      case "cheese":
        return "yellow";
      case "meat":
        return "brown";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="main">
        <img src={top} alt="top-bun" />
        {enable.lettuce || enable.bacon || enable.cheese || enable.meat ? (
          Object.entries(enable).map(([ingredient, counter]) => (
            <div key={ingredient} className="ingredient-div">
              {Array.from({ length: counter }).map((_, index) => (
                <div
                  key={index}
                  className={`ingredient-item ${getDivColor(ingredient)}`}
                ></div>
              ))}
            </div>
          ))
        ) : (
          <div className="bold">No ingredients added</div>
        )}
        <img src={bottom} alt="bottom-bun" />
      </div>
    </>
  );
};
