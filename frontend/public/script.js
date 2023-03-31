// const loadEvent = () => {
//     const root = document.getElementById('root');
//     root.classList.add('root');
  
//     const form = document.createElement('form');
//     form.action = '/edit/package';
//     form.method = 'POST';
//     form.classList.add('form');
//     root.appendChild(form);
  
//     const title = document.createElement('h2')
//     title.textContent = 'Package Details'
//     title.classList.add('title')
//     form.appendChild(title);
  
//     // First div
//     const detailsDiv = document.createElement('div');
//     detailsDiv.classList.add('details-div');
//     root.appendChild(detailsDiv);
  
//     const nameInput = document.createElement('input');
//     nameInput.type = 'text';
//     nameInput.id = 'name';
//     nameInput.name = 'name';
//     nameInput.required = true;
//     nameInput.placeholder = 'Name';
//     nameInput.classList.add('name-input');
//     detailsDiv.appendChild(nameInput);
  
//     const detailsTextarea = document.createElement('textarea');
//     detailsTextarea.id = 'details';
//     detailsTextarea.name = 'details';
//     detailsTextarea.placeholder = 'Details';
//     detailsTextarea.classList.add('details-textarea');
//     detailsDiv.appendChild(detailsTextarea);
  
//     // Second div
//     const dependenciesDiv = document.createElement('div');
//     dependenciesDiv.classList.add('dependencies-div');
//     root.appendChild(dependenciesDiv);
  
//     const dependenciesTitle = document.createElement("h3");
//     dependenciesTitle.textContent = 'Package Dependencies';
//     dependenciesTitle.classList.add('dependencies-title');
//     dependenciesDiv.appendChild(dependenciesTitle);
  
//     // Create a mock list of packages with versions
//     const packageList = [
//       { name: 'Package A', version: '1.0.0' },
//       { name: 'Package B', version: '2.3.1' },
//       { name: 'Package C', version: '3.1.2' },
//     ];
  
//     const packageListUl = document.createElement('ul');
//     packageListUl.classList.add('package-list-ul');
//     for (const packageItem of packageList) {
//       const li = document.createElement('li');
//       li.classList.add('package-item');
//       const label = document.createElement('label');
//       label.textContent =` ${packageItem.name} - ${packageItem.version}`;
//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.name = 'dependencies';
//       checkbox.value = packageItem.name;
//       label.prepend(checkbox);
//       li.appendChild(label);
//       packageListUl.appendChild(li);
//       }
//       dependenciesDiv.appendChild(packageListUl);
      
//       // Submit button
//       const submitButton = document.createElement('button');
//       submitButton.type = 'submit';
//       submitButton.textContent = 'Save';
//       submitButton.classList.add('submit-button');
//       root.appendChild(submitButton);
      
//       form.addEventListener('submit', async (event) => {
//       event.preventDefault();
//       const formData = new FormData(event.target);
//       const response = await fetch(event.target.action, {
//       method: event.target.method,
//       body: formData,
//       });
//       const data = await response.json();
//       console.log(data);
//       });
//       };
      
//       window.addEventListener('load', loadEvent);
const loadEvent = () => {
    const root = document.getElementById('root');
    root.classList.add('root');
  
    const form = document.createElement('form');
    form.action = '/edit/package';
    form.method = 'POST';
    form.classList.add('form');
    root.appendChild(form);
  
    const rectangleDiv = document.createElement('div');
    rectangleDiv.classList.add('rectangle-div');
    form.appendChild(rectangleDiv);
  
  
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details-div');
    rectangleDiv.appendChild(detailsDiv);

    const title = document.createElement('h2');
    title.textContent = 'Package Details';
    title.classList.add('title');
    detailsDiv.appendChild(title);
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.placeholder = 'Name';
    nameInput.classList.add('name-input');
    detailsDiv.appendChild(nameInput);
  
    const detailsTextarea = document.createElement('textarea');
    detailsTextarea.id = 'details';
    detailsTextarea.name = 'details';
    detailsTextarea.placeholder = 'Details';
    detailsTextarea.classList.add('details-textarea');
    detailsDiv.appendChild(detailsTextarea);
  
    // const submitButton = document.createElement('button');
    // submitButton.type = 'submit';
    // submitButton.textContent = 'Save';
    // submitButton.classList.add('submit-button');
    // form.appendChild(submitButton);
  
    // form.addEventListener('submit', async (event) => {
    //   event.preventDefault();
    //   const formData = new FormData(event.target);
    //   const response = await fetch(event.target.action, {
    //     method: event.target.method,
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // });
  };
  
  window.addEventListener('load', loadEvent);
  