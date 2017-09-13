# File Mapper Plugin

The File Mapper Plugin, usually paired with the File Hasher Plugin, uses a json map file (output by File Hasher Plugin or manually generated) to find and replace file names in your project.

```
// fileMap.json
{
  "appdynamics.js": {
    "newFileName":"e0771a7c61cb9aa0adfdf5e8f704b386.appdynamics.js",
    "filePath":"src/app/static/appdynamics.js","newFilePath":
    ".static/e0771a7c61cb9aa0adfdf5e8f704b386.appdynamics.js"
  },
  ...
}
```

The above map allow the File Mapper Plugin to find all instances of the file `appdynamics.js` in a given file and replace it with the new name `e0771a7c61cb9aa0adfdf5e8f704b386.appdynamics.js`.

## Getting Started

To get started, add the File Hasher Plugin to your webpack config:
```
// Directory Style:
plugins: [
  ...
  new FileMapper({
    mapPath: '.static/fileMap.json',
    dirPath: 'dist',
  }),
  ...
]
```
```
// Individual Files:
plugins: [
  ...
	new FileMapper({
		mapPath: '.static/fileMap.json',
		filePath: 'dist/index.html',
		outputPath: 'dist/index.html',
	}),
  ...
]
```

### Prerequisites

Node >= 6.0.x
