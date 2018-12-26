#westeros-accountants

Ruby script, Node.JS and React to show westeros accountants .csv to .json data as tables, graphs and more

Project for job vacancy. The challenge was to format a csv (also using another one as parameter to remove certain fields from it) and integrate its data to show an ABC curve.

I made a Ruby script to handle the csv, create new useful columns and to convert to json. As soon as json is created, Node.js fetchs its data, do calculations and make them available to get. React is used to show the data got from Node.js as best as possible, with packages such as react-table, react-chartjs-2 and others.

To install all dependencies of this project, run 'npm install' in parent folder, server folder and web-client folder.
To run, type, in parent folder, 'npm start'. 