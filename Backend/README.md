storing token in local storage : 
disadvantage : 
hacker will be able to access from local storage.
This is called XSS - CrossSideScripting attack ,where hacker steal the token by making changes to the script.

Solution: Storing access cookies in HTTP-only cookie is the most secure way to store the access token. 
Store the token in HTTP cookie which is created in backend and send it to front end.
Since it is created in back end it will not be accessable to anyone in browser.

From front end whenever we send the request we send through axios, axios provides a way to send HTTP-only cookie from the backend to frontend and viceversa

Install package: cookie-parser