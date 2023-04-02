// Create a global variable to store the package schema object:
let packageSchema;

const loadData = () => {
	// Make an asynchronous request to fetch the JSON file:
	const fetchPackageSchema = async () => {
	    try {
	      const response = await fetch('/jsonData');
	      const data = await response.json();
	      return data;
	    } catch (error) {
	      console.error(error);
	    }
	  }
	fetchPackageSchema()
	
	//Parse the JSON data and update the global variable
	const updatePackageSchema = async () => {
	    const data = await fetchPackageSchema();
	    packageSchema = data;


	  }
	updatePackageSchema()

}
window.addEventListener('load', loadData );

const updatePackageSchema = (packageSchema, packageName, packageVersion, packageDependencies, packageDetails) => {
    
    // console.log(packageSchema)

    if (!packageSchema.packages.find(pkg => pkg.name === packageName)) {
        packageSchema.packages.push({
        id: packageSchema.packages.length + 1,
        name: packageName,
        description: packageDetails,
        dependencies: packageDependencies.split(',').map(dep => dep.trim()),
        releases: [{ date: new Date().toISOString().slice(0, 10), version: packageVersion }],
      });
    } else {
      packageSchema.packages.find(pkg => pkg.name === packageName).releases.unshift({
        date: new Date().toISOString().slice(0, 10),
        version: packageVersion,
      });
      packageSchema.packages.find(pkg => pkg.name === packageName).dependencies = packageDependencies.split(',').map(dep => dep.trim());
      packageSchema.packages.find(pkg => pkg.name === packageName).description = packageDetails;
    }
    // console.log(packageSchema);
  };
  
