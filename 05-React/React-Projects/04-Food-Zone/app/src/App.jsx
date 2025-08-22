import { useEffect, useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [foodData, setFoodData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const foodDetails = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    setFoodData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    foodDetails();
  }, []);

  const searchFood = async (searchTxt = "") => {
    const filtered = await foodData?.filter((value) =>
      value.name.toLowerCase().includes(searchTxt.toLowerCase())
    );

    setFilteredData(filtered);
  };

  async function filterFoodWithTag(tag) {
    if (tag == "All") {
      setFilteredData(foodData);
      return;
    }
    const filtered = await foodData?.filter((value) =>
      value.type.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredData(filtered);
    console.log(filtered);
  }

  return (
    <>
      <Navbar searchFood={searchFood} filterFoodWithTag={filterFoodWithTag} />
      <Main foodData={filteredData} />
    </>
  );
};

export default App;
