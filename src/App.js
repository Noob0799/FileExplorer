import "./App.css";
import folderStructure from "./data/FolderStructure.js";
import Folder from "./components/Folder.js";
import { useState } from "react";

export default function App() {
  const [folder, setFolder] = useState(folderStructure);

  const addNewSubFolderUtil = (name, isFolder, parentId, folderObj) => {
    if (folderObj.id == parentId) {
      folderObj.subFolders.unshift({
        id: Date.now(),
        name: name,
        isFolder: isFolder,
        subFolders: [],
      });
      return;
    }
    folderObj.subFolders.forEach((subFolder) =>
      addNewSubFolderUtil(name, isFolder, parentId, subFolder)
    );
  };

  const editFolderUtil = (name, id, folderObj) => {
    if (folderObj.id == id) {
      folderObj.name = name;
      return;
    } else {
      folderObj.subFolders.forEach((subFolder) =>
        editFolderUtil(name, id, subFolder)
      );
    }
  };

  const deleteFolderUtil = (id, folderObj) => {
    const index = folderObj.subFolders.findIndex(
      (subFolder) => subFolder.id == id
    );
    if (index > -1) {
      folderObj.subFolders.splice(index, 1);
    } else {
      folderObj.subFolders.forEach((subFolder) =>
        deleteFolderUtil(id, subFolder)
      );
    }
  };

  const handleNewSubFolder = (name, isFolder, parentId) => {
    const folderObj = JSON.parse(JSON.stringify(folder));
    addNewSubFolderUtil(name, isFolder, parentId, folderObj);
    setFolder(folderObj);
  };

  const handleEditFolder = (name, id) => {
    const folderObj = JSON.parse(JSON.stringify(folder));
    editFolderUtil(name, id, folderObj);
    setFolder(folderObj);
  };

  const handleDeleteFolder = (id) => {
    const folderObj = JSON.parse(JSON.stringify(folder));
    if (folderObj.id == id) {
      setFolder(null);
    } else {
      deleteFolderUtil(id, folderObj);
      setFolder(folderObj);
    }
  };

  return (
    <div className="App">
      <Folder
        folder={folder}
        addNewSubFolder={handleNewSubFolder}
        editFolder={handleEditFolder}
        deleteFolder={handleDeleteFolder}
      />
    </div>
  );
}