const sendPackageSchemaToServer = () => {
fetch('/savePackage', {
    method: 'POST',
     body: packageSchema //,
    // headers: {
    // 'Content-Type': 'application/json'
    // }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
};
  
// Define a function that loads an event
const loadEvent = () => {
 

    // Get the root element and add a class to it
    const root = document.getElementById('root');
    root.classList.add('root');
  
    // Create a form element and set its attributes
    const form = document.createElement('form');
    form.action = '/savePackage'; // set the endpoint URL to /savePackage
    form.method = 'POST';
    form.classList.add('form');
    root.appendChild(form);
  
    // Create a div element and add a class to it
    const rectangleDiv = document.createElement('div');
    rectangleDiv.classList.add('rectangle-div');
    form.appendChild(rectangleDiv);
  
    // Define a function that creates and appends elements to the details div
    const createDetailsDiv = () => {
      // Create a div element and add a class to it
      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('details-div');
      rectangleDiv.appendChild(detailsDiv);
  
      // Create a title element and add text and a class to it
      const title = document.createElement('h2');
      title.textContent = 'Package Details';
      title.classList.add('title');
      detailsDiv.appendChild(title);
  
      // Create an input element and set its attributes and add a class to it
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.id = 'nameInput';
    //   nameInput.name = 'name';
      nameInput.required = true;
      nameInput.placeholder = 'Name';
      nameInput.classList.add('name-input');
      detailsDiv.appendChild(nameInput);
  
      // Create a textarea element and set its attributes and add a class to it
      const detailsTextarea = document.createElement('textarea');
      detailsTextarea.id = 'details-Input';
      detailsTextarea.name = 'details';
      detailsTextarea.placeholder = 'Details';
      detailsTextarea.classList.add('details-textarea');
      detailsDiv.appendChild(detailsTextarea);
    };
    createDetailsDiv();


    // Define a function that creates and appends elements to the Dependencies Div
    const createDependenciesDivAndElements = () => {

    // Create a title element and add text and a class to it
    const title = document.createElement('h2');
    title.textContent = 'PACKAGE DEPENDENCIES';
    title.classList.add('dependency-title');
    rectangleDiv.appendChild(title);

    //TODO: fetch the data once and simply manipulate packages 
    /**
    * Fetches package data from the server and processes it
    * @return {Promise<Array>} A promise that resolves to an array of package objects
    */
    const fetchData = async () => {
        try {
          // Fetch the data from the server
          const response = await fetch('/jsonData');
          const data = await response.json();
          // packageSchema = data.packages;
          // console.log(packageSchema)
      
          // Process the data and extract the package names and latest versions
          const packages = data.packages.slice(0, 4);
          return packages.map((pkg) => {
            if (pkg && pkg.releases && pkg.releases.length) {
              const latestVersion = pkg.releases[pkg.releases.length - 1].version;
              return {
                name: pkg.name,
                version: latestVersion
              };
            }
          });
        } catch (error) {
          console.error(error);
          return [];
        }
      };
    
    /**
    * Renders the package data as HTML and adds it to the page
    * @param {Array} packages An array of package objects with 'name' and 'version' properties
    */
    const renderPackages = (packages) => {
    // Create the necessary DOM elements to display the packages
        const packageDivs = packages.map((pkg) => {
        const div = document.createElement('div');
        div.classList.add('package');
  
        const textName = document.createElement('div');
        textName.textContent = pkg.name;
  
        const textVersion = document.createElement('div');
        textVersion.textContent = pkg.version;
  
        const button = document.createElement('button');
        button.innerHTML = '&#x2716;';
        button.classList.add('remove-button');
        button.addEventListener('click', () => div.remove());
  
        div.appendChild(button);
        div.appendChild(textName);
        div.appendChild(textVersion);
        return div;
        });
  
    // Add the package elements to the page

    // Create a div element and add a class to it

    // const dependencyDiv = document.querySelector('#dependency-div');
    const dependencyDiv = document.createElement('div');
    dependencyDiv.classList.add('dependency-div');
    rectangleDiv.appendChild(dependencyDiv);
    dependencyDiv.innerHTML = '';
    packageDivs.forEach((div) => {
        dependencyDiv.appendChild(div);
    });
  
    // Add a search input to the page
    const dependencySearchInput = document.createElement('input');
    dependencySearchInput.type = 'text';
    dependencySearchInput.id = 'dependenciesInput'
    dependencySearchInput.placeholder = 'Dependency search';
    dependencySearchInput.classList.add('dependencySearch-input');
    dependencyDiv.appendChild(dependencySearchInput);
    };
  
    /**
    * Loads the package data and renders it on the page
    */
    const loadPackages = async () => {
    // Fetch the package data and render it on the page
    const packages = await fetchData();
    renderPackages(packages);
    
    };
    loadPackages()
    };
    createDependenciesDivAndElements();
    
    // Define a function that creates and appends elements to the versions Div
    /**
     * Creates the package version elements and adds them to the page
     * @param {Array} packages - An array of package objects containing information about each package
     * @returns {undefined}
     */
    const createPackageVersionDivAndElements = () => {

        // Create the title element and add it to the rectangle div
        const title = document.createElement("h2")
        title.textContent = 'PACKAGE VERSIONS'
        title.classList.add("packageVersion-title")
        rectangleDiv.appendChild(title);
        
        // Function to render the package versions on the page
        const renderPackages = () => {
            const packages = [
                {
                id: 1,
                name: 'Package A',
                releases: [
                    {
                    date: '2022-03-01',
                    version: '1.0.0',
                    },
                    {
                    date: '2022-04-01',
                    version: '1.1.0',
                    },
                    {
                    date: '2022-05-01',
                    version: '1.2.0',
                    },
                ],
                },
                {
                id: 2,
                name: 'Package B',
                releases: [
                    {
                    date: '2022-03-01',
                    version: '2.0.0',
                    },
                    {
                    date: '2022-04-01',
                    version: '2.1.0',
                    },
                    {
                    date: '2022-05-01',
                    version: '2.2.0',
                    },
                ],
                },
            ];
            const packageDivs = [];
            const packageId = 1;
            const packageObj = packages.find(pkg => pkg.id === packageId);

            // If package exists, create elements for each release and push them to packageDivs array
            if (packageObj) {
                packageObj.releases.forEach((release) => {
                    const div = document.createElement('div');
                    div.classList.add('package');

                    const textVersion = document.createElement('div');
                    textVersion.textContent = release.version;

                    const textDate = document.createElement('div');
                    textDate.textContent = release.date;

                    const button = document.createElement('button');
                    button.innerHTML = '&#x2716;';
                    button.classList.add('remove-button');
                    button.addEventListener('click', () => div.remove());

                    div.appendChild(button);
                    div.appendChild(textVersion);
                    div.appendChild(textDate);
                    packageDivs.push(div);
                });
            }

            return packageDivs;
        };

        // Add the package version elements to the page
        const packageVersionDiv = document.createElement('div');
        packageVersionDiv.classList.add('packageVersion-div');
        rectangleDiv.appendChild(packageVersionDiv);
        packageVersionDiv.innerHTML = '';
        renderPackages().forEach((div) => {
            packageVersionDiv.appendChild(div);
        });

        // Add elements for adding new package versions
        const addPackageVersionButton = document.createElement('button');
        addPackageVersionButton.innerHTML = '&#x2b;';
        addPackageVersionButton.classList.add('addVersion-button');

        const addPackageVersionInput = document.createElement('input');
        addPackageVersionInput.type = 'text';
        addPackageVersionInput.id = 'versionInput'
        addPackageVersionInput.placeholder = 'Enter version details';
        addPackageVersionInput.classList.add('version-Input')
        addPackageVersionButton.addEventListener('click', () => {
            const versionDetails = addPackageVersionInput.value;
            if (versionDetails) {
                const [version, date] = versionDetails.split(',').map(str => str.trim());

                const packageObj = packages.find(pkg => pkg.id === 1);
                if (packageObj) {
                    packageObj.releases.push({ version, date });
                    const newPackageDiv = renderPackages()[packageObj.releases.length - 1];
                    packageVersionDiv.appendChild(newPackageDiv);
                }
            }
        });
        packageVersionDiv.appendChild(addPackageVersionButton);
        packageVersionDiv.appendChild(addPackageVersionInput);
    };
        createPackageVersionDivAndElements();
    
    const savePackageButton = document.createElement('button');
    savePackageButton.textContent = 'Save Package';
    savePackageButton.ID ='savePackageButton'
    savePackageButton.classList.add('savePackage-button');
    savePackageButton.addEventListener('click', () => {
        const packageName = document.getElementById('nameInput').value;
        const packageVersion = document.getElementById('versionInput').value;
        const packageDependencies = document.getElementById('dependenciesInput').value;
        const packageDetails = document.getElementById('details-Input').value;
        // console.log(packageSchema)
        // console.log(packageName,packageVersion,packageDependencies,packageDetails)
        updatePackageSchema(packageSchema, packageName, packageVersion, packageDependencies, packageDetails);
        sendPackageSchemaToServer();
      });
      
      // Load the package schema data:
      loadData();
    

    const deletePackageButton = document.createElement('button');
    deletePackageButton.textContent = 'Delete Package';
    deletePackageButton.classList.add('deletePackage-button');

    const packageButtonsDiv = document.createElement('div');
    packageButtonsDiv.classList.add('package-buttons');
    packageButtonsDiv.appendChild(savePackageButton);
    packageButtonsDiv.appendChild(deletePackageButton);

    rectangleDiv.appendChild(packageButtonsDiv);


     // Add event listeners to the form inputs to update the package schema object
    //  const formInputs = document.querySelectorAll('input[type="text"]');
    //  formInputs.forEach(input => {
    //    input.addEventListener('input', () => {
    //      packageSchema[input.name] = input.value;
    //    });
    //  });

};  

window.addEventListener('load', loadEvent);




// function formTest () {
    //     // Fill in the form inputs with test data:
    // document.getElementById('name').value = 'test-package';
    // document.getElementById('versionInput').value = '1.0.0';
    // // document.getElementById('dependenciesInput').value = 'test-package-1.0.0, test-package-2.0.0';
    // document.getElementById('details-Input').value = 'This is a test package.';

    // // Submit the form:
    // document.getElementById('savePackageButton').click();

    // }
    // formTest()
  