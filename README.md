# Column Catcher

Article downloader that indexes the first 100 articles of Google News. For use in speech events, such as Extemporaneous and Congressional Debate.  
Add Articles:
![image](https://user-images.githubusercontent.com/45691485/52159933-e152bf80-2670-11e9-87d2-ed2cbfb2801c.png)  
View Articles:
![image](https://user-images.githubusercontent.com/45691485/52159926-cbdd9580-2670-11e9-93a1-6df7457813a2.png)

## Known Problems
* Progress bar does not stop spinning after a query is made.
* Text for article viewer is hard to read.
* Search button in the MainMenu component is broken.
* DB is stored in Chrome's offline localStorage. Will move to Firebase's FireStore in the future.

## Getting Started

The following guide will help you get a copy of the project up and running on your local machine for development and testing purposes.  
  
**PLEASE NOTE THAT THIS IS VERY MUCH A WORK AND PROGRESS! No guarantees to stability are made.**

Ideal use cases:  
* Congressional Debate rounds where you need to download a large amount of articles related to certain queries  
* Extemporaneous Debate rounds where you need an offline solution to index articles and research through "bins"  

### Downloading
Download the files of this repository through git or move your cursor to the "download as ZIP" option in the top right. Unzip or move the files to an empty folder.

### Prerequisites

The script uses many libraries.  
Navigate to the empty folder created in the Downloading step in your terminal window before continuing.  
Run the following commands in the empty folder to install all dependencies:

```
npm i
```

## To run:
Simply type ``node index.js``. This will launch the article analysis server. This must be used in conjunction with the Chrome extension as this works as the backend. Any logged contents will appear in your console.  

Install the "build" folder as an unzipped Chrome extension. Click the extension icon to open the UI. Use the Add Articles page to enter a query and wait for an alert to popup. Use the View Articles page to view queries that have been searched and their articles. Click on an article to view it, and press the trashbin button to remove it from the view (this doesn't delete it from the database).

## Built With

* [Node.js](https://nodejs.org/) - The JS framework used
* [React.js](https://reactjs.org) - The UI framework used

## Contributing

Feel free to contribute as you wish. Open pull requests when needed :)

## Authors

* **Ethan Sayre** - *Initial work* - [ethansayre](https://github.com/ethansayre)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
Copyright attributed to Ethan Sayre 2019. Code may not be used for commercial purposes without prior consent.
