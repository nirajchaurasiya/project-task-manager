import { createContext, useState } from "react";

export const EditTaskContext = createContext();

const EditTaskContextProvider = ({ children }) => {
  const [showEditTaskBox, setShowEditTaskBox] = useState(false);
  return (
    <EditTaskContext.Provider value={{ showEditTaskBox, setShowEditTaskBox }}>
      {children}
    </EditTaskContext.Provider>
  );
};
export default EditTaskContextProvider;
