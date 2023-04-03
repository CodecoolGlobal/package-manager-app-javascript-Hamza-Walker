

const sendPackageSchemaToServer = (packageSchema) => {
  fetch('/savePackage', {
      method: 'POST',
      body: JSON.stringify(packageSchema),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
};

const updatePackageSchema = (packageSchema, packageName, packageVersion, packageDependencies, packageDetails) => {
  console.log(packageSchema)
  if (!packageSchema.find(pkg => pkg.name === packageName)) {
    packageSchema.push({
      id: packageSchema.length + 1,
      name: packageName,
      description: packageDetails,
      dependencies: packageDependencies.split(',').map(dep => dep.trim()),
      releases: [{ date: new Date().toISOString().slice(0, 10), version: packageVersion }],
    });
  } else {
    packageSchema.find(pkg => pkg.name === packageName).releases.unshift({
      date: new Date().toISOString().slice(0, 10),
      version: packageVersion,
    });
    packageSchema.find(pkg => pkg.name === packageName).dependencies = packageDependencies.split(',').map(dep => dep.trim());
    packageSchema.find(pkg => pkg.name === packageName).description = packageDetails;
  }
  sendPackageSchemaToServer(packageSchema);
};




export { updatePackageSchema, sendPackageSchemaToServer };



//   const loadData = () => {  
//     // Make an asynchronous request to fetch the JSON file:
//     const fetchPackageSchema = async () => {
//       const response = await fetch('/jsonData');
//       const data = await response.json();
//       return data;
//     };
    
//     fetchPackageSchema()
    
    
//     //Parse the JSON data and update the global variable
//     const updateSchema = async () => {
//       const data = await fetchPackageSchema();
//       packageSchema = data;
//       // console.log("packages:", packageSchema);
//         console.log("type of first element in packages:", Object.keys(packageSchema));
//         // rest of the code
//         // console.log("structure of first element in packages:", Object.keys(packageSchema[0]));
    
//     }
//     updateSchema()
//     return
//   };
//   loadData ()