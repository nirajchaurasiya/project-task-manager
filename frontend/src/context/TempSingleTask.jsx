import { createContext, useState } from "react";

export const TempSingleTask = createContext();

const TempSingleTaskProvider = ({ children }) => {
  const [tempSingleTaskData, setTempSingleTaskData] = useState(null);
  return (
    <TempSingleTask.Provider
      value={{ tempSingleTaskData, setTempSingleTaskData }}
    >
      {children}
    </TempSingleTask.Provider>
  );
};
export default TempSingleTaskProvider;
