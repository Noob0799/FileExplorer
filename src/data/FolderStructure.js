const folderStructure = {
    id: 1,
    name: "Root",
    isFolder: true,
    subFolders: [
      {
        id: 2,
        name: "SubRoot1",
        isFolder: true,
        subFolders: [
          {
            id: 5,
            name: "Sub1SubRoot1",
            isFolder: true,
            subFolders: [],
          },
          {
            id: 6,
            name: "Sub2SubRoot1",
            isFolder: true,
            subFolders: [
              {
                id: 11,
                name: "Sub1Sub2SubRoot1",
                isFolder: true,
                subFolders: [],
              },
              {
                id: 12,
                name: "Sub2Sub2SubRoot1.js",
                isFolder: false,
                subFolders: [],
              },
            ],
          },
          {
            id: 7,
            name: "Sub3SubRoot1.js",
            isFolder: false,
            subFolders: [],
          },
        ],
      },
      {
        id: 3,
        name: "SubRoot2",
        isFolder: true,
        subFolders: [
          {
            id: 8,
            name: "Sub1SubRoot2",
            isFolder: true,
            subFolders: [],
          },
          {
            id: 9,
            name: "Sub2SubRoot2",
            isFolder: true,
            subFolders: [],
          },
          {
            id: 10,
            name: "Sub3SubRoot2.js",
            isFolder: false,
            subFolders: [],
          },
        ],
      },
      {
        id: 4,
        name: "SubRoot3.js",
        isFolder: false,
        subFolders: [],
      },
    ],
  };
  
  export default folderStructure;  