// Menu data structure
const menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];


// Task 1.0
const mainEl = document.querySelector('main');

// Task 1.1
mainEl.style.backgroundColor = 'var(--main-bg)';

// Task 1.2
mainEl.innerHTML = '<h1>SEI Rocks!</h1>';

// Task 1.3
mainEl.classList.add('flex-ctr');

// Task 2.0: Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');

// Task 2.1: Set the height topMenuEl element to be 100%.
topMenuEl.style.height = '100%';

// Task 2.2: Set the background color of topMenuEl using the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Task 2.3: Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');

// Task 3.1: Iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach(link => {
    // Create an <a> element.
    const newLink = document.createElement('a');

    // On the new element, add an href attribute with its value set to the href property of the "link" object.
    newLink.setAttribute('href', link.href);

    // Set the new element's content to the value of the text property of the "link" object.
    newLink.textContent = link.text;

    // Append the new element to the topMenuEl element.
    topMenuEl.appendChild(newLink);
});

// Task 4.0: Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');

// Task 4.1: Set the height subMenuEl element to be 100%.
subMenuEl.style.height = '100%';

// Task 4.2: Set the background color of subMenuEl using the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// Task 4.3: Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// Task 4.4: Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// Task 4.5: Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';

// Task 5.1: Select and cache all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Declare a global showingSubMenu variable and initialize it to false;
let showingSubMenu = false;

// Task 5.2: Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function (event) {
    // Call the event object’s preventDefault() method.
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element.
    if (!event.target.matches('a')) return;

    // Task 5.3: If the clicked <a> link has a class of active:
    if (event.target.classList.contains('active')) {
        // Remove the active class from the clicked <a> element.
        event.target.classList.remove('active');
        // Set the showingSubMenu to false.
        showingSubMenu = false;
        // Set the CSS top property of subMenuEl to 0.
        subMenuEl.style.top = '0';
        // Return from the event listener function.
        return;
    }

    // Task 5.4: Reset any currently active menu item by removing the active class from all <a> elements.
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Task 5.5: Add a class name of active to the <a> element that was clicked.
    event.target.classList.add('active');

    // Task 5.6: Set showingSubMenu to true if the clicked <a> element’s “link” object within menuLinks has a subLinks property.
    const linkText = event.target.textContent.trim().toLowerCase();
    const clickedLink = menuLinks.find(link => link.text.toLowerCase() === linkText);
    if (clickedLink && clickedLink.subLinks) {
        showingSubMenu = true;
        // Task 5.7: If showingSubMenu is true, call a buildSubMenu function and set the CSS top property of subMenuEl.
        buildSubMenu(clickedLink.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        showingSubMenu = false;
        // Task 5.7: If showingSubMenu is false, set the CSS top property of subMenuEl to 0.
        subMenuEl.style.top = '0';
    }

    // Since the About link has been clicked, set mainEl.innerHTML to '<h1>about</h1>'.
    if (linkText === 'about') {
        mainEl.innerHTML = '<h1>about</h1>';
    }

    // Your code for handling click events goes here
});

// Task 5.8: Code the buildSubMenu function
function buildSubMenu(subLinks) {
    // Clear the contents of subMenuEl.
    subMenuEl.innerHTML = '';

    // Iterate over the subLinks array passed as an argument
    subLinks.forEach(subLink => {
        // Create an <a> element.
        const newSubLink = document.createElement('a');
        // On the new element, add an href attribute with its value set to the href property of the “link” object.
        newSubLink.setAttribute('href', subLink.href);
        // Set the new element’s content to the value of the text property of the “link” object.
        newSubLink.textContent = subLink.text;
        // Append the new element to the subMenuEl element.
        subMenuEl.appendChild(newSubLink);
    });
}

// Task 6.0: Attach a delegated ‘click’ event listener to subMenuEl.
subMenuEl.addEventListener('click', function (event) {
    // Call the event object’s preventDefault() method.
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element.
    if (!event.target.matches('a')) return;

    // Task 6.0: console.log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);

    // Task 6.1: Set showingSubMenu to false.
    showingSubMenu = false;
    // Set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = '0';

    // Task 6.2: Remove the class name of active from each <a> element in topMenuLinks.
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Task 6.3: Update the contents of mainEl to the contents of the <a> element clicked within subMenuEl.
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});