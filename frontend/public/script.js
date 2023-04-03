// Create a global variable to store the package schema object:
;
import { updatePackageSchema, sendPackageSchemaToServer} from './package-utils.js';

let packageSchema = {}

const loadEvent = () => {
  
    // Get the root element and add a class to it
    const root = document.getElementById('root');
    root.classList.add('root');
  
    // Create a form element and set its attributes
    const form = document.createElement('form');
    // form.action = '/savePackage'; // set the endpoint URL to /savePackage
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
        packageSchema = data.packages;
        // console.log(packageSchema)
        createPackageVersionDivAndElements(packageSchema);

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
      const packageDivs = [];

      Object.keys(packages).forEach((pkgId) => {
      const pkg = packages[pkgId];

      const div = document.createElement('div');
      div.classList.add('package');
      div.id = pkgId

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

      // Add an event listener to the package div
      div.addEventListener('click', () => {
        div.id = pkgId
        // createPackageVersionDivAndElements(packages,pkgId);
        console.log(pkgId); // Log the package id when the div is clicked
        fetchData()
      });

      packageDivs.push(div);
    });

    // Add the package elements to the page
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
      const packages = await fetchData(packageSchema);
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
    const createPackageVersionDivAndElements = (packages) => {

        // Create the title element and add it to the rectangle div
        const title = document.createElement("h2")
        title.textContent = 'PACKAGE VERSIONS'
        title.classList.add("packageVersion-title")
        rectangleDiv.appendChild(title);

        

        
        // const packageSchema = packages
        // console.log(packages, pkgID)
        // Function to render the package versions on the page
        const renderPackagesVersion =(packages) => {
          const SelectedDivId = document.querySelector('.package')?.id ?? 1;        
        //  console.log(typeof(SelectedDivId))
        //  console.log(SelectedDivId)

          // console.log(typeof(packages))
          // console.log(packages)
          // console.log(Object.entries(packages))
            const packageDivs = [];
            const packageObj = packages.find(pkg => pkg.id === parseInt(SelectedDivId)); // undefined
            // If package exists, create elements for each release and push them to packageDivs array
          //  console.log(packageObj)
            // TODO: check the releases and if its fetching the right data 
            
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

        const packageDivs = renderPackagesVersion(packages);
        packageDivs.forEach((div) => {
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
        
        packageSchema = packages
        // console.log(packageSchema)

    };
    
    const savePackageButton = document.createElement('button');
    savePackageButton.textContent = 'Save Package';
    savePackageButton.id ='savePackageButton'
    savePackageButton.classList.add('savePackage-button');
    savePackageButton.addEventListener('click', () => {
       
        const packageName = document.getElementById('nameInput').value;
        const packageVersion = document.getElementById('versionInput').value;
        const packageDependencies = document.getElementById('dependenciesInput').value;
        const packageDetails = document.getElementById('details-Input').value;
        console.log(packageSchema)
        // console.log(packageName,packageVersion,packageDependencies,packageDetails)
        // updatePackageSchema( packageSchema,packageName, packageVersion, packageDependencies, packageDetails);      
      });
        

    const deletePackageButton = document.createElement('button');
    deletePackageButton.textContent = 'Delete Package';
    deletePackageButton.classList.add('deletePackage-button');
    deletePackageButton.addEventListener('click', () => {
       
      const packageName = document.getElementById('nameInput').value;
      const packageVersion = document.getElementById('versionInput').value;
      const packageDependencies = document.getElementById('dependenciesInput').value;
      const packageDetails = document.getElementById('details-Input').value;
      console.log(packageSchema)
      // console.log(packageName,packageVersion,packageDependencies,packageDetails)
      updatePackageSchema( packageSchema,packageName, packageVersion, packageDependencies, packageDetails);      
    });
    const packageButtonsDiv = document.createElement('div');
    packageButtonsDiv.classList.add('package-buttons');
    packageButtonsDiv.appendChild(savePackageButton);
    packageButtonsDiv.appendChild(deletePackageButton);

    rectangleDiv.appendChild(packageButtonsDiv);
};  


window.addEventListener('load', loadEvent);


  