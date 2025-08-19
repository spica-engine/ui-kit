import React, { useState } from "react";
import styles from "./App.module.scss";
import RelationInput from "@atoms/relation-input/RelationInput";
import MultipleSelection from "@atoms/inputs/normal/multiple-selection/MultipleSelection";

const authtoken =
  "IDENTITY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlkZW50aWZpZXIiOiJzcGljYSIsInBvbGljaWVzIjpbIkFwaUtleUZ1bGxBY2Nlc3MiLCJJZGVudGl0eUZ1bGxBY2Nlc3MiLCJTdHJhdGVneUZ1bGxBY2Nlc3MiLCJQb2xpY3lGdWxsQWNjZXNzIiwiUGFzc3BvcnRGdWxsQWNjZXNzIiwiQWN0aXZpdHlGdWxsQWNjZXNzIiwiU3RvcmFnZUZ1bGxBY2Nlc3MiLCJGdW5jdGlvbkZ1bGxBY2Nlc3MiLCJCdWNrZXRGdWxsQWNjZXNzIiwiRGFzaGJvYXJkRnVsbEFjY2VzcyIsIldlYmhvb2tGdWxsQWNjZXNzIiwiUHJlZmVyZW5jZUZ1bGxBY2Nlc3MiLCJTdGF0dXNGdWxsQWNjZXNzIiwiQXNzZXRGdWxsQWNjZXNzIiwiVmVyc2lvbkNvbnRyb2xGdWxsQWNjZXNzIl19.eyJfaWQiOiI2ODkxZjZjMGVjZTlkYmJmNjQ2MGRmOTEiLCJpZGVudGlmaWVyIjoic3BpY2EiLCJwb2xpY2llcyI6WyJBcGlLZXlGdWxsQWNjZXNzIiwiSWRlbnRpdHlGdWxsQWNjZXNzIiwiU3RyYXRlZ3lGdWxsQWNjZXNzIiwiUG9saWN5RnVsbEFjY2VzcyIsIlBhc3Nwb3J0RnVsbEFjY2VzcyIsIkFjdGl2aXR5RnVsbEFjY2VzcyIsIlN0b3JhZ2VGdWxsQWNjZXNzIiwiRnVuY3Rpb25GdWxsQWNjZXNzIiwiQnVja2V0RnVsbEFjY2VzcyIsIkRhc2hib2FyZEZ1bGxBY2Nlc3MiLCJXZWJob29rRnVsbEFjY2VzcyIsIlByZWZlcmVuY2VGdWxsQWNjZXNzIiwiU3RhdHVzRnVsbEFjY2VzcyIsIkFzc2V0RnVsbEFjY2VzcyIsIlZlcnNpb25Db250cm9sRnVsbEFjY2VzcyJdLCJpYXQiOjE3NTU1MTUxNTUsImV4cCI6MTc1NTY4Nzk1NSwiYXVkIjoic3BpY2EuaW8iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ1MDAvYXBpIn0.Ujr2gW2agtNYAIfxD_b95_FTDdU4-7vcexLpdALylI4";

const buildOptionsUrl = (skip = 0, searchValue?: string) => {
  const base =
    "http://localhost:4500/api/bucket/6894cb74ef550e002b1d7007/data?paginate=true&relation=true&limit=25&sort=%7B%22_id%22%3A-1%7D";

  const filter = searchValue
    ? `&filter=${encodeURIComponent(
        JSON.stringify({
          $or: [{ title: { $regex: searchValue, $options: "i" } }],
        })
      )}`
    : "";

  return `${base}${filter}&skip=${skip}`;
};
const defaultValue: any = [];
function App() {
  const [totalOptionsLength, setTotalOptionsLength] = useState(0);
  const [skip, setSkip] = useState(0); // unified skip
  const [lastSearch, setLastSearch] = useState<string | null>(null);

  const headers = { authorization: authtoken };

  const getOptions = async () => {
    const result = await fetch(buildOptionsUrl(0), { headers });
    const data = await result.json();

    setSkip(25);
    setLastSearch(null); // reset search mode
    setTotalOptionsLength(data.meta.total);

    return data.data.map((i: any) => ({ label: i.title, value: i._id }));
  };

  const loadMoreOptions = async () => {
    const result = await fetch(buildOptionsUrl(skip, lastSearch ?? undefined), {
      headers,
    });
    const data = await result.json();

    setSkip(skip + 25);

    return data.data.map((i: any) => ({ label: i.title, value: i._id }));
  };

  const searchOptions = async (searchString: string) => {
    setLastSearch(searchString);

    const result = await fetch(buildOptionsUrl(0, searchString), { headers });
    const data = await result.json();

    setSkip(25);
    setTotalOptionsLength(data.meta.total);

    return data.data.map((i: any) => ({ label: i.title, value: i._id }));
  };

  return (
    <div className={styles.app}>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          gap: "10rem",
        }}
      >
        <div style={{ width: "50%" }}>
          <RelationInput
            label="Relations"
            //value={defaultValue}
            getOptions={getOptions}
            loadMoreOptions={loadMoreOptions}
            searchOptions={searchOptions}
            totalOptionsLength={totalOptionsLength}
            multiple
          />
        </div>
        <div style={{ width: "50%" }}>
          <MultipleSelection label={"a"} options={["a", "b", "c", "d"]} />
        </div>
      </div>
    </div>
  );
}

export default App;
