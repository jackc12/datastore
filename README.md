# datastore
Dataset is Restaurant Business Rankings 2020 from https://www.kaggle.com/michau96/restaurant-business-rankings-2020

## BackEnd
Backend is written in `python` using `Flask`. Storing data by serializing pandas dataframes with pickle. Use database in the future. Make asynchronous in future so maybe use express.js or see if flask has asynchronous capabilities.

## Frontend
Frontend is written in `javascript` using `React`. Inline styling using `jss` Fetches `json` from server and creates dynamic table depending on dataset. To edit data click on table entry and then enter new value in prompt. No input validation at the moment (e.g. react should check that `Rank` is an `unsigned int` and `Restaurant` is a `string`). If something is entered into the prompt after clicking an element the server is updated and the background color of the entry changes to red. Click `Original Dataset` button to revert server data to original dataset. Maybe make color changes to elements altered by the user persistent. Right now they revert to the original color when the page is reloaded. Use `Redux` maybe.

![caption](https://github.com/jackc12/datastore/blob/main/datastore_demo.mov)
