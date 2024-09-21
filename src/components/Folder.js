import { useState, useEffect, useRef } from "react";

function Folder({ folder, addNewSubFolder, editFolder, deleteFolder }) {
  const [showSubFolders, setShowSubFolders] = useState(false);
  const [addFolder, setAddFolder] = useState({
    display: false,
    isFolder: false,
    id: null,
  });
  const createFolderInputElem = useRef();
  const folderInputContainerElem = useRef();
  const editFolderInputContainerElem = useRef();
  const editFolderInputElem = useRef();
  const folderParentBtnContainerElem = useRef();

  useEffect(() => {
    if (!addFolder.id) {
      createFolderInputElem.current.value = "";
    }
  }, [addFolder.id]);

  useEffect(() => {
    if (addFolder.display) {
      createFolderInputElem.current.focus();
    }
  }, [addFolder.display]);

  const handleCreateFolderInput = (event, isFolder) => {
    if (event.keyCode == 13 && event.target.value) {
      addNewSubFolder(event.target.value, isFolder, folder.id);
      setAddFolder({
        display: false,
        isFolder: false,
        id: null,
      });
      setShowSubFolders(true);
    }
  };

  const handleBlurFolderInput = () => {
    setAddFolder({
      display: false,
      isFolder: false,
      id: null,
    });
  };

  const handleEditFolderInput = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      folderInputContainerElem.current.classList.remove("hide");
      editFolderInputContainerElem.current.classList.add("hide");
      folderParentBtnContainerElem.current.classList.remove("hide");
      editFolder(event.target.value, folder.id);
    }
  };

  const handleBlurFolderEdit = () => {
    folderInputContainerElem.current.classList.remove("hide");
    editFolderInputContainerElem.current.classList.add("hide");
    folderParentBtnContainerElem.current.classList.remove("hide");
  };

  const handleFolderClick = (event) => {
    const classList = event.target.classList;
    let editfolderInputElem;
    if (classList.contains("add-folder")) {
      setAddFolder({
        display: true,
        isFolder: true,
        id: folder.id,
      });
      setShowSubFolders(false);
    } else if (classList.contains("add-file")) {
      setAddFolder({
        display: true,
        isFolder: false,
        id: folder.id,
      });
      setShowSubFolders(false);
    } else if (classList.contains("edit-folder")) {
      folderInputContainerElem.current.classList.add("hide");
      editFolderInputContainerElem.current.classList.remove("hide");
      editFolderInputElem.current.focus();
      editFolderInputElem.current.value = folder.name;
      folderParentBtnContainerElem.current.classList.add("hide");
      setShowSubFolders(false);
    } else if (classList.contains("delete-folder")) {
      deleteFolder(folder.id);
    } else if (!classList.contains("edit-folder-input")) {
      setAddFolder({
        display: false,
        isFolder: false,
        id: null,
      });
      setShowSubFolders(!showSubFolders);
    }
  };

  if (folder) {
    return (
      <div className="folder-container">
        <div
          className="folder-parent"
          id={folder.id}
          onClick={handleFolderClick}
        >
          <span className="folder-parent-name" ref={folderInputContainerElem}>
            {folder.isFolder ? "📁" : "📄"} {folder.name}
          </span>
          <span
            className="folder-parent-name hide"
            ref={editFolderInputContainerElem}
          >
            {folder.isFolder ? "📁" : "📄"}{" "}
            <input
              type="text"
              className="edit-folder-input"
              ref={editFolderInputElem}
              onBlur={handleBlurFolderEdit}
              onKeyUp={handleEditFolderInput}
            />
          </span>
          <div
            className="folder-parent-btn-container"
            ref={folderParentBtnContainerElem}
          >
            <span>
              <i className="fa-solid fa-edit edit-folder"></i>
            </span>
            <span>
              <i className="fa-solid fa-trash delete-folder"></i>
            </span>
            <span>
              <i className="fa-solid fa-folder-plus add-folder"></i>
            </span>
            <span>
              <i className="fa-solid fa-file-circle-plus add-file"></i>
            </span>
          </div>
        </div>
        <div
          className={
            "create-folder-container " + (addFolder.display ? "" : "hide")
          }
        >
          <span className="create-folder-image">
            {addFolder.isFolder ? "📁" : "📄"}
          </span>
          <input
            type="text"
            className="create-folder-input"
            ref={createFolderInputElem}
            onKeyUp={(event) =>
              handleCreateFolderInput(event, addFolder.isFolder)
            }
            onBlur={handleBlurFolderInput}
          />
        </div>
        {folder.isFolder && showSubFolders && (
          <div className="folder-children">
            {folder.subFolders &&
              folder.subFolders.map((obj) => (
                <Folder
                  folder={obj}
                  addNewSubFolder={addNewSubFolder}
                  editFolder={editFolder}
                  deleteFolder={deleteFolder}
                  key={obj.id}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Folder;