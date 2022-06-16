# Streamlit Components

## Intro
This is a quick and dirty walk through on how to get this component up and running, as well as a little information
on how it works. For more detailed (and much better) information, try these tutorials out:

* How to use Streamlit with React https://streamlit-components-tutorial.netlify.app/
* React need-to-knows: https://reactjs.org/tutorial/tutorial.html

This component is a modified version of the template found at this github repo: 
* https://github.com/streamlit/component-template/tree/master/examples 

It's well worth cloning it and keeping it somewhere as a reference, as this template is intended for you to mess around and play with!

## Installing dependencies + your venv (virtual environment)

### React
You may already have Node.js and npm installed. If not, download the latest version here:
* https://nodejs.org/en/download/

Once installed, go to ```./template/image_container/frontend``` and open your terminal. Input the commands
~~~~
$: npm i           
$: npm run start
~~~~

This will install dependencies, then start a webserver on localhost:3001. 

### Streamlit
The Python interpretor needs to know about our dependencies, like Streamlit. So that different dependencies for different projects don't clash, we create a virtual environment (venv), essentially creating a copy of the python interpretor for each project that we can install whatever dependencies we need for. 

Well, I think that's why we use them, I don't actually know but that's kind of what I've inferred. They're important though, so do this:

* go to the root of the folder you're holding your component in and open a terminal.
* type these commands:

~~~~
$: python -m venv venv          // create the venv
$: . venv/Scripts/activate      // activate the venv
$: pip install Streamlit        // install Streamlit
$: streamlit run component.py    // run the streamlit app.
~~~~
The command you type to activate your venv may depend on your OS, but you'll want to find out how to run the script "activate" under your venv/Scripts directory.

## How does it work?

On the very large assumption that everything has gone without a hitch, the amount of boilerplate code and quirks to this template can still feel intimidating. Essentially, we've created two things:

* A frontend, running on port 3001, with React
* an API, defined in Python

### The Frontend
In ```ImageContainer.tsx```, under ```image_container/frontend/src``` we've created a React component which extends the class ```StreamlitComponentBase<State>```. Without getting too deeply into how it works, this component is inserted into the document at runtime and can be used to manipulate the DOM. 

Our document in this case is ```index.html```, and the React components are being inserted under the ```<div id="root"><div>``` tags. There is no need to alter anything in ```index.html``` as we should be able to manipulate the DOM entirely through our React components.

You may notice in ```ImageContainer.tsx``` that we've exported it this way:
~~~
export default withStreamlitConnection(ImageContainer);
~~~
This is because Streamlit handles how the frontend code and backend code actually talk. All we have to do is define a function that we can use to call that frontend code in Python. 

### The API
In ```component.py```, we import ```streamlit.components.v1```. This module contains a function called ```declare_component(name, url)``` which will return us another function. We name our function the same as the function we will wrap it in, and we pass the url on which we can find our React frontend (in this case, localhost:3001). The function that is returned takes care of 

We then wrap this function in our own function, ```image_container()```. We could pass whatever we want to this function, which can then be passed to our ```_component_func()```, which will send those arguments as props to our React component. 

All we have to do, then, is import streamlit and assign the result of the function ```image_container()``` to a variable, which we do in this line of code:
~~~~
container = image_container()
~~~~