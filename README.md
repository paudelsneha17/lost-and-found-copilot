# CampusConnect Lost & Found

CampusConnect is a responsive campus lost-and-found web application for reporting missing belongings, sharing found items, and helping students reconnect with their property. The interface uses a Loras College-inspired purple and gold color palette and provides a simple, accessible browsing experience for the campus community.

## Live Demo

Visit the deployed application on GitHub Pages:

**[https://paudelsneha17.github.io/lost-and-found-copilot/](https://paudelsneha17.github.io/lost-and-found-copilot/)**

## Features

- Responsive campus lost-and-found interface
- Report lost or found items with:
  - Item name
  - Description
  - Location found or last seen
  - Date
  - Category
  - Status
- Supported categories:
  - Electronics
  - Clothing
  - Keys/ID
  - Other
- Lost and Found status labels
- Search listings in real time by item name, location, or description
- Filter listings by category and status
- Clear all filters with one click
- Add submitted items as cards without reloading the page
- Persist listings in browser `localStorage`
- Mark listings as claimed
- Grey out claimed listings for quick identification
- Delete listings with a confirmation prompt
- Purple and gold visual theme inspired by Loras College
- Responsive card grid for desktop, tablet, and mobile screens
- Mobile navigation menu
- Accessible labels, live listing updates, and form validation

## Technology

This project is built with browser-native technologies:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- GitHub Pages for deployment

No build tools, package manager, or backend server are required.

## Installation and Setup

### View on GitHub Pages

Open the live site in a browser:

```text
https://paudelsneha17.github.io/lost-and-found-copilot/
```

The application runs entirely in the browser. Items created on the site are saved to the browser's local storage for that device and browser.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/paudelsneha17/lost-and-found-copilot.git
   ```

2. Change into the project directory:

   ```bash
   cd lost-and-found-copilot
   ```

3. Open `index.html` directly in a browser, or start a local web server.

   For example, with Python:

   ```bash
   python3 -m http.server 8000
   ```

4. Visit:

   ```text
   http://localhost:8000
   ```

You can also use the Live Server extension in Visual Studio Code or any other static-file development server.

## Usage Guide

### Report an item

1. Open the application and scroll to **Report an item**.
2. Select whether the item is **Lost** or **Found**.
3. Choose a category.
4. Enter the item name, description, location, and date.
5. Submit the form using **Post to the board**.
6. The new listing appears in the community board immediately and is saved to `localStorage`.

### Search listings

Use the search field in **Browse the board** to filter listings as you type. Searches match against the item's name, location, and description.

### Filter listings

Use the dropdown menus to filter by:

- Category
- Status: Lost or Found

Select **Clear filters** to reset the search field and both dropdowns and display all listings again.

### Mark an item as claimed

Select **Mark as Claimed** on a listing after the item has been returned or resolved. The card is saved as claimed, greyed out, and displays a claimed badge. Select the button again if the status needs to be reverted.

### Delete an item

Select **Delete** on a listing. Confirm the prompt to permanently remove the item from the current browser's saved listings.

## Data Storage

Listings are stored locally in the browser using the `campusconnect_listings` `localStorage` key. This means:

- Data remains after refreshing the page.
- Data is specific to the browser and device.
- Data is not shared with other users or browsers.
- Clearing browser site data removes the saved listings.

This project currently does not include a backend database, authentication, or cross-device synchronization.

## GitHub Pages Deployment

To deploy changes through GitHub Pages:

1. Push the project files to the repository's default branch.
2. In GitHub, open **Settings** for the repository.
3. Select **Pages** in the left navigation.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Save the configuration.
7. After GitHub finishes deploying, open:

   [https://paudelsneha17.github.io/lost-and-found-copilot/](https://paudelsneha17.github.io/lost-and-found-copilot/)

## Project Structure

```text
.
├── index.html   # Application layout and forms
├── style.css    # Theme, layout, responsive styles, and animations
├── script.js    # Listings, filters, localStorage, and card actions
└── README.md    # Project documentation
```

## License

No license has been specified for this project yet.